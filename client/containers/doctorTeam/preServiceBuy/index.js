import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import Tab from '../../../components/preoperative/Tab'
import Count from '../../../components/preoperative/Count'
import Tab2 from '../../../components/preoperative/Tab2'
import InputConFirm from '../../../components/common/dialog/InputConFirm'
import CommonSelect from '../../../components/member/data/CommonSelect'
import BindRole from '../../../components/common/dialog/BindRole'
import Button from '../../../components/common/button/Button'
import Alert from '../../../components/common/dialog/Alert'
import Confirm from '../../../components/common/dialog/Confirm'
import {defMembers} from '../../../const/member'
import ScrollView from '../../../components/common/scroll/ScrollView'
// store
import store, {select} from '../../../store'

// utils
import {genderFilter} from '../../../util/member/genderFilter'

// toast
import {toast} from '../../../components/common/toast/PubSubToast'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

import {routingSelector} from '../../../selectors/routing'

export default connect(
  selectors,
  actions
)(class extends Component{
  static defaultProps={

  }

  state = {
    showMember:false,
    check:false,
    showAlert:false,
    alertText:'',
  }

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const {init,location:{query:{check,id,doctorId}}} = this.props
   this.setState({
      check:check
    })
    init({doctorId,id})
  }

  componentWillUnmount() {
    localStorage.removeItem('doctorTeamBuyMemberId')
  }


  render(){
    require('../../../styles/doctor/buy.less')


    return (
      <div>
        <div className="preoperative">
          <Title title="购买院后管理服务"></Title>
          <h3 className="pre-title">请准确填写以下信息：</h3>
          {this._renderPart2()}
          {this._renderPart1()}
          {this._renderBindRole()}
          {this._renderCommon()}
          {this._renderDia()}
          {this._renderTips()}
          {this._renderPayTips()}
          {this._renderButton()}
          {this._renderAlert()}
        </div>
      </div>
    )
  }

  // 生成菜单一
  _renderPart1() {
    const {goods} = this.props
    const {price} = goods || {}




    var opts = [{
      name: '服务价格',
      val: '¥'+price + '/次',
      nameStyle: 'total',
    }]

    // var opts2 = {
    //   name: '服务时间范围',
    //   val: startDate ? moment(startDate).format('YYYY-MM-DD') : '',
    //   val2: endDate ? moment(endDate).format('YYYY-MM-DD') : '',
    //   //onClick:() => this._showSelect('startDate'),
    //   //onClick2:() => this._showSelect('endDate'),
    // }
    return (
      <div key="part1" className="part_2">
        {opts.map((opt, idx) => <Tab key={idx} {...opt}/>)}
        {/*<Tab {...optsName}></Tab>*/}
        {/*<Tab {...optsPerPrice}>*/}
          {/*/!*<Count maxValue="5" minValue="1" value={serviceday} reduceClick={() => this._reduceClick()} addClick={() => this._addClick()} name="天"></Count>*!/*/}
        {/*</Tab>*/}
        {/*<Tab {...optsPrice}></Tab>*/}


        {/*<Tab2 {...opts2} />*/}
      </div>
    )
  }
  _reduceClick() {
    const {patientInfo,changePatientInfo} = this.props
    const {serviceday} = patientInfo
    if(serviceday > 1){
      changePatientInfo({...patientInfo, serviceday: serviceday-1})
    }
  }
  _addClick() {
    const {patientInfo,changePatientInfo} = this.props
    const {serviceday} = patientInfo
    if(serviceday < 5){
      changePatientInfo({...patientInfo, serviceday: serviceday+1})
    }
  }
  _handleChange(event){
    const {changePatientInfo,patientInfo} = this.props
    changePatientInfo({
      ...patientInfo,
      remark:event.target.value
    })

  }
  // 生成菜单二
  _renderPart2() {
    const {patientInfo,account,members} = this.props
    const {sex,id,nickname,name,age,phone} = patientInfo

    //console.log(members)
    //console.log(account)

    var opts = [{
      name: '选择患者',
      val: nickname+(account&&account.id==id?'(主账号)':''),
      isArrow: true,
      nameStyle:'nickname',
      onClick: ()=> {this.setState({showMember:true})}
    }, {
      name: '患者姓名',
      val: name?name:'请填写',
      isArrow: true,
      nameStyle: !name ? '' : 'name',
      onClick: () => this._showEdit('name')
    }, {
      name: '手机号码',
      val: phone?phone:'请填写',
      isArrow: true,
      nameStyle: !phone ? '' : 'phone',
      onClick: () => this._showEdit('phone')
    }, {
      name: '患者性别',
      val: genderFilter(sex),
      nameStyle: !sex ? '' : 'sex',
      onClick: () => this._showSelect('sex'),
      isArrow: true,
    }, {
      name: '患者年龄',
      val: age ? age : '请填写',
      nameStyle: !age ? '' : 'age',
      onClick: () => this._showEdit('age'),
      isArrow: true,
    }]
    return (
      <div key="part2" className="part_one">
        {opts.map((opt, idx) => <Tab key={idx} {...opt}/>)}
        <div className="m-textarea-box">
          <div className="m-textarea-name">
            备注信息
          </div>
          <textarea className="m-textarea" maxLength="100" onChange={this._handleChange.bind(this)} placeholder="请在此填写您的出院病情信息。如：15床，5月12号出院胸腔积液"></textarea>
        </div>
      </div>
    )
  }
  // 生成支付提示
  _renderPayTips() {
    const {saveInfo,showConfirm,patientInfo,isShowConfirm} = this.props
    const opts = {
      buttons: [{
        label: '取消',
        onClick: () => {
          showConfirm(false)
        }
      }, {
        label: '确定',
        onClick: () => {
          showConfirm(false)
          saveInfo()
        }
      }],
      title: '用户须知'
    }
    return (
      <Confirm {...opts} show={isShowConfirm}>
        <div className="m-confirm-list">
          <ol>
            <li>每次服务时间为3小时，医生回复开始计时，服务期限内不限沟通次数。</li>
            <li>付费后医生若12小时内未回复，系统将自动为用户进行原路退款。</li>
            <li>服务到期后如仍需要沟通，可再次购买，沟通记录会一直保留。</li>
            <li>晚上22:00至8点时间为医生休息时间，请尽量绕开该时间段提问。</li>
          </ol>
        </div>
      </Confirm>
    )
  }
  //生成购买须知
  _renderTips() {
    const {check} = this.state
    const {agree,push,location:{query:{doctorId,id}}} = this.props

    return (
      <div className="tips">
        <input className="tipsCheckbox" id="tips" type="checkbox" />
        <div className={(check?'tipsAgree':'tipsNoAgree')+' tipsImg'} onClick={()=>{
          this.setState({check:!check})
        }}></div>
        <label>
          <span  onClick={()=>{
            this.setState({check:!check})
          }}>
            我了解并同意
          </span>
          <span className="tipsColor" onClick={()=>{
            push('/doctor/agreement?doctorId='+doctorId+'&id='+id)
          }}>
            《乐心健康-医生工作室院后管理服务用户协议》
          </span>
        </label>
      </div>
    )
  }

  // 生成按钮
  _renderButton () {

    return (
      <div key="save" className="save">
        <Button onClick={() => this._save()}>确认信息并支付</Button>
      </div>
    )
  }


  // 生成弹出输入框
  _renderDia() {
    const {patientInfo, changePatientInfo, editShow, filed, showEdit} = this.props

    const def = {
      onClick: (val) => {
        if (filed === 'name') {
          if (val === '爸爸' || val === '妈妈' || val === '自己') {
            toast('真实姓名不能是爸爸、妈妈、自己')
            return false
          }
        }
        if(filed === 'age'){


          let birthday = moment() - (parseInt(val))*1000*60*60*24*365 - parseInt(val/4)*1000*60*60*24
          changePatientInfo({...patientInfo, ["birthday"]: birthday,[filed]:val})

        }else{

          changePatientInfo({...patientInfo, [filed]: val})
        }
      },
      onClose: () => {
        showEdit({show: false, filed: null})
      },
      type: 'text',
      value: patientInfo[filed] ? patientInfo[filed]+'' : '',
      pattern: '/^[A-Za-z0-9]*$/'
    }
    const opts = {
      name: {
        maxLength: 20,
        title: '患者姓名',
        ...def
      },
      phone: {
        maxLength: 11,
        title: '手机号码',
        ...def
      },
      age: {
        maxLength: 3,
        title: '年龄',
        ...def
      }
    }

    return (
      <InputConFirm key="input" show={editShow} {...opts[filed]} />
    )
  }

  // 生成选择框
  _renderCommon() {
    const {patientInfo, selectShow, filed, showSelect, changePatientInfo} = this.props

    const options = {
      onConfirm: (val) => {
        changePatientInfo({...patientInfo, [filed]: val})
        showSelect({show: false, filed: null})
      },
      onCancel: () => showSelect({show: false, filed: null}),
      value: patientInfo[filed],
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

  // 生成角色选择框
  _renderBindRole() {
    const {members,changePatientInfo,patientInfo} = this.props
    const {serviceday} = patientInfo
    const {showMember} = this.state

    // 当没有成员时,默认成员
    const defs = defMembers.map(member => ({
      ...member,
      onClick: () => this._create()
    }))
    //
    const selectMembers = [...members.size > 0 ? members : defs, {
      headImgurl: require('../../../../static/images/btn_add.png'),
      nickname: '新建患者',
      onClick: () => this._create()
    }]
    // 点击确定
    const onClick = (member) => {
      changePatientInfo({...member,serviceday,goodsId:patientInfo.goodsId,remark:patientInfo.remark})
      this.setState({showMember:false})
    }
    // 点击取消
    const onHide = () => {
      this.setState({showMember:false})
    }
    return (
      <BindRole title='选择患者' show={showMember} avList={selectMembers} onClick={onClick} onHide={onHide}/>
    )
  }

  _create(){
    this.props.push(`member/create?memberType=1&redirect=${encodeURIComponent(`doctorTeam/buy`)}`)
  }

  _save(){
    const {showConfirm,patientInfo,account,members,saveInfo} = this.props
    const {serviceday,sex,nickname,name,age,phone,remark} = patientInfo
    const {check} = this.state
    if (!name || !name.trim().length) {
      this.setState({showAlert:true})
      this.setState({alertText:'请填写患者姓名'})
      return
    }
    if (!phone || !phone.trim().length) {
      this.setState({showAlert:true})
      this.setState({alertText:'请填写患者手机号码'})
      return
    }
    if (phone.trim().length!=11) {
      this.setState({showAlert:true})
      this.setState({alertText:'手机号码必须为11位'})
      return false
    }
    if(phone){
      var reg = new RegExp("^[0-9]*$")
      if(!reg.test(phone)){
        this.setState({showAlert:true})
        this.setState({alertText:'请填写正确的手机号码'})
        return
      }

    }
    if (!sex) {
      this.setState({showAlert:true})
      this.setState({alertText:'请选择患者性别'})
      return
    }
    if (!age || !(age+'').trim().length) {
      this.setState({showAlert:true})
      this.setState({alertText:'请填写年龄'})
      return
    }
    if(!remark || !remark.trim().length){
      this.setState({showAlert:true})
      this.setState({alertText:'请填写备注'})
      return false
    }

    if(age){
      var reg = new RegExp("^[0-9]*$")
      if(!reg.test(age)){
        this.setState({showAlert:true})
        this.setState({alertText:'年龄请填写数字'})
        return
      }

    }
    if(!check) {
      this.setState({showAlert:true})
      this.setState({alertText:''})
      return
    }
    showConfirm(true)
    // saveInfo()
  }

  _renderAlert(){
    const {showAlert,alertText} = this.state
    return (
      <Alert show={showAlert} text="知道了" onClick={() => {this.setState({showAlert:false})}}>
        <div className="alert">{alertText}<span style={{display:alertText?'none':'inline'}}>请确认阅读并勾选同意<br/>《乐心健康-医生工作室院后管理服务用户协议》</span></div>
      </Alert>
    )
  }



})
