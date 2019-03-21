import React, {Component, PropTypes} from 'react'

export default class Radio extends Component {
  static propTypes = {
    list: PropTypes.array,
    title: PropTypes.string
  }

  render() {
    const {title, list} = this.props
    require('weui/src/style/widget/weui_cell/weui_form/weui_form_common.less')
    require('weui/src/style/widget/weui_cell/weui_cell_global.less')
    require('weui/src/style/widget/weui_cell/weui_form.less')

    const options = list.map(function (n, index) {
      return (
        <option key={index} value="1">{n}</option>
      )
    })

    return (
      <div className="weui_cells">
        <div className="weui_cell weui_cell_select weui_select_after">
          <div className="weui_cell_hd">
            {title}
          </div>
          <div className="weui_cell_bd weui_cell_primary">
            <select className="weui_select" name="select2">
              {options}
            </select>
          </div>
        </div>
      </div>
    )
  }
}
