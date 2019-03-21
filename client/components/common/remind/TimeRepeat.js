import React, {Component, PropTypes} from 'react'

export default class TimeRepeat extends Component {
  render() {
    require('../../../styles/common/remind/timeRemind.less')
    const {weekDay} = this.props
    const day = Array.from(weekDay)
    this.repeat = this.isCheck(day)
    return (
      <div className="timeRepeat">
        <div className="remainTab">
          <div className="remainBox">
            重复
          </div>
          <div className={this.repeat ? 'weui_switch check' : 'weui_switch'} onClick={() => this._click(0)}></div>
        </div>
        <div className="remainTab">
          {this._renderDay(day)}
        </div>
      </div>
    )
  }

  isCheck(day) {
    for (let i = 1; i <= 8; i++) {
      if (day[i] - 0) {
        return true
      }
    }
    return false
  }

  _click(idx) {
    const {onClick, weekDay} = this.props
    let day = Array.from(weekDay)
    if (idx && !this.repeat) {
      return
    }
    if (!idx && this.repeat) {
      day = Array.from('10000000')
    }
    if (!idx && !this.repeat) {
      day = Array.from('01000000')
    }
    if (idx && this.repeat) {
      day[idx] = [1, 0][day[idx]]
    }
    onClick && onClick(day.join(''))
  }

  _renderDay(day) {
    return ['一', '二', '三', '四', '五', '六', '日'].map((val, idx) => {
      return (
        <div key={idx} className={day[idx + 1] - 0 ? 'day checked' : 'day'} onClick={() => this._click(idx + 1)}>
          {val}
        </div>
      )
    })
  }
}
