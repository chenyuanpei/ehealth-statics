import React, {Component} from 'react'
import {connect} from 'react-redux'
// components
import Title from '../../../components/common/title/Title'

export default connect(
)(
  class extends Component {
    componentDidMount() {
    }

    render() {
      require('../../../styles/device/i5ota.less')
      return (
        <div className="i5ota">
          <Title title="乐心健康"/>
          <div className="i5ota_page">
            <div className="title">乐心血压计i5/i5S(Wi-Fi版)升级公告</div>
            <div className="context">
              <div className="context_table">
                <img className="context_left icon" src={require('../../../../static/images/device/i5ota/icon-1.png')}/>
                <span className="context_right">问：我的血压计是i5/i5S(Wi-Fi版)，是否需要升级</span>
                <span className="context_right bottom_0">答：当血压计配置WiFi密码成功后，测量完成血压计测量结果显示界面如下图时，可以通过本次升级解决。</span>
              </div>
              <img src={require('../../../../static/images/device/i5ota/img-01.png')}/>
              <div className="context_table">
                <img className="context_left icon" src={require('../../../../static/images/device/i5ota/icon-2.png')}/>
                <span className="context_right">问：操作具体步骤是怎样的，自己就可以完成吗？</span>
                <span className="context_right">答：操作步骤非常简单，用户可自行完成升级。</span>
                <span className="context_right bottom_0">1.根据不同的手机系统，下载对应的升级工具</span>
                <span className="context_right bottom_0">2.手机运行升级工具，一键升级</span>
              </div>
              <img src={require('../../../../static/images/device/i5ota/img-update.png')}/>
              <div className="context_table">
                <img className="context_left icon"
                     src={require('../../../../static/images/device/i5ota/icon-attention.png')}/>
                <span className="context_right bottom_0">iOS用户通过 设置>通用>描述文件与设备管理 找到“High-Flying Electronics Technology Co.,Ltd”，点击“信任”才能运行。</span>
              </div>
              <img src={require('../../../../static/images/device/i5ota/img-ios setting.png')}/>
              <div className="context_btn">
                <img className="btn" onClick={() => this._go('http://www.pgyer.com/fB4z')}
                     src={require('../../../../static/images/device/i5ota/btn-ios tools.png')}/>
                <img className="btn" onClick={() => this._go('https://www.pgyer.com/lifesense_firmware_upgrader')}
                     src={require('../../../../static/images/device/i5ota/btn-android tools.png')}/>
              </div>
            </div>
          </div>
        </div>
      )
    }

    _go(url) {
      window.location.href = url
    }

  })

