import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import MemberTab from '../../../components/member/center/MemberTab'
import Button from '../../../components/common/button/Button'
import SlideDelete from '../../../components/common/slide/SlideDelete'
import NoData from '../../../components/common/NoData'
import Confirm from '../../../components/common/dialog/Confirm'
import InputConFirm from '../../../components/common/dialog/InputConFirm'
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

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
    const {loadData} = this.props
    loadData()
  }

  render() {
    require('../../../styles/member/memberBtn.less')

    return (
      <div className="memberBtn">
        <Title title='我的成员'/>
        {this._renderTab()}
        {this._onNext()}
      </div>
    )
  }

  _onNext() {
    const {members, attention} = this.props
    const cls = (members.size + 1) > 3 ? 'pageBottomIn' : 'pageBottom'
    return (
      <div className={cls}>
        <Button onClick={() => this._add()}>添加成员</Button>
      </div>
    )
  }

  _renderTab() {
    //account:{id, remark, name, sex, headImgurl, nickname}
    const {account, members} = this.props

    return (
      <div className="panal">
        <div className="title">请选择需要分享数据的成员</div>
        <div className="bgStyle">
          <MemberTab {...account}  onClick={() => this._goUrl(account.id)}/>
        </div>
          {members.map(member => {
            return (
              <div key={member.id} className="bgStyle">
                <MemberTab {...member} onClick={() => this._goUrl(member.id)}/>
              </div>
            )
          }).toArray()}

      </div>
    )

  }

  _goUrl(id){
    this.props.push(`attention/${id}/attentionAccount`)
  }

  _add() {
    this.props.push(`Member/create?memberType=1`)
  }
})

