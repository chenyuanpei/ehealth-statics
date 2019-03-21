import React, {Component, PropTypes} from 'react'
import Switch from '../../../components/common/remind/Switch'

const latestData = {
  dadN: '爸爸',
  mumN: '未绑定'
}

export default {
  name: 'Switch',
  component: (
    <div>
      <Switch lastData={latestData}>
      </Switch >
    </div>
  )
}
