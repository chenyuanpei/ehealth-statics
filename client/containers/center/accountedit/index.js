import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'
// components
import InputConFirm from '../../../components/common/dialog/InputConFirm'
import AvatarText from '../../../components/common/Avatar/AvatarText'
import Tab from '../../../components/common/form/Tab'
import Title from '../../../components/common/title/Title'
// selectors
import selectors from './selectors.js'
// actions
import actions from './actions.js'
//  import {getAccount} from '../../../actions/api/account/getAccount'
//  import {editAccount, editHeadimg} from '../../../actions/api/account/editAccount'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
class MemberEdit extends Component {
  static defaultProps = {
    account: {}
  }

  componentDidMount() {
    const {init} = this.props
    init()
  }

  render() {
    require('../../../styles/member/data.less')
    const {account, showEdit} = this.props
    const {nickname, headImgurl} = account || {}
    return (
      <div className="member_data">
        <Title title='个人信息'/>
        <div className="data_head">
          <AvatarText src={headImgurl} tip={require('../../../../static/images/icon_camera.png')} className="dataTop"
                      onClick={() => this._editHeadImg()}/>
        </div>
        <Tab name="昵称" style={{borderBottom: '1px solid #E7E7E7'}} val={nickname}
             onClick={() => showEdit(true)}/>
        {this._renderDel()}
      </div>
    )
  }

  _renderDel() {
    const {account, updateNickName, goBack, showEdit, isShow} = this.props
    const {nickname} = account || {}
    const opts = {
      onClick: (val) => {
        if (!val || !val.trim().length) {
          toast('昵称不能为空！')
          return
        }
        if (val.trim().length > 5) {
          toast('不能超过5个汉字或5个英文字母')
          return
        }
        // this.setState({showEdit: false})
        showEdit(false)
        updateNickName(val)
      },
      maxLength: 5,
      value: nickname,
      onClose: () => {
        showEdit(false)
      },
    }
    return (
      <InputConFirm title="昵称" show={isShow} {...opts}/>
    )
  }

  // 修改头像
  _editHeadImg() {
    const {editHeadImg} = this.props
    editHeadImg()
  }
}
import {debug} from '../../../util/common'
export default connect(
  debug(
    selectors
  ),
  actions
)(MemberEdit)
