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
import {STEP_UPDATE, STEP_CHECK_OLD, STEP_BIND_NEW, STEP_FIRST_BIND} from './const'

export default connect(
  debug(selectors),
  actions,
)(
  class LzBindMobile extends Component {

    componentDidMount() {
      const {init} = this.props
	    console.log('componentDidMount', this.props)
      init()
    }

    componentWillUnmount() {
      this.props.clear()
    }

    render() {
      require('../../../styles/page/lzBindMobile.less')

      const {loaded, step} = this.props

      console.log('this.props', this.props)
	    console.log('render', loaded, step)
	  
      return (
        <div className="phoneBox">
          <Title title='绑定手机号'/>
          {/* 修改手机 */}
          {loaded && step === STEP_UPDATE && this.renderChangeMobile()}
          {/* 验证原手机号 */}
          {loaded && step === STEP_CHECK_OLD && this.renderCheckOldMobile()}
          {/* 验证新手机号 */}
          {loaded && step === STEP_BIND_NEW && this.renderCheckNewMobile()}
          {/* 绑定手机 */}
          {loaded && step === STEP_FIRST_BIND && this.renderFirstBindMobile()}
        </div>
      )
    }

    // 生成修改手机框
    renderChangeMobile() {
      const {accountMobile, changeStep} = this.props

      const opts = {
        value: accountMobile,
        buttonText: "修改",
        onClick: () => {
          changeStep(STEP_CHECK_OLD)
        },
        disabled: true
      }
      return (
        <div>
          <InputBut {...opts}/>
        </div>)
    }

    // 验证原手机号
    renderCheckOldMobile() {
      const {time, code, accountMobile, sendCode, changeCode, submit} = this.props

      const mobileInput = {
        inputType: 'number',
        placeholder: '请输入11位手机号',
        maxLength: 11,
        disabled: true,
        value: accountMobile,
      }

      var codeInput = {
        inputType: "number",
        placeholder: "验证码",
        buttonText: time > 0 ? `重新发送(${time})` : '获取验证码',
        buttonType: time > 0 ? 'default' : 'primary',
        value: code,
        onChange: (v) => changeCode(v),
        onClick: () => {
          sendCode(accountMobile)
        },
      }

      return (
        <div>
          <div className="weui_cells_title">{'请输入原手机号码收到的验证码'}</div>
          <InputBut {...mobileInput}/>
          <InputBut {...codeInput}/>
          <div className="pageBottom">
            <Button onClick={() => submit({mobile: accountMobile, code})}>{'下一步'}</Button>
          </div>
        </div>
      )
    }

    // 验证新手机号
    renderCheckNewMobile() {
      const {time, code, mobile, sendCode, changeCode, changeMobile, submit} = this.props

      const mobileInput = {
        inputType: 'number',
        placeholder: '请输入11位手机号',
        maxLength: 11,
        value: mobile,
        onChange: (v) => changeMobile(v)
      }

      var codeInput = {
        inputType: "number",
        placeholder: "验证码",
        buttonText: time > 0 ? `重新发送(${time})` : '获取验证码',
        buttonType: time > 0 ? 'default' : 'primary',
        onChange: (v) => changeCode(v),
        onClick: () => {
          sendCode(mobile)
        },
      }

      return (
        <div>
          <div className="weui_cells_title">{'请输入新手机号码收到的验证码'}</div>
          <InputBut {...mobileInput}/>
          <InputBut {...codeInput}/>
          <div className="pageBottom">
            <Button onClick={() => submit({mobile, code})}>{'绑定'}</Button>
          </div>
        </div>
      )
    }

    // 首次绑定手机
    renderFirstBindMobile() {
      const {time, code, mobile, sendCode, changeMobile, changeCode, submit} = this.props

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
        <div>
          <InputBut {...mobileInput}/>
          <InputBut {...codeInput}/>
          <div className="pageBottom">
            <Button onClick={() => submit({mobile, code})}>{'绑定'}</Button>
          </div>
        </div>
      )
    }

  }
)
