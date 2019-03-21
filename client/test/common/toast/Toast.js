import React, {Component, PropTypes} from 'react'

import Toast from '../../../components/common/toast/Toast'

export default {
  name: 'Toast',
  component: (
    <div>
      <Toast show={true}>
        加载完成
      </Toast >
    </div>
  )
}
