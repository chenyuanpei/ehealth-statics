import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// store
// import store from '../../../store'
import Title from '../../../components/common/title/Title'
// actions
import actions from '../actions'
// selectors
import selectors from './selectors'
import {routingSelector} from '../../../selectors/routing'
// import {paramsSelector} from '../selectors'
import {debug} from '../../../util/common'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

export default connect(
    debug(selectors),
    actions
)(class extends Component {

  componentDidMount() {
    const {loadInfoData, params: columnContentInfoId} = this.props
    // const routing = routingSelector(store.getState())
    // const params = routing.get('pathname').split('/')

    // const columnInfoId = routing.getIn(['query', 'columnInfoId'])
    // loadInfoData({columnContentInfoId: params[params.length - 1], columnInfoId})
    loadInfoData({columnContentInfoId})
  }

  componentWillUnmount() {
    this.props.clear()
    this.state = null
  }

  render() {
    require('../../../styles/information/index.less')

    return (
      <div style={{minHeight: '100vh', backgroundColor: '#fff'}}>
        {this._getTtile()}

        {this._getInfo()}
        {this._getHotList()}
      </div>
    )
  }

  _getTtile () {
    const {infos} = this.props
    if (infos) {
      return (
          <Title title={infos.columnInfoName}/>
      )
    }
  }

  _getHotList () {
    const {hotLists, loadInfoData} = this.props
    const go = ({id: columnContentInfoId, content, thirdUrl}) => {
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
        loadInfoData({columnContentInfoId})
      }
    }

    if (hotLists) {
      return (
        <div className="hotListBox">
          <div className="title">热门文章</div>
          {
            hotLists.map((h, i) => {
              const regex = /,|，/
              const ts = h.keyWord && h.keyWord.split(regex)
              return (
                <div className="listBox" onClick={() => go(h)} key={i}>
                  <img style={{display:h.icon?'inline-block':'none'}} src={h.icon}/>
                  <span>
                    <div className="title">{h.title}</div>
                    <div className="tipBox">

                        {/*ts && ts.map((t, j) => <span key={j}>{t}</span>) || ''*/}
                      {h.author ? <div className="m-article-label m-author-label"><img className="m-author-ico" src={require('../../../../static/images/healthService/ic_article_author@2x.png')} alt=""/> {h.author}</div> : ''}
                        <div className="m-article-label"><img className="m-glance-ico" src={require('../../../../static/images/healthService/ic_article_glance@2x.png')} alt=""/> {h.calPv || 0}</div>


                    </div>
                  </span>
                </div>
              )
            })
          }
          <div className="more" onClick={() => this.props.push(`information`)}>更多文章</div>
        </div>
      )
    }
  }

  _getInfo() {
    const {infos} = this.props
    if (infos) {
      let text = infos.content.match(/\<\!--content start--\>([^]*)<\!--content end--\>/)
      text = (text && text[1]) || ''
      return (
          <div className="infoBox">
            <h2 className="title">{infos.title}</h2>
            <div className="tip">
              <span>{infos.author}</span>
              {/*<span>{moment(infos.releaseTime).format('YYYY-MM-DD')}</span>*/}
              <span>{new Date(infos.releaseTime).format('yyyy-MM-dd')}</span>
              <span>阅读{parseInt(infos.calPv) || '0'}</span>
            </div>
            <img style={{display:infos.titlePicUrl?'block':'none'}}  className="ban" src={infos.titlePicUrl}/>
            <div className="content" dangerouslySetInnerHTML={{__html: text}}></div>
          </div>
      )
    }
  }

})

