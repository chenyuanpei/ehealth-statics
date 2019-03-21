import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'

export default class AssistTab extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    items: PropTypes.array
  }

  render() {
    require('../../styles/healthRecord/AssistTab.less')

    const {name, items, onClick} = this.props

    return (
      <RowFlex className="assist_tab" onClick={onClick}>
        <div className="left">
          <div className="name">{name}</div>
          <div className="items">
            {items.map((it, idx) => (
              <div key={idx} className="imgbox"><img src={it.url}/></div>
            ))}
            <div className="imgbox"><img
              src={require('../../../static/images/healthRecord/btn_add_photo_small.png')}/></div>
          </div>
        </div>
        <Col className="right"> > </Col>
      </RowFlex>
    )
  }
}
