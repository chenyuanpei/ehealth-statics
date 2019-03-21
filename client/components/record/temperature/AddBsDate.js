import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Select from '../../../../components/common/dialog/select'

export default class AddBpDate extends Component {
  state = {
    show: this.props.show
  }

  constructor(props) {
    super(props)

    const spValue = []
    const dpValue = []
    const hrValue = []
    for (let i = 60; i <= 200; i++) {
      spValue.push(i)
    }
    for (let i = 30; i <= 130; i++) {
      dpValue.push(i)
    }
    for (let i = 40; i <= 120; i++) {
      hrValue.push(i)
    }
    // 选择血压选项
    this.opts = {
      title: '添加数据',
      value: [105, 70, 65],
      data: [
        {
          left: '高压',
          right: 'mmHg',
          values: spValue
        }, {
          left: '低压',
          right: 'mmHg',
          values: dpValue
        }, {
          left: '心率',
          right: '次/分',
          values: hrValue
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

  getBpRecord() {
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
                             confirm={() => addConfirm && addConfirm(this.getBpRecord())}>
      </Select>
    )
  }

}
