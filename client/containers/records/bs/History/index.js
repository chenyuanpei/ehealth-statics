import React, {Component} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../../util/common'
import PubSub from 'pubsub-js'
// components
import AddBpDate from '../../../../components/record/bp/history/AddBpDate'
import ScrollView from '../../../../components/common/scroll/ScrollView'
import NoData from '../../../../components/common/NoData'
import BsRecords from '../../../../components/record/bs/history/BsRecords'
import Title from '../../../../components/common/title/Title'
import Bs from '../../../../components/home/records/bs/Bs'
import {setWechatTitle} from '../../../../util/common'
import Button from '../../../../components/common/button/Button'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
// // pubsub
import {TOPIC_DELETE_BP_RECORD, TOPIC_PUSH_BS_DETAIL} from '../../../../components/record/bs/history/BsRecord'

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

    // 跳转到详情页的链接
    this.pushBsDetailToken = PubSub.subscribe(TOPIC_PUSH_BS_DETAIL, (topic, {id}) => {
      const {push} = this.props
      push(`record/${memberId}/bs/bsdetail/${id}`)
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pushBsDetailToken)
  }

  show() {
    this.setState({
      showAdd: true
    })
  }



  _getBpHistory() {
    let {memberId, loadData, bsHistory} = this.props
    loadData({memberId, bsHistory})
  }

  cancelAdd() {
    this.setState({showAdd: false})
  }

  renderContent() {
    let {bsHistory, member} = this.props
    // if (!bpHistory || !bpHistory.size) {
    //   // 没有血压数据记录
    //   return <NoData image={require('../../../../../static/images/noData/icon_no_data.png')} text="未记录血压数据"/>
    // }
    let showDel = member ? member['manager'] : true
    return (
      <BsRecords ref="bsRecords" showDel={showDel} bsHistory={bsHistory}/>
    )
  }
  _pushAddBs() {
    const {push, memberId} = this.props
    push(`record/${memberId}/bs/bsadd`)
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
        <div className="date_add" onClick={() => this._pushAddBs()}>
        </div>

      </div>
    )
  }
  _pushTable() {
    const {push, memberId} = this.props
    push(`record/${memberId}/bs/bstable`)
  }
  _pushCount() {
    const {push, memberId} = this.props
    push(`record/${memberId}/bs/trend`)
  }
  _goUrl(url) {
    this.props.push(url)
  }
  render() {
    let {member, bsDateLastRecord, bsTodayData,memberId} = this.props
    const {nickname} = member || {}

    if(nickname){
      setWechatTitle(nickname+'的血糖')
    }
    let showDel = member ? member['manager'] : false
    let btnBottomClassName = 'm-bs-table-bottom'
    if (!member || !showDel) {
      btnBottomClassName = 'm-bs-table-bottom m-show-last'
    }
    require('../../../../styles/home/records/bs/historyPage.less')
    require('../../../../styles/record/bsRecord.less')
    return (
      <div className="bp_history_page">
        <ScrollView onScrollEnd={() => this._getBpHistory()}>
          <div className="bs_history" ref="view">
            {/*<div className="m-icon-table" onClick={()=> this._pushTable()}></div>*/}
            {/*<div className="m-icon-count" onClick={()=> this._pushCount()}></div>*/}
            <div className="m-history-top-text">今天</div>
            {/* 血糖 */}
            <Bs {...{
              lastValue: bsDateLastRecord,
              values: bsTodayData,
            }}/>
            {this.renderContent()}
          </div>
        </ScrollView>
        {/*{this._renderAddRecord()}*/}
        <div className={btnBottomClassName}>
          <Button className="m-bs-table-btn" onClick={() => {this._goUrl(`record/${memberId}/bs/bsadd`)}}>
            <img className="btnImg" src={require('../../../../../static/images/record/bs/icon_bloodsugar_record.png')} alt=""/>记录数据
          </Button>
          <Button className="m-bs-table-btn" onClick={() => {this._goUrl(`record/${memberId}/bs/trend`)}}>
            <img className="btnImg" src={require('../../../../../static/images/record/bs/icon_bloodsugar_statistics.png')} alt=""/>趋势统计
          </Button>
        </div>
      </div>
    )
  }
})

