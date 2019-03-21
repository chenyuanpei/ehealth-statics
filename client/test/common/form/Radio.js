import React, {Component, PropTypes} from 'react'
import Radio from '../../../components/common/form/Radio'
const data = ['东利', '大东裕', '天朝']
export default {
  name: 'Radio',
  component: (
    <div>
      <Radio title="区域" list={data}/>
    </div>
  )
}
