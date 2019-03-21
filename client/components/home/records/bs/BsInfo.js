import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {filter} from '../../../../util/record/record'

import {RowFlex, Col} from '../../../frozenui/grid'

export default class BsInfo extends Component {

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static propTypes = {
    glucoseConcentration: PropTypes.number,
    mealPeroidName: PropTypes.string,
    reference: PropTypes.number,
    levelName: PropTypes.string,
    level: PropTypes.number
  }

  render() {
    let {glucoseConcentration, reference, mealPeroidName,levelName, level} = this.props
    if(glucoseConcentration){

      glucoseConcentration = glucoseConcentration.toFixed(1)
    }

    return (
      <div className="recordInfoDetail m-record-info-last">
        <div className="recordIcon recordText">
          <div className={`icon_record_sugar icon_sugar_${level}`}/>
          <span className={`record-${level}`}>{levelName ? levelName : '未测量'}</span>
        </div>
        <RowFlex className="currentValBox">
          <Col className="texRow1">
            <span>{filter(mealPeroidName)}</span>
            <span></span>
          </Col>
          <Col className="texRow">
            <span>{filter(glucoseConcentration)}</span>
            <span>{'mmol/L'}</span>
          </Col>
          <Col className="texRow">
            <span>{'参考值'}</span>
            <span>{filter(reference)}</span>
          </Col>
        </RowFlex>
      </div>
    )
  }

}
