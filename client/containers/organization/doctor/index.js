import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import DoctorTab from '../../../components/organization/DoctorTab'

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
    require('../../../styles/member/memberBtn.less')

    return (
      <div className="memberBtn">
        <Title title='推荐医生'/>
        {this._renderTab()}

      </div>
    )
  }
  _gotoRelationDoctor(doctorId) {
    const {account} = this.props
    const {id} = account || {}
    this.props.push(`doctor/${doctorId}/patientManage?param=0`)
  }

  _renderTab() {
    const {organDoctorList} = this.props

    return (
      <div className="panal">
        <div className="title">推关联医生</div>
        <div className="bgStyle">
          {organDoctorList.map(organDoctor => {
            return (
              <DoctorTab {...organDoctor} onClick={() => this._gotoRelationDoctor(organDoctor.id)} />
            )
          }).toArray()}
        </div>
      </div>
    )

  }

})

