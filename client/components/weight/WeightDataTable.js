import React, {Component, PropTypes} from 'react'
import PubSub from 'pubsub-js'
import {RowFlex,Col} from '../../components/frozenui/grid'
export const TOPIC_WEIGHT_DATA_TABLE_REPORT_LINK = 'TOPIC_WEIGHT_DATA_TABLE_REPORT_LINK'
export const TOPIC_WEIGHT_DATA_TABLE_BMI_LINK = 'TOPIC_WEIGHT_DATA_TABLE_BMI_LINK'


import {getBmiLevel,getPbfLevel,getPbfLevelArray,getMuscleLevel,getMuscleLevelArray,getBoneLevel,getBoneLevelArray,getWaterLevelArray,getWaterLevel} from '../../util/weight/weight'
export default class WeightDataTable extends Component {
  static propTypes = {
    recordsLoading:PropTypes.bool,
    noMoreBatch:PropTypes.bool,
    showMore:PropTypes.bool,
  }

  handleReportLink() {
    const {pbf,id,memberId} = this.props
    if(pbf){
      PubSub.publish(TOPIC_WEIGHT_DATA_TABLE_REPORT_LINK, {id,memberId})
    }

  }
  handleBmiLink() {
    const {bmi,id,memberId} = this.props
    if(bmi){
      PubSub.publish(TOPIC_WEIGHT_DATA_TABLE_REPORT_LINK, {id,memberId})
    }
  }

  componentDidMount(){

  }

