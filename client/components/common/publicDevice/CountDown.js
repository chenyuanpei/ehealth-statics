import React, {Component, PropTypes} from 'react'
export default class CountDown extends Component {
    static propTypes = {
      RemainingTime:PropTypes.string,
      className: PropTypes.string,
      days: PropTypes.objectOf(PropTypes.string),
      hours: PropTypes.string,
      mins: PropTypes.string,
      segs: PropTypes.string,
      onEnd: PropTypes.func,
    }
    static defaultProps = {
      date: Date.parse(new Date()),
      className: 'CountDown',
      days: {
        plural: 'Days',
        singular: 'Day',
      },
      hours: 'Hours',
      mins: 'Min',
      segs: 'Seg',
      onEnd: () => {},

    }
    state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }
    componentDidMount() {
      let endDate = Date.parse(new Date()) + parseInt(this.props.RemainingTime)
      this.interval = setInterval(()=> {
        const date = this.getDateData(endDate)
        if (date) {
          this.setState(date)
        } else {
          this.stop()
          this.props.onEnd()
        }
      }, 1000)
    }
    componentWillMount() {
      let endDate = this.props.date + parseInt(this.props.RemainingTime)
      const date = this.getDateData(endDate)
      if (date) {
        this.setState(date)
      }

    }
    componentWillUnmount() {
      this.stop()
    }
    getDateData(endDate) {
      let diff = (endDate - Date.parse(new Date())) / 1000
      if (diff <= 0) {
        return false
      }

      const timeLeft = {
        years: 0,
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
        millisec: 0,
      }
      if (diff >= (365.25 * 86400)) {
        console.log(9999234324)
        timeLeft.years = Math.floor(diff / (365.25 * 86400))
        diff -= timeLeft.years * 365.25 * 86400
      }
      if (diff >= 86400) {
        timeLeft.days = Math.floor(diff / 86400)
        diff -= timeLeft.days * 86400
      }
      if (diff >= 3600) {
        timeLeft.hours = Math.floor(diff / 3600)
        diff -= timeLeft.hours * 3600
      }
      if (diff >= 60) {
        timeLeft.min = Math.floor(diff / 60)
        diff -= timeLeft.min * 60
      }
      timeLeft.sec = Math.floor(diff)
      return timeLeft
    }
    render() {
      require('../../../styles/countdown/countdown.less')
      const countDown = this.state
      let days
      if (countDown.days === 1) {
        days = this.props.days.singular
      } else {
        days = this.props.days.plural
      }
      return (
        <div className={this.props.className}>
          {(countDown.days > 0) &&
          <div className={`${this.props.className}-col is-day`}>
            <p>{this.leadingZeros(countDown.days)}<span>{days}</span></p>
          </div>
          }
          {(countDown.hours > 0) &&
          <div className={`${this.props.className}-col is-hour`}>
            <p>{this.leadingZeros(countDown.hours)}<span>{this.props.hours}</span></p>
          </div>
          }

          <div className={`${this.props.className}-col is-min`}>
            <p>{this.leadingZeros(countDown.min)}<span>{this.props.mins}</span></p>
          </div>
          <div className={`${this.props.className}-col is-seg`}>
            <p>{this.leadingZeros(countDown.sec)}<span>{this.props.segs}</span></p>
          </div>
        </div>
      )
    }
    stop() {
      clearInterval(this.interval)
    }
    leadingZeros(num, length = null) {

      let length_ = length
      let num_ = num
      if (length_ === null) {
        length_ = 2
      }
      num_ = String(num_)
      while (num_.length < length_) {
        num_ = '0' + num_
      }
      return num_
    }
}


