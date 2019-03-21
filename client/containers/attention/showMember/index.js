import React, {Component} from 'react'
import {connect} from 'react-redux'
import Title from '../../../components/common/title/Title'
// util
import {debug} from '../../../util/common'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  render() {
    require('../../../styles/attention/showMember.less')
    const {account, name, qrcode} = this.props
    return (
      <div className="show_member">
        <Title title="邀请关注"/>
        <div className="show_text">
          <div>{`【${account}】向你共享成员`}</div>
          <div>{`"${name}"的测量记录`}</div>
        </div>
        <div className='qrcode'>
          <div className="img">
            <img src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${qrcode}`}/>
          </div>
          <div className="text warn">长按图片识别图中二维码<br/>二维码1小时内有效</div>
        </div>
      </div>
    )
  }
})
