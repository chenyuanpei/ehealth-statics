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
        {this._renderSub()}

        {this._onNext()}

        {this._renderDel()}
        {this._renderEdit()}
      </div>
    )
  }

  _onNext() {
    const {members, attention} = this.props
    const cls = (members.size + attention.size + 1) > 3 ? 'pageBottomIn' : 'pageBottom'
    return (
      <div className={cls}>
        <Button onClick={() => this._add()}>添加成员</Button>
      </div>
    )
  }

  _renderTab() {
    const {account, account:{id, remark, name, sex, headImgurl, nickname}, members, attention} = this.props
    // if ((!members || members.size <= 0) && (!attention || attention.size <= 0)) { // 没数据
    //   return (
    //     <NoData image={require('../../../../static/images/noData/bg_member_add.png')} warning="还没有任何成员" text="请添加成员并完善资料"/>
    //   )
    // }
    return (
      <div className="panal">
        <div className="title">已创建</div>
        <div className="bgStyle">
          <MemberTab selfIco="true" {...account}  onClick={() => this._gotoHomeUrl(id)}/>
        </div>
        {members.map(member => {
          return (
            <SlideDelete key={`attention${member.id}`}
                         onDelete={() => this._delete(member, true)}>
              <MemberTab {...member} onClick={() => this._gotoHomeUrl(member.id)}/>
            </SlideDelete>
          )
        }).toArray()}
      </div>
    )

  }
  _renderSub() {
    const {attention} = this.props
    if (attention && attention.size > 0) { // 加载完成
      return (
        <div className="panal">
          <div className="title">已关注</div>
          {attention.map(member => {
            return (
              <SlideDelete key={`attention${member.id}`}
                           onDelete={() => this._delete(member, false)}>
                <MemberTab {...member} onClick={() => this._gotoHomeUrl(member.id)}/>
              </SlideDelete>
            )
          }).toArray()}
        </div>
      )
    }
  }

  _renderDel() {
    const {delMember, unbindSubMember} = this.props
    const {memberDel, showDel, type} = this.state
    const buttons = [{
      type: 'default',
      label: '取消',
      onClick: () => {
        this.setState({showDel: false, showEdit: false, memberDel: {}, type: true})
      }
    }, {
      type: 'primary',
      label: '确认',
      onClick: () => {
        if (type) {
          delMember(memberDel.id)
        } else {
          unbindSubMember(memberDel.id)
        }
        this.setState({showDel: false, showEdit: false, memberDel: {}, type: true})
      }
    }]

    return (
      <Confirm buttons={buttons} show={showDel}>
        <div className="confirm">{type ? '删除该成员，健康数据将同时删除，确认删除？' : '取消关注该成员,健康数据将不在接收，确认取消关注？'}</div>
      </Confirm>
    )
  }

  _renderEdit() {
    const {attention} = this.props
    if (attention && attention.length > 0) { // 加载完成
      const opts = {
        onClick: (val) => {
          this.setState({showEdit: false, showDel: false, edit: {}})
          this.props.updateSubscriberRemark(this.state.edit.memberId, val).then(() => toast('修改成功!'))
        },
        maxLength: 6,
        value: this.state.edit.name,
        placeholder: this.state.edit.name
      }
      return (
        <InputConFirm {...opts} />
      )
    }
  }

  _delete(Member, type) {
    this.setState({showDel: true, showEdit: false, memberDel: Member, type})
  }

  _gotoHomeUrl(id) {
    this.props.push(`home/${id}`)
  }

  _add() {
    this.props.push(`Member/create?memberType=1`)
  }
})

