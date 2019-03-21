import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-immutable-render-mixin'
import {RowFlex, Col} from '../../../frozenui/grid'

export default class BpMeasureInfo extends Component {

  static proptTypes = {
    total: PropTypes.number,
    normal: PropTypes.number,
    abnormal: PropTypes.number,
  }

  static defaultProps = {
    total: 0,
    normal: 0,
    abnormal: 0,
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {total, normal, abnormal} = this.props
    require('../../../../styles/home/records/bp/bpmeasureinfo.less')
    return (
      <div className="bp_measure_info">
        <RowFlex className="currentValBox">
          <Col className={`texRow`}>
            <span>共测{total}次</span>
          </Col>
          <Col className="texRow">
            <span>正常{normal}次</span>
          </Col>
          <Col className="texRow">
            <span>高血压{abnormal}次</span>
          </Col>
        </RowFlex>
      </div>
    )
  }
}
