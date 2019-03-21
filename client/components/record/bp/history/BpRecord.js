import React, {Component, PropTypes} from 'react'
import PubSub from 'pubsub-js'

import {dateFilter} from '../../../../util/details/dateText'
// components
import SlideDelete from '../../../../components/common/slide/SlideDelete'
import RecordView from './Record'

export const TOPIC_DELETE_BP_RECORD = 'TOPIC_DELETE_BP_RECORD'
export const TOPIC_PUSH_BP_DETAIL = 'TOPIC_PUSH_BP_DETAIL'

export default class BpRecords extends Component {

  _delBpRecord() {
    const {id, date} = this.props
    PubSub.publish(TOPIC_DELETE_BP_RECORD, {
      id,
      date
    })
  }
  _pushBpDetail() {
    const {id} = this.props
    PubSub.publish(TOPIC_PUSH_BP_DETAIL, {
      id
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return Object.keys(this.props).some((key) => this.props[key] !== nextProps[key])
  }

  render() {
    const {id, sp, dp, remark, hr, measurementDate, level, display, showDel,irregularHeartbeat} = this.props
    // <SlideDelete
    //   onDelete={() => this._delBpRecord()}>
    //   <RecordView {...{sp, dp, hr, measurementDate, level}} onClick={() => this._pushBpDetail()} />
    // </SlideDelete>
    // 有血压数据记录
    if (!showDel) {
      return (
        <div key={id} className="bp_date">
          <label className={`date_text_${display}`}>{dateFilter(measurementDate)}</label>
          <RecordView {...{sp, dp, hr, measurementDate, level}}/>
        </div>
      )
    } else {
      return (
        <div key={id} className="bp_date">
          <label className={`date_text_${display}`}>{dateFilter(measurementDate)}</label>
            <RecordView {...{sp, dp, remark, hr,irregularHeartbeat, measurementDate, level}} onClick={() => this._pushBpDetail()} />

        </div>
      )
    }
  }
}
