import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

// util
import {debug} from '../../../../util/common'
// compoments
import BpInfo from '../../../../components/record/bp/trend/BpInfo'
import DateSelect from '../../../../components/record/DateSelect'
import LineChart from '../../../../components/record/LineChart'
import BpMeasureInfo from '../../../../components/record/bp/trend/bpMeasureInfo'
import ScrollView from '../../../../components/common/scroll/ScrollView'
import DateType from '../../../../components/record/DateType'
import Title from '../../../../components/common/title/Title'

// actions
import actions from './actions'
// selector
import selectors from './selectors'
// const
const INIT_DATE_TYPE = 'day'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    const {selectDate, memberId} = this.props
    selectDate({
      memberId,
      dateType: INIT_DATE_TYPE,
      init: true,
    })
  }

  changeDateType(str) {
    const {selectDate, memberId, selectedDate} = this.props
    selectDate({
      ...selectedDate,
      memberId,
      dateType: str
    })
  }

  changeDate(action) {
    const {memberId, selectDate, selectedDate} = this.props
    selectDate({
      ...selectedDate,
      memberId,
      action
    })
  }

  renderChart() {
    let {roundRecord, selectedDate} = this.props
    const {dateType = INIT_DATE_TYPE, startDate, endDate} = selectedDate || {}

    let dateFormat = ''
    let addStr
    if (dateType === 'week') {
      dateFormat = 'E'
      addStr = 'days'
    } else if (dateType === 'month') {
      dateFormat = 'M-D'
      addStr = 'days'
    } else if (dateType === 'day') {
      dateFormat = 'H'
      addStr = 'hours'
    }
    //  ---------坐标
    let xValues = []
    let date = moment(startDate)
    const endMoment = moment(endDate)
    // 坐标数组
    while (date.isBefore(endMoment, addStr) || date.isSame(endMoment, addStr)) {
      xValues.push(date.format(dateFormat))
      date = date.add(1, addStr)
    }
    // 以坐标为key，
    const valuesObj = {}
    roundRecord && roundRecord.forEach((value, index) => {
      if (!value.systolicPressure || !value.diastolicPressure) {
        return
      }
      if(dateType === 'day'){
        valuesObj[value.hour] = value
      }else {
        valuesObj[moment(value.measurementDate).format(dateFormat)] = value
      }
    })

    let sp = []
    let dp = []
    let datas = []
    xValues.forEach((xVal, index) => {
      const value = valuesObj[xVal] || {}
      sp[index] = value.systolicPressure
      dp[index] = value.diastolicPressure
      datas[index] = value
    })

    if (dateType === 'week') {
      xValues = ['一', '二', '三', '四', '五', '六', '日']
    }

    const options = {
      yAxis: {
        max: 250,
        min: 0,
        defMax: 120,
        defMin: 60,
        minScale: 10
      },
      xAxis: {
        values: xValues,
        type: dateType
      },
      scroll: false,
      noDataTip: `${{week: '本周', month: "本月", day: '今天'}[dateType]}无数据，请保持持续记录`,
    }
    options.values = [
      {
        name: '高压',
        values: sp
      },
      {
        name: '低压',
        values: dp
      }
    ]
    options.datas = [
      {
        name:'',
        values:datas
      }
    ]
    // 如果选择查看月份
    //if (dateType === 'month') {
    //  const m = moment()
    //  // 本月
    //  if (moment(startDate).get('month') === m.get('month')) {
    //    // 当天大于7日
    //    if (m.get('date') > 7) {
    //      options.initOffsetX = m.subtract(7, 'days').get('date')
    //    }
    //  }
    //}

    return (<LineChart {...options}/>)
  }
  _renderBottomText(type,lastDay) {
    return (
      <div className="m-month-bottom-text">
        <div className="m-first-day">{type === 'month' ? '1' : '00:00'}</div>
        <div className="m-mid-day">{type === 'month' ? '15' : '12:00'}</div>
        <div className="m-last-day">{type === 'month' ? lastDay : '23:59'}</div>
      </div>
    )
  }
  render() {
    require('../../../../styles/home/records/bp/trend.less')

    const {
      activeDegree = {},
      averageRecord,
      highestRecord,
      lowestRecord,
      selectedDate
    } = this.props

    const {dateType = INIT_DATE_TYPE, startDate, endDate} = selectedDate || {}
    // const {total = 0, normalMeasuringTimes = 0, abnormalMeasuringTimes = 0} = activeDegree || {}
    let lastDay = ''
    if (dateType === 'month'){
      lastDay = moment(endDate).format('D')
    }
    return (
      <div className="trend_body">
        <Title title='血压统计'/>
        <ScrollView>
          <div className="trend_top">
            <div className="trend_chart">
              <DateSelect ref="date_box" confirm={(action) => this.changeDate(action)}
                          startDate={startDate} endDate={endDate}
                          dateType={dateType}></DateSelect>
              <BpMeasureInfo className="trend_bp_info" {...activeDegree}></BpMeasureInfo>
              <div className="trend_chart_bp">
                {this.renderChart()}
                {dateType === 'month' && this._renderBottomText('month',lastDay)}
                {dateType === 'day' && this._renderBottomText('day')}
              </div>
            </div>
            <div className="trend_record">
              <BpInfo title={'平均'} bpHrData={averageRecord}></BpInfo>
              {(highestRecord && highestRecord.id !=null) && <BpInfo title={'高压最高'} bpHrData={highestRecord}></BpInfo>}
              {(lowestRecord && lowestRecord.id !=null) && <BpInfo title={'低压最高'} bpHrData={lowestRecord}></BpInfo>}
            </div>
          </div>
        </ScrollView>
        <div className="date_button">
          <DateType dateType={dateType} changeDateType={(v) => this.changeDateType(v)}/>
        </div>
      </div>
    )
  }
})
