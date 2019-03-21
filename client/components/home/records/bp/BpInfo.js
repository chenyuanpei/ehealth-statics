import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classnames from 'classnames'
import {calcStatus, getIconText, getIconClass} from '../../../../util/record/bpUtil'
import {filter} from '../../../../util/record/record'

import {RowFlex, Col} from '../../../frozenui/grid'

export default class BpInfo extends Component {

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static propTypes = {
    systolicPressure: PropTypes.number,
    diastolicPressure: PropTypes.number,
    heartRate: PropTypes.number,
    level: PropTypes.number
  }

  render() {
    const {systolicPressure,irregularHeartbeat, diastolicPressure, heartRate, level} = this.props

    const status = calcStatus(level)

    return (
      <div className="recordInfo">
        <div className="recordIcon recordText">
          <div className={classnames('icon_record', getIconClass(status))}/>
          <span className={`record-${status}`}>{getIconText(status)}</span>
        </div>
        <RowFlex className="currentValBox">
          <Col className="texRow">
            <span>高压</span>
            <span><span className="num"> {filter(systolicPressure)} </span> mmHg</span>
          </Col>
          <Col className="texRow">
            <span>低压</span>
            <span><span className="num"> {filter(diastolicPressure)}</span> mmHg</span>
          </Col>
          <Col className="texRow">
            <span>脉搏</span>
            <span><span className="num"> {filter(heartRate)}{irregularHeartbeat ? <img className="m-heart-icon" src={require('../../../../../static/images/record/ic_bloodpressure_irregular_s@2x.png')} alt=""/> :'' }</span> bpm</span>
          </Col>
        </RowFlex>
      </div>
    )
  }

}
