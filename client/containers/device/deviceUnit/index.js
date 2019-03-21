import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import ScrollView from '../../../components/common/scroll/ScrollView'
import Button from '../../../components/common/button/Button'
import NoData from '../../../components/common/NoData'
import DeviceBanner from '../../../components/device/DeviceBanner'
import Alert from '../../../components/common/dialog/Alert'
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
class DeviceUnit extends Component {
  static defaultProps = {
    devices: []
  }
  state = {
    unit: 1,
  }
  componentDidMount() {
    const {init,location:{query:{unitType}}} = this.props
    this.setState({
      unit:unitType
    })
    init()
  }
  _changeUnit(num) {
    const {changeUnit,params:{deviceId}} = this.props
    this.setState({
      unit:num
    })
    changeUnit({num,deviceId})
  }
  render() {
    require('../../../styles/device/deviceUnit.less')
    const {location:{query:{unitType}}} = this.props
    const {unit} = this.state
    return (
      <div className="memberBtn">
        <Title title="体重单位"/>
        <div className="m-device-unit">
          <ul className="m-device-unit-list">
            <li className="m-item" onClick={()=>{this._changeUnit(1)}}>kg <img style={{display:unit == 1 ? 'block' : 'none'}} className="m-device-unit-ico" src={require('../../../../static/images/device/icon-select.png')} alt=""/></li>
            <li className="m-item"  onClick={()=>{this._changeUnit(2)}}>斤<img style={{display:unit == 2 ? 'block' : 'none'}} className="m-device-unit-ico" src={require('../../../../static/images/device/icon-select.png')} alt=""/></li>
          </ul>
        </div>

      </div>
    )
  }


}

export default connect(
  debug(selectors),
  actions
)(DeviceUnit)

