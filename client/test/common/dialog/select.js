import React, {Component, PropTypes} from 'react'

import Select from '../../../components/common/dialog/select'

class SelectTest extends Component {
  state = {
    show: false,
  }

  render() {
    const opts = {
      title: '身高',
      value: [5, 4, 3],
      confirm: () => {
        console.log('确定')
      },
      data: [
        {
          left: '要死',
          right: 'cm',
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }, {
          left: '血压',
          right: '次/分',
          values: [1999, 2999, 3999, 4999, 5999, 6999, 7999, 8999, 9999, 1099]
        }, {
          left: '要死',
          right: 'cm',
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
      ]

    }
    return (
      <div>
        <button onClick={() => this.show()}>显示</button>
        <Select
          {...opts}
          show={this.state.show}
          ref="select"
          confirm={() => {
            console.log(this.refs.select.getValue())
          }}/>
      </div>
    )
  }

  show() {
    this.setState({show: true})
  }
}

export default {
  name: 'SelectTest',
  component: (<SelectTest />)
}
