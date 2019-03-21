import React, {Component, PropTypes} from 'react'

import Swiper from '../../../components/common/swiper'

const genereateContext = () => {
  let arr = []
  for (var i = 0; i < 100; i++) {
    arr.push(<div key={i}>{'context' + i}</div>)
  }
  return arr
}

const options = {
  slidesOffsetAfter: 200,
}

export default {
  name: 'Swiper',
  component: (
    <Swiper options={options}>
      <div>HelloWorld</div>
    </Swiper>
  )
}
