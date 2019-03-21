import React, {Component, PropTypes} from 'react'
import {RowFlex} from '../frozenui/grid'
export default class Count extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  render() {
    require('../../styles/doctor/count.less')
    const {name,value,reduceClick,addClick,maxValue,minValue} = this.props
    return (
      <RowFlex className="m-count-wrap">
        <div className={parseInt(minValue) === value ? "m-reduce-left m-color-disable" : "m-reduce-left"} onClick={reduceClick}>
          -
        </div>
        <span>{value}{name}</span>
        <div className={parseInt(maxValue) === value ? "m-add-right m-color-disable" : "m-add-right"} onClick={addClick}>
          +
        </div>
      </RowFlex>
    )
  }
}
