import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'
import {getUpdateDateDesc,checkFloat} from '../../util/common'
import {caloriesConversion,distanceConversion,round} from '../../util/sport/sport'
import SleepLength from './SleepLength'

import {total,qualitySt,qualityAwkSt,latest} from '../../util/sleep/SleepLengthTextConf'

export default class Data extends Component {
  //static propTypes = {
  //  target: PropTypes.number,
  //  step: PropTypes.number,
  //}

  static defaultProps = {
    showPercent:false,
    sleepData:{
      sh:0,
      de:0,
      aw:0
    },
    _markSamples:[
      {
        name: '深睡',
        color: '#5d4fb8',
        lv: 3,
      },
      {
        name: '浅睡',
        color: '#8996ed',
        lv: 2
      },
      {
        name: '觉醒',
        color: '#cdd3ff',
        lv: 1
      },
    ],
  }

  render() {
    const {} = this.props

    require('../../styles/sleep/data.styl')

    return (
      <div>
        <div className="desc">
          <div className="desc-item">
            <h4 className="subtitle">
              <img className="icon" src={require('../../../static/images/sports/icon-sleep-time.png')} />
              <span name="main-title">
                <span >睡眠时长</span>
              </span>
            </h4>
            <SleepLength showData={this.getSleepLength(total,this.sleepQualities().totalHours,this.sleepQualities().totalMinutes,true,false)} />
          </div>

          <div className="desc-item">
            <h4 className="subtitle">
              <img className="icon" src={require('../../../static/images/sports/icon-sleep-data.png')} />
              睡眠质量
            </h4>
            <ul className="quality-st">
              <li className="st">
                <span className="st-name">
                  深睡
                </span>
                <div className="st-desc">
                  <SleepLength showData={this.getSleepLength(qualitySt,this.sleepQualities().deHours,this.sleepQualities().deMinutes,false,false)} />
                  <div className="bar" style={this.getStBarStyle(3)}>
                  </div>
                </div>
              </li>

              <li className="st">
                <span className="st-name">
                  <span name="st">
                    浅睡
                  </span>
                </span>
                <div className="st-desc">
                  <SleepLength showData={this.getSleepLength(qualitySt,this.sleepQualities().shHours,this.sleepQualities().shMinutes,false,false)} />
                  <div className="bar" style={this.getStBarStyle(2)}>
                  </div>
                </div>
              </li>
              <li className="st">
                <span className="st-name">
                    <slot name="at">
                      觉醒
                    </slot>
                </span>
                <div className="st-desc">
                  <SleepLength showData={this.getSleepLength(qualityAwkSt,this.sleepQualities().awkHours,this.sleepQualities().awkMinutes,false,false)} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }


  getSleepLength(conf, hours, minutes,big,onlyMinutes){
    return {
      ...conf, hours, minutes,big,onlyMinutes
    }
  }

  getStBarStyle(lv){
    const {_markSamples,showPercent,sleepData} = this.props;
    if(showPercent===false){
      return {}
    }
    // console.log(lv,'xx',this.markSamples.filter(e=>e.lv==lv)[0].color)
    let w = ''
    let record = sleepData
    let total = (parseInt(record.de)
    + parseInt(record.sh))
    if(total==0){
      return null
    }
    if (lv == 3) {
      w = 100 * parseInt(record.de)
        /
        total   .toFixed(0).replace('0.', '') + '%'
    } else if (lv == 2) {
      w = 100 * parseInt(record.sh)
        / total
          .toFixed(0).replace('0.', '') + '%'
    }

    return {
      background: _markSamples.filter(e=>e.lv == lv)[0].color,
      width: w
    }
  }

  sleepQualities(){
    const {sleepData} = this.props;
    const {sh, de, aw } = sleepData || {}

    let totalHours, totalMinutes,
      shHours, shMinutes,
      deHours, deMinutes,
      awkHours, awkMinutes


    if(!sleepData||(parseInt(sh) + parseInt(de))==0){
      totalHours = '−−'
      totalMinutes = '−−'
      shHours = 0
      shMinutes = 0
      deHours = 0
      deMinutes = 0
      awkHours =0
      awkMinutes = 0

    }else{

      totalHours = Math.floor((parseInt(sh) + parseInt(de) + parseInt(aw)) / 60)
      totalMinutes = (parseInt(sh) + parseInt(de) + parseInt(aw)) % 60
      shHours = Math.floor((parseInt(sh)) / 60)
      shMinutes = (parseInt(sh)) % 60
      deHours = Math.floor((parseInt(de)) / 60)
      deMinutes = (parseInt(de)) % 60
      awkHours = Math.floor((parseInt(aw)) / 60)
      awkMinutes = (parseInt(aw)) % 60
    }
    return {
      totalHours, totalMinutes,
      shHours, shMinutes,
      deHours, deMinutes,
      awkHours, awkMinutes
    }
  }


}
