import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import {RowFlex, Col} from '../../../frozenui/grid'
import {filter} from '../../../../util/record/record'
import bpUtil from '../../../../util/record/bpUtil'

export default class BpInfo extends Component {

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    require('../../../../styles/record/record.less')
    require('../../../../styles/home/records/bp/bpinfo.less')
    const {title, bpHrData} = this.props
    const {systolicPressure, diastolicPressure, heartRate, measurementDate, level} = bpHrData || {}
    let nullDate = !measurementDate ? 'DateNull' : ''

    const status = bpUtil.calcStatus(level)

    return (
        <div className="historyInfo">
          <div className="historyTitle">
            <span>{title}</span>
          </div>
          <RowFlex className="currentValBox">
            <Col className={`texRow history${nullDate}`}>
              <span className={`record-${status} record${nullDate}`}>{bpUtil.getIconText(status)}</span>
              <span>{moment(measurementDate).format('MM-DD HH:mm')}</span>
            </Col>
            <Col className="texRow">
              <span>{filter(systolicPressure)}/{filter(diastolicPressure)}</span>
              <span>{'血压 mmHg'}</span>
            </Col>
            <Col className="texRow">
              <span>{filter(heartRate)}</span>
              <span>{'脉搏 bpm'}</span>
            </Col>
          </RowFlex>
        </div>
    )
  }

}