  _getStyle(type,val) {
    let styleClass = 'green-label'
    let level = 0
    const {sex,age} = this.props
    switch(type)
    {
    case 'bmi':
      const {bmiLevel} = this.props
      level = bmiLevel
      if(level === 3){
        styleClass = 'red-label'

      }else if(level === 2){
        styleClass = 'orange-label'
      }else if(level === 1){
        styleClass = 'green-label'
      }else {
        styleClass = 'baby-blue-label'
      }
      break;
    case 'pbf':
      const {pbfLevel} = this.props
      level = pbfLevel
      if(level === 3){
        styleClass = 'red-label'

      }else if(level === 2){
        styleClass = 'orange-label'
      }else if(level === 1){
        styleClass = 'green-label'
      }else if(level === 0){
        styleClass = 'baby-blue-label'
      }
      break;
    case 'muscle':
      const {muscleLevel} = this.props
      level = muscleLevel
      if(level === 2){
        styleClass = 'green-label'
      }else if(level === 1){
        styleClass = 'blue-label'
      }else if(level === 0){
        styleClass = 'baby-blue-label'
      }
    break;
    case 'basalMetabolism':

      const {basalMetabolismLevel} = this.props
      level = basalMetabolismLevel
      if(level === 1){
        styleClass = 'green-label'

      }else if(level === 0){
        styleClass = 'baby-blue-label'
      }
    break;
    case 'ageOffset':
      if(val >= 1){
        styleClass = 'orange-label'

      }else{
        styleClass = 'green-label'
      }
    break;
    case 'visceralFat':

      const {visceralFatLevel} = this.props
      if(visceralFatLevel ===2){
        styleClass = 'red-label'

      }else if(visceralFatLevel ===1){
        styleClass = 'orange-label'
      }else if(visceralFatLevel ===0){
        styleClass = 'green-label'
      }
    break;
    case 'water':

      const {waterLevel} = this.props
      if(waterLevel ===2){
        styleClass = 'green-label'

      }else if(waterLevel ===1){
        styleClass = 'blue-label'
      }else if(waterLevel ===0){
        styleClass = 'baby-blue-label'
      }
    break;
    case 'bone':

      const {boneLevel} = this.props
      if(boneLevel ===1){
        styleClass = 'green-label'

      }else if(boneLevel ===0){
        styleClass = 'baby-blue-label'
      }
    break;
    case 'protein':

      const {proteinLevel} = this.props
      if(proteinLevel ===2){
        styleClass = 'green-label'

      }else if(proteinLevel ===1){
        styleClass = 'blue-label'
      }else if(proteinLevel ===0){
        styleClass = 'baby-blue-label'
      }
    break;

    default:
      styleClass = 'green-label'
    }
    return 'weight-label ' + styleClass
  }
  _getText(type,val) {
    let thisText = '理想'
    let level = 0
    const {sex,age} = this.props
    switch(type)
    {
      case 'bmi':
        if(val > 28){
          thisText = '肥胖'

        }else if(val > 24 && val <= 28){
          thisText = '偏胖'
        }else if(val > 18.5 && val <= 24){
          thisText = '理想'
        }else if(val <= 18.5){
          thisText = '偏瘦'
        }
        break;
      case 'pbf':
        level = getPbfLevel(sex,age,val)
        if(level === 4){
          thisText = '超高'

        }else if(level === 3){
          thisText = '偏高'
        }else if(level === 2){
          thisText = '理想'
        }else if(level === 1){
          thisText = '偏低'
        }
        break;
      case 'muscle':
        const {muscleLevel} = this.props
        level = muscleLevel
        if(level === 2){
          thisText = '理想'

        }else if(level === 1){
          thisText = '标准'
        }else if(level === 0){
          thisText = '偏低'
        }
      break;
      case 'basalMetabolism':
        const {basalMetabolismLevel} = this.props
        level = basalMetabolismLevel
        if(level === 1){
          thisText = '理想'

        }else if(level === 0){
          thisText = '偏低'
        }
      break;
      case 'ageOffset':
        if(val >= 1){
          thisText = '偏大'

        }else{
          thisText = '年轻'
        }
      break;
      case 'visceralFat':
        const {visceralFatLevel} = this.props
        if(visceralFatLevel ===2){
          thisText = '超高'

        }else if(visceralFatLevel ===1){
          thisText = '偏高'
        }else if(visceralFatLevel ===0){
          thisText = '理想'
        }
      break;
      case 'water':
        const {waterLevel} = this.props
        if(waterLevel ===2){
          thisText = '理想'

        }else if(waterLevel ===1){
          thisText = '标准'
        }else if(waterLevel ===0){
          thisText = '偏低'
        }
      break;
      case 'bone':
        const {boneLevel} = this.props
        if(boneLevel ===1){
          thisText = '理想'
        }else if(boneLevel ===0){
          thisText = '偏低'
        }else{
          thisText = '理想'
        }
      break;
      case 'protein':
        const {proteinLevel} = this.props
        if(proteinLevel ===2){
          thisText = '理想'

        }else if(proteinLevel ===1){
          thisText = '标准'
        }else if(proteinLevel ===0){
          thisText = '偏低'
        }
      break;

      default:
        thisText = '理想'
    }
    return thisText
  }
  render() {
    const {weight,twoWeight,id,ageOffset,bodyStyle,bodyScore,protein,visceralFat,age,bmi,basalMetabolism,pbf,water,muscle,bone,productTypeCode} = this.props || {}
    require('../../styles/weight/weightDataTable.styl')
    return (
      <div className="m-weight-table-wrap" onClick={()=>{this.handleReportLink()}}>
        <RowFlex className="m-weight-data-table">
          <Col className="m-shape-box">
            <div className="middle-box">
              <h3 className="title">体型</h3>
              <p className="describe">{bodyStyle?bodyStyle : '--'}</p>
            </div>

          </Col>
          <Col className="m-shape-box">
            <div className="middle-box">
              <h3 className="title">身材得分</h3>
              <p className="describe">{bodyScore ? parseFloat(bodyScore).toFixed(0) : '--'}</p>

            </div>
          </Col>

        </RowFlex>
        <RowFlex className="m-weight-data-table">
          <Col className="child-box">
            <div onClick={()=>{this.handleBmiLink()}} className="middle-box">
              <h3 className="title">
                BMI
              </h3>
              <p className="describe">
                {bmi ? parseFloat(bmi).toFixed(1) :'--'}
              </p>
              <div className={bmi ? this._getStyle('bmi',bmi) : ''} style={{display:bmi?'block':'none'}}>
                {bmi ? this._getText('bmi',bmi):'--'}
              </div>
            </div>
          </Col>
          <Col className="child-box">
            <div className="middle-box">
              <h3 className="title">
                体脂率
              </h3>
              <p className="describe">
                {pbf ? parseFloat(pbf).toFixed(1)+'%':'--'}
              </p>
              <div className={pbf ? this._getStyle('pbf',pbf) : ''} style={{display:pbf?'block':'none'}}>
                {pbf ? this._getText('pbf',pbf):'--'}
              </div>
            </div>
          </Col>
          <Col className="child-box">
            <div className="middle-box">
              <h3 className="title">
                肌肉量
              </h3>
              <p className="describe">
                {muscle ? parseFloat(muscle).toFixed(1)+'kg':'--'}
              </p>
              <div className={muscle ? this._getStyle('muscle',muscle) : ''} style={{display:muscle?'block':'none'}}>
                {muscle ? this._getText('muscle',muscle):'--'}
              </div>
            </div>
          </Col>
        </RowFlex>
        <RowFlex className="m-weight-data-table">
          <Col className="child-box">
            <div className="middle-box">
              <h3 className="title">
                基础代谢
              </h3>
              <p className="describe">
                {basalMetabolism?parseFloat(basalMetabolism).toFixed(0) + '千卡':'--'}
              </p>
              <div className={basalMetabolism ? this._getStyle('basalMetabolism',basalMetabolism) : ''} style={{display:basalMetabolism?'block':'none'}}>
                {basalMetabolism ? this._getText('basalMetabolism',basalMetabolism):'--'}
              </div>
            </div>
          </Col>
          <Col className="child-box">
            <div className="middle-box">
              <h3 className="title">
                身体年龄
              </h3>
              <p className="describe">
                {ageOffset ? age+ageOffset+'岁':'--'}
              </p>
              <div className={ageOffset ? this._getStyle('ageOffset',ageOffset) : ''} style={{display:ageOffset?'block':'none'}}>
                {ageOffset ? this._getText('ageOffset',ageOffset):'--'}
              </div>
            </div>
          </Col>
          <Col className="child-box">
            <div className="middle-box">
              <h3 className="title">
                内脏脂肪等级
              </h3>
              <p className="describe">
                {visceralFat?parseFloat(visceralFat).toFixed(0):'--'}
              </p>
              <div className={visceralFat ? this._getStyle('visceralFat',visceralFat) : ''} style={{display:visceralFat?'block':'none'}}>
                {visceralFat ? this._getText('visceralFat',visceralFat):'--'}
              </div>
            </div>
          </Col>
        </RowFlex>
        <RowFlex className="m-weight-data-table">
          <Col className="child-box">
            <div className="middle-box">
              <h3 className="title">
                水分率
              </h3>
              <p className="describe">
                {water?parseFloat(water).toFixed(1)+'%':'--'}
              </p>
              <div className={water ? this._getStyle('water',water) : ''} style={{display:water?'block':'none'}}>
                {water ? this._getText('water',water):'--'}
              </div>
            </div>
          </Col>
          <Col className="child-box">
            <div className="middle-box">
              <h3 className="title">
                骨量
              </h3>
              <p className="describe">
                {bone ? parseFloat(bone).toFixed(1) +'kg' :'--'}
              </p>
              <div className={bone ? this._getStyle('bone',bone) : ''} style={{display:bone?'block':'none'}}>
                {bone ? this._getText('bone',bone):'--'}
              </div>
            </div>
          </Col>
          <Col className="child-box">
            <div className="middle-box">
              <h3 className="title">
                蛋白质
              </h3>
              <p className="describe">
                {protein ? parseFloat(protein).toFixed(1)+'%' : '--'}
              </p>
              <div className={protein ? this._getStyle('protein',protein) : ''} style={{display:protein?'block':'none'}}>
                {protein ? this._getText('protein',protein):'--'}
              </div>
            </div>
          </Col>
        </RowFlex>
        <div style={{display: !pbf ? 'block' : 'none'}} className="no-data-div">
          <div className="no-data-text">
            使用乐心体脂秤并赤脚上称,即可解锁所有身体数据哦！
          </div>
        </div>
      </div>


    )
  }
}
