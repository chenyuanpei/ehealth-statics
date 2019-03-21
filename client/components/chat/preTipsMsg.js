import React, {Component, PropTypes} from 'react'


export default class PreTipsMsg extends Component {


  render() {
    require('../../styles/doctor/adminMsg.less')
    const {text} = this.props

    return (
      <div className="adminMsg">
        {text}
      </div>
    )
  }
}
