import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import {doctorDefaultHeadImg} from '../../../const/doctor'
import Title from '../../../components/common/title/Title'
import Alert from '../../../components/common/dialog/Alert'
import DoctorMask from '../../../components/doctorTeam/DoctorMask'

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
    const {loadData,location: {query: {doctorTeamId}}} = this.props
    loadData(doctorTeamId)
  }

  render() {
    require('../../../styles/doctorTeam/preoperativeIntroduce.less')
    const {doctorTeam,goods,isLoadShow,toggleAlert} = this.props
    const {status} = goods || {}
    if(status === 0){

      return(
        <div className="m-pre-panel">
          {doctorTeam !== null && this._renderBanner()}
          {doctorTeam !== null && this._renderServiceContent()}
          <Alert show={isLoadShow} text="确定" onClick={() => toggleAlert(false)}>
            <div className="m-loading-alert">
              该医生团队已暂停提供服务，如有问题请联系该医生团队。
            </div>
          </Alert>
        </div>
      )
    }
    return (
      <div className="m-pre-panel">
        <Title title='服务介绍'/>
        {doctorTeam !== null && this._renderBanner()}
        {doctorTeam !== null && this._renderServiceContent()}
        {doctorTeam !== null && this._renderDoctorTeamInfo()}
        {doctorTeam !== null && this._renderDoctorTeamList()}
        {doctorTeam !== null && this._renderDoctorBottom()}

      </div>
    )
  }
  _renderBanner() {
    const {doctorTeam} = this.props
    const {name} = doctorTeam || {}
    return (
        <div>
          {/*<div className="m-pre-banner">*/}
            {/*<div className="m-opacity-top"></div>*/}
            {/*<ul>*/}
              {/*<li>提高手术准备效率，节约患者时间</li>*/}
              {/*<li>有效院外医患沟通，杜绝手术风险</li>*/}
              {/*<li>医生团队亲自参与，让您省心省时</li>*/}
            {/*</ul>*/}
          {/*</div>*/}
          <div className="m-pre-tips">您正在查看由{name}提供的院前管理服务</div>
        </div>
    )
  }
  _renderServiceContent() {
    return (
        <div className="m-service-content">
          <div className="m-service-title">
            <div className="m-service-blue-left"></div>
            <h3 className="m-blue-title">服务内容</h3>
            <div className="m-service-blue-right"></div>
          </div>
          <div className="m-service-list">
            <ul>
              <li><div className="m-list-ico"></div>院前血压计等医疗设备租用</li>
              <li><div className="m-list-ico"></div>医生团队提供院前管理与指导</li>
              <li><div className="m-list-ico"></div>团队医生在线咨询</li>
            </ul>
          </div>
        </div>
    )
  }
  _renderDoctorTeamInfo() {
    const {doctorTeam} = this.props
    const {name,picture,brief} = doctorTeam || {}
    return (
        <div className="m-doctor-team-wrap">
          <div className="m-service-title">
            <div className="m-service-grey-left"></div>
            <h3 className="m-grey-title">{name}介绍</h3>
            <div className="m-service-grey-right"></div>
          </div>
            <div className="m-doctor-team-content">
            {picture && <img src={picture} alt={name} />}
            <div className="m-doctor-team-text" dangerouslySetInnerHTML={{__html: brief}}/>
          </div>
        </div>
    )
  }
  _renderDoctorTeamList() {
    const {showDoctorList,isShowDoctorList,doctorOpenedTeamList} = this.props
    return (
        <div className="m-doctor-team-list">
          <div className="m-doctor-team-title">
            以下医生将为您直接提供服务
          </div>
          <div className="m-doctor-team-grey">
            点击医生头像可购买该医生提供的院后管理服务
          </div>
          {this._renderDoctorList()}
          <DoctorMask show={isShowDoctorList} onClick={()=>showDoctorList(false)}>
            {doctorOpenedTeamList !==null && this._renderDoctorOpenedList()}
          </DoctorMask>
        </div>
    )
  }
  _goDoctorLink(id) {
    const {push} = this.props
    push(`/doctorTeam/studio?doctorId=${id}&param=1`)
  }
  _renderDoctorList() {
    const {doctorTeamList} = this.props
    return (
      <div className="m-doctor-team-ul">
        <ul>
          {
            doctorTeamList.map(
              (doctor, idx) => {
                return (
                  <li onClick={()=>this._goDoctorLink(doctor.id)}>
                    <div className="m-doctor-head"><img src={doctor.headimgurl || doctorDefaultHeadImg[1]} /></div>
                    <div className="m-doctor-name">{doctor.name}</div>
                    <div className="m-doctor-position">{doctor.title}</div>
                  </li>
                )
              }
            )
          }
        </ul>
      </div>
    )
  }
  _renderDoctorOpenedList() {
    const {doctorOpenedTeamList} = this.props
    return (
      <div className="m-doctor-team-ul">
        <ul>
          {
            doctorOpenedTeamList.map(
              (doctor, idx) => {
                return (
                  <li onClick={()=>this._goDoctorLink(doctor.id)}>
                    <div className="m-doctor-head"><img src={doctor.headimgurl || doctorDefaultHeadImg[1]} /></div>
                    <div className="m-doctor-name">{doctor.name}</div>
                    <div className="m-doctor-position">{doctor.title}</div>
                  </li>
                )
              }
            )
          }
        </ul>
      </div>
    )
  }
  _renderDoctorBottom() {
    const {goods,toggleConfirm,isShow} = this.props
    const {unitPrice} = goods || {}
    return (
      <div>
        <div className="m-doctor-team-bottom">
            <div className="m-doctor-team-price-box">
                <div className="m-icon-price">特惠</div>
                <div className="m-price-box">￥{unitPrice}/天</div>
            </div>
            <div className="m-doctor-buy-button" onClick={() => this._goBuy()}>我要购买</div>

        </div>
        <Alert show={isShow} text="确定" onClick={() => toggleConfirm(false)}>
          <div className="m-loading-alert">
              您已购买该服务且服务尚未结束，暂不能购买!

          </div>
        </Alert>
      </div>
    )
  }
  _goBuy() {
    const {goBuy,location: {query: {doctorTeamId}},goods:{id}} = this.props
    const goodsId = id
    goBuy({doctorTeamId,goodsId})


  }
})

