import React, {Component} from 'react'
import {connect} from 'react-redux'
import {iframePush} from '../../../actions/iframe'
// components
import {defListUsers, defaultHeadImgurl} from '../../../const/member'

import Battery from '../../../components/device/Battery'
import User from '../../../components/device/User'
import Tab from '../../../components/common/form/Tab'
import InputConFirm from '../../../components/common/dialog/InputConFirm'
import Confirm from '../../../components/common/dialog/Confirm'
import Qrcode from '../../../components/device/Qrcode'
import Title from '../../../components/common/title/Title'
import CountDown from '../../../components/common/publicDevice/CountDown'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

// const
import {hostname, protocol} from '../../../config'
/*{
 [3, 5].indexOf(communicationType) !== -1 && <Tab name='血压流量续费' onClick={() => this._goPay()}/>
 }*/
class DeviceInfo extends Component {
  static defaultProps = {
    device: {},
    account: {}
  }

  componentDidMount() {
    const {init, params: {deviceId}} = this.props
    init({deviceId})
  }
  // 组件销毁的时候关掉显示二维码的框
  componentWillUnmount () {
    const {showQrode} = this.props
    showQrode(false)
  }
  render() {
    const {device: {experienceFlag,deviceId},roles} = this.props
    require('../../../styles/device/deviceInfo.less')
    let expFlag = false
    if(!experienceFlag && deviceId){
      expFlag = true
    }
    return (
      <div className="device_info">
        <Title title='设备信息'/>
        {deviceId && this._renderHead()}
        {deviceId && this._renderTab1()}
        {expFlag && this._renderTab2()}
        {deviceId && this._renderDelBtn()}
        {deviceId && this._renderDia()}
        {deviceId && this._renderDel()}
        {deviceId && this._renderQrcode()}
      </div>
    )
  }

  // 生成头部
  _renderHead() {
    const {device: {remark, picture,batteryPower, name, saleModel}, showEdit} = this.props
    const edit = () => {
      showEdit(true)
    }
    return (
      <div className="device_head">
        <div className="device_head_left">
          <img className="device_image" src={picture || require('../../../../static/images/device/i5-gprs.png')}/>
        </div>
        <div className="device_head_right">
          <div className="device_title">
            {remark || name}
                        {/*<span className="edit_icon" onClick={edit}>*/}
                            {/*<img src={require('../../../../static/images/device/btn_edit.png')}/>*/}
                        {/*</span>*/}
          </div>
          {(batteryPower -1)>=0 && this._renderBatteryPower()}
        </div>
      </div>
    )
  }
  //生成电量图标
  _renderBatteryPower() {
    const {device: { batteryPower, saleModel}} = this.props
       return (
         <div className="battery_image">
           <Battery level={batteryPower}/>
           {['i8', 'i8_wifi'].indexOf(saleModel) !== -1 && this._renderStatus()}
         </div>
       )
     }
  // 生成Tab一
  _renderTab1() {
    const {device: {communicationType, unit,modelNum, saleModel,deviceType, linkmanCount, experienceFlag},roles, params: {deviceId}} = this.props
    const linkConfigWifi = () => {
      if(experienceFlag){
        this._go(`configWifi?saleModel=${saleModel}&experienceFlag=1`)
      }else{
        this._go(`configWifi?saleModel=${saleModel}`)
      }
    }
    let unitFlag = false
    if(deviceType == '02' && modelNum !== 'LS207-B'){
      unitFlag = true
    }
    let unitType = 'kg'

      let unitObj = unit ? JSON.parse(unit) : {unit:1}
      if(unitObj && unitObj.unit === 2){
        unitType = '斤'
      }

    let user = defListUsers[1]
    if(roles['1']){
      user = roles['1']
    }

    if(experienceFlag){
      return (
        <div className="device_list">
          {
            [2, 5].indexOf(communicationType) !== -1 &&
            <Tab name='配置WIFI密码' onClick={() => linkConfigWifi()}/>
          }
          <div className="m-public-device-text">
            您当前绑定的是一台公用设备，请在10分钟内
            完成测量，倒计时结束后设备将会自动解绑。
            如需立刻解绑，请点击“删除设备”按钮即可。
            解绑后将不会再接收到测量结果通知。
          </div>
        </div>
      )
    }
    return (
      <div className="device_list">
        <Tab name='绑定成员' onClick={() => this._go('bindRoles')}>
          <div className="m-user-tab-wrap">{deviceType === '04' && <User headImgurl={user.headImgurl || defaultHeadImgurl[user.sex]} nickname={user.nickname || user.name} />}
          </div>
        </Tab>
        {
          [2, 5].indexOf(communicationType) !== -1 &&
          <Tab name='配置WIFI密码' onClick={() => this._go(`configWifi?saleModel=${saleModel}`)}/>
        }
        {
          unitFlag &&
          <Tab name='体重单位' val={unitType} onClick={() => this._go(`deviceUnit?unitType=${unitObj.unit}`)}/>
        }

        {
          ['i8', 'i8_wifi','i5 Plus'].indexOf(saleModel) !== -1 &&
          <Tab name='一键呼叫联系人' val={linkmanCount} onClick={() => this._go('linkmans')}/>
        }
        {
          ['i8', 'i8_wifi'].indexOf(saleModel) !== -1 &&
          <Tab name="设置测量提醒" onClick={() => this._go('timeMeasureRemind')}/>
        }
        {
          ['i8', 'i8_wifi'].indexOf(saleModel) !== -1 &&
          <Tab name="省电模式" onClick={() => this._go('powerMode')}/>
        }
      </div>
    )
  }

