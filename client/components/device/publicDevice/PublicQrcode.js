import React, {Component, PropTypes} from 'react'
import {generateUrl} from '../../../apis/request'
import {healthServer} from '../../../apis/constant'
export default class PublicQrcode extends Component {


  render() {
    const {qrcodeUrl} = this.props
    return (
      <div className="m-public-address-wrap">
        <h2>扫一扫了解测量点信息</h2>
        <div className="m-public-img">
          <img src={generateUrl(`${healthServer}/wx/get_qrcode_pic?qrcode=${qrcodeUrl}`)} />
        </div>
      </div>
    )
  }
}
