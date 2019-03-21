import React, {Component, PropTypes} from 'react'
import TimeSet from '../../../components/common/remind/TimeSet'

class TimeSetTest extends Component {
  state = {
    show: false,
  }

  render() {
    const opts = {
      title: '时间',
      confirm: () => {
        console.log('确定')
      },
    }
    return (
      <div>
        <button onClick={() => this.show()}>显示</button>
        <TimeSet {...opts}
          show={this.state.show}
          confirm={(val) => {
            console.log(val)
          }}
        />
      </div>
    )
  }

  show() {
    this.setState({show: true})
  }
}

export default {
  name: 'TimeSetTest',
  component: (<TimeSetTest />)
}
