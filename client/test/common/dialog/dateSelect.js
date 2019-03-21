import React, {Component, PropTypes} from 'react'

import DateSelect from '../../../components/common/dialog/DateSelect'

class DateSelectTest extends Component {
  state = {
    show: false,
  }

  render() {
    const opts = {
      title: '身高',
      confirm: () => {
        console.log('确定')
      },
    }
    return (
      <div>
        <button onClick={() => this.show()}>显示</button>
        <DateSelect
          {...opts}
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
  name: 'DateSelectTest',
  component: (<DateSelectTest />)
}
