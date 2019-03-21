import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'

export default class CenterTop extends Component {

  static proptTypes = {
    nickname: PropTypes.string,
    headImgurl: PropTypes.string
  }

  static defaultProps = {
    nickname: '暂无',
    headImgurl: ''
  }

  render() {
    const {nickname, headImgurl, onClick} = this.props
    require('../../../styles/member/centerTop.less')
    return (
      <div onClick={onClick}>
        <div className="m-aBox">
          <img className="img-circle" name={nickname} src={headImgurl}/>
        </div>
        <div className="m-name">
          {nickname}
        </div>
      </div>
    )
  }
}
