import React, {Component, PropTypes} from 'react'

export default class TimeRemind extends Component {
  render() {
    require('../../../styles/common/remind/timeRemind.less')
    require('weui/src/style/widget/weui_cell/weui_switch.less')
    const {time, switchV, name, setTime, setSwitch} = this.props

    return (
      <div className="remainTab">
        <div className="remainBox" onClick={setTime}>
          <div>
            {name}
          </div>
          <div className="time">
            {time}
          </div>
        </div>
        <div className={switchV ? "weui_switch check" : "weui_switch"}
             onClick={() => setSwitch && setSwitch([1, 0][switchV])}></div>
      </div>
    )
  }
}
