import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import Button from '../../../components/common/button/Button'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(
  class extends Component {

    componentDidMount() {
      const {loadData, params: {id, hardwareVersion, softwareVersion, deviceId}} = this.props
      loadData({id, hardwareVersion, softwareVersion, deviceId})
    }

    render() {
      require('../../../styles/device/upgrade.less')
      const {describe} = this.props
      if (describe) {
        return (
          <div className="upgradePage">
            <Title title="乐心健康"/>
            <div dangerouslySetInnerHTML={{__html: describe}}/>
            <div className="userInformation">
              <div>用户须知</div>
              <div>感谢您使用乐心健康公众号！</div>
              <div>本服务由广东乐心医疗电子股份有限公司（以下简称“乐心”）提供。</div>
              <div className="context">
                <ol>
                  <li>为了更好地增进用户体验、完善服务内容，乐心将不断努力开发新的服务内容，并为您及时推送相关提示信息（包括但不限于页面公告，或系统弹出更新信息等提示，下同）。</li>
                  <li>为了进一步提升用户体验质量，并保证服务的安全性和功能一致性，乐心将不定期对服务内容进行修改、替换、升级，并为您及时推送相关提示信息。</li>
                  <li>如果您不同意或者不接受乐心提供的任何服务建议或者上述服务相关内容的修改、替换、升级，请您直接拒绝、停止使用，否则，视为您同意并接受乐心提供的相关服务内容信息。</li>
                </ol>
              </div>
            </div>
            {this._renderBtn()}
          </div>
        )
      } else {
        return (
          <div></div>
        )
      }
    }

    _renderBtn() {
      const {agree} = this.props
      if (!agree) {
        return (
          <div className="pageBottom">
            <Button onClick={() => this._setOtaOpinion(true)}>同意并更新</Button>
          </div>
        )
      }
      return (
        <div className="pageBottom btn">
          <Button>你已同意固件升级</Button>
        </div>
      )
    }

    _setOtaOpinion(agree) {
      const {setOtaOpinion, params: {id, hardwareVersion, softwareVersion, deviceId}, push} = this.props
      setOtaOpinion({id, hardwareVersion, softwareVersion, deviceId, agree})
      push(`device/upgradeStatus/updating`)
    }

  })

