import React, {Component, PropTypes} from 'react'

import ActionSheet from '../../../components/common/dialog/ActionSheet'

class ActionSheetTest extends Component {
  state = {
    show: false
  }

  render() {
    const onClick = () => {
      console.log('确定')
    }
    return (
      <div>
        <button onClick={() => this.show([])}>显示自定义格式</button>
        <ActionSheet show={this.state.show} title="asdasdasd" onClick={onClick}>
          <h1>子元素</h1>

        </ActionSheet>
      </div>
    )
  }

  show() {
    this.setState({
      show: true
    })
  }
}

export default {
  name: 'ActionSheet',
  component: (<ActionSheetTest />)
}
