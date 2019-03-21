import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../util/common'
import Title from '../../../components/common/title/Title'
import {getPhysiqueText} from '../../../util/weight/report'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    let {params: {memberId}, loadData} = this.props
    loadData({memberId, pageLoad: true})

  }

  componentWillUnmount() {
  }


  render() {
    let {location:{query:{level}}} = this.props
    require('../../../styles/weight/weightPhysique.less')
    return (
      <div className="m-weight-physique-wrap">
        <Title title='体型' />
        <div className="m-weight-physique-top-img">
          <img src={require(`../../../../static/images/weight/${level}.png`)} alt=""/>
        </div>
        <div className="m-weight-physique-top-text">
          {getPhysiqueText(level)}
        </div>
        <div className="m-weight-physique-chart">
          <div className="ico-left-top"></div>
          <div className="ico-left-bottom"></div>
          <div className="ico-right-bottom"></div>
          <div className="left-title">
            体脂率
          </div>
          <div className="bottom-title">
            肌肉
          </div>
          <div className="box">
            <div className="top">
              <div className="left">
                <img src={require(`../../../../static/images/weight/${level == 'img_recessive_obesity_active' ? 'img_recessive_obesity_active' : 'img_recessive_obesity_inactive'}.png`)} alt=""/>
                <div className={level === 'img_recessive_obesity_active'? "m-title-active":"m-physique-title"}>隐性肥胖型</div>
              </div>
              <div className="center">
                <img src={require(`../../../../static/images/weight/${level == 'img_overweight_active' ? 'img_overweight_active' : 'img_overweight_inactive'}.png`)} alt=""/>
                <div className={level === 'img_overweight_active'? "m-title-active":"m-physique-title"}>偏胖型</div>
              </div>
              <div className="right">
                <img src={require(`../../../../static/images/weight/${level == 'img_strongandfat_active' ? 'img_strongandfat_active' : 'img_strongandfat_inactive'}.png`)} alt=""/>
                <div className={level === 'img_strongandfat_active'? "m-title-active":"m-physique-title"}>结实偏胖型</div>
              </div>
            </div>
            <div className="middle">
              <div className="left">
                <img src={require(`../../../../static/images/weight/${level == 'img_lack_of_exercises_active' ? 'img_lack_of_exercises_active' : 'img_lack_of_exercises_inactive'}.png`)} alt=""/>
                <div className={level === 'img_lack_of_exercises_active'? "m-title-active":"m-physique-title"}>缺乏运动型</div>
              </div>
              <div className="center">
                <img src={require(`../../../../static/images/weight/${level == 'img_standard_active' ? 'img_standard_active' : 'img_standard_inactive'}.png`)} alt=""/>
                <div className={level === 'img_standard_active'? "m-title-active":"m-physique-title"}>标准型</div>
              </div>
              <div className="right">
                <img src={require(`../../../../static/images/weight/${level == 'img_robust_active' ? 'img_robust_active' : 'img_robust_inactive'}.png`)} alt=""/>
                <div className={level === 'img_robust_active'? "m-title-active":"m-physique-title"}>健壮型</div>
              </div>
            </div>
            <div className="bottom">
              <div className="left">
                <img src={require(`../../../../static/images/weight/${level == 'img_lean_active' ? 'img_lean_active' : 'img_lean_inactive'}.png`)} alt=""/>
                <div className={level === 'img_lean_active'? "m-title-active":"m-physique-title"}>精瘦型</div>
              </div>
              <div className="center">
                <img src={require(`../../../../static/images/weight/${level == 'img_model_active' ? 'img_model_active' : 'img_model_inactive'}.png`)} alt=""/>
                <div className={level === 'img_model_active'? "m-title-active":"m-physique-title"}>模特型</div>
              </div>
              <div className="right">
                <img src={require(`../../../../static/images/weight/${level == 'img_athletic_active' ? 'img_athletic_active' : 'img_athletic_inactive'}.png`)} alt=""/>
                <div className={level === 'img_athletic_active'? "m-title-active":"m-physique-title"}>健美型</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

