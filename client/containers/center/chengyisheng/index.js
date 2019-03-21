import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import InputBut from '../../../components/common/form/InputBut'
import Button from '../../../components/common/button/Button'
import Title from '../../../components/common/title/Title'
// selector
import selectors from './selectors'
// actions
import actions from './actions'
// const
import {STEP_UPDATE, STEP_FIRST_BIND} from './const'
export default connect(
  debug(selectors),
  actions,
)(
  class Chengyisheng extends Component {

    componentDidMount() {
      const {init} = this.props
      const {params: {urlId}} = this.props


      init(urlId)
    }

    componentWillUnmount() {
      this.props.clear()
    }
    render() {
      require('../../../styles/page/chengyisheng.less')

      const {loaded, step} = this.props

      return (
        <div className="phoneBox">
          {/* 跳转页面 */}
          {loaded && step === STEP_UPDATE && this.pushChengyisheng()}
          {/* 绑定手机 */}
          {loaded && step === STEP_FIRST_BIND && this.renderFirstBindMobile()}
        </div>
      )
    }
    pushChengyisheng() {
      const { params: {urlId}} = this.props

      return (
        <div className="m-chengyisheng-wrap">
          <Title title='正在进入名医预约'/>
          <div className="m-lexin-logo">
            <img src={require('../../../../static/images/chengyisheng/logo.png')} alt="" />
          </div>
          <div>正在进入名医预约</div>
        </div>
      )
    }
    // 首次绑定手机
    renderFirstBindMobile () {
      const {time, code,  mobile, sendCode, changeMobile, changeCode, submit, params: {urlId}} = this.props
      const mobileInput = {
        inputType: 'number',
        placeholder: '请输入11位手机号',
        maxLength: 11,
        value: mobile,
        onChange: (v) => changeMobile(v)
      }

      var codeInput = {
        placeholder: "验证码",
        buttonText: time > 0 ? `重新发送(${time})` : '获取验证码',
        buttonType: time > 0 ? 'default' : 'primary',
        onChange: (v) => changeCode(v),
        onClick: () => {
          sendCode(mobile)
        },
        inputType: "number"
      }
      return (
        <div className="m-form-box">
          <Title title='绑定手机号'/>
          <InputBut {...mobileInput}/>
          <InputBut {...codeInput}/>
          <ul className="m-chengyisheng-tips">
            <li>
              绑定手机，即可预约：
            </li>
            <li>
              知名三甲医院心脑血管名医，
            </li>
            <li>
              医生私人时间接诊，无需排队。
            </li>
            <li>
              注：本服务号源信息由橙医生集团提供
            </li>
          </ul>
          <p className="pageBottomIn">
            <Button onClick={() => submit({mobile, code, urlId})}>{'登录'}</Button>
          </p>
        </div>
      )
    }

  }
)
