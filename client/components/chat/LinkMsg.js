import React, {Component, PropTypes} from 'react'
import {decorate} from 'react-mixin'
import ReactComponentWithPureRenderMixin from 'react-addons-pure-render-mixin'
import Icon from 'react-weui/lib/components/icon'
import classnames from 'classnames'
import AvatarText from '../../components/common/Avatar/AvatarText'

@decorate(ReactComponentWithPureRenderMixin)
export default class LinkMsg extends Component {

  static propTypes = {
    headimgurl: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.object,
    loading: PropTypes.bool,
    text:PropTypes.string,
  }

  render() {
    console.log('render TextMsg')
    const {headImgurl,sex,text,content,onClick} = this.props
    const {customData:{title}} = content ||{}
    const isNMe = require('../../../static/images/bg_dialog_white.png')

    return (
      <div className={'MsgBar'}>
        <div className="MsgBarBox">
          <AvatarText src={headImgurl} sex={sex}/>

          <div className={'msgText'} onClick={onClick}>
            <img className="msgBarTip" src={isNMe}/>
            <div className="title">{title}</div>
            <div className="msgLinkContent">{text}<img src={require('../../../static/images/doctor/img_data.png')} alt="" /></div>
          </div>

        </div>
      </div>
    )
  }
}
