import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import PubSub from 'pubsub-js'
// util
import {debug} from '../../../../util/common'
// compoments
import Title from '../../../../components/common/title/Title'
import Button from '../../../../components/common/button/Button'
import BsTableTop from '../../../../components/record/bs/bsTable/BsTableTop'
import BsTable from '../../../../components/record/bs/bsTable/BsTable'
import ScrollView from '../../../../components/common/scroll/ScrollView'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
// const
const INIT_DATE_TYPE = 'month'
// pubsub
import {TOPIC_BS_DETAIL_CLICK} from '../../../../components/record/topic'
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
    // 点击去向详情页的链接
    this.bsDetailToken = PubSub.subscribe(TOPIC_BS_DETAIL_CLICK, (topic, data) => {
      // push('member/create')_goUrl(`record/${memberId}/bs/bsdetail/${value.id}`)
      this.props.push(`record/${memberId}/bs/bsdetail/${data}`)
    })
  }
  componentWillUnmount() {
    const {noMoreDataSend} = this.props
    noMoreDataSend(false)
    // 取消关注事件
    PubSub.unsubscribe(this.bsDetailToken)
  }
  // changeDate(action) {
  //   const {memberId, selectDate, selectedDate} = this.props
  //   selectDate({
  //     ...selectedDate,
  //     memberId,
  //     action
  //   })
  // }
  _renderTable() {
    let {roundRecord, selectedDate, noMoreDataShow} = this.props
    const {startDate, endDate} = selectedDate || {}
    // 以坐标为key，
    let valuesObj = []
    if(endDate){
      let valueIndex = 0
      let valueInDay = 0
      roundRecord && roundRecord.forEach((value, index) => {
        if(index === 0){
          valueInDay = value.measurementDate
        }
        if(!moment(valueInDay).isSame(value.measurementDate, 'day')){
          valueIndex ++
          valueInDay = value.measurementDate
        }
        if(!valuesObj[valueIndex]){
          valuesObj[valueIndex] = []
          for (let i = 0; i < 7; i++) {
            valuesObj[valueIndex][i] = {'measurementDate': value.measurementDate}
          }
        }

        valuesObj[valueIndex][value.mealPeroid] = value
      })
    }
    let noMoreDataClassName = ''
    if(noMoreDataShow){
      noMoreDataClassName = 'm-show'
    }
    return (
      <div className="trend_table_body">
        <BsTable bsData={valuesObj}></BsTable>
        <div className={`m-no-more-data-text ${noMoreDataClassName}`}>无更多数据</div>
      </div>
    )
  }
  _getBsTableData() {
    let {memberId, loadData,selectedDate, roundRecord, noMoreDataShow} = this.props
    if(!noMoreDataShow){
      loadData({memberId,...selectedDate, roundRecord})
    }

  }
  _closeTips() {
    const {showTips} = this.props
    let storage=window.localStorage
    let thisTime = moment().format('X')
    storage.setItem("thisTimeBs",thisTime)
    showTips(false)
  }
  render() {
    const {show} = this.props
    require('../../../../styles/record/bsTable.less')
    require('../../../../styles/record/bsRecord.less')
    const {
      memberId,
      roundRecord,
      member,
    } = this.props
    let showDel = member ? member['manager'] : false
    let btnBottomClassName = 'm-bs-table-bottom'
    if (!member || !showDel) {
      btnBottomClassName = 'm-bs-table-bottom m-show-last'
    }
    return (
        <div className="trend_body_table">
          <Title title='血糖表格'/>
          <div className="m-device-bind-tips" onClick={()=>this.props.push('device')} style={{display:show?'block':'none'}}>
            您还没有绑定血糖仪，点击马上去绑定吧！
          </div>
          <div className="m-close" style={{display:show?'block':'none'}} onClick={()=>{this._closeTips()}}>+</div>
              {roundRecord && <BsTableTop></BsTableTop>}
          <div className="m-scroll-wrap">
            <ScrollView onScrollEnd={() => this._getBsTableData()}>
                {this._renderTable()}
            </ScrollView>
          </div>
          {
            roundRecord && <div className={btnBottomClassName}>
              <Button className="m-bs-table-btn" onClick={() => {this._goUrl(`record/${memberId}/bs/bsadd`)}}>
                <img className="btnImg" src={require('../../../../../static/images/record/bs/icon_bloodsugar_record.png')} alt=""/>记录数据
              </Button>
              <Button className="m-bs-table-btn" onClick={() => {this._goUrl(`record/${memberId}/bs/trend`)}}>
                <img className="btnImg" src={require('../../../../../static/images/record/bs/icon_bloodsugar_statistics.png')} alt=""/>趋势统计
              </Button>
            </div>
          }

        </div>
    )
  }
  _goUrl(url) {
    this.props.push(url)
  }
})
