import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'
import {compareValue} from '../../../util/compare'
export default class RecordTab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    systolicPressure: PropTypes.number,
    diastolicPressure: PropTypes.number,
    heartRate: PropTypes.number,
    tabTime:PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !compareValue(this.props, nextProps, ['systolicPressure'])
  }

  render() {
    require('../../../styles/record/recordTab.less')
    const {tabTime, systolicPressure, diastolicPressure, name, image, onClick} = this.props
    const dataInTab = systolicPressure ? systolicPressure + '/' +  diastolicPressure : '未记录'
    let unitText = ''
    if(systolicPressure){
      unitText = 'mmHg'
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
        </div>
        <Col className="m-record-tab-right">
          {tabTime}
          <span><img src={require('../../../../static/images/btn_new_p.png')}/></span>
        </Col>
      </RowFlex>
    )
  }
}
