import React, {Component, PropTypes} from 'react'
export default class BpAddTab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  render() {
    require('../../../styles/common/form/bpAddTab.less')
    const {name, val, onClick, nameStyle} = this.props
    return (
      <div className="m-bp-add-tab" onClick={onClick}>
        <div className='m-bp-tab-name'>
          {name}
        </div>
        <div className="m-bp-tab-content">
          <span className="m-bp-tab-val">
          {val}
          </span>
          <img src={require('../../../../static/images/btn_new_p.png')}/>
        </div>
      </div>
    )
  }
}
