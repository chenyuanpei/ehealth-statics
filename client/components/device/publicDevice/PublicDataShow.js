import React, {Component, PropTypes} from 'react'
import {RowFlex,Col} from '../../frozenui/grid'
import {getBmiLevel,getPbfLevel,getPbfLevelArray,getMuscleLevel,getMuscleLevelArray,getBoneLevel,getBoneLevelArray,getWaterLevelArray,getWaterLevel} from '../../../util/weight/weight'
export default class PublicDataShow extends Component {
  _getPhysiqueLeft(){
    const {bmi} = this.props
    let left=0;
    if(bmi){
      let level=getBmiLevel(bmi);
      let width=75;
      let bl=50;
      if(level==1){
        //left=((120*(level-1))+120/18.5*bmi)/(750/640*50);
        left=((width*(level-1))+width*bmi/18.5)/bl;
      }else if(level==2){
        //left=((120*(level-1))+120/(24-18.5)*(bmi-18.5))/(750/640*50);
        left=((width*(level-1))+width*(bmi-18.5)/(24-18.5))/bl;
      }else if(level==3){
        //left=((120*(level-1))+120/(28-24)*(bmi-24))/(750/640*50);
        left=((width*(level-1))+width*(bmi-24)/(28-24))/bl;
      }else{
        //left=((120*(level-1))+120/(46.5-28)*(bmi-28))/(750/640*50);
        left=((width*(level-1))+width*(bmi-28)/(46.5-28))/bl;
        left=left>(width*4/bl)?(width*4/bl):left;
      }
    }
    return left;
  }
  _getPbfLeft(){
    const {age,sex,pbf} = this.props
    let left=0
    if(age && sex && pbf){
      let level=getPbfLevel(sex,age,pbf)
      let levelPbfArray = getPbfLevelArray(sex,age,pbf)
      let width=75
      let bl=50
      if(level==1){
        left=((width*(level-1))+width*pbf/levelPbfArray[0])/bl;
      }else if(level==2){
        left=((width*(level-1))+width*(pbf-levelPbfArray[0])/(levelPbfArray[1]-levelPbfArray[0]))/bl;
      }else if(level==3){
        left=((width*(level-1))+width*(pbf-levelPbfArray[1])/(levelPbfArray[2]-levelPbfArray[1]))/bl;
      }else{
        left=((width*(level-1))+width*(pbf-levelPbfArray[2])/(levelPbfArray[3]-levelPbfArray[2]))/bl;
        left=left>(width*4/bl)?(width*4/bl):left;
      }
    }
    return left;
  }
  _getWaterLeft(){
    const {sex,water} = this.props
    let left=0
    if(sex && water){
      let level=getWaterLevel(sex,water)
      let levelWaterArray = getWaterLevelArray(sex)
      let width=98
      let bl=50
      if(level==1){
        left=((width*(level-1))+width*water/levelWaterArray[0])/bl;
      }else if(level==2){
        left=((width*(level-1))+width*(water-levelWaterArray[0])/(levelWaterArray[1]-levelWaterArray[0]))/bl;
      }else{

        left=((width*(level-1))+width*(water-levelWaterArray[1])/(levelWaterArray[2]-levelWaterArray[1]))/bl;

        left=left>(width*3/bl)?(width*3/bl):left;
      }
    }
    return left;
  }
  _getMuscleLeft(){
    const {sex,height,muscle} = this.props
    let left=0
    if(sex && height && muscle){
      let level=getMuscleLevel(sex,height,muscle)
      let levelMuscleArray = getMuscleLevelArray(sex,height,muscle)
      let width=98
      let bl=50
      if(level==1){
        left=((width*(level-1))+width*(muscle-levelMuscleArray[0])/(levelMuscleArray[1]-levelMuscleArray[0]))/bl;
        left = muscle < levelMuscleArray[0] ? 0 : left
      }else if(level==2){
        left=((width*(level-1))+width*(muscle-levelMuscleArray[1])/(levelMuscleArray[2]-levelMuscleArray[1]))/bl;
      }else{
        left=((width*(level-1))+width*(muscle-levelMuscleArray[2])/(levelMuscleArray[3]-levelMuscleArray[2]))/bl;
        left=left>(width*3/bl)?(width*3/bl):left;
      }
    }
    return left;
  }
  _getBoneLeft(){
    const {sex,weight,bone} = this.props
    let left=0
    if(bone && sex && weight){
      let level=getBoneLevel(sex,weight,bone)

      let levelBoneArray = getBoneLevelArray(sex,weight,bone)
      let width=145
      let bl=50
      if(level==1){
        left=((width*(level-1))+width*bone/levelBoneArray[0])/bl;
      }else {

        left=((width*(level-1))+width*(bone-levelBoneArray[0])/(levelBoneArray[1]-levelBoneArray[0]))/bl;
        left=left>(width*2/bl)?(width*2/bl):left;
      }
    }
    return left;
  }
  _getPbfBgColor(){
    const {age,sex,pbf} = this.props
    let level=0
    if(age && sex && pbf){
      level=getPbfLevel(sex,age,pbf)
    }
    return this.getBmiColor(level)
  }
  _getMuscleBgColor(){
    const {height,sex,muscle} = this.props
    let level=0;
    if(height && sex && muscle){
      level=getMuscleLevel(sex,height,muscle)
    }
    return this.getBmiColor(level)
  }
  _getBoneBgColor(){
    const {weight,sex,bone} = this.props
    let level=0;
    if(weight && sex && bone){
      level=getBoneLevel(sex,weight,bone)
    }
    return this.getBmiColor(level)
  }
  _getPhysiqueColor(){
    const {bmi} = this.props
    let level=0;
    if(bmi){
      level=getBmiLevel(bmi)
    }
    return this.getBmiColor(level)
  }
  _getWaterBgColor(){
    const {sex,water} = this.props
    let level=0;
    if(sex && water){
      level=getWaterLevel(sex,water)
    }
    return this.getBmiColor(level)
  }
  getBmiColor(level){
    let color='#4fb4ff'
    if(level==1){
      color='#4fb4ff'
    }else if(level==2){
      color='#13ce66'
    }else if(level==3){
      color='#f7ba2a'
    }else if(level==4){
      color='#ff9494'
    }
    return color;
  }

