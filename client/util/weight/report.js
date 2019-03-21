
import {checkFloat} from '../../util/common'

export function getLevelText(pbfLevel,muscleLevel,sex){
  let text='--'
  if(pbfLevel>=2 && muscleLevel==0){
    text='为保健康，要管住嘴迈开腿'
  }else if(pbfLevel>=2 && muscleLevel==1){
    text='别灰心，每一个胖子都是潜力股'
  }else if(pbfLevel>=2 && muscleLevel==2){
    text='其实我也有腹肌，只不过被脂肪盖住了orz'
  }else if(pbfLevel==1 && muscleLevel==0){
    text='肌肉量有点少，要经常参加运动哦'
  }else if(pbfLevel==1 && muscleLevel==1){
    text='标准肌肉，标准脂肪，成就标准身材'
  }else if(pbfLevel==1 && muscleLevel==2){
    text='强健的身体是一切的基石'
  }else if(pbfLevel==0 && muscleLevel==0){
    text='太瘦啦你，平时要多动吃动吃'
  }else if(pbfLevel==0 && muscleLevel==1){
    text='穿衣显瘦，脱衣有肉就是说你了'
  }else if(pbfLevel==0 && muscleLevel==2){
    if(sex == 1){
      text='经鉴定标准的肌肉型男一枚'
    }else{
      text='经鉴定标准的肌肉型女一枚'
    }

  }
  return text;
}

export function getLevelImg(pbfLevel,muscleLevel){
  let imgName=''
  if(pbfLevel>=2 && muscleLevel==0){

    imgName='img_recessive_obesity_active'
  }else if(pbfLevel>=2 && muscleLevel==1){
    imgName='img_overweight_active'
  }else if(pbfLevel>=2 && muscleLevel==2){
    imgName='img_strongandfat_active'
  }else if(pbfLevel==1 && muscleLevel==0){
    imgName='img_lack_of_exercises_active'
  }else if(pbfLevel==1 && muscleLevel==1){
    imgName='img_standard_active'
  }else if(pbfLevel==1 && muscleLevel==2){
    imgName='img_robust_active'
  }else if(pbfLevel==0 && muscleLevel==0){
    imgName='img_lean_active'
  }else if(pbfLevel==0 && muscleLevel==1){
    imgName='img_model_active'
  }else{
    imgName='img_athletic_active'


  }
  return imgName;
}
export function getPhysiqueText(imgName){
  let physiqueText=''
  if(imgName === 'img_recessive_obesity_active'){

    physiqueText='隐性肥胖型'
  }else if(imgName === 'img_overweight_active'){
    physiqueText='偏胖型'
  }else if(imgName === 'img_strongandfat_active'){
    physiqueText='结实偏胖型'
  }else if(imgName === 'img_lack_of_exercises_active'){
    physiqueText='缺乏运动型'
  }else if(imgName === 'img_standard_active'){
    physiqueText='标准型'
  }else if(imgName === 'img_robust_active'){
    physiqueText='健壮型'
  }else if(imgName === 'img_lean_active'){
    physiqueText='精瘦型'
  }else if(imgName === 'img_model_active'){
    physiqueText='模特型'
  }else if(imgName === 'img_athletic_active'){
    physiqueText='健美型'


  }
  return physiqueText;
}
export function getSuggestText(bmi,muscle,sex,weight,pbf){
  let text='--'
  if((bmi<12 && muscle>22 && sex ==1)||(bmi<22 && muscle>20 && sex ==0)){
    text='你的身材已处于巅峰状态，就这样坚持下去就对了'
  }else{
    let musclePlus = 0
    let pbfPlus = 0
    if(sex == 1){
      musclePlus = 22*0.88 * weight/bmi - weight*(1-pbf*0.01)
      pbfPlus = 22*0.12*weight/bmi - weight*pbf*0.01
    }else{
      musclePlus = 20*0.78 * weight/bmi - weight*(1-pbf*0.01)
      pbfPlus = 20*0.22*weight/bmi - weight*pbf*0.01
    }
    let musclePlusText = ''
    let pbfPlusText = ''
    if(musclePlus < 0){
      musclePlusText = '减少'
    }else{
      musclePlusText = '增加'
    }
    if(pbfPlus < 0){
      pbfPlusText = '减少'
    }else{
      pbfPlusText = '增加'
    }
    let musclePlusAbs = (Math.abs(musclePlus)).toFixed(1)
    let pbfPlusAbs = (Math.abs(pbfPlus)).toFixed(1)
    text=`为了达到更好的体型，你还需要${musclePlusText}肌肉${musclePlusAbs}kg,${pbfPlusText}脂肪${pbfPlusAbs}kg。`
  }
  return text;
}
