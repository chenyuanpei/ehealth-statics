import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {debug} from '../../../util/common'

// components
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(
  class extends Component {

    constructor(props) {
      super(props)

      const m = moment()

      this.state = {
        memberId: '',
        sp: 120,
        dp: 90,
        hr: 60,
        year: m.get('year'),
        month: m.get('month'),
        date: m.get('date'),
        hour: m.get('hour'),
        minute: m.get('minute'),
        second: m.get('second'),
      }
    }

    componentDidMount() {
      const {init} = this.props

      init()
      //   .then(() => {
      //   const {members} = this.props
      //   this.setState({
      //     memberId: members[0].id
      //   })
      // })
    }

    componentWillReceiveProps(nextProps) {
      const {members} = nextProps
      if (!members || !members.size) {
        return
      }
      this.setState({
        memberId: members.first().id
      })
    }

    changeValue(key, value) {
      console.log('changeValue', key, value)
      this.setState({
        [key]: value
      })
    }

    submit() {
      const {submit} = this.props
      const {memberId, sp, dp, hr, year, month, date, hour, minute, second} = this.state

      const measurementDate = moment().set({year, month, date, hour, minute, second}).valueOf()

      submit({
        memberId,
        systolicPressure: sp,
        diastolicPressure: dp,
        heartRate: hr,
        measurementDate,
      })
    }

    generateReport() {
      const {generateReport} = this.props
      const {memberId} = this.state

      generateReport(memberId)
    }

    render() {
      require('../../../styles/temp/inputBpRecord.less')

      const {
        props: {members},
        state: {memberId, sp, dp, hr, year, month, date, hour, minute, second}
      } = this

      return (
        <div id="inputBpRecord">
          <Title title='录入数据'></Title>
          <div>
            <label>成员:</label>
            <select value={memberId} onChange={({target: {value}}) => this.changeValue('memberId', value)}>
              {members && members.map(member => (
                <option key={member.id} value={member.id}>{member.nickname || member.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>高压:</label>
            <input type="number" value={sp} onChange={({target: {value}}) => this.changeValue('sp', value)}/>
          </div>
          <div>
            <label>低压:</label>
            <input type="number" value={dp} onChange={({target: {value}}) => this.changeValue('dp', value)}/>
          </div>
          <div>
            <label>心率:</label>
            <input type="number" value={hr} onChange={({target: {value}}) => this.changeValue('hr', value)}/>
          </div>
          <div className="measuringDate-box">
            <label>时间:</label>
            <input type="number" value={year} onChange={({target: {value}}) => this.changeValue('year', value)}/>
            <span>年</span>
            <input type="number" value={month + 1}
                   onChange={({target: {value}}) => this.changeValue('month', value - 1)}/>
            <span>月</span>
            <input type="number" value={date} onChange={({target: {value}}) => this.changeValue('date', value)}/>
            <span>日</span>
            <input type="number" value={hour} onChange={({target: {value}}) => this.changeValue('hour', value)}/>
            <span>:</span>
            <input type="number" value={minute} onChange={({target: {value}}) => this.changeValue('minute', value)}/>
            <span>:</span>
            <input type="number" value={second} onChange={({target: {value}}) => this.changeValue('second', value)}/>
          </div>
          <div>
            <button onClick={() => this.submit()}>添加血压</button>
          </div>
          <div>
            <button onClick={() => this.generateReport()}>生成周报</button>
          </div>
        </div>
      )
    }
  })

