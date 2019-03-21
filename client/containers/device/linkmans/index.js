import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// util
import {debug} from '../../../util/common'
// components
import Tab from '../../../components/common/form/Tab'
import ScrollView from '../../../components/common/scroll/ScrollView'
import Button from '../../../components/common/button/Button'
import SlideDelete from '../../../components/common/slide/SlideDelete'
import NoData from '../../../components/common/NoData'
import Confirm from '../../../components/common/dialog/Confirm'
import Title from '../../../components/common/title/Title'
// selectors
import selectors from './selectors'
// actions
import actions from './actions'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    const {loadData, params} = this.props
    loadData(params.deviceId)
  }

  render() {
    require('../../../styles/member/memberBtn.less')
    return (
      <div className="memberBtn linkmans">
        <Title title='一键呼叫联系人管理'/>
        <ScrollView>
          <div className="top panal">
            {this._renderTab()}
          </div>
        </ScrollView>
        <div className="pageBottom">
          <Button onClick={() => this._add()}>添加一键联系人</Button>
        </div>

        {this._renderDel()}
      </div>
    )
  }

  _renderTab() {
    let {linkmans} = this.props
    if (!linkmans || linkmans.size <= 0) { // 没数据
      return (
        <NoData image={require('../../../../static/images/noData/bg_profile_complete.png')} warning="还没有一键呼叫联系人"
                text="请添加联系人并完善资料"/>
      )
    }
    return (linkmans.map((linkman, idx) => {
      return (
        <SlideDelete key={idx} onDelete={() => (this._delete(linkman))}>
          <Tab
            name={linkman.name}
            val={linkman.mobile}
            onClick={() => this._edit(linkman)}
          />
        </SlideDelete>
      )
    }).toArray())
  }

  _renderDel() {
    const {delLinkmans, params, showDel, setShowDel, linkmansDel, setLinkmansDel} = this.props
    const buttons = [{
      type: 'default',
      label: '取消',
      onClick: () => {
        setShowDel(false)
        setLinkmansDel({})
      }
    }, {
      type: 'primary',
      label: '确认',
      onClick: () => {
        delLinkmans(linkmansDel.id)
        setShowDel(false)
        setLinkmansDel({})
      }
    }]
    return (
      <Confirm buttons={buttons} show={showDel}>
        <div className="confirm">删除{linkmansDel.name}，确认删除？</div>
      </Confirm>
    )
  }

  _delete(linkmans) {
    const {setShowDel, setLinkmansDel} = this.props
    setShowDel(true)
    setLinkmansDel(linkmans)
  }

  _edit(linkmans) {
    const {location: {pathname}, push} = this.props
    push(`${pathname}/${linkmans.id}`)
  }

  _add() {
    const {location: {pathname}, push} = this.props
    push(`${pathname}/create`)
  }
})
