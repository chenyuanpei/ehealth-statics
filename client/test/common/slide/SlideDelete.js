import React, {Component, PropTypes} from 'react'

import SlideDelete from '../../../components/common/slide/SlideDelete'
import ScrollView from '../../../components/common/scroll/ScrollView'

class SlideDeleteTest extends Component {

  render() {
    const list = []
    for (var i = 0; i < 50; i++) {
      ((i) => {
        list.push(
          <SlideDelete ref={`SlideDelete${i}`} key={i} onDelete={() => console.log(`SlideDelete${i}`)}>
            <h1>{`Hello World ${i}`}</h1>
          </SlideDelete>
        )
      })(i)
    }

    return (
      <ScrollView>
        <div ref="view">
          {list}
        </div>
      </ScrollView>
    )
  }
}

export default {
  name: 'SlideDelete',
  component: (
    <SlideDeleteTest/>
  )
}
