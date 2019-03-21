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
    const {report: {beforeBedTimes,beforeBedHightest,beforeBedLowest,beforeBedAvg,afterMealTimes,afterMealHightest,afterMealLowest,afterMealAvg,fastingTimes,fastingHightest,fastingLowest,fastingAvg,beforeMealHightest, beforeMealLowest, beforeMealTimes,beforeMealAvg}} = this.props

    return (
      <div className={classnames('block', 'trendBox')}>
        <div className="lineTitle"><span>空腹血糖（{fastingTimes}次）</span></div>
        <div className="m-bs-table">
          <table cellPadding="0" cellSpacing="0" width={`100%`}>
            <tbody>
            <tr>
              <th>最高</th>
              <th>最低</th>
              <th>平均</th>

            </tr>
            <tr>
              <td>
                {fastingHightest}
              </td>
              <td>
                {fastingLowest}
              </td>
              <td>
                {fastingAvg}
              </td>
            </tr>
            </tbody>

          </table>
        </div>
        <div className="lineTitle"><span>餐前血糖（{beforeMealTimes}次）</span></div>
        <div className="m-bs-table">
          <table cellPadding="0" cellSpacing="0" width={`100%`}>
            <tbody>
            <tr>
              <th>最高</th>
              <th>最低</th>
              <th>平均</th>

            </tr>
            <tr>
              <td>
                {beforeMealHightest}
              </td>
              <td>
                {beforeMealLowest}
              </td>
              <td>
                {beforeMealAvg}
              </td>
            </tr>
            </tbody>

          </table>
        </div>
        <div className="lineTitle"><span>餐后血糖（{afterMealTimes}次）</span></div>
        <div className="m-bs-table">
          <table cellPadding="0" cellSpacing="0" width={`100%`}>
            <tbody>
            <tr>
              <th>最高</th>
              <th>最低</th>
              <th>平均</th>

            </tr>
            <tr>
              <td>
                {afterMealHightest}
              </td>
              <td>
                {afterMealLowest}
              </td>
              <td>
                {afterMealAvg}
              </td>
            </tr>
            </tbody>

          </table>
        </div>
        <div className="lineTitle"><span>睡前血糖（{beforeBedTimes}次）</span></div>
        <div className="m-bs-table">
          <table cellPadding="0" cellSpacing="0" width={`100%`}>
            <tbody>
            <tr>
              <th>最高</th>
              <th>最低</th>
              <th>平均</th>

            </tr>
            <tr>
              <td>
                {beforeBedHightest}
              </td>
              <td>
                {beforeBedLowest}
              </td>
              <td>
                {beforeBedAvg}
              </td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
    )
  }


}
