import React, {Component, PropTypes} from 'react'
import PubSub from 'pubsub-js'

import {dateFilter,getWeekDay} from '../../../../util/details/dateText'
// components
import SlideDelete from '../../../../components/common/slide/SlideDelete'
import RecordView from './Record'
import moment from 'moment'
export const TOPIC_DELETE_BP_RECORD = 'TOPIC_DELETE_BP_RECORD'
export const TOPIC_PUSH_BS_DETAIL = 'TOPIC_PUSH_BS_DETAIL'

export default class BsRecords extends Component {

  _delBpRecord() {
    const {id, date} = this.props
    PubSub.publish(TOPIC_DELETE_BP_RECORD, {
      id,
      date
    })
  }
  _pushBsDetail() {
    const {id} = this.props

    PubSub.publish(TOPIC_PUSH_BS_DETAIL, {
      id
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return Object.keys(this.props).some((key) => this.props[key] !== nextProps[key])
  }

  render() {
    const {id, st, sp, dateType, memo, dp, hr, measurementDate, level, display, showDel} = this.props
    // <SlideDelete
    //   onDelete={() => this._delBpRecord()}>
    //   <RecordView {...{sp, dp, hr, measurementDate, level}} onClick={() => this._pushBpDetail()} />
    // </SlideDelete>
    // 血糖数据记录
    let weekDayText = ''
    if(dateType === 'week'){
      weekDayText = getWeekDay(measurementDate)
    }
    if (!showDel) {
      return (
        <div key={id} className="bp_date">
          <label className={`date_text_${display}`}>{moment(measurementDate).format('YYYY年MM月DD日')} {weekDayText}</label>
          <RecordView {...{st,sp, dp, memo, hr, measurementDate, level}}/>
        </div>
      )
    } else {
      return (
        <div key={id} className="bp_date">
          <label className={`date_text_${display}`}>{moment(measurementDate).format('YYYY年MM月DD日')} {weekDayText}</label>
            <RecordView {...{st,sp, dp, memo, hr, measurementDate, level}} onClick={() => this._pushBsDetail()} />

        </div>
      )
    }
  }
}
