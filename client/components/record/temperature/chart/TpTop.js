import React, {Component, PropTypes} from 'react'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'

export default class BpTop extends Component {

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  static propTypes = {
    total: PropTypes.number,
    highBs: PropTypes.number,
    lowBs: PropTypes.number,
    highSide: PropTypes.number,
    lowSide: PropTypes.number,
    normal: PropTypes.number,
    abnormal: PropTypes.number,
  }

  static defaultProps = {
    total: 0,
    highBs: 0,
    lowBs: 0,
    highSide: 0,
    lowSide: 0,
    normal: 0,
    abnormal: 0,
  }

  render() {
    const {highBs, highSide, lowSide,lowBs} = this.props

    return (
      <div className="chartBoxTop">
        <span>{'血糖'}</span>
        <div>
          <span>{`高血糖${highBs}次`}</span>
          <span>{`偏高${highSide}次`}</span>
          <span>{`偏低${lowSide}次`}</span>
          <span>{`低血糖${lowBs}次`}</span>
        </div>
      </div>
    )
  }

}
