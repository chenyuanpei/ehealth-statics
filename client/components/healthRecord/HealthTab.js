import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'

export default class HealthTab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }
  static defaultProps = {
    value: '无'
  }

  render() {
    require('../../styles/healthRecord/healthTab.less')
    const {name, value, onClick} = this.props
    return (
      <RowFlex className="health_tab" onClick={onClick}>
        <div className="left">
          <div className="name">{name}</div>
          <div className="value">{value}</div>
        </div>
        <Col className="right"> > </Col>
      </RowFlex>
    )
  }
}
