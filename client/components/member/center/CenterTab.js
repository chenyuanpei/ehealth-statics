import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'
import {compareValue} from '../../../util/compare'
export default class CenterTab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !compareValue(this.props, nextProps, ['val','remind'])
  }

  render() {
    require('../../../styles/member/centerTab.less')
    const {name, image, val, onClick, remind} = this.props
    return (
      <RowFlex className="centerTab" onClick={onClick}>
        <div>
          <img className="img" src={image}/>
        </div>
        <div className="name">
          {name}
        </div>
        <Col className="right">
          {val}
          <span style={{display:remind?'inline-block':'none'}} className="remind"></span>
          <span><img src={require('../../../../static/images/btn_new_p.png')}/></span>
        </Col>
      </RowFlex>
    )
  }
}
