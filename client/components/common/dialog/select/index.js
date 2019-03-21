import React, {Component, PropTypes} from 'react'
import ActionSheet from './../ActionSheet'
import Select from './Select'
import {compareValue} from '../../../../util/compare'

export default class Selected extends Component {

  state = {
    show: this.props.show
  }
  static propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    confirm: PropTypes.func,
    data: PropTypes.array
  }

  static defaultProps = {
    title: '',
    value: [],
    data: []
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
    return !compareValue(this.props, nextProps, ['show', ' value', 'data'])
  }

  render() {
    require('swiper/src/less/swiper.less')
    require('../../../../styles/common/dialog/select.less')

    const {title, confirm, onCancel, data, value, parseValue, valueFormat} = this.props
    const {show} = this.state

    return (
      <ActionSheet ref="actionSheet" show={show} title={title} onCancel={() => onCancel && onCancel()}
                   onClick={() => confirm && confirm(this.getValue())}>
        <Select ref="select" data={data} value={value} parseValue={parseValue} valueFormat={valueFormat}/>
      </ActionSheet>
    )
  }

  getValue() {
    const r = this.refs.select.getValue()
    return r
  }

}
