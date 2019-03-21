import React, {Component, PropTypes} from 'react'
import {decorate} from 'react-mixin'
import ReactComponentWithPureRenderMixin from 'react-addons-pure-render-mixin'
import Icon from 'react-weui/lib/components/icon'
import classnames from 'classnames'
import AvatarText from '../../components/common/Avatar/AvatarText'

@decorate(ReactComponentWithPureRenderMixin)
export default class adminMsg extends Component {

  static propTypes = {
    content: PropTypes.object,
  }

  render() {
    require('../../styles/doctor/adminMsg.less')
    const {content: {text}} = this.props

    return (
      <div className="adminMsg">
        {text}
      </div>
    )
  }
}
