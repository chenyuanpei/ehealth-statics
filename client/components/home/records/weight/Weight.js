import React, {Component, PropTypes} from 'react'
import Immutable, {List, Map} from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'
import classnames from 'classnames'
import PubSub from 'pubsub-js'
import moment from 'moment'

import {getUpdateDateDesc,checkFloat} from '../../../../util/common'
import {RowFlex, Col} from '../../../frozenui/grid'

import {TOPIC_CHART_SPORT_BOX_CLICK, MORE_INFO_CLICK} from '../topic'
import Chart from '../../../weight/Chart'
import Top from '../common/Top'

import {round} from '../../../../util/sport/sport'
import {debug,getWeekStart,getWeekEnd} from '../../../../util/common'

export default class Weight extends Component {

  static defaultProps = {
    stepData:{
      step:0,
      calories:0,
      distance:0
    }
  }

  constructor(props) {
    super(props)

    //this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  handleChartBoxClick() {
    PubSub.publish(TOPIC_CHART_SPORT_BOX_CLICK, 'weight')
  }

  moreInfoClick() {
    PubSub.publish(MORE_INFO_CLICK, 'weight')
  }

  render() {
    require('../../../../styles/record/record.less')
    require('../../../../styles/home/records.less')
    require('../../../../styles/weight/data.styl')

    const {lastWeightData,allWeightData,lastSevenWeightData,twoWeightData,moreInfo} = this.props

    let total = 0
    if(allWeightData&&allWeightData.weightList&&allWeightData.weightList.length>0){
      for(let i=0;i<allWeightData.weightList.length;i++){
        let item=allWeightData.weightList[i]
        let measurementDate = item.measurementDate.replace(/-/g, "/")
        if(getWeekStart().getTime()<=new Date(measurementDate).getTime()){
          //本周数据
          total++
        }
      }
    }

    let weight=0,twoWeight=0
    if(lastWeightData&&lastWeightData.weight){
      weight=lastWeightData.weight
    }
    if(twoWeightData&&twoWeightData.weight){
      twoWeight=twoWeightData.weight
    }

    let dateStr=''
    if(lastWeightData&&lastWeightData.measurementDate){
      let time=lastWeightData.measurementDate.replace(/-/g, "/")
      dateStr=new Date(time).format('MM月dd日 hh:mm')
    }

    return (
      <div className={classnames("recordBox",'weight-page')}>
        <div className={classnames("chartBox")} style={{background: '#0dc8aa'}} onClick={() => this.handleChartBoxClick()}>
          <Top title="体重" text={`本周测量${total}次`}/>
          <div className="charTop">
            <span>最近7次数据</span>
            <span>{dateStr}</span>
          </div>
          <Chart isHome="true" lastSevenWeightData={lastSevenWeightData} />
          <div style={{left:this.getTriangletLeft()+'px',display:this.getTriangletLeft()>0?'block':'none'}} className="triangle-up"></div>
        </div>

        <div className="recordInfo" style={{paddingTop:'0px',height:'2.2rem'}}>
          <div className="recordIconSport">
            <img className="iconImg" src={require('../../../../../static/images/sports/icon-index-weight.png')} />
          </div>
          <RowFlex className="currentValBox">
            <div className="weightValueDiv">
              <span className="weightValue">{weight}</span>
              <span className="weightUnit">kg</span>
            </div>
            <div className="compare" style={{paddingTop:0,paddingRight:'0.8rem'}}>
              <img className="compare-icon" src={weight>twoWeight?require('../../../../../static/images/sports/icon-weight-up.png'):require('../../../../../static/images/sports/icon-weight-down.png')} />
              {this._getCompareValue()}kg
            </div>
          </RowFlex>
        </div>

        {moreInfo &&
        <div onClick={() => this.moreInfoClick()} className="m-record-more"><div>更多数据</div><span></span></div>
        }
      </div>
    )
  }

  _getCompareValue(){
    const {lastWeightData,twoWeightData} = this.props

    let weight=0,twoWeight=0
    if(lastWeightData&&lastWeightData.weight){
      weight=lastWeightData.weight
    }
    if(twoWeightData&&twoWeightData.weight){
      twoWeight=twoWeightData.weight
    }
    let value=0;
    if(weight&&twoWeight){
      if(weight>=twoWeight){
        value=weight-twoWeight
      }else{
        value=twoWeight-weight;
      }
      if(checkFloat(value))
        value=value.toFixed(1)
    }
    return value;
  }

  getTriangletLeft(){
    const {lastSevenWeightData} = this.props
    if(lastSevenWeightData){
      return (60+((750-135-23)/6)*(lastSevenWeightData.length-1)-8)*(screen.width / 750)
    }
    return 0
  }
}
