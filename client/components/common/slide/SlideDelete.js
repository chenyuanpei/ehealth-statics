import React, {Component, PropTypes} from 'react'
import SlideButton from './SlideButton'
export default class SlideDelete extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired
  }

  onClick() {
    this.props.onDelete()
  }
  render() {
    require('../../../styles/common/slideDelete.less')
    const {children} = this.props

    const content = (
      <div className="bgStyle">{children}</div>
    )

    const button = (
      <div ref="btn" className="buttonStyle">
        <div className="buttonTextStyle">删除</div>
      </div>
    )

    return (
      <div className="bgStyle">
        <SlideButton
          ref="slideButton"
          buttonClick={() => this.onClick()}
          {...{
            content,
            button,
          }}
        />
      </div>
    )
  }
}
