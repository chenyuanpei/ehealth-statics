import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import PubSub from 'pubsub-js'
import moment from 'moment'
// components
import ScrollView from '../../../components/common/scroll/ScrollView'
import Top from '../../../components/chat/top'
import DoctorList from '../../../components/chat/DoctorList'
import TextMsg from '../../../components/chat/textMsg'
import LinkMsg from '../../../components/chat/LinkMsg'
import ImgMsg from '../../../components/chat/imgMsg'
import SoundMsg from '../../../components/chat/soundMsg'
import Time from '../../../components/chat/time'
import Send from '../../../components/chat/send'
import Alert from '../../../components/common/dialog/Alert'
import Title from '../../../components/common/title/Title'
import AdminMsg from '../../../components/chat/adminMsg'
import PreTipsMsg from '../../../components/chat/preTipsMsg'

import {TOPIC_CHAT_DOCTOR_LIST_CLOSE} from '../../../components/chat/DoctorList'
import {TOPIC_COUNT_DOWN_CLOSE_EVENT} from '../../../components/chat/top'
import {TOPIC_PUSH_DOCTOR_SERVICE_EVENT} from '../../../components/chat/top'

// actions
import actions from './actions'

// selectors
import chatPageSelector from './selectors'
// wxApi
import {closeWindow} from '../../../util/wxJs/wxApi'
// util
import {debug} from '../../../util/common'
import {MsgType} from '../../../util/im'

