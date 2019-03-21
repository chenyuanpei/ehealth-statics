import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Mask from 'react-weui/lib/components/mask'
import {RowFlex, Col} from '../../frozenui/grid'

export default class ActionSheet extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
    show: PropTypes.bool.isRequired
  }

  static defaultProps = {
    title: '',
    show: false
  }

  state = {
    show: this.props.show,
  }

  componentWillReceiveProps(nextProps) {
    const {show} = this.props
    const {show: nextShow} = nextProps

    if (show !== nextShow) {
      this.setState({
        show: nextShow
      })
    }
  }

  render() {
    const {children, title, onClick, onCancel, avListLength} = this.props
    const {show} = this.state

    let changeStyle=false
    if(avListLength>12){
      changeStyle=true
    }

    const className = classNames({
      weui_actionsheet: true,
      weui_actionsheet_toggle: show
    })
    require('weui/src/style/widget/weui_tips/weui_actionsheet.less')
    require('weui/src/style/widget/weui_tips/weui_mask.less')
    require('../../../styles/common/dialog/actionSheet.less')
    return (
      <div className="actionSheetBox">
        <Mask style={{display: show ? 'block' : 'none'}} onClick={() => onCancel && onCancel()}/>
        <div style={{top: changeStyle ? 0 : '',
          bottom: changeStyle ? 'inherit': '',
          overflow: changeStyle ? 'scroll' : '',
          height: changeStyle ? '100%' : '',
          width: changeStyle ? '100%' : ''}} className={className}>
          <RowFlex className="weui_actionsheet_menu">
            <div onClick={() => onCancel && onCancel()}>取消</div>
            <Col className="title">{title}</Col>
            <div onClick={() => onClick && onClick()}>确定</div>
          </RowFlex>
          <div style={{borderTop: '1px solid #cccccc'}}>{children}</div>
        </div>
      </div>
    )
  }

}
