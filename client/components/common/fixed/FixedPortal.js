import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'

const defaultStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 99
}

export default class FixedPortal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired
  }

  render() {
    const {show, style, ...rest} = this.props

    return !show ? (<div/>) : (
      <div {...rest} style={{...defaultStyle, ...style}}>{this.props.children}</div>
    )
  }
}