export default connect(
  debug(chatPageSelector),
  // chatPageSelector,
  actions
)(class Chat extends Component {
  static defaultProps = {
    member: {},
    doctor: {}
  }

  constructor(props) {
    super(props)

    this._loadLast = this._loadLast.bind(this)
    this._blur = this._blur.bind(this)
    this._onBlur = this._onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.sendText = this.sendText.bind(this)
    this.sendPic = this.sendPic.bind(this)
  }

  componentDidMount() {
    const {init,showDoctorList,getCloseConsultOrder, params: {memberId, doctorId, type},location:{query:{relationType,doctorTeamId}}} = this.props
    //localStorage.setItem('loadTime',new Date().getTime())
    init({memberId, doctorId, type,relationType,doctorTeamId})
    // 关闭
    this.closeDoctorListToken = PubSub.subscribe(TOPIC_CHAT_DOCTOR_LIST_CLOSE, (topic, data) => {
      showDoctorList(false)
    })
    this.closeEventToken = PubSub.subscribe(TOPIC_COUNT_DOWN_CLOSE_EVENT, (topic) => {
      getCloseConsultOrder({doctorId,memberId})
    })

    this.handleLinkToken = PubSub.subscribe(TOPIC_PUSH_DOCTOR_SERVICE_EVENT, (topic,data) => {
      const domain = location.host || document.domain
      if(domain.indexOf('qa') >= 0){
        window.location.href = `https://static-qa2.lifesense.com/health/#/doctorTeam/studio?doctorId=${data.doctorId}&param=1`
      }else{
        window.location.href = `https://lifejoy-health.booen.co/health/#/doctorTeam/studio?doctorId=${data.doctorId}&param=1`
      }

    })


    this.height = 1000
    if (this.refs.scroll) {
      const swiper = this.refs.scroll.swiper
      let height = swiper.slides[0].offsetHeight - swiper.height
      this.height = swiper.slides[0].offsetHeight - swiper.height
      height = height > 0 ? height : 0
      swiper.setWrapperTranslate(-height)
    }
  }

  componentWillUnmount() {
    const {leave, memberId, doctorId} = this.props
    leave({memberId, doctorId})
    //localStorage.removeItem('loadTime')
    localStorage.removeItem('newMsgCreateTime')
    localStorage.removeItem('newMsgLength')
    PubSub.unsubscribe(this.closeDoctorListToken)
    PubSub.unsubscribe(this.closeEventToken)
    PubSub.unsubscribe(this.handleLinkToken)
    this.props.clear()

  }

  componentDidUpdate(prevProps, prevState) {
    const {chatRecords} = this.props
    const {chatRecords: prevChatRecords} = prevProps || {}
    // console.error('chatRecords', chatRecords)
    if (!chatRecords || !chatRecords.size) {
      // 当前没有历史记录，不渲染
      // console.error('当前没有历史记录，不处理')
      return
    }
    if (prevChatRecords && prevChatRecords.size === chatRecords.size) {
      // console.error('消息条数没变，不处理')
      return
    }
    const swiper = this.refs.scroll.swiper
    if (swiper.slides[0].offsetHeight < swiper.height) {
      swiper.setWrapperTranslate(0)
      // console.error('0')
      return
    }
    if (
      prevChatRecords && chatRecords.size > prevChatRecords.size &&
      (prevChatRecords.size >= 20 || chatRecords.size - prevChatRecords.size === 20) &&
      prevChatRecords.get(prevChatRecords.size - 1).time === chatRecords.get(chatRecords.size - 1).time
    ) {
      // 加载历史渲染,定位到上一次位置
      // console.error('加载历史渲染,定位到上一次位置')
      swiper.setWrapperTranslate(-(swiper.slides[0].offsetHeight - this.lastHeight))
    } else if (chatRecords && chatRecords.size > 0) {
      // 发送消息渲染,定位到最下
      // console.error('发送消息渲染,定位到最下')
      let height = swiper.slides[0].offsetHeight - swiper.height
      height = height > 0 ? height : 0
      swiper.setWrapperTranslate(-height)
    }
    // console.error('1')
    // swiper.setWrapperTranslate(-(swiper.slides[0].offsetHeight - swiper.height))
  }
  _renderMemberList() {
    const {teamInfo,showDoctorList} = this.props
    if(teamInfo){
      showDoctorList(true)
    }
  }
  _close() {
    showDoctorList(false)
  }
  render() {
    require('../../../styles/page/dialogue.less')

    const {isError,teamInfo,isShowDoctorList, loadingHistory,teamMember,countDownTime,isShowEmoji} = this.props
    const {chatStatus} = countDownTime || {}
    let _this = this
    let thisHour = moment().get('hour')
    let showTips = false
    if(chatStatus+1<2 && (thisHour > 22 || thisHour < 8)){
      showTips = true
    }
    return (
      <div className="chat">
        <div className={isShowDoctorList ? "chat_blur" : ""}>
          <Title title='医生消息'/>

          <Top {...countDownTime} {...teamInfo} onClick={() => {_this._renderMemberList()}} ref='top'/>
          <div className="chatBox" onTouchStart={this._blur} style={{top:chatStatus+1 >=1 ? '2.8rem' : '1.4rem',bottom:isShowEmoji?'8rem':'0'}}>
            <div style={{display:isShowEmoji?'block':'none'}} className="icon_mask" onClick={()=>this._showEmojiBox()}></div>
            <ScrollView ref="scroll" onScrollStart={this._loadLast}>
              {this._renderLoadingOrNoMore()}
              {this._renderChatBox()}
              {showTips &&
                <PreTipsMsg text={`晚上22:00至早上8:00为医生休息时间，医生可能无法及时回答您的问题`} />
              }
            </ScrollView>
            {this._renderSend()}
          </div>

          {isError && (
            <Alert show={true} text="知道了" onClick={() => closeWindow()}>
              <div className="alert">医生或成员已被删除，<br/>不可再进行对话。请核实。</div>
            </Alert>
          )}
          {loadingHistory && <div className={'loadingMask'}></div>}
        </div>

        {teamMember && <DoctorList onClick={() => {this._close()}} show={isShowDoctorList} teamMember={teamMember}></DoctorList>}
      </div>
    )
  }

  // 加载中 或 没有更多
  _renderLoadingOrNoMore() {
    const {noMore} = this.props
    if (!noMore) {
      return (
        <div className={'loadingMoreText'}>{'加载中...'}</div>
      )
    }
    return (
      <div className={'loadingMoreText'}>{'没有更多历史记录'}</div>
    )
  }

  _renderChatBox() {
    const {chatRecords,countDownTime, doctor,push,isShowEmoji, member, assistants, playSound, playingSound} = this.props
    let {chatStatus} = countDownTime || {}
    if (!chatRecords) {
      return
    }
    if (chatRecords && !chatRecords.size) {
      return
    }
    let prveTime = null
    return (
      chatRecords.toArray().map((chat, idx) => {
        const {fromId, isSend, random, msgType, content, time, loading, name, headImgUrl} = chat

        let dom = []
        const key = '' + random + time
        const options = {
          me: isSend,
          content,
          loading,
        }

        if(fromId=='admin'){
          if (!prveTime || chat.time - prveTime > 300) { // 300s 5分钟
            prveTime = chat.time
            dom.push(<Time key={`time${key}`} time={time * 1000}/>)
          }
          dom.push(<AdminMsg key={`text${key}`} {...options} />)
        }else{
          if (isSend) {
            options.name = member.nickname || member.name
            options.sex = member.sex
            options.headImgurl = member.headImgurl
          } else {
            options.name = name
            options.headImgurl = headImgUrl
            // 根据fromId，显示对应医生/护理 name、headImgurl
            //if (fromId === doctor.id) {
            //  options.name = doctor.name
            //  options.headImgurl = doctor.headimgurl
            //} else {
            //  const assistants = assistants.find(assistant => assistants.id === fromId)
            //  options.name = assistants.name
            //  options.headImgurl = assistants.headimgurl
            //}
            // options.defaultHeadimgurl = '' // 医生默认头像
          }

          if (!prveTime || chat.time - prveTime > 300) { // 300s 5分钟
            prveTime = chat.time
            dom.push(<Time key={`time${key}`} time={time * 1000}/>)
          }

          if (msgType === MsgType.Text) {
            dom.push(<TextMsg key={`text${key}`} {...options}/>)
          } else if (msgType === MsgType.Image) {
            dom.push(<ImgMsg key={`img${key}`} {...options} />)
          } else if (msgType === MsgType.Sound) {
            const {playing, loading, error} = playingSound && playingSound.sound.uuid === content.uuid ? playingSound : {}
            options.playing = playing || loading // 下载中、播放中，都显示播放中效果
            // options.loading = loading
            options.error = error
            dom.push(<SoundMsg key={`sound${key}`} {...options} playSound={playSound}/>)
          }else if (msgType === MsgType.Custom) {
            let _this = this
            const {customData:{articleUrl,id}} = content
            dom.push(<LinkMsg key={`link${key}`} {...options} text={content.customData.content} onClick={()=>_this._goToLink(articleUrl,id)} />)

          }
        }

        return (
          <div key={key}>
            {dom}
          </div>
        )
      })
    )
  }
  _goToLink(url,id) {
    if(url){
      if(url.indexOf('http') >=0){
        window.location.href = url
      }else{
        window.location.href = 'http://'+url
      }
    }else{
      this.props.push(`doctorTeam/info?id=${id}`)
    }
  }

  _showEmojiBox() {
    const {showEmojiBox,isShowEmoji} = this.props
    showEmojiBox(!isShowEmoji)
  }
  _renderSend() {
    const {isShowEmoji,countDownTime} = this.props
    const {chatStatus} = countDownTime || {}
    return <Send ref="send" sendPic={this.sendPic} status={chatStatus} onClick={()=>this._showEmojiBox()} showEmoji={isShowEmoji} onFocus={this.onFocus} onBlur={this._onBlur} sendText={this.sendText}/>
  }

  _blur() {
    this.refs.send.blur()
  }

  onFocus() {
    const {showEmojiBox} = this.props
    const swiper = this.refs.scroll.swiper
    showEmojiBox(false)
    this.timer = setInterval(() => {
      document.body.scrollTop = document.body.scrollHeight
      if (this.height > swiper.height) {
        this.height = swiper.slides[0].offsetHeight - swiper.height
        swiper.setWrapperTranslate(-(this.height))
      }
    }, 50)
  }

  _onBlur() {
    const swiper = this.refs.scroll.swiper
    let height = swiper.slides[0].offsetHeight - swiper.height
    height = height > 0 ? height : 0
    swiper.setWrapperTranslate(-height)
    clearInterval(this.timer)
  }

  _loadLast() {
    const {getHistory, noMore, chatRecords, loadingHistory} = this.props
    // 加载中、没有更多历史记录、消息记录还没初始化时不请求加载历史记录
    if (loadingHistory || noMore || !chatRecords || !chatRecords.size) {
      return
    }
    this.lastHeight = this.refs.scroll.swiper.slides[0].offsetHeight
    getHistory()
  }

  sendText(val) {
    const {sendText} = this.props
    if (!val) {
      return
    }
    sendText({text: val})
  }

  sendPic(file) {
    const {sendImg} = this.props
    sendImg({file})
    //   const sendFail = (localId) => uploadImageOne({
    //     localId,
    //     success: (serverId) => {
    //       send({type: 'image', serverId, localId, doctorId, memberId})
    //     },
    //     fail: sendFail
    //   })
    //   chooseImage(() => {
    //     uploadImage({
    //       success: (i, serverId, localId) => {
    //         send({type: 'image', serverId, localId, doctorId, memberId})
    //       }, fail: (i, localId) => {
    //         sendFail(localId)
    //       }
    //     })
    //   })
  }
})
