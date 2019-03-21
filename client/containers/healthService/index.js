import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../util/common'
// components
// import ScrollView from '../../components/common/scroll/ScrollView'
import MyDialog from '../../components/common/dialog/myDialog'
import Swiper from '../../components/common/swiper'
import Title from '../../components/common/title/Title'
// actions
import actions from './actions'
import CountDown from '../../components/common/publicDevice/CountDown'
// selectors
import selectors from './selectors'
// toast
import {toast} from '../../components/common/toast/PubSubToast'
// const
import {protocol, hostname} from '../../config'
export default connect(
    debug(selectors),
    actions
)(class extends Component {
  state = {
    showPopup: false,
    subDib: true,
    menuAction: null,
    count: 1,
    oldSub: [],
    subList: [],
    hotStatus: false,
  }

  //
  componentDidMount() {
    const {loadData} = this.props
    loadData()
  }
  componentWillUnmount() {
    this.props.clear()
  }

  render() {
    require('../../styles/healthService/index.less')
    // this.state.menuAction = this.props.columnId

    return (
        <div style={{minHeight: '100vh'}}>
          <Title title='健康服务'/>
          {this._carousel()}
          {/*{this._renderMenuList()}*/}
          {/*{this._renderHot()}*/}
          {this._getInformationList()}
        </div>
    )
  }
  _renderHot() {
    const {hotActiveData} = this.props
    const {calPv,name,status,titlePicUrl,activeEndDate,url} = hotActiveData || {}
    let remainingTime = 0
    if(parseInt(activeEndDate) > 0){
      this.state.hotStatus = true
      remainingTime = activeEndDate - Date.parse(new Date())
    }
    if(!activeEndDate){
      return (
        <div></div>
      )
    }
    const messages = {
      days: {
        plural: '天',
        singular: '天',
      },
      hours: '小时',
      mins: '分',
      segs: '秒',
    }
    const _finish = () => {
      this.state.hotStatus = false

    }
    return (
        <div className="m-health-service-hot">
            <div className="m-health-service-title">
              <img src={require('../../../static/images/healthService/ic_title_active@2x.png')} alt=""/>热门活动
            </div>
            <div className="m-hot-img" onClick={()=>this._goToUrl(url)}>
              <div className={this.state.hotStatus ? "m-blue-text" : 'm-black-text'}>
                {this.state.hotStatus ? '进行中' : '已结束'}
              </div>
              <img src={titlePicUrl} alt=""/>
              <div className="m-opacity-bottom">
                <div className="hot-num" style={{display:this.state.hotStatus ? 'block' : 'none'}}>
                  <img src={require('../../../static/images/healthService/ic_activity_hot@2x.png')} alt=""/>
                  {calPv}
                </div>
                <div className="m-time-right" style={{display:this.state.hotStatus ? 'block' : 'none'}}>
                  距离结束：{activeEndDate ? <CountDown
                  RemainingTime={remainingTime}
                  className="countdown_time"
                  {...messages}
                  onEnd={_finish}
                /> : ''}
                </div>
                <div className="m-time-right" style={{display:!this.state.hotStatus ? 'block' : 'none'}}>
                  活动已结束
                </div>
              </div>
            </div>
            <div className="m-hot-ad-text" onClick={()=>this._goToUrl(url)}>
              {name}
            </div>
        </div>
    )
  }
  _goToUrl(url) {
    const {hotActiveData,addPv} = this.props
    const {id} = hotActiveData || {}
    addPv({id,url})

  }
  _goToSport() {
    window.location.href = `https://m.chengyisheng.com.cn/wechat_web/wap_wechat_patient/html/liveVideoForOther.html`
  }
  _renderMenuList() {
    const {hotActiveData} = this.props
    const {famousUrl} = hotActiveData || {}
    return (
          <ul className="m-menu-list">
            <li className="m-menu-item" onClick={()=>this._goToUrl(famousUrl)}>
              <img src={require('../../../static/images/healthService/ic_serve_doctor@2x.png')} alt=""/>
              <span>名医咨询</span>
            </li>
            <li onClick={() => {this._goToUrl('https://m.chengyisheng.com.cn/wechat_web/wap_wechat_patient/html/imageInquiryDesc.html?channel=LEXIN')}} className="m-menu-item">
              <img src={require('../../../static/images/healthService/ic_serve_report@2x.png')} alt=""/>
              <span>报告解读</span>
            </li>
            <li className="m-menu-item" onClick={()=>this._goToSport()}>
              <img src={require('../../../static/images/healthService/ic_serve_live@2x.png')} alt=""/>
              <span>名医直播</span>
            </li>
            <li className="m-menu-item" onClick={()=>this._goUrl('healthReport/list')}>
              <img src={require('../../../static/images/healthService/ic_serve_bloodpressure@2x.png')} alt=""/>
              <span>健康周报</span>
            </li>

          </ul>
    )
  }
  _carousel() {
    const {banners} = this.props
    const go = ({redirectAddr}) => {
      window.location.href = redirectAddr
    }
    const opts = {
      style: {
        width: '100%',
        height: '100%'
      }
    }

    if (banners && banners.length > 0) {
      return (
          <div className="m-carousel-box">
            <Swiper options={{pagination: '.swiper-pagination', autoplay: 3000, autoplayDisableOnInteraction: false,
              slideDuplicateClass : 'my-slide-duplicate'}}
                    className={'information'}>
              {
                banners.map((b) => <div className="lis"><img key={b.id} src={b.imgUrl} onClick={() => go(b)} {...opts}/></div>)
              }
            </Swiper>
          </div>
      )
    }
  }



  _getInformationList() {
    const {lists, getList, columnId} = this.props

    const go = ({id, content, thirdUrl}) => {
      let text = content.match(/\<\!--content start--\>([^]*)<\!--content end--\>/)
      text = (text && text[1]) || ''
      const reg = /<[^>]*>[\s]*<\/[^>]*>|([\r\n]|<\/?.+?>)|(&nbsp;|\s*)/g
      text = text.replace(reg,'')

      if (!text) {
        if (!!thirdUrl) {
          window.location.href = thirdUrl
        } else {
          toast('此文章无内容可阅读！', {icon: 'warn'})
        }
      } else {
        this.props.push(`information/${id}`)
      }
    }

    if (lists) {
      return (
        <div className="m-information-box">
          <div className="m-health-service-title">
            <img src={require('../../../static/images/healthService/ic_title_article@2x.png')} alt=""/>
            精彩文章
          </div>
          {
            lists.map((li, i) => {
              console.log(li)
              const regex = /,|，/
              const ts = li.keyWord && li.keyWord.split(regex)
              if(i<4){
                return (
                  <div key={i} className="list" onClick={() => go(li)}>
                    <img className="img" src={li.icon}/>
                    <div className="right">
                      <div className="title">{li.title}</div>
                      <div className="tipBox">
                        {/*{*/}
                        {/*ts && ts.map((t, j) => <span key={j}>{t}</span>) || ''*/}
                        {/*}*/}
                        {li.author ? <div className="m-article-label m-author-label"><img className="m-author-ico" src={require('../../../static/images/healthService/ic_article_author@2x.png')} alt=""/> {li.author}</div> : ''}
                        <div className="m-article-label"><img className="m-glance-ico" src={require('../../../static/images/healthService/ic_article_glance@2x.png')} alt=""/> {li.calPv}</div>

                      </div>
                    </div>
                  </div>
                )
              }

            })
          }
          <div className="more" onClick={() => this._goUrl('information')}>更多文章</div>
        </div>
      )
    }
  }
  _goUrl(url){
    this.props.push(url)
  }
  copyArr(arr) {
    return arr.map((e) => {
      if (typeof e === 'object') {
        return Object.assign({}, e)
      } else {
        return e
      }
    })
  }

  getStatus (oldSub, subList) {
    let yText = []
    let nText = []
    oldSub.map((ol, i) => {
      const ne = subList[i]
      if (ol.columnInfoId === ne.columnInfoId) {
        if (ol.isSubscribe === 0 && ne.isSubscribe === 1) {
          nText.push(ol.name)
        }
        if (ol.isSubscribe === 1 && ne.isSubscribe === 0) {
          yText.push(ol.name)
        }
      }
    })
    yText = yText.join(',')
    nText = nText.join(',')
    if (yText && !nText) {
      return `您已订阅"${yText}"栏目，有内容更新时，将会为您推送。`
    } else if (!yText && nText) {
      return `您已取消订阅"${nText}"栏目，将不再收到内容推送。`
    } else {
      return `您的订阅栏目已经修改成功`
    }
  }

  _togglePopup() {
    const {setSubscribe, getList, getTwoCoumnTas, columnId} = this.props
    const {subList, subDib, oldSub} = this.state
    const onClick = () => {
      this.setState({showPopup: false})
    }

    const setSub = ({columnInfoId, isSubscribe, name}) => {
      let list = this.copyArr(this.state.subList)
      list.push({columnInfoId, 'isSubscribe': isSubscribe === 0 ? 1 : 0, name})
      const map = {}
      list.forEach(item => {
        map[`${item.name + item.columnInfoId}`] = item
      })
      const subList = Object.keys(map).map(key => map[key])
      this.setState({subList, subDib: false})
    }

    const save = () => {
      const text = this.getStatus(oldSub, subList)
      const columnLevel = this.state.menuAction === columnId ? 1 : 2
      if (subDib) {
        return
      } else {
        try {
          setSubscribe({subList, text})
          this.setState({showPopup: false, subDib: false})
          getTwoCoumnTas()
          getList({id: this.state.menuAction, columnLevel})
        } catch (e) {

        }
      }
    }

    if (subList.length !== 0) {
      return (
          <MyDialog show={this.state.showPopup} onCancel={() => onClick()}>
            <div className="subBox">
              <span className="close" onClick={() => onClick()}></span>
              <div className="title">点击订阅栏目，可通过微信实时获取最新动态</div>
              <div className="buttonBox" ref="subBox">
                {
                  subList.map((me, i) => {
                    if (i < 4) {
                      return (
                          <span key={i} onClick={() => setSub(subList[i])}
                                className={me.isSubscribe === 0 ? 'active' : ''}>{me.name}</span>
                      )
                    }
                  })
                }
              </div>
              <div className={`save ${subDib? 'dib' : ''}`} onClick={() => save()}>完成</div>
            </div>
          </MyDialog>
      )
    }
  }

})

