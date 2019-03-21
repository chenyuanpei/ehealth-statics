import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class RowFlex extends Component {

  componentDidMount() {
    this.el = this.refs.el
  }

  render() {
    require('../../../styles/common/grid.less')

    const {children, className, ...rest} = this.props

    let _className = classNames(['ui-row-flex', className])

    return (
      <div ref="el" className={_className} {...rest}>
        {children}
      </div>
    )
  }
}
