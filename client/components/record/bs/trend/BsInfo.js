import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import {RowFlex, Col} from '../../../frozenui/grid'
import {filter} from '../../../../util/record/record'

export default class BsInfo extends Component {

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    require('../../../../styles/record/record.less')
    require('../../../../styles/home/records/bp/bpinfo.less')
    const {title, bsHrData} = this.props
    let {level, glucoseConcentration, levelName, measurementDate} = bsHrData || {}
    let bsInfoTime = ''
    let bsInfoClassName = 'texRow2'
    if(measurementDate){
      bsInfoClassName = 'texRow'
      bsInfoTime = moment(measurementDate).format('MM-DD HH:mm')
    }
    if(glucoseConcentration){
      glucoseConcentration = glucoseConcentration.toFixed(1)
    }
    return (
        <div className="historyInfo">
          <div className="historyText">
            <span>{filter(title)}</span>
          </div>
          <RowFlex className="currentValBox">
            <Col className={bsInfoClassName}>
              <span className={`record-${level}`}>{filter(levelName)}</span>
              <span>{bsInfoTime}</span>
            </Col>
            <Col className="texRow">
              <span>{filter(glucoseConcentration)}</span>
              <span>{'mmol/L'}</span>
            </Col>
          </RowFlex>
        </div>
    )
  }

}
