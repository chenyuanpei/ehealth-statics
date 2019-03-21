import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import DoctorList from '../../../components/doctor/DoctorList'

import Title from '../../../components/common/title/Title'
import AvatarText from '../../../components/common/Avatar/AvatarText'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
// toast

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  static defaultProps = {
    displayFirst: false,
    displaySecond: false
  }
  componentDidMount() {
    const {loadData, params: {doctorId},location:{query:{param}}} = this.props
    loadData({doctorId,param})
  }
  componentWillUnmount() {
    this.props.clear()
  }
  render() {
    require('../../../styles/doctor/patientManage.less')

    return (
      <div className="memberBtn">
        <Title title='我的医生'/>
        {this._renderTab()}

      </div>
    )
  }

  _renderTab() {
    const {doctorMember,location:{query:{param}},displayFirst,displaySecond} = this.props
    const relationTitle = {
      1: '点击以下成员关联医生',
      2: '点击添加新成员关联医生',
      3: '以下成员已关联该医生，可以帮成员咨询医生',
      4: '以下成员正等待该医生的审核，暂无法帮成员咨询医生',
    }
    let num = parseInt(param)
    return (
      <div className="panal">
        <div className="patient-head">
          <DoctorList {...doctorMember} noArrImg={true}  />
        </div>

        <div className="roleList" style={{display:displayFirst ? 'block' : 'none'}}>
          <div className="roleTitle colorA5">
            {relationTitle[num+1]}
          </div>
          {this._renderPatientRoles(num+1)}
        </div>
        <div className="roleList colorA5" style={{display:displaySecond ? 'block' : 'none'}}>
          <div className="roleTitle">
            {relationTitle[num+2]}
          </div>
          {this._renderPatientRoles(num+2)}
        </div>
      </div>
    )

  }

  _renderPatientRoles(param) {
    const {push,doctorMember} = this.props
    const {linkMemberGroupInfos,doctor} = doctorMember || {}
    let avList = []
    if(linkMemberGroupInfos){
      let arr0 = linkMemberGroupInfos[0] ? linkMemberGroupInfos[0] : []
      let arr1 = linkMemberGroupInfos[1] ? linkMemberGroupInfos[1] : []
      let arr_1 = linkMemberGroupInfos[-1] ? linkMemberGroupInfos[-1] : []
      let arr2 = linkMemberGroupInfos[2] ? linkMemberGroupInfos[2] : []
      switch(param)
      {
        case 3:

          avList = [...arr1]

          // this.state.displayFirst += avList.length

          break;
        case 1:

          avList = [...arr_1,...arr2]
          // this.state.displaySecond += avList.length

          break;
        case 2:

          avList = [{
            headImgurl: require('../../../../static/images/btn_add.png'),
            name: '添加新成员'
          }]
          // this.state.displayFirst += avList.length

          break;
        case 4:
          avList = [...arr0]
          // this.state.displaySecond += avList.length

          break;
        default:
          avList = []

      }
    }

    return avList.map((member, idx) => {
      const {params: {doctorId}} = this.props
      const {nickname, name, headImgurl, id, userId,sex, tid} = member
      let styleClass=''
      if(!userId){
        styleClass='add_btn'
      }
      const onClick = () => {
        if (userId) {
          if(param == 3){
            push(`doctor/${tid}/chat/${id}`)
          }else{
            if(param != 2){
              push(`doctor/${doctorId}/relation/${id}`)
            }
          }
        }else{
          push(`doctor/${doctorId}/relation/createMember?create=1`)
        }
      }
      return (
        <AvatarText key={idx} name={nickname || name} src={headImgurl} sex={sex}
                    className={styleClass}
                    onClick={onClick}/>
      )
    })
  }

})

