import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'
import AvatarText from '../../common/Avatar/AvatarText'
import Button from '../../common/button/Button'
import {defListUsers, defaultHeadImgurl} from '../../../const/member'
export default class DeviceClaim extends Component {

  render() {
    const {deviceUsers,picture,name} = this.props
    require('../../../styles/member/memberClaimTab.less')
    let users = [defListUsers[1], defListUsers[2]]
    if (deviceUsers && deviceUsers.length) {
      deviceUsers.map((user) => {
        users[user.userNo - 1] = user
      })
    }
    return (
        <div className="m-member-container m-device-list">
          {
            users && users.map(user =>{
              return(
                <div className="m-member-col">
                  <AvatarText className={'m-head-img'} src={user.headImgurl} sex={user.sex}/>
                  <div className="m-claim-name">
                    {user.nickname || user.name}
                  </div>
                </div>
              )
            })
          }
          <div className="m-device-right">
            <div className="m-line"></div>
            <div className="m-device-img"><img src={picture} alt=""/></div>
            <div className="m-device-name">
              {name}
            </div>
          </div>
        </div>


    )
  }
}
