import React, {Component, PropTypes} from 'react'
import Select from './select'
import moment from 'moment'

export default class DateSelect extends Component {
  constructor(props) {
    super(props)
    const val = [moment(this.props.val).get('year'), moment(this.props.val).get('month') + 1, moment(this.props.val).get('date')]
    this.state = {
      show: this.props.show,
      value: val,
      data: this._genData(val),
    }
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    confirm: PropTypes.func
  }

  static defaultProps = {
    show: false,
    title: '出生年月',
    val: moment().toDate(),
    min: moment().subtract(100, 'years').toDate(),
    max: moment().toDate()
  }

  render() {
    const {title, confirm, ...others} = this.props
    const opts = {
      title: title,
      confirm: () => {
        const val = this.state.value
        confirm && confirm(moment(`${val[0]}-${val[1]}-${val[2]}`, 'YYYY-MM-DD').toDate().getTime())
      },
      value: this.state.value,
      data: this.state.data
    }
    return (
      <Select show={this.state.show} ref="select" {...opts} {...others}/>
    )
  }

  _genData(stateV) {
    const {min, max} = this.props
    const data = [{
      right: '年',
      values: (() => {
        const values = []
        let minY = moment(min).get('year')
        let maxY = moment(max).get('year')
        for (let i = minY; i <= maxY; i++) {
          values.push(i)
        }
        return values
      })(),
    }, {
      right: '月',
      values: (() => {
        const values = []
        for (let i = 1; i <= 12; i++) {
          values.push(i)
        }
        return values
      })(),
    }, {
      right: '日',
      values: (() => {
        const values = []
        let days = moment(`${stateV[0]}-${stateV[1]}`, 'YYYY-MM').daysInMonth()
        for (let i = 1; i <= days; i++) {
          values.push(i)
        }
        return values
      })(),
    }]
    data.map((d) => {
      d.onChange = (idx, active) => {
        this._genValue(idx, active)
      }
    })

    return data
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    })
  }

}
