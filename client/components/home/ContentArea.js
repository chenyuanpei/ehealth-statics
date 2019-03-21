import React, {Component, PropTypes} from 'react'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Bp from './records/bp/Bp'
import Bs from './records/bs/Bs'
import Sport from './records/sport/Sports'
import Weight from './records/weight/Weight'
import Sleep from './records/sleep/Sleep'
import HeartRate from './records/heartRate/HeartRate'
// import Walking from './records/walking/Walking'
// import Weight from './records/weight/Weight'
// import Bg from './records/bg/Bg'
// import Sleep from './records/sleep/Sleep'
import Chat from './msg/Chat'
import HealthWeekly from './msg/HealthWeekly'
import MeasureActivity from './msg/MeasureActivity'
import Menu from './Memu'
import Options from './option'
@immutableRenderDecorator
export default class ContentArea extends Component {

  static propTypes = {
    member: PropTypes.shape({
      name: PropTypes.string,
      nickname: PropTypes.string,
      remark: PropTypes.string,
      manager: PropTypes.bool,
    }).isRequired,
    // bpValues: Bp.propTypes.values,
    // bsLastRecords: PropTypes.object,
    // bsActiveDegree : PropTypes.object,
    // bsTodayData: PropTypes.object,
    // bsDateLastRecord: PropTypes.object,
    // bpActiveDegree: Bp.propTypes.activeDegree,
    // doctors: PropTypes.array,
    // unreadCount: PropTypes.array,
    // moreInfo: Bp.propTypes.values,
  }

  render() {
    console.log('render ContentArea')
    // const {targetStep,lastStepData,stepHourlyData,stepList,
    //   lastWeightData,allWeightData,lastSevenWeightData,twoWeightData,
    //   sleepData,sleepList,
    //   heartRateData,heartRateList,
    //   member,bsTodayData, bsActiveDegree, bsLastRecords,bsDateLastRecord, moreInfo, bpActiveDegree, bpValues, doctors, lastMsg, leastReport} = this.props
    // require('../../styles/home/contentArea.less')
    // const bsTime = bsLastRecords&&bsLastRecords.measurementDate ? bsLastRecords.measurementDate : 0
    // const bpTime = bpValues && bpValues.size > 0 ? bpValues.last().measurementDate : 0
    // const bsLastValue = bsDateLastRecord ? bsDateLastRecord : {}
    // let showDiv=[]
    // //if(bsTime !==0 && bsTime > bpTime){
    // //  showDiv.push(<Bs {...{activeDegree: bsActiveDegree, lastValue: bsLastValue,values: bsTodayData, moreInfo:moreInfo}}/>)
    // //}else{
    // //  showDiv.push(<Bp {...{activeDegree: bpActiveDegree, values: bpValues, moreInfo: moreInfo,}}/>)
    // //}
    //
    // const weightTime = lastWeightData&&lastWeightData.measurementDate ? new Date(lastWeightData.measurementDate.replace(/-/g, "/")).getTime() : 0
    // let sportTime = 0
    // if(lastStepData&&lastStepData.measurementTime){
    //   sportTime = new Date(lastStepData.measurementTime.replace(/-/g, "/")).getTime()
    // }else if(stepList&&stepList.pedometerRecordDayList&&stepList.pedometerRecordDayList.length>0){
    //   sportTime = new Date(stepList.pedometerRecordDayList[0].created.replace(/-/g, "/")).getTime()
    // }
    //
    // let sleepTime = 0
    // if(sleepData&&sleepData.analysisDate){
    //   sleepTime = sleepData.analysisDate
    // }else if(sleepList&&sleepList.sleepRecords&&sleepList.sleepRecords.length>0){
    //   sleepTime = sleepList.sleepRecords[0].analysisTime
    // }
    // let hrTime = 0
    // if(heartRateData&&heartRateData.lastMeasurementDate){
    //   hrTime = new Date(heartRateData.lastMeasurementDate.replace(/-/g, "/")).getTime()
    // }else if(heartRateList&&heartRateList.length>0){
    //   hrTime = heartRateList[0].updated
    // }
    //
    // let times=[bpTime,bsTime,weightTime,sportTime,sleepTime,hrTime]
    // let max = Math.max.apply(null,times)
    // let i = times.indexOf(max)
    //
    // let loaded=localStorage.getItem('homeload')
    // if(loaded=='true'){
    //   if(i==0){
    //     showDiv.push(<Bp {...{activeDegree: bpActiveDegree, values: bpValues, moreInfo: moreInfo,}}/>)
    //   }else if(i==1){
    //     showDiv.push(<Bs {...{activeDegree: bsActiveDegree, lastValue: bsLastValue,values: bsTodayData, moreInfo:moreInfo}}/>)
    //   }else if(i==2){
    //     //体重
    //     showDiv.push(<Weight {...{lastWeightData,allWeightData,lastSevenWeightData,twoWeightData,moreInfo}}/>)
    //   }else if(i==3){
    //     //运动
    //     showDiv.push(<Sport {...{targetStep,lastStepData,stepHourlyData,stepList,moreInfo}}/>)
    //   }else if(i==4){
    //     //睡眠
    //     showDiv.push(<Sleep {...{sleepData,sleepList,moreInfo}}/>)
    //   }else if(i==5){
    //     //心率
    //     showDiv.push(<HeartRate {...{heartRateData,heartRateList,moreInfo,member}} />)
    //   }
    //   localStorage.setItem('homeload','false')
    // }

    //showDiv.push(<Sport {...{targetStep,lastStepData,stepHourlyData,stepList,moreInfo}}/>)
    //showDiv.push(<Sleep {...{sleepData,sleepList,moreInfo}}/>)
    //showDiv.push(<Weight {...{lastWeightData,allWeightData,lastSevenWeightData,twoWeightData,moreInfo}}/>)

    return (
      <div className="contentArea">
        {/* 血压 */}
        {/*<Bp {...{
          activeDegree: bpActiveDegree,
          values: bpValues,
          moreInfo: moreInfo,
        }}/>*/}
        {/*{bpValues && showDiv}*/}
        {/*<Sport stepHourlyData={null} moreInfo={moreInfo}/>*/}
        {/*<Weight lastSevenWeightData={null} moreInfo={moreInfo}/>*/}

        {/* 血压活动 */}
        {/*<MeasureActivity/>*/}
        {/* 医生消息，只显示我管理的成员 */}
       {/* {member.manager && doctors && !!doctors.length && doctors.map(({doctor, unreadCount}, index) => (
          <Chat key={doctor.id} doctor={doctor} count={unreadCount} lastMsg={lastMsg}/>
        ))}*/}
        {/* 周报 */}
        {/*{leastReport && leastReport.week && (*/}
          {/*<HealthWeekly*/}
            {/*nickname={member.remark || member.nickname || member.name}*/}
            {/*leastReport={leastReport}*/}
          {/*/>*/}
        {/*)}*/}
        {/* <Bg v1={6.2} v2={6.7}/ > */}
        {/* <Weight weight={56}/> */}
        {/* <Walking step={14980}/> */}
        {/* <Sleep hour={9} min={30}/> */}


        <Menu />


      </div>
    )
  }

}
