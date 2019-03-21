import React, {Component, PropTypes} from 'react'
import Immutable, {List, Map} from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'
import classnames from 'classnames'
import moment from 'moment'

import LineChartTp from '../../../record/LineChartTp'

export default class Tp extends Component {

  static propTypes = {
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


  renderChart() {
    const {values} = this.props

    const options = {
      yAxis: {
        minScale: 10
      },
      scroll: false,
      noDataTip: '未有数据，请保持持续测量及上传',
    }

    options.values = [
      {
        name: '体温',
        values: []
      }
    ]

    values.forEach((value, index) => {
      if (!value.degree) {
        return
      }
      if(value.degree > 39){
        options.values[0].values.push(39.5)
      }else if(value.degree < 36){
        options.values[0].values.push(35.5)
      }else{

        options.values[0].values.push(value.degree)
      }
    })

    return (
      <div className="lineChart">
        <LineChartTp {...options}/>
      </div>
    )
  }

  render() {
    require('../../../../styles/record/record.less')
    require('../../../../styles/home/records.less')

    const {
      values,
    } = this.props
    const lastValue = values.size > 0 ? values.last() : {}
    const {measurementDate} = lastValue

    return (
      <div className={classnames("recordBox")}>
        <div className={classnames("chartBox", `chartBg-tp`)}>
          <div className="charTop">
            <span>最近7次数据</span>
            <span>{measurementDate ? moment(measurementDate).format('M月D日 HH:mm') : ''}</span>
          </div>
          {this.renderChart()}
        </div>
      </div>
    )
  }
}
