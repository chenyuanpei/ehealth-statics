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
// selectors
import selectors from './selectors'
// toast
import {toast} from '../../components/common/toast/PubSubToast'

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
    subList: []
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
    require('../../styles/information/index.less')
    // this.state.menuAction = this.props.columnId

    return (
        <div style={{minHeight: '100vh', backgroundColor: '#fff'}}>
          <Title title='健康资讯'/>
          {this._carousel()}
          {this._topMenu()}
          {this._getInformationList()}

          {this._togglePopup()}
        </div>
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

    if (banners) {
      return (
          <div className="carouselBox">
            <Swiper options={{pagination: '.swiper-pagination', autoplay: 3000, autoplayDisableOnInteraction: false,
              slideDuplicateClass : 'my-slide-duplicate'}}
                    className={'information'}>
              {
                banners.map((b) => <div className="lis"><img key={b.id} src={b.imgUrl} onClick={() => go(b)} {...opts}/><h2>{b.title}</h2></div>)
              }
            </Swiper>
          </div>
      )
    }
  }

  _topMenu() {
    let {menus, getList, columnId} = this.props
    const {menuAction} = this.state
    const setAction = ({id, columnLevel = 2}) => {
      this.setState({menuAction: id, count: 1})
      getList({id, columnLevel})
    }

    const subAction = () => {
      const subList = menus && menus.map(({isSubscribe, id: columnInfoId, name}) => ({isSubscribe, columnInfoId, name})).slice(0, 4) || []
      // const oldSub = subList.map(({isSubscribe}, i) => isSubscribe).reduce((pre,cur) => pre + cur)
      this.setState({showPopup: true, subList, subDib: true, 'oldSub': subList})
    }

    if (menus) {
      return (
          <div className="menu">
          <span className="menuBox">
            <span onClick={() => setAction({id: columnId, columnLevel: 1})}
                  className={menuAction === columnId || menuAction === null ? 'active' : ''}>最新</span>
            {
              menus.map((m, i) => {
                if (i < 4) {
                  return <span key={m.id} className={menuAction === m.id ? 'active' : ''} onClick={() => setAction({id: m.id})}>{m.name}</span>
                }
              })
            }
          </span>
            <span className="subscribe">
                <span onClick={() => subAction()}>订阅</span>
            </span>
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

    const getBsTableData = () => {
      let count = this.state.count
      ++count
      const columnLevel = this.state.menuAction === columnId ? 1 : 2
      if (this.props.lists.length < ((count - 1) * 15)) {
        toast('没有更多了！', {icon: 'warn'})
      } else {
        getList({id: this.state.menuAction, columnLevel, pageSize: parseInt(count * 15)})
      }
    }
    // onScrollStart

    if (lists) {
      return (
        <div className="informationBox">
          {
            lists.map((li, i) => {
              const regex = /,|，/
              const ts = li.keyWord && li.keyWord.split(regex)
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
            })
          }
          <div className="more" onClick={() => getBsTableData()}>更多文章</div>
        </div>
      )
    }
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

