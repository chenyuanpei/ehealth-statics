import React, {Component, PropTypes} from 'react'
import Immutable, {List, Map} from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'
import classnames from 'classnames'
import PubSub from 'pubsub-js'
import moment from 'moment'

import {TOPIC_CHART_BOX_CLICK, MORE_INFO_CLICK} from '../topic'
import LineChartBs from '../../../record/LineChartBs'
import BsTop from './BsTop'
import BsInfo from './BsInfo'

export default class Bs extends Component {

  static propTypes = {
    values: ImmutablePropTypes.list,
    lastValue: ImmutablePropTypes.list,
  }

  static defaultProps = {
    values: List(),
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  handleChartBoxClick() {
    PubSub.publish(TOPIC_CHART_BOX_CLICK, 'bs')
  }

  moreInfoClick() {
    PubSub.publish(MORE_INFO_CLICK, 'bs')
  }

  _renderBottomText() {
    return (
      <div className="m-day-bottom-text">
        <div className="m-first-day">00:00</div>
        <div className="m-mid-day">12:00</div>
        <div className="m-last-day">23:59</div>
      </div>
    )
  }

  renderChart() {
    console.log('render Bs')
    const {values, moreInfo} = this.props

    let xValues = []
    for (let i = 0; i < 1440; i++) {
      xValues.push(i.toString())
    }
    const valuesObj = {}
    values && values.forEach((value, index) => {
      if (!value.glucoseConcentration) {
        return
      }
      let today = new Date()
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      today.setMilliseconds(0)
      let startTime = moment(today).format('x')
      // let valueIndex = (value.measurementDate - startTime)/(1000*60)
      //haiyang.chen 修改血糖仪器上传的测量结果不显示bug
      let valueIndex = Math.floor((value.measurementDate - startTime)/(1000*60))
      valuesObj[valueIndex] = value

    })

    let bs = []
    let bsObj = []
    xValues.forEach((xVal, index) => {
      const value = valuesObj[xVal] || {}
      bs[index] = value.glucoseConcentration
      bsObj[index] = value
    })
    const options = {
      yAxis: {
        max: 33.3,
        min: 1.1,
        defMax: 10.0,
        defMin: 4.4,
        minScale: 0.1
      },
      xAxis: {
        values: xValues,
        type: 'day'
      },
      scroll: false,
      moreInfo: moreInfo,
      noDataTip: '未有数据，请保持持续测量及上传',
    }
    options.values = [
      {
        name: '血糖',
        values: bs,

      }
    ]
    options.datas = [
      {
        name:'血糖',
        values : bsObj,
      }
    ]

    return (
      <div className="lineChart">
        <LineChartBs {...options}/>
      </div>
    )
  }

  render() {
    require('../../../../styles/record/record.less')
    require('../../../../styles/home/records.less')

    const {
      lastValue,
      activeDegree,
      moreInfo,
    } = this.props

    const {measurementDate} = lastValue || {}
    return (
      <div className={classnames("recordBox")}>
        <div className={classnames("chartBox", `chartBg-bs`)} onClick={() => this.handleChartBoxClick()}>
          {activeDegree && <BsTop {...activeDegree}/>}
          <div className="charTop">
            <span>今天</span>
            <span>{measurementDate ? moment(measurementDate).format('M月D日 HH:mm') : ''}</span>
          </div>
          {this.renderChart()}
        </div>
        {this._renderBottomText()}
        {/*<BsInfo {...lastValue}/>*/}
        {moreInfo &&
        <div onClick={() => this.moreInfoClick()} className="m-record-more">
          <div>更多数据</div>
          <span></span></div>
        }
      </div>
    )
  }
}
