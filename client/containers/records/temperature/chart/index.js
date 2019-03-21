import React, {Component} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../../util/common'
import PubSub from 'pubsub-js'
// components
import Button from '../../../../components/common/button/Button'
import ScrollView from '../../../../components/common/scroll/ScrollView'
import TpRecords from '../../../../components/record/temperature/chart/TpRecords'
import Tp from '../../../../components/record/temperature/chart/Tp'
import {setWechatTitle} from '../../../../util/common'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
// // pubsub
import {TOPIC_PUSH_TEMPERATURE_DETAIL} from '../../../../components/record/temperature/chart/TpRecord'

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
    this.pushTemperatureDetailToken = PubSub.subscribe(TOPIC_PUSH_TEMPERATURE_DETAIL, (topic, {id}) => {
      const {push} = this.props
      push(`record/${memberId}/temperature/detail/${id}`)
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pushTemperatureDetailToken)
  }

  show() {
    this.setState({
      showAdd: true
    })
  }


  _getBpHistory() {
    let {memberId, loadData, tpHistory} = this.props
    loadData({memberId, tpHistory})
  }


  renderContent() {
    let {temperatureHistory, member} = this.props
    // if (!bpHistory || !bpHistory.size) {
    //   // 没有血压数据记录
    //   return <NoData image={require('../../../../../static/images/noData/icon_no_data.png')} text="未记录血压数据"/>
    // }
    let showDel = member ? member['manager'] : true
    return (
      <TpRecords ref="tpRecords" showDel={showDel} TpHistory={temperatureHistory}/>
    )
  }
  _pushAdd() {
    const {push, memberId} = this.props
    push(`record/${memberId}/temperature/add`)
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
    return (
      <div className='m-tp-chart-bottom m-show-last'>
        <Button className="m-tp-btn" onClick={() => {this._pushAdd()}}>
          <img className="btnImg" src={require('../../../../../static/images/record/bs/icon_bloodsugar_record.png')} alt=""/>记录数据
        </Button>
      </div>
    )
  }


  render() {
    let {member, lastTpRecords} = this.props
    const {nickname} = member || {}

    if(nickname){
      setWechatTitle(nickname+'的体温')
    }
    require('../../../../styles/home/records/temperature/chartPage.less')
    require('../../../../styles/home/records/temperature/tpRecord.less')
    return (
      <div className="m_tp_chart_page">
        <ScrollView onScrollEnd={() => this._getBpHistory()}>
          <div className="bp_history" ref="view">
            <div className="m-history-top-text">最近7次</div>
            {/* 体温 */}
            <Tp {...{
              values: lastTpRecords,
            }}/>
            {this.renderContent()}
          </div>
        </ScrollView>
        {this._renderAddRecord()}

      </div>
    )
  }
})

