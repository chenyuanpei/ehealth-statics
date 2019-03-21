import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import ScrollView from '../../../components/common/scroll/ScrollView'
// util
import {debug} from '../../../util/common'
// components

import Title from '../../../components/common/title/Title'
import Button from '../../../components/common/button/Button'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
// toast

export default connect(
  debug(selectors),
  actions
)(class extends Component {


  componentDidMount() {
    const {loadData} = this.props
    loadData()
  }

  render() {
    require('../../../styles/doctor/agreement.less')
    return (
      <div>
        <Title title='用户协议'/>
        {this._renderContent()}

      </div>
    )
  }
  _renderContent() {
    const {replace,location:{query:{doctorId,id}}} = this.props
    return (
      <div className="m-agreement-panel">
        <ScrollView>
          <h3>乐心健康-医生工作室院后管理服务用户协议</h3>
          <ul>
            <li>

              特别提醒用户认真阅读本《用户购买协议》(下称《协议》) 中各条款。无论您是否事先阅读该协议，一旦您付款成功购买该服务，则将视为对本《协议》的接受，并同意接受本《协议》各项条款的约束。</li>
            <li>一、	服务内容说明：</li>
            <li>本服务主要针对出院后的患者，由福州乐医成信息服务技术有限公司（以下简称乐医成）联合福建当地的医学专家为患者提供院后康复管理服务，主要服务包含健康数据的监控与主动干预，3小时内不限次的在线咨询服务。</li>
            <li>二、	服务提供方</li>
            <li>本服务中，医生服务由乐医成合作医院的医生团队提供。</li>
            <li>三、	服务生效、终止及续费</li>
            <li>（1）服务生效：用户在支付费用购买本服务后，收到购买成功的短信提醒，即可在公众号内，向提供服务的医生团队进行咨询，在医生回复用户的问题之后，三小时之内，用户可以不限次免费的进行咨询。 </li>
            <li>（2）终止：在医生回答用户的第一个问题的三个小时之后，该服务自动终止。</li>
            <li>（3）续费：用户如需继续接受服务，则可重新在购买页面进行购买操作，不能直接续费。</li>
            <li>四、	退款声明</li>
            <li>请在购买本服务前，仔细阅读服务内容，本服务暂不提供用户主动申请的线上退款服务，如用户在提问之后的24小时内，没有医生进行应答，购买服务的费用将在1-5个工作日内返还到用户的支付账户（银行卡或者微信零钱两种方式）中。</li>
            <li>五、	隐私声明</li>
            <li>本服务涉及到的用户资料和数据，仅提供给关联的医生团队查阅，不会对外公开或者作为其他用途。</li>
            <li>六、	免责声明</li>
            <li>（1）在线医生为用户提供的医生答复、医生建议、医疗保健信息等，不代表乐医成公司的立场。</li>
            <li>（2）该服务咨询仅限于和医生之间保持联系沟通，不能作为治疗或诊断。如果需要医疗求助，应前往医院及时就诊。</li>
            <li> (3)由于用户自身过失导致账户密码泄露，或用户将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人信息泄漏或财产损失，或其他非乐医成公司、团队医生原因导致的个人信息泄漏或财产损失，与乐医成公司及团队医生无关。</li>
            <li>（4）因不可抗力、网络状况、通讯线路、用户自身过错等技术原因，或其他不可控原因导致您不能正常使用院后管理服务，乐医成不承担相应责任。</li>
            <li>七、	协议修改</li>
            <li>乐医成公司保留根据业务需要修改本协议的权利，请您在每次购买前，详细阅读本协议的各项条款。</li>
            <li>八、	争议解决方式</li>
            <li>本协议的订立、执行、终止、解释及争议的解决，均适用中华人民共和国法律。因本协议产生的或与本协议有关的全部争议，乐医成和用户应先通过友好协商方式予以解决；若未解决的，任何一方有权向乐医成公司注册地人民法院提起诉讼。　</li>
          </ul>

        </ScrollView>
        <div className='pageBottom'>
          <Button onClick={()=>{
            replace('/doctorTeam/preServiceBuy?doctorId='+ doctorId + '&id='+id+'&check=1')
          }}>我已了解并同意</Button>
        </div>
      </div>
    )

  }

})

