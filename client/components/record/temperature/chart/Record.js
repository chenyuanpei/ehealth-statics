import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import moment from 'moment'
import {RowFlex, Col} from '../../../frozenui/grid'
import {filter} from '../../../../util/record/record'
import bpUtil from '../../../../util/record/bpUtil'

export default class Record extends Component {

  render() {
    const {id, measurementDate,remark,levelName, degree, level, onClick} = this.props
    let remarkImg = ''
    let remarkClassName = 'm-remark-none'
    if(remark && remark.length > 0){
      remarkClassName = 'm-remark-img'
      remarkImg = require('../../../../../static/images/device/temperature/icon-temperature-remark.png')
    }
    return (
      <div className="historyInfo" onClick={onClick}>
        <div className="historyText">
          <span className={`record-${level}`}>{filter(levelName)}</span>
        </div>
        <RowFlex className="currentValBox">

          <Col className="texRow">
            <span>{filter(degree.toFixed(1))}{'℃'}</span>
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
