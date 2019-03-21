import React, {Component, PropTypes} from 'react'
// components
import NoData from '../../../components/common/NoData'
import Title from '../../../components/common/title/Title'

export default class payErro extends Component {

  render() {
    require('../../../styles/device/deviceInfo.less')
    const ele = (
      <div className="expireTBox">
        <span>你可以：</span>
        <span>
          <p>1、在公众号输入框回复“0”即可为你接入微信客服</p>
        </span>
        <span>
          <p>2、直接拨打官方服务电话400-600-2323咨询</p>
        </span>
      </div>
    )

    return (
      <div>
        <Title title='血压流量续费'/>
        <NoData image={require('../../../../static/images/noData/bg_profile_payerro.png')} warning="血压计流量续费失败。"
                text={ele}/>
      </div>

    )
  }
}

