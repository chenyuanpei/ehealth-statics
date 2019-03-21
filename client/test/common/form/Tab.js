import React, {Component, PropTypes} from 'react'
import Tab from '../../../components/common/form/Tab'

export default {
  name: 'Tab',
  component: (
    <div>
      <Tab name="昵称" val="请输入"/>
      <Tab name="身高" val="请输入"/>
      <Tab name="体重" val="请输入"/>
    </div>
  )
}
