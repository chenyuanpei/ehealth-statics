import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import {RowFlex} from '../../../components/frozenui/grid'

// jsApi
import {scanQRCode} from '../../../util/wxJs/wxApi'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component{
  static defaultProps={
    timer:null,
    userRewardCount:0,
  }

  componentDidMount(){
    const {init} = this.props;
    init();

    this.timer=setInterval(() => {
      this._scroll();
    },10);;
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }


  render(){
    require('../../../styles/newbieTask/index.less')
    const {userRewardStatus,getReward,userTaskStatus} = this.props;

    let num=0
    for(let i=1;i<=3;i++) {
      if (userTaskStatus && userTaskStatus[i] && userTaskStatus[i].status) {
        num++
      }
    }
    let btnStyle='btn btn-g';
    if(num==3){
      btnStyle='btn btn-y';
    }

    return (
      <div className="newbie-task">
        <Title title="乐心健康新手任务"/>
        <div className="tips">新手上路，点亮3个新手任务，即可领取奖励!</div>
        {this._renderTask()}
        <div className={btnStyle} onClick={() => { if(num==3){
          getReward()
          //window.location.href='https://h5.koudaitong.com/v2/apps/cards?alias=dyqt3uq1'
        } }}>领取任务奖励</div>
        {this._renderNum()}
        {this._renderList()}
        {this._renderRule()}
      </div>
    )
  }

  _renderTask(){
    const {userTaskStatus} = this.props;
    let items=[];
    //let userTaskStatus='{"1":{"status":true}}';
    //userTaskStatus=JSON.parse(userTaskStatus)
    for(let i=1;i<=3;i++){
      if(i==1){
        if(userTaskStatus&&userTaskStatus[i]&&userTaskStatus[i].status){
          items.push(<div key={i} className="task-item task-item-y">
            <div className="task-title task-title-y">任务1</div>
            <div className="task-tips task-tips-y">绑定成功</div>
          </div>);
        }else{
          items.push(<div key={i} className="task-item task-item-g">
            <div className="task-title task-title-g">任务1</div>
            <div className="task-tips task-tips-g">记得绑定<br/>完成后,回来<br/>继续任务喔!</div>
            <div className="task-btn1" onClick={() => this._toBind()}>去绑定</div>
          </div>);
        }
      }

      if(i==2){
        if(userTaskStatus&&userTaskStatus[i]&&userTaskStatus[i].status){
          items.push(<div key={i} className="task-item task-item-y">
            <div className="task-title task-title-y">任务2</div>
            <div className="task-tips task-tips-y">邀请成功</div>
          </div>);
        }else{
          items.push(<div key={i} className="task-item task-item-g">
            <div className="task-title task-title-g">任务2</div>
            <div className="task-tips task-tips-g">邀请亲人<br/>关注数据即可</div>
            <div className="task-btn2" onClick={() => this._toInvitation()}>去邀请</div>
          </div>);
        }
      }

      if(i==3){
        let day=0
          if(userTaskStatus&&userTaskStatus[i]&&userTaskStatus[i].day>=0){
          day=7-userTaskStatus[i].day
        }
        if(userTaskStatus&&userTaskStatus[i]&&userTaskStatus[i].status){
          items.push(<div key={i} className="task-item task-item-y">
            <div className="task-title task-title-y">任务3</div>
            <div className="task-tips task-tips-y">7天测量血压已成功</div>
          </div>);
        }else{
          items.push(<div key={i} className="task-item task-item-g">
            <div className="task-title task-title-g">任务3</div>
            <div className="task-tips task-tips-g">还差{day}天,快<br/>去测量完<br/>成吧!</div>
          </div>);
        }
      }
    }

    return (
      <RowFlex className="task-div">
        {items}
      </RowFlex>
    )
  }

  _renderNum(){
    const {userRewardCount} = this.props;
    let list=[0];
    if(userRewardCount){
      list=(userRewardCount+'').split('');
    }

    let items=[];
    for(let i=0;i<list.length;i++){
      items.push(<div className="num-item" key={i}>{list[i]}</div>);
    }
    return (
      <div className="people-div">
        已有
          <span className="num-div">
            {items}
          </span>
        人领取了新手任务奖励,你还在等什么?
      </div>
    )
  }

  _renderList(){
    const {userRewardList} = this.props;

    let items=[]
    //let list=['呵呵哒丶丶丶丶','呵呵哒','呵呵哒','呵呵哒','呵呵哒丶丶丶丶','呵呵哒','呵呵哒丶丶丶丶','呵呵哒','呵呵哒','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---end'];
    //list.forEach(
    //  (item,index)=>{
    //    items.push(<div className="list-item" key={index}>【{item}】已经完成了新手任务,领取了新手奖励!</div>);
    //  }
    //)

    let length=0
    if(userRewardList&&userRewardList.length>0){
      length=userRewardList.length
      userRewardList.forEach(
        (item,index)=>{
          items.push(<div className="list-item" key={index}>【{item.nickname}】已经完成了新手任务,领取了新手奖励!</div>);
        }
      )
    }

    return (
      <div className="task-list">
        <div className="opacity-div"></div>
        <div className="list-div">
          <div id="scroll-div" className="scroll-div">
            <div style={{width:length<=5?'10.42rem':'',height:length<=5?'4.02rem':''}}>{items}</div>
            <div>{items}</div>
          </div>
        </div>
      </div>
    )
  }

  _renderRule(){

    return (
      <div className="rule-div">
        <div className="title">活动规则</div>
        <div className="content">只要您完成我们的新手任务，就可以获得抽奖机会,百分百中奖,奖品多多,包括ziva手环、mambo 2、 mambo watch、S7体脂秤、10元商城优惠券等等。</div>
        <div className="title">活动时间</div>
        <div className="content">长期有效</div>
        <div className="title">注意事项</div>
        <div className="content">
          <div>1.每个用户只有1次完成新手任务和抽奖的机会;</div>
          <div>2.本活动的奖品将在您提交中奖资料后的3个工作日内给您寄出;</div>
          <div>3.本活动在法律允许的范围内,乐心健康拥有最终解释权。</div>
        </div>
        <div className="bottom">Copyright © 2016 Lifesense</div>
      </div>
    )
  }

  _scroll(){
    const {userRewardList} = this.props;
    //let list=['呵呵哒丶丶丶丶','呵呵哒','呵呵哒','呵呵哒','呵呵哒丶丶丶丶','呵呵哒','呵呵哒丶丶丶丶','呵呵哒','呵呵哒','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---','呵呵哒---end'];

    if(userRewardList&&userRewardList.length>5){
      let scrollDiv=document.getElementById('scroll-div');
      let topValue=scrollDiv.style.top;
      if(topValue){
        let num=parseFloat(topValue.substring(0,topValue.indexOf('rem')))
        let len=userRewardList.length*-0.8;
        if(num<len){
          num=0;
        }
        scrollDiv.style.top=(num-0.01)+'rem'
        //console.log(num)
      }else{
        scrollDiv.style.top='-0.01rem';
      }
    }
  }

  _toInvitation() {
    this.props.push(`newbieTask/invitation`)
  }

  _getReward(){

  }

  _toBind(){
    scanQRCode();
  }
})
