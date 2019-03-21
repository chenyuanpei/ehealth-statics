import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import MemberClaim from '../../../components/member/center/MemberClaim'
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
    let {memberClaimData} = this.props
    let flag = true
    if(memberClaimData && memberClaimData.status !== 0){
      flag = false
    }
    return (
      <div className="m-claim-wrap">
        <Title title='认领成员'/>
        {flag ? this._renderContent() : this._renderDefault()}
        <div className='pageBottom'>
          <Button type={"primary"} onClick={() => this._claimSubmit(flag)}>{flag ? '认领' : '返回'}</Button>
        </div>
      </div>
    )
  }
  _renderDefault() {
    let {memberClaimData} = this.props
    let imageClaimed = require('../../../../static/images/member/ico_claim_suc.png')
    let claimText = '已成功认领成员'

    if(memberClaimData && memberClaimData.status === -1){
      imageClaimed = require('../../../../static/images/member/ico_claim_none.png')
      claimText = '成员已被其他微信用户认领'
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
    return (
        <div className="">
          <div className="m-claim-tips">该设备绑定以下成员，请确认成员信息，认领后将添加到成员列表，并展示相关数据，同时绑定该设备。</div>
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
    const {memberClaimData} = this.props
    const {deviceUserInfos} = memberClaimData || {}

    return (
      <div className="m-member-container">
        {memberClaimData && deviceUserInfos.map(member => {
          return (
            <MemberClaim {...member} />
          )
        })}
      </div>
    )


  }
})

