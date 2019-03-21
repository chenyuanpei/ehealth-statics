import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
// import ScrollView from '../../components/common/scroll/ScrollView'
// import MyDialog from '../../components/common/dialog/myDialog'
// import Swiper from '../../components/common/swiper'
import Title from '../../../components/common/title/Title'
// actions
import actions from '../actions'
// selectors
import selectors from '../selectors'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

export default connect(
    debug(selectors),
    actions
)(class extends Component {
  state = {
  }

  //
  componentDidMount() {
    const {loadInfoData, params} = this.props
    loadInfoData(params)
  }

  render() {
    require('../../../styles/FAQ/index.less')

    return (
        <div style={{minHeight: '100vh', backgroundColor: '#fff'}}>
          <Title title='常见问题'/>

          {this._getInfo()}
        </div>
    )
  }

  _getInfo () {
    const {info} = this.props

    if (info) {
      let text = info.content.match(/\<\!--content start--\>([^]*)<\!--content end--\>/)
      text = (text && text[1]) || ''
      return (
        <div className="fqaInfo">
          <div className="title">{info.title}</div>
          <div className="content" dangerouslySetInnerHTML={{__html: text}}></div>
        </div>
      )
    }
  }

})

