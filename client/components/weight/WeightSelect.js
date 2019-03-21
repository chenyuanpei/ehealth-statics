import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Select from '../../components/common/dialog/select'
import {add} from '../../util/common'
export default class WeightSelect extends Component {
  state = {
    show: this.props.show
  }

  constructor(props) {
    super(props)
    const bsValue = []
    for (let i = 1; i <= 323; i++) {
      let bsVal = (1 + i/10).toFixed(1)
      bsValue.push(bsVal)
    }

    // 选择体重选项
    this.opts = {
      title: '体重数据',
      data: [{
        values: this._genValues(3, 149, 1),
        right: '',
      }, {
        right: 'kg',
        values: this._genValues(0, 9, 1),
        format: (v) => '.'+v
      }],
      value: 55,
      parseValue: (v) => {
        v = typeof(v) === 'number' ? v : 60
        return [parseInt(v), v * 10 % 10]
      },
      valueFormat: ([v1, v2]) => v1 + v2 / 10
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {show} = this.props

    const {show: nextShow} = nextProps

    if (show !== nextShow) {
      return true
    }

    return false
  }

  getBsRecord() {
    return this.refs.select.getValue()
  }

  componentWillReceiveProps(nextProps) {
    const {show} = this.props
    const {show: nextShow} = nextProps

    if (show !== nextShow) {
      this.setState({
        show: nextShow
      })
    }
  }

  render() {
    const {addConfirm, onCancel} = this.props
    const {show} = this.state

    return (
      <Select {...this.opts} show={show} ref="select" onCancel={() => onCancel()}
              confirm={() => addConfirm && addConfirm(this.getBsRecord())}>
      </Select>
    )
  }
  // 生成Values
  _genValues(min, max, step) {
    const arr = []
    for (let i = min; i <= max; i = add(i, step)) {
      arr.push(i)
    }
    return arr
  }
}
