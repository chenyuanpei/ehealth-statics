import React, {Component, PropTypes} from 'react'
import Select from '../dialog/select'
import moment from 'moment'

export default class TimeSet extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    confirm: PropTypes.func
  }

  render() {
    const {show, confirm, val, ...others} = this.props
    const date = val ? moment(val, 'HH:mm') : moment()
    const opts = {
      title: '提醒时间',
      confirm: () => {
        const val = this.refs.select.getValue()
        confirm && confirm(val.join(':'))
      },
      value: [this._gen(date.get('hour')), this._gen(date.get('minute'))],
      data: this._genData()
    }
    return (
      <Select show={show} ref="select" {...opts} {...others}/>
    )
  }

  _genData() {
    return [{
      right: '时',
      values: (() => {
        const values = []
        for (let i = 0; i <= 23; i++) {
          values.push(this._gen(i))
        }
        return values
      })(),
    }, {
      right: '分',
      values: (() => {
        const values = []
        for (let i = 0; i <= 59; i++) {
          values.push(this._gen(i))
        }
        return values
      })()
    }]
  }

  _gen(i) {
    // 补零
    return `${i}`.length === 2 ? `${i}` : `0${i}`
  }
}
