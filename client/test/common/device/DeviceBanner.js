import React, {Component, PropTypes} from 'react'

import DeviceBanner from '../../../components/device/DeviceBanner'

const latestData = {
  deImg: 'static/images/img_i5.png',
  deN: '乐心血压计i5',
  ddImg: 'static/images/icon_user_no_man.png',
  ddN: '爸爸',
  mmImg: 'static/images/icon_user_no_woman.png',
  mmN: '妈妈'
}

export default {
  name: 'DeviceBanner',
  component: (
    <div>
      <DeviceBanner lastData={latestData}>
      </DeviceBanner >
    </div>
  )
}

