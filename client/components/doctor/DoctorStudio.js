import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'
import AvatarText from '../common/Avatar/AvatarText'

export default class DoctorStudio extends Component {

  render() {
    const {onClick,headimgurl,sex,name,hospital,title,noArrImg,departments,certificationStatus} = this.props
    let certificationFlag = false
    if(!!certificationStatus && certificationStatus==2){
      certificationFlag = true
    }
    require('../../styles/doctor/doctorList.less')
    return (
      <RowFlex className="doctorList" onClick={onClick}>
        <AvatarText className={'headImg'} src={headimgurl} sex={sex}/>
        <Col className="name color67">
          <h3>{name}</h3>
          <p className="color67">{title}</p>
          <p className="color67">{hospital} {!!departments && departments[0].name}</p>
          {certificationFlag && <span className="m-certification"><img src={require('../../../static/images/doctor/icon-certification.png')} alt=""/>已认证</span>}
        </Col>
      </RowFlex>
    )
  }
}
