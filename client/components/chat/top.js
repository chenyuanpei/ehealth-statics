import React, {Component, PropTypes} from 'react'
import CountDown from '../../components/common/publicDevice/CountDown'
import PubSub from 'pubsub-js'
export const TOPIC_COUNT_DOWN_CLOSE_EVENT = 'TOPIC_COUNT_DOWN_CLOSE_EVENT'
export const TOPIC_PUSH_DOCTOR_SERVICE_EVENT = 'TOPIC_PUSH_DOCTOR_SERVICE_EVENT'
export default class Top extends Component {
  _handEnd() {
    PubSub.publish(TOPIC_COUNT_DOWN_CLOSE_EVENT)
  }
  _handClick(doctorId) {
    PubSub.publish(TOPIC_PUSH_DOCTOR_SERVICE_EVENT,{doctorId})
  }
  render() {
    const {onClick,name,countdown,chatStatus,doctorId} = this.props
    let topText = ''
    if(name){
      topText = name + '正在为您服务。'
    }else{
      topText = '详细描述你的症状，以便医生可以更好的做出判断。'
    }
    const messages = {
      days: {
        plural: '天',
        singular: '天',
      },
      hours: ':',
      mins: ':',
      segs: '',
    }
    let _this = this
    return (
      <div>
        {chatStatus == 0 && <div className="status-blue">等待医生回复，可继续提问</div>}
        {
          chatStatus == 1 && <div className="status-blue">
            <CountDown
              RemainingTime={countdown}
              className="countdown_time"
              {...messages}
              onEnd={()=>_this._handEnd()}
            />
            内可继续咨询
          </div>

        }
        {chatStatus == 2 && <div className="status-orange" onClick={()=>this._handClick(doctorId)}>服务已到期<div className="status-arrow"></div></div>}
        {chatStatus == 3 && <div className="status-orange" onClick={()=>this._handClick(doctorId)}>服务已失效<div className="status-arrow"></div></div>}

        <div onClick={onClick} className="tipMsg">{topText}
          {name && <img className="m-arrow-right" src={require('../../../static/images/btn_new_p.png')}/>}
        </div>
      </div>
    )
  }
}
