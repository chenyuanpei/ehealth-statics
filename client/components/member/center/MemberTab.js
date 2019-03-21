import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'
import AvatarText from '../../common/Avatar/AvatarText'

export default class MemberTab extends Component {

  render() {
    const {remark, nickname, selfIco, name, headImgurl, sex, onClick} = this.props
    require('../../../styles/member/memberTab.less')
    return (
      <RowFlex className="memberTab" onClick={onClick}>
        <AvatarText className={'headImg'} src={headImgurl} sex={sex}/>
        <Col className="name">
          {remark || nickname || name}
          {selfIco &&
           <img className="selfIco" src={require('../../../../static/images/member/center/icon-member-myself.png')} />
          }
          <img className="m-arrow-right" src={require('../../../../static/images/btn_new_p.png')}/>

        </Col>
      </RowFlex>
    )
  }
}
