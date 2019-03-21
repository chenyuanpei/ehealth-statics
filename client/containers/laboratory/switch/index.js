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
    const {init,location:{query:{code}}} = this.props
    init(code)
  }
  state = {
    BloodPressureAssistant:{
      title:'血压助手',
      tipsList:[
        {
          title:'智判断',
          content:'我们根据用户的实际情况，对血压健康数据进行判断、解读，并提出个性化的建议。'
        },{
          title:'智推荐',
          content:'我们根据用户的血压情况，为用户推荐实用的健康知识。'
        },{
          title:'智提醒',
          content:'我们根据用户的血压情况，提醒用户在生活和工作中注意采取有效的健康行动。'
        },{
          title:'智评估',
          content:'我们根据用户的血压数据和行为，阶段性评估用户的健康情况， 并反馈给用户。'
        }

      ]
    }
  }
  _goUrl(url) {
    this.props.push(url)
  }
  _checkChange() {
    const {flag,closeThis,openThis,location:{query:{code}}} = this.props
    if(flag){
      closeThis({code})
    }else{
      openThis({code})
    }

  }
  render() {
    const {flag,location:{query:{code}}} = this.props
    const libTitle = this.state[code].title
    const tipsList = this.state[code].tipsList

    require('../../../styles/page/laboratory.less')
    return (
      <div>

        <Title title="健康实验室"/>
        <div className="m-laboratory-switch-wrap">
          <div className="m-laboratory-switch-top-box">
            <div className="title"><img className="ico" src={require('../../../../static/images/tag/icon--blood-pressure-assistant-survey@2x.png')} alt=""/>调查显示</div>
            <div className="content">
              高血压人群中，只有35%的人知道自己有高血压，采取措施的人更少。血压助手通过智判断、智推荐、智提醒和智评估为您提供服务。
            </div>
          </div>
          <div className="m-laboratory-assistant-box">
            <div className="m-assistant-item">
              <div className="title">{libTitle}</div>
              <span className='tg-list-item'>
                <input className='tgl tgl-ios' id='cb2' type='checkbox' onClick={()=>this._checkChange()} checked={flag ? 'checked' : ''} />
                <label className='tgl-btn' htmlFor='cb2'></label>
              </span>
            </div>
            <div className="m-laboratory-text-list">
              <ul className={flag?'m-color-in':''}>
                {
                  tipsList.map((tips, idx) => {
                    return (
                      <li key={idx} className="item">
                        <h3 className="m-title">{tips.title}</h3>
                        <p className="m-content">{tips.content}</p>
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

})
