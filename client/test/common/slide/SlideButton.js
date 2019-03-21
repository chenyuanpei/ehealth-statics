import React, {Component, PropTypes} from 'react'

import SlideButton from '../../../components/common/slide/SlideButton'
import ScrollView from '../../../components/common/scroll/ScrollView'

class SlideButtonTest extends Component {

  state = {
    open: false
  }

  renderItem({text, i}) {
    const content = (
      <div style={{backgroundColor: '#FFF', height: 50}}>Hello World</div>
    )

    const button = (
      <div style={{backgroundColor: 'red', height: '100%', width: 70}}>删除</div>
    )

    return (
      <div style={{backgroundColor: '#FFF'}}>
        <SlideButton key={i} {...{content, button}} />
      </div>
    )
  }

  render() {
    const list = []
    for (var i = 0; i < 20; i++) {
      list.push(this.renderItem({text: `Hello World ${i}`, i}))
    }

    return (
      <ScrollView>
        {list}
      </ScrollView>
    )
  }
}

export default {
  name: 'SlideButton',
  component: (
    <SlideButtonTest/>
  )
}
