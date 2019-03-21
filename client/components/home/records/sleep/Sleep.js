import React, {Component, PropTypes} from 'react'
import Immutable, {List, Map} from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'
import classnames from 'classnames'
import PubSub from 'pubsub-js'
import moment from 'moment'

import {getUpdateDateDesc,checkFloat} from '../../../../util/common'
import {RowFlex, Col} from '../../../frozenui/grid'

import {TOPIC_CHART_SPORT_BOX_CLICK, MORE_INFO_CLICK} from '../topic'
import Chart from '../../../sleep/Chart'
import Top from '../common/Top'

import {round} from '../../../../util/sport/sport'
import {debug,getWeekStart,getWeekEnd} from '../../../../util/common'

export default class Sleep extends Component {

  static defaultProps = {
  }

  constructor(props) {
    super(props)

    //this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  handleChartBoxClick() {
    PubSub.publish(TOPIC_CHART_SPORT_BOX_CLICK, 'sleep')
  }

  moreInfoClick() {
    PubSub.publish(MORE_INFO_CLICK, 'sleep')
  }

  render() {
    require('../../../../styles/record/record.less')
    require('../../../../styles/home/records.less')

    const {sleepData,sleepList,moreInfo} = this.props

    let total = 0
    if(sleepList&&sleepList.sleepRecords&&sleepList.sleepRecords.length>0){
      for(let i=0;i<sleepList.sleepRecords.length;i++){
        let item=sleepList.sleepRecords[i]
        let measurementTime = item.analysisTime
        if(getWeekStart().getTime()<=new Date(measurementTime).getTime()){
          //本周数据
          total++
        }
      }
    }

    return (
      <div className={classnames("recordBox",'sleep-page')}>
        <div className={classnames("chartBox")} style={{background: '#5b479f',color:'#ffffff'}} onClick={() => this.handleChartBoxClick()}>
          <Top title="睡眠" text={`本周记录睡眠${total}次`}/>
          <div className="charTop">
            <span>昨晚数据</span>
            <span></span>
          </div>
          <Chart isHome="true" sleepData={sleepData} />
        </div>

        <div className="recordInfo" style={{paddingTop:'0px',height:'2.2rem'}}>
          <div className="recordIconSport">
            <img className="iconImg" src={require('../../../../../static/images/sports/icon-index-sleep.png')} />
          </div>
          <RowFlex className="currentValBox">
            <div className="sleepData">
              <span className="sleepDataValue">{this.getSleepHour()}<span style={{display:!this.getSleepHour()?'inline':'none'}}>&minus;&minus;</span></span>
              <span className="sleepDataUnit">小时</span>
              <span className="sleepDataValue">{this.getSleepMinute()}<span style={{display:!this.getSleepMinute()?'inline':'none'}}>&minus;&minus;</span></span>
              <span className="sleepDataUnit">分钟</span>
            </div>
          </RowFlex>
        </div>

        {moreInfo &&
        <div onClick={() => this.moreInfoClick()} className="m-record-more"><div>更多数据</div><span></span></div>
        }
      </div>
    )
  }

  getSleepHour(){
    const {sleepData} = this.props
    if(sleepData&&sleepData.shllowSleepHoursM){
      let totalHours = Math.floor((parseInt(sleepData.shllowSleepHoursM) + parseInt(sleepData.deepSleepHoursM)) / 60)
      return totalHours
    }
    return ''
  }

  getSleepMinute(){
    const {sleepData} = this.props
    if(sleepData&&sleepData.shllowSleepHoursM){
      let totalMinutes = (parseInt(sleepData.shllowSleepHoursM) + parseInt(sleepData.deepSleepHoursM)) % 60
      return totalMinutes
    }
    return ''
  }
}
