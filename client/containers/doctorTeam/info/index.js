import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import {doctorDefaultHeadImg} from '../../../const/doctor'
import Title from '../../../components/common/title/Title'
import Alert from '../../../components/common/dialog/Alert'
import DoctorMask from '../../../components/doctorTeam/DoctorMask'

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
    const {loadData,location: {query: {id}}} = this.props
    loadData(id)
  }

  render() {
    require('../../../styles/doctorTeam/info.less')
    return (
      <div style={{minHeight: '100vh', backgroundColor: '#fff'}}>
        <Title title='常见问题'/>

        {this._getInfo()}
      </div>
    )
  }
  _getInfo () {
    const {info} = this.props
    const {title,text} = info || {}
    if (info) {
      return (
        <div className="patientInfo">
          <div className="title">{title}</div>
          <div className="content" dangerouslySetInnerHTML={{__html: text}}></div>
        </div>
      )
    }
  }
})

