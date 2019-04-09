import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import DoctorStudio from '../../../components/doctor/DoctorStudio'

import Title from '../../../components/common/title/Title'
import AvatarText from '../../../components/common/Avatar/AvatarText'
import Alert from '../../../components/common/dialog/Alert'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
// toast
import {closeWindow} from '../../../util/wxJs/wxApi'
export default connect(
  debug(selectors),
  actions
)(class extends Component {

  static defaultProps = {
    displayFirst: false,
    displaySecond: false
  }
  componentDidMount() {
    const {loadData,location:{query:{param,doctorId}}} = this.props
    loadData({doctorId,param})
  }

  componentWillUnmount() {
    this.props.clear()
  }

  render() {
    const {doctorMember} = this.props
    const {certificationStatus} = doctorMember || {}
    require('../../../styles/doctor/doctorStudio.less')
    if(certificationStatus && certificationStatus != 2){
      return (
        <Alert show={true} text="确定" onClick={() => closeWindow()}>
          <div className="alert">该医生正在认证中，请稍后查看。</div>
        </Alert>
      )
    }
    return (
      <div className="memberBtn">
        <Title title='我的医生'/>
        {doctorMember && this._renderTab()}

      </div>
    )
  }

  _renderTab() {
    const {doctorMember} = this.props
    return (
      <div className="panal">
        <div className="studio-head">
          <DoctorStudio {...doctorMember} noArrImg={true}  />

        </div>
        {this._renderContent()}
        <div>
          <h3 className="studio-title">提供服务</h3>
          <div className="studio-item-box">
            {this._renderItems()}
          </div>
        </div>

      </div>
    )

  }
  _renderContent() {
    const {doctorMember} = this.props
    const {introduction} = doctorMember || {}
    return (
        <div>
          <h3 className="studio-title">医生简介</h3>
          <div className="studio-box" dangerouslySetInnerHTML={{__html: introduction}}/>
        </div>
    )
  }
  _goBuyPre(id) {
    this.props.push(`doctorTeam/service?doctorTeamId=${id}&check=1`)
  }
  _goBuyLeave(doctorId,id,hasService) {
    if(typeof(hasService.tid)=='undefined'){
      const domain = location.host || document.domain
      if(domain.indexOf('qa') >= 0){
        window.location.href = `https://static-qa2.lifesense.com/health/?id=${id}#/doctorTeam/preServiceBuy?doctorId=${doctorId}&id=${id}&check=1`
      }else{
        window.location.href = `https://web.lifejoy-health.com/health/?id=${id}#/doctorTeam/preServiceBuy?doctorId=${doctorId}&id=${id}&check=1`
      }

      // this.props.push(`doctorTeam/preServiceBuy?doctorId=${doctorId}&id=${id}&check=1`)
    }else{
      this.props.push(`doctor/${hasService.tid}/chat/${hasService.patientId}`)
    }
  }
  _renderItems() {
    const {hospitalService} = this.props
    if(!hospitalService || hospitalService.length === 0){
      return (
        <div className="no-data">
          <img src={require('../../../../static/images/doctor/icon-doctor-office-no-service.png')} alt="暂无任何服务"/>
          暂无任何服务
        </div>
      )
    }else{
      return (
        <div>
          <ul>
            {
              hospitalService && hospitalService.map((data)=>{
                let btnText = ''
                let thisPushLink
                let priceText = ''
                let displayFlag = false
                if(!data.doctorTeamId){

                  if(typeof data.hasService != 'undefined' && typeof data.hasService.tid !='undefined' && data.hasService.tid != ''){
                    thisPushLink = ()=>{this._goBuyLeave(data.doctorId,data.id,data.hasService)}
                    btnText = '立即沟通'
                    priceText = '服务中'

                  }else{
                    thisPushLink = ()=>{this._goBuyLeave(data.doctorId,data.id,data.hasService)}
                    btnText = '立即购买'
                    priceText = `${data.price}元/次`
                  }
                  displayFlag = true
                }else{
                  thisPushLink = ()=>{this._goBuyPre(data.doctorTeamId)}
                  btnText = '了解一下'
                }
                return (<li>
                        <div className="item-left">
                          <div className="item-title">
                            {data && data.serviceName}
                          </div>
                          <div className="content">
                            {data && data.introduce}
                          </div>
                        </div>

                        <div className="item-right">

                          <div className="price" style={{display:displayFlag ?'block' : 'none'}}> {priceText}</div>

                          <div className="btn" onClick={thisPushLink}>{btnText}</div>
                        </div>
                      </li>)
              })
            }


          </ul>
        </div>

      )
    }
  }
})

