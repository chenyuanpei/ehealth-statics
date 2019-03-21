import React, {Component, PropTypes} from 'react'
import Immutable, {List, Map} from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'
import classnames from 'classnames'
import PubSub from 'pubsub-js'
import moment from 'moment'

import {TOPIC_CHART_BOX_CLICK, MORE_INFO_CLICK} from '../topic'
import LineChart from '../../../record/LineChart'
import BpTop from './BpTop'
import BpInfo from './BpInfo'

export default class Bp extends Component {

  static propTypes = {
    activeDegree: PropTypes.shape(BpTop.propTypes),
    values: ImmutablePropTypes.list,
  }

  static defaultProps = {
    values: List(),
    activeDegree: {},
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  handleChartBoxClick() {
    PubSub.publish(TOPIC_CHART_BOX_CLICK, 'bp')
  }

  moreInfoClick() {
    PubSub.publish(MORE_INFO_CLICK, 'bp')
  }

  renderChart() {
    console.log('render Bp')
    const {values,moreInfo} = this.props

    const options = {
      yAxis: {
        max: 250,
        min: 0,
        defMax: 120,
        defMin: 60,
        minScale: 10
      },
      scroll: false,
      moreInfo:moreInfo,
      noDataTip: '未有数据，请保持持续测量及上传',
    }

    options.values = [
      {
        name: '高压',
        values: []
      },
      {
        name: '低压',
        values: []
      }
    ]
    options.datas = [
      {
        name:'血压状况',
        values: [],
      }
    ]
    values.forEach((value, index) => {
      if (!value.systolicPressure || !value.diastolicPressure) {
        return
      }

      options.values[0].values.push(value.systolicPressure)
      options.values[1].values.push(value.diastolicPressure)
      options.datas[0].values.push(value)
    })

    return (
      <div className="lineChart">
        <LineChart {...options}/>
        <div className="m-bp-top-chart-tips">
          <div className="first_round"></div>高压 <div className="second_round"><div className="second_round_in"></div> </div>低压
        </div>
      </div>
    )
  }

  render() {
    require('../../../../styles/record/record.less')
    require('../../../../styles/home/records.less')

    const {
      values,
      activeDegree,
      moreInfo,
    } = this.props
    const lastValue = values.size > 0 ? values.last() : {}
    const {measurementDate} = lastValue

    return (
      <div className={classnames("recordBox")}>
        <div className={classnames("chartBox", `chartBg-bp`)} onClick={() => this.handleChartBoxClick()}>
          <BpTop {...activeDegree}/>
          <div className="charTop">
            <span>最近7次数据</span>
            <span>{measurementDate ? moment(measurementDate).format('M月D日 HH:mm') : ''}</span>
          </div>
          {this.renderChart()}
        </div>
        <BpInfo {...lastValue}/>
        {moreInfo &&
          <div onClick={() => this.moreInfoClick()} className="m-record-more"><div>更多数据</div><span></span></div>
        }
      </div>
    )
  }
}
