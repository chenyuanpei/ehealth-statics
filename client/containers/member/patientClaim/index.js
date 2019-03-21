import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import MemberClaim from '../../../components/member/center/MemberClaim'
import DeviceClaim from '../../../components/member/center/DeviceClaim'
import Button from '../../../components/common/button/Button'
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
import {closeWindow} from '../../../util/wxJs/wxApi'
export default connect(
  debug(selectors),
  actions
)(class extends Component {
  state = {
    showEdit: false,
    memberDel: {},
    type: true,
    edit: {}
  }

  componentDidMount() {
    const {loadData,params: {id}} = this.props
    loadData(id)
  }

  render() {
    require('../../../styles/member/memberClaim.less')
    let {patientClaimData} = this.props
    const {deviceMemberses} = patientClaimData || {}
    let flag = false
    let btnStyle = 'pageBottom'
    if(patientClaimData && (patientClaimData.status === 0 || patientClaimData.status === 2)){
      flag = true

    }
    if(deviceMemberses && deviceMemberses.length > 3){
      btnStyle = 'pageBottomIn'
    }
    return (
      <div className="m-claim-wrap">
        <Title title='认领成员'/>
        {flag ?  this._renderContent() : this._renderDefault()}
        <div className={btnStyle}>
          <Button type={"primary"} onClick={() => this._claimSubmit(flag)}>{flag ? '认领' : '返回'}</Button>
        </div>
      </div>
    )
  }
  _renderDefault() {
    let {patientClaimData} = this.props
    let imageClaimed = require('../../../../static/images/member/ico_claim_none.png')
    let claimText = '用户不存在'

    if(patientClaimData && patientClaimData.status === -1){
      imageClaimed = require('../../../../static/images/member/ico_claim_none.png')
      claimText = '成员已被其他微信用户认领'
    }else if(patientClaimData && patientClaimData.status === 1){
      imageClaimed = require('../../../../static/images/member/ico_claim_suc.png')
      claimText = '已成功认领成员'
    }
    return (
      <div className="m_claim_getNonEmpty">
        <img src={imageClaimed} alt=""/>
        <div className="m-claim-text">
          {claimText}
        </div>
      </div>
    )
  }
  _renderContent() {
    let {patientClaimData} = this.props
    let patientText = '检测到该成员有以下绑定关系，可以一键认领全部成员，并添加到成员列表，展示相关数据，同时绑定所有设备。'
    if(patientClaimData && patientClaimData.status === 0){
      patientText = '请确认成员信息，认领后将添加到成员列表，并展示其相关数据。'
    }
    return (
        <div className="">
          <div className="m-claim-tips">{patientText}</div>
          {this._renderTab()}
        </div>
    )
  }
  _claimSubmit(flag) {
    const {claimSubmit, params: {id}} = this.props
    if(flag){
      claimSubmit(id)
    }else{
      closeWindow()
    }

  }
  _renderTab() {
    const {patientClaimData} = this.props
    const {deviceMemberses} = patientClaimData || {}
    if (patientClaimData && patientClaimData.status === 0) {
      const {patientDto} = patientClaimData || {}
      return (
        <div className="m-member-container">
          <MemberClaim {...patientDto} />
        </div>
      )
    }
    return (
      <div>
        {patientClaimData && deviceMemberses.map(device => {
          return (
            <DeviceClaim {...device} />
          )
        })}
      </div>
    )


  }
})

