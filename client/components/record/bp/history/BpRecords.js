import React, {Component, PropTypes} from 'react'
import moment from 'moment'

// components
import BpRecord from './BpRecord'

export default class BpRecords extends Component {

  render() {
    const {bpHistory, showDel} = this.props

    // 有血压数据记录
    return (
      <div>
        {bpHistory.map(({id, measurementDate,remark,irregularHeartbeat, systolicPressure: sp, diastolicPressure: dp, heartRate: hr, level}, i) => {
          let display = 'show'
          // 判断跟前面是否同一天，若同一天则隐藏
          if (i !== 0 && moment(bpHistory.get(i - 1).measurementDate).isSame(measurementDate, 'day')) {
            display = 'hide'
          }

          return (
            <BpRecord key={id} showDel={showDel} {...{id, sp, dp, hr,irregularHeartbeat, measurementDate,remark, level, display}}>
            </BpRecord>
          )
        }).toArray()}
      </div>
    )
  }
}
