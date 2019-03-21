import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// components
import AvatarText from '../../../components/common/Avatar/AvatarText'
import Button from '../../../components/common/button/Button'
import Tab from '../../../components/common/form/Tab'
import InputConFirm from '../../../components/common/dialog/InputConFirm'
import CommonSelect from '../../../components/member/data/CommonSelect'
import Title from '../../../components/common/title/Title'
import CitySelect from '../../../components/doctor/CitySelect'
import Confirm from '../../../components/common/dialog/Confirm'
import Fixed from '../../../components/common/fixed/Fixed'
// utils
import {diseaseFilter} from '../../../util/member/diseaseFilter.js'

// actions
import actions from './actions'
// selector
import selectors from './selectors'


export default connect(
  selectors,
  actions
)(class extends Component {

  componentDidMount() {
    const {init, params} = this.props

    const {doctorId, memberId} = params

    if (!doctorId || !memberId) {
      return
    }
    // 如果query参数有create，那么代表创建新成员
    let member = null
    init({
      doctorId,
      memberId,
      member,
    })
  }
  componentWillUnmount() {
    this.props.clear()
  }
  // 生成头像
  _renderHead() {
    const {member: {headImgurl, sex}} = this.props
    const opts = {
      src: headImgurl,
      sex,
    }
    return (
      <div key="head" className="data_head relation-line">
        <AvatarText className="dataTop" {...opts}/>
      </div>
    )
  }
  render() {
    require('../../../styles/member/memberInfo.less')

    const {member, doctor, sent, status} = this.props

    if (!member || !doctor) {
      return <noscript/>
    }


    return (
      <div
        className="member_info">
        <Title title="关联医生"/>
        {this._renderForm()}
        {this._renderButton()}
        {this._renderDia()}
        {this._renderCommon()}
        {this._renderConfirm()}
      </div>
    )
  }

  // 生成关联医生弹窗
  _renderConfirm() {
    const {doctor, send, isShowConfirm, showConfirm} = this.props
    const buttons = [{
      type: 'default',
      label: '取消',
      onClick: () => {
        showConfirm(false)
      }
    }, {
      type: 'primary',
      label: '确认',
      onClick: () => {
        send({doctorId:doctor.id})
        showConfirm(false)
        // goBack()
      }
    }]
    return (
      <Fixed show={isShowConfirm}>
        <Confirm buttons={buttons} title={'温馨提示'} show={isShowConfirm}>
          <div className="m-confim-text-first">提交关联申请后，医生将对您的申请进行审批。</div>
          <div className="m-confim-text-second">审批通过后，医生可以查看您的个人健康数据，为您提供健康数据监控、在线健康咨询、随访管理等健康服务，但不包括诊断和治疗服务。</div>
        </Confirm>
      </Fixed>
    )
  }


  // 显示表单
  _renderForm() {
    const {
      status,
      areaData,
      member: {name, sex, birthday, idNO, phone, address, sickType},
      location: {query: {create}},
      showSelectDialog,
      showInputDialog
    } = this.props
    const opts = [
      {
        name: '姓名',
        val: name || '必填',
        onClick: status === 2 ? () => this._noClick() : () => showInputDialog({filed: 'name'}),
        noArrImg:status === 2 ? true : false
      }, {
        name: '性别',
        val: this._genderFilter(sex),
        onClick: status === 2 ? () => this._noClick() : () => showSelectDialog({filed: 'sex'}),
        noArrImg:status === 2 ? true : false
      }, {
        name: '出生日期',
        val: this._getBirthday(birthday, idNO),
        onClick: status === 2 ? () => this._noClick() : () => showSelectDialog({filed: 'birthday'}),
        noArrImg:status === 2 ? true : false
      }, {
        name: '手机号码',
        val: phone || '必填',
        onClick: status === 2 ? () => this._noClick() : () => showInputDialog({filed: 'phone'}),
        noArrImg:status === 2 ? true : false
      }, {
        name: '身份证',
        val: idNO || '请填写',
        onClick: status === 2 ? () => this._noClick() : () => showInputDialog({filed: 'idNO'}),
        noArrImg:status === 2 ? true : false
      }, {
        name: '疾病类型',
        val: typeof(sickType) !== 'undefined' ? diseaseFilter(sickType) : '请填写',
        onClick: status === 2 ? () => this._noClick() : () => showSelectDialog({filed: 'sickType'}),
        noArrImg:status === 2 ? true : false
      }, {
        name: '地区',
        val: areaData ? areaData.province + ' ' + areaData.city : '请填写',
        onClick: status === 2 ? () => this._noClick() : () => showSelectDialog({filed: 'areaData'}),
        noArrImg:status === 2 ? true : false
      }, {
        name: '详细地址',
        val: address || '请填写',
        onClick: status === 2 ? () => this._noClick() : () => showInputDialog({filed: 'address'}),
        noArrImg:status === 2 ? true : false
      }]
    return (
      <div>
        {status === 2 && this._renderHead()}
        {create && this._isNewMemberTips()}
        <div className="part_one">
          {!create && this._showNickName()}
          {opts.map((opt, idx) => <Tab key={idx} {...opt} />)}
        </div>
        {status !== 2 && this._isNewBottomTips()}
      </div>
    )
  }
  _isNewBottomTips() {
    const {location: {query: {create}}} = this.props
    let isNewText = '注意：添加新成员并关联医生后，可在个人中心查看该成员的个人信息。'
    let isOldText = '注意：该成员已存在，若修改上述信息，则会更新成员信息。'
    return (
        <div className="m-new-bottom-tips">
          {create ? isNewText : isOldText}
        </div>
    )
  }
  _genderFilter(v) {
    return ['', '男', '女'][v] || '必填'
  }
  _noClick(){
    return false
  }
  _showNickName(){
    const {
      status,
      member: {nickname}
    } = this.props
    return (
      <div className={status !==2 ? "ui-row-flex tab m-nickname-wrap" : "ui-row-flex tab"}>
        <div className="name">昵称</div>
        <div className="ui-col ui-col right">
          <span className="m-tab-val-wrap">{nickname}</span>
        </div>
      </div>
    )
  }
  _isNewMemberTips() {
    return (
        <div className="m-new-member-tips">
          添加新成员并关联医生
        </div>
    )
  }
  // 生成关联医生按钮
  _renderButton() {
    const {doctor, send,watchShowConfirm, status} = this.props
    if(status === 2){
      return (
        <div className="m-tips-relation">该成员的信息已经提交医生审核，请耐心等待医生的审批结果。</div>
      )
    }
    return (
      <div className="pageBottomIn">
        <Button className="save_btn"
                onClick={() => watchShowConfirm()}>
          {`关联【${doctor.name}】医生`}
        </Button>
      </div>
    )
  }

  // 生成弹出输入框
  _renderDia() {
    const {member, inputDialogOptions: {filed, validation, ...inputDialogOptions}, showInputDialog, changeMember} = this.props

    const options = {
      ...inputDialogOptions,
      onClick: (val) => {
        if (validation && validation(val) === false) {
          return
        }

        changeMember({
          ...member,
          [filed]: val
        })
      },
      onClose: () => {
        showInputDialog({close: true})
      }
    }

    return (
      <InputConFirm {...options}/>
    )
  }

  // 生成滚动选择
  _renderCommon() {
    const {selectDialogOptions: {filed, ...selectDialogOptions}, member, showSelectDialog, changeMember,changeArea} = this.props
    const options = {
      ...selectDialogOptions,
      onConfirm: (val) => {
        showSelectDialog({close: true})
        if(filed === 'areaData'){
          let provinceId = val[0].id
          let cityId = val[1].id
          changeMember({
            ...member,
            province: provinceId,
            city:cityId
          })
          changeArea({
            province:val[0].name,
            city:val[1].name
          })
        }else{
          changeMember({
            ...member,
            [filed]: val
          })
        }

      },
      onCancel: () => {
        showSelectDialog({close: true})
      },

    }
    console.log('33333333333333',options)
    return (
      filed !== 'areaData' ? <CommonSelect {...options} /> : <CitySelect {...options}/>
    )
  }

  // 根据身份证截取出身年月日
  _getBirthday = (birthday, idNO) => {
    return birthday ? moment(birthday).format('YYYY-MM-DD') : (
      /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(idNO) ? idNO.substr(6, 8).replace(/(.{4})(.{2})/, "$1-$2-") : '必填'
    )
  }

})
