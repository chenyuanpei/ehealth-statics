import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import classnames from 'classnames'
// util
import {weekFirstAndEnd} from '../../../../util/date'
// components
import Avatar from '../../../common/Avatar/Avatar'

export default class extends Component {

  static propTypes = {
    member: PropTypes.object,
    report: PropTypes.object,
  }

  static defaultProps = {
    member: {},
    report: {},
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {
      member: {headImgurl, remark, nickname, name},
      report: {year, week, weekDays, trendDescribe, rateLevel, lowBpNum, normalBpNum, normalHighBpNum, highBpNum, rateDescribe}
    } = this.props

    // 日期
    // const [weekFirst = '', weekEnd = ''] = weekFirstAndEnd({
    //   year,
    //   week,
    //   format: 'MM.DD',
    // })
    const [weekFirst = '', weekEnd = ''] = [weekDays.split(',')[0],weekDays.split(',')[6]]

    // 共测量次数
    const total = lowBpNum + normalBpNum + normalHighBpNum + highBpNum
    // 每天平均测量次数
    const avg = Math.round(total / 7)
    let avgText = '约每天测量' + avg + '次'
    if (total / 7 < 1) {
      avgText = '每天测量小于1次'
    }

    return (
      <div className={classnames('block', 'topBox')}>
        <div className="headimgBox">
          <Avatar src={headImgurl}></Avatar>
        </div>
        <div className="topBg">
          <div className="nameText">{remark || nickname || name}</div>
          <div className="timeText">{weekFirst}-{weekEnd}</div>
          <div className="statusText">{trendDescribe}</div>
        </div>
        <div className="lineTitle"><span>{'本周测量频率'}</span></div>
        <div className="frequencyStatus">{rateLevel}</div>
        <div className="contentText">本周一共测量{total}次，{avgText}，{rateDescribe}</div>
      </div>
    )
  }
}
