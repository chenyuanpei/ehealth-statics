import React, {Component, PropTypes} from 'react'
import {decorate} from 'react-mixin'
import ReactComponentWithPureRenderMixin from 'react-addons-pure-render-mixin'
import AvatarText from '../../components/common/Avatar/AvatarText'
import Icon from 'react-weui/lib/components/icon'

// util
import {ImageType} from '../../util/im'
import {calc} from '../../util/setFontSize'
import {previewImage} from '../../util/wxJs/wxApi'

@decorate(ReactComponentWithPureRenderMixin)
export default class ImgMsg extends Component {

  static propTypes = {
    headimgurl: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    me: PropTypes.bool,
  }

  render() {
    const {headImgurl, name, content: {images}, sex, loading, me, error, resend} = this.props
    const isMe = loading ? require('../../../static/images/bg_dialog_green_b.png') : require('../../../static/images/bg_dialog_green.png')
    const isNMe = loading ? require('../../../static/images/bg_dialog_white_b.png') : require('../../../static/images/bg_dialog_white.png')

    // 小图
    const smallImg = images.find(({type}) => type === ImageType.SMALL)
    // 原图
    const originImg = images.find(({type}) => type === ImageType.ORIGIN)
    // 小图宽高样式，使用原图的宽高进行计算（app发送过来的图片消息，只有原图有宽高）
    const imgSizeStyle = this._imgSizeStyle({width: originImg.width, height: originImg.height})

    return (
      <div className={me ? 'MsgBar me' : 'MsgBar'}>
        <div className="MsgBarBox">
          <AvatarText src={headImgurl} sex={sex}/>
          <div className={'msgText'}>
            {!me && <div className="nameText">{name}</div>}
            <img className="msgBarTip" src={me ? isMe : isNMe}/>
            <div onClick={() => this.preview(originImg.url)} className="msgImg" style={imgSizeStyle.box}>
              <img ref="img" style={imgSizeStyle.img} src={smallImg.url}/>
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

  _imgSizeStyle({width, height}) {
    const minWidth = 100
    const minHeight = 100
    const maxWidth = 350
    const maxHeight = 200

    let left = 0
    let top = 0

    // 最小的倍数
    const minZoom = Math.max(minWidth / width, minHeight / height)
    const maxZoom = Math.min(maxWidth / width, maxHeight / height)
    const zoom = maxZoom > minZoom ? maxZoom : minZoom

    let boxWidth = width = width * zoom
    let boxHeight = height = height * zoom

    if (width > maxWidth) {
      boxWidth = maxWidth
      left = (maxWidth - width) / 2
    }

    if (height > maxHeight) {
      boxHeight = maxHeight
      top = (maxHeight - height) / 2
    }

    return {
      box: {
        width: calc(boxWidth),
        height: calc(boxHeight),
      },
      img: {
        width: calc(width),
        height: calc(height),
        left: calc(left),
        top: calc(top),
      },
    }
  }

  preview(img) {
    previewImage({
      current: img,
      urls: [img]
    })
  }
}
