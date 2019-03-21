import React, {Component, PropTypes} from 'react'

export default class User extends Component {
  static propTypes = {
  }

  componentDidMount(){
  }

  render() {
    const {headImgurl,nickname} = this.props
    require('../../styles/device/user.less')
    return (
      <div className="user">
        <div className="headImg">
          <img src={headImgurl} />
        </div>
        <div className="userName">
          {nickname}
        </div>
      </div>
    )
  }
}
