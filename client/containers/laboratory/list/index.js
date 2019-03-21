import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// selector
import selectors from './selectors'
// actions
import actions from './actions'
// const
import Title from '../../../components/common/title/Title'

export default connect(
  selectors,
  actions
)(class extends Component {

  componentDidMount() {
    const {init} = this.props
    init()
  }

  _goUrl(url) {
    this.props.push(url)
  }
  render() {
    const {allExperiment} = this.props
    require('../../../styles/page/laboratory.less')
    return (
      <div>
        <Title title="健康实验室"/>
        <div className="m-laboratory-wrap">
          <h3 className="m-laboratory-title">欢迎体验乐心健康实验室</h3>
          <p className="m-laboratory-tips">为了给用户带来更好的个性化服务，实验室功能会不断完善，请不要太过依赖。</p>
          <h4 className="m-laboratory-param">可参与的项目</h4>
          <ul className="m-laboratory-list">
            {
              allExperiment.map((experiment, idx) => {
                return (
                  <li key={idx} className="m-laboratory-item" onClick={()=>this._goUrl(`laboratory/switch?code=${experiment.code}`)}>
                    <div className="title">{experiment.name}</div>
                    <div className="content">{experiment.remark}</div>
                    <div className="m-arrow"></div>
                  </li>
                )
              })
            }

          </ul>
          <div className="m-laboratory-bottom">
            使用乐心健康实验室，即表示你同意
            <div className="m-laboratory-agreement" onClick={()=>this._goUrl('laboratory/agreement')}>
              《乐心健康实验室使用协议》
            </div>
          </div>
        </div>
      </div>
    )
  }

})
