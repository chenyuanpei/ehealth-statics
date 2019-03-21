import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'

export default class CenterTopCol extends Component {

  render() {
    const {onClick,icoImg,name,remind} = this.props
    require('../../../styles/member/centerTop.less')
    return (
      <Col className="m-center-top-col" onClick={onClick}>
        <img src={icoImg} alt=""/>
        <p>{name}</p>
        <span style={{display:remind?'inline-block':'none'}} className="remind"></span>
      </Col>
    )
  }
}
