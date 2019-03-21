import React, {Component, PropTypes} from 'react'
import im, {MsgType, SessionType} from '../../util/im'

class ImTest extends Component {

  state = {
    identifier: '18352600301744d2912b8d96530d2f8c',
    content: 'hello',
    sendTo: '6b66b1ce747942f29bddb491ef9ed78c',
    // sendTo: '59c522c1064b49918a0248e04d2a1e8f', // 群id
    sessionType: SessionType.C2C,
    // sessionType: SessionType.GROUP,
  }

  handleClick() {
    const {identifier} = this.state

    im.login({id: identifier})
  }

  handleSend() {
    const {sessionType, identifier, sendTo, content} = this.state
    im.sendMsg({
      fromId: identifier, // 发送者id
      toId: sendTo, // 接受者id
      sessionType,  // 接受者id
      msgType: MsgType.Text,
      content: content // 内容
    })
  }

  render() {
    return (
      <div>
        <div>
          <label>identifier：</label>
          <input value={this.state.identifier} onChange={({target: {value}}) => this.setState({identifier: value})}/>
          <button onClick={() => this.handleClick()}>login</button>
        </div>
        <div>
          <label>发送给：</label>
          <input value={this.state.sendTo} onChange={({target: {value}}) => this.setState({sendTo: value})}/>
        </div>
        <div>
          <label>内容：</label>
          <input value={this.state.content} onChange={({target: {value}}) => this.setState({content: value})}/>
          <button onClick={() => this.handleSend()}>发送</button>
        </div>
      </div>
    )
  }
}

export default {
  name: 'im',
  component: (
    <ImTest></ImTest>
  )
}
