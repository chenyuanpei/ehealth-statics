/**
 * Created by lifesense on 2016/3/8.
 */
import React, {Component, PropTypes} from 'react'

export default class Avatar extends Component {
  static propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
  }

  render() {
    const {src, name} = this.props
    return (
      <div className="avatarBox">
        <img src={src} alt={name}/>
      </div>
    )
  }
}
