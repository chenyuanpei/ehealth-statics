import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'
export default class Tab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  render() {
    require('../../styles/doctor/tab.less')
    const {name, children, val, onClick, nameStyle, isArrow} = this.props
    let styleFlag = false
    if(nameStyle && nameStyle !== '' ){
      styleFlag = true
    }
    return (
      <RowFlex className="preoperativetab" onClick={onClick}>
        <div className='name'>
          {name}
        </div>
        <Col className="right">
          <span className={styleFlag ? 'm-tab-val-wrap ' + nameStyle : ''}>
          {val}
          </span>
          {children}
          <img style={{display:isArrow?'inline':'none'}} src={require('../../../static/images/btn_new_p.png')}/>
        </Col>
      </RowFlex>
    )
  }
}
