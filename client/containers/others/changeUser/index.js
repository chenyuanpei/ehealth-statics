import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../util/common'
// components
import AvatarText from '../../../components/common/Avatar/AvatarText'
import Button from '../../../components/common/button/Button'
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    const {loadData, location: {query: {userId,hash}}} = this.props
    loadData({userId,hash})
  }



  render() {
    require('../../../styles/page/claimData.less')
    return (
      <div className="claimData">
        <Title title='切换用户'/>
        <div>切换成功</div>
      </div>
    )
  }

})

