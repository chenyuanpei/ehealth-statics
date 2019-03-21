import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
import PubSub from 'pubsub-js'
// components
import Title from '../../../components/common/title/Title'
import WeightDataTable from '../../../components/weight/WeightDataTable'
import {RowFlex} from '../../../components/frozenui/grid'
import Data from '../../../components/weight/Data'


import {weightDataFormat} from '../../../util/weight/weight'
import {TOPIC_WEIGHT_DATA_TABLE_REPORT_LINK} from '../../../components/weight/WeightDataTable'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component{
  static defaultProps={
    data:{}
  }

  state={
    deleteBox:false
  }

  componentDidMount(){
    const {init,params: {weightId,memberId},push} = this.props;
    init({weightId,memberId});

    document.getElementsByTagName('body')[0].style.background='#ffffff'

    // 体重报告链接
    this.reportLinkToken = PubSub.subscribe(TOPIC_WEIGHT_DATA_TABLE_REPORT_LINK, (topic,data) => {
      push(`/weight/${data.memberId}/report/${data.id}`)
    })
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.background=''
    PubSub.unsubscribe(this.reportLinkToken)
  }


  render(){
    require('../../../styles/weight/weight.styl')
    const {weightData,allWeightData,changeDelete,deleteWeightData,params: {weightId,memberId}} = this.props;
    const {deleteBox} = this.state
    // weightDataFormat(weightData)

    let twoWeight=0
    let allLen=0;
    if(allWeightData.weightList){
      allWeightData.weightList.forEach((temp,index,array)=>{
        allLen=array.length;
        if(temp.id==weightData.id){
          if(array[index+1]){
            twoWeight=array[index+1].weight
          }else{
            twoWeight=temp.weight
          }
          return;
        }
      })
    }

    return (
      <div className="weight-page">

        <Title title="体重历史"/>

        <div className="weight-date">
            <div className="weight-date-text">{this.getWeightTime()}</div>
            <div src="" className="weight-delete" onClick={() => {
              if(allLen>1)
                this.setState({deleteBox:true})
              //changeDelete(true)
            }}>
              删除
            </div>
        </div>
        <Data {...weightData} twoWeight={twoWeight} />
        <WeightDataTable memberId={memberId} {...weightData}></WeightDataTable>
        <div style={{display: deleteBox?'block':'none'}} className="alert-bg"></div>
        <div style={{display: deleteBox?'block':'none'}} className="alert-delete">
          <div className="alert-delete-text">是否删除该笔体重数据?</div>
          <div className="alert-delete-btn">
            <div onClick={() => {this.setState({deleteBox:false})}} className="alert-delete-cancel">取消</div>
            <div onClick={() => {
              deleteWeightData(weightId)
              //window.history.back()
            }} className="alert-delete-confirm">确定</div>
          </div>
        </div>
      </div>
    )
  }

  getWeightTime(){
    const {weightData} = this.props;

    let text=''
    if(weightData && weightData.measurementDate){
      let time = weightData.measurementDate;
      text=new Date(time).format('M月d日 hh:mm');
    }
    return text;
  }

  //hiddenDelete(){
  //  this.deleteBox=false
  //}
  //
  //showDelete(){
  //  this.deleteBox=true
  //}

  deleteWeight(){

  }
})
