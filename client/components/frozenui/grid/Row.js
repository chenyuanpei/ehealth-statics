import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class Col extends Component {

  render() {
    require('../../../styles/common/grid.less')

    const {children, className, ...rest} = this.props

    let _className = classNames(['ui-row', className])

    return (
      <div className={_className} {...rest}>
        {children}
      </div>
    )
  }
}
