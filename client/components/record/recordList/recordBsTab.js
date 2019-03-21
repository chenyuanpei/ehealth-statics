import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {RowFlex, Col} from '../../frozenui/grid'
import {compareValue} from '../../../util/compare'
export default class RecordBsTab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    glucoseConcentration: PropTypes.number,
    mealPeroidName: PropTypes.string,
    measurementDate: PropTypes.number,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !compareValue(this.props, nextProps, ['glucoseConcentration'])
  }

  render() {
    require('../../../styles/record/recordTab.less')
    const {measurementDate, glucoseConcentration, mealPeroidName, name, image, onClick} = this.props
    const dataInTab = glucoseConcentration ? glucoseConcentration.toFixed(1) : '未记录'

    let peroidText = mealPeroidName ? mealPeroidName : ''
    let unitText = ''
    let bsTime = measurementDate ? moment(measurementDate).format('MM-DD HH:mm') : ''
    if(glucoseConcentration){
      unitText = 'mmol/L'
    }
    return (
      <RowFlex className="m-record-tab" onClick={onClick}>
        <div>
          <img className="m-record-tab-img" src={image}/>
        </div>
        <div className="m-record-tab-name">
          {name}
        </div>
        <div className="m-record-tab-data">
          <span>{dataInTab}</span> <span>{unitText}</span>
          <span>{peroidText}</span>
        </div>
        <Col className="m-record-tab-right">
          {bsTime}
          <span><img src={require('../../../../static/images/btn_new_p.png')}/></span>
        </Col>
      </RowFlex>
    )
  }
}
