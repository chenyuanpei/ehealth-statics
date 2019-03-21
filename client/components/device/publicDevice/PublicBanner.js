import React, {Component, PropTypes} from 'react'

export default class PublicBanner extends Component {

  render() {
    const {deviceType,banner,name} = this.props
    return (
      <div className="m_public_device_banner">
        <h3><span className="cRed">*</span>{deviceType === '02' ? '数据':'测量'}来自<span className="cBlue">{`${name}（CFDA认证）`}</span></h3>
        <p style={{display:banner ? 'block' : 'none'}}><img src={banner} /></p>
      </div>
    )
  }
}