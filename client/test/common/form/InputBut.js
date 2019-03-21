import React, {Component, PropTypes} from 'react'
import InputBut from '../../../components/common/form/InputBut'
var textInput = {inputType: "text", placeholder: "验证码", inBuTip: "获取验证码"}

export default {
  name: 'InputBut',
  component: (
    <div>
      <InputBut {...textInput}/>

    </div>
  )
}
