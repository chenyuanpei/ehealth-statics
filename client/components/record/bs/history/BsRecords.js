import React, {Component, PropTypes} from 'react'
import moment from 'moment'

// components
import BsRecord from './BsRecord'

export default class BsRecords extends Component {

  render() {
    const {dateType,bsHistory, showDel} = this.props

    // 有血压数据记录
    return (
      <div>
        {bsHistory.map(({id, measurementDate,memo,levelName:st, mealPeroidName: sp, glucoseConcentration: dp, level}, i) => {
          let display = 'show'
          // 判断跟前面是否同一天，若同一天则隐藏
          if (i !== 0 && moment(bsHistory.get(i - 1).measurementDate).isSame(measurementDate, 'day')) {
            display = 'hide'
          }
          return (
            <BsRecord dateType={dateType} key={id} showDel={showDel} {...{id, st, sp, dp,memo, measurementDate, level, display}}>
            </BsRecord>
          )
        }).toArray()}
      </div>
    )
  }
}
