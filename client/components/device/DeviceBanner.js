import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../components/frozenui/grid'
import User from './User'
import {defListUsers, defaultHeadImgurl} from '../../const/member'

export default class DeviceBanner extends Component {

  render() {
    const {picture, name, remark, saleModel, onClick,experienceFlag,deviceType} = this.props
    require('../../styles/device/deviceBanner.less')
    let renderStatusFlag = false
    if(['i8', 'i8_wifi'].indexOf(saleModel) !== -1){
      renderStatusFlag = true
    }
    return (
      <RowFlex className="deviceBanner" onClick={onClick}>
        <div className="deviceImg">
          <img src={picture || require('../../../static/images/device/i5-gprs.png')}/>
        </div>
        <div className="deviceUser">
          <div>
            { remark || name }
            {renderStatusFlag && this._renderStatus()}
          </div>

          {/*{!experienceFlag ? this._renderUser() : this._renderPublicTips()}*/}
        </div>
        <Col className="rightArrow"><img src={require('../../../static/images/btn_new_p.png')}/></Col>
      </RowFlex>
    )
  }
  _renderPublicTips() {

    return (
      <RowFlex className="userBox">
        <div className="user">
          <div className="headImg">
            <img src={require('../../../static/images/device/publicDevice/icon_utility_equipment.png')}/>
          </div>
          <div className="m-public-device-name">
            公用设备
          </div>
        </div>
      </RowFlex>
    )
  }
  _renderUser() {
    const {deviceUsers, deviceType} = this.props
    let users = [defListUsers[1], defListUsers[2]]
    if(deviceType === '06' || deviceType === '04'){
      users = [defListUsers[1]]
    }
    if (deviceUsers && deviceUsers.length) {
      deviceUsers.map((user) => {
        users[user.userNo - 1] = user
      })
    }
    return (
      <RowFlex className="userBox">
        {
          users.map((user,i) => {
              return(
                <User key={i} headImgurl={user.headImgurl || defaultHeadImgurl[user.sex]} nickname={user.nickname || user.name}></User>
              )
          })
        }
      </RowFlex>
    )
  }

  // 生成连接状态
  _renderStatus() {
    const {online} = this.props
    let imgSrc = ''
    if (online) {
      imgSrc = require('../../../static/images/device/icon_already_connected.png')
    } else {
      imgSrc = require('../../../static/images/device/icon_not_connected.png')
    }
    return (
      <img src={imgSrc} className="connected"/>
    )
  }

}
