import React, {Component, PropTypes} from 'react'
import moment from 'moment'

// components
import TpRecord from './TpRecord'

export default class TpRecords extends Component {

  render() {
    const {TpHistory, showDel} = this.props

    // 有血压数据记录
    return (
      <div>
        {TpHistory.map(({id, measurementDate,remark,levelName, degree, level}, i) => {
          let display = 'show'
          // 判断跟前面是否同一天，若同一天则隐藏
          if (i !== 0 && moment(TpHistory.get(i - 1).measurementDate).isSame(measurementDate, 'day')) {
            display = 'hide'
          }
          return (
            <TpRecord key={id} showDel={showDel} {...{id, measurementDate,remark,levelName, degree, level, display}}>
            </TpRecord>
          )
        }).toArray()}
      </div>
    )
  }
}
