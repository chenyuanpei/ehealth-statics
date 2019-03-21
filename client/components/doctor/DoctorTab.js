import React, {Component, PropTypes} from 'react'

// components
export default class DoctorTab extends Component {

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
          <li className={dateType == 1 ? 'btn_on' : 'btn'}
               onClick={() => changeDateType(1)}>正在关注
          </li>
          <li className={dateType == 2 ? 'btn_on' : 'btn'}
               onClick={() => changeDateType(2)}>曾经关注
          </li>
          {/*<li className={dateType === 'year' ? 'btn_on' : 'btn'}*/}
               {/*onClick={() => changeDateType('year')}>年*/}
          {/*</li>*/}
        </ul>
      </div>
    )
  }
}
