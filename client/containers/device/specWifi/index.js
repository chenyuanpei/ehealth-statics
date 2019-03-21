import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
// util
import {debug} from '../../../util/common'
// components
import Button from '../../../components/common/button/Button'
import Title from '../../../components/common/title/Title'
// const
import {saleModel} from '../../../const/wifiDevice'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {
  componentDidMount () {
    const {setNext} = this.props
    setNext(false)
  }
  render() {
    require('../../../styles/page/specWifi.less')
    const {setNext, params: {deviceId}, next, configWifi, location: {query: {saleModel,experienceFlag, isBackDevice}}} = this.props
    const devType = this.props.location.query.saleModel
    const isI8 = devType.indexOf('i8') !== -1
    let devClassNm = ""
    let devWifiImg = ""
    const isS5 = (devType.indexOf('S5') !== -1 || devType.indexOf('S7') !== -1 || devType.indexOf('S3') !== -1)
    switch (devType)
    {
      case 'i8':
        devClassNm = "i8_wifi"
        devWifiImg = require("../../../../static/images/device/img_i8.png")
        break
      case 'freda_plus':
        devClassNm = 'i8_wifi'
        devWifiImg = require("../../../../static/images/device/freda/img-wifi-LS813-T.png")
        break;
      case 'Freda PLUS':
        devClassNm = 'i8_wifi'
        devWifiImg = require("../../../../static/images/device/freda/img-wifi-LS813-T.png")
        break;
      case 'freda':
        devClassNm = 'i8_wifi'
        devWifiImg = require("../../../../static/images/device/freda/img-wifi-LS813-F.png")
        break;
      case 'P1':
        devClassNm = 'i8_wifi'
        devWifiImg = require("../../../../static/images/device/freda/img-wifi-LS813-F.png")
        break;
      case 'Freda':
        devClassNm = 'i8_wifi'
        devWifiImg = require("../../../../static/images/device/freda/img-wifi-LS813-F.png")
        break;
      case 'i2 Pro':
        devClassNm = 'i8_wifi'
        devWifiImg = require("../../../../static/images/device/img_wifi_ls813_ls815.png")
        break;
      case 'i2':
        devClassNm = 'i8_wifi'
        devWifiImg = require("../../../../static/images/device/img_wifi_ls813_ls815.png")
        break;
      default:
        devClassNm = "i5_wifi"
        devWifiImg = require("../../../../static/images/device/img_wifi.png")
    }
    return (
      <div>
        <Title title='配置Wi-Fi'/>
        <div className="specBox" style={{display:isS5 ? 'none':'block'}}>
            <div className="spt">配置Wi-Fi密码</div>
            <div className="spo">长按“{!isI8 ? <img className="search" src={require('../../../../static/images/img_search.png')}/> : "查询"}”3秒，进入配置状态</div>
            <div>若Wi-Fi无密码，请输入0000</div>
            <div className="speGad">
              <img className={devClassNm} src={devWifiImg}/>
            </div>
            <div className="spb" onClick={() => setNext(!next)}>
              <img className="img_r" src={require(next ? "../../../../static/images/device/box_p.png" : "../../../../static/images/device/box_n.png")}/>请确认屏幕
              {isI8 && <span><img className="img" src={require("../../../../static/images/device/icon_zero.png")}/>与</span>}
              <img className="wifi" src={require('../../../../static/images/img_wifi.png')} alt="wifi"/>闪烁中
            </div>
          <div className="pageBottomIn">
            <Button type={next ? "primary" : "default"} onClick={() => configWifi({deviceId, next,experienceFlag, saleModel, isBackDevice})}>下一步</Button >
          </div>
        </div>
        <div className="m-s5-spec-box" style={{display:isS5 ? 'block':'none'}}>
          <img className="s5-top-img" src={require('../../../../static/images/device/s5/img-scale-weight.png')} alt=""/>
          <h3>轻压秤体开机，请在配置状态<br /> ( <img className="wifi" src={require('../../../../static/images/img_wifi.png')} alt="wifi"/>闪烁 ) 下配置</h3>
          {/*{devType.indexOf('S3') !== -1 && <p className="m-s5-tips">若秤体底部有触摸按键 <img src={require('../../../../static/images/device/s5/icon-touchbutton.png')} alt=""/>,请长按3秒进行配置</p>}*/}

          <div className="pageBottom">
            <div className="m-s5-b" onClick={() => setNext(!next)}>
              <img className="img_r" src={require(next ? "../../../../static/images/device/box_p.png" : "../../../../static/images/device/box_n.png")}/>秤体

              <img className="wifi" src={require('../../../../static/images/img_wifi.png')} alt="wifi"/>闪烁中...
            </div>
            <Button type={next ? "primary" : "default"} onClick={() => configWifi({deviceId, next,experienceFlag, saleModel, isBackDevice})}>下一步</Button >
          </div>
        </div>

      </div>
    )
  }

  // _configWiFi() {
  //   const {next, push, params: {id}, configWifi, location: {query: {saleModel}}} = this.props
  //   const {next, params: {deviceId}, isAll, location: {query: {saleModel}}} = this.props
  //   if (!next) {
  //     return
  //   }
  //   configWXDeviceWiFi({
  //     success: () => {
  //       configWifi(id).then(() => {
  //         if (JSON.parse(this.props.isAll)) {
  //           closeWindow()
  //         } else {
  //           push(`/device/${id}/bindRoles`)
  //         }
  //       })
  //     },
  //     fail: () => {
  //       push(`/device/${id}/specFail?saleModel=${saleModel}`)
  //     }
  //   })
  // }
})