  render() {
    const {bmi,bone,pbf,muscle,water,weight,sex,age,height} = this.props
    require('../../../styles/device/weightDataShow.less')
    return (

      <div className="m_public_data_show">
        <h3 className="m-data-title">体重数据{weight} kg</h3>
        <ul>
          <li className="m-data-item" style={{display: bmi ? 'flex' : 'none'}}>
            <div className="name">BMI</div>
            <div className="num">{bmi} </div>

            <div className="m-data-right">
              <RowFlex className="m-data-chart-wrap">
                <Col className="m-bg-blue"/>
                <Col className="m-bg-green"/>
                <Col className="m-bg-yellow"/>
                <Col className="m-bg-red"/>

              </RowFlex>
              <div className="m-ico" style={{display: bmi ? 'flex' : 'none',left: this._getPhysiqueLeft()+'rem',background: this._getPhysiqueColor()}}></div>
              <RowFlex className="m-data-text-wrap">

                <Col>偏瘦</Col>
                <Col>理想</Col>
                <Col>偏胖</Col>
                <Col>肥胖</Col>
              </RowFlex>
            </div>

          </li>
          <li className="m-data-item" style={{display: pbf ? 'flex' : 'none'}}>
            <div className="name">体脂率</div>
            <div className="num" style={{display: pbf >= getPbfLevelArray(sex,age,pbf)[3] ? 'none' : 'flex'}}>{pbf} <span className="unit">%</span></div>
            <div className="text" style={{display: pbf >= getPbfLevelArray(sex,age,pbf)[3] ? 'flex' : 'none'}}>无法评估</div>
            <div className="m-data-right">
              <RowFlex className="m-data-chart-wrap">
                <Col className="m-bg-blue"/>
                <Col className="m-bg-green"/>
                <Col className="m-bg-yellow"/>
                <Col className="m-bg-red"/>

              </RowFlex>
              <div className="m-ico" style={{display: pbf ? 'flex' : 'none',left: this._getPbfLeft()+'rem',background: this._getPbfBgColor()}}></div>
              <RowFlex className="m-data-text-wrap">

                <Col>偏瘦</Col>
                <Col>理想</Col>
                <Col>偏胖</Col>
                <Col>肥胖</Col>
              </RowFlex>
            </div>

          </li>
          <li className="m-data-item" style={{display: muscle ? 'flex' : 'none'}}>
            <div className="name">肌肉量</div>
            <div className="num" style={{display: muscle >= getMuscleLevelArray(sex,height,muscle)[3] || muscle <= getMuscleLevelArray(sex,height,muscle)[0] ? 'none' : 'flex'}}>{muscle} <span className="unit">kg</span></div>
            <div className="text" style={{display: muscle >= getMuscleLevelArray(sex,height,muscle)[3] || muscle <= getMuscleLevelArray(sex,height,muscle)[0] ? 'flex' : 'none'}}>无法评估</div>
            <div className="m-data-right">
              <RowFlex className="m-data-chart-wrap">
                <Col className="m-bg-blue"/>
                <Col className="m-bg-green"/>
                <Col className="m-bg-yellow"/>

              </RowFlex>
              <div className="m-ico" style={{display: muscle ? 'flex' : 'none',left: this._getMuscleLeft()+'rem',background: this._getMuscleBgColor()}}></div>
              <RowFlex className="m-data-text-wrap">
                <Col>偏低</Col>
                <Col>理想</Col>
                <Col>偏高</Col>
              </RowFlex>
            </div>

          </li>
          <li className="m-data-item" style={{display: bone ? 'flex' : 'none'}}>
            <div className="name">骨量</div>
            <div className="num" style={{display: bone >= getBoneLevelArray(sex,age,bone)[1] ? 'none' : 'flex'}}>{bone} <span className="unit">kg</span></div>
            <div className="text" style={{display: bone >= getBoneLevelArray(sex,age,bone)[1] ? 'flex' : 'none'}}>无法评估</div>
            <div className="m-data-right">
              <RowFlex className="m-data-chart-wrap">
                <Col className="m-bg-blue"/>
                <Col className="m-bg-green"/>
              </RowFlex>
              <div className="m-ico" style={{display: bone ? 'flex' : 'none',left: this._getBoneLeft()+'rem',background: this._getBoneBgColor()}}></div>
              <RowFlex className="m-data-text-wrap">
                <Col>偏低</Col>
                <Col>理想</Col>
              </RowFlex>
            </div>

          </li>
          <li className="m-data-item" style={{display: water ? 'flex' : 'none'}}>
            <div className="name">水分率</div>
            <div className="num">{water} <span className="unit">％</span></div>
            <div className="m-data-right">
              <RowFlex className="m-data-chart-wrap">
                <Col className="m-bg-blue"/>
                <Col className="m-bg-green"/>
                <Col className="m-bg-yellow"/>
              </RowFlex>
              <div className="m-ico" style={{display: water ? 'flex' : 'none',left: this._getWaterLeft()+'rem',background: this._getWaterBgColor()}}></div>
              <RowFlex className="m-data-text-wrap">
                <Col>偏低</Col>
                <Col>理想</Col>
                <Col>偏高</Col>
              </RowFlex>
            </div>

          </li>
        </ul>
      </div>
    )
  }
}
