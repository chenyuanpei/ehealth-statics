import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import MessageTab from '../../../components/message/MessageTab'

import {RowFlex} from '../../../components/frozenui/grid'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component{
  static defaultProps={

  }

  componentDidMount(){
    const {init} = this.props;
    init();
  }

  componentWillUnmount() {

  }


  render(){
    require('../../../styles/message/index.less')

    return (
      <div className="message">
        <Title title="消息通知"/>
        {this.renderNoMessage()}
        {this.renderList()}
      </div>
    )
  }

  renderList(){
    const {messageList} = this.props

    return (<div>
      {
        messageList && messageList.map(
          (temp, index) => (
            <MessageTab
              key={index}
              {...temp}
              onClick={() => {
                if(temp.relationType==1){
                  this.props.push(`doctor/${temp.tid}/chat/${temp.patientId}`)
                }else{
                  this.props.push(`doctor/${temp.tid}/chat/${temp.patientId}?relationType=${temp.relationType}&doctorTeamId=${temp.teamId}`)
                }
              }}
            />
          )
        )
      }
    </div>)
  }

  renderNoMessage(){
    const {messageList} = this.props

    let noMessage=true

    if(messageList&&messageList.length>0){
      noMessage=false
      //messageList.forEach((temp,index)=>{
      //  if(temp.unreadCount&&temp.unreadCount>0){
      //    noMessage=false
      //  }
      //})
    }

    return (
      <div style={{display:noMessage?'block':'none'}}>
        <img className="noMessageImg" src={require('../../../../static/images/message/img_nomessage.png')}/>
        <div className="noMessageText">暂无消息</div>
      </div>
    )
  }

})
