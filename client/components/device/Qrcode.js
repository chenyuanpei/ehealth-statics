import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'

export default class Qrcode extends Component {
  static propTypes = {
    sn2: PropTypes.string,
    qrcode: PropTypes.string,
    show: PropTypes.bool.isRequired
  }

  static defaultProps = {
    show: false
  }

  render() {
    const {show, qrcode, sn2,sn, onClick} = this.props

    if (!show) {
      return <noscript/>
    }

    require('weui/src/style/widget/weui_tips/weui_mask.less')
    require('../../styles/device/qrcode.less')
    return (
      <div className="qrcodeBox">
        <Mask onClick={onClick}/>
        <div className='qrcode'>
          <div className="text">{`SN:${sn2 || sn || '无'}`}</div>
          <div className="img">
            <img src={generateUrl(`${healthServer}/wx/get_qrcode_pic?qrcode=${qrcode}`)}/>
          </div>
          <div className="text warn">请长按二维码保存图片<br/>以免丢失</div>
        </div>
      </div>
    )
  }
}
