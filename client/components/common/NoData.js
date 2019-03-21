import React, {Component, PropTypes} from 'react'

export default class NoData extends Component {
  static propTypes = {
    image: PropTypes.string,
    text: React.PropTypes.node,
    warning: PropTypes.string,
  }
  static defaultProps = {
    image: '',
    text: '',
    warning: '',
  }

  render() {
    require('../../styles/common/noData.less')
    const {image, text, warning, warningOther, ...others} = this.props
    return (
      <div className="noData" {...others}>
        <img className="img" src={image}/>
        <div className="text">{warning}</div>
        <div className="text">{warningOther}</div>
        <div className="text">{text}</div>
      </div>
    )
  }
}
