import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {replace} from 'react-router-redux'
import classnames from 'classnames'
import RowFlex from '../../components/frozenui/grid/RowFlex'
import Col from '../../components/frozenui/grid/Col'

class RecordTabs extends Component {

  _goUrl(url) {
    const {replace, memberId} = this.props
    replace(`record/${memberId}/bp/${url}`)
  }

  render() {
    require('../../styles/home/records/recordTab.less')

    const {children, location: {pathname}} = this.props

    const tab = pathname.substr(pathname.lastIndexOf('/') + 1)
    // <RowFlex className="record_tab">
    //       <Col className={classnames({record_tab_btn_on: tab === 'trend'})}
    //            onClick={() => this._goUrl('trend')}>趋势</Col>
    //       <Col className={classnames({record_tab_btn_on: tab === 'history'})}
    //            onClick={() => this._goUrl('history')}>记录</Col>
    //     </RowFlex>
    return (
      <div className="">
        <div className="record_children">{children}</div>
      </div>
    )
  }
}

export default connect(
  createSelector(
    (state, props) => props.params.id,
    (memberId) => ({
      memberId,
    })
  ),
  {
    replace,
  }
)(RecordTabs)
