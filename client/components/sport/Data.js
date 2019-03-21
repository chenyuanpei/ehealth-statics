import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'
import {getUpdateDateDesc,checkFloat} from '../../util/common'
import {caloriesConversion,distanceConversion,round} from '../../util/sport/sport'

export default class Data extends Component {
  //static propTypes = {
  //  target: PropTypes.number,
  //  step: PropTypes.number,
  //}

  static defaultProps = {
    target:0,
  }

  render() {
    const {target,step} = this.props

    require('../../styles/sport/sport.styl')

    return (
      <div>
        <div className="step-count">
          <div className="title">
            <div>
              <img className="icon-sport-steps" src={require('../../../static/images/sports/icon-sport.png')} />
              <span>实时步数</span>
            </div>
            <div className="uncompleted" style={{display:!this.isCompleted()?'flex':'none'}}>
              <img className="icon-sports-uncompleted" src={require('../../../static/images/sports/icon-sports-uncompleted.png')} />
              <span>{target}</span>
            </div>
            <div className="achieve-goal" style={{display:this.isCompleted()?'flex':'none'}}>
              <img className="icon-sports-achieve-goal" src={require('../../../static/images/sports/icon-sports-achieve-goal.png')} />
              <span>{target}</span>
            </div>
          </div>
          <div className="content">
            <span className="step-value">{step >= 0 ? step : ''}<span style={{display:step >= 0 ? 'none' : 'inline',fontWeight: 'normal'}}>&minus;&minus;</span></span><span className="step-unit">步</span>
          </div>
        </div>
        <div className="result">
          <div className="item">
            <div>
              <span className="title">距离</span><span className="number">{this.latestDistance()}</span><span
              className="unit">公里</span>
            </div>
            <span style={{display:this.latestDistance() > 0?'block':'none'}} className="tips">&asymp;{this.distanceTips()}</span>
          </div>
          <div className="item">
            <div>
              <span className="title">消耗</span><span className="number">{this.latestCalories()}</span><span
              className="unit">大卡</span>
            </div>
            <span style={{display:this.latestCalories() > 0?'flex':'none'}} className="tips">&asymp;{this.caloriesTips()}</span>
          </div>
        </div>
      </div>
    )
  }

  latestStep(){
    const {step,defaultsNumber} = this.props;
    return step >= 0 ? step : defaultsNumber
  }

  latestCalories(){
    const {calories} = this.props;
    return calories >= 0 ? round(calories, 10) : 0
  }

  latestDistance(){
    const {distance} = this.props;
    return distance >= 0 ? round(distance / 1000, 10) : 0
  }

  isCompleted(){
    const {step,target} = this.props;
    return step >= target && step!=0
  }

  caloriesTips(){
    const {calories} = this.props;
    return caloriesConversion(calories)
  }

  distanceTips(){
    const {distance} = this.props;
    return distanceConversion(distance)
  }

}
