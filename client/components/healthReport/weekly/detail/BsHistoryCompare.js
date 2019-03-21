import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import classnames from 'classnames'

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
    const {detailList} = this.props
    let dateArr = []
    let totalTimesArr = []
    let normalTimesArr = []
    let normalRates = []
    let fastingAvgArr = []
    let afterMealAvgArr = []
    for(let i=0;i<detailList.length;i++){
      dateArr[i] = {begin:detailList[i].begin,end:detailList[i].end}
      totalTimesArr.push(detailList[i].totalTimes)
      normalRates.push(detailList[i].normalRate)

      fastingAvgArr.push(detailList[i].fastingAvg)
      afterMealAvgArr.push(detailList[i].afterMealAvg)
    }
    return (
      <div className={classnames('block', 'trendBox')}>
        <div className="lineTitle"><span>{'历史对比'}</span></div>
        <div className="m-bs-table">
          <table cellPadding="0" cellSpacing="0" width={`100%`}>
            <tbody>

            <tr>
              <th className="leftTh"></th>
              {
                dateArr.map((value,index)=>{
                  return (
                    <th key={`date${index}`}>
                      {moment(value.end).format('MM月')} <br />
                      {moment(value.begin).format('M.D')}-{moment(value.end).format('M.D')}
                    </th>
                  )
                })
              }
            </tr>
            <tr>
              <th className="leftTh">
                测量次数
              </th>
              {
                totalTimesArr.map((value,index)=>{
                  return (
                    <td key={`totalTime${index}`}>
                      {value}
                    </td>
                  )
                })
              }
            </tr>
            <tr>
              <th className="leftTh">
                达标率
              </th>
              {
                normalRates.map((value,index)=>{
                  return (
                    <td key={`normalTime${index}`}>
                      {(100*value).toFixed(2)} %
                    </td>
                  )
                })
              }
            </tr>
            <tr>
              <th className="leftTh">
                平均空腹
              </th>
              {
                fastingAvgArr.map((value,index)=>{
                  return (
                    <td key={`fastingAvg${index}`}>
                      {value > 0 ?value : '--'}
                    </td>
                  )
                })
              }
            </tr>
            <tr>
              <th>
                平均餐后
              </th>
              {
                afterMealAvgArr.map((value,index)=>{
                  return (
                    <td key={`afterMealAvg${index}`}>
                      {value > 0 ?value : '--'}
                    </td>
                  )
                })
              }
            </tr>
            </tbody>

          </table>
        </div>
        <div className="contentText">本周报的控糖标准参照《中国2型糖尿病防治指南》（2013版）。如果您是非糖尿病患者，或者特殊糖尿病患者如青少年、年龄大于70岁、妊娠期、或有其他严重合并症，请咨询医生了解适合您的个性化控糖标准。</div>
      </div>
    )
  }

}
