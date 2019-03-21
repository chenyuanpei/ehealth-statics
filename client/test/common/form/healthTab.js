import React, {Component, PropTypes} from 'react'
import HealthTab from '../../../components/healthRecord/HealthTab'
const list = ["高盐饮食", "吸烟", "高盐饮食", "高盐饮食"]
export default {
  name: 'HealthTab',
  component: (
    <div>
      <HealthTab name="不良生活习惯" items={list}/>
    </div>
  )
}
