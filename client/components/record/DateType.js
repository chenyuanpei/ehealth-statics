import React, {Component, PropTypes} from 'react'

// components
export default class DateType extends Component {

  static propTypes = {
    dateType: PropTypes.string,
    changeDateType: PropTypes.func
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {dateType} = this.props
    const {dateType: nextDateType} = nextProps

    return dateType !== nextDateType
  }

  render() {
    const {dateType, changeDateType} = this.props

    return (
      <div className="date_button_area clear">
        <ul>
          <li className={dateType === 'day' ? 'btn_on' : 'btn'}
               onClick={() => changeDateType('day')}>日
          </li>
          <li className={dateType === 'week' ? 'btn_on' : 'btn'}
               onClick={() => changeDateType('week')}>周
          </li>
          <li className={dateType === 'month' ? 'btn_on' : 'btn'}
               onClick={() => changeDateType('month')}>月
          </li>
        </ul>

      </div>
    )
  }
}
