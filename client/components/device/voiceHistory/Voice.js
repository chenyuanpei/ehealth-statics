import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import classnames from 'classnames'

export default class Voice extends Component {
  static propTypes = {
    voice: PropTypes.shape({
      sendTime: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
      readFlag: PropTypes.bool.isRequired,
    }),
    playVoice: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.playSound = this.playSound.bind(this)
  }

  playSound() {
    const {playVoice, voice} = this.props
    playVoice(voice)
  }

  render() {
    const {voice: {sendTime, duration, readFlag}} = this.props

    return (
      <div className="voiceBar" onClick={this.playSound}>
        <div>{'血压计给您发了一条语音'}</div>
        <div className={classnames('iconVoice', {iconVoicePoint: !readFlag})}/>
        <div className="timeSpan">{`${duration}'`}</div>
        <div><span className="timeSpan">{moment(sendTime).format('HH:mm')}</span></div>
      </div>
    )
  }
}
