import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'

export default class CenterTopList extends Component {

  static proptTypes = {
    nickname: PropTypes.string,
    headImgurl: PropTypes.string
  }

  static defaultProps = {
    nickname: '暂无',
    headImgurl: ''
  }

  render() {
    const {children, headImgurl, onClick} = this.props
    require('../../../styles/member/centerTop.less')
    return (
      <div>
        <RowFlex className="m-center-top-list">
          {children}
        </RowFlex>
      </div>
    )
  }
}
