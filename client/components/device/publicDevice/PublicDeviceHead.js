import React, {Component, PropTypes} from 'react'

export default class PublicDeviceHead extends Component {
  static proptTypes = {
    nickname: PropTypes.string,
    headImgurl: PropTypes.string
  }
  static defaultProps = {
    nickname: '暂无',
    headImgurl: 'http://lifejoy-health.booen.co/healthbase/static/avatar/icon_user_no_man.png'
  }

  render() {
    const {deviceType,nickname, headImgurl,address,organName} = this.props
    let dataName = ''
    if (deviceType === '02'){
      dataName = '体重'
    }else{
      dataName = '血压'
    }
    return (
      <div className="m_public_device_head">
        <div className="m-public-device-headimg">
            <img src={headImgurl} />
        </div>
        <div className="m-public-device-name">
          {nickname}刚完成一次免费{dataName}测量
        </div>
        <div className="m-public-device-address">
          <ul>
            <li>网点：{organName}</li>
            <li>地址：{address}</li>
          </ul>
        </div>
      </div>
    )
  }
}
