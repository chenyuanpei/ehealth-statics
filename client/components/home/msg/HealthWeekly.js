import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import PubSub from 'pubsub-js'

// utils
import {compareValue} from '../../../util/compare'

import Msg from './Msg'

export const TOPIC_CLICK_HEALTH_WEEKLY = 'TOPIC_CLICK_HEALTH_WEEKLY'

export default class HealthWeekly extends Component {

  static propTypes = {
    nickname: PropTypes.string,
    leastReport: PropTypes.object,
  }

  static defaultProps = {
    leastReport: {}
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!compareValue(this.props, nextProps, ['nickname'])) {
      return true
    }

    if (!compareValue(this.props.leastReport, nextProps.leastReport, ['week', 'year', 'month', 'day'])) {
      return true
    }
    return false
  }

  handleClick() {
    const {leastReport: {id, memberId}} = this.props
    PubSub.publish(TOPIC_CLICK_HEALTH_WEEKLY, {
      memberId,
      id
    })
  }

  render() {
    const {nickname, leastReport: {week, year, month, day}} = this.props
    let endDate = moment().set({'year': year, 'month': month - 1, 'date': day})
    let startDate = moment(endDate).subtract(6, 'days')
    let dateStr = moment(startDate).format('MM月DD日') + '～' + moment(endDate).format('MM月DD日')
    return (
      <Msg onClick={() => this.handleClick()}>
        <span >{`${nickname}的健康报告(${dateStr})`}</span>
      </Msg>
    )
  }

}
