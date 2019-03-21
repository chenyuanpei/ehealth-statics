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
      const {loadData, params: {id, hardwareVersion, softwareVersion, deviceId}} = this.props
      loadData({id, hardwareVersion, softwareVersion, deviceId})
    }

    render() {
      const {params: {id}} = this.props
      let {updateText} = ''
      let {updateBtn} = ''
      switch (id) {
        case 'newest':
          updateText = '当前设备固件是最新版，无需升级'
          updateBtn = '关闭页面'
          break
        case 'outline':
          updateText = '当前设备处于离线状态，暂不能升级，<br />请在设备上线后重试'
          updateBtn = '关闭页面'
          break
        case 'updating':
          updateText = '设备已经开始启动升级程序，无需人工操作<br />升级结果请留意消息推送即可'
          updateBtn = '关闭页面'
          break
        default:
          updateText = '血压计固件升级失败，请点击按钮重试'
          updateBtn = '重试'
      }
      require('../../../styles/device/upgrateStatus.less')
      return (
        <div className="m-upgrate-status-wrap">
          <Title title={'乐心健康'}/>
          <div className="icon-update-wrap icon-update-error">

          </div>
          <div className="m-update-text" dangerouslySetInnerHTML={{__html: updateText}}></div>
          <div className="pageBottom">
            <Button type="primary" onClick={() => this._updateGo(`${id}`,true)}>{updateBtn}</Button>

          </div>
        </div>
      )
    }
    _updateGo (id,agree) {
      const {setOtaOpinion} = this.props
      if (id === 'newest' || id === 'outline' || id === 'updating') {
        WeixinJSBridge.call('closeWindow')
      } else {
        const {setOtaOpinion, params: {id, hardwareVersion, softwareVersion, deviceId}, push} = this.props
        setOtaOpinion({id, hardwareVersion, softwareVersion, deviceId, agree})
      }
    }
  })

