import React, {Component, PropTypes} from 'react'

let SwiperClass
if (process.browser) {
  SwiperClass = require('swiper')
}
const containerStyle = {
  width: '100%',
  height: '100%'
}
export default class Send extends Component {
  state = {
    showIconBox:this.props.showEmoji,
    status:this.props.status
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }
  componentDidMount() {
    const {swiperContainer,swiperPagination} = this.refs

    const options = {
      pagination: swiperPagination
    }

    this.swiper = new SwiperClass(swiperContainer, options);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {showEmoji,status} = this.props

    const {showEmoji: nextShowEmoji,status:nextStatus} = nextProps

    if (showEmoji !== nextShowEmoji || status !==nextStatus) {
      return true
    }

    return false
  }
  componentWillReceiveProps(nextProps) {
    const {showEmoji,status} = this.props
    const {showEmoji: nextShowEmoji,status:nextStatus} = nextProps

    if (showEmoji !== nextShowEmoji || status !==nextStatus) {
      this.setState({
        showIconBox: nextShowEmoji,
        status:nextStatus
      })
    }
  }

  render() {
    require('../../styles/page/dialogue.less')
    require('swiper/src/less/swiper.less')
    const {onClick} = this.props
    const {showIconBox,status} = this.state
    let disabledParam = {}
    let clickImgEvent = {onClick:() => this._clickImg()}

    return (
      <form action="#" method="POST" onSubmit={(e) => this._submit(e)} className="inBtottom">
        <div className="chagImg" {...clickImgEvent}>
          <img src={require('../../../static/images/chat/icon-dialogue-image.png')}/>
          {/* <input ref="imgFileInput" type="file" onChange={() => this._imgFileChange()}/> */}
        </div>
       <input {...disabledParam} className="inbSy" ref="textInput" onFocus={this.props.onFocus} onBlur={this.props.onBlur} placeholder="输入信息..."
                              type="text"/>

        <div className="m-icon" onClick={onClick}><img src={require('../../../static/images/chat/icon-dialogue-expression.png')} alt=""/></div>
        {/*<div className="inSend" onClick={() => this._send()}>发送</div>*/}
        <div className="icon-box" style={{height:showIconBox ? '8rem' : '0'}}>
          <div className="swiperBox">
            <div className="swiper-container" style={containerStyle} ref="swiperContainer">
              <div className="swiper-wrapper">
                <div className="icon-slide swiper-slide">
                    <ul className="icoListBox">
                      <li onClick={this._choiceEmoji.bind(this)}>😀</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😁</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😂</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😃</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😄</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😅</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😆</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😇</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😈</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😉</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😊</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😋</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😌</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😍</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😎</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😏</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😓</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😒</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😔</li>
                      <li onClick={this._choiceEmoji.bind(this)}>😘</li>

                    </ul>
                    <div onClick={()=>this._deleteText()} className="deleteBtn">
                      <img src={require('../../../static/images/chat/icon-delete-Smilies.png')} alt=""/>
                    </div>
                </div>
                <div className="icon-slide swiper-slide">
                  <ul className="icoListBox">
                    <li onClick={this._choiceEmoji.bind(this)}>😚</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😝</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😟</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😠</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😡</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😢</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😣</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😤</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😥</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😪</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😫</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😬</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😭</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😰</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😱</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😲</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😳</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😴</li>
                    <li onClick={this._choiceEmoji.bind(this)}>😵</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🙁</li>

                  </ul>
                  <div onClick={()=>this._deleteText()} className="deleteBtn">
                    <img src={require('../../../static/images/chat/icon-delete-Smilies.png')} alt=""/>
                  </div>
                </div>
                <div className="icon-slide swiper-slide">
                  <ul className="icoListBox">
                    <li onClick={this._choiceEmoji.bind(this)}>🙄</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🤒</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🤓</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🤔</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🤕</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🙏</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🚄</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🚑</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🚙</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🚬</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🚶</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🆘</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🌙</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🌹</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🍉</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🍗</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🍙</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🍷</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🎂</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🍎</li>

                  </ul>
                  <div onClick={()=>this._deleteText()} className="deleteBtn">
                    <img src={require('../../../static/images/chat/icon-delete-Smilies.png')} alt=""/>
                  </div>
                </div>
                <div className="icon-slide swiper-slide">
                  <ul className="icoListBox">
                    <li onClick={this._choiceEmoji.bind(this)}>🏀</li>
                    <li onClick={this._choiceEmoji.bind(this)}>🏥</li>
                    <li onClick={this._choiceEmoji.bind(this)}>💉</li>
                    <li onClick={this._choiceEmoji.bind(this)}>👌</li>
                    <li onClick={this._choiceEmoji.bind(this)}>👍</li>
                    <li onClick={this._choiceEmoji.bind(this)}>👏</li>
                    <li onClick={this._choiceEmoji.bind(this)}>💊</li>
                    <li onClick={this._choiceEmoji.bind(this)}>💯</li>
                    <li onClick={this._choiceEmoji.bind(this)}>⚽</li>
                    <li onClick={this._choiceEmoji.bind(this)}>❤</li>

                  </ul>
                  <div onClick={()=>this._deleteText()} className="deleteBtn">
                    <img src={require('../../../static/images/chat/icon-delete-Smilies.png')} alt=""/>
                  </div>
                </div>
              </div>


              <div className="swiper-pagination" ref="swiperPagination"></div>
            </div>
          </div>
          <div className="sendBottomBox">
            <div className="leftIconBox">
              😀
            </div>
            <div onClick={() => this._send()} className="iconSendBtn">
              发送
            </div>
          </div>
        </div>
      </form>
    )
  }
  _choiceEmoji(event) {
    this.refs.textInput.value += event.target.innerHTML
  }
  _deleteText() {
    let thisVal = this.refs.textInput.value
    let lastChar = thisVal.charAt(thisVal.length - 1)
    var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
    if (!reg.test(lastChar)) {
      this.refs.textInput.value=thisVal.substring(0,thisVal.length-2)
    }else{
      this.refs.textInput.value=thisVal.substring(0,thisVal.length-1)
    }


  }
  blur() {
    this.refs.textInput.blur()
  }

  _clickImg() {
    const {sendPic} = this.props
    sendPic && sendPic()
  }

  _imgFileChange() {
    // const {sendPic} = this.props
    // const file = this.refs.imgFileInput.files[0]
    // this.refs.imgFileInput.value = ''
    // sendPic && sendPic(file)
  }

  _send() {
    const {sendText} = this.props
    sendText && sendText(this.refs.textInput.value)
    this.refs.textInput.value = ''
  }

  _submit(e) {
    e.preventDefault()
    this._send()
  }
}
