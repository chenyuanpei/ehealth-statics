import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import Time from '../../../components/device/voiceHistory/Time'
import Voice from '../../../components/device/voiceHistory/Voice'
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

    render() {
      require('../../../styles/device/voiceHistory.less')
      return (
        <div className={'deviceVoiceHistoryPage'}>
          <Title title={'历史语音'}/>
          {/* 语音列表 */}
          {this.renderVoiceList()}
        </div>
      )
    }

    renderVoiceList() {
      const {voiceList, playVoice} = this.props
      if (!voiceList) {
        return <noscript/>
      }
      return voiceList.map((voice, index) => {
        const prevVoice = voiceList.get(index - 1)
        const nodes = []

        if (index === 0 || !moment(prevVoice.sendTime).isSame(voice.sendTime, 'day')) {
          nodes.push(
            <Time {...voice} />
          )
        }

        nodes.push(
          <Voice voice={voice} playVoice={playVoice}/>
        )

        return nodes
      })
    }

  })

