import React, {Component, PropTypes} from 'react'
import CheckTab from '../../../components/healthRecord/CheckTab'
const data = {
  date: "12月30日",
  image: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2428801400,3464789568&fm=58",
  remark: "我是备注"

}
export default {
  name: 'CheckTab',
  component: (
    <div>
      <CheckTab {...data} />
    </div>
  )
}

