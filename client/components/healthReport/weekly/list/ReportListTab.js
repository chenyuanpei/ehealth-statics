import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../../frozenui/grid'
import PubSub from 'pubsub-js'
export const TOPIC_HEALTH_REPORT_DETAIL_CLICK = 'TOPIC_HEALTH_REPORT_DETAIL_CLICK'
export default class ReportListTab extends Component {
  _handClick(memberId,id,dataClass) {
    PubSub.publish(TOPIC_HEALTH_REPORT_DETAIL_CLICK, {memberId,id,dataClass})
  }
  render() {
    const {onClick,healthReports,dataClass} = this.props
    require('../../../../styles/healthReport/weekly/reportListTab.less')
    return (
      <div className="report_wrap">
        {healthReports && healthReports.map((healthReport, i) => {
          let display = true
          // 判断跟前面是否同一天，若同一天则隐藏
          if (i !== 0 && healthReports.get(i - 1).week == healthReport.week) {
            display = false
          }
          let weekDays = healthReport.weekDays.split(',')
          let firstDay = weekDays[0].split('-')
          let lastDay = weekDays[6].split('-')

          return (
            <div key={i}>
              <div className="time-wrap" style={{display:display?'block':'none'}}>
                {healthReport.month}月 （{firstDay[0]}月{firstDay[1]}日～{lastDay[0]}月{lastDay[1]}日）
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
