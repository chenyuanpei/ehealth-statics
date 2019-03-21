import React, {Component} from 'react'
import {connect} from 'react-redux'

// components
import Title from '../../../components/common/title/Title'
import Calendar from '../../../components/common/Calendar/Calendar'
import Button from '../../../components/common/button/Button'
import Rule from '../../../components/clock/Rule'
import Fixed from '../../../components/common/fixed/Fixed'
import Confirm from '../../../components/common/dialog/Confirm'
// actions
import actions from './actions'
// selector
import selectors from './selectors'


export default connect(
  selectors,
  actions
)(class extends Component {
  state = {
    tags : [],
    topText:{
      1:'很好的开始！',
      2:'坚持一周了！很酷！',
      3:'奖品距离你只剩7天！',
      4:'成功打卡21天，收获一个好习惯！'
    }
  }
  componentDidMount() {
    const {selectDate} = this.props
    // 如果query参数有create，那么代表创建新成员
    selectDate({
      init: true,
    })
    _czc.push(["_trackEvent",'21天打卡计划','打卡页面访问'])
  }
  /**
   * 选择日期
   * @param year
   * @param month
   * @param day
   */
  selectDate(year, month, day) {
    console.log("选择时间为：" + year + '年' + month + '月' + day + '日' );
  }

  /**
   * 上一个月
   * @param year
   * @param month
   */
  previousMonth(year, month) {
    console.log("当前日期为：" + year + '年' + month + '月');
    const {selectDate} = this.props
    selectDate({
      year:year,
      month:month
    })
  }

  /**
   * 下一个月
   * @param year
   * @param month
   */
  nextMonth(year, month) {
    console.log("当前日期为：" + year + '年' + month + '月');
    const {selectDate} = this.props
    selectDate({
      year:year,
      month:month
    })
  }

  _handlerEvent() {
    const {dayNum,push,account:{id:memberId},addressData} = this.props
    const {continuousMeasureDays,remind} = dayNum || {}
    const {consigneeName} = addressData
    if(remind){
      return
    }
    if(continuousMeasureDays >= 21 && !consigneeName){
        push(`clock/postInfo/${memberId}`)
    }else if(consigneeName){
      push(`clock/postInfo/${memberId}?address=1`)
    }
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
        this.props.push('device')
        showConfirm(false)

      }
    }]
    return (
      <Fixed show={isShowConfirm}>
        <Confirm buttons={buttons} title={'温馨提示'} show={isShowConfirm}>
          <div className="m-confim">
            第一期打卡活动报名结束，第二期打卡活动仅面向新绑定的i8、i5WiFi、i5sWiFi血压计的用户哦！
          </div>
        </Confirm>
      </Fixed>
    )
  }

  render() {
    const {dayNum,show,showEvent,recordData,addressData} = this.props
    const {continuousMeasureDays,remind} = dayNum || {}
    const {address} = addressData || {}
    let topTips = ''
    if(continuousMeasureDays < 7){
      topTips = this.state.topText[1]
    }else if(continuousMeasureDays < 14){
      topTips = this.state.topText[2]
    }else if(continuousMeasureDays < 21){
      topTips = this.state.topText[3]
    }else{
      topTips = this.state.topText[4]
    }
    let btnClass = 'before_btn'
    if(continuousMeasureDays >= 21){
      btnClass= 'blue_btn'
    }

    let btnText='领取乐心智能血糖仪G1'
    if(address && address != ''){
      btnText = '已提交收货信息'
    }
    if(remind){
      btnClass = 'before_btn'
      btnText = '脚步太慢，奖品已经被领完'
    }
    let percentNum = 100 * continuousMeasureDays / 21
    require('../../../styles/clock/mark.less')
    return (
    recordData&&
      <div className="m-mark-wrap">
        <Title title="血压打卡" />
        <div className="m-mark-tips" style={{visibility:continuousMeasureDays>0?'visible':'hidden'}}>
          {topTips}
        </div>
        <div className="m-process-wrap">
          <div className="m-process-div">
            <span className="m-process-span"></span>
            <span className="m-process-percent" style={{width:percentNum+'%'}}></span>
          </div>

          <ul className="m-circle-wrap">
            <li className={continuousMeasureDays > 0 ? "processLi" : ''}>

              <span className="circle"></span>
              1天
            </li>
            <li className={continuousMeasureDays >= 7 ? "processLi" : ''}>

              <span className="circle"></span>
              7天
            </li>
            <li className={continuousMeasureDays >= 14 ? "processLi" : ''}>

              <span className="circle"></span>
              14天
            </li>
            <li className={continuousMeasureDays >= 21 ? "processLi" : ''}>

              <span className="circle"></span>
              21天
            </li>
          </ul>
          <div className="hackbox"></div>
        </div>
        <Calendar
          onSelectDate={(year, month)=>this.selectDate(year, month)}
          onPreviousMonth={(year, month)=>this.previousMonth(year, month)}
          onNextMonth={(year, month)=>this.nextMonth(year, month)}

          tags={recordData} />
        <div className="m-mark-btn-wrap">

          <Button className={btnClass} onClick={()=>this._handlerEvent()}>{btnText}</Button>
          <p>连续打卡21天后可点击领取</p>
        </div>
        <div className="m-bottom-btn-wrap">
          <div onClick={()=>{showEvent(true)}} className="m-rule-btn">活动规则</div>
          <div className="m-opacity-btn"></div>
        </div>
          <Rule show={show} onClick={()=>{showEvent(false)}}></Rule>

        {this._renderConfirm()}
      </div>
    )
  }



})
