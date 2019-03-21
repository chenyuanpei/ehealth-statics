import React, {Component, PropTypes} from 'react'
import Input from '../../../components/common/form/Input'
var textInput = {inputType: "text", placeholder: "请输入昵称", title: "昵称"}
var numberInput = {inputType: "number", placeholder: "请输入身高", title: "身高"}
export default {
  name: 'Input',
  component: (
    <div>
      <Input {...textInput}/>
      <Input {...numberInput}/>
    </div>
  )
}
