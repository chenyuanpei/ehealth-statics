import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
// utils
import {calc} from '../../../util/setFontSize'
// selector
import selectors from './selectors'
// actions
import actions from './actions'
// components
import ListTop from '../../../components/record/recordList/listTop'
import Title from '../../../components/common/title/Title'
import RecordTab from '../../../components/record/recordList/recordTab'
import RecordBsTab from '../../../components/record/recordList/recordBsTab'
import RecordSportTab from '../../../components/record/recordList/recordSportTab'
import {filter} from '../../../util/record/record'
import {getUpdateDateDesc} from '../../../util/common'
export default connect(
  selectors,
  actions
)(class extends Component {

  componentDidMount() {
    const {init, params:{id:memberId}} = this.props
    init({
      memberId
    })
  }
  _renderHead(){
    const {member:{nickname, headImgurl, sex, birthday},params: {id}} = this.props
    let years = birthday ? parseInt((moment().years() - moment(birthday).years())): ''
    return(
        <ListTop
          nickname={nickname} headImgurl={headImgurl} age={years} sex={sex === 1 ? '男' : '女'}
          onClick={() => this._go(`member/${id}`)}
          />
    )
  }
  _renderTabContent() {
    const {bpLastRecords} = this.props

    return (
      bpLastRecords && this._renderTab()

    )
  }
  _renderTab() {
    const {bsLastRecord, lastStepData,lastWeightData,sleepData,heartRateData,bpLastRecords, params: {id}} = this.props

    const lastValue = bpLastRecords && bpLastRecords.size > 0 ? bpLastRecords.last() : {}
    const lastValueTime = lastValue && lastValue.measurementDate ? moment(lastValue.measurementDate).format('MM-DD HH:mm') : ''


    let stepTime=''
    if(lastStepData){
      let time = lastStepData.measurementTime.replace(/-/g, '/')
      time = new Date(time).getTime()
      stepTime=getUpdateDateDesc(time)
    }

    let hrTime=''
    if(heartRateData){
      let time = heartRateData.lastMeasurementDate.replace(/-/g, '/')
      time = new Date(time).getTime()
      hrTime=getUpdateDateDesc(time)
    }

    let weightTime=''
    if(lastWeightData){
      let time = lastWeightData.measurementDate.replace(/-/g, '/')
      weightTime=new Date(time).format('MM-dd hh:mm')
    }

    let hours=0,minutes=0
    if(sleepData&&sleepData.sleepHoursM){
      let total = parseFloat(sleepData.sleepHoursM)
      hours = Math.floor(total/60)
      minutes = total%60
      minutes = Math.round(minutes)
    }
    return (
       <div className="m-record-tab-wrap">

         <RecordSportTab name='步数' text={lastStepData&&lastStepData.step?lastStepData.step:'今日未记录'} unit={lastStepData&&lastStepData.step?'步':''}
                         tabTime = {stepTime}
                         image={require('../../../../static/images/record/icon_sport.png')}
                         onClick={() => this._go(`sport/${id}`)}/>

         <RecordSportTab name='体重' data={lastWeightData} text={lastWeightData&&lastWeightData.weight?lastWeightData.weight:'未记录'} unit={lastWeightData&&lastWeightData.weight?'kg':''}
                         tabTime = {weightTime}
                         image={require('../../../../static/images/record/icon_weight.png')}
                         onClick={() => this._go(`weight/${id}`)}/>

         <RecordSportTab name='睡眠' text={sleepData&&sleepData.sleepTime?hours:'昨晚未记录'} unit={sleepData&&sleepData.sleepTime?'小时':''}
                         text2={sleepData&&sleepData.sleepTime?minutes:''} unit2={sleepData&&sleepData.sleepTime?'分钟':''}
                         isSleep='true'
                         tabTime = {sleepData&&sleepData.sleepTime?'昨晚':''}
                         image={require('../../../../static/images/record/icon_sleep.png')}
                         onClick={() => this._go(`sleep/${id}`)}/>

         <RecordSportTab name='心率' text={heartRateData&&heartRateData.heartRate?heartRateData.heartRate:'今日未记录'} unit={heartRateData&&heartRateData.heartRate?'次/分':''}
                         tabTime = {hrTime}
                         image={require('../../../../static/images/record/icon_heart_rate.png')}
                         onClick={() => this._go(`heartRate/${id}`)}/>


         <RecordTab name='血压' systolicPressure={lastValue.systolicPressure}
                     diastolicPressure={lastValue.diastolicPressure}
                     heartRate={lastValue.heartRate}
                     tabTime = {lastValueTime}
                     image={require('../../../../static/images/record/icon_list_blood_pressure.png')}
                     onClick={() => this._go(`record/${id}/bp/history`)}/>

         <RecordBsTab name='血糖' {...bsLastRecord} image={require('../../../../static/images/record/icon_list_blood_sugar.png')}
                     onClick={() => this._go(`record/${id}/bs/bstable`)}/>

       </div>
     )
  }
  render() {
    const {member} = this.props
    return (
      <div>
        <Title title="数据列表"/>
          {
            member &&
            [
              this._renderHead(),
              this._renderTabContent()
            ]
          }
      </div>
    )
  }


  _go(url) {
    this.props.push(url)
  }
})
