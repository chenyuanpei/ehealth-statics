import React, {Component, PropTypes} from 'react'

import Button from '../../../components/common/button/Button'
import ButtonArea from 'react-weui/lib/components/button/button_area'

export default {
  name: 'ButtonArea',
  component: (
    <div>
      <ButtonArea direction="horizontal">
        <Button>确定</Button>
        <Button type="warn">警告</Button>
        <Button type="default">取消</Button>
      </ButtonArea>
      <ButtonArea direction="vertical">
        <Button>确定</Button>
        <Button>取消</Button>
      </ButtonArea>
    </div>
  )
}
