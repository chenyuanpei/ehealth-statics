import React, {Component, PropTypes} from 'react'
import {Tappable} from 'react-tappable'
import moment from 'moment'
import {connect} from 'react-redux'
import {debug,getWeekStart,getWeekEnd} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import {RowFlex} from '../../../components/frozenui/grid'
import Data from '../../../components/heartRate/Data'
import Chart from '../../../components/heartRate/Chart'
import HistoryTitle from '../../../components/common/history/HistoryTitle'
import HistoryItem from '../../../components/common/history/HistoryItem'
import More from '../../../components/common/history/More'
import ScrollView from '../../../components/common/scroll/ScrollView'


import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'

import {weightDataFormat} from '../../../util/weight/weight'
import {setWechatTitle,getUpdateDateDesc} from '../../../util/common'

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
    noMore:false,
    markSamples:[
      {
        name: '热身',
        color: '#ffe400',
        lv: 4,
      },
      {
        name: '燃脂',
        color: '#ffb500',
        lv: 3,
      },
      {
        name: '耐力',
        color: '#f26b08',
        lv: 2
      },
      {
        name: '极限',
        color: '#e51111',
        lv: 1
      },
    ]
  }

  state = {
    loaded:false
  }

  constructor(props) {
    super(props);
    this.handleScroll=this.handleScroll.bind(this);
  }

  componentDidMount(){
    const {init,getHeartRateList,params:{memberId}} = this.props;
    init(memberId);
    let d=new Date()
    d.setHours(23,59,59,999)
    let ts=d.getTime()
    let isF=1
    getHeartRateList({memberId,ts,isF});

    window.addEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background='#ffffff'
  }

  componentWillUnmount() {
    this.props.clear()
    localStorage.removeItem('weekNum')
    localStorage.removeItem('t')
    window.removeEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background=''
  }

  handleScroll() {
    const {getHeartRateList,recordsLoading,params:{memberId}} = this.props
    let tValue=localStorage.getItem('t')
    let t=tValue?tValue:0
    let p=window.scrollY
    if(t<=p){
      let flag = (window.scrollY+screen.height+50)>document.body.scrollHeight
      if(flag) {
        if (!recordsLoading) {
          setTimeout(a=>window.scrollTo(0, 9999999), 50)
          getHeartRateList({memberId,ts:this.getFirstTs()});
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
    storage.setItem("thisTimeHeartRate",thisTime)
    showTips(false)
  }


  render(){
    require('../../../styles/heartRate/heartRate.styl')
    const {member,recordsLoading,showMore,markSamples,heartRateData,show} = this.props;
    const {nickname} = member || {}

    if(nickname){
      setWechatTitle(nickname+'的心率')
    }

    let birthday=20
    if(member&&member.age){
      birthday=member.age
    }

    let chartDiv=[]
    //let loaded=localStorage.getItem('hrload')
    //if(loaded=='true'){
    //  chartDiv.push(<Chart heartRateData={heartRateData} birthday={birthday} />)
      //localStorage.setItem('hrload','false')
    //}

    return (
      <div className="heartRate-page">
        <div className="m-device-bind-tips" onClick={()=>this.props.push('device')} style={{display:show?'block':'none'}}>
          您还没有绑定手环，点击马上去绑定吧！
        </div>
        <div className="m-close" style={{display:show?'block':'none'}} onClick={()=>{this._closeTips()}}>+</div>
        <div className="bg">
          <div className="title">今天</div>
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
          <Chart heartRateData={heartRateData} birthday={birthday} />
        </div>
        <div className="desc">
          {this._renderNowHR()}
          <Data heartRateData={heartRateData} />
        </div>
        {this._renderHistory()}
        <More recordsLoading={recordsLoading} showMore={showMore}/>
      </div>
    )
  }

  _renderNowHR(){
    const {heartRateData} = this.props

    let hr=''
    if(heartRateData){
      hr=heartRateData.heartRate
    }

    return (
      <div className="desc-item">
        <h4 className="subtitle">
          <img className="icon" src={require('../../../../static/images/sports/icon-heart-rate.png')} />
          <span>当前心率</span>
        </h4>

        <div className="cur-heart-rate">
          <span className="num" style={{display:heartRateData?'block':'none'}}>{hr}</span>
          <span className="num"style={{display:!heartRateData?'block':'none'}}>−−</span>
          <div className="comment">
            <p className="ue">每分钟心跳数</p>
            <p className="ut">{this.updateDateDesc()}</p>
          </div>
        </div>
      </div>
    )
  }

  updateDateDesc(){
    const {heartRateData} = this.props
    if(heartRateData&&heartRateData.lastMeasurementDate)
      return getUpdateDateDesc(new Date(heartRateData.lastMeasurementDate.replace(/-/g,'/')))
    return '今天未记录'
  }

  _renderHistory() {
    const {heartRateWeekList,params:{memberId}} = this.props

    return (<div>
      {
        heartRateWeekList && heartRateWeekList.map(
          (hrWeek, index) => (
            <div key={`ht${index}`}>
              <HistoryTitle
                date={hrWeek.title}
                value=''
              />
              <div className="history">
                {
                  hrWeek.days && hrWeek.days.map(
                    (hrDay, windex, array) => (
                      <HistoryItem
                        key={`hi${windex}`}
                        date={hrDay.date}
                        show={array.length-1==windex?false:true}
                        value={hrDay.value}
                        onClick={() => {this.props.push(`heartRate/${memberId}/history/${hrDay.queryDate}`)}}
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


  getFirstTs(){
    const {heartRateList} = this.props
    let firstTs=-1;
    if(heartRateList.heartRateAnalysisList){
      heartRateList.heartRateAnalysisList.forEach((item,index,array)=>{
        if(array.length<30){
          firstTs=-1;
          return;
        }
        if(array.length-1==index){
          let time=item.measurementDate.replace(/-/g, '/');
          time=new Date(time).getTime();
          firstTs=time-1;
          return;
        }
      })
    }
    return firstTs;
  }



})
