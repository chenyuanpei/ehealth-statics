import React, {Component, PropTypes} from 'react'

export default class Input extends Component {
  static propTypes = {
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    inputType: PropTypes.string
  }

  render() {
    require('weui/src/style/widget/weui_cell/weui_form/weui_form_common.less')
    require('weui/src/style/widget/weui_cell/weui_cell_global.less')
    const {pattern, placeholder, title, inputType} = this.props

    return (
      <div className="weui_cells weui_cells_form">
        <div className="weui_cell">
          <div className="weui_cell_hd">
            <label className="weui_label">{title}</label>
          </div>
          <div className="weui_cell_bd weui_cell_primary">
            <input className="weui_input" type={inputType} pattern={pattern} placeholder={placeholder}/>
          </div>
        </div>
      </div>
    )
  }

}
