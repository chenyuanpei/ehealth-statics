import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'

import classnames from 'classnames'
// components
import RowFlex from '../../../frozenui/grid/RowFlex'
import Col from '../../../frozenui/grid/Col'
import LabelText from './LabelText'

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
    const {
      recordPerMealAndDayData,aboveNormalNum,lowNum,normalNum
    } = this.props

    return (
      <div className={classnames('block', 'statisticsBox')}>
        <div className="lineTitle"><span>{'本周血糖情况'}</span></div>
        <div className="m-bs-table-top">
          <table cellPadding="0" cellSpacing="0" width={`100%`}>
            <tbody>
            <tr>
              <th rowSpan="2">日期</th>
              <td colSpan="2">早餐</td>
              <td colSpan="2">午餐</td>
              <td colSpan="2">晚餐</td>
              <th rowSpan="2">睡前</th>
            </tr>
            <tr>
              <td>空腹</td>
              <td>后</td>
              <td>前</td>
              <td>后</td>
              <td>前</td>
              <td>后</td>
            </tr>
            </tbody>
          </table>

        </div>
        <div className="trend_table_body">
          <table cellPadding="0" cellSpacing="0" width={`100%`}>
            {recordPerMealAndDayData.length > 0 && <tbody>
            <tr>
              <td className={`m-table-date`} colSpan="8">{moment(recordPerMealAndDayData[recordPerMealAndDayData.length-1][0].measurementDate).format('YYYY年MM月DD日')} ~ {moment(recordPerMealAndDayData[0][0].measurementDate).format('YYYY年MM月DD日')}</td>
            </tr>
            </tbody>}
            {recordPerMealAndDayData.map(

              (values, idx) => {
                // 判断跟前面是否同一天，若同一天则隐藏
                return(
                  <tbody key={`recordPerMealAndDay${idx}`}>

                  <tr>
                    <th>{moment(values[0].measurementDate).format('MM')}/{moment(values[0].measurementDate).format('DD')}</th>
                    {values && values.map(
                      (value, index) => {

                        return(
                          <td key={index} onClick={() => {
                            value.id && this.handleBsTdClick(value.id)
                          }}
                              className={`record-${value.level}`}>{value.glucoseConcentration && value.glucoseConcentration.toFixed(1)}</td>
                        )

                      }
                    )}
                  </tr>
                  </tbody>
                )

              }
            )}
          </table>
        </div>
        <RowFlex className="levelCountBox bsLevel">
          {/* <Col className={classnames('none')}> */}
          <Col className={classnames(aboveNormalNum ? 'bsHigh' : 'bsNone')}>
            <div>{'高'}</div>
            <div>{aboveNormalNum}次</div>
          </Col>
          <Col className={classnames(normalNum ? 'bsNormal' : 'bsNone')}>
            <div>{'正常'}</div>
            <div>{normalNum}次</div>
          </Col>
          <Col className={classnames(lowNum ? 'bsLow' : 'bsNone')}>
            <div>{'低'}</div>
            <div>{lowNum}次</div>
          </Col>
        </RowFlex>

        <div className="m-report">
          <LabelText title="《中国血糖检测临床应用指南》建议">《中国血糖检测临床应用指南》建议：如果糖化血红蛋白（HbA1c）未达标或不稳定，每周检测不低于5次；如果糖化血红蛋白达标，可根据情况每周测量2-4次。实际的检测方案需要根据您的个人情况，由医生进行专业指导。</LabelText></div>
      </div>
    )
  }
}
