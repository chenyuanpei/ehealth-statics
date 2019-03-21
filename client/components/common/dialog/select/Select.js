import React, {Component, PropTypes} from 'react'

import {RowFlex} from '../../../frozenui/grid'
import Values from './Values'

export default class Select extends Component {
  static propTypes = {
    data: PropTypes.array,
    parseValue: PropTypes.func,
    valueFormat: PropTypes.func,
  }

  static defaultProps = {
    data: []
  }

  constructor(props) {
    super(props)
    this.state = {
      arrValues: []
    }
  }

  componentDidMount() {
    this.setArrValues(this.props, null, false)
    const el = this.refs.selectBox.el
    const height = el.offsetHeight
    el.style.height = height - (height % 5) + 'px'
  }

  componentWillReceiveProps(nextProps) {
    this.setArrValues(nextProps)
  }

  render() {
    const {data} = this.props
    const {arrValues, arrValue} = this.state

    return (
      <RowFlex ref="selectBox" className="selectBox">
        {arrValues.map((values, idx) => (
            <Values key={idx} ref={`value_${idx}`} {...data[idx]} values={values} value={arrValue[idx]}
                    onChange={(v) => this.handleChange(idx, v)}/>
          )
        )}
      </RowFlex>
    )
  }

  async setArrValues(props, arrValue, isInit) {
    if (!arrValue) {
      const {value, parseValue} = props
      arrValue = parseValue ? parseValue(value) : value
    }

    const arrValues = await this.getArrValues(props, arrValue)
    const newState = {
      arrValues,
      arrValue,
    }

    if (isInit) {
      this.state = newState
    } else {
      this.setState(newState)
    }
  }

  async getArrValues(props, arrValue) {
    return await Promise.all(props.data.map(async(d, idx) => {
      if (d.genValues) {
        return await d.genValues(arrValue, idx)
      }
      return d.values
    }))
  }

  async handleChange(idx, val) {
    await this.setArrValues(this.props, this.getArrValue())
  }

  getArrValue() {
    return this.props.data.map((v, idx) => this.refs[`value_${idx}`]).map(value => {
      return value.getValue()
    })
  }

  getValue() {
    const {valueFormat} = this.props
    const arrVal = this.getArrValue()
    return valueFormat ? valueFormat(arrVal) : arrVal
  }

}
