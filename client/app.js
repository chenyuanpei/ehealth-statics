// require('babel-polyfill')
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import FastClick from 'fastclick'

import moment from 'moment'
moment.locale('zh-cn')

// import {start} from './util/react/perf'
import setFontSize from './util/setFontSize'
import scroll from './util/scroll'
import Root from './Root'

// import DevTools from './DevTools'

import './styles/app.less'
// import {hideOptionMenu} from './util/wxJs/wxApi'

// jsapi 签名
// if (process.browser) {
//   hideOptionMenu()
// }

// 设置字体大小
setFontSize()

// 移动端单击延迟问题
FastClick.attach(document.body)

// 滚动
//scroll()

// 渲染
render(
  <Root/>,
  document.getElementById('root')
)
