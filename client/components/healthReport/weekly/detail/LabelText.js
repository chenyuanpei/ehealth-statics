import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

// components

export default class extends Component {

  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {title, children} = this.props

    return (
      <div className="labelText">
        <div>{title}</div>
        <div className="contentText">{children}</div>
      </div>
    )
  }
}
