import React, {Component, PropTypes} from 'react'

import Confirm from '../../../components/common/dialog/Confirm'

class ConfirmTest extends Component {
  state = {
    show: false
  }

  render() {
    const opts = {
      buttons: [{
        type: 'default',
        label: '关闭',
        onClick: () => {
          this.hide()
        }
      }, {
        type: 'primary',
        label: '确定',
        onClick: () => {
          console.log("按了确定")
          this.hide()
        }
      }]
    }
    return (
      <div>
        <button onClick={() => this.show()}>显示</button>
        <Confirm {...opts} show={this.state.show}>
          <textarea style={{width: "100%", height: "100%", resize: 'none'}}></textarea>
          <div style={{textAlign: 'right'}}>3/14</div>
        </Confirm>
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
  name: 'Confirm',
  component: (<ConfirmTest />)
}
