import React, {Component, PropTypes} from 'react'
import Immutable, {List, Map} from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'
import classnames from 'classnames'
import PubSub from 'pubsub-js'
import moment from 'moment'


import {RowFlex, Col} from '../../../frozenui/grid'

import {TOPIC_CHART_SPORT_BOX_CLICK, MORE_INFO_CLICK} from '../topic'
import Chart from '../../../heartRate/Chart'
import Top from '../common/Top'

import {round} from '../../../../util/sport/sport'
import {debug,getWeekStart,getWeekEnd,getUpdateDateDesc} from '../../../../util/common'


export default class HeartRate extends Component {

  static defaultProps = {
    lastStepData:{
      step:0,
      calories:0,
      distance:0
    }
  }

  constructor(props) {
    super(props)

    //this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  handleChartBoxClick() {
    PubSub.publish(TOPIC_CHART_SPORT_BOX_CLICK, 'heartRate')
  }

  moreInfoClick() {
    PubSub.publish(MORE_INFO_CLICK, 'heartRate')
  }

  render() {
    require('../../../../styles/record/record.less')
    require('../../../../styles/home/records.less')

    const {heartRateData,heartRateList,moreInfo,member} = this.props

    let total = 0
    if(heartRateList&&heartRateList.length>0){
      for(let i=0;i<heartRateList.length;i++){
        let item=heartRateList[i]
        let measurementTime = item.measurementDate.replace(/-/g, "/")
        if(getWeekStart().getTime()<=new Date(measurementTime).getTime()){
          //console.log(item.measurementDate)
          //本周数据
          total++
        }
      }
    }

    let birthday=1990
    if(member&&member.age){
      birthday=member.age
    }

    let dateStr=''
    if(heartRateData&&heartRateData.lastMeasurementDate){
      dateStr=getUpdateDateDesc(new Date(heartRateData.lastMeasurementDate.replace(/-/g,'/')))
    }

    return (
      <div className={classnames("recordBox",'heartRate-page')}>
        <div className={classnames("chartBox")} style={{background: '#2fa7c5',color:'#ffffff'}} onClick={() => this.handleChartBoxClick()}>
          <Top title="心率" text={`本周记录心率${total}天`}/>
          <div className="charTop">
            <span>今日数据</span>
            <span>{dateStr}</span>
          </div>
          <Chart isHome="true" heartRateData={heartRateData} birthday={birthday} />
        </div>

        <div className="recordInfo" style={{paddingLeft:'2.5rem',paddingTop:'0px',height:'2.2rem'}}>
          <div className="recordIconSport">
            <img className="iconImg" src={require('../../../../../static/images/sports/icon-index-heart-rate.png')} />
          </div>
          <RowFlex className="currentValBox">
            <Col className="texRow">
              <span style={{lineHeight:'1rem'}}>{heartRateData?heartRateData.heartRate:'--'}</span>
              <span>{'次/分'}</span>
            </Col>
            <Col className="texRow">
              <span style={{lineHeight:'1rem'}}>{heartRateData?heartRateData.maxHeartRate:'--'}</span>
              <span>{'最高 次/分'}</span>
            </Col>
            <Col className="texRow">
              <span style={{lineHeight:'1rem'}}>{heartRateData?heartRateData.minHeartRate:'--'}</span>
              <span>{'最低 次/分'}</span>
            </Col>
          </RowFlex>
        </div>

        {moreInfo &&
          <div onClick={() => this.moreInfoClick()} className="m-record-more"><div>更多数据</div><span></span></div>
        }
      </div>
    )
  }

  latestStep(){
    const {lastStepData} = this.props;
    return lastStepData&&lastStepData.step >= 0 ? lastStepData.step : 0
  }

  latestCalories(){
    const {lastStepData} = this.props;
    return lastStepData&&lastStepData.calories >= 0 ? round(lastStepData.calories, 10) : 0
  }

  latestDistance(){
    const {lastStepData} = this.props;
    return lastStepData&&lastStepData.distance >= 0 ? round(lastStepData.distance / 1000, 10) : 0
  }
}
