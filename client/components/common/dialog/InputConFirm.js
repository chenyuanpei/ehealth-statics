import React, {Component, PropTypes} from 'react'
import Confirm from './Confirm'
import Fixed from '../fixed/Fixed'
export default class InputConFirm extends Component {
  state = {
    show: this.props.show,
    val: this.props.value,
  }
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    maxLength: PropTypes.number,
    pattern: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    onClose: PropTypes.func
  }

  static defaultProps = {
    show: false,
    maxLength: 12,
    type: 'text',
  }

  render() {
    const {title, maxLength, onClick, onClose, placeholder} = this.props
    const {val, show} = this.state
    require('../../../styles/common/dialog/inputConfirm.less')
    const buttons = [{
      type: 'default',
      label: '取消',
      onClick: () => {
        this._hide()
        onClose && onClose()
      }
    }, {
      type: 'default',
      label: '确认',
      onClick: () => {
        this._hide()
        onClick && onClick(val)
        onClose && onClose()
      }
    }]
    const onChange = (e) => {
      let tar = e.target
      //tar.style.height = tar.scrollHeight + 'px'
      this.setState({val: tar.value})
    }
    const height = window.innerHeight
    const focus = () => {
      // const el = document.getElementsByClassName("weui_dialog")[0]
      // el.style.top = parseInt(el.offsetHeight / 2) + 5 + 'px'
      // const top = window.innerHeight
      // const timer = setInterval(() =>  {
      if (window.innerHeight === height) {
        //const el = document.getElementsByClassName("weui_dialog")[0]
        //el.style.top = parseInt(el.offsetHeight / 2) + 5 + 'px'
      }
      // if (top < window.screenTop) {
      //    top = window.screenTop
      //    el.style.top = top + 'px'
      // } else {
      //    clearInterval(timer)
      // }
      // alert(document.body.clientHeight)
      // }, 10000)
    }
    const blur = () => { // 不调这个方法，因为安卓先触发失去焦点才能击确定，所以造成确定要点两下。
      const el = document.getElementsByClassName("weui_dialog")[0]
      el.style.top = '50%'
    }
    return (
      <Fixed show={show}>
        <Confirm show={show} buttons={buttons} title={title}>
          <input className="textArea" ref="text" value={val} onFocus={focus}
                    onChange={onChange} maxLength={maxLength} placeholder={placeholder}/>
          <div className="close" onClick={() => this._clear()}>×</div>
          <div className="length">{`${val ? val.length : 0}/${maxLength}`}</div>
        </Confirm>
      </Fixed>
    )
  }

  _clear() {
    this.refs.text.value = ''
    this.setState({val: ''})
  }

  _hide() {
    this.refs.text.value = ''
    this.setState({show: false, val: ''})
  }

  show() {
    this.setState({show: true})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      val: nextProps.value
    })
  }
}
