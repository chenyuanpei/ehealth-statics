import React, {Component, PropTypes} from 'react'
import PubSub from 'pubsub-js'
import classnames from 'classnames'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
// pubsub
export const TOPIC_HOME_MEMBER_HEADIMG_CLICK = 'TOPIC_HOME_MEMBER_HEADIMG_CLICK'
// export const TOPIC_HOME_MEMBER_INVITATION_CLICK = 'TOPIC_HOME_MEMBER_INVITATION_CLICK'
export const TOPIC_ADD_MEMBER = 'TOPIC_ADD_MEMBER'
// const
import {CREATE_MEMBER_ID, defaultHeadImgurl} from '../../const/member'

@immutableRenderDecorator
export default class Member extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    sex: PropTypes.number,
    headImgurl: PropTypes.string,
    manager: PropTypes.bool,
    inviteCount: PropTypes.number,
    remark: PropTypes.string
  }

  handleHeadimgClick({id,manager}) {
    PubSub.publish(TOPIC_HOME_MEMBER_HEADIMG_CLICK,{id,manager})
  }

  // handleInvitationClick() {
  //   PubSub.publish(TOPIC_HOME_MEMBER_INVITATION_CLICK)
  // }

  handleAdd() {
    const {id} = this.props
    id === CREATE_MEMBER_ID && PubSub.publish(TOPIC_ADD_MEMBER, null)
  }

  render() {
    console.log('render Member')
    const {id, nickname, name, remark, headImgurl, sex,manager} = this.props

    return (
      <div className="memberContainer">
        <div className={classnames('memberHeadimg', {'addMember': id === CREATE_MEMBER_ID})}
             onClick={() => this.handleAdd()}>
          <img src={headImgurl || defaultHeadImgurl[sex]} onClick={() => this.handleHeadimgClick({id,manager})}/>
        </div>
        <div className="memberName">{remark || nickname || name}</div>
        {/*{this.renderInvite()}*/}
      </div>
    )
  }

  // renderInvite() {
  //   const {id, manager, inviteCount} = this.props
  //
  //   if (id === CREATE_MEMBER_ID) {
  //     return <noscript/>
  //   }
  //
  //   if (!manager) {
  //     return (
  //       <div className="memberInviteing">
  //         <div>关注中</div>
  //       </div>
  //     )
  //   }
  //
  //   return (
  //     <div className="memberInvite" onClick={() => this.handleInvitationClick()}>
  //       <span>分享数据</span>
  //       <div className="memberInviteCount">{`${inviteCount || 0}人已关注`}</div>
  //     </div>)
  // }

}
