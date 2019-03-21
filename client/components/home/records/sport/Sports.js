import React, {Component, PropTypes} from 'react'
import Immutable, {List, Map} from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'
import classnames from 'classnames'
import PubSub from 'pubsub-js'
import moment from 'moment'


import {RowFlex, Col} from '../../../frozenui/grid'

import {TOPIC_CHART_SPORT_BOX_CLICK, MORE_INFO_CLICK} from '../topic'
import Chart from '../../../sport/Chart'
import Top from '../common/Top'

import {round} from '../../../../util/sport/sport'
import {debug,getWeekStart,getWeekEnd,getUpdateDateDesc} from '../../../../util/common'

export default class Sport extends Component {

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
    PubSub.publish(TOPIC_CHART_SPORT_BOX_CLICK, 'sport')
  }

  moreInfoClick() {
    PubSub.publish(MORE_INFO_CLICK, 'sport')
  }

  render() {
    require('../../../../styles/record/record.less')
    require('../../../../styles/home/records.less')

    const {targetStep,lastStepData,stepHourlyData,stepList,moreInfo} = this.props

    let total = 0
    if(stepList&&stepList.pedometerRecordDayList&&stepList.pedometerRecordDayList.length>0){
      for(let i=0;i<stepList.pedometerRecordDayList.length;i++){
        let item=stepList.pedometerRecordDayList[i]
        let measurementTime = item.measurementTime.replace(/-/g, "/")
        if(getWeekStart().getTime()<=new Date(measurementTime).getTime()){
          //本周数据
          if(item.step>=targetStep){
            total++
          }
        }
      }
    }

    let dateStr=''
    if(lastStepData&&lastStepData.measurementTime){
      dateStr=getUpdateDateDesc(new Date(lastStepData.measurementTime.replace(/-/g,'/')))
    }

    return (
      <div className={classnames("recordBox",'sport-page')}>
        <div className={classnames("chartBox",'sport-chart')} onClick={() => this.handleChartBoxClick()}>
          <Top title="步数" text={`本周达成目标${total}次`}/>
          <div className="charTop">
            <span>今日数据</span>
            <span>{dateStr}</span>
          </div>
          <Chart isHome="true" stepHourlyData={stepHourlyData} />
        </div>

        <div className="recordInfo" style={{paddingTop:'0px',height:'2.2rem',paddingLeft:'3.32rem'}}>
          <div className="recordIconSport">
            <img className="iconImg" src={require('../../../../../static/images/sports/icon-index-sport.png')} />
          </div>
          <RowFlex className="currentValBox">
            <Col className="texRow">
              <span style={{lineHeight:'1rem'}}>{this.latestStep()}</span>
              <span>{'步'}</span>
            </Col>
            <Col className="texRow">
              <span style={{lineHeight:'1rem'}}>{this.latestDistance()}</span>
              <span>{'公里'}</span>
            </Col>
            <Col className="texRow">
              <span style={{lineHeight:'1rem'}}>{this.latestCalories()}</span>
              <span>{'大卡'}</span>
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
