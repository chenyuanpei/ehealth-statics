import React, {Component, PropTypes} from 'react'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'

export default class BpTop extends Component {

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  static propTypes = {
    total: PropTypes.number,
    normal: PropTypes.number,
    abnormal: PropTypes.number,
  }

  static defaultProps = {
    total: 0,
    normal: 0,
    abnormal: 0,
  }

  render() {
    const {total, normal, abnormal} = this.props

    return (
      <div className="chartBoxTop">
        <span>{'血压'}</span>
        <div>
          <span>{`本周测量${total}次`}</span>
          <span>{`正常${normal}次`}</span>
          <span>{`异常${abnormal}次`}</span>
        </div>
      </div>
    )
  }

}
