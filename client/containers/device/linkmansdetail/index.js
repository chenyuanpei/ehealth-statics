import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
import {goBack} from 'react-router-redux'
import {createSelector} from 'reselect'
// components
import Tab from '../../../components/common/form/Tab'
import InputConFirm from '../../../components/common/dialog/InputConFirm'
import Button from '../../../components/common/button/Button'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
import Title from '../../../components/common/title/Title'
// selectors
import selectors from './selectors'
// actions
import actions from './actions'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    // 根据id获取成员资料
    const {params, getLinkman} = this.props
    getLinkman(params.linkmanId)
  }

  render() {
    require('../../../styles/device/linkmansDetail.less')
    require('../../../styles/member/memberBtn.less')
    const {linkman} = this.props
    let name = linkman && linkman.name
    let mobile = linkman && linkman.mobile
    let relation = linkman && linkman.relation
    return (
      <div className="linkmans_detail">
        <Title title='一键呼叫联系人信息'/>
        <Tab name="姓名" val={name} onClick={() => this._showEdit('name')}/>
        <Tab name="手机" val={mobile} onClick={() => this._showEdit('mobile')}/>
        <Tab name="家庭关系" val={relation} onClick={() => this._showEdit('relation')}/>
        {this._renderSave()}
        {this._renderDia()}
      </div>
    )
  }

  // 生成弹出输入框
  _renderDia() {
    const {filed, setShowEdit, setFiled, showEdit, linkman, setLinkman} = this.props
    const def = {
      onClick: (val) => {
        if (filed === 'mobile' && (!val || !/^\d{11}$/.test(val))) {
          toast('请输入11位手机号码！', {icon: 'warn'})
          return
        }
        linkman[filed] = val
        setShowEdit(false)
        setFiled('')
        setLinkman(linkman)
      },
      pattern: '/^[A-Za-z0-9]*$/',
      value: linkman[filed] === '请输入' ? '' : linkman[filed]
    }
    const opts = {
      name: {
        maxLength: 10,
        title: '姓名',
        ...def
      },
      mobile: {
        maxLength: 11,
        title: '手机',
        ...def
      },
      relation: {
        maxLength: 10,
        title: '家庭关系',
        ...def
      }
    }
    return (
      <InputConFirm show={showEdit} {...opts[filed]}/>
    )
  }

  // 显示编辑框
  _showEdit(filed) {
    const {setFiled, setShowEdit} = this.props
    setFiled(filed)
    setShowEdit(true)
  }

  // 生成保存按钮
  _renderSave() {
    const {saveLinkman, params: {linkmanId, deviceId}, linkman} = this.props
    const onClick = () => {
      if (!linkman.name || !linkman.name.trim().length) {
        toast('请填写姓名...')
        return
      }
      if (!linkman.mobile || !/^\d{11}$/.test(linkman.mobile)) {
        toast('请输入11位手机号码！', {icon: 'warn'})
        return
      }
      if (!linkman.relation || !linkman.relation.trim().length) {
        toast('请填写关系...')
        return
      }
      const isCreate = linkmanId === 'create'
      saveLinkman({isCreate, deviceId, linkman})
    }
    return (
      <div className="pageBottom">
        <Button onClick={onClick}>保存</Button>
      </div>
    )
  }
})
