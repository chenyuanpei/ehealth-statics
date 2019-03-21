import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {genderFilter} from '../../../util/member/genderFilter'
import moment from 'moment'
import {closeWindow} from '../../../util/wxJs/wxApi'
// components
import Title from '../../../components/common/title/Title'
import Button from '../../../components/common/button/Button'
import Tab from '../../../components/common/form/Tab'
import CommonSelect from '../../../components/member/data/CommonSelect'
import InputConFirm from '../../../components/common/dialog/InputConFirm'
// selectors
import selectors from './selectors.js'

// const
import {hostname, protocol} from '../../../config'
// actions
import actions from './actions.js'
//  import {getAccount} from '../../../action
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
class MemberInfo extends Component {
  static defaultProps = {
    account: {}
  }

  componentDidMount() {
    const {init,location:{query:memberId}} = this.props
    init(memberId)
  }
  // 生成
  _renderPart1() {
    const {member} = this.props
    const {nickname, sex, birthday, height,phone} = member || {}
    var opts = [{
      name: '昵称',
      val: nickname,
      onClick: () => this._showEdit('nickname')
    }, {
      name: '性别',
      val: genderFilter(sex),
      onClick: () => this._showSelect('sex')
    }, {
      name: '出生',
      val: birthday ? moment(birthday).format('YYYY-MM-DD') : '请选择',
      onClick: () => this._showSelect('birthday')
    },{
      name: '身高',
      val: height ? `${height}cm` : '请选择',
      onClick: () => this._showSelect('height')
    },{
      name: '手机',
      val: phone,
      onClick: () => this._showEdit('phone')
    }]

    return (
      <div key="part1" className="m-part-list">
        {opts.map((opt, idx) => <Tab key={idx} {...opt}/>)}
      </div>
    )
  }
  // 生成保存按钮
  _renderSave() {
    return (
      <div key="save" className="pageBottom">
        <Button onClick={() => this._saveMember()}>保存</Button>
      </div>
    )
  }
  // 生成弹出输入框
  _renderDia() {
    const {member, editShow, filed, showEdit, changeMember} = this.props

    const def = {
      onClick: (val) => {
        if (filed === 'nickname') {
          if (!val || !val.trim().length) {
            toast('请填写昵称...')
            return
          }
          // if (getByteLen(val) > 10) {
          // toast('不能超过5个汉字或10个英文字母')
          if (val.trim().length > 5) {
            toast('不能超过5个汉字或5个英文字母')
            return
          }

        }

        changeMember({...member, [filed]: val})
      },
      onClose: () => {
        showEdit({show: false, filed: null})
      },
      type: 'text',
      value: member[filed],
      pattern: '/^[A-Za-z0-9]*$/'
    }
    const opts = {
      nickname: {
        maxLength: 5,
        title: '昵称',
        ...def
      },
      phone :{
        maxLength:20,
        title:'手机',
        ...def
      }
    }

    return (
      <InputConFirm key="input" show={editShow} {...opts[filed]} />
    )
  }
  // 生成身高、体重、腰围选择框
  _renderCommon() {
    const {member, selectShow, filed, showSelect, changeMember} = this.props
    const options = {
      onConfirm: (val) => {
        // if (filed === 'sex' && member.headImgurl.startsWith(baseUrl + '/static/images/')) {
        //   member.headImgurl = defMembers[val].headImgurl
        // }

        changeMember({...member, [filed]: val})
        showSelect({show: false, filed: null})
      },
      onCancel: () => showSelect({show: false, filed: null}),
      value: member[filed],
      type: filed
    }
    return (
      <CommonSelect key="select" show={selectShow} {...options}/>
    )
  }
  // 显示编辑框
  _showEdit(filed) {
    this.props.showEdit({show: true, filed})
  }
  // 显示选择框
  _showSelect(filed) {
    this.props.showSelect({show: true, filed})
  }
  // 保存成员
  _saveMember() {
    const {save,params: {deviceId},member} = this.props
    if (!member.nickname || !member.nickname.trim().length) {
      toast('请填写昵称...')
      return
    }
    if (!member.sex) {
      toast('请填写性别...')
      return
    }
    if (!member.birthday) {
      toast('请填写出生年月...')
      return
    }
    if (!member.height) {
      toast('请填写身高...')
      return
    }
    save(deviceId)
  }
  render() {
    const {member,resultShow} = this.props
    require('../../../styles/organization/memberInfo.less')
    return (
      <div>
        <div className="m-member-info-wrap" style={{display:resultShow ? 'none':'block'}}>
          <Title title='完善信息'/>
          <div className="m-member-info-wrap">
            <div className="m-member-top-img">

            </div>
            <div className="m-member-tips">
              准确填写个人信息，可获得更全面的身体数据。
            </div>
            {this._renderPart1()}
            {member && this._renderCommon()}
            {this._renderSave()}
            {member && this._renderDia()}
          </div>
        </div>
        {this._renderResult()}
      </div>
    )
  }
  _renderResult() {
    const {resultShow,params: {deviceId},location:{query:{privateType}}} = this.props

    return (
      <div className="m-member-result-wrap"  style={{display:resultShow ? 'block':'none'}}>
          <div className="m-result-img">

          </div>
        <div className="m-result-text">
          <p>信息提交成功</p>
          <p>返回首页，赤脚上秤即可收到体重数据哦。</p>
          <p style={{display:privateType === '1' ? 'none': 'block'}} onClick={() => this._goWorkbook(`${protocol}//${hostname}/healthbase/#!/healthy/workbook?device=tizhicheng`, '操作指南')} className="m-color-blue">查看体脂秤使用介绍 <span className="m-arrow"></span></p>
        </div>
        <div key="save" className="pageBottom m-result-btn-wrap">
          <Button onClick={() => this._closeWindow()}>返回首页</Button>
          <Button onClick={() => this._goWorkbook(`${protocol}//${hostname}/health/#/device/${deviceId}`)}>查看设备状态</Button>

        </div>
      </div>
    )
  }
  _closeWindow() {
    closeWindow()
  }
  _goWorkbook(url) {
    window.location.href = url
  }
}
import {debug} from '../../../util/common'
export default connect(
  debug(
    selectors
  ),
  actions
)(MemberInfo)
