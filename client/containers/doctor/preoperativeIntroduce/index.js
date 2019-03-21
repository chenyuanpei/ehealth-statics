import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import DoctorList from '../../../components/doctor/DoctorList'

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


  componentDidMount() {
    const {loadData, params: {id}} = this.props
    loadData(id)
  }

  render() {
    require('../../../styles/doctor/doctorList.less')

    return (
      <div className="memberBtn">
        <Title title='我的医生'/>
        {this._renderTab()}

      </div>
    )
  }
  _gotoRelationDoctor(doctorId) {
    const {location:{query:{param}}} = this.props
    this.props.push(`doctor/${doctorId}/patientManage?param=${param}`)
  }

  _renderTab() {
    const {doctors} = this.props
    return (
      <div className="panel">

        {doctors.map(doctor => {
          return (
            <div className="m-doctor-list-panel">
              <DoctorList {...doctor} onClick={() => this._gotoRelationDoctor(doctor.id)} />
            </div>
          )
        }).toArray()}
      </div>
    )

  }

})

