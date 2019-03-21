import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import classnames from 'classnames'
// util
import {getByWeekInYear} from '../../../../util/date'
// components
import LabelText from './LabelText'
import CompareChart from './CompareChart'
import TrendChart from './TrendChart'

export default class extends Component {

  static propTypes = {
    report: PropTypes.object,
  }

  static defaultProps = {
    report: {},
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {report: {trendDescribe, trendAdvice, trendWeekAdvice}} = this.props

    return (
      <div className={classnames('block', 'trendBox')}>
        <div className="lineTitle"><span>{'本周血压趋势'}</span></div>
        <div className="subTitle">{trendDescribe}</div>
        {this.renderTrend()}
        {this.renderLastWeekCompare()}
        <LabelText title="周报总结">
          <span>{trendAdvice}</span>
          <span>{trendWeekAdvice}</span>
        </LabelText>
      </div>
    )
  }

  renderTrend() {
    const {report: {sysArr, diaArr, year, week, weekDays}} = this.props

    const date = [...new Array(7)].map((val, index) => {
      const m = weekDays.split(',')

      if (!m) {
        return null
      }
      return m[index].replace('-','.')
    })

    const values = {
      sp: this.transferValues(sysArr),
      dp: this.transferValues(diaArr),
      date,
    }
    return (
      <div className="lineChartBox">
        <TrendChart values={values}/>
      </div>
    )
  }

  transferValues(arrStr) {
    if (!arrStr) {
      return []
    }
    return arrStr.split(',').map(val => {
      val = val - 0
      return val === 0 ? null : val
    })
  }

  renderLastWeekCompare() {
    const {report: {trendWeekDescribe, lastWeekSys = 0, lastWeekDia = 0, systolicPressure, diastolicPressure}} = this.props

    const values = [
      {sp: systolicPressure, dp: diastolicPressure}, // 本周
      {sp: lastWeekSys, dp: lastWeekDia},  // 上周
    ]

    return [
      <div key="lineTitle" className="lineTitle"><span>{'和上周比较'}</span></div>,
      <div key="subTitle" className="subTitle">{trendWeekDescribe}</div>,
      <div key="compareChart" className="compareChart">
        <CompareChart values={values}/>
      </div>
    ]
  }
}
