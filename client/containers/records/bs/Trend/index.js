import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import PubSub from 'pubsub-js'
// util
import {debug} from '../../../../util/common'
// compoments
import {ButtonArea} from 'react-weui'
import BsInfo from '../../../../components/record/bs/trend/BsInfo'
import DateSelect from '../../../../components/record/DateSelect'
import LineChartBs from '../../../../components/record/LineChartBs'
import BsMeasureInfo from '../../../../components/record/bs/trend/bsMeasureInfo'
import ScrollView from '../../../../components/common/scroll/ScrollView'
import DateTypeBs from '../../../../components/record/DateTypeBs'
import Title from '../../../../components/common/title/Title'
import BsRecords from '../../../../components/record/bs/history/BsRecords'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
// const
const INIT_DATE_TYPE = 'week'
import {TOPIC_PUSH_BS_DETAIL} from '../../../../components/record/bs/history/BsRecord'
export default connect(
  debug(selectors),
  actions
)(class extends Component {
  state = {
    mealPeroid: 0
  }
  componentDidMount() {
    const {selectDate, memberId} = this.props
    selectDate({
      memberId,
      dateType: INIT_DATE_TYPE,
      mealPeroid: 0
    })
    // 跳转到详情页的链接
    this.pushBsDetailToken = PubSub.subscribe(TOPIC_PUSH_BS_DETAIL, (topic, {id}) => {
      const {push} = this.props
      push(`record/${memberId}/bs/bsdetail/${id}`)
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.pushBsDetailToken)
  }
  changeDateType(str) {
    const {selectDate, memberId, selectedDate,loadHistoryData} = this.props
    selectDate({
      ...selectedDate,
      memberId,
      dateType: str
    })
    loadHistoryData({
      ...selectedDate,
      memberId,
      ...bsHistory,
      mealPeroid: this.state.mealPeroid
    })
  }
  changeMealPeroid(val) {
    const {selectDate, memberId, selectedDate,bsHistory,loadHistoryData} = this.props
    this.setState({ mealPeroid:val})
    selectDate({
      ...selectedDate,
      memberId,
      mealPeroid: val
    })
    loadHistoryData({
      ...selectedDate,
      memberId,
      ...bsHistory,
      mealPeroid: val
    })
  }
  changeDate(action) {
    const {memberId, selectDate, selectedDate,bsHistory,loadHistoryData} = this.props
    selectDate({
      ...selectedDate,
      memberId,
      action
    })
    loadHistoryData({
      memberId,
      ...selectedDate,
      ...bsHistory,
      mealPeroid: this.state.mealPeroid
    })
  }
  _getBsHistory() {
    let {memberId, loadHistoryData, bsHistory, selectedDate} = this.props
    loadHistoryData({memberId, ...selectedDate, bsHistory,scrollHistory:true})
  }
  renderContent() {
    let {bsHistory,selectedDate, member} = this.props
    const {dateType = INIT_DATE_TYPE} = selectedDate || {}
    // if (!bpHistory || !bpHistory.size) {
    //   // 没有血压数据记录
    //   return <NoData image={require('../../../../../static/images/noData/icon_no_data.png')} text="未记录血压数据"/>
    // }
    let showDel = member ? member['manager'] : true
    return (
      <BsRecords ref="bsRecords" dateType={dateType} showDel={showDel} bsHistory={bsHistory}/>
    )
  }
  renderChart() {
    let {bsRoundRecords, selectedDate} = this.props
    const {dateType = INIT_DATE_TYPE, startDate, endDate} = selectedDate || {}

    let dateFormat = ''
    let addStr
    if (dateType === 'week') {
      dateFormat = 'e'
      addStr = 'days'
    } else if (dateType === 'month') {
      dateFormat = 'M-D'
      addStr = 'days'
    } else if (dateType === 'year') {
      dateFormat = 'M'
      addStr = 'months'
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
    bsRoundRecords && bsRoundRecords.forEach((value, index) => {
      if (!value.glucoseConcentration || !value.glucoseConcentration) {
        return
      }
      valuesObj[moment(value.measurementDate).format(dateFormat)] = value
    })

    let sp = []
    let bsObj = []
    xValues.forEach((xVal, index) => {
      const value = valuesObj[xVal] || {}
      sp[index] = value.glucoseConcentration
      bsObj[index] = value
    })

    if (dateType === 'week') {
      xValues = ['一', '二', '三', '四', '五', '六', '日']
    }else if(dateType === 'year'){
      xValues = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
    }
    const options = {
      yAxis: {
        max: 33.3,
        min: 1.1,
        defMax: 10.0,
        defMin: 4.4,
        minScale: 0.1,
      },
      xAxis: {
        values: xValues,
        type:dateType,
      },
      scroll: false,
      noDataTip: `本${{week: '周', month: "月", year: '年'}[dateType]}无数据，请保持持续记录`,
    }
    options.values = [
      {
        name: '血糖',
        values: sp
      }
    ]
    options.datas = [
      {
        name:'血糖',
        values : bsObj,
      }
    ]
    // // 如果选择查看月份
    // if (dateType === 'month') {
    //   const m = moment()
    //   // 本月
    //   if (moment(startDate).get('month') === m.get('month')) {
    //     // 当天大于7日
    //     if (m.get('date') > 7) {
    //       options.initOffsetX = m.subtract(7, 'days').get('date')
    //     }
    //   }
    // }

    return (<LineChartBs {...options}/>)
  }
  _renderBottomText(lastDay) {
    return (
      <div className="m-month-bottom-text">
        <div className="m-first-day">{'1'}</div>
        <div className="m-mid-day">{'15'}</div>
        <div className="m-last-day">{lastDay}</div>
      </div>
    )
  }
  render() {
    require('../../../../styles/record/trend.less')
    require('../../../../styles/record/bsRecord.less')
    const {
      bsActiveDegree = {},
      // bsAverageRecord,
      // bsHighestRecord,
      // bsLowestRecord,
      selectedDate
    } = this.props

    const {dateType = INIT_DATE_TYPE, startDate, endDate} = selectedDate || {}
    const {mealPeroid} = this.state
    let lastDay = ''
    if (dateType === 'month'){
      lastDay = moment(endDate).format('D')
    }
    // const {total = 0, normalMeasuringTimes = 0, abnormalMeasuringTimes = 0} = activeDegree || {}
    return (
      <div className="bs_trend_body">
        <Title title='血糖统计' />
        <ScrollView onScrollEnd={() => this._getBsHistory()}>
          <div className="trend_top">
            <div className="trend_chart">
              <div className="m-meal-peroid">
                  <ul>
                    <li className={mealPeroid===6 ? 'color-mealPeroid-active' : ''} onClick={() => this.changeMealPeroid(6)}><span>睡前</span></li>
                    <li className={mealPeroid===11 ? 'color-mealPeroid-active' : ''} onClick={() => this.changeMealPeroid(11)}><span>凌晨</span></li>
                    <li className={mealPeroid===0 ? 'color-mealPeroid-active' : ''} onClick={() => this.changeMealPeroid(0)}><span>空腹</span></li>
                    <li className={mealPeroid===12 ? 'color-mealPeroid-active' : ''} onClick={() => this.changeMealPeroid(12)}><span>餐前</span></li>
                    <li className={mealPeroid===13 ? 'color-mealPeroid-active' : ''} onClick={() => this.changeMealPeroid(13)}><span>餐后</span></li>
                    <li className={mealPeroid===14 ? 'color-mealPeroid-active' : ''} onClick={() => this.changeMealPeroid(14)}><span>运动前</span></li>
                    <li className={mealPeroid===15 ? 'color-mealPeroid-active' : ''} onClick={() => this.changeMealPeroid(15)}><span>运动后</span></li>
                  </ul>
              </div>
              <DateSelect ref="date_box" confirm={(action) => this.changeDate(action)}
                          startDate={startDate} endDate={endDate}
                          dateType={dateType}></DateSelect>

              <BsMeasureInfo className="trend_bp_info" {...bsActiveDegree}></BsMeasureInfo>
              <div className="trend_chart_bp">
                {this.renderChart()}
                {dateType === 'month' && this._renderBottomText(lastDay)}
              </div>
            </div>
            {/*<div className="trend_record">*/}
              {/*<BsInfo title={'平均'} bsHrData={bsAverageRecord}></BsInfo>*/}
              {/*<BsInfo title={'最高'} bsHrData={bsHighestRecord}></BsInfo>*/}
              {/*<BsInfo title={'最低'} bsHrData={bsLowestRecord}></BsInfo>*/}
            {/*</div>*/}
            {this.renderContent()}
          </div>
        </ScrollView>
        <div className="date_button">
          <DateTypeBs dateType={dateType} changeDateType={(v) => this.changeDateType(v)}/>
        </div>
      </div>
    )
  }
})
