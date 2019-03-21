import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'
import AvatarText from '../common/Avatar/AvatarText'

export default class DoctorList extends Component {

  render() {
    const {onClick,headimgurl,sex,name,hospitalName,title,noArrImg} = this.props
    require('../../styles/doctor/doctorList.less')
    return (
      <RowFlex className="doctorList" onClick={onClick}>
        <AvatarText className={'headImg'} src={headimgurl} sex={sex}/>
        <Col className="name">
          <h3>{name}</h3>
          <p>医院：{hospitalName}</p>
          <p>职称：{title}</p>
          {!noArrImg && <img className="m-arrow-right" src={require('../../../static/images/btn_new_p.png')}/>}


        </Col>
      </RowFlex>
    )
  }
}
