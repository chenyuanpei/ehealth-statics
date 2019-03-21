import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import moment from 'moment'
import {RowFlex, Col} from '../../../frozenui/grid'
import {filter} from '../../../../util/record/record'
import bpUtil from '../../../../util/record/bpUtil'

export default class Record extends Component {

  render() {
    const {sp, dp,remark, hr, measurementDate,irregularHeartbeat, level, onClick} = this.props
    const status = bpUtil.calcStatus(level)
    let remarkImg = ''
    let remarkClassName = 'm-remark-none'
    if(remark && remark.length > 0){
      remarkClassName = 'm-remark-img'
      remarkImg = require('../../../../../static/images/record/icon_bp_info.png')
    }
    return (
      <div className="historyInfo" onClick={onClick}>
        <div className="historyText">
          <span className={`record-${status}`}>{bpUtil.getIconText(status)}</span>
        </div>
        <RowFlex className="currentValBox">
          <Col className="texRow">
            <span>{filter(sp)}/{filter(dp)}</span>
            <span>{'血压 mmHg'}</span>
          </Col>
          <Col className="texRow">
            <span>{filter(hr)}{irregularHeartbeat ? <img className="m-heart-rate-icon" src={require('../../../../../static/images/record/ic_bloodpressure_irregular_s@2x.png')} alt=""/> : ''}</span>
            <span>{'脉搏 bpm'}</span>
          </Col>
          <Col className="historyTime">
            <label>{moment(measurementDate).format('HH:mm')}</label>

          </Col>
        </RowFlex>
        <span className={remarkClassName}><img src={remarkImg} /> </span>
        <span className="m-arrow-img"><img src={require('../../../../../static/images/btn_new_p.png')}/></span>
      </div>
    )
  }

}
