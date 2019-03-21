import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../../frozenui/grid'
import {compareValue} from '../../../util/compare'
export default class RecordTab extends Component {
  //static propTypes = {
  //  name: PropTypes.string.isRequired,
  //  image: PropTypes.string.isRequired,
  //  onClick: PropTypes.func,
  //  systolicPressure: PropTypes.number,
  //  diastolicPressure: PropTypes.number,
  //  heartRate: PropTypes.number,
  //  tabTime:PropTypes.string
  //}

  //shouldComponentUpdate(nextProps, nextState) {
  //  return !compareValue(this.props, nextProps, ['val'])
  //}

  render() {
    require('../../../styles/record/recordTab.less')
    const {tabTime, text,unit, name, image, isSleep,text2,unit2,onClick} = this.props
    return (
      <RowFlex className="m-record-tab" onClick={onClick}>
        <div>
          <img className="m-record-tab-img" src={image}/>
        </div>
        <div className="m-record-tab-name">
          {name}
        </div>
        <div className="m-record-tab-data">
          <span>{text}</span>{unit}
          <div style={{display:isSleep?'inline':'none',marginLeft:'0.2rem'}}>
            <span style={{fontSize: '0.6rem'}}>{text2}</span>{unit2}
          </div>
        </div>
        <Col className="m-record-tab-right">
          {tabTime}
          <span><img src={require('../../../../static/images/btn_new_p.png')}/></span>
        </Col>
      </RowFlex>
    )
  }
}
