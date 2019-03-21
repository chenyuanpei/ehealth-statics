import React, {Component, PropTypes} from 'react'
import moment from 'moment'

export default class Time extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    const {time} = this.props
    let format
    if (moment().isAfter(time, 'day')) {
      format = 'MM月DD日 HH:mm'
    } else {
      format = 'HH:mm'
    }
    return (
      <div className="mbTime"><span>{moment(time).format(format)}</span></div>
    )
  }
}
