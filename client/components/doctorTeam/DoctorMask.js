import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'

export default class DoctorMask extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired
  }

  static defaultProps = {
    show: false
  }

  render() {
    const {show,children, onClick} = this.props

    if (!show) {
      return <noscript/>
    }

    require('weui/src/style/widget/weui_tips/weui_mask.less')
    require('../../styles/doctorTeam/doctorTeamMask.less')
    return (
      <div className="m-doctor-team-mask-box">
        <Mask onClick={onClick}/>

        <div className='m-doctor-mask-list-box'>
          <div onClick={onClick} className="close">+</div>
          <h3>院后管理服务</h3>
          <div className="m-doctor-list-mask-tips">
            现已推出针对出院患者的院后管理服务，如有需要<span className="cBlue">请点击相应医生头像</span>了解。
          </div>
          {children}
        </div>
      </div>
    )
  }
}
