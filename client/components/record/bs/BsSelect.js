import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classnames from 'classnames'
import {calcStatus, getIconText, getIconClass} from '../../../util/record/bpUtil'
import {filter} from '../../../util/record/record'

import {RowFlex, Col} from '../../frozenui/grid'

export default class BsSelect extends Component {

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static propTypes = {
    mealPeroidName: PropTypes.string,
    levelName: PropTypes.string,
    glucoseConcentration: PropTypes.number,
    level: PropTypes.number,
    onClick: PropTypes.func
  }

  render() {
    const {mealPeroidName, onClick, levelName, glucoseConcentration, level} = this.props

    const status = calcStatus(level)

    return (
      <div className="recordInfo" onClick={onClick}>
        <div className="recordIcon recordText">
          <div className={classnames('icon_record', getIconClass(status))}/>
          <span className={`record-${status}`}>{levelName}</span>
        </div>
        <RowFlex className="currentValBox">
          <Col className="texRow">
            <span>{filter(mealPeroidName)}</span>
            <span></span>
          </Col>
          <Col className="texRow">
            <span>{filter(glucoseConcentration.toFixed(1))}</span>
            <span>{'mmol/L'}</span>
          </Col>
        </RowFlex>
      </div>
    )
  }

}
