import React, {Component} from 'react'
import {connect} from 'react-redux'

// components

import Title from '../../../components/common/title/Title'
import {toast} from '../../../components/common/toast/PubSubToast'
import {closeWindow} from '../../../util/wxJs/wxApi'
import Rule from '../../../components/special/Rule'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component {
  state = {
    companyName:'',
    companyScale:'',
    name:'',
    duty:'',
    phone:''
  }
  componentDidMount() {
    const {init} = this.props
    init()
  }
  handleChange(name,event){
    var newState={};
    newState[name]=event.target.value;
    this.setState(newState);
  }
  _checkPhone(num) {
    var telReg = !!num.match(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
    if(telReg){
      return false;
    }
    return true
  }
  submitHandler(){
    const {companyName,companyScale,name,duty,phone} = this.state
    const {postData} = this.props
    if (!companyName) {
      toast('请填写公司名称')
      return
    }
    if (!companyScale) {
      toast('请填写公司规模')
      return
    }
    let reg = !!companyScale.match(/^[1-9]\d*$/)
    if(!reg){
      toast('公司规模请填写正整数')
      return
    }
    if (!name) {
      toast('请填写申请人姓名')
      return
    }
    if (!duty) {
      toast('请填写申请人职位')
      return
    }
    if (!phone) {
      toast('请填写申请人联系电话')
      return
    }

    if(this._checkPhone(phone)){
      toast('电话号码有误，请重新填写')
      return
    }
    postData({
      enterpriseName:companyName,
      enterpriseScale:companyScale,
      name:name,
      duty:duty,
      linkPhone:phone
    })
  }
  _closePage(){
    closeWindow()
  }
  _renderPostSuccess() {
    const {applyRecord} = this.props
    return (
        <div className="m-post-success-wrap" style={{display:applyRecord?'block':'none'}}>
          <div className="m-opacity" onClick={()=>{this._closePage()}}></div>
          <div className="m-success-box">
            <div className="m-close" onClick={()=>{this._closePage()}}>+</div>
            <img src={require('../../../../static/images/publicDevice/img-information-complete.png')} alt=""/>
            <p>您已经成功提交申请了，</p>
            <p>快去【乐心健康公众号】领取海报吧！</p>
          </div>
          <div className="m-share-moment"></div>
        </div>
    )
  }
  _renderInfo() {
    const {show,showEvent} = this.props
    return (
      <Rule show={show} onClick={()=>{showEvent(false)}}></Rule>
    )
  }
  _inputOnClick(e) {
    var target = e;
    setTimeout(function(){
      target.scrollIntoViewIfNeeded();
      console.log('scrollIntoViewIfNeeded');
    },400);
  }
  render() {
    const {showEvent} = this.props
    require('../../../styles/special/publicDevice.less')
    return (
      <div>
        <div className='m-public-device-post-wrap'>
          <Title title='企业智能健康设备免费领' />
          <div className="logo"></div>
          <div onClick={()=>{showEvent(true)}} className="m-public-device-rule-btn">活动规则</div>
          {this._renderInfo()}
          <div className="m-form-wrap">
            <form>
              <ul>
                <li>
                  <label htmlFor="companyName">公司名称</label>
                  <input className="m-form-input" onClick={(e)=>{this._inputOnClick(e)}} type="text" maxLength="50" onChange={this.handleChange.bind(this,'companyName')} value ={this.state.companyName} id="companyName" name="companyName"/>
                </li>
                <li>
                  <label htmlFor="companyScale">公司规模</label>
                  <input className="m-form-input" onClick={(e)=>{this._inputOnClick(e)}} type="text" maxLength="30" onChange={this.handleChange.bind(this,'companyScale')} value ={this.state.companyScale} id="companyScale" name="companyScale"/>
                </li>
                <li>
                  <label htmlFor="name">申请人姓名</label>
                  <input className="m-form-input" onClick={(e)=>{this._inputOnClick(e)}} type="text" maxLength="30" onChange={this.handleChange.bind(this,'name')} value ={this.state.name} id="name" name="name"/>
                </li>
                <li>
                  <label htmlFor="duty">申请人职位</label>
                  <input className="m-form-input" onClick={(e)=>{this._inputOnClick(e)}} type="text" maxLength="30" onChange={this.handleChange.bind(this,'duty')} value ={this.state.duty} id="duty" name="duty"/>
                </li>
                <li>
                  <label htmlFor="phone">申请人联系电话</label>
                  <input className="m-form-input" onClick={(e)=>{this._inputOnClick(e)}} type="text" maxLength="30" onChange={this.handleChange.bind(this,'phone')} value ={this.state.phone} id="phone" name="phone"/>
                </li>
              </ul>

            </form>
          </div>
          <div onClick={()=>{this.submitHandler()}} className="m-bottom-btn">提交申请</div>

        </div>
        {this._renderPostSuccess()}
      </div>
    )
  }



})
