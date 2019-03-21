import React, {Component, PropTypes} from 'react'
import TimeRemind from '../../../components/common/remind/TimeRemind'

const latestData = {
  time: '10:12'
}

export default {
  name: 'TimeRemind',
  component: (
    <div>
      <TimeRemind lastData={latestData}>
      </TimeRemind >
    </div>
  )
}
