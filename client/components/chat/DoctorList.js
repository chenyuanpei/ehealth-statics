import React, {Component, PropTypes} from 'react'
import PubSub from 'pubsub-js'
import AvatarDoctorList from './AvatarDoctorList'
import {RowFlex, Col} from '../frozenui/grid'
export const TOPIC_CHAT_DOCTOR_LIST_CLOSE = 'TOPIC_CHAT_DOCTOR_LIST_CLOSE'
export default class DoctorList extends Component {

  handleClose() {
   PubSub.publish(TOPIC_CHAT_DOCTOR_LIST_CLOSE, null)
  }
  render() {
    const {show,teamMember} = this.props
    require('../../styles/doctor/chatDoctorList.less')
    return (
      <div className="doctor_list_wrap" style={{display:show?'block':'none'}}>
        <div className="m-doctor-list-close" onClick={() => {this.handleClose()}}>+</div>
        <div className="doctor_list_opa"></div>
        <RowFlex className={teamMember.length < 4 ? "doctorListRow justify_content_cl" : 'doctorListRow'}>
          {
            teamMember && teamMember.map((member, index) => {


              return <AvatarDoctorList key={index} {...member} ></AvatarDoctorList>
            })
          }
        </RowFlex>
      </div>
    )
  }
}
