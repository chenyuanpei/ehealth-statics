import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components

import Title from '../../../components/common/title/Title'
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
    require('../../../styles/page/agreement.less')
    return (
      <div>
        <Title title='乐心健康实验室使用协议'/>
        {this._renderContent()}

      </div>
    )
  }
  _renderContent() {
    return (
      <div className="m-laboratory-agreement-panel">
          <h3>亲爱的用户，您好！</h3>
          <h3>欢迎您使用乐心健康实验室。</h3>
          <h4 className="m-font-bold m-padding-top-30">在使用乐心健康实验室前（以下简称“本产品”），请您务必仔细阅读以下条款，如您不同意全部或任一部分的条款，您将不能且不应使用本产品提供的服务。
          </h4>
          <ul>
            <li className="m-font-bold m-padding-top-30">
              1. 服务说明</li>
            <li className="m-font-bold m-padding-bottom-30">本产品将为您提供包括但不限于以下服务：</li>
            <li><div className="m-num">1.1 </div><div>根据您的健康情况和生活、工作情况，判断您的健康水平，并给出相应的改善建议；</div></li>
            <li><div className="m-num">1.2 </div><div>根据您的健康情况和生活、工作情况，为您推荐您可能感兴趣的科普文章和资讯内容；</div></li>
            <li><div className="m-num">1.3 </div><div>根据您的健康情况和生活、工作情况，提醒您在生活和工作中应该注意的事项；</div></li>
            <li className="m-padding-bottom-30"><div className="m-num">1.4 </div><div>根据根据您的健康情况和生活、工作情况，为您生成符合你情况的健康报告;</div></li>
            <li className="m-font-bold m-padding-top-30 m-padding-bottom-30">除以上服务外，乐心将会不定时修改、调整、增加或删减提供本产品的服务内容，若您继续使用本产品，视为您同意乐心对本产品服务内容的以上修改、调整、增加或删减，同时该同意并接受的行为仍受本协议约束。
            </li>
            <li className="m-font-bold m-padding-bottom-30 m-padding-top-30">2. 服务使用规则</li>
            <li><div className="m-num">2.1 </div><div>在使用或开启本产品实验性功能期间，您可以体验乐心健康实验性功能及相应服务;</div></li>
            <li className="m-padding-bottom-30"><div className="m-num">2.2 </div><div>本产品的部分功能因需将默认由系统自动设置为开启或关闭，您可以在相应界面自行关闭或启用。</div></li>
            <li className="m-font-bold m-padding-top-30">3. 数据使用授权 </li>
            <li className="m-padding-top-30"><div className="m-num">3.1</div>您在此授权乐心收集、使用您注册时填写的个人资料 (如昵称、 头像、性别、年龄等)，以及通过测量设备上传到乐心后台的个人体征数据 (如血压值、心率等数据)。</li>
            <li><div className="m-num">3.2</div>乐心尊重并保护您的个人隐私权，除经您明确同意，或根据相关法律、法规的强制性规定须披露外，乐心不会主动地披露、转让或提供给第三方。</li>
            <li><div className="m-num">3.3</div>乐心将按照行业标准合理审慎地采取必要技术措施保护您的数据安全，但是您承认和同意乐心并不能就此提供完全保证。</li>
            <li className="m-padding-bottom-30"><div className="m-num">3.4</div>由于您的自身行为以及不可抗力等情形,导致上述可能涉及您隐私或您认为是隐私信息的内容发生被泄露、披露，或被第三方获得、使用、转让等情形的，均由您个人承担不利后果，乐心不承担任何责任。</li>
            <li className="m-font-bold m-padding-top-30">4. 知识产权声明</li>
            <li className="m-padding-top-30">本软件产品，乐心及其许可人拥有完全的知识版权。您在遵守法律、法规、政策及本协议的前提下，可依本协议使用本软件。您无权也不得实施包括但不限于下列行为：</li>
            <li><div className="m-num">(1)</div>删除本软件中的任何版权声明或提示以及任何其他信息、内容。</li>
            <li><div className="m-num">(2)</div>对本软件进行反向工程、反向汇编、反向编译等。</li>
            <li><div className="m-num">(3)</div>对本协议规定的条款之外，使用、复制、修改、租赁或转让本软件或其中的一部分。</li>
            <li><div className="m-num">(4)</div>向第三人提供本软件，许可他人使用本软件或将本软件用于乐心禁止的目的 (如商业目的等)。</li>
            <li><div className="m-num">(5)</div>对本软件的图像、文字等相关信息，擅自实施包括但不限于下列行为：使用、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点、擅自借助本软件发展与之有关的的衍生产品、作品及服务等。</li>
            <li><div className="m-num">(6)</div>利用本软件储存、发表、传播违反国家法律、法规以及国家政策规定的内容。</li>
            <li><div className="m-num">(7)</div>利用本软件存储、发表、传播侵害他人知识产权、商业秘密等合法权利的内容。</li>
            <li className="m-padding-bottom-30"><div className="m-num">(8)</div>进行危害计算机网络安全的行为。</li>
            <li className="m-font-bold m-padding-top-30">5. 风险告知及免责声明</li>
            <li className="m-padding-top-30"><div className="m-num">5.1</div>由于现有技术本身的局限性，使用本产品可能会影响您对乐心健康公众号的正常使用，乐心会尽力改善此缺陷，但无义务对此进行担保。</li>
            <li><div className="m-num">5.2</div>乐心有权自行确定、更改、调整可以使用本产品的用户名单和范围，有权随时中止、终止向您提供本产品。在停止提供本产品后，您仍然可以使用已经发布的正式版乐心健康的已有功能，但乐心并不承诺本产品内实验性功能及服务的全部或部分必然会应用于正式版乐心健康中。</li>
            <li><div className="m-num">5.3</div>由于现有技术本身的局限性，本产品部分实验性功能下线或者未出现在正式版乐心健康中，会导致该部分功能不可用或数据丢失，乐心对此不承担任何责任。</li>
            <li><div className="m-num">5.4</div>因黑客入侵、网络状况、通讯线路、第三方网站或服务商等任何原因而导致您不能正常使用本产品的，乐心不承担任何法律责任。</li>
            <li><div className="m-num">5.5</div>基于本产品呈现的所有数据或结果，仅供参考，不建议以此作为医疗、健康状况的正规依据。否则，由此产生的任何风险或事故，乐心不承担任何责任。</li>
            <li className="m-company-name">乐心健康</li>
          </ul>


      </div>
    )

  }

})

