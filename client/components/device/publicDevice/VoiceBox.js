import React, {Component, PropTypes} from 'react'

export default class VoiceBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlay: false,
      allTime: 0,
      currentTime: 0
    }
  }
  millisecondToDate(time) {
    const second = Math.floor(time % 60)
    let minite = Math.floor(time / 60)

    return `${minite}:${second >= 10 ? second : `0${second}`}`
  }

  controlAudio(type,value) {
    const { id } = this.props
    const audio = document.getElementById(`audio${id}`)
    switch(type) {
      case 'allTime':
        this.setState({
          allTime: audio.duration
        })
        break
      case 'play':
        audio.play()
        this.setState({
          isPlay: true
        })
        break
      case 'pause':
        audio.pause()
        this.setState({
          isPlay: false
        })
        break
      case 'changeCurrentTime':
        this.setState({
          currentTime: value
        })
        audio.currentTime = value
        if(value == audio.duration) {
          this.setState({
            isPlay: false
          })
        }
        break
      case 'getCurrentTime':
        this.setState({
          currentTime: audio.currentTime
        })
        if(audio.currentTime == audio.duration) {
          this.setState({
            isPlay: false
          })
        }
        break
    }
  }
  render() {
    const {id,src} = this.props
    const {isPlay,allTime,currentTime} = this.state
    const percentNum = (currentTime / allTime)*100
    return (
      <div className={isPlay ? 'm-public-device-voice' : 'm-public-device-voice play-ing'}>
        <h2>医生建议</h2>
        <p>来自乐心医生</p>
        <audio
          id={`audio${id}`}
          src={src}
          preload={true}
          onCanPlay={() => this.controlAudio('allTime')}
          onTimeUpdate={(e) => this.controlAudio('getCurrentTime')}
        >
          您的浏览器不支持 audio 标签。
        </audio>

        <i
            className={isPlay ? 'pause' : 'play'}
            onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')}
        />
        <div className={isPlay ? 'play-ing' : ''}>
          <i className="icon_audio_playing" />
          <i className="icon_audio_default" />
        </div>
        <span className="m-public-device-time">
           {allTime ? this.millisecondToDate(allTime) : ' '}
        </span>
        <div className="progress_bar" style={{width:percentNum+'%'}}></div>
      </div>
    )
  }
}
