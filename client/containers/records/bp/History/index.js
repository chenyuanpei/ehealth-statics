import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../../util/common'
import PubSub from 'pubsub-js'
// components
import AddBpDate from '../../../../components/record/bp/history/AddBpDate'
import ScrollView from '../../../../components/common/scroll/ScrollView'
import NoData from '../../../../components/common/NoData'
import BpRecords from '../../../../components/record/bp/history/BpRecords'
import Title from '../../../../components/common/title/Title'
import Bp from '../../../../components/home/records/bp/Bp'
import {setWechatTitle} from '../../../../util/common'
import Button from '../../../../components/common/button/Button'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
// // pubsub
import {TOPIC_DELETE_BP_RECORD, TOPIC_PUSH_BP_DETAIL} from '../../../../components/record/bp/history/BpRecord'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  state = {
    showAdd: false
  }

  componentDidMount() {
    let {memberId, loadData} = this.props
    loadData({memberId, pageLoad: true})
    // 关注删除血压计记录事件
    this.delBpRecordToken = PubSub.subscribe(TOPIC_DELETE_BP_RECORD, (topic, {id, date}) => {
      const {delBpRecord} = this.props
      delBpRecord({memberId, recordId: id})
    })
    // 跳转到详情页的链接
    this.pushBpDetailToken = PubSub.subscribe(TOPIC_PUSH_BP_DETAIL, (topic, {id}) => {
      const {push} = this.props
      push(`record/${memberId}/bp/bpdetail/${id}`)
    })
  }

  componentWillUnmount() {
    // 取消关注事件
    PubSub.unsubscribe(this.delBpRecordToken)
    PubSub.unsubscribe(this.pushBpDetailToken)
  }

  show() {
    this.setState({
      showAdd: true
    })
  }

  _addBpRecord(selectValue) {
    const {addBpRecord, memberId} = this.props
    const bpRecord = {
      memberId: memberId,
      measurementDate: new Date().getTime(),
      systolicPressure: selectValue[0],
      diastolicPressure: selectValue[1],
      heartRate: selectValue[2]
    }
    addBpRecord(bpRecord)
    this.setState({showAdd: false})
  }

  _getBpHistory() {
    let {memberId, loadData, bpHistory} = this.props
    loadData({memberId, bpHistory})
  }

  cancelAdd() {
    this.setState({showAdd: false})
  }

  renderContent() {
    let {bpHistory, member} = this.props

    // if (!bpHistory || !bpHistory.size) {
    //   // 没有血压数据记录
    //   return <NoData image={require('../../../../../static/images/noData/icon_no_data.png')} text="未记录血压数据"/>
    // }
    let showDel = member ? member['manager'] : true
    return (
      <BpRecords ref="bpRecords" showDel={showDel} bpHistory={bpHistory}/>
    )
  }
  _pushAddBp() {
    const {push, memberId} = this.props
    push(`record/${memberId}/bp/bpadd`)
  }
  _renderAddRecord() {
    let {member} = this.props
    const {showAdd} = this.state
    let showDel = member ? member['manager'] : false
    if (!member || !showDel) {
      return (
        <noscript/>
      )
    }
    ////<AddBpDate ref="addbpdate" show={showAdd} onCancel={() => this.cancelAdd()}
    //addConfirm={(val) => this._addBpRecord(val)}></AddBpDate>
    return (
      <div>
        <div className="date_add" onClick={() => this._pushAddBp()}>
        </div>

      </div>
    )
  }
  _pushCount() {
       const {push, memberId} = this.props

        push(`record/${memberId}/bp/trend`)
     }
  _closeTips() {
    const {showTips} = this.props
    let storage=window.localStorage
    let thisTime = moment().format('X')
    storage.setItem("thisTime",thisTime)
    showTips(false)
  }
  render() {
    let {member, bpActiveDegree, bpLastRecords,show} = this.props
    const {nickname} = member || {}
    if(nickname){
      setWechatTitle(nickname+'的血压')
    }
    let showDel = member ? member['manager'] : false
    let btnBottomClassName = 'm-bp-bottom'
    if (!member || !showDel) {
      btnBottomClassName = 'm-bp-bottom m-show-last'
    }
    require('../../../../styles/home/records/bp/historyPage.less')
    require('../../../../styles/record/record.less')
    return (
      <div className="bp_new_history_page">
        <div className="m-device-bind-tips" onClick={()=>this.props.push('device')} style={{display:show?'block':'none'}}>
          您还没有绑定血压计，点击马上去绑定吧！
        </div>
        <div className="m-close" style={{display:show?'block':'none'}} onClick={()=>{this._closeTips()}}>+</div>
        <ScrollView onScrollEnd={() => this._getBpHistory()}>
          <div className="bp_history" ref="view">
            {/*<div className="m-icon-count" onClick={()=> this._pushCount()}></div>*/}
            <div className="m-history-top-text">最近7次</div>
            {/* 血压 */}
            <Bp {...{
              activeDegree: bpActiveDegree,
              values: bpLastRecords,
            }}/>
            {this.renderContent()}
          </div>
        </ScrollView>
        {/*{this._renderAddRecord()}*/}
        {
           <div className={btnBottomClassName}>
            <Button className="m-bp-btn" onClick={() => this._pushAddBp()}>
              <img className="btnImg" src={require('../../../../../static/images/record/bs/icon_bloodsugar_record.png')} alt=""/>记录数据
            </Button>
            <Button className="m-bp-btn" onClick={()=> this._pushCount()}>
              <img className="btnImg" src={require('../../../../../static/images/record/bs/icon_bloodsugar_statistics.png')} alt=""/>趋势统计
            </Button>
          </div>
        }
      </div>
    )
  }
})

