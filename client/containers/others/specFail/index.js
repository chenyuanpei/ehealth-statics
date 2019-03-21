import React, {Component} from 'react'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'
// components
import Button from '../../../components/common/button/Button'

export default connect(
  null,
  {
    goBack
  }
)(class extends Component {

  render() {
    require('../../../styles/page/specFail.less')
    return (
      <div className="specFail">
        <div className="sfS"><img src={require('../../../../static/images/device/img-configuration-failed.png')}/></div>
        <h3>让我们一起找到解决方法吧</h3>
        <div className="specFailList">
          <div className="specFailTi" data-line="1">设备的配置状态是否激活？</div>
          <div className="specFailCo">
            <div className="rent"><img src={require('../../../../static/images/icon_fail_black.png')}/></div>
            <div className="rentText">激活设备的配置状态，当
              <img
                className="wifi" src={require('../../../../static/images/img_wifi.png')}/>闪烁时再试。
            </div>
          </div>
        </div>
        <div className="specFailList">
          <div className="specFailTi" data-line="2">Wi-Fi密码是否正确？</div>
          <div className="specFailCo">
            <div className="rent"><img src={require('../../../../static/images/icon_fail_black.png')}/></div>
            <div className="rentText">请输入正确的Wi-Fi密码。</div>
          </div>
        </div>
        <div className="specFailList">
          <div className="specFailTi" data-line="3">路由器网络频率是否可用？</div>
          <div className="specFailCo">
            <div className="rent"><img src={require('../../../../static/images/icon_fail_black.png')}/></div>
            <div className="rentText">若手机连接了5GHz频率的Wi-Fi网络，请更改路由器工作频率为2.4GHz。</div>
          </div>
          <div className="specFailCo">
            <div className="rent"><img src={require('../../../../static/images/icon_fail_black.png')}/></div>
            <div className="rentText">配置密码时，需确认路由器没有开启防火墙限制，路由器配置密码一定不能关闭路由器的广播ssid。且不能开启MAC过滤地址。</div>
          </div>
        </div>
        <div className="specFailList">
          <div className="specFailTi" data-line="4">微信版本过低？</div>
          <div className="specFailCo">
            <div className="rent"><img src={require('../../../../static/images/icon_fail_black.png')}/></div>
            <div className="rentText">请升级到最新版本。</div>
          </div>
        </div>
        <div className="specFailList">
          <div className="specFailTi" data-line="5">请联系我们，一定尽快为您解决</div>
          <div className="specFailCo">
            <div className="rent"><img src={require('../../../../static/images/icon_fail_black.png')}/></div>
            <div className="rentText">登录『乐心健康』公众号咨询</div>
          </div>
          <div className="specFailCo">
            <div className="rent"><img src={require('../../../../static/images/icon_fail_black.png')}/></div>
            <div className="rentText">客服热线：400-6002323</div>
          </div>
        </div>
        {this._onNext()}
      </div>
    )
  }

  _onNext() {
    return (
      <div className="pageBottomIn">
        <Button onClick={() => this.props.goBack()}>重试</Button>
      </div>
    )
  }
})
