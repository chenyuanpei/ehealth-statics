import React, {Component, PropTypes} from 'react'

export default class Switch extends Component {
  state = {
    user: this.props[1]
  }
  render() {
    require('../../../styles/common/remind/switch.less')
    const {1: user1, 2: user2, onClick} = this.props
    const {user} = this.state
    const click = (user) => {
      this.setState({user})
      onClick && onClick(user)
    }
    return (
      <div className="userBox">
        <div className={user.userNo === 1 ? 'btn check' : 'btn'} onClick={() => click(user1)}>
          {`一号键(${user1.name || '未绑定'})`}
        </div>
        <div className={user.userNo === 2 ? 'btn check' : 'btn'} onClick={() => click(user2)}>
          {`二号键(${user2.name || '未绑定'})`}
        </div>
      </div>
    )
  }
}
