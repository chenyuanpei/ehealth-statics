import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../../util/common'
import moment from 'moment'
// components
import Title from '../../../../components/common/title/Title'
import Top from '../../../../components/healthReport/weekly/detail/Top'
import BsTop from '../../../../components/healthReport/weekly/detail/BsTop'
import BpStatistics from '../../../../components/healthReport/weekly/detail/BpStatistics'
import BsStatistics from '../../../../components/healthReport/weekly/detail/BsStatistics'
import BpTrend from '../../../../components/healthReport/weekly/detail/BpTrend'
import BsTrend from '../../../../components/healthReport/weekly/detail/BsTrend'
import BsHIstoryCompare from '../../../../components/healthReport/weekly/detail/BsHistoryCompare'
import Result from '../../../../components/healthReport/weekly/detail/Result'
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
      const {init, params: {memberId, reportId},location:{query:{dataClass}}} = this.props

      init({memberId, reportId,dataClass})
      // Android
      document.body.scrollTop = 0
      // ios
      document.getElementById('root').scrollTop = 0
    }
    componentWillUnmount() {
      this.props.clear()
    }

    render() {
      require('../../../../styles/healthReport/weekly/detail.less')
       const {member,recordPerMealAndDayData, report,location:{query:{dataClass}},detailList} = this.props
       const {begin,end} = report || {}
        if (!member || !report) { 
        return <noscript/> 
      }
       let valuesObj = [] 
      for(let i=0;i<7;i++){ 
        valuesObj[i] = [] 
        for(let j=0;j<7;j++){ 
          valuesObj[i][j]={'measurementDate':(end-i*1000*60*60*24)} 
        } 
      } 
      recordPerMealAndDayData && recordPerMealAndDayData.forEach((value, index) => {

        let thisIndex = parseInt((end + 1000*60*60*24 - value.measurementDate)/(1000*60*60*24))  

        valuesObj[thisIndex][value.mealPeroid] = value 
      }) 
      const {aboveNormalTimes,lowerTimes,normalTimes,higherTimes} = report || {}
      return (
        <div id="healthReportWeeklyDetail">
          <Title title='乐心健康周报'></Title>
          {dataClass == 'bloodPress' && <Top member={member} report={report}/>}
          {/* 血压情况 */}
          {dataClass == 'bloodPress' && <BpStatistics report={report}/> }

          {/* 血压趋势 */}
          {dataClass == 'bloodPress' && <BpTrend report={report}/> }

          {/* 评测结果 */}
          {dataClass == 'bloodPress' && <Result key="result" report={report}/> }
          {dataClass == 'bloodSugar' && <BsTop member={member} key="bstop" report={report}/>}
          {dataClass == 'bloodSugar' && <BsStatistics key="bsstatistics" aboveNormalNum={aboveNormalTimes+higherTimes} lowNum={lowerTimes} normalNum={normalTimes}  recordPerMealAndDayData={valuesObj}/>}
          {dataClass == 'bloodSugar' && <BsTrend key="bsTrend" report={report}/> }
          {dataClass == 'bloodSugar' && <BsHIstoryCompare key="bsHistoryCompare" detailList={detailList} /> }
        </div>
      )
    }
  })
