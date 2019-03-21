import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import Tab from '../../../components/common/form/Tab'
import Actionsheet from 'react-weui/lib/components/actionsheet'
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
      const {init, params: {deviceId}} = this.props
      init({deviceId})
    }

    render() {
      require('weui/src/style/widget/weui_tips/weui_actionsheet.less')
      require('weui/src/style/widget/weui_tips/weui_mask.less')
      require('../../../styles/device/powerMode.less')
      const {isShowPowerMode, powerMode: {start, end, model}} = this.props
      return (
        <div className={'powerMode'}>
          <Title title={'省电模式'}/>
          <Tab key="1" name='模式选择' val={['已关闭', '超级省电', '省电勿扰'][model - 1]}
               onClick={() => this.props.showPowerMode(true)}/>
          { model === 3 && <Tab key="2" name='起止时间' val={`${start}~${end}`} onClick={() => this._go()}/>}
          {this._renderText()}
          <Actionsheet show={isShowPowerMode}
                       menus={[
                         {label: '关闭', onClick: () => this._select(1)},
                         {label: '超级省电', onClick: () => this._select(2)},
                         {label: '省电勿扰', onClick: () => this._select(3)}
                       ]}
                       actions={[{label: '取消', onClick: () => this._close()}]}
                       onRequestClose={() => this._close()}
          ></Actionsheet>
        </div>
      )
    }

    _select(model) {
      const {powerMode, updatePowerMode} = this.props
      updatePowerMode({
        ...powerMode,
        model
      })
      this._close()
    }

    _close() {
      this.props.showPowerMode(false)
    }

    _go() {
      const {params: {deviceId}, push} = this.props
      push(`device/${deviceId}/powerModeTime`)
    }

    _renderText() {
      return (
        <div className="mode_text">
          <div>【超级省电模式】</div>
          <div>血压计全天不能实时接收微信端的语音、提醒设置。收到新语音时，在23:00~次日06:00无语音提示，无呼吸灯亮。</div>
          <div>【省电勿扰模式】</div>
          <div>血压计在勿扰时段关闭WiFi网络，不能实时接收微信端的语音、提醒设置，并且收到新语音时，无语音提示，无呼吸灯亮。</div>
        </div>
      )
    }
  })

