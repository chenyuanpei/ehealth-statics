import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import {RowFlex} from '../../../components/frozenui/grid'
import Data from '../../../components/sleep/Data'
import Chart from '../../../components/sleep/Chart'

import {titleTipsDay,titleTipsWeek} from '../../../util/sport/sport'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component{
  static defaultProps={
    data:{},
    markSamples:[
      {
        name: '深睡',
        color: '#6556c8',
        lv: 3,
      },
      {
        name: '浅睡',
        color: '#8996ed',
        lv: 2
      },
      {
        name: '觉醒',
        color: '#cdd3ff',
        lv: 1
      },
    ],
  }

  componentDidMount(){
    const {init,params: {t,memberId}} = this.props;
    init({t,memberId});

    document.getElementsByTagName('body')[0].style.background='#ffffff'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.background=''
  }


  render(){
    require('../../../styles/sleep/chart.styl')
    const {sleepData,markSamples,params: {t}} = this.props;
    let sd={
      sh:0,
      de:0,
      aw:0
    }
    if(sleepData){
      sd={
        sh:sleepData.shllowSleepHoursM,
        de:sleepData.deepSleepHoursM,
        aw:sleepData.awakeningHoursM
      }
    }

    return (
      <div className="sleep-page">
        <Title title="睡眠历史" />
        <div className="bg">
          <div className="title">{this.getRecentDateName(this.getStdTime(parseInt(t)))}</div>
          <ul className="mark-samples">
            {
              markSamples&&markSamples.map(
                (item,index)=>(
                  <li key={'i'+index}>
                    <span className="color-mark" style={{background:item.color}}></span>
                    {item.name}
                  </li>
                )
              )
            }
          </ul>
          <Chart sleepData={sleepData} />
        </div>
        <Data sleepData={sd} />
      </div>
    )
  }


  getRecentDateName(t){
    let stdNow = new Date()
    stdNow.setHours(12,0,0,0)

    let offset = (stdNow-t)/(24*60*60*1000)
    t = new Date(t)
    if(offset == 0){
      return '昨晚'
    }else if(offset==1){
      return '前晚'
    }else{
      return (t.getMonth()+1)+'月'+t.getDate()+'日'
    }
  }

  getStdTime(t){
    let d = new Date(t)
    d.setHours(12,0,0,0)
    return d.getTime()
  }
})
