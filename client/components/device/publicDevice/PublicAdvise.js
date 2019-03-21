import React, {Component, PropTypes} from 'react'

export default class PublicAdvise extends Component {

  render() {
    const {suggest} = this.props
    return (
      <div className="m_public_device_advise" style={{display:suggest ? 'block':'none'}}>
        <h3 className="title">体重建议</h3>
        <p>{suggest}</p>
      </div>
    )
  }
}
