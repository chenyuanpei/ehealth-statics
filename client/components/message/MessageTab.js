import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'
import {getUpdateDateDesc} from '../../util/common'

export default class MessageTab extends Component {
  static propTypes = {
    //target: PropTypes.number,
    //step: PropTypes.number,
  }

  static defaultProps = {
    target:0,
  }

  render() {
    const {doctorName,patientName,lastMsg,unreadCount,relationType,teamName,onClick} = this.props
    require('../../styles/message/index.less')

    let content=''
    let timeStr=''
    if(lastMsg){
      if(lastMsg.CreateTime){
        timeStr=new Date(lastMsg.CreateTime).format('yyyy年MM月dd日 hh:mm')
      }
      if(lastMsg.MsgBody&&lastMsg.MsgBody.length>0){
        content=lastMsg.MsgBody[lastMsg.MsgBody.length-1].MsgContent.Text
      }
    }

    let showDoctorName='医生：' + doctorName
    if(relationType==2){
      showDoctorName=teamName
    }

    return (
      <div style={{display:lastMsg?'block':'none'}} className="msgTab" onClick={onClick}>
        <div className="top">
          <div className="info">
            <div>{showDoctorName}</div>
            <div className="member">成员：{patientName}</div>
          </div>
          <div className="time">
            {timeStr}
          </div>
        </div>
        <div className="bottom">
          <div className="content">内容：{content}</div>
        </div>
        <div className="center">
          <div style={{display:unreadCount>0?'block':'none'}} className="remind">{unreadCount}</div>
          <img src={require('../../../static/images/btn_new_p.png')}/>
        </div>
        <div className="line"></div>
      </div>
    )
  }

}
