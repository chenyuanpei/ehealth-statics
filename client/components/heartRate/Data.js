import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'
import {getUpdateDateDesc,checkFloat} from '../../util/common'
import {getBmiLevel,getBmiText,getBmiColor} from '../../util/weight/weight'

export default class Data extends Component {

  render() {
    require('../../styles/heartRate/heartRate.styl')
    const {heartRateData} = this.props
    return (
      <div className="desc-item" style={{paddingBottom: 0}}>
        <h4 className="subtitle">
          <img className="icon" src={require('../../../static/images/sports/icon-data.png')} />
          心率区间
        </h4>
        <ul className="quality-st">
          <li className="st">
            <span className="st-name">热身</span>
            <div className="st-desc">
              <span style={{fontSize:'0.64rem'}}>{this.getNH(heartRateData?heartRateData.exetimeWarmUp:0)}</span><span style={{fontSize:'0.48rem'}}>小时</span>
              <span style={{fontSize:'0.64rem'}}>{this.getNM(heartRateData?heartRateData.exetimeWarmUp:0)}</span><span style={{fontSize:'0.48rem'}}>分钟</span>
              <div className="bar" style={{display:heartRateData?'block':'none',width:this.getStBarStyleWidth('exetimeWarmUp'),background:this.getStBarStyleBackground('exetimeWarmUp')}}>
              </div>
            </div>
          </li>
          <li className="st">
            <span className="st-name">燃脂</span>
            <div className="st-desc">
              <span style={{fontSize:'0.64rem'}}>{this.getNH(heartRateData?heartRateData.exetimeLf:0)}</span><span style={{fontSize:'0.48rem'}}>小时</span>
              <span style={{fontSize:'0.64rem'}}>{this.getNM(heartRateData?heartRateData.exetimeLf:0)}</span><span style={{fontSize:'0.48rem'}}>分钟</span>
              <div className="bar" style={{display:heartRateData?'block':'none',width:this.getStBarStyleWidth('exetimeLf'),background:this.getStBarStyleBackground('exetimeLf')}}>
              </div>
            </div>
          </li>
          <li className="st">
            <span className="st-name">耐力</span>
            <div className="st-desc">
              <span style={{fontSize:'0.64rem'}}>{this.getNH(heartRateData?heartRateData.exetimeCpm:0)}</span><span style={{fontSize:'0.48rem'}}>小时</span>
              <span style={{fontSize:'0.64rem'}}>{this.getNM(heartRateData?heartRateData.exetimeCpm:0)}</span><span style={{fontSize:'0.48rem'}}>分钟</span>
              <div className="bar" style={{display:heartRateData?'block':'none',width:this.getStBarStyleWidth('exetimeCpm'),background:this.getStBarStyleBackground('exetimeCpm')}}>
              </div>
            </div>
          </li>
          <li className="st">
            <span className="st-name">极限</span>
            <div className="st-desc">
              <span style={{fontSize:'0.64rem'}}>{this.getNH(heartRateData?heartRateData.exetimeSup:0)}</span><span style={{fontSize:'0.48rem'}}>小时</span>
              <span style={{fontSize:'0.64rem'}}>{this.getNM(heartRateData?heartRateData.exetimeSup:0)}</span><span style={{fontSize:'0.48rem'}}>分钟</span>
              <div className="bar" style={{display:heartRateData?'block':'none',width:this.getStBarStyleWidth('exetimeSup'),background:this.getStBarStyleBackground('exetimeSup')}}>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }

  getNH(m){
    let nh = 0
    nh = Math.floor(m/60)
    return nh
  }

  getNM(m){
    let nm = 0
    nm = m%60
    return nm
  }


  getStBarStyleWidth(name){
    const {heartRateData} = this.props
    let w=0;
    if(heartRateData){
      let total = heartRateData.exetimeCpm+heartRateData.exetimeLf+heartRateData.exetimeSup+heartRateData.exetimeWarmUp
      w=(heartRateData[name]/total*100).toFixed(0)+'%'
      if(total==0){
        w = 0
      }
    }
    return w
  }

  getStBarStyleBackground(name){
    const {heartRateData} = this.props
    let c = ''
    if(heartRateData){
      if(name=='exetimeLf'){
        c = '#ffb500'
      }else if(name=='exetimeCpm'){
        c = '#f26b08'
      }else if(name=='exetimeSup'){
        c = '#e51111'
      }else if(name=='exetimeWarmUp'){
        c='#ffe400'
      }
    }
    return c
  }

}
