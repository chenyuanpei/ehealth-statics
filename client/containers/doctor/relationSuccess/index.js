import React, {Component} from 'react'
import {connect} from 'react-redux'
// components
import Title from '../../../components/common/title/Title'
import Button from '../../../components/common/button/Button'
export default connect(
)(
  class extends Component {
    componentDidMount() {
    }
    _closePage () {
        WeixinJSBridge.call('closeWindow')
    }
    render() {
      require('../../../styles/doctor/relationSuccess.less')

      return (
        <div className="m-doctor-success-panel">
            <Title title="关联医生"/>
            <div className="m-doctor-success-box">
              <img className="m-doctor-success-image" src={require('../../../../static/images/img_success.png')} />
              <p className="m-doctor-success-title">申请提交成功</p>
              <p className="m-doctor-success-content">请耐心等待医生审批哦</p>
            </div>
          <div className="pageBottomIn">
            <Button type="primary" onClick={() => this._closePage()}>返回公众号</Button>
          </div>
        </div>
      )
    }

    _go(url) {
      window.location.href = url
    }

  })