  // _goPay() {
  //   const {device: {deviceId, expireDate}, account: {openId}, push} = this.props
  //   if (expireDate) {
  //     // push( `others/iframe?href=${encodeURIComponent(`https://trade.lifesense.com/wxpay/gprs?paytype=wxpay&pagetype=describe&deviceId=${deviceId}&openId=${openId}`)}`)
  //     // iframePush( `${encodeURIComponent(`https://trade.lifesense.com/wxpay/gprs?paytype=wxpay&pagetype=describe&deviceId=${deviceId}&openId=${openId}`)}`,'血压流量续费')
  //     window.location.href = `https://trade.lifesense.com/wxpay/gprs?paytype=wxpay&pagetype=describe&deviceId=${deviceId}&openId=${openId}`
  //   } else {
  //     push('/others/payErro')
  //   }
  // }

  // 生成Tab二
  _renderTab2() {
    const {iframePush, showQrode, device: {communicationType,deviceType, saleModel, linkmanCount, softwareVersion, isLatestSoftwareVersion}} = this.props
    let showVersionFlag = false
    if(deviceType === '04' || ['i8', 'i8_wifi'].indexOf(saleModel) !== -1){
      showVersionFlag = true
    }
    let deviceModel= this.props.device.deviceModel
    if(deviceType === '04'){
      deviceModel = 'mambo2'
    }else if(deviceType === '02'){
      if(['S5'].indexOf(saleModel) !==-1){
        deviceModel = 'S5'
      }else if(['S3'].indexOf(saleModel) !==-1){
        deviceModel = 'S3'
      }else if(['S7'].indexOf(saleModel) !==-1){
        deviceModel = 'S7'
      }else if(['A3'].indexOf(saleModel) !==-1){
        deviceModel = 'A3-F'
      }
    }else if(deviceType === '08'){
      if(['i2 Pro','i2'].indexOf(saleModel) !==-1){
        deviceModel = 'i2'
      }
    }
    return (
      <div className="part_two">
        <Tab name="设备二维码" onClick={() => {
          showQrode(true)
        // this.setState({showQrcode: true, showDel: false, showEdit: false})
        }}/>
        {
          ['Freda','Freda PLUS'].indexOf(saleModel) === -1 &&
          <Tab name="操作指南"
            // onClick={() => iframePush(`${serverUrl}/page/fastopr/${this.props.device.deviceModel}/index.html`, '操作指南')}/>
               onClick={() => this._goWorkbook(`${protocol}//${hostname}/healthbase/#!/healthy/workbook?device=${deviceModel}`, '操作指南')}/>
        }
        {
          showVersionFlag &&
          <Tab name="固件版本" nameStyle={isLatestSoftwareVersion===false ? 'm-version-update' : ''} val={softwareVersion} onClick={() => this._goUpdateSoftWare()}/>
        }
      </div>
    )
  }
  _goWorkbook(url) {
    window.location.href = url
  }
  _goUpdateSoftWare() {
    const {device: {isLatestSoftwareVersion, softwareVersion, hardwareVersion, deviceType, deviceId}, push} = this.props
    if (deviceType === '04'){
      return false
    }
    if (isLatestSoftwareVersion === false) {
      push(`device/upgrade/${deviceId}/${softwareVersion}/${hardwareVersion}/${deviceId}`)
    } else {
      push(`device/upgradeStatus/newest`)
    }
  }
  // 生成删除按钮
  _renderDelBtn() {
    const {showDelete,replace,delDevice, device: {experienceFlag,experienceTime},params: {deviceId}} = this.props
    const del = () => {
      showDelete(true)
    }
    const messages = {
      days: {
        plural: '天',
        singular: '天',
      },
      hours: '小时',
      mins: '分',
      segs: '秒',
    }
    const _finish = () => {
      replace(`organization/deviceStatus`)
    }
    return (
      <div className="delete_div">
        <div className={experienceFlag ? "del_btn time_btn" : "del_btn"} onClick={del}>
          删除设备
          <div className="countdown_box">
            {
              (experienceTime+1) && <CountDown
                RemainingTime={experienceTime}
                className="countdown_time"
                {...messages}
                onEnd={_finish}
              />
            }

            后设备自动解绑
          </div>


        </div>

      </div>
    )
  }

