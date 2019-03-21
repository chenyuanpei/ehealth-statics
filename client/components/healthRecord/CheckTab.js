import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'
const editBtnPng = require('../../../static/images/btn_edit.png')

export default class CheckTab extends Component {

  static PropTypes = {
    date: PropTypes.string,
    image: PropTypes.string.isRequired,
    remark: PropTypes.string,
  }

  render() {
    const {date, image, remark} = this.props
    require('../../styles/healthRecord/CheckTab.less')
    return (
      <RowFlex className="check_tab">
        <div className="date">{date}</div>
        <div className="image"><img src={image}/></div>
        <div className="remark">
          <div>备注<span className="edit"><img src={editBtnPng}/></span></div>
          <div>{remark}</div>
        </div>
      </RowFlex>
    )
  }
}
