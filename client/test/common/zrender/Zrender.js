import React, {Component, PropTypes} from 'react'

import Zrender from '../../../components/common/zrender/Zrender'

class ZrenderTest extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Zrender ref="zrender"/>
    )
  }
}

export default {
  name: 'Zrender',
  component: <ZrenderTest/>
}
