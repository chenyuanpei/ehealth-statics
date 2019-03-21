import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import classnames from 'classnames'
// components
import RowFlex from '../../../frozenui/grid/RowFlex'
import Col from '../../../frozenui/grid/Col'
import LabelText from './LabelText'

export default class extends Component {

  static propTypes = {
    report: PropTypes.object,
  }

  static defaultProps = {
    report: {},
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {
      report: {lowBpNum, normalBpNum, normalHighBpNum, highBpNum, heartLevel, bpLevel, systolicPressure, diastolicPressure, heartRate, rateAdvice}
    } = this.props

    return (
      <div className={classnames('block', 'statisticsBox')}>
        <div className="lineTitle"><span>{'本周血压情况'}</span></div>
        <RowFlex className="levelCountBox">
          {/* <Col className={classnames('none')}> */}
          <Col className={classnames(lowBpNum ? 'low' : 'none')}>
            <div>{'低血压'}</div>
            <div>{lowBpNum}次</div>
          </Col>
          <Col className={classnames(normalBpNum ? 'normal' : 'none')}>
            <div>{'正常'}</div>
            <div>{normalBpNum}次</div>
          </Col>
          <Col className={classnames(normalHighBpNum ? 'normalhigh' : 'none')}>
            <div>{'正常高值'}</div>
            <div>{normalHighBpNum}次</div>
          </Col>
          <Col className={classnames(highBpNum ? 'high' : 'none')}>
            <div>{'高血压'}</div>
            <div>{highBpNum}次</div>
          </Col>
        </RowFlex>
        <RowFlex className="avgBox">
          <Col>
            <div>{'血压平均'}</div>
            <div>{systolicPressure}/{diastolicPressure}mmHg</div>
            <div className={classnames('normalhigh')}>{bpLevel}</div>
          </Col>
          <Col>
            <div>{'心率平均'}</div>
            <div>{heartRate}次/分</div>
            <div className={classnames('normal')}>{heartLevel}</div>
          </Col>
        </RowFlex>
        <div className="m-report-none">
          <LabelText title="测量建议">{rateAdvice}</LabelText></div>
      </div>
    )
  }
}
