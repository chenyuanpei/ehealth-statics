import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {bmiText,weightText,pbfText,muscleText,basalMetabolismText,visceralFatText,waterText,boneText,proteinText,ageOffsetText} from '../../const/report'
export default class WeightReportItem extends Component {
  static propTypes = {
    weight:PropTypes.number,
  }
  constructor(props) {
    super(props);


  }

  _getPhysiqueColor(){
    const {type,dataLevel} = this.props
    let level=dataLevel;
    let color='#00c5ff';
    if(level==0){
      color='#00c5ff'
    }else if(level==1){
      color='#6de016'
    }else if(level==2){
      color='#fbc914'
    }else if(level==3){
      color='#ff871b'
    }
    if(type === 'ageOffset'){
      if(level==0){
        color='#6de016'
      }else if(level==1){
        color='#fbc914'
      }
    }
    if(type === 'water' || type==='muscle' || type==='protein'){
      if(level==0){
        color='#00c5ff'
      }else if(level==1){
        color='#20a0ff'
      }else if(level==2){
        color='#6de016'
      }
    }
    if(type === 'visceralFat'){
      if(level==0){
        color='#6de016'
      }else if(level==1){
        color='#fbc914'
      }else if(level==2){
        color='#ff871b'
      }
    }
    return color;
  }
  _getPhysiqueLeft(){
    const {type,value,dataLevel} = this.props
    let left=0;
    switch(type)
    {
    case 'bmi':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;
        if(level==0){
          left=((width*(level))+width/18.5*value)/bl;
          left=left < 0 ? 0 : left
        }else if(level==1){
          left=((width*(level))+width/(24-18.5)*(value-18.5))/bl;
        }else if(level==2){
          left=((width*(level))+width/(28-24)*(value-24))/bl;
        }else{
          left=((width*(level))+width/(46.5-28)*(value-28))/bl;
          left=left < 0 ? 0 : left
          left=left>(width*4/bl)?(width*4/bl):left;
        }
      }
      break;
    case 'pbf':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;
        if(level==0){
          left=((width*(level))+width/this.physiqueText[0]*value)/bl;
          left=left < 0 ? 0 : left
        }else if(level==1){
          left=((width*(level))+width/(this.physiqueText[1]-this.physiqueText[0])*(value-this.physiqueText[0]))/bl;
        }else if(level==2){
          left=((width*(level))+width/(this.physiqueText[2]-this.physiqueText[1])*(value-this.physiqueText[1]))/bl;
        }else{
          left=((width*(level))+width*(value-this.physiqueText[2])/20)/bl;

          left=left>(width*4/bl)?(width*4/bl):left;
        }
      }
      break;
    case 'weight':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;
        if(level==0){
          left=((width*(level))+width/this.physiqueText[0]*value)/bl;
          left=left < 0 ? 0 : left
        }else if(level==1){
          left=((width*(level))+width/(this.physiqueText[1]-this.physiqueText[0])*(value-this.physiqueText[0]))/bl;
        }else{
          left=((width*(level))+width*(value-this.physiqueText[1])/20)/bl;
          left=left>(width*3/bl)?(width*3/bl):left;
        }
      }
      break;
    case 'muscle':
      let width,
          num1 = this.physiqueText[0],
          num2 = this.physiqueText[1]
      if(value){
        width = 480/(750/640*50)
        if(value <= num1) {
          left = value/num1 * 2.8
        } else if(value > num1 && value <= num2) {
          left = value/num2 * 2.8 + 2.8
        } else if(value > num2 && value <= 100){
          left = 5.6 + value/100*2.8
        } else {
          left = 8.4
        }
      }
      break;
    case 'basalMetabolism':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;
        if(level==0){
          left=((width*(level))+width/this.physiqueText[0]*value)/bl;
          left=left < 0 ? 0 : left
        }else{
          left=((width*(level))+width*(value-this.physiqueText[0])/1000)/bl;
          left = left < 0 ? 0 : left;
          left=left>(width*2/bl)?(width*2/bl):left;
        }
      }
      break;
    case 'ageOffset':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;
        left=(width+width*(value-this.props.age)/3)/bl;
        if(level==0){
          left = left < 0 ? 0 : left
        }else{
          left=left>(width*2/bl)?(width*2/bl):left;
        }
      }
      break;
    /* case 'ageOffset':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;
        if(level==0){
          left=((width*(level))+width*3/(value+3))/bl;
          left = left < 0 ? 0 : left
        }else{
          left=((width*(level))+width*value/5)/bl;
          left=left>(width*2/bl)?(width*2/bl):left;
        }
      }
      break; */
    case 'water':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;
        if(level==0){
          left=((width*(level))+width*this.physiqueText[0]/value)/bl;
          left=left < 0 ? 0 : left
        }else if(level==1){
          left=((width*(level))+width/(parseInt(this.physiqueText[1])-parseInt(this.physiqueText[0]))*(value-parseInt(this.physiqueText[0])))/bl;
        }else{
          width = 480/(750/640*50)
          if(value <= 55) {
            left = value/55 * 2.8
          } else if(value > 55 && value <= 64.9) {
            left = value/64.9 * 2.8 + 2.8
          } else {
            left = 5.6 + value/100*2.8
          }
        }

        // console.log("water",width, value, this.physiqueText[1], left)
      }
      break;
    case 'visceralFat':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;
        if(level==0){
          left=((width*(level))+width*value/this.physiqueText[0])/bl;
        }else if(level==1){
          left=((width*(level))+width/(this.physiqueText[1]-this.physiqueText[0])*(value-this.physiqueText[0]))/bl;
        }else{
          left=((width*(level))+width*(value-this.physiqueText[1])/10)/bl;
          left = left < 0 ? 0 : left;
          left=left>(width*3/bl)?(width*3/bl):left;
        }
      }
      break;
    case 'protein':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;
        if(level==0){
          left=((width*(level))+width*parseInt(this.physiqueText[0])/value)/bl;
        }else if(level==1){
          left=((width*(level))+width/(parseInt(this.physiqueText[1])-parseInt(this.physiqueText[0]))*(value-parseInt(this.physiqueText[0])))/bl;
        }else{
          left=((width*(level))+width*(value-parseInt(this.physiqueText[1]))/10)/bl;
          left = left < 0 ? 0 : left;
          left=left>(width*3/bl)?(width*3/bl):left;
        }
      }
    case 'bone':
      if(value){
        let level=dataLevel;
        let width=140;
        let bl=50;


        if(level==0){


          left=((width*(level))+width*parseInt(this.physiqueText[0]))/value/bl;
          left = left < 0 ? 0 : left/10;
        }else{
          left=((width*(level))+width*(value-parseInt(this.physiqueText[0]))/2.5)/bl;

          left=left>(width*2/bl)?(width*2/bl):left;
        }
      }
      break;
    default:
      left=0;
    }

    return left;
  }
  _getStyle(type,val) {
    let styleClass = 'green-label'

    const {sex,age} = this.props

    const {dataLevel} = this.props
    let level =dataLevel
    switch(type)
    {
      case 'bmi':
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
        if(level === 2){
          styleClass = 'green-label'
        }else if(level === 1){
          styleClass = 'blue-label'
        }else if(level === 0){
          styleClass = 'baby-blue-label'
        }
        break;
      case 'basalMetabolism':
        if(level === 1){
          styleClass = 'green-label'

        }else if(level === 0){
          styleClass = 'baby-blue-label'
        }
        break;
      case 'ageOffset':
        const {ageOffsetLevel} = this.props
        if(ageOffsetLevel >= 1){
          styleClass = 'orange-label'

        }else{
          styleClass = 'green-label'
        }
        break;
      case 'visceralFat':
        if(level ===2){
          styleClass = 'red-label'

        }else if(level ===1){
          styleClass = 'orange-label'
        }else if(level ===0){
          styleClass = 'green-label'
        }
        break;
      case 'water':

        if(level ===2){
          styleClass = 'green-label'

        }else if(level ===1){
          styleClass = 'blue-label'
        }else if(level ===0){
          styleClass = 'baby-blue-label'
        }
        break;
      case 'bone':

        if(level ===1){
          styleClass = 'green-label'

        }else if(level ===0){
          styleClass = 'baby-blue-label'
        }
        break;
      case 'protein':

        if(level ===2){
          styleClass = 'green-label'

        }else if(level ===1){
          styleClass = 'blue-label'
        }else if(level ===0){
          styleClass = 'baby-blue-label'
        }
        break;
      case 'weight':

        if(level ===2){
          styleClass = 'orange-label'

        }else if(level ===1){
          styleClass = 'green-label'
        }else if(level ===0){
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

    const {dataLevel} = this.props
    let level = dataLevel
    const {sex,age} = this.props
    switch(type)
    {
      case 'bmi':
        if(level === 3){
          thisText = '肥胖'

        }else if(level === 2){
          thisText = '偏胖'
        }else if(level === 1){
          thisText = '理想'
        }else if(level === 0){
          thisText = '偏瘦'
        }
        break;
      case 'pbf':
        if(level === 3){
          thisText = '超高'

        }else if(level === 2){
          thisText = '偏高'
        }else if(level === 1){
          thisText = '理想'
        }else if(level === 0){
          thisText = '偏低'
        }
        break;
      case 'muscle':
        if(level === 2){
          thisText = '理想'

        }else if(level === 1){
          thisText = '标准'
        }else if(level === 0){
          thisText = '偏低'
        }
        break;
      case 'basalMetabolism':
        if(level === 1){
          thisText = '理想'

        }else if(level === 0){
          thisText = '偏低'
        }
        break;
      case 'ageOffset':
        const {ageOffsetLevel} = this.props
        if(ageOffsetLevel >= 1){
          thisText = '偏大'

        }else{
          thisText = '年轻'
        }
        break;
      case 'visceralFat':
        if(level ===2){
          thisText = '超高'

        }else if(level ===1){
          thisText = '偏高'
        }else if(level ===0){
          thisText = '理想'
        }
        break;
      case 'water':
        if(level ===2){
          thisText = '理想'

        }else if(level ===1){
          thisText = '标准'
        }else if(level ===0){
          thisText = '偏低'
        }
        break;
      case 'bone':
        if(level ===1){
          thisText = '理想'
        }else if(level ===0){
          thisText = '偏低'
        }else{
          thisText = '理想'
        }
        break;
      case 'protein':
        if(level ===2){
          thisText = '理想'

        }else if(level ===1){
          thisText = '标准'
        }else if(level ===0){
          thisText = '偏低'
        }
        break;
      case 'weight':
        if(level ===2){
          thisText = '偏高'

        }else if(level ===1){
          thisText = '理想'
        }else if(level ===0){
          thisText = '偏低'
        }
        break;
      default:
        thisText = '理想'
    }
    return thisText
  }
  state = {
    [this.props.type]: false,
  }

  componentDidMount(){
    this.state[this.props.type] = !this.props.type
  }
  _setState(type,flag) {
    this.setState({
      [type]:flag
    })
  }
  render() {
    let {type,name,value,age,dataLevel,weight,bmi,sex,level} = this.props
    if(type === 'pbf'){
      if(sex == 2){
        if(age > 39){
          this.physiqueText = [23,35,40]
        }else{
          this.physiqueText = [22,34,39]
        }
      }else{
        if(age > 39){
          this.physiqueText = [13,24,29]
        }else{
          this.physiqueText = [13,23,28]
        }
      }

      this.physiqueLineStyle = ['physique-index-line1','physique-index-line2','physique-index-line3','physique-index-line4']
      this.physiqueBottomText = ['偏低','理想','偏高','超高']
    }else if(type === 'bmi'){
      this.physiqueText = [18.5,24,28]
      this.physiqueLineStyle = ['physique-index-line1','physique-index-line2','physique-index-line3','physique-index-line4']
      this.physiqueBottomText = ['偏瘦','理想','偏胖','肥胖']
    }else if(type === 'weight'){
      let num1 = 18.5*weight/bmi
      let num2 = 24*weight/bmi
      this.physiqueText = [num1.toFixed(1),num2.toFixed(1)]
      this.physiqueLineStyle = ['physique-index-line1','physique-index-line2','physique-index-line3']
      this.physiqueBottomText = ['偏低','理想','偏高']
    }else if (type === 'muscle'){
      let height2 = weight/bmi
      let height = (Math.sqrt(height2)*100).toFixed(1)

      if(sex == 1){
        if(height < 160){
          this.physiqueText = [38.5,46.6]
        }else if(height > 170){
          this.physiqueText = [49.4,59.5]
        }else{
          this.physiqueText = [44,52.5]
        }
      }else{
        if(height < 150){
          this.physiqueText = [29.1,34.8]
        }else if(height > 160){
          this.physiqueText = [36.5,42.6]
        }else{
          this.physiqueText = [32.9,37.6]
        }
      }

      this.physiqueLineStyle = ['physique-index-line1','physique-index-lineB','physique-index-line2']
      this.physiqueBottomText = ['偏低','标准','理想']
    }else if(type === 'basalMetabolism'){
      if(sex == 1){
        if(age < 30){
          this.physiqueText = [1550]
        }else if(age >= 30 && age <50){
          this.physiqueText = [1500]
        }else if(age >=50 && age < 70){
          this.physiqueText = [1350]
        }else{
          this.physiqueText = [1220]
        }
      }else{
        if(age < 30){
          this.physiqueText = [1210]
        }else if(age >= 30 && age <50){
          this.physiqueText = [1170]
        }else if(age >=50 && age < 70){
          this.physiqueText = [1110]
        }else{
          this.physiqueText = [1010]
        }
      }

      this.physiqueLineStyle = ['physique-index-line1','physique-index-line2']
      this.physiqueBottomText = ['偏低','理想']
    }else if(type === 'ageOffset'){
      this.physiqueText = []

      this.physiqueLineStyle = ['physique-index-line2','physique-index-line3']
      this.physiqueBottomText = ['年轻','偏大']
    }else if(type === 'visceralFat'){
      this.physiqueText = [10,15]
      this.physiqueLineStyle = ['physique-index-line2','physique-index-line3','physique-index-line4']
      this.physiqueBottomText = ['理想','偏高','超高']
    }else if(type === 'water'){
      if(sex == 1){
        this.physiqueText = ['55%','64.9%']
      }else{
        this.physiqueText = ['45%','59.9%']
      }
      this.physiqueLineStyle = ['physique-index-line1','physique-index-lineB','physique-index-line2']
      this.physiqueBottomText = ['偏低','标准','理想']
    }else if(type === 'protein'){
      this.physiqueText = ['16%','20%']
      this.physiqueLineStyle = ['physique-index-line1','physique-index-lineB','physique-index-line2']
      this.physiqueBottomText = ['偏低','标准','理想']
    }else if(type === 'bone'){
      if(sex === 1){
        if(weight < 60){
          this.physiqueText = ['2.5kg']
        }else if(weight >= 60 && weight<75){
          this.physiqueText = ['2.9kg']
        }else{
          this.physiqueText = ['3.2kg']
        }

      }else{
        if(weight < 45){
          this.physiqueText = ['1.8kg']
        }else if(weight >= 45 && weight<60){
          this.physiqueText = ['2.2kg']
        }else{
          this.physiqueText = ['2.5kg']
        }
      }

      this.physiqueLineStyle = ['physique-index-line1','physique-index-line2']
      this.physiqueBottomText = ['偏低','理想']
    }
    let textKey = ''
    if(typeof(dataLevel)!='undefined'){

      switch(type)
      {
        case 'bmi':
          textKey = bmiText[0]
          value = value.toFixed(1)
          break;
        case 'weight':
            textKey = weightText[dataLevel]
          value = value.toFixed(1)
          break;
        case 'pbf':
          textKey = pbfText[dataLevel]
          value = value.toFixed(1)
          break;
        case 'muscle':
          textKey = muscleText[dataLevel]
          value = value.toFixed(1)
          break;
        case 'basalMetabolism':
          textKey = basalMetabolismText[dataLevel]
          value = value.toFixed(0)
          break;
        case 'visceralFat':
          textKey = visceralFatText[dataLevel]
          value = value.toFixed(0)
          break;
        case 'water':
          textKey = waterText[dataLevel]
          value = value.toFixed(1)
          break;
        case 'bone':
          textKey = boneText[dataLevel]
          value = value.toFixed(1)
          break;
        case 'protein':
          textKey = proteinText[dataLevel]
          value = value.toFixed(1)
          break;
        case 'ageOffset':
          textKey = ageOffsetText[dataLevel]
          break;
        default:
          textKey = bmiText[0]
      }
    }
    let unitText = ''
    if(type === 'pbf'  || type === 'water' || type === 'protein'){
      unitText = '%'
    }else if(type === 'basalMetabolism'){
      unitText = '千卡'
    }else if(type === 'weight' || type === 'bone'|| type === 'muscle'){
      unitText = 'kg'
    }else if(type === 'ageOffset'){
      unitText = '岁'
    }

    let _this = this
    return (
      <li key={name} onClick={()=>this._setState(type,!this.state[type])} className={this.state[type] ? 'm-content-show' : ''}>
        <div className="m-data-item">
          <div className="name">{name}</div>
          <div className="weight-data">{value}{unitText}</div>
          <div className="label-wrap">
            <div className={type ? this._getStyle(type,value) : ''}>{type ? this._getText(type,value):'--'}</div>
          </div>
          <div className="arrow-wrap">
            <div className="m-arrow"></div>
          </div>
        </div>
        <div className="m-content-wrap">
          <div className="physique-wrap">
            <div className="m-physique-data">
              {
                this.physiqueText.map(function (text, i) {
                  return <div className="m-physique-data-item" key={i}>{text}</div>
                })
              }

            </div>
            <div className="physique-index-line">
              {
                this.physiqueLineStyle.map(function (style,i) {
                  if(dataLevel == i){
                    return <div key={i} className={classnames(`${style} physique-index-line-active`, {mLeftRadius:i === 0 },{mRightRadius:i === _this.physiqueLineStyle.length-1 })}></div>
                  }else{
                    return <div key={i} className={classnames(`${style}`, {mLeftRadius:i === 0 },{mRightRadius:i === _this.physiqueLineStyle.length-1 })}></div>
                  }

                })
              }
              <div className="progress-bar" style={{left: this._getPhysiqueLeft()+'rem',background: this._getPhysiqueColor()}}></div>
            </div>


            <div className="physique-text-box">
              {this.physiqueBottomText.map(function (text, i) {
                return <div className="physique-text" key={i}>{text}</div>
              })}

            </div>
            <div className="physique-content">
              {textKey}
            </div>
          </div>
        </div>
      </li>


    )
  }
}
