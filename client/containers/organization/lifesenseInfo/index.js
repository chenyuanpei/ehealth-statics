import React, {Component} from 'react'
import {connect} from 'react-redux'
// components
import Title from '../../../components/common/title/Title'

export default connect(
)(
  class extends Component {
    componentDidMount() {
    }

    render() {
      require('../../../styles/organization/organization.less')
      return (
        <div className="m-organization-wrap">
          <Title title="乐心服务介绍"/>
          <div className="m-lifesense-info-img">
            <img src={require('../../../../static/images/lifesense_info_img_01.jpg')} />
          </div>
          <div className="m-lifesense-info-img">
            <img src={require('../../../../static/images/lifesense_info_img_02.jpg')} />
          </div>
          <div className="m-lifesense-info-img">
            <img src={require('../../../../static/images/lifesense_info_img_03.jpg')} />
          </div>
          <div className="m-lifesense-info-img">
            <img src={require('../../../../static/images/lifesense_info_img_04.jpg')} />
          </div>
          <div className="m-lifesense-info-img">
            <img src={require('../../../../static/images/lifesense_info_img_05.jpg')} />
          </div>
          <div className="m-lifesense-info-img">
            <img src={require('../../../../static/images/lifesense_info_img_06.jpg')} />
          </div>
          <div className="m-lifesense-info-img">
            <img src={require('../../../../static/images/lifesense_info_img_07.jpg')} />
          </div>
          <div className="m-lifesense-info-img">
            <img src={require('../../../../static/images/lifesense_info_img_08.jpg')} />
          </div>
        </div>
      )
    }

    _go(url) {
      window.location.href = url
    }

  })

