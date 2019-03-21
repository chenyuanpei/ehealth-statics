import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import MemberTab from '../../../components/member/center/MemberTab'
import SlideDelete from '../../../components/common/slide/SlideDelete'
import NoData from '../../../components/common/NoData'
import Button from '../../../components/common/button/Button'
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

  componentDidMount() {
    const {loadData, memberId} = this.props
    loadData(memberId)
  }

  render() {
    const {pupShow, setPupShow} = this.props
    require('../../../styles/member/memberBtn.less')
    return (
      <div>
        <div className={pupShow ? "m-pup-panel-block" : "m-pup-panel-none"} onClick={() => setPupShow(!pupShow)}></div>
        <div className={pupShow ? "m-pup-ico" : "m-pup-panel-none"} onClick={() => setPupShow(!pupShow)}>
          <span>点击邀请</span>
          <span>亲友关注</span>
        </div>
        <div className="asBox">
          <Title title="分享数据"/>
          {this._renderContext()}

        </div>
        {this._renderBtn()}
      </div>
    )
  }
   _renderBtn() {
     const {attentions, setPupShow, pupShow} = this.props
     const cls = ( attentions.size) > 3 ? 'pageBottomIn' : 'pageBottom'
     return (
       <div className={cls}>
         <Button onClick={() => setPupShow(!pupShow)}>邀请关注</Button>
       </div>
     )
   }
  _renderContext() {
    const {member, attentions} = this.props
    if (!member) {
      return
    }
    const nickname = member.nickname
    const name = member.name

    if (attentions.size <= 0) {
      return (
        <NoData image={require('../../../../static/images/noData/bg_member_follower.png')}
                warning={`邀请家人关注『${nickname || name}』的健康数据`}
                warningOther={'及时通知测量数据,健康周报同步接收'}
                text=""/>
      )
    }
    return (
      <div className="asBox">
        <div className="asBText">
          已关注『{nickname || name}』健康数据的家人
        </div>
        <div className="memberBtn">
          <div className="panal">
            {this._renderTab()}
          </div>
        </div>
      </div>

    )
  }

  _renderTab() {
    return (this.props.attentions.map((attention, idx) => {
      return (
        <SlideDelete key={`account${attention.id}`} onDelete={() => (this._delete(attention.id))}>
          <MemberTab {...attention}/>
        </SlideDelete>
      )
    }).toArray())
  }

  _delete(accountId) {
    const {member, unsubseribeBysubscriber} = this.props
    unsubseribeBysubscriber({memberId: member.id, accountId: accountId})
  }

})

