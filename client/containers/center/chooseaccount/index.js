import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../util/common'
// components
import AvatarText from '../../../components/common/Avatar/AvatarText'
import Button from '../../../components/common/button/Button'
import Title from '../../../components/common/title/Title'
import Confirm from '../../../components/common/dialog/Confirm'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    const {loadData} = this.props
    loadData()
  }

  render() {
    require('../../../styles/page/chooseaccount.less')
    return (
      <div className="m-choose-wrap">
        <Title title='设置管理员'/>
        <div className="conText">请选择代表自己的成员，将其设置为管理员。</div>
        <div className="roleList">
          {this._renderRoles()}
          {this._renderMergeConfirm()}
        </div>
        {this._onNext()}
      </div>
    )
  }
  // 生成管理员提示
  _renderMergeConfirm() {
    const {bind, showConfirm, isShowConfirm, mergeMember} = this.props
    const opts = {
      buttons: [{
        label: '取消',
        onClick: () => {
          showConfirm(false)
        }
      }, {
        label: '确定',
        onClick: () => {
          showConfirm(false)
          mergeMember(bind.id)
        }
      }]
    }
    return (
      <Confirm {...opts} show={isShowConfirm}>
        <div className="confirm">{`将把${bind.nickname || bind.name}设置为管理员,并且不可更改`}</div>
      </Confirm>
    )
  }
  _onNext() {

      const call = () => {
        const {bind, showConfirm} = this.props
        showConfirm(true)
      }
      return (
        <div className="pageBottom">
          <Button onClick={call}>确认</Button>
        </div>
      )

  }
  _renderRoles() {
    const {members, setBind} = this.props
    const avList = [...members.toArray()]

    return avList.map((member, idx) => {
      const {bind} = this.props
      const {name, nickname, headImgurl, userId} = member
      const bindUserId = bind && bind.userId
      const onClick = () => {
        if (userId) {
          setBind(bindUserId !== userId ? member : {userId: -1})
        }
      }
      return (
        <AvatarText key={idx} name={nickname || name} src={headImgurl}
                    className={bindUserId === userId ? 'bRline' : ''}
                    tip={(userId && bindUserId === userId) ? require('../../../../static/images/healthRecord/select_reveal_p.png') : ''}
                    onClick={onClick}/>
      )
    })

  }
})

