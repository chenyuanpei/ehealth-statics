import React, {Component, PropTypes} from 'react'
import {decorate} from 'react-mixin'
import ReactComponentWithPureRenderMixin from 'react-addons-pure-render-mixin'
import classnames from 'classnames'

@decorate(ReactComponentWithPureRenderMixin)
export default class SoundMsg extends Component {

  static propTypes = {
    playing: PropTypes.bool,
  }

  state = {
    show: 3
  }

  componentDidUpdate(prevProps, prevState) {
    const {playing: prevPlaying} = prevProps
    const {playing} = this.props
    if (playing !== prevPlaying) {
      if (playing) {
        this.play()
      } else {
        this.stop()
      }
    }
  }

  render() {
    const {show} = this.state

    return (
      <div className={classnames('soundMsgIcon', 'soundMsgIcon-' + show)}>
      </div>
    )
  }

  play() {
    this.intervalId = setInterval(() => {
      let {show} = this.state
      show++
      if (show > 3) {
        show = 1
      }
      this.setState({
        show
      })
    }, 300)
  }

  stop() {
    clearInterval(this.intervalId)
    this.setState({show: 3})
  }

}
