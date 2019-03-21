import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'
import AvatarText from '../../common/Avatar/AvatarText'
import Button from '../../common/button/Button'

export default class MemberClaim extends Component {

  render() {
    const {name, headImgurl, nickname, sex} = this.props
    require('../../../styles/member/memberClaimTab.less')
    return (

        <div className="m-member-col">
          <AvatarText className={'m-head-img'} src={headImgurl} sex={sex}/>
          <div className="m-claim-name">
            {nickname || name}
          </div>
        </div>

    )
  }
}
