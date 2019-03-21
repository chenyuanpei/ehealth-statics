import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debug,setWechatTitle} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import Button from '../../../components/common/button/Button'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
export default connect(
  debug(selectors),
  actions
)(
  class extends Component {
    componentDidMount() {
      const {loadData, params: {id}} = this.props
      loadData({id})
    }

    render() {
      const {organizationInfo} = this.props
      const {organCustomTitle,organCustomContent} = organizationInfo || {}

      if(organCustomTitle){
        setWechatTitle(organCustomTitle)
      }
      require('../../../styles/organization/organization.less')
      return (
        <div className="m-organization-wrap">
          <h2 className="m-organization-title">{organCustomTitle}</h2>
          <div className="m-organization-content">
            <div dangerouslySetInnerHTML={{__html: organCustomContent}}/>
          </div>
        </div>
      )
    }

  })

