import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../../util/common'
import PubSub from 'pubsub-js'
// components
import Title from '../../../../components/common/title/Title'
import ReportListTab from '../../../../components/healthReport/weekly/list/ReportListTab'
import ReportListSugarTab from '../../../../components/healthReport/weekly/list/ReportListSugarTab'
import {TOPIC_HEALTH_REPORT_DETAIL_CLICK} from '../../../../components/healthReport/weekly/list/ReportListTab'
import {TOPIC_HEALTH_REPORT_DETAIL_SUGAR_CLICK} from '../../../../components/healthReport/weekly/list/ReportListSugarTab'

import ScrollView from '../../../../components/common/scroll/ScrollView'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(
  class extends Component {
    componentDidMount() {
      const {loadData,push,dataClass} = this.props
      loadData({pageLoad: true,dataClass})
      this.healthReportClickToken = PubSub.subscribe(TOPIC_HEALTH_REPORT_DETAIL_CLICK, (topic, data) => {
        push(`/healthReport/${data.memberId}/detail/${data.id}?dataClass=${data.dataClass}`)
      })
      this.healthReportSugarClickToken = PubSub.subscribe(TOPIC_HEALTH_REPORT_DETAIL_SUGAR_CLICK, (topic, data) => {
        push(`/healthReport/${data.memberId}/detail/${data.id}?dataClass=${data.dataClass}`)
      })
    }
    componentWillUnmount() {
      PubSub.unsubscribe(this.healthReportClickToken)
      PubSub.unsubscribe(this.healthReportSugarClickToken)
    }
    render() {

      return (
        <div id="healthReportWeeklyList">
          <Title title='健康周报'></Title>
          {this._renderTab()}
        </div>
      )
    }
    _getHealthReportHistory() {
      let {loadData, healthReportHistory} = this.props
      loadData({memberId, healthReportHistory})
    }
    _changeReport(thisString) {
      const {loadData,changeDataClass} = this.props
      loadData({pageLoad: true,dataClass:thisString})
      changeDataClass(thisString)
    }
    _renderTab() {
      require('../../../../styles/healthReport/weekly/list.less')
      const {healthReportHistory,dataClass} = this.props
      if(healthReportHistory && healthReportHistory.length === 0){
        return (
          <div className="no-data">
            暂无周报数据，请定期测量血压！
          </div>
        )
      }
        return (
          <div>
            <ul className="report-tab">
              <li onClick={()=>{this._changeReport('bloodPress')}}><span className={dataClass == "bloodPress" ? "bp-font" : ''}>血压</span></li>
              <li onClick={()=>{this._changeReport('bloodSugar')}}><span className={dataClass == "bloodSugar" ? "bs-font" : ''}>血糖</span></li>
            </ul>
            <div className="panal">
              <ScrollView onScrollEnd={() => this._getHealthReportHistory()}>
                {/*{healthReports.map(report => {*/}
                {/*return (*/}
                {/*<ReportTab {...report} onClick={() => this._edit(report, true)} onClick={() => this._go('healthReport/' + report.member.id + '/detail/' + report.report.id)}/>*/}
                {/*)*/}
                {/*})}*/}
                {dataClass === 'bloodPress' && <ReportListTab dataClass={dataClass} healthReports={healthReportHistory}></ReportListTab>}
                {dataClass === 'bloodSugar' && <ReportListSugarTab dataClass={dataClass} healthReports={healthReportHistory}></ReportListSugarTab>}
              </ScrollView>
            </div>
          </div>

        )
    }

    _go(url) {
      this.props.push(url)
    }

  })

