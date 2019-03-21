import React, {Component, PropTypes} from 'react'
import PubSub from 'pubsub-js'

export const TOPIC_CLICK_UNREAD_RECORD = 'TOPIC_CLICK_UNREAD_RECORD'

import Msg from './Msg'

export default class Chat extends Component {

  static propTypes = {
    doctor: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    count: PropTypes.number,
    lastMsg: PropTypes.object
  }

  static defaultProps = {
    count: 0,
    lastMsg: {}
  }

  handleClick() {
    const {doctor: {id: doctorId}} = this.props
    PubSub.publish(TOPIC_CLICK_UNREAD_RECORD, {
      doctorId
    })
  }

  render() {
    require('../../../styles/home/msg/chat.less')

    const {count} = this.props

    return (
      <Msg className="chatMsg" onClick={() => this.handleClick()}>
                <span>
                    医生消息
                </span>
        {count > 0 && <span className="msgCount">{count > 99 ? '99+' : count}</span>}
      </Msg>
    )
  }

}
