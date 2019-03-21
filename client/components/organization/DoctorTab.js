import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'
import AvatarText from '../common/Avatar/AvatarText'

export default class DoctorTab extends Component {

  render() {
    const {name,onClick,headimgurl,sex,nickname} = this.props
    require('../../styles/member/memberTab.less')
    return (
      <RowFlex className="memberTab" onClick={onClick}>
        <AvatarText className={'headImg'} src={headimgurl} sex={sex}/>
        <Col className="name">
          {name || nickname}

          <img className="m-arrow-right" src={require('../../../static/images/btn_new_p.png')}/>

        </Col>
      </RowFlex>
    )
  }
}
