import React, {Component, PropTypes} from 'react'
import setTitle from '../../../util/setTitle'

export default class Title extends Component {

  componentDidMount() {
    const {title} = this.props

    if (title) {
      setTitle(title)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    return (
      <noscript/>
    )
  }
}
