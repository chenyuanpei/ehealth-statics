import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

// util
import {debug} from '../../../util/common'
import {getBmiText,getBmiColor,getBmiLevel} from '../../../util/weight/weight'
// components
import WeightSelect from '../../../components/weight/WeightSelect'
import BpAddTab from '../../../components/common/form/BpAddTab'
import CommonSelect from '../../../components/member/data/CommonSelect'
import Button from '../../../components/common/button/Button'
import Title from '../../../components/common/title/Title'
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
  _getPhysiqueColor(bmi){
    let level=0;
    if(bmi){
      level=getBmiLevel(bmi);
    }
    return getBmiColor(level);
  }
  _getPhysiqueText(bmi){
    let level=0
    if(bmi){
      level=getBmiLevel(bmi);
    }
    return getBmiText(level);
  }
  _getPhysiqueLeft(bmi){
    let left=0;
    if(bmi){
      let level=getBmiLevel(bmi);
      let width=140;
      let bl=50;
      if(level==1){
        //left=((120*(level-1))+120/18.5*bmi)/(750/640*50);
        left=((width*(level-1))+width/18.5*bmi)/bl;
      }else if(level==2){
        //left=((120*(level-1))+120/(24-18.5)*(bmi-18.5))/(750/640*50);
        left=((width*(level-1))+width/(24-18.5)*(bmi-18.5))/bl;
      }else if(level==3){
        //left=((120*(level-1))+120/(28-24)*(bmi-24))/(750/640*50);
        left=((width*(level-1))+width/(28-24)*(bmi-24))/bl;
      }else{
        //left=((120*(level-1))+120/(46.5-28)*(bmi-28))/(750/640*50);
        left=((width*(level-1))+width/(46.5-28)*(bmi-28))/bl;
        left=left>(width*4/bl)?(width*4/bl):left;
      }
    }
    return left;
  }
  componentWillUnmount() {
  }


  render() {
    const {location:{query:{bmi}}} = this.props
    require('../../../styles/weight/weightBmi.less')
    return (
      <div className="m-weight-bmi-wrap">
        <Title title='BMI' />
        <div className="m-weight-physique-data">
          {bmi}
        </div>
        <div className="m-weight-physique-text">{this._getPhysiqueText(bmi)}</div>
        <div className="bmi-physique-wrap">
          <div className="m-physique-data">
            <div className="m-physique-data-item">
              18.5
            </div>
            <div className="m-physique-data-item">
              24
            </div>
            <div className="m-physique-data-item">
              28
            </div>
          </div>
          <div className="physique-index-line">
            <div className={parseInt(bmi) < 18.5 ? "physique-index-line1 physique-index-line-active" : "physique-index-line1"}></div>
            <div className={(parseInt(bmi) >= 18.5 && parseInt(bmi) <24) ? "physique-index-line2 physique-index-line-active" : "physique-index-line2"}></div>
            <div className={(parseInt(bmi) >= 24 && parseInt(bmi) <28) ? "physique-index-line3 physique-index-line-active" : "physique-index-line3"}></div>

            <div className={parseInt(bmi) >= 28 ? "physique-index-line4 physique-index-line-active" : "physique-index-line4"}></div>
            <div className="progress-bar" style={{left:this._getPhysiqueLeft(bmi)+'rem',background:this._getPhysiqueColor(bmi)}}></div>
          </div>
          <div className="physique-text-box">
            <div className="physique-text">
              偏瘦
            </div>
            <div className="physique-text">
              理想
            </div>
            <div className="physique-text">
              偏胖
            </div>
            <div className="physique-text">
              肥胖
            </div>
          </div>
          <div className="physique-content">
            <div className="physique-content-text">
                <div className="title">BMI = 体重(kg)/身高(㎡)</div>
                BMI又称身体质量指数，在一定程度上可以反映人的胖瘦情况，适宜的BMI是保持健康和好身材的前提
            </div>
          </div>
        </div>

      </div>
    )
  }
})

