import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import DoctorList from '../../../components/doctor/DoctorList'
import DoctorTab from '../../../components/doctor/DoctorTab'
import DoctorTeam from '../../../components/doctor/DoctorTeam'

import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
// toast

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  state = {
    status:1
  }
  componentDidMount() {
    const {loadData, params: {id}} = this.props
    loadData(id)
  }

  render() {
    require('../../../styles/doctor/doctorList.less')

    return (
      <div className="memberBtn">
        <Title title='我的医生'/>
        {this.renderNoDoctor()}
        {this._renderTab()}

      </div>
    )
  }
  renderNoDoctor(){
    const {doctors,doctorTeam} = this.props
    const {status} = this.state
    let noDoctor=false
    if(doctors && doctors[status] && doctors[status].length>0){
      noDoctor=true
      //messageList.forEach((temp,index)=>{
      //  if(temp.unreadCount&&temp.unreadCount>0){
      //    noMessage=false
      //  }
      //})
    }
    if(doctorTeam && doctorTeam[status]&& doctorTeam[status].length>0){
      noDoctor=true
      //messageList.forEach((temp,index)=>{
      //  if(temp.unreadCount&&temp.unreadCount>0){
      //    noMessage=false
      //  }
      //})
    }
    return (
      <div style={{display:noDoctor?'none':'block'}}>
        <img className="noDoctorImg" src={require('../../../../static/images/doctor/icon-doctor-list-default.png')}/>
        <div className="noDoctorText">还没有关联医生</div>
      </div>
    )
  }
  _gotoRelationDoctor(doctorId) {
    const {location:{query:{param}}} = this.props
    this.props.push(`doctor/${doctorId}/patientManage?param=${param}`)
  }

  changeDateType(status) {
    this.setState({
      status:status
    })
  }
  _renderTab() {
    const {doctors,doctorTeam,account,push} = this.props
    const {status} = this.state
    const {id} = account || {}
    return (
      <div>
        <div className="m-doctor-team-panel">

          {(doctors &&  doctors[status] && doctors[status].length > 0) && doctors[status].map(doctor => {
            return (
              <div className="m-doctor-list-panel">
                <DoctorList {...doctor} onClick={() => this._gotoRelationDoctor(doctor.id)} />
              </div>
            )
          })}
        </div>
        <div className="panel">
          {(doctorTeam && doctorTeam[status] && doctorTeam[status].length>0) && doctorTeam[status].map(doctor => {
            return (
              <div className="m-doctor-list-panel">
                <DoctorTeam {...doctor} onClick={()=>{push(`doctor/${doctor.association.tid}/chat/${id}`)}} />
              </div>
            )
          })}
        </div>
        <div className="date_button">
          <DoctorTab dateType={status} changeDateType={(v) => this.changeDateType(v)}/>
        </div>
      </div>
    )

  }

})

