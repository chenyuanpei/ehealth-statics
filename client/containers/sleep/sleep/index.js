import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {debug,getWeekStart,getWeekEnd} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import {RowFlex} from '../../../components/frozenui/grid'
import Data from '../../../components/sleep/Data'
import Chart from '../../../components/sleep/Chart'
import HistoryTitle from '../../../components/common/history/HistoryTitle'
import HistoryItem from '../../../components/common/history/HistoryItem'
import More from '../../../components/common/history/More'
import {setWechatTitle} from '../../../util/common'
import SleepLength from '../../../components/sleep/SleepLength'


import {latest} from '../../../util/sleep/SleepLengthTextConf'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component{
  static defaultProps={
    recordsLoading:false,
    showMore:false,
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

  constructor(props) {
    super(props);
    this.handleScroll=this.handleScroll.bind(this);
  }

  componentDidMount(){
    const {init,getSleepList,params:{memberId}} = this.props;
    init(memberId);
    let t = new Date()
    t.setHours(12,0,0,0)
    let isF=1
    getSleepList({ts:t.getTime(),memberId,isF});

    window.addEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background='#ffffff'
  }

  componentWillUnmount() {
    localStorage.removeItem('weekNum')
    localStorage.removeItem('t')
    window.removeEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background=''
  }

  handleScroll() {
    const {getSleepList,recordsLoading,params:{memberId}} = this.props;
    let tValue=localStorage.getItem('t')
    let t=tValue?tValue:0
    let p=window.scrollY
    if(t<=p){
      let flag = (window.scrollY+screen.height+50)>document.body.scrollHeight
      if(flag) {
        if (!recordsLoading) {
          setTimeout(a=>window.scrollTo(0, 9999999), 50)
          getSleepList({ts:this.getFirstTs(),memberId});
        }
      }
    }
    setTimeout(()=>{
      localStorage.setItem('t',p)
    },0)
  }
  _closeTips() {
    const {showTips} = this.props
    let storage=window.localStorage
    let thisTime = moment().format('X')
    storage.setItem("thisTimeSleep",thisTime)
    showTips(false)
  }

  render(){
    require('../../../styles/sleep/chart.styl')
    const {member,recordsLoading,showMore,sleepData,markSamples,show} = this.props;
    const {nickname} = member || {}

    if(nickname){
      setWechatTitle(nickname+'的睡眠')
    }

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
    let t=new Date().getTime();
    return (
      <div className="sleep-page">
        <div className="m-device-bind-tips" onClick={()=>this.props.push('device')} style={{display:show?'block':'none'}}>
          您还没有绑定手环，点击马上去绑定吧！
        </div>
        <div className="m-close" style={{display:show?'block':'none'}} onClick={()=>{this._closeTips()}}>+</div>
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
        <Data showPercent={true} sleepData={sd} />
        {this._renderHistory()}
        <More recordsLoading={recordsLoading} showMore={showMore}/>
      </div>
    )
  }


  _renderHistory() {
    const {sleepWeekList,params:{memberId}} = this.props

    return (<div>
      {
        sleepWeekList && sleepWeekList.map(
          (sleepWeek, index) => (
            <div key={`ht${index}`}>
              <HistoryTitle
                date={sleepWeek.title}
                value={'平均'+this.getSleepAvg(sleepWeek.avg)}
              />
              <div className="history">
                {
                  sleepWeek.days && sleepWeek.days.map(
                    (sleepDay, windex, array) => (
                      <HistoryItem
                        key={`hi${windex}`}
                        date={sleepDay.date}
                        show={array.length-1==windex?false:true}
                        value={<SleepLength showData={this.getSleepLength(latest,sleepDay.sleepTime,false,false)} />}
                        onClick={() => {this.props.push(`sleep/${memberId}/history/${sleepDay.queryDate}`)}}
                      />
                    )
                  )
                }
              </div>
            </div>
          )
        )
      }
    </div>)
  }

  getSleepAvg(value){
    let total = parseFloat(value)
    let hours = Math.floor(total/60)
    let minutes = total%60

    return hours+'小时'+Math.round(minutes)+'分钟'
  }

  getSleepLength(conf,value,big,onlyMinutes){
    let total = parseFloat(value)
    let hours = Math.floor(total/60)
    let minutes = total%60
    minutes=Math.round(minutes)
    let isInline=true;
    return {
      ...conf, hours, minutes,big,onlyMinutes,isInline
    }
  }


  getFirstTs(){
    const {sleepList} = this.props
    let firstTs=0;
    if(sleepList.sleepRecords){
      sleepList.sleepRecords.forEach((sleep,index,array)=>{
        if(array.length-1==index){
          let d = new Date(+sleep.analysisTime
            -24*60*60*1000
          )
          d.setHours(12,0,0,0)
          firstTs=d.getTime();
          return;
        }
      })
    }
    return firstTs;
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
