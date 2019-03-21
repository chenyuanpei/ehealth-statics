import React, {Component, PropTypes} from 'react'

import Alert from '../../../components/common/dialog/Alert'

class AlertTest extends Component {
  state = {
    show: false,
  }

  render() {
    const opts = {
      onClick: () => {
        console.log("按了确定")
      },
      text: "确定",
      title: '这里是标题'
    }
    return (
      <div>
        <button onClick={() => this.show()}>显示</button>
        <Alert {...opts} show={this.state.show}>
          <p>这里是内容！！！！</p>
        </Alert>
      </div>
    )
  }

  show() {
    this.setState({show: true})
  }

  hide() {
    this.setState({show: false})
  }
}

export default {
  name: 'Alert',
  component: (<AlertTest />)
}
