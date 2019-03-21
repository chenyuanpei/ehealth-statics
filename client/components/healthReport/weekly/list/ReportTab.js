import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../../frozenui/grid'

export default class ReportTab extends Component {
  static defaultProps = {
    name: '暂无',
    headImage: '',
  }

  render() {
    const {member: {nickname, name, headImgurl}, report: {trendDescribe, weekDays}, onClick} = this.props
    require('../../../../styles/healthReport/weekly/reportTab.less')
    return (
      <RowFlex className="reportTab" onClick={onClick}>
        <div>
          <img className="img-circle" src={headImgurl}/>
        </div>
        <Col className="reportContext">
          <div>
            { nickname || name}
            <span className="reportDate">{(weekDays.split(',')[0]).replace('-', '.')}-{(weekDays.split(',')[6]).replace('-', '.')}</span>
          </div>
          <div>
            {trendDescribe}
          </div>
        </Col>
      </RowFlex>
    )
  }
}
