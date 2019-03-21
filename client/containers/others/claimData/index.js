import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../util/common'
// components
import AvatarText from '../../../components/common/Avatar/AvatarText'
import Button from '../../../components/common/button/Button'
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
import {toast} from '../../../util/loading'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    const {loadData, location: {query: {deviceModelForword}}, params: {dataId}, newUserId} = this.props
    loadData({dataId, deviceModelForword})
    this._setBind(newUserId)
  }

  _setBind(userId) {
    const {bpRecord, members} = this.props
    if (!bpRecord || !bpRecord.userId || !members || members.size <= 0) {
      if (userId) {
        this._setBindMember(userId)
      }
      return
    }
    this._setBindMember(bpRecord.userId)
  }

  _setBindMember(userId) {
    const {members, setBind} = this.props
    const bind = members.find((mem) => mem.userId === userId)
    if (bind) {
      setBind(bind)
    }
  }

  render() {
    const {bpRecord: {userId}} = this.props
    require('../../../styles/page/claimData.less')
    return (
      <div className="claimData">
        <Title title='认领数据'/>
        {this._renderClaimDatas()}
        <div className="roleList" style={{display: userId !== 0 ? 'none' : 'block'}}>
          {this._renderClaimRoles()}
        </div>
        {this._onNext()}
      </div>
    )
  }

  _onNext() {
    const {params: {dataId}, bpRecord: {userId}, location: {query: {deviceModelForword}}} = this.props
    if (userId === 0) {
      const call = () => {
        const {bind} = this.props
        // 现在不需要设备ID
        const {matchingUser} = this.props
        console.log(bind)
        if(!bind.id){
          toast('请选择用户')
          return
        }
        matchingUser({recordId: dataId, userId: bind.userId, deviceModelForword: deviceModelForword})
      }
      return (
        <div className="pageBottom">
          <Button onClick={call}>确认</Button>
        </div>
      )
    }
  }

  _renderClaimDatas() {
    const {bpRecord: {userId, systolicPressure, diastolicPressure, heartRate, measurementDate, headImgurl, nickname, name, sex}, location: {query: {deviceModelForword}}} = this.props
    const claimSuccess = userId ? '以下数据已被认领' : '发现以下未知数据，请点击头像认领'
    // const {headImgurl, nickname, name, sex} = bind || {}
    return (
      <div>
        <div className="conText">{claimSuccess}</div>
        <div className="dataBox clear">

          {deviceModelForword === '1' && this._renderBsData()}
          {!deviceModelForword && this._renderBpData()}
          {deviceModelForword === '2' && this._renderWeightData()}
          <div className="dataBoxRi fr" style={{display: userId ? 'block' : 'none'}}>
            <AvatarText src={headImgurl} sex={sex}
                        name={nickname || name}/>
          </div>
        </div>
      </div>
    )
  }
  _renderBsData() {
    const {bpRecord: {glucoseConcentration, mealPeroidStr, measurementDate}} = this.props
    return (
      <div className="dataBoxLe fl">
        <div>血糖：{glucoseConcentration ? `${glucoseConcentration} mmol/L` : ''}</div>
        <div>用餐状态：{mealPeroidStr ? `${mealPeroidStr}` : ''}</div>
        <div>测量时间：{measurementDate ? moment(measurementDate).format('YYYY-MM-DD HH:mm') : ''}</div>
      </div>
    )
  }
  _renderWeightData() {
    const {bpRecord: {weight, measurementDate}} = this.props
    return (
      <div className="dataBoxLe fl">
        <div>体重：{weight ? `${weight} kg` : ''}</div>
        <div>测量时间：{measurementDate ? moment(measurementDate).format('YYYY-MM-DD HH:mm') : ''}</div>
      </div>
    )
  }
  _renderBpData() {
    const {bpRecord: {systolicPressure, diastolicPressure, heartRate, measurementDate}} = this.props
    return (
      <div className="dataBoxLe fl">
        <div>高压：{systolicPressure ? `${systolicPressure} mmHg` : ''}</div>
        <div>低压：{diastolicPressure ? `${diastolicPressure} mmHg` : ''}</div>
        <div>心率：{heartRate ? `${heartRate} 次/分` : ''}</div>
        <div>测量时间：{measurementDate ? moment(measurementDate).format('YYYY-MM-DD HH:mm') : ''}</div>
      </div>
    )
  }
  _renderClaimRoles() {
    const {members, push, params: {dataId}, bpRecord, setBind} = this.props
    const avList = [...members.toArray(), {
      headImgurl: require('../../../../static/images/btn_add.png'),
      name: '添加'
    }]
    if (bpRecord && !bpRecord.userId) {
      return avList.map((member, idx) => {
        const {bind} = this.props
        const {name, nickname, headImgurl, userId} = member
        const bindUserId = bind && bind.userId
        const onClick = () => {
          if (userId) {
            setBind(bindUserId !== userId ? member : {userId: -1})
          } else {
            push(`member/create?memberType=1&redirect=/others/claimData/${dataId}?memberId=:memberId`)
          }
        }
        return (
          <AvatarText key={idx} name={nickname || name} src={headImgurl}
                      className={bindUserId === userId ? 'bRline' : ''}
                      tip={(userId && bindUserId === userId) ? require('../../../../static/images/healthRecord/select_reveal_p.png') : ''}
                      onClick={onClick}/>
        )
      })
    }
  }
})

