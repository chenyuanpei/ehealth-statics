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
import setTitle from '../../../util/setTitle'
export default connect(
  debug(selectors),
  actions
)(class extends Component {


  componentDidMount() {
    const {loadData,location: {query: {id}}} = this.props
    loadData(id)
  }

  render() {
    const {article} = this.props
    const {title,text} = article || {}
    if (title) {
      setTitle(title)
    }
    require('../../../styles/doctorTeam/info.less')
    return (
      <div style={{minHeight: '100vh', backgroundColor: '#fff'}}>

        {this._getInfo()}
      </div>
    )
  }
  _getInfo () {
    const {article} = this.props
    const {title,text,created} = article || {}
    if (article) {
      return (
        <div className="patientInfo">
          <div className="title">{title}</div>
          <div className="m-time">
            {moment(created).format('YYYY-MM-DD')} <span>乐心健康</span>
          </div>
          <div className="content" dangerouslySetInnerHTML={{__html: text}}></div>
        </div>
      )
    }
  }
})

