import React, {Component} from 'react'
import {connect} from 'react-redux'

// components

import Title from '../../../components/common/title/Title'
import {toast} from '../../../components/common/toast/PubSubToast'
import {closeWindow} from '../../../util/wxJs/wxApi'
import Rule from '../../../components/special/Rule'
import AreaSelect from '../../../components/special/AreaSelect'
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
    name:'',
    phone:'',
    address:''
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
    const {companyName,name,phone,address} = this.state
    const {postData,location:{query:{applyId}}} = this.props
    if (!companyName) {
      toast('请填写公司名称')
      return
    }

    if (!name) {
      toast('请填写收货人姓名')
      return
    }

    if (!phone) {
      toast('请填写联系电话')
      return
    }

    if(this._checkPhone(phone)){
      toast('电话号码有误，请重新填写')
      return
    }
    if (!address) {
      toast('请填写详细地址')
      return
    }
    postData({
      applyId:applyId,
      enterpriseName:companyName,
      name:name,
      linkPhone:phone,
      address,
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
          <p>收货信息提交成功！</p>
          <p>我方工作人员会联系您配置设备。</p>
        </div>
      </div>
    )
  }
  _renderInfo() {
    const {show,showEvent} = this.props
    return (
      <Rule show={show} onClick={()=>{showEvent(false)}}></Rule>
    )
  }
  // // 生成滚动选择
  // _renderCommon() {
  //   const {selectDialogOptions: {filed, ...selectDialogOptions}, member, showSelectDialog, changeMember,changeArea} = this.props
  //
  //   const options = {
  //     ...selectDialogOptions,
  //     onConfirm: (val) => {
  //       showSelectDialog({close: true})
  //       if(filed === 'areaData'){
  //         let provinceId = val[0].id
  //         let cityId = val[1].id
  //         changeMember({
  //           ...member,
  //           province: provinceId,
  //           city:cityId
  //         })
  //         changeArea({
  //           province:val[0].name,
  //           city:val[1].name
  //         })
  //       }else{
  //         changeMember({
  //           ...member,
  //           [filed]: val
  //         })
  //       }
  //
  //     },
  //     onCancel: () => {
  //       showSelectDialog({close: true})
  //     },
  //   }
  //   return (
  //     <AreaSelect {...options}/>
  //   )
  // }
  render() {
    const {showEvent,showSelectDialog} = this.props
    require('../../../styles/special/publicDevice.less')
    return (
      <div>
        <div className='m-public-device-post-wrap'>
          <Title title='企业健康角•广州站' />
          <div className="logo"></div>
          <div onClick={()=>{showEvent(true)}} className="m-public-device-rule-btn">活动规则</div>
          {this._renderInfo()}
          <div className="m-form-wrap">
            <form>
              <ul>
                <li>
                  <label htmlFor="companyName">公司名称</label>
                  <input className="m-form-input" type="text" maxLength="50" onChange={this.handleChange.bind(this,'companyName')} value ={this.state.companyName} id="companyName" name="companyName"/>
                </li>
                <li>
                  <label htmlFor="name">收货人姓名</label>
                  <input className="m-form-input" type="text" maxLength="30" onChange={this.handleChange.bind(this,'name')} value ={this.state.name} id="name" name="name"/>
                </li>
                <li>
                  <label htmlFor="phone">联系电话</label>
                  <input className="m-form-input" type="text" maxLength="30" onChange={this.handleChange.bind(this,'phone')} value ={this.state.phone} id="phone" name="phone"/>
                </li>
                <li>
                  <label htmlFor="phone">所在地区</label> <div className="m-form-input">广东省广州市</div>
                </li>
                <li className="m-textarea-li">
                  <textarea className="m-textarea" maxLength="100" onChange={this.handleChange.bind(this,'address')} value ={this.state.address} placeholder="请填写详细地址"></textarea>
                </li>

              </ul>

            </form>
          </div>
          <div onClick={()=>{this.submitHandler()}} className="m-bottom-btn">提交申请</div>

        </div>
        {/*{this._renderCommon()}*/}
        {this._renderPostSuccess()}
      </div>
    )
  }



})
