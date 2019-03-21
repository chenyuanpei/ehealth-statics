import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import ScrollView from '../../../components/common/scroll/ScrollView'
import Button from '../../../components/common/button/Button'
import NoData from '../../../components/common/NoData'
import DeviceBanner from '../../../components/device/DeviceBanner'
import Alert from '../../../components/common/dialog/Alert'
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
class DeviceList extends Component {
  static defaultProps = {
    devices: []
  }

  componentDidMount() {
    const {init} = this.props
    init()
  }
  _toggleError() {
    const {toggleError} = this.props
    this.props.clear()
    toggleError(false)

  }
  render() {
    require('../../../styles/member/memberBtn.less')
    const {isShow, toggleError, devices,communication} = this.props
    const heightStyle = {height: '17rem'}
    console.log(devices)
    let alertText = '添加设备不成功，你可以尝试使用微信"扫一扫"来添加设备。'
    if(communication && communication === 4){
      alertText = '您扫描的是蓝牙设备，不能在公众号直接扫码绑定，请通过微信【扫一扫】添加设备。'
    }
    return (
      <div className="memberBtn">
        <Title title="设备列表"/>
        <ScrollView style={heightStyle}>
          <div className="top panal">
            {this._renderTab()}
          </div>
          {<div className={devices && devices.size > 0 ? "m-device-tips" :'m-hide'}>提示：蓝牙设备，请通过微信【扫一扫】添加设备</div>}
        </ScrollView>

        {this._onNext()}
        <Alert show={isShow} text="知道了" onClick={() => {this._toggleError()}}>
          <div className="confirm">{alertText}</div>
        </Alert>
      </div>
    )
  }

  _onNext() {
    const {add} = this.props
    return (
      <div className='pageBottom'>
        <Button onClick={() => add()}>添加设备</Button>
      </div>
    )
  }

  _renderTab() {
    const {notData, devices, push} = this.props

    if (devices && devices.size === 0) {
      return (
        <NoData image={require('../../../../static/images/noData/bg_device_add.png')}
                warning="还没有绑定任何设备"
                warningOther={'请扫描设备二维码进行绑定' }
                text="提示：蓝牙设备，请通过微信【扫一扫】添加设备"/>
      )
    }
    return (devices && devices.map(
      (device, idx) => (
        <DeviceBanner
          key={idx}
          {...device}
          onClick={() => push(`device/${device.deviceId}`)}
        />
      )
    ).toArray())
  }
}

export default connect(
  debug(selectors),
  actions
)(DeviceList)

