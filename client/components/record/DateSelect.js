import React, {Component, PropTypes} from 'react'
import moment from 'moment'

export default class DateSelect extends Component {

  static propTypes = {
    confirm: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    dateType: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    // dateType
    if (this.props.dateType !== nextProps.dateType) {
      return true
    }
    // startDate
    if (this.props.startDate !== nextProps.startDate) {
      return true
    }
    // endDate
    if (this.props.endDate !== nextProps.endDate) {
      return true
    }
    return false
  }

  // 上一段时间
  lastDate() {
    return this.setDate(-1)
  }

  // 下一段时间
  nextDate() {
    return this.setDate(1)
  }

  // 设置时间
  setDate(action) {
    const {confirm} = this.props

    confirm && confirm(action)
  }

  getText() {
    const {startDate, endDate, dateType} = this.props
    if (!startDate || !endDate || !dateType) {
      return ''
    }
    let str = ''
    if (moment(new Date()).isBetween(startDate, endDate)) {
      if (dateType === 'week') {
        str = '本周'
      } else if (dateType === 'month') {
        str = '本月'
      }else if (dateType === 'year') {
        str = '本年'
      } else {
        str = '今天'
      }
    } else {
      if (dateType === 'week') {
        let datePreWeek = moment().add('days',-7)
        if(datePreWeek.isBetween(startDate, endDate)){
          str = '上周'
        }else {
          str = moment(startDate).format('M月D日') + '～' + moment(endDate).format('M月D日')
        }
      } else if (dateType === 'month') {
        let datePreMonth = moment().add('months',-1)
        if(datePreMonth.isBetween(startDate,endDate)){
          str = '上月'
        }else {
          if (moment(startDate).isSame(new Date(), 'year')) {
            str = moment(startDate).format('M月')
          } else {
            str = moment(startDate).format('YYYY年M月')
          }
        }
      } else if (dateType === 'year') {
        let datePreMonth = moment().add('years',-1)
        if(datePreMonth.isBetween(startDate,endDate)){
          str = '去年'
        }else {

          str = moment(startDate).format('YYYY年')

        }
      }else {
        let datePreDay = moment().add('days',-1)
        if(datePreDay.isBetween(startDate,endDate)){
          str = '昨天'
        }else {
          str = moment(startDate).format('M月D日')
        }
      }
    }
    return str
  }

  render() {
    const {endDate} = this.props
    require('../../styles/home/records/common/datebox.less')

    const nextBtn = !endDate || moment(new Date()).isBefore(endDate) ? 'p' : 'n'

    return (
      <div className="trend_date">
        <span onClick={() => this.lastDate()}/>
        <label>{this.getText()}</label>
        <span className={`img_${nextBtn}`} onClick={() => this.nextDate()}/>
      </div>

    )
  }
}
