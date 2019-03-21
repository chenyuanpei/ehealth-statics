import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class Col extends Component {

  static propTypes = {
    val: PropTypes.string
  }

  render() {
    require('../../../styles/common/grid.less')

    const {children, className, val, ...rest} = this.props

    let _className = classNames(['ui-col', (val && val !== '1') ? `ui-col-${val}` : 'ui-col', className])

    return (
      <div className={_className} {...rest}>
        {children}
      </div>

    )
  }
}
