import React, {Component, PropTypes} from 'react'
import {decorate} from 'react-mixin'
import ReactComponentWithPureRenderMixin from 'react-addons-pure-render-mixin'
import Icon from 'react-weui/lib/components/icon'
import {push} from 'react-router-redux'
import classnames from 'classnames'
import AvatarText from '../../components/common/Avatar/AvatarText'

@decorate(ReactComponentWithPureRenderMixin)
export default class TextMsg extends Component {

  static propTypes = {
    headimgurl: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    me: PropTypes.bool,
  }
  _goLink(url) {
    if(url.indexOf('http') >=0){
      window.location.href = url
    }else{
      window.location.href = 'http://'+url
    }

  }
  render() {
    console.log('render TextMsg')
    const {headImgurl, name, sex, content: {text}, loading, error, me, resend} = this.props
    const isMe = loading ? require('../../../static/images/bg_dialog_green_b.png') : require('../../../static/images/bg_dialog_green.png')
    const isNMe = loading ? require('../../../static/images/bg_dialog_white_b.png') : require('../../../static/images/bg_dialog_white.png')
    let _this = this
    return (
      <div className={me ? 'MsgBar me' : 'MsgBar'}>
        <div className="MsgBarBox">
          <AvatarText src={headImgurl} sex={sex}/>
          <div className={'msgText'}>
            {!me && <div className="nameText">{name}</div>}
            <img className="msgBarTip" src={me ? isMe : isNMe}/>
            <div className="msgTextBlk">
              {text.indexOf('www.') >=0 ? <div className="linkStyle" onClick={()=>_this._goLink(text)}>{text}</div> : text}
            </div>
            {loading && <div className="loading"><Icon value="loading"/></div>}
          </div>
          {me && error && <img onClick={resend} src={require('../../../static/images/chat/icon_error.png')}
                               className="error"/>}
        </div>
      </div>
    )
  }
}
