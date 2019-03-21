import React, {Component, PropTypes} from 'react'
import CheckBox from '../../../components/healthRecord/Checkbox'

const data = ['东利', '大东裕', '天朝']

export default {
  name: 'CheckBox',
  component: (
    <div>
      <CheckBox checkBoxList={data}/>
    </div>
  )
}
