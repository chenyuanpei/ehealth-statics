import React, {Component, PropTypes} from 'react'

import WeekStatData from '../../../components/common/chart/WeekStatData'

const weekData = {
  weekCount: 11,
  normalCount: 4,
  abnormalCount: 3
}

export default {
  name: 'WeekStatData',
  component: (
    <div>
      <WeekStatData weekData={weekData}>
      </WeekStatData >
    </div>
  )
}
