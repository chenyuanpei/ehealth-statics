import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {debug,getWeekStart,getWeekEnd} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import {RowFlex} from '../../../components/frozenui/grid'
import Data from '../../../components/sport/Data'
import Chart from '../../../components/sport/Chart'
import HistoryTitle from '../../../components/common/history/HistoryTitle'
import HistoryItem from '../../../components/common/history/HistoryItem'
import More from '../../../components/common/history/More'
import {setWechatTitle} from '../../../util/common'

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
  }

  constructor(props) {
    super(props);
    this.handleScroll=this.handleScroll.bind(this);
  }

  componentDidMount(){
    const {init,getStepList,params:{memberId}} = this.props;
    init(memberId);
    let isF=1
    getStepList({ts:new Date().getTime() + ( 24 * 60 * 60 * 1000),memberId,isF});

    window.addEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background='#ffffff'
  }

  componentWillUnmount() {
    localStorage.removeItem('t')
    localStorage.removeItem('weekNum')
    window.removeEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background=''
  }

  handleScroll() {
    const {getStepList,recordsLoading,params:{memberId}} = this.props;
    let tValue=localStorage.getItem('t')
    let t=tValue?tValue:0
    let p=window.scrollY
    if(t<=p){
      let flag = (window.scrollY+screen.height+50)>document.body.scrollHeight
      if(flag) {
        if (!recordsLoading) {
          setTimeout(a=>window.scrollTo(0, 9999999), 50)
          getStepList({ts:this.getFirstTs(),memberId});
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
    storage.setItem("thisTimeSport",thisTime)
    showTips(false)
  }

  render(){
    require('../../../styles/sport/sport.styl')
    const {member,recordsLoading,showMore,targetStep,getStepList,lastStepData,stepHourlyData,show} = this.props;
    const {nickname} = member || {}

    if(nickname){
      setWechatTitle(nickname+'的步数')
    }

    let target=targetStep.step?targetStep.step:0;

    return (
      <div className="sport-page">
        <div className="m-device-bind-tips" onClick={()=>this.props.push('device')} style={{display:show?'block':'none'}}>
          您还没有绑定手环，点击马上去绑定吧！
        </div>
        <div className="m-close" style={{display:show?'block':'none'}} onClick={()=>{this._closeTips()}}>+</div>
        <div className="sport-chart">
          <h3 className="title">今天</h3>
          <Chart stepHourlyData={stepHourlyData} />
        </div>
        <Data {...lastStepData} target={target} />
        {this._renderHistory()}
        <More recordsLoading={recordsLoading} showMore={showMore}/>
      </div>
    )
  }


  _renderHistory() {
    const {stepList,stepWeekList,params: {memberId}} = this.props

    return (<div>
      {
        stepWeekList && stepWeekList.map(
          (stepWeek, index) => (
            <div key={`ht${index}`}>
              <HistoryTitle
                date={stepWeek.title}
                value={'总 '+stepWeek.total+'步'}
              />
              <div className="history">
                {
                  stepWeek.days && stepWeek.days.map(
                    (stepDay, windex, array) => (
                      <HistoryItem
                        key={`hi${windex}`}
                        date={stepDay.date}
                        show={array.length-1==windex?false:true}
                        value={stepDay.step+'步'}
                        onClick={() => {this.props.push(`sport/${memberId}/history/${stepDay.queryDate}`)}}
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
    const {stepList} = this.props
    let firstTs=0;
    if(stepList.pedometerRecordDayList){
      stepList.pedometerRecordDayList.forEach((step,index,array)=>{
        if(array.length-1==index){
          let time=step.measurementTime.replace(/-/g, '/');
          time=new Date(time).getTime();
          firstTs=time;
          return;
        }
      })
    }
    return firstTs;
  }



})
