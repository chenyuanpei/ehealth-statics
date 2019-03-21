import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {RowFlex, Col} from '../../../frozenui/grid'
import PubSub from 'pubsub-js'
export const TOPIC_HEALTH_REPORT_DETAIL_SUGAR_CLICK = 'TOPIC_HEALTH_REPORT_DETAIL_SUGAR_CLICK'
export default class ReportListSugarTab extends Component {
  _handClick(memberId,id,dataClass) {
    PubSub.publish(TOPIC_HEALTH_REPORT_DETAIL_SUGAR_CLICK, {memberId,id,dataClass})
  }
  render() {
    const {onClick,healthReports,dataClass} = this.props
    require('../../../../styles/healthReport/weekly/reportListTab.less')
    return (
      <div className="report_wrap">
        {healthReports && healthReports.map((healthReport, i) => {
          let display = true
          // 判断跟前面是否同一天，若同一天则隐藏
          if (i !== 0 && healthReports.get(i - 1).begin == healthReport.begin) {
            display = false
          }
          let thisMouth = moment(healthReport.end).format('MM月')
          let firstDay = moment(healthReport.begin).format('MM月DD日')
          let lastDay = moment(healthReport.end).format('MM月DD日')

          return (
            <div key={i}>
              <div className="time-wrap" style={{display:display?'block':'none'}}>
                {thisMouth} （{firstDay}～{lastDay}）
              </div>
              <RowFlex className="reportListTab" onClick={()=>{this._handClick(healthReport.memberId,healthReport.id,dataClass)}}>

                <Col className="name">

                  {healthReport.nickname}的健康周报

                  <img className="m-arrow-right" src={require('../../../../../static/images/btn_new_p.png')}/>

                </Col>
              </RowFlex>
            </div>

          )
        }).toArray()}


      </div>

    )
  }
}
