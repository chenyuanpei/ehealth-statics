import React, {Component, PropTypes} from 'react'

import Button from '../../../components/common/button/Button'

export default {
  name: 'Button',
  component: (
    <div>
      <Button onclick={() => console.log('确认')}>
        确认
      </Button >
      <Button type="warn" size="small" onclick={() => console.log('警告')}>
        警告
      </Button >
      <Button onclick={() => console.log('我是按钮！！！')}>
        弹框
      </Button>
    </div>
  )
}
