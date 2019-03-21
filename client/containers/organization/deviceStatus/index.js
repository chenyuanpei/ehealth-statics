import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
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
      const {loadData} = this.props
      loadData()
    }

    render() {

      require('../../../styles/device/upgrateStatus.less')
      return (
        <div className="m-upgrate-status-wrap">
          <Title title={'设备'}/>
          <div className="icon-update-wrap icon-device-status-error">

          </div>
          <div className="m-update-text">公用设备已解绑，如需继续使用 <br /> 请重新扫描设备二维码</div>
          <div className="pageBottom">
            <Button type="primary" onClick={() => this._closeWindows()}>关闭页面</Button>

          </div>
        </div>
      )
    }
    _closeWindows () {

        WeixinJSBridge.call('closeWindow')

    }
  })

