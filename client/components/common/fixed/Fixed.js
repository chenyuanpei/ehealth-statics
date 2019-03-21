import React, {Component, PropTypes} from 'react'
/* eslint-disable */
import ReactDOM, {render, unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer} from 'react-dom'
/* eslint-enable */
import FixedPortal from './FixedPortal'

export default class Fixed extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired
  }

  state = {
    open: this.props.show
  }

  componentDidMount() {
    this.fixedEl = document.createElement('div')

    this.fixedEl.addEventListener('touchmove', function (event) {
      event.preventDefault()
    }, false)

    document.body.appendChild(this.fixedEl)
    this.renderChildren(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.renderChildren(newProps)
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.fixedEl)
    document.body.removeChild(this.fixedEl)
  }

  renderChildren(props) {
    renderSubtreeIntoContainer(this, React.createFactory(FixedPortal)(props), this.fixedEl)
  }

  render() {
    return React.DOM.noscript()
  }
}
