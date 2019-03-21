import React, {Component} from 'react'
import {connect} from 'react-redux'

// components

import Title from '../../../components/common/title/Title'
import Rule from '../../../components/special/Rule'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
import {closeWindow} from '../../../util/wxJs/wxApi'
export default connect(
  selectors,
  actions
)(class extends Component {

  componentDidMount() {
    const {init} = this.props
    init()
  }
  _closePage(){
    closeWindow()
  }
  _renderCount100() {
    const {applyCount} = this.props
    return (
      <div className="m-post-success-wrap" style={{display:applyCount?'block':'none'}}>
        <div className="m-opacity" onClick={()=>{this._closePage()}}></div>
        <div className="m-success-box">
          <div className="m-close" onClick={()=>{this._closePage()}}>+</div>
          <img src={require('../../../../static/images/publicDevice/img-participation-cry.png')} alt=""/>
          <p>您好，本期成功申请企业已达</p>
          <p>100家上限，申请名额已满，</p>
          <p>欢迎下次参与</p>
        </div>
      </div>
    )
  }
  render() {
    const {showEvent,applyRecord} = this.props
    require('../../../styles/special/publicDevice.less')
    return (
      <div>
        <div className={applyRecord ? 'm-public-device-wrap m-public-get-poster-bg' : 'm-public-device-wrap '}>
          <Title title='企业健康角•广州站' />
          <div className="logo"></div>
          {!applyRecord && <div onClick={()=>{showEvent(true)}} className="m-public-device-rule-btn">活动规则</div>}
          {this._renderHealthImg()}
          {applyRecord && this._renderGetPoster()}
          {!applyRecord && this._renderInfo()}
          {!applyRecord && this._renderBtn()}
        </div>
        {!applyRecord && this._renderActiveTitle()}
        {!applyRecord && this._renderMap()}
        {!applyRecord && this._renderFuture()}
        {this._renderCount100()}
      </div>
    )
  }
  _renderGetPoster() {
    const {applyRecord} = this.props
    const {enterpriseName,id} = applyRecord || {}
    return (
        <div className="m-public-poster-wrap">
          <p>您已为 <b>{enterpriseName}</b> 参与该活动</p>
          <p>点击下方按钮，获取海报</p>
          <div className="m-poster-btn" onClick={()=>{this._goUrl(`/special/poster?applyId=${id}&self=1`)}}></div>
        </div>
    )
  }

  _renderMap() {
    return (
        <div className="m-public-device-map">
          <div className="m-map-center"></div>
          <div className="m-left-top-wrap">
            <div className="content">
              <div className="cicle">

                <div className="tx">25%</div>
              </div>
            </div>
            <div className="m-public-device-text">
              <p>约25%以上企业员工</p>
              <p>每年就医3次以上</p>
            </div>
          </div>
          <div className="m-right-top-wrap">
            <div className="content">
              <div className="cicle">

                <div className="tx">24%</div>
              </div>
            </div>
            <div className="m-public-device-text">
              <p>约24%的企业在体检后</p>
              <p>没有任何跟踪举措</p>
            </div>
          </div>
          <div className="m-left-bottom-wrap">
            <div className="content">
              <div className="cicle">

                <div className="tx">60%</div>
              </div>
            </div>
            <div className="m-public-device-text">
              <p>近60%企业员工患有</p>
              <p>各类慢性疾病，且病多假少</p>
            </div>
          </div>
          <div className="m-right-bottom-wrap">
            <div className="content">
              <div className="cicle">

                <div className="tx">54%</div>
              </div>
            </div>
            <div className="m-public-device-text">
              <p>约54%的企业没有定期</p>
              <p>提醒员工关注健康状况</p>
            </div>
          </div>
        </div>
    )
  }
  _renderFuture() {
    return (
        <div className="m-future-wrap">
            <div className="m-future-title-wrap">
              <h3 className="m-future-title-en">PARTICPATE</h3>
              <h3 className="m-future-title-zh">参与活动你将享受到</h3>
            </div>


            <div className="m-future-line">
              <div className="m-center-text">•</div>
              <div className="m-left-line"></div>
              <div className="m-right-line"></div>
            </div>
            <div className="m-dp-text m-text-right">
              <div className="m-dp-img"></div>
              <div className="m-dp-title">
                免费的健康设备
              </div>
              <p className="m-dp-p">
                CFDA认证乐心医用级脂肪秤
              </p>
              <p className="m-dp-p">
                欧洲高血压联盟认证的乐心智能血压计
              </p>
            </div>
          <div className="m-dp-text m-text-left">
            <div className="m-dp-left-img"></div>
            <div className="m-dp-title">
              员工健康档案
            </div>
            <p className="m-dp-p">
              血压、心率一手掌握
            </p>
            <p className="m-dp-p">
              12项人体成分分析一目了然
            </p>
          </div>
          <div className="m-future-title-wrap">
            <h3 className="m-future-title-en m-future-letter">IN THE FUTURE</h3>
            <h3 className="m-future-title-zh">未来您可能会享受到</h3>
          </div>
          <div className="m-future-line">
            <div className="m-center-text">•</div>
            <div className="m-left-line"></div>
            <div className="m-right-line"></div>
          </div>
          <div className="m-future-info">
            <div className="m-future-info-wrap">
              <div className="m-future-ico m-ico1">

              </div>
              <h3 className="m-future-info-title">就医绿色通道</h3>
              <p className="m-future-info-text">一站式全程健康管理或就医指导服务，减少等待时间</p>
            </div>
            <div className="m-future-img">
              <img src={require('../../../../static/images/publicDevice/img-longpic-inthefuture-01.png')} alt="就医绿色通道" />
            </div>
          </div>
          <div className="m-future-info">
            <div className="m-future-info-wrap">
              <div className="m-future-ico m-ico2">

              </div>
              <h3 className="m-future-info-title">体检优惠套餐</h3>
              <p className="m-future-info-text">企业员工可以根据需要为自己或者家人选择优惠套餐</p>
            </div>
            <div className="m-future-img">
              <img src={require('../../../../static/images/publicDevice/img-longpic-inthefuture-02.png')} alt="就医绿色通道" />
            </div>
          </div>
          <div className="m-future-info">
            <div className="m-future-info-wrap">
              <div className="m-future-ico m-ico3">

              </div>
              <h3 className="m-future-info-title">体检报告解读</h3>
              <p className="m-future-info-text">专业助理联合北上广名医，为企业员工解读报告信息</p>
            </div>
            <div className="m-future-img">
              <img src={require('../../../../static/images/publicDevice/img-longpic-inthefuture-03.png')} alt="就医绿色通道" />
            </div>
          </div>
          <div className="m-future-info">
            <div className="m-future-info-wrap">
              <div className="m-future-ico m-ico4">

              </div>
              <h3 className="m-future-info-title">专家健康咨询</h3>
              <p className="m-future-info-text">关联医生，进行线上咨询、线下问诊的服务，就诊更便捷</p>
            </div>
            <div className="m-future-img">
              <img src={require('../../../../static/images/publicDevice/img-longpic-inthefuture-04.png')} alt="就医绿色通道" />
            </div>
          </div>
          <div className="m-future-info">
            <div className="m-future-info-wrap">
              <div className="m-future-ico m-ico5">

              </div>
              <h3 className="m-future-info-title">健身俱乐部</h3>
              <p className="m-future-info-text">组建员工俱乐部，举行健身活动，提高身体素质</p>
            </div>
            <div className="m-future-img">
              <img src={require('../../../../static/images/publicDevice/img-longpic-inthefuture-05.png')} alt="就医绿色通道" />
            </div>
          </div>

        </div>
    )
  }
  _renderHealthImg() {
    return (
        <div className="m-public-device-health-img">

        </div>
    )
  }

  _renderInfo() {
    const {show,showEvent} = this.props
    return (
      <Rule show={show} onClick={()=>{showEvent(false)}}></Rule>
    )
  }
  _goUrl(url){
      this.props.push(url)
  }
  _renderBtn() {
    return (
        <div className="m-public-btn-wrap">
            <div className="m-public-btn-opacity"></div>
            <div className="m-button-blue" onClick={()=>{this._goUrl('/special/publicDevicePost')}}>点击参加</div>
        </div>
    )
  }
  _renderActiveTitle() {
    return (
        <div className="m-public-device-active-title">
          <p>为帮助企业管理员工健康</p>
          <p>乐心发起<span>企业员工健康角</span>招募活动</p>
        </div>
    )
  }


})
