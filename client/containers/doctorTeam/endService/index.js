import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {closeWindow} from '../../../util/wxJs/wxApi'
import Alert from '../../../components/common/dialog/Alert'
// util
import {debug} from '../../../util/common'
// components

import Title from '../../../components/common/title/Title'
import Button from '../../../components/common/button/Button'
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
    const {loadData} = this.props
    loadData()
  }

  render() {
    require('../../../styles/doctorTeam/endService.less')
    return (
      <div className="m-agreement-panel">
        <Title title='确认结束服务'/>
        {this._renderContent()}

      </div>
    )
  }
  _closeWindow() {
    closeWindow()
  }
  _endServiceEvent() {
    const {endServiceEvent,location: {query: {doctorTeamId}},params:{memberId}} = this.props
    endServiceEvent({doctorTeamId})
  }
  _renderContent() {
    const {isShow,finishResult} = this.props
    let finishAlertTips = ''
    switch(finishResult)
    {
    case 1:
      finishAlertTips = '服务结束成功！请留意短信和微信消息。'
      break;
    case 2:
      finishAlertTips = '操作失败！您扫描了无效二维码！'
      break;
    default:
      finishAlertTips = '操作失败！您已结束服务或订单异常。'
    }
    return (
      <div className="m-end-service-wrap">
        <div className="m-end-service-tips">
          <img src={require('../../../../static/images/doctorTeam/icon_end_servive.png')} />
          请确认已归还所有设备，服务结束后将<br />不能通过微信与医生团队进行线上沟通。

        </div>
        <Alert show={isShow} text="知道了" onClick={() => this._closeWindow()}>
          <div className="confirm">{finishAlertTips}</div>
        </Alert>
        <div className="pageBottom m-result-btn-wrap">
          <Button onClick={() => this._endServiceEvent()}>确认结束服务</Button>
          <Button onClick={() => this._closeWindow()}>取消</Button>

        </div>
      </div>
    )

  }

})

