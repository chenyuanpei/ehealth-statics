import React, {Component, PropTypes} from 'react'
import PubSub from 'pubsub-js'
import {Tappable} from 'react-tappable'
import {connect} from 'react-redux'
import moment from 'moment'
import {debug,getWeekStart,getWeekEnd} from '../../../util/common'
// components
import WeightDataTable from '../../../components/weight/WeightDataTable'
import {TOPIC_WEIGHT_DATA_TABLE_REPORT_LINK,TOPIC_WEIGHT_DATA_TABLE_BMI_LINK} from '../../../components/weight/WeightDataTable'
import {RowFlex} from '../../../components/frozenui/grid'
import Data from '../../../components/weight/Data'
import Chart from '../../../components/weight/Chart'
import HistoryTitle from '../../../components/common/history/HistoryTitle'
import HistoryItem from '../../../components/common/history/HistoryItem'
import More from '../../../components/common/history/More'
import ScrollView from '../../../components/common/scroll/ScrollView'
import Button from '../../../components/common/button/Button'

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'

import {weightDataFormat} from '../../../util/weight/weight'
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
    weightData:{},
    recordsLoading:false,
    showMore:false,
    noMore:false
  }

  constructor(props) {
    super(props);
    this.handleScroll=this.handleScroll.bind(this);
  }

  componentDidMount(){
    const {init,getWeightList,params:{memberId},push} = this.props;
    init(memberId);
    getWeightList({ts:0,memberId});

    window.addEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background='#ffffff'

    // 体重报告链接
    this.reportLinkToken = PubSub.subscribe(TOPIC_WEIGHT_DATA_TABLE_REPORT_LINK, (topic,data) => {
      push(`/weight/${data.memberId}/report/${data.id}`)
    })
    // BMI链接
    this.bmiLinkToken = PubSub.subscribe(TOPIC_WEIGHT_DATA_TABLE_BMI_LINK, (topic,data) => {
      push(`/weight/${memberId}/bmi?bmi=${data.bmi}`)
    })
  }

  componentWillUnmount() {
    localStorage.removeItem('t')
    window.removeEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background=''
    PubSub.unsubscribe(this.reportLinkToken)
    PubSub.unsubscribe(this.bmiLinkToken)
  }

  handleScroll() {
    const {getWeightList,recordsLoading,params:{memberId}} = this.props;
    let tValue=localStorage.getItem('t')
    let t=tValue?tValue:0
    let p=window.scrollY
    if(t<=p){
      let flag = (window.scrollY+screen.height+50)>document.body.scrollHeight
      if(flag) {
        if (!recordsLoading) {
          setTimeout(a=>window.scrollTo(0, 9999999), 50)
          getWeightList({ts:this.getFirstTs(),memberId});
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
    storage.setItem("thisTimeWeight",thisTime)
    showTips(false)
  }
  render(){
    require('../../../styles/weight/weight.less')
    const {lastSevenWeightData,lastWeightData,twoWeightData,weightList,member,getWeightList,recordsLoading,showMore,deviceData,show} = this.props;
    const {nickname} = member || {}

    let twoWeight=0
    if(twoWeightData){
      twoWeight=twoWeightData.weight;
    }

    if(lastWeightData)
      weightDataFormat(lastWeightData)

    if(nickname){
      setWechatTitle(nickname+'的体重')
    }

    let sevenWeightData=lastSevenWeightData?lastSevenWeightData:[];

    let productTypeCode=deviceData?deviceData.productTypeCode:''

    return (
      <div className="weight-page">
        <div className="m-device-bind-tips" onClick={()=>this.props.push('device')} style={{display:show?'block':'none'}}>
          您还没有绑定体脂秤，点击马上去绑定吧！
        </div>
        <div className="m-close" style={{display:show?'block':'none'}} onClick={()=>{this._closeTips()}}>+</div>
        <div className="chart-title">
          最近7次
        </div>

        <Chart lastSevenWeightData={sevenWeightData} />
        <Data {...lastWeightData} twoWeight={twoWeight} productTypeCode={productTypeCode} />
        {this._renderTable()}
        {this._renderHistory()}
        <More recordsLoading={recordsLoading} showMore={showMore}/>
        {this._renderAddRecord()}
      </div>
    )
  }

  _renderTable() {
    const {lastWeightData,params:{memberId}} = this.props
    return (
      <WeightDataTable memberId={memberId} {...lastWeightData}></WeightDataTable>
    )
  }
  _renderHistory() {
    const {weightList,weightWeekList,params:{memberId}} = this.props
    return (<div>
      {
        weightWeekList && weightWeekList.map(
          (weightWeek, index) => (
            <div key={`ht${index}`}>
              <HistoryTitle
                date={weightWeek.weekText}
                value={'平均'+weightWeek.avg+'kg'}
              />
              <div className="history">
                {
                  weightWeek.weekList && weightWeek.weekList.map(
                    (weightDay, windex, array) => (
                      <HistoryItem
                        key={`hi${windex}`}
                        date={weightDay.text}
                        pbfValue={weightDay.pbfValue}
                        show={array.length-1==windex?false:true}
                        value={weightDay.value+'kg'}

                        onClick={() => {this.props.push(`weight/${memberId}/history/${weightDay.id}`)}}
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
  _pushAdd() {
    const {push, params:{memberId}} = this.props
    push(`weight/${memberId}/add`)
  }
  _renderAddRecord() {
    let {member} = this.props
    let showDel = member ? member['manager'] : false
    if (!member || !showDel) {
      return (
        <noscript/>
      )
    }
    return (
      <div className='m-tp-chart-bottom m-show-last'>
        <Button className="m-tp-btn" onClick={() => {this._pushAdd()}}>
          <img className="btnImg" src={require('../../../../static/images/record/bs/icon_bloodsugar_record.png')} alt=""/>记录数据
        </Button>
      </div>
    )
  }
  getFirstTs(){
    const {weightList} = this.props
    let firstTs=0;
    if(weightList.weightList){
      weightList.weightList.forEach((weightItem,index,array)=>{
        if(array.length<30){
          firstTs=-1;
          return;
        }
        if(array.length-1==index){
          let time=weightItem.measurementDate.replace(/-/g, '/');
          time=new Date(time).getTime();
          firstTs=time-1;
          return;
        }
      })
    }
    return firstTs;
  }

  getWeightListItem(i){
    const {weightList} = this.props
    let weightItem;
    if(weightList.weightList){
      weightList.weightList.forEach((weight,index)=>{
        if(i==index){
          weightItem=weight;
          return;
        }
      })
    }
    return weightItem;
  }

  getWeightWeekList(){
    const {weightList,weightWeekList} = this.props

  }



})
