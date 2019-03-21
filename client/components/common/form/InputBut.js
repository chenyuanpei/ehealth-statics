import React, {Component, PropTypes} from 'react'
import Button from '../button/Button'

export default class InputBut extends Component {
  static propTypes = {
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    inputType: PropTypes.string,
  }
  static defaultProps = {
    inputType: 'text'
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event) {
    const {onChange} = this.props
    onChange && onChange(event.target.value)
  }

  handleClick() {
    const {onClick, value} = this.props
    onClick && onClick(value)
  }

  render() {
    require('weui/src/style/widget/weui_cell/weui_form/weui_form_common.less')
    require('weui/src/style/widget/weui_cell/weui_cell_global.less')
    const {value, placeholder, inputType, buttonText, buttonType, style, maxLength} = this.props
    return (
      <div className="weui_cells weui_cells_form" style={style}>
        <dl className="weui_cell">
          <dt className="weui_cell_bd weui_cell_primary">
            <input className="weui_input" placeholder={placeholder} value={value} type={inputType} maxLength={maxLength}
                   onChange={this.handleChange}/>
          </dt>
          <dd className="weui_cell_ft" style={{display: buttonText ? 'block' : 'none'}}>
            <Button size="small" onClick={this.handleClick} type={buttonType}>
              {buttonText}
            </Button >
          </dd>
        </dl>
      </div>
    )
  }
}
