import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// utils
// selector
import selectors from './selectors'
// actions
import actions from './actions'
// components
import Title from '../../../components/common/title/Title'

export default connect(
  selectors,
  actions
)(class extends Component {

  componentDidMount() {
    const {init} = this.props
    init()
  }
  _pushUrl(url) {
    this.props.push(url)
  }
  render() {
    require('../../../styles/integral/index.less')
    const {totalPoint,pointCompleteProgress,integralBanner} = this.props
    const {point} = totalPoint || {}
    const {continueBloodpressureTask,continueBloodsugarTask,everyday_measurement_bloodpressure_rule,everyday_measurement_bloodsugar_rule,
      look_health_data_rule,look_bloodpressure_week_report_rule,look_health_info_rule,wechat_user_bind_device_rule,
      invite_subscribe_other_rule,add_more_member_rule,perfect_member_information_rule,manual_add_data_rule} = pointCompleteProgress || {}
    const {name,score,remainder} = continueBloodpressureTask || {}
    return (
    pointCompleteProgress &&
      <div className="m-integral-wrap">
        <Title title="我的积分" />
        <div className="m-integral-top">
          <div className="m-integral-num">
            {point}
          </div>
          <div className="m-integral-ico-link" onClick={()=>{this._pushUrl('integral/integralDetail')}}></div>
          <div className="m-integral-top-text">
            苟有恒，何必三更起五更眠，最无益，最怕一日曝十日寒。
          </div>

        </div>

        {
          (integralBanner && integralBanner.length > 0)&&
          <div className="m-integral-ad">
            <a href={integralBanner[0].redirectAddr}>
              <img src={integralBanner[0].imgUrl} alt=""/>
            </a>
          </div>
        }


        <div className="m-integral-title">连续任务 <span>需在测量当天内成功上传测量数据</span></div>
        <ul className="m-integral-list-wrap">
          { continueBloodpressureTask &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_continuous_bloodpressure@2x.png')}
                     className="m-ico" alt=""/>
                <div className="m-title">
                  {name}
                </div>
                <div className="m-tips">
                  再奖励{score}分
                </div>
              </div>
              {
                remainder > 0 ? <div className="m-right-btn">还差{remainder}天</div> :
                  <div className="m-right-text">
                    <img src={require('../../../../static/images/integral/ic_challenge_continuous_expert@2x.png')}
                         alt=""/>
                    血压达人
                  </div>

              }
            </li>
          }
          {
            continueBloodsugarTask &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_continuous_bloodsugar@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {continueBloodsugarTask.name}
                </div>
                <div className="m-tips">
                  再奖励{continueBloodsugarTask.score}分
                </div>
              </div>
              {
                continueBloodsugarTask.remainder > 0 ? <div className="m-right-btn">还差{continueBloodsugarTask.remainder}天</div> :
                  <div className="m-right-text">
                    <img src={require('../../../../static/images/integral/ic_challenge_continuous_expert@2x.png')}
                         alt=""/>
                    血压达人
                  </div>

              }
            </li>
          }

        </ul>
        <div className="m-integral-title">普通任务</div>
        <ul className="m-integral-list-wrap">
          {
            everyday_measurement_bloodpressure_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_bloodpressure@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {everyday_measurement_bloodpressure_rule.name}
                </div>
                <div className="m-tips">
                  每天一次，+{everyday_measurement_bloodpressure_rule.score}积分
                </div>
              </div>
              {
                everyday_measurement_bloodpressure_rule.status != 0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn">未测量</div>
              }

            </li>
          }
          {
            everyday_measurement_bloodsugar_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_bloodsugar@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {everyday_measurement_bloodsugar_rule.name}
                </div>
                <div className="m-tips">
                  每天一次，+{everyday_measurement_bloodsugar_rule.score}积分
                </div>
              </div>
              {
                everyday_measurement_bloodsugar_rule.status !=0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn">未测量</div>
              }

            </li>
          }
          {
            look_health_data_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_healthdata@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {look_health_data_rule.name}
                </div>
                <div className="m-tips">
                  每天一次，+{look_health_data_rule.score}积分
                </div>
              </div>
              {
                look_health_data_rule.status != 0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn" onClick={()=>this._pushUrl('home')}>去查看</div>
              }
            </li>
          }
          {
            look_bloodpressure_week_report_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_bloodpressureweekly@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {look_bloodpressure_week_report_rule.name}
                </div>
                <div className="m-tips">
                  每周一次，+{look_bloodpressure_week_report_rule.score}积分
                </div>
              </div>
              {
                look_bloodpressure_week_report_rule.status != 0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn" onClick={()=>this._pushUrl('healthReport/list')}>去查看</div>
              }

            </li>
          }
          {
            look_health_info_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_healthnews@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {look_health_info_rule.name}
                </div>
                <div className="m-tips">
                  每天一次，+{look_health_info_rule.score}积分
                </div>
              </div>
              {
                look_health_info_rule.status != 0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn" onClick={()=>this._pushUrl('information')}>去查看</div>
              }
            </li>
          }
          {
            wechat_user_bind_device_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_equipment@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {wechat_user_bind_device_rule.name}
                </div>
                <div className="m-tips">
                  每绑定多一种设备，+{wechat_user_bind_device_rule.score}积分
                </div>
              </div>
              {
                wechat_user_bind_device_rule.status != 0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn" onClick={()=>this._pushUrl('device')}>去绑定</div>
              }
            </li>
          }
          {
            manual_add_data_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_add_data@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {manual_add_data_rule.name}
                </div>
                <div className="m-tips">
                  每手动添加一种数据，+{manual_add_data_rule.score}积分
                </div>
              </div>
              {
                manual_add_data_rule.status != 0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn" onClick={()=>this._pushUrl('home')}>去添加</div>
              }
            </li>
          }

          {
            invite_subscribe_other_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_attention@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {invite_subscribe_other_rule.name}
                </div>
                <div className="m-tips">
                  每被关注1次(最多2次)，+{invite_subscribe_other_rule.score}积分
                </div>
              </div>
              {
                invite_subscribe_other_rule.status != 0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn" onClick={()=>this._pushUrl('newbieTask/invitation')}>去邀请</div>
              }
            </li>
          }
          {
            add_more_member_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_member@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {add_more_member_rule.name}
                </div>
                <div className="m-tips">
                  每添加1个成员(最多3个)，+{add_more_member_rule.score}积分
                </div>
              </div>
              {
                add_more_member_rule.status != 0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn" onClick={()=>this._pushUrl('member')}>去添加</div>
              }
            </li>
          }
          {
            perfect_member_information_rule &&
            <li className="m-integral-list-item">
              <div className="m-left-box">
                <img src={require('../../../../static/images/integral/ic_challenge_normal_memberdata@2x.png')} className="m-ico" alt=""/>
                <div className="m-title">
                  {perfect_member_information_rule.name}
                </div>
                <div className="m-tips">
                  每完善1个成员(最多3个)，+{perfect_member_information_rule.score}积分
                </div>
              </div>
              {
                perfect_member_information_rule.status != 0 ? <div className="m-right-grey-btn">已完成</div> : <div className="m-right-btn" onClick={()=>this._pushUrl('member')}>去完善</div>
              }
            </li>
          }

        </ul>
        <div className="m-bottom-ad">
          <img src={require('../../../../static/images/integral/img_shop@2x.png')} alt=""/>
        </div>
      </div>
    )
  }

})
