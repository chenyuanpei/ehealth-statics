import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import Tab from '../../../components/common/form/Tab'
import Select from '../../../components/common/dialog/select'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
import moment from 'moment'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(
  class extends Component {
    componentDidMount() {
      const {init, params: {deviceId}} = this.props
      init({deviceId})
    }

    constructor(props) {
      super(props)
      this.timeData = this._genData()
    }

    render() {
      require('../../../styles/device/powerMode.less')
      const {isShowPowerModeTime: {show, title, value}} = this.props
      return (
        <div className={'powerMode'}>
          <Title title={'起止时间'}/>
          {this._renderTab()}
          {this._renderText()}
          <Select show={show} title={title} data={this.timeData} value={value.split(':')}
                  confirm={(val) => this._confirm(val)}
                  onCancel={() => this._close()}
          ></Select>
        </div>
      )
    }

    _renderTab() {
      const {powerMode: {start, end}} = this.props
      return ([
        <Tab key="1" name='开始时间' val={start}
             onClick={() => this.props.showPowerModeTime({show: true, title: '开始时间', value: start, key: 'start'})}/>,
        <Tab key="2" name='结束时间' val={end}
             onClick={() => this.props.showPowerModeTime({show: true, title: '结束时间', value: end, key: 'end'})}/>
      ])
    }

    _renderText() {
      return (
        <div className="mode_text">
          <div>1.时间间隔不能少于15分钟；</div>
          <div>2.当开始时间与结束时间一致时，代表全天运行省电勿扰模式。</div>
        </div>
      )
    }

    _confirm(val) {
      const {isShowPowerModeTime: {key}, powerMode, updatePowerMode} = this.props
      const data = {...powerMode, [key]: val.join(':')}
      const diff = moment(data.start, 'HH:mm').diff(moment(data.end, 'HH:mm'), 'minutes')
      if (diff !== 0 && diff > -15 && diff < 15) {
        toast('开始与结束时间间隔不能少于15分钟！')
        return
      }
      updatePowerMode(data)
      this._close()
    }

    _close() {
      this.props.showPowerModeTime({show: false, value: '00:00'})
    }

    _genData() {
      return [{
        right: '时',
        values: (() => {
          const values = []
          for (let i = 0; i < 24; i++) {
            values.push(i < 10 ? `0${i}` : `${i}`)
          }
          return values
        })()
      }, {
        right: '分',
        values: (() => {
          const values = []
          for (let i = 0; i < 60; i++) {
            values.push(i < 10 ? `0${i}` : `${i}`)
          }
          return values
        })()
      }]
    }
  })

