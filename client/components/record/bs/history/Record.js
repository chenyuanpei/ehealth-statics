import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import moment from 'moment'
import {RowFlex, Col} from '../../../frozenui/grid'
import {filter} from '../../../../util/record/record'
import bpUtil from '../../../../util/record/bpUtil'

export default class Record extends Component {

  render() {
    const {st,sp, dp, hr, measurementDate, level,memo, onClick} = this.props
    const status = bpUtil.calcStatus(level)
    let remarkImg = ''
    let remarkClassName = 'm-remark-none'
    if(memo && memo.length > 0){
      remarkClassName = 'm-remark-img'
      remarkImg = require('../../../../../static/images/record/icon_bs_info.png')
    }
    return (
      <div className="historyBsInfo" onClick={onClick}>
        {/*<div className="historyText">*/}
          {/*<span className={`record-${level}`}>{filter(st)}</span>*/}
        {/*</div>*/}
        <RowFlex className="currentValBox">
          {/*<Col className="texRow1">*/}
            {/*<span>{filter(sp)}</span>*/}
          {/*</Col>*/}
          <Col className="texRow1">
            <span className="bs-time">{moment(measurementDate).format('HH:mm')}</span><span>{filter(sp)}</span>
            <span className="bs-value">{filter(dp.toFixed(1))}{'mmol/L'}</span>
          </Col>
          <Col className="historyTime">
            <label className={`record-${level}`}>{filter(st)}</label>
          </Col>
        </RowFlex>
        <span className={remarkClassName}><img src={remarkImg} /> </span>
        <span className="m-arrow-img"><img src={require('../../../../../static/images/btn_new_p.png')}/></span>
      </div>
    )
  }

}
