import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import classnames from 'classnames'
// components
import RowFlex from '../../../frozenui/grid/RowFlex'
import Col from '../../../frozenui/grid/Col'
import LabelText from './LabelText'

export default class extends Component {

  static propTypes = {
    report: PropTypes.object,
  }

  static defaultProps = {
    report: {},
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {report: {riskAdvices = []}} = this.props

    if (!riskAdvices.length) {
      return <noscript/>
    }

    return (
      <div className={classnames('block', 'resultBox')}>
        <div className="lineTitle"><span>{'健康评测结果'}</span></div>
        <ul>
          {riskAdvices.map(({riskKey, riskCondition}, index) => (
            <li key={riskKey}>{`${index + 1}.${riskCondition}`}</li>
          ))}
        </ul>
        <div className="contentText">
          <p>{'您有以上身体问题，建议您：'}</p>
          <p>&nbsp;</p>
          {riskAdvices.map(({riskKey, riskAdvice}) => (
            <p key={riskKey}>{riskAdvice}</p>
          ))}
        </div>
      </div>
    )
  }
}
