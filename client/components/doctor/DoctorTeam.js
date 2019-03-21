import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'
import AvatarText from '../common/Avatar/AvatarText'

export default class DoctorTeam extends Component {

  render() {
    const {onClick,info,members,association} = this.props
    const {name,picture} = info || {}

    let doctorNameArr = []
    for(let i=0;i<members.length;i++){
      doctorNameArr.push(members[i].name)
    }
    let doctorNameSplit = doctorNameArr.join(',')

    require('../../styles/doctor/doctorList.less')
    return (
      <RowFlex className="doctorList" onClick={onClick}>
        <AvatarText className={'headImg'} src={picture} />
        <Col className="name">
          <h3>{name}</h3>
          <p>团队医生：{doctorNameSplit}</p>

        </Col>
      </RowFlex>
    )
  }
}
