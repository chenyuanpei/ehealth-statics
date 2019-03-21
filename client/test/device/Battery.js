import React, {Component, PropTypes} from 'react'
import Battery from '../../components/device/Battery'
const batteryVal = 10
export default {
  name: 'Battery',
  component: (
    <div>
      <Battery percent={batteryVal}/>
    </div>
  )
}
