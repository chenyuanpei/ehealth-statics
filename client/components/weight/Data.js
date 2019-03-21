import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'
import {getUpdateDateDesc,checkFloat} from '../../util/common'
import {getBmiLevel,getBmiText,getBmiColor} from '../../util/weight/weight'

export default class Data extends Component {
  //static propTypes = {
  //  weight: PropTypes.string,
  //  twoWeight: PropTypes.string,
  //  bmi: PropTypes.string,
  //  pbf: PropTypes.string,
  //  water: PropTypes.string,
  //  muscle: PropTypes.string,
  //  bone: PropTypes.string,
  //  productTypeCode: PropTypes.string,
  //  measurementDate: PropTypes.string,
  //}

  static defaultProps = {
    weight: 0,
    twoWeight: 0,
    pbf: 0,
    productTypeCode:''
  }

  render() {
    const {weight,twoWeight,bmi,pbf,water,muscle,bone,productTypeCode} = this.props
    require('../../styles/weight/data.styl')
    return (
      <div className="desc">
        <div className={pbf || productTypeCode=='02' ? 'weight-data':'weight-data border-none'}>
          <div className="title-div">
            <img className="icon" src={require('../../../static/images/sports/icon-weight-data.png')} />
            <span className="title">体重数据</span>
          </div>
          <div className="data-div">
            <div className="data">{weight?weight:'--'}</div>
            <div className="unit-div">
              <div className="unit">kg</div>
              <div className="updated">{this._getUpdateText()}</div>
            </div>
            <div className="compare" style={{display:weight?'flex':'none'}}>
              <img className="compare-icon" src={weight>twoWeight?require('../../../static/images/sports/icon-weight-up.png'):require('../../../static/images/sports/icon-weight-down.png')} />
              {this._getCompareValue()}kg
            </div>
          </div>
          {/*<div className="physique">*/}
            {/*<div className="physique-text">身材{this._getPhysiqueText()}</div>*/}
            {/*<div className="physique-index">*/}
              {/*<div style={{marginLeft: this._getPhysiqueTextLeft()+'rem'}}>体质指数{bmi}</div>*/}
              {/*<div className="physique-index-line">*/}
                {/*<div style={{display: bmi>0 ? 'block' : 'none'}} className="physique-index-line1"></div>*/}
                {/*<div style={{display: bmi>=18.5 ? 'block' : 'none'}} className="physique-index-line2"></div>*/}
                {/*<div style={{display: bmi>=24 ? 'block' : 'none'}} className="physique-index-line3"></div>*/}
                {/*<div style={{display: bmi>=28 ? 'block' : 'none'}} className="physique-index-line4"></div>*/}
                {/*<div style={{display: bmi ? 'block' : 'none',left: this._getPhysiqueLeft()+'rem',background: this._getPhysiqueColor()}} className="progress-bar"></div>*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>

        {/*<div className="physique-data" style={{display: pbf || productTypeCode=='02' ? 'block' : 'none'}}>*/}
          {/*<div className="title-div">*/}
            {/*<img className="icon" src={require('../../../static/images/sports/icon-body-fat-data.png')} />*/}
            {/*<span className="title">体质数据</span>*/}
          {/*</div>*/}

          {/*<div style={{display: pbf ? 'block' : 'none'}}>*/}
            {/*<div className="data-div">*/}
              {/*<div className="data">{pbf}</div>*/}
              {/*<div className="unit-div">*/}
                {/*<div className="unit">%</div>*/}
                {/*<div className="updated">脂肪率</div>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*<div className="more-div">*/}
              {/*<div className="more-item">*/}
                {/*<div className="more-text">水分率</div>*/}
                {/*<div className="more-value">{water}%</div>*/}
              {/*</div>*/}
              {/*<div className="more-item">*/}
                {/*<div className="more-text">肌肉量</div>*/}
                {/*<div className="more-value">{muscle}kg</div>*/}
              {/*</div>*/}
              {/*<div className="more-item-end">*/}
                {/*<div className="more-text">骨量</div>*/}
                {/*<div className="more-value">{bone}kg</div>*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
          {/**/}
          {/*<div style={{display: !pbf&&productTypeCode=='02' ? 'block' : 'none'}} className="no-data-div">*/}
            {/*<img className="no-data-img" src={require('../../../static/images/sports/icon-body-fat-no-data.png')} />*/}
            {/*<div className="no-data-text">*/}
              {/*赤脚上秤分析体质各项指标,<br/>助你打造完美身材!*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>

    )
  }

  _getUpdateText(){
    const {measurementDate} = this.props
    let text='';
    if(measurementDate){
      let time = measurementDate
      text=getUpdateDateDesc(time)
    }else{
      text='未记录'
    }
    return text;
  }

  _getPhysiqueColor(){
    const {bmi} = this.props
    let level=0;
    if(bmi){
      level=getBmiLevel(bmi);
    }
    return getBmiColor(level);
  }

  _getPhysiqueText(){
    const {bmi} = this.props
    let level=0
    if(bmi){
      level=getBmiLevel(bmi);
    }
    return getBmiText(level);
  }

  _getPhysiqueLeft(){
    const {bmi} = this.props
    let left=0;
    if(bmi){
      let level=getBmiLevel(bmi);
      let width=102;
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

  _getPhysiqueTextLeft(){
    //const {bmi} = this.props
    //let level=1
    //if(bmi){
    //  level=getBmiLevel(bmi);
    //}
    //return ((level-1)*120-5)/(750/640*50)
    //let val=level==4?20:10
    //return ((level-1)*102-val)/50
    let left=this._getPhysiqueLeft()
    left=left>7.1?7.1:left
    left=left<1?1:left

    return left-1.2
  }

  _getCompareValue(){
    const {weight,twoWeight} = this.props
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

}
