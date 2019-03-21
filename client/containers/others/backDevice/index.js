import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import Button from '../../../components/common/button/Button'
import AddBpDate from '../../../components/record/bp/history/AddBpDate'
import NoData from '../../../components/common/NoData'
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
// selectors
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {
  componentDidMount() {
    const {setNext} = this.props
    setNext(false)
  }

  render() {
    require('../../../styles/page/claimData.less')
    const {query: {communicationType}} = this.props.location
    const {setNext,next} = this.props
    return (
      <div className="claimData backDevice">
        <Title title='找回设备'/>
        {this._showData()}
        <div className="pageBottom">
          {
            communicationType && ['2', '5'].indexOf(communicationType) === -1 && <div className="spb" onClick={() => setNext(!next)}>
              <img className="img_r" src={require(next ? "../../../../static/images/device/box_p.png" : "../../../../static/images/device/box_n.png")}/>请确认数据已上传
            </div>
          }


          <Button type={(communicationType && ['2', '5'].indexOf(communicationType) === -1 && !next)? "default" : "primary"}  onClick={() => this._findBack()}>

            {communicationType && ['2', '5'].indexOf(communicationType) !== -1 ? '配置WI-Fi' : '确认'}
          </Button>
        </div>
        {this._showBpDate()}
      </div>
    )
  }

  _showData() {
    const {query: {communicationType}} = this.props.location
    const {setShow, val} = this.props
    if (communicationType && ['2', '5'].indexOf(communicationType) !== -1) {
      return <NoData image={require('../../../../static/images/device/icon_no_equipment.png')} warning="该设备已被其他用户绑定"
                     text="如需找回，请通过配置Wi-Fi完成找回"/>
    }
    const {systolicPressure, diastolicPressure, heartRate} = val
    return (
      <div>
        <div className="conText">如需找回设备，请用该设备测量一次血压，并在本页面输入测量结果。</div>
        <div className="dataBox clear" onClick={() => setShow(true)}>
          <div className="dataBoxLe fl">
            <div>高压：{systolicPressure ? `${systolicPressure} mmHg` : '请测量'}</div>
            <div>低压：{diastolicPressure ? `${diastolicPressure} mmHg` : '请测量'}</div>
            <div>心率：{heartRate ? `${heartRate} 次/分` : '请测量'}</div>
          </div>
          <div className="badeRi fr"><img className="trm" src={require('../../../../static/images/btn_new_p.png')}/></div>
        </div>
      </div>
    )
  }

  _showBpDate() {
    const {setShow, show, setVal} = this.props
    const click = (vals) => {
      setShow(false)
      setVal({systolicPressure: vals[0], diastolicPressure: vals[1], heartRate: vals[2]})
    }
    return (
      <AddBpDate ref="addbpdate" show={show} addConfirm={click}
                 onCancel={() => setShow(false)}/>
    )
  }

  _findBack() {
    const {params: {deviceId}, findBackDevice, location: {query: {communicationType, saleModel}}, val, configWifi} = this.props
    const {systolicPressure, diastolicPressure, heartRate} = val
    if (communicationType && ['2', '5'].indexOf(communicationType) !== -1) {
      configWifi({deviceId, saleModel})
    } else {
      if (!systolicPressure || !diastolicPressure || !heartRate) {
        toast('请测量血压')
        return
      }
      findBackDevice({
        deviceId, systolicPressure, diastolicPressure, heartRate
      })
    }
  }
})