  // 生成二维码弹出层
  _renderQrcode() {
    const {device, showQrode, isShowQrcode} = this.props
    return <Qrcode {...device} show={isShowQrcode} onClick={() => showQrode(false)}/>
  }

  // 跳转方法
  _go(url) {
    const {device: {deviceId}, push} = this.props
    push(`device/${deviceId}/${url}`)
  }

  // 生成弹出输入框
  _renderDia() {
    const {device: {deviceId, remark, name}, updateDeviceRemark, showEdit, isShowEdit} = this.props
    const opt = {
      title: '设备名称',
      maxLength: 20,
      onClick: (val) => { // 点击确定后的回调
        if (!val || !val.length) {
          toast('请填写设备名称...')
          return
        }
        updateDeviceRemark({deviceId: deviceId, remark: val})
      },
      onClose: () => {
        showEdit(false)
      },
      value: remark || name
    }
    return (
      <InputConFirm show={isShowEdit} {...opt}/>
    )
  }

  // 删除设备弹出框
  _renderDel() {
    const {device: {deviceId,experienceFlag}, delDevice, goBack, isShowDelete, showDelete} = this.props
    const buttons = [{
      type: 'default',
      label: '取消',
      onClick: () => {
        showDelete(false)
      }
    }, {
      type: 'primary',
      label: '确认',
      onClick: () => {
        delDevice({deviceId,experienceFlag})
        showDelete(false)
        // goBack()
      }
    }]
    return (
      <Confirm buttons={buttons} show={isShowDelete}>
        <div className="confirm">删除该设备，测量数据将不能通过手机接收，确认删除？</div>
      </Confirm>
    )
  }

  // 生成连接状态
  _renderStatus() {
    const {device: {online}} = this.props
    let imgSrc = ''
    if (online) {
      imgSrc = require('../../../../static/images/device/icon_already_connected.png')
    } else {
      imgSrc = require('../../../../static/images/device/icon_not_connected.png')
    }
    return (
      <img src={imgSrc} className="connected"/>
    )
  }
}

import {debug} from '../../../util/common'
export default connect(
  debug(selectors)
  , actions
)(DeviceInfo)
