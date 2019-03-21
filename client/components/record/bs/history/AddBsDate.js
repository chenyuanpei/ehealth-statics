import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Select from '../../../../components/common/dialog/select'

export default class AddBsDate extends Component {
  state = {
    show: this.props.show
  }

  constructor(props) {
    super(props)

    const bsValue = []
    const bsTime = ['空腹','早餐后','午餐前','午餐后','晚餐前','晚餐后','睡前']

    for (let i = 1; i <= 323; i++) {
      let bsVal = (1 + i/10).toFixed(1)
      bsValue.push(bsVal)
    }
    // 选择血压选项
    this.opts = {
      title: '添加数据',
      value: ['午餐前', '6.0'],
      data: [
        {
          left: '',
          right: '',
          values: bsTime
        }, {
          left: '',
          right: 'mmol/L',
          values: bsValue
        }
      ],
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

}
