import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import MemberTab from '../../../components/member/center/MemberTab'
import SlideDelete from '../../../components/common/slide/SlideDelete'
import InputConFirm from '../../../components/common/dialog/InputConFirm'
import Title from '../../../components/common/title/Title'
// util
import {debug} from '../../../util/common'
// selectors
import selectors from './selectors'
// actions
import actions from './actions'

export default connect(
  debug(selectors),
  actions
)(class extends Component {
  state = {
    showEdit: false,
  }
  static defaultProps = {
    nickname: '暂无',
    member: {}
  }

  componentDidMount() {
    const {memberId, loadData} = this.props
    loadData(memberId)
  }

  render() {
    require('../../../styles/member/memberBtn.less')
    const {member} = this.props
    if (!member) {
      return (<div><Title title='关注成员'/></div>)
    }
    return (
      <div className="asBox">
        <Title title='关注成员'/>
        <div className="asBText">来自于『{member.accountNickname}』的分享</div>
        <div className="memberBtn">
          <div className="panal">
            <SlideDelete key={`${member.remark || member.nickname}`} onDelete={() => (this._delete(member))}>
              <MemberTab {...member} onClick={() => this.setState({showEdit: true})}/>
            </SlideDelete>
          </div>
        </div>
        {this._edit()}
      </div>
    )
  }

  _delete(member) {
    const {unsubseribeSubscriber, goBack, replace} = this.props
    unsubseribeSubscriber(member.id)
  }

  _edit() {
    const {updateSubscriberRemark, member, subMembers} = this.props
    const {remark, nickname, name} = member
    let memberId = member.id
    const opts = {
      onClick: (val) => {
        this.setState({showEdit: false})
        if (!val) {
          return
        }
        updateSubscriberRemark({memberId, remark: val, subMembers})
      },
      maxLength: 12,
      type: 'text',
      placeholder: remark || nickname || name
    }
    return (
      <InputConFirm title="备注" show={this.state.showEdit} {...opts}/>
    )
  }

})
