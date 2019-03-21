import React, {Component} from 'react'
import {connect} from 'react-redux'
import {generateUrl} from '../../../apis/request'
import {healthServer} from '../../../apis/constant'
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
    address:'',
    self:0,
  }
  componentDidMount() {
    const {init,location:{query:{applyId,self}}} = this.props
    init({applyId})
    let _this = this
    this.state.self = 0
    if(self == 1){
      setTimeout(function () {
        _this.setState({
          self:1
        })
      },1000)
    }
  }
  _closeSelf() {
    this.setState({
      self:0
    })
  }
  _renderSelf() {
    const {self} = this.state
    return (
      <div className="m-post-success-wrap" onClick={()=>{this._closeSelf()}} style={{display:self == 1 ?'block':'none'}}>
        <div className="m-opacity"></div>
        <div className="m-share-poster"></div>
      </div>
    )
  }
  _renderInfo() {
    const {show,showEvent} = this.props
    return (
      <Rule show={show} onClick={()=>{showEvent(false)}}></Rule>
    )
  }
  render() {
    const {posterData} = this.props
    const {enterpriseName,qrcodeUrl} = posterData || {}
    require('../../../styles/special/publicDevice.less')
    return (
      <div>
        <div className='m-poster-wrap'>
          <Title title='企业智能健康设备免费领' />
          <div className="logo"></div>
          {this._renderInfo()}
          <div className="m-poster-bottom"></div>
          <div className="m-poster-title">
            <div className="m-poster-company-name">{enterpriseName}</div>
          </div>
          <div className="m-qrcode"><img src={generateUrl(`${healthServer}/wx/get_qrcode_pic?qrcode=${qrcodeUrl}`)}/></div>
          <div className="m-qrcode-text">扫码支持，赢取健康设备</div>
        </div>
        {this._renderSelf()}
      </div>
    )
  }



})
