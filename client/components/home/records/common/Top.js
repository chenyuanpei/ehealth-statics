import React, {Component, PropTypes} from 'react'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'

export default class Top extends Component {

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }
  //
  //static propTypes = {
  //  total: PropTypes.number,
  //  normal: PropTypes.number,
  //  abnormal: PropTypes.number,
  //}

  static defaultProps = {
    title: '',
    text: '',
  }

  render() {
    const {title, text} = this.props

    return (
      <div className="chartBoxTop" style={{display:'flex'}}>
        <span>{title}</span>
        <div>
          <span>{text}</span>
        </div>
      </div>
    )
  }

}
