import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../util/common'
// components
import Tab from '../../components/common/form/Tab'
import Title from '../../components/common/title/Title'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
// toast
import {toast} from '../../components/common/toast/PubSubToast'
import {calc} from '../../util/setFontSize'

export default connect(
    debug(selectors),
    actions
)(class extends Component {
  state = {
    t0: 0,
    t1: 0,
  }

  //
  componentDidMount() {
    const {loadData} = this.props
    loadData()
  }

  render() {
    require('../../styles/FAQ/index.less')
    return (
        <div>
          <Title title='常见问题'/>

          {this._getList()}
        </div>
    )
  }

  _getList() {
    const {faq, loadData} = this.props
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
        this.props.push(`FAQ/${id}`)
      }
    }

    const acSwitch = (idx) => {
      const value = this.state[`t${idx}`] === 0 ? 1 : 0
      const key = `t${idx}`
      if (value === 1) loadData(100)
      this.setState({[key]: value})
    }

    if (faq) {
      return (
          faq.map((f, idx) => {
            return (
                <div className="faqList" key={idx}>
                  <div className="title"><img className="img" src={f.columnInfo.icon} /><span className="text">{f.columnInfo.name}</span></div>
                  <div className="list" style={{height: !this.state[`t${idx}`] && f.contents.length > 5 ? `${calc(454)}` : 'auto'}}>
                    {f.contents.map((fc, i) => <Tab key={i} className="faq" name={fc.title} val={''} onClick={() => go(fc)}/>)}
                  </div>
                  <div className="action">
                    <span style={{display: f.contents.length < 1 ? 'none' : ''}} onClick={() => acSwitch(idx)} className="bu">{this.state[`t${idx}`] ? '收起' : '更多'} <img className={this.state[`t${idx}`] ? 'to' : 'fo'} src={require('../../../static/images/btn_new_p.png')} /></span>
                  </div>
                </div>
            )
          })
      )
    }
  }

})

