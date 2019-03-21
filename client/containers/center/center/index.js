import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// utils
import {calc} from '../../../util/setFontSize'
// selector
import selectors from './selectors'
// actions
import actions from './actions'
// const
import {protocol, hostname} from '../../../config'
// components
import CenterTop from '../../../components/member/center/CenterTop'
import CenterTopList from '../../../components/member/center/CenterTopList'
import CenterTopCol from '../../../components/member/center/CenterTopCol'
import CenterTab from '../../../components/member/center/CenterTab'
import Title from '../../../components/common/title/Title'

export default connect(
  selectors,
  actions
)(class extends Component {

  componentDidMount() {
    const {init} = this.props
    init()
  }

  render() {
    const {account} = this.props

    return (
      <div>
        <Title title="个人中心"/>
        {this._renderCenterTop()}
        {this._renderTabItem()}
        {this._doctorTabItem()}
        {/*{this._genTabItem()}*/}
        {/*{this._genTagItem()}*/}
        {/*{this._activeTabItem()}*/}
      </div>
    )
  }
  _renderCenterTop() {
    const {account,unReadMsgState,members} = this.props
    const {userId} = account || {}
    let member = {}
    members.find(function(arr){

      if(arr.userId==userId){
        member = arr
      }
    })
    const {nickname, headImgurl} = member
    return (
        <div className="m-center-top">
          <CenterTop
            nickname={nickname} headImgurl={headImgurl}
            onClick={() => this._go(`member/${account.id}?editcenter=1`)}
          />
          <CenterTopList>
            <CenterTopCol name={`我的医生`} onClick={() => this._go(`doctor/doctorList?param=2`)} icoImg={require('../../../../static/images/center/icon-presonal-center-doctor.png')}></CenterTopCol>
            <CenterTopCol onClick={() => this._go('message')} remind={unReadMsgState} name={`我的消息`} icoImg={require('../../../../static/images/center/icon-presonal-center-message.png')}></CenterTopCol>
            {/*<CenterTopCol onClick={()=>{this._go('doctor/famousDoctor')}} name={`我的服务`} icoImg={require('../../../../static/images/center/icon-presonal-center-service.png')}></CenterTopCol>*/}
          </CenterTopList>
        </div>
    )
  }
  _renderTabItem() {
    const {memberCount,totalPoint} = this.props
    const {point} = totalPoint || {}
    return (
      <div style={{marginTop: calc(20), backgroundColor: '#FFFFFF'}}>

        <CenterTab name='我的积分' image={require('../../../../static/images/integral/ic_personalcenter_integral@2x.png')}
                   val={point} onClick={() => this._go('integral')}/>
        <CenterTab name='我的成员' image={require('../../../../static/images/member/center/icon_user.png')}
                   val={memberCount} onClick={() => this._go('member')}/>

      </div>
    )
  }

  _genTabItem() {
    const {account} = this.props
    const {phone} = account || {}
    return (
      <div style={{marginTop: calc(20), backgroundColor: '#FFFFFF'}}>
        <CenterTab name='预约挂号' image={require('../../../../static/images/member/center/icon_personal.png')} onClick={() => this._goDoctor()}/>

        {/*<CenterTab name='绑定手机号' image={require('../../../../static/images/member/center/icon_phone.png')}*/}
                   {/*val={phone || '未绑定'} onClick={() => this._go('center/bindMobile')}/>*/}


      </div>
    )
  }

  _genTagItem() {
    const {account} = this.props
    return (
      <div style={{marginTop: calc(20), backgroundColor: '#FFFFFF'}}>
        <CenterTab name='健康实验室' image={require('../../../../static/images/tag/icon-personal-center-laboratory@2x.png')} onClick={() => this._go('laboratory')}/>


      </div>
    )
  }
  _doctorTabItem() {
    const {deviceCount} = this.props || 0

    return (

      <div style={{marginTop: calc(20), backgroundColor: '#FFFFFF'}}>
        <CenterTab name='设备管理' image={require('../../../../static/images/member/center/icon_device.png')}
                   val={deviceCount} onClick={() => this._go('device')}/>
        <CenterTab name='常见问题' image={require('../../../../static/images/member/center/icon_help.png')}
                   onClick={() => this._go('FAQ')}/>
      </div>
    )
  }
  _activeTabItem() {

    return (

      <div style={{marginTop: calc(20), backgroundColor: '#FFFFFF'}}>
        <CenterTab name='新手活动' image={require('../../../../static/images/center/icon-presonal-center-activity.png')}
                   onClick={() => this._go('newbieTask')}/>
      </div>
    )
  }
  _go(url) {
    this.props.push(url)
  }
  _goDoctor() {
    const {account, getChengyisheng} = this.props
    const {phone} = account || {}
    if(phone && phone.length > 0) {
      getChengyisheng(2)
    } else {
      this.props.push(`center/chengyisheng/2`)
    }

  }
  _goProblems(url) {
    window.location.href = url
  }
})
