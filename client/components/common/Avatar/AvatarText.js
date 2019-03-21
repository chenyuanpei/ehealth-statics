import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import {defaultHeadImgurl} from '../../../const/member'

export default class AvatarText extends Component {
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
    // className : 带边框为 .... ，
    const {src, defaultSrc, name, sex, className,deviceTitle, tip, onClick} = this.props
    const styleClass = classNames({
      alvaList: true
    }, className)

    return (
      <div className={styleClass} onClick={onClick}>
        <div className="avatarBox">
          <img className="image" src={src || defaultSrc || defaultHeadImgurl[sex]} alt={name}/>
          <div className="m-device-title-wrap" style={{display: deviceTitle ? 'block' : 'none'}}>
            <div className="m-device-title-text">
              {deviceTitle}
            </div>
            <div className="m-bg-blue-fixed"></div>
            <div className="m-title-bg"></div>
          </div>
          <img className="tip" style={{display: tip ? 'block' : 'none'}} src={tip}/>
        </div>
        <div className="avatarText" style={{display: name ? 'block' : 'none'}}>{name}</div>
      </div>
    )
  }
}
