import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'

export default class ListTop extends Component {

  static proptTypes = {
    nickname: PropTypes.string,
    headImgurl: PropTypes.string,
    sex: PropTypes.string,
    age: PropTypes.string,
  }

  static defaultProps = {
    nickname: '暂无',
    headImgurl: '',
    sex: '',
    age: '',
  }

  render() {
    const {nickname, headImgurl, onClick, sex, age} = this.props
    require('../../../styles/record/listTop.less')
    return (
      <RowFlex className="m-list-top" onClick={onClick}>
        <div className="m-head-box">
          <img className="m-img-head" name={nickname} src={headImgurl}/>
        </div>
        <div className="m-name">
          <span>{nickname}</span>
          <span><em>{sex}</em>{age ? age + '岁' : ''}</span>
        </div>
        <Col className="m-right">
          <img src={require('../../../../static/images/btn_new_p.png')}/>
        </Col>
      </RowFlex>
    )
  }
}
