import React, {Component, PropTypes} from 'react'
import {decorate} from 'react-mixin'
import ReactComponentWithPureRenderMixin from 'react-addons-pure-render-mixin'
import AvatarText from '../../components/common/Avatar/AvatarText'
import Icon from 'react-weui/lib/components/icon'

// util
import {calc} from '../../util/setFontSize'
// components
import SoundMsgIcon from './soundMsgIcon'

@decorate(ReactComponentWithPureRenderMixin)
export default class SoundMsg extends Component {

  static propTypes = {
    headimgurl: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    me: PropTypes.bool,
    playing: PropTypes.bool,
  }

  render() {
    const {headImgurl, name, content, sex, loading, me, error, playSound, resend, playing} = this.props
    const {uuid, second, size, downUrl, mediaId} = content
    const isMe = loading ? require('../../../static/images/bg_dialog_green_b.png') : require('../../../static/images/bg_dialog_green.png')
    const isNMe = loading ? require('../../../static/images/bg_dialog_white_b.png') : require('../../../static/images/bg_dialog_white.png')

    const width = this.msgSoundWidth(second)

    return (
      <div className={me ? 'MsgBar me' : 'MsgBar'}>
        <div className="MsgBarBox">
          <AvatarText src={headImgurl} sex={sex}/>
          <div className={'msgText'}>
            {!me && <div className="nameText">{name}</div>}
            <img className="msgBarTip" src={me ? isMe : isNMe}/>
            <div onClick={() => playSound(content)} className="msgSound" style={{width}}>
              <SoundMsgIcon playing={playing}/>
              <span className="msgSecond">{(second) + '\'\''}</span>
            </div>
            {loading && <div className="loading"><Icon value="loading"/></div>}
          </div>
          {me && error && (
            <img onClick={resend} src={require('../../../static/images/chat/icon_error.png')}
                 className="error"/>
          )}
        </div>
      </div>
    )
  }

  msgSoundWidth(second) {
    const minWidth = 100
    const maxWidth = 350
    second = Math.round(second / 1000)
    const arr = [{
      second: 0,
      width: 0
    }, {
      second: 10,
      width: 0.6
    }, {
      second: 20,
      width: 0.8
    }, {
      second: 60,
      width: 1
    }]

    let index = arr.findIndex(v => v.second > second)
    if (index === -1) {
      index = arr.length - 1
    }

    const v1 = arr[index - 1]
    const v2 = arr[index]

    const widthRatio = (second - v1.second) / (v2.second - v1.second) * (v2.width - v1.width) + v1.width

    return calc((maxWidth - minWidth) * widthRatio + minWidth)
  }
}
