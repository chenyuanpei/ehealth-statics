import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import Confirm from '../../../components/common/dialog/Confirm'
import Fixed from '../../../components/common/fixed/Fixed'
import Title from '../../../components/common/title/Title'
import Button from '../../../components/common/button/Button'
import Alert from '../../../components/common/dialog/Alert'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
// toast

export default connect(
  debug(selectors),
  actions
)(class extends Component {


  componentDidMount() {
    const {loadData} = this.props
    loadData()
    _czc.push(["_trackEvent",'21天打卡计划','活动总页面访问'])
  }
  _toggleError() {
    const {toggleError} = this.props
    this.props.clear()
    toggleError(false)

  }
  render() {
    require('../../../styles/clock/special.less')
    const {isShow,communication} = this.props
    let alertText = '添加设备不成功，你可以尝试使用微信"扫一扫"来添加设备。'
    if(communication && communication === 4){
      alertText = '您扫描的是蓝牙设备，不能在公众号直接扫码绑定，请通过微信【扫一扫】添加设备。'
    }
    return (
      <div>
        <Title title='21天打卡计划'/>
        {this._renderImg()}
        {this._renderContent()}
        {this._renderConfirm()}
        {this._renderIknow()}
        <Alert show={isShow} text="知道了" onClick={() => {this._toggleError()}}>
          <div className="confirm">{alertText}</div>
        </Alert>
      </div>
    )
  }

  // 生成弹窗
  _renderConfirm() {
    const {isShowConfirm, showConfirm,add} = this.props
    const buttons = [{
      type: 'default',
      label: '取消',
      onClick: () => {
        showConfirm(false)
      }
    }, {
      type: 'primary',
      label: '去绑定',
      onClick: () => {
        add()
        showConfirm(false)

      }
    }]
    return (
      <Fixed show={isShowConfirm}>
        <Confirm buttons={buttons} title={'温馨提示'} show={isShowConfirm}>
          <div className="m-confim">
            您尚未绑定指定的乐心血压计，微信扫一扫绑定吧！<br />
            注：仅限9月29日起首次绑定I8、i5WiFi、i5S WiFi血压计的新用户

          </div>
        </Confirm>
      </Fixed>
    )
  }
  // 生成弹窗
  _renderIknow() {
    const {showIknow,isShowIKnow} = this.props
    const buttons = [{
      type: 'default',
      label: '知道了',
      onClick: () => {
        showIknow(false)
      }
    }]
    return (
      <Fixed show={isShowIKnow}>
        <Confirm buttons={buttons} title={'温馨提示'} show={isShowIKnow}>
          <div className="m-confim">
            第一期打卡活动报名结束，第二期打卡活动仅面向新绑定的i8、i5WiFi、i5S WiFi血压计的用户哦！

          </div>
        </Confirm>
      </Fixed>
    )
  }
  _joinHandle() {
    const {getJoin,push} = this.props
    _czc.push(["_trackEvent",'21天打卡计划','报名按钮点击']);
    getJoin()

  }

  _renderImg() {
    return (
      <div className="m-special-panel">

          <Button className="special_btn" onClick={()=>this._joinHandle()}>马上报名</Button>
      </div>
    )

  }
  _renderContent() {
    return (
        <div className="m-content-wrap">
          <div className="title">
            <img src={require('../../../../static/images/clock/img_title_left.png')} alt=""/>
            活动规则
            <img src={require('../../../../static/images/clock/img_title_right.png')} alt=""/>
          </div>
          <div className="column" style={{fontWeight:'bold'}}>
            <div className="m-column-content">第二期挑战21天活动火热开展中！</div>
          </div>
          <div className="column">
            <div className="m-little-tit">
              ★报名时间：
            </div>
            <div className="m-column-content">
              2017年9月29日-2017年12月31日
            </div>

          </div>
          <div className="column">
            <div className="m-little-tit">
              ★活动对象：
            </div>
            <div className="m-column-content">
              9月29日起，首次绑定乐心血压计、且血压计型号为i5WiFi、i5S WiFi、i8的新用户
            </div>

          </div>
          <div className="column">
            <div className="m-little-tit">
              ★参与方式:
            </div>
            <div className="m-column-content">
              1.点击“马上报名”按钮，即可进入打卡日历页面
            </div>
            <div className="m-column-content">
              2.使用乐心血压计测量血压
            </div>
            <div className="m-column-content">
              注：请确认微信号已绑定血压计且连接WiFi，且网络环境正常。打卡以日期被点亮为准！
            </div>

          </div>
          <div className="column">
            <div className="m-little-tit">
              ★关于大奖：
            </div>
            <div className="m-column-content">
              <p>连续测量21天，即可免费获赠乐心血糖仪G1一部（附带10片试纸）。本期奖品数量有限，送完即止。</p>
            </div>

          </div>
          <div className="column">
            <div className="m-little-tit">
              ★奖品派发：
            </div>
            <div className="m-column-content">
              <p>1. 测量打卡达标后，系统将推送获奖通知；</p>
              <p>2. 获奖用户收到获奖通知后需提交获奖信息；</p>
              <p>3. 7个工作日内没有提交获奖信息即视为放弃；</p>
            </div>

          </div>
          <div className="column">
            <div className="m-little-tit">
              ★活动细则：
            </div>
            <div className="m-column-content">
              <p>1.本次活动仅面向9月29日后首次扫码绑定血压计的用户；</p>
              <p>2.打卡以使用乐心血压计测量的数据核算，手动输出数据不计入；</p>
              <p>3.打卡期间出现中断打卡/隔了几天打卡，之前的成绩会被清零，所以务必注意当天数据是否有成功上传，日历日期是否有被点亮！ </p>
              <p>4.本次活动同一个用户只能获取一个奖励，同一个微信号，认定为同一个用户；如果您微信号绑定了血压计，则该血压计成功上传的任意一笔数据均视为有效打卡数据，包括本人测量，成员绑定按键测量，达标由您本人领奖，只能领取一次奖励。</p>
              <p>5.报名截止时间为2017年12月31日，测量打卡截止时间为2018年1月21日。</p>
            </div>

          </div>
        </div>
    )
  }

})

