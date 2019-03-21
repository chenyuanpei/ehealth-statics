import React, {Component, PropTypes} from 'react'
import ScrollView from '../../../components/common/scroll/ScrollView'

import {Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter} from 'react-weui/lib/components/cell'
import Avatar from '../../../components/common/Avatar/Avatar'

require('weui/src/style/widget/weui_cell/weui_cell_global.less')
require('weui/src/style/widget/weui_cell/weui_access.less')

const infoList = [[{
  body: "昵称",
  footer: "请输入",
  onClick: function () {
    console.log("事件")
  }
}, {
  body: "性别",
  footer: "请输入"
}, {
  body: "出生",
  footer: "请输入"
}, {
  body: "身高",
  footer: "请输入"
}, {
  body: "体重",
  footer: "请输入"
}, {
  body: "腰围",
  footer: "请输入"
}],
  [
    {
      body: "健康档案"
    },
    {
      body: "真实姓名"
    }
  ]
]
export default {
  name: 'Cell',
  component: (
    <ScrollView>
      <div style={{width: '100px', height: '100px', margin: '0 auto'}}>
        <Avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=401693168,491945454&fm=116&gp=0.jpg"
                alt="神"/><span></span>
      </div>
      {infoList.map((n, index) => (
        <Cells key={index} access>
          {n.map((m, index) => (
            <Cell key={index} className="list_item" onClick={m.onClick}>
              <CellHeader/>
              <CellBody>
                {m.body}
              </CellBody>
              <CellFooter>
                {m.footer }
              </CellFooter>
            </Cell>
          ))}
        </Cells>
      ))}
    </ScrollView>
  )
}
