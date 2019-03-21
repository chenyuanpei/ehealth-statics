import React, {Component, PropTypes} from 'react'
import moment from 'moment'

export default class Time extends Component {
  static propTypes = {
    sendTime: PropTypes.number.isRequired
  }

  render() {
    const {sendTime} = this.props

    return (
      <div className="timeBar">
        {moment(sendTime).format('YYYY-MM-DD')}
      </div>
    )
  }
}
