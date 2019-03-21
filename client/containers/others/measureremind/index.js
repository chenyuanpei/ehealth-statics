import React, {Component} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import TimeRemind from '../../../components/common/remind/TimeRemind'
import TimeRepeat from '../../../components/common/remind/TimeRepeat'
import Switch from '../../../components/common/remind/Switch'
import TimeSet from '../../../components/common/remind/TimeSet'
import Button from '../../../components/common/button/Button'
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    // 根据设备id获取设备详情
    const {init, params: {deviceId}} = this.props
    init({deviceId})
  }

  render() {
    require('../../../styles/device/timeMeasureRemind.less')
    return (
      <div>
        <Title title='设备信息'/>
        {this._renderTab()}
        <div className="reminds">
          {this._renderReminds()}
        </div>
        {this._renderRepeat()}
        {this._renderTimeSet()}
        {this._renderTips()}
        {this._renderSave()}

      </div>
    )
  }

  // 生成头部Tab
  _renderTab() {
    const {roles, getTimeRemind, params} = this.props
    const onClick = (role) => {
      getTimeRemind({deviceId: params.deviceId, userNo: role.userNo})
    }
    return <Switch {...roles} onClick={onClick}/>
  }

  // 生成提醒tab
  _renderReminds() {
    const {reminds, getTimeRemindSuccess, setTime} = this.props
    return [1, 2, 3].map(v => ({
      time: reminds[`time${v}`],
      switchV: reminds[`switch${v}`],
      name: `提醒${v}`,
      setTime: () => setTime(v),
      setSwitch: (val) => getTimeRemindSuccess({...reminds, [`switch${v}`]: val})
    })).map((opt, idx) => <TimeRemind key={idx} {...opt}/>)
  }

  // 生成重复tab
  _renderRepeat() {
    const {reminds, getTimeRemindSuccess} = this.props
    let {weekDay} = reminds
    if (!weekDay || !weekDay.length) {
      return <noscript/>
    }
    const onClick = (val) => {
      getTimeRemindSuccess({...reminds, weekDay: this.reverse(val)})
    }
    weekDay = this.reverse(weekDay)
    return <TimeRepeat weekDay={weekDay} onClick={onClick}/>
  }

  reverse(val = []) {
    const [a, ...arr] = val
    return a + arr.reverse().join('')
  }

  // 生成时间选择
  _renderTimeSet() {
    const {reminds, getTimeRemindSuccess, time, setTime} = this.props
    const opts = {
      onCancel: () => setTime(0),
      confirm: (val) => {
        this.remindsTime = val
        setTime(0)
        getTimeRemindSuccess({...reminds, [`time${time}`]: val, [`switch${time}`]: 1})
      },
      val: reminds[`time${time}`]
    }
    return <TimeSet show={!!time} {...opts}/>
  }
  _renderTips() {
    return (
        <div className="m-remind-tips">
          操作提示：设置测量提醒时，需i8血压计处于在线状态，如保存设置后，发现设备没有按时响应的情况，请先检查设备连线状态并重试。
        </div>
    )
  }
  // 生成保存按钮
  _renderSave() {
    const {save, reminds} = this.props
    const onclick = () => {
      save({...reminds, deviceId: this.props.params.deviceId})
    }
    return (
      <div className="pageBottomIn">
        <Button onClick={onclick}>保存</Button>
      </div>
    )
  }
})
