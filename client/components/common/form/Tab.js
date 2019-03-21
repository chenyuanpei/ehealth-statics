import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'
import classNames from 'classnames';

export default class Tab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    noArrImg: PropTypes.bool,
  }

  render() {
    require('../../../styles/common/form/tab.less')
    const {name, val, noArrImg, className, onClick, nameStyle, children} = this.props
    const styleClass = classNames({
      'tab': true
    }, className)

    return (
        <RowFlex className={styleClass} onClick={onClick}>
          <div className='name'>
            {name}
          </div>
          <Col className="right">
          <span
              className={nameStyle !== '' && nameStyle !== undefined ? 'm-tab-val-wrap ' + nameStyle : 'm-tab-val-wrap'}>
          {val}
          </span>

            {children}
            {!noArrImg && <img src={require('../../../../static/images/btn_new_p.png')}/>}

          </Col>
        </RowFlex>
    )
  }
}
