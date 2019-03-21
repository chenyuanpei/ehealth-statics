import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import Select from '../../../components/common/dialog/select'
import {add} from '../../../util/common'
import {diseaseFilter} from '../../../util/member/diseaseFilter'

export default class CommonSelect extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    confirm: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    type: PropTypes.string
  }

  state = {
    show: this.props.show
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

  shouldComponentUpdate(nextProps, nextState) {
    const {show} = this.state
    const {show: nextShow} = nextState
    if (show !== nextShow) {
      return true
    }
    return false
  }

  render() {
    const {show} = this.state
    let thisGen = JSON.stringify(this._genOpts())
    return (
      <Select show={show} ref="select" {...this._genOpts()} />
    )
  }

  // 生成配置
  _genOpts() {
    const {type, onConfirm, onCancel, value} = this.props
    return ({
      confirm: () => {
        onConfirm && onConfirm(this.refs.select.getValue())
      },
      onCancel: () => {
        onCancel && onCancel()
      },
      ...({
        sex: {
          title: '性别',
          data: [{
            values: [1, 2],
            format: (v) => ['男', '女'][v - 1]
          }],
          value: 1,
          parseValue: (v) => [v],
          valueFormat: (arr) => arr[0]
        },
        sickType: {
          title: '疾病类型',
          data: [{
            values: [0, 2, 3, 4, 1],
            format: diseaseFilter
          }],
          value: 0,
          parseValue: (v) => {
            return [v]
          },
          valueFormat: (arr) => {
            return arr[0]
          }
        },
        height: {
          title: '身高',
          data: [{
            right: 'cm',
            values: this._genValues(100, 220, 1)
          }],
          value: 170,
          parseValue: (v) => {
            v = typeof(v) === 'number' ? v : 165
            return [v]
          },
          valueFormat: (arr) => arr[0]
        },
        weight: {
          title: '体重',
          data: [{
            values: this._genValues(3, 149, 1),
            right: ''
          }, {
            right: 'kg',
            values: this._genValues(0, 9, 1),
            format: (v) => '.'+v
          }],
          value: 60,
          parseValue: (v) => {
            v = typeof(v) === 'number' ? v : 60
            return [parseInt(v), v * 10 % 10]
          },
          valueFormat: ([v1, v2]) => v1 + v2 / 10
        },
        waistline: {
          title: '腰围',
          data: [{
            right: 'cm',
            values: this._genValues(20, 200, 1)
          }],
          value: 55,
          parseValue: (v) => {
            v = typeof(v) === 'number' ? v : 70
            return [v]
          },
          valueFormat: (arr) => arr[0]
        },
        birthday: {
          title: '出生日期',
          data: [{
            right: '年',
            values: (() => {
              let max = moment().get('year')
              return this._genValues(max - 100, max, 1)
            })(),
          }, {
            right: '月',
            values: this._genValues(1, 12, 1)
          }, {
            right: '日',
            genValues: ([year, month]) => {
              const values = []
              let days = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
              for (let i = 1; i <= days; i++) {
                values.push(i)
              }
              return values
            },
          }],
          value: moment('1990-01-01', 'YYYY-MM-DD').valueOf(),
          parseValue: (v) => {
            const m = v > 0 ? moment(v) : moment('1970-01-01')
            return [m.get('year'), m.get('month') + 1, m.get('date')]
          },
          valueFormat: ([y, m, d]) => {
            return moment(`${y}-${m}-${d}`, 'YYYY-MM-DD').valueOf()
          }
        },
        date: {
          title: '日期',
          data: [{
            right: '年',
            values: (() => {
              let max = moment().get('year')
              return this._genValues(2015, max, 1)
            })(),
          }, {
            right: '月',
            values: this._genValues(1, 12, 1)
          }, {
            right: '日',
            genValues: ([year, month]) => {
              const values = []
              let days = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
              for (let i = 1; i <= days; i++) {
                values.push(i)
              }
              return values
            },
          }],
          value: moment('1990-01-01', 'YYYY-MM-DD').valueOf(),
          parseValue: (v) => {
            const m = moment(v)
            return [m.get('year'), m.get('month') + 1, m.get('date')]
          },
          valueFormat: ([y, m, d]) => {
            return moment(`${y}-${m}-${d}`, 'YYYY-MM-DD').valueOf()
          }
        },
        datetime: {
          title: '时间',
          data: [
            {
              right:'时',
              values: (() => {
                return this._genValues(0, 23, 1)
              })(),
            },
            {
              right:'分',
              values: (() => {

                return this._genValues(0, 59, 1)
              })(),
            },
          ],
          value: moment('HH:mm').valueOf(),
          parseValue: (v) => {
            const m = moment()
            return [m.get('hours'), m.get('minutes')]
          },
          valueFormat: ([H, m]) => {
            return moment(`${H}:${m}`, 'HH:mm').valueOf()
          }
        },
        serviceday: {
          title: '服务期限',
          //data: [{
          //  right: '天',
          //  values: this._genValues(1, 5, 1)
          //}],
          data: [{
            values: [1, 2, 3, 4, 5],
            format: (v) => ['1天', '2天', '3天', '4天', '5天',][v - 1]
          }],
          value: 1,
          parseValue: (v) => [v],
          valueFormat: (arr) => arr[0]
        },
        startDate: {
          title: '开始时间',
          data: [{
            right: '年',
            values: (() => {
              let max = moment().get('year')
              return this._genValues(2015, max, 1)
            })(),
          }, {
            right: '月',
            values: this._genValues(1, 12, 1)
          }, {
            right: '日',
            genValues: ([year, month]) => {
              const values = []
              let days = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
              for (let i = 1; i <= days; i++) {
                values.push(i)
              }
              return values
            },
          }],
          value: moment('1990-01-01', 'YYYY-MM-DD').valueOf(),
          parseValue: (v) => {
            const m = moment(v)
            return [m.get('year'), m.get('month') + 1, m.get('date')]
          },
          valueFormat: ([y, m, d]) => {
            return moment(`${y}-${m}-${d}`, 'YYYY-MM-DD').valueOf()
          }
        },
        endDate: {
          title: '结束时间',
          data: [{
            right: '年',
            values: (() => {
              let max = moment().get('year')
              return this._genValues(2015, max, 1)
            })(),
          }, {
            right: '月',
            values: this._genValues(1, 12, 1)
          }, {
            right: '日',
            genValues: ([year, month]) => {
              const values = []
              let days = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
              for (let i = 1; i <= days; i++) {
                values.push(i)
              }
              return values
            },
          }],
          value: moment('1990-01-01', 'YYYY-MM-DD').valueOf(),
          parseValue: (v) => {
            const m = moment(v)
            return [m.get('year'), m.get('month') + 1, m.get('date')]
          },
          valueFormat: ([y, m, d]) => {
            return moment(`${y}-${m}-${d}`, 'YYYY-MM-DD').valueOf()
          }
        },
      })[type],
      value,
    })
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
