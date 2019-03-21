import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'

// components
import Msg from './Msg'

import {measureActivity} from '../../../config'

export default class MeasureActivity extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleClick() {
    window.location.href = measureActivity.url
  }

  render() {
    if (!measureActivity || !measureActivity.start || !measureActivity.end || !measureActivity.url) {
      return <noscript/>
    }
    // 判断是否在活动时间内
    const start = moment(measureActivity.start, 'YYYY-MM-DD')
    const end = moment(measureActivity.start, 'YYYY-MM-DD')
    const now = moment()
    if (now.isBefore(start, 'day') || now.isAfter(end, 'day')) {
      return <noscript/>
    }

    require('../../../styles/home/msg/measureActivity.less')
    return (
      <Msg className="measureActivityMsg" onClick={() => this.handleClick()}
           multiline
           icon={require('../../../../static/images/icon_activity.png')}>
        <span>{'天天测量领大奖，戳这刮取吧！'}</span>
      </Msg>
    )
  }

}
