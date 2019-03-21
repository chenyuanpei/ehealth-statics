import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// utils
import {calc} from '../../../util/setFontSize'
// selector
import selectors from './selectors'
// actions
import actions from './actions'
// const
import {protocol, hostname} from '../../../config'
// components
import CenterTop from '../../../components/member/center/CenterTop'
import CenterTab from '../../../components/member/center/CenterTab'
import Title from '../../../components/common/title/Title'
import AvatarText from '../../../components/common/Avatar/AvatarText'
export default connect(
  selectors,
  actions
)(class extends Component {

  componentDidMount() {
    const {init} = this.props
    init()
  }

  render() {
    require('../../../styles/member/update.less')
    const {account} = this.props
    const {nickname, headImgurl} = account || {}
    return (
      <div className="member_data">
        <Title title="设置管理员"/>
        <div className="m-update-text">
            <center>服务升级啦！</center>
            <dl>
              <dt>将自己设置为管理员可享用以下更健全的服务！</dt>
              <dd>1:便于开通后期相关的运动数据权限</dd>
              <dd>2:成为管理员，将帮助您更好的管理家庭成员</dd>
            </dl>
        </div>
        <div className="m-update-list">
          <ul>
            <li onClick={() => this._pushCreateMember()} className="m-update-box-add">
                <div className="m-update-box-top">
                  创建的成员中还没有自己？
                </div>
                <div className="m-update-box-bottom">
                  点击创建，并设置为管理员
                </div>
            </li>
            <li onClick={() => this._pushChooseAccount()} className="m-update-box-choose">
                <div className="m-update-box-top">
                  创建的成员中已有自己？
                </div>
                <div className="m-update-box-bottom">
                  点击选取自己成为管理员
                </div>
            </li>
          </ul>
        </div>

      </div>
    )
  }
  _pushCreateMember(){
    this.props.push(`Member/create?memberType=0&mergeaccount=1`)
  }
  _pushChooseAccount(){
    this.props.push(`center/chooseaccount`)
  }

})
