import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'
export default class Tab2 extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  render() {
    require('../../styles/doctor/tab.less')
    const {name, val, val2, onClick, onClick2, nameStyle, isArrow} = this.props
    return (
      <RowFlex className="preoperativetab">
        <div className='name'>
          {name}
        </div>
        <Col className="right">
          <span onClick={onClick} className={nameStyle !== '' && nameStyle !== undefined ? 'm-tab-val-wrap ' + nameStyle : 'm-tab-val-wrap'}>
          {val}
          </span>
          &nbsp;
          ~
          &nbsp;
          <span onClick={onClick2} className={nameStyle !== '' && nameStyle !== undefined ? 'm-tab-val-wrap ' + nameStyle : 'm-tab-val-wrap'}>
          {val2}
          </span>
          <img style={{display:isArrow?'inline':'none'}} src={require('../../../static/images/btn_new_p.png')}/>
        </Col>
      </RowFlex>
    )
  }
}
