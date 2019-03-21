import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-immutable-render-mixin'
import {RowFlex, Col} from '../../../frozenui/grid'

export default class BpMeasureInfo extends Component {

  static proptTypes = {
    total: PropTypes.number,
    normal: PropTypes.number,
    abnormal: PropTypes.number,
    highBs: PropTypes.number,
    highSide: PropTypes.number,
    lowBs: PropTypes.number,
    lowSide: PropTypes.number,
  }

  static defaultProps = {
    total: 0,
    normal: 0,
    abnormal: 0,
    highBs: 0,
    highSide: 0,
    lowBs: 0,
    lowSide: 0,
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {highSide, lowSide,normal} = this.props
    require('../../../../styles/home/records/bp/bpmeasureinfo.less')
    return (
      <div className="bp_measure_info">
        <RowFlex className="currentValBox">
          <Col className={`texRow`}>
            <span>偏低{lowSide}次</span>
          </Col>
          <Col className="texRow">
            <span>达标{normal}次</span>
          </Col>
          <Col className="texRow">
            <span>偏高{highSide}次</span>
          </Col>

        </RowFlex>
      </div>
    )
  }
}
