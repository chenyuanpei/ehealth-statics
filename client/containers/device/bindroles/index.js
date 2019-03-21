import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import BindRole from '../../../components/common/dialog/BindRole'
import AvatarText from '../../../components/common/Avatar/AvatarText'
import Confirm from '../../../components/common/dialog/Confirm'
import Title from '../../../components/common/title/Title'
import Button from '../../../components/common/button/Button'
// actions
import actions from './actions.js'
// selectors
import selectors from './selectors.js'
//  const
import {defMembers} from '../../../const/member'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
export default connect(
  debug(selectors),
  actions
)(class extends Component {

  static defaultProps = {
    device: {},
    members: []
  }

  componentDidMount() {
    const {init, params: {deviceId}, location: {query: {memberId, userNo, bind}}} = this.props
    init({deviceId, memberId, userNo, bind})
  }

  render() {
    const {device:{deviceType}} = this.props
    require('../../../styles/page/bindRoles.less')
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Title title='绑定成员'/>
        <div className="brTip">点击头像即可选择绑定成员<br />数据精准传输至对应成员</div>
        <div className={deviceType === '02' ? 'm-weight-device-wrap' : ''} >
          {deviceType && this._renderRoles()}
        </div>

        {deviceType && this._renderBindRole()}
        {deviceType && this._renderUnbind()}
        {deviceType && this._onGoback()}
      </div>
    )
  }

  // 生成解绑提示
  _renderUnbind() {
    const {unbindRoleDevice, params, isShowConfirm, showConfirm, user, changeUser} = this.props
    const opts = {
      buttons: [{
        label: '取消',
        onClick: () => {
          showConfirm(false)
          changeUser({})
        }
      }, {
        label: '确定',
        onClick: () => {
          const deviceId = params.deviceId
          unbindRoleDevice({deviceId, ...user})
          showConfirm(false)
          changeUser({})
        }
      }],
      title: '解绑提示'
    }
    return (
      <Confirm {...opts} show={isShowConfirm}>
        <div className="confirm">{`该按键已经绑定了${user.nickname || user.name},是否要解除绑定?`}</div>
      </Confirm>
    )
  }

  // 跳转到创建成员
  _create(userNo, memberType, bind) {
    const {push, params: {deviceId}} = this.props
    this._hide()
    push(`member/create?memberType=${memberType || 0}&redirect=${encodeURIComponent(`/device/${deviceId}/bindRoles?memberId=:memberId&userNo=${userNo}&bind=${bind ? 'true' : ''}`)}`)
  }
  _onGoback() {
    const {roles, device: {deviceType}} = this.props
    let flag = false
    let cls = 'pageBottomIn'
    if (roles[1].memberId || roles[2].memberId) {
      flag = true
    }
    if(deviceType === '06'){
      cls = 'pageBottom'
    }
    if(deviceType === '02'){
      if(roles[1].memberId || roles[2].memberId || roles[3].memberId || roles[4].memberId){
        flag = true
      }
    }
    return (
      <div className={cls}>
        <Button type={flag ? "primary" : "default"} onClick={() => this._gotoIndex(flag)}>返回首页</Button>
      </div>
    )
  }
  // 生成角色选择框
  _renderBindRole() {
    const {roles, device: {deviceType}, members, params: {deviceId}, bindRoleDevice, isShowSelect, showSelect, user} = this.props
    // 当没有成员时,默认成员
    const defs = defMembers.map(member => ({
      ...member,
      onClick: () => this._create(user.userNo, member.type)
    }))
    //

    const selectMembers = [...members.size > 0 ? members : defs, {
      headImgurl: require('../../../../static/images/btn_add.png'),
      name: '添加',
      onClick: () => this._create(user.userNo, user.userNo, true)
    }]
    // 点击确定
    const onClick = (member) => {
      // // 同一成员不能同时绑定两个键
      // if ([1, 2].some((userNo) => roles[userNo].memberId === member.id)) {
      //   toast('一个成员不能绑定两个键...')
      //   return
      // }

      bindRoleDevice({
        ...member,
        deviceId,
        userNo: user.userNo,
      })
      showSelect(false)
    }
    let bindId = user.id
    if (deviceType === '04') {
      bindId = user.id || roles[1].id
    }
    // 点击取消
    const onHide = () => {
      showSelect(false)
    }
    return (
      <BindRole show={isShowSelect} avList={selectMembers} bind={bindId} onClick={onClick} onHide={onHide}/>
    )
  }

  // 生成绑定角色
  _renderRoles() {
    const {device: {deviceType,name}} = this.props
    let {roles: {1: dad, 2: mom, 3:sister,4:brother}} = this.props
    let roles = [{
      ...dad,
      src: dad.headImgurl,
      name: dad.nickname || dad.name,
      onClick: () => this._toShow(dad)
    }, {
      ...mom,
      src: mom.headImgurl,
      name: mom.nickname || mom.name,
      onClick: () => this._toShow(mom)
    }]

    if(deviceType === '06' || deviceType === '04') {
      roles = [{
        ...dad,
        src: dad.headImgurl,
        name: dad.nickname || dad.name,
        tip:null,
        deviceTitle:name,
        onClick: () => this._toShow(dad)
      }]
    }
    if(deviceType === '02'){
      roles = [{
        ...dad,
        src: dad.headImgurl,
        name: dad.nickname || dad.name,
        onClick: () => this._toShow(dad)
      }, {
        ...mom,
        src: mom.headImgurl,
        name: mom.nickname || mom.name,
        onClick: () => this._toShow(mom)
      },{
        ...sister,
        src: sister.headImgurl,
        name: sister.nickname || sister.name,
        onClick: () => this._toShow(sister)
      },{
        ...brother,
        src: brother.headImgurl,
        name: brother.nickname || brother.name,
        onClick: () => this._toShow(brother)
      }]
    }
    console.log(roles)
    return deviceType && roles.map((role, idx) => <AvatarText key={idx} className="brBtn" {...role} />)
  }

  _showSel(user) {
    const {changeUser, showSelect} = this.props
    showSelect(true)
    changeUser(user)
  }

  _hide() {
    const {showSelect, changeUser} = this.props
    showSelect(false)
    changeUser({})
  }

  _showFirm(user) {
    const {showConfirm, changeUser} = this.props

    showConfirm(true)
    changeUser(user)
  }

  _toShow(role) {
    const {device:{deviceType},rolesNum,members} = this.props

    if(deviceType === '02' && role.memberId){
      let flag = true
      members.find(function (v) {

        if(v.id === role.memberId){
          flag = false
        }
      });
      if(flag){
        this._showFirm(role)
        return
      }
    }
    if(deviceType === '02' && role.memberId && rolesNum > 1){
      this._showFirm(role)
      return
    }
    if (role.memberId && deviceType !== '04'&& deviceType !== '02') { // 如果存在id表示已经绑定，弹出是否解绑
      this._showFirm(role)
      return
    }
    if (this.props.members && this.props.members.size) { // 如果成员大于0弹出选择
      this._showSel(role)
    } else {
      this._create(role.userNo, 0, true) // 如果没有成员，跳转到创建成员
    }
  }
  _switchBind() {
    if (this.props.members && this.props.members.size) { // 如果成员大于0弹出选择
      this._showSel(role)
    } else {
      this._create(role.userNo, 0, true) // 如果没有成员，跳转到创建成员
    }
  }
  _gotoIndex (flag) {
    if (flag) {
      this.props.push(`home/`)
    }
  }
})
