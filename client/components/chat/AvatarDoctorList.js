import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import {defaultHeadImgurl} from '../../const/member'

export default class AvatarDoctorList extends Component {
  static propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    tip: PropTypes.string,
    defaultSrc: PropTypes.string,
    sex: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    src: '',
    defaultSrc: '',
    name: '',
    tip: '',
  }

  render() {
    const {headimgurl, name, sex, className,title} = this.props
    const styleClass = classNames({
      alvaList: true
    }, className)

    return (
      <div className={styleClass}>
        <div className="avatarBox">
          <img className="image" src={headimgurl || defaultHeadImgurl[sex]} alt={name}/>
        </div>
        <div className="avatarText" style={{display: name ? 'block' : 'none'}}>{name}</div>
        <div className="avatarText" style={{display: title ? 'block' : 'none'}}>{title}</div>

      </div>
    )
  }
}
