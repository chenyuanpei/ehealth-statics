
import {checkFloat} from '../../util/common'

export function getBmiText(level){
  let text='--'
  if(level==1){
    text='偏瘦'
  }else if(level==2){
    text='理想'
  }else if(level==3){
    text='偏胖'
  }else if(level==4){
    text='肥胖'
  }
  return text;
}

export function getBmiColor(level){
  let color='#00c5ff';
  if(level==1){
    color='#00c5ff'
  }else if(level==2){
    color='#6de016'
  }else if(level==3){
    color='#fbc914'
  }else if(level==4){
    color='#ff871b'
  }
  return color;
}

/*
 * 返回bmi级别1:偏瘦 2：理想 3：偏重 4：超重
 */
export function getBmiLevel(bmi) {
  var level = 1;
  if (bmi < 18.5) {
    level = 1;
  } else if (bmi < 24) {
    level = 2;
  } else if (bmi < 28) {
    level = 3;
  } else {
    level = 4;
  }
  return level;
}
/*
 * 返回water级别1:偏低 2：理想 3：偏高
 */
export function getWaterLevel(sex,water) {
  var level = 1;
  if (sex === 1){
    if (water < 55) {
      level = 1;
    } else if (water < 64.9) {
      level = 2;
    } else {
      level = 3;
    }
  }else{
    if (water < 45) {
      level = 1;
    } else if (water < 59.9) {
      level = 2;
    } else {
      level = 3;
    }
  }

  return level;
}
/*
 * 返回pbf级别1:偏瘦 2：理想 3：偏胖 4：肥胖
 */
export function getPbfLevel(sex,age,pbf) {
  var level = 1;
  if(sex === 1){
    if (age <= 39) {
      if(pbf < 13){
        level = 1
      }else if (pbf < 23){
        level = 2
      }else if (pbf < 28){
        level = 3
      } else {
        level = 4
      }
    }else{
      if(pbf < 13){
        level = 1
      }else if (pbf < 24){
        level = 2
      }else if (pbf < 29){
        level = 3
      } else {
        level = 4
      }
    }
  }else{
    if (age <= 39) {
      if(pbf < 22){
        level = 1
      }else if (pbf < 34){
        level = 2
      }else if (pbf < 39){
        level = 3
      } else {
        level = 4
      }
    }else{
      if(pbf < 23){
        level = 1
      }else if (pbf < 35){
        level = 2
      }else if (pbf < 40){
        level = 3
      } else {
        level = 4
      }
    }
  }

  return level;
}
/*
 * 返回bone级别1:偏低 2：理想
 */
export function getBoneLevel(sex,weight,bone) {
  var level = 1;
  if(sex === 1){
    if (weight < 60) {
      if(bone < 2.5){
        level = 1
      }else{
        level = 2
      }
    }else if (weight <= 75) {
      if(bone < 2.9){
        level = 1
      } else {
        level = 2
      }
    }else{
      if(bone < 3.2){
        level = 1
      } else {
        level = 2
      }
    }
  }else{
    if (weight < 45) {
      if(bone < 1.8){
        level = 1
      }else{
        level = 2
      }
    }else if (weight <= 60) {
      if(bone < 2.2){
        level = 1
      } else {
        level = 2
      }
    }else{
      if(bone < 2.5){
        level = 1
      } else {
        level = 2
      }
    }
  }

  return level;
}
/*
 * 返回muscle级别1:偏低 2：理想 3：偏高
 */
export function getMuscleLevel(sex,height,muscle) {
  var level = 1;
  if(sex === 1){
    if (height < 160) {
      if(muscle < 38.5){
        level = 1
      }else if (muscle < 46.6){
        level = 2
      }else if (muscle < 66.6){
        level = 3
      }
    }else if (height <= 170){
      if(muscle < 44.0){
        level = 1
      }else if (muscle < 52.5){
        level = 2
      }else if (muscle < 72.5){
        level = 3
      }
    }else{
      if(muscle < 49.4){
        level = 1
      }else if (muscle < 59.5){
        level = 2
      }else if (muscle < 79.5){
        level = 3
      }
    }
  }else{
    if (height < 150) {
      if(muscle < 29.1){
        level = 1
      }else if (muscle < 34.8){
        level = 2
      }else if (muscle < 49.8){
        level = 3
      }
    }else if (height <= 160){
      if(muscle < 32.9){
        level = 1
      }else if (muscle < 37.6){
        level = 2
      }else if (muscle < 52.6){
        level = 3
      }
    }else {
      if(muscle < 36.5){
        level = 1
      }else if (muscle < 42.6){
        level = 2
      }else if (muscle < 57.5){
        level = 3
      }
    }
  }

  return level;
}

/*
 * 返回pbf界限数组
 */
export function getPbfLevelArray(sex,age,pbf) {
  var levelArray = [13,23,28,48]
  if(sex === 1){
    if (age <= 39) {
      levelArray = [13,23,28,48]

    }else{
      levelArray = [13,24,29,49]
    }
  }else{
    if (age <= 39) {
      levelArray = [22,34,39,59]
    }else{
      levelArray = [23,35,40,60]
    }
  }

  return levelArray;
}
/*
 * 返回water界限数组
 */
export function getWaterLevelArray(sex,water) {
  var levelArray = [55,64.9,100]
  if(sex === 0){
    levelArray = [45,59.9,100]
  }

  return levelArray;
}
/*
 * 返回bone界限数组
 */
export function getBoneLevelArray(sex,weight,bone) {
  var levelArray = [2.5,5]
  if(sex === 1){
    if (weight < 60) {
      levelArray = [2.5,5]

    }else if (weight <= 75) {
      levelArray = [2.9,5.4]
    }else{
      levelArray = [3.2,5.7]
    }
  }else if(sex === 0){
    if (weight < 45) {
      levelArray = [1.8,4.3]

    }else if (weight <= 60) {
      levelArray = [2.2,4.7]
    }else{
      levelArray = [2.5,5.0]
    }
  }
  return levelArray;
}
/*
 * 返回muscle界限数组
 */
export function getMuscleLevelArray(sex,height,muscle) {
  var levelArray = [18.5,38.5,46.6,66.6]
  if(sex === 1){
    if (height < 160) {
      levelArray = [18.5,38.5,46.6,66.6]
    }else if (height <= 170){
      levelArray = [23.9,44,52.5,72.5]
    }else{
      levelArray = [29.3,49.4,59.5,79.5]
    }
  }else{
    if (height < 150) {
      levelArray = [14,29.1,34.8,49.8]
    }else if (height <= 160){
      levelArray = [17.8,32.9,37.6,52.6]
    }else{
      levelArray = [21.4,36.5,42.6,57.5]
    }
  }

  return levelArray;
}


export function weightDataFormat(weightData){
  if(checkFloat(weightData.bmi)){
    weightData.bmi=parseFloat(weightData.bmi).toFixed(1)
    if(weightData.bmi.indexOf('.0')>0)
      weightData.bmi=weightData.bmi.substring(0,weightData.bmi.indexOf('.0'))
  }

  if(checkFloat(weightData.pbf)){
    weightData.pbf=parseFloat(weightData.pbf).toFixed(1)
    if(weightData.pbf.indexOf('.0')>0)
      weightData.pbf=weightData.pbf.substring(0,weightData.pbf.indexOf('.0'))
  }

  if(checkFloat(weightData.bone)){
    weightData.bone=parseFloat(weightData.bone).toFixed(1)
    if(weightData.bone.indexOf('.0')>0)
      weightData.bone=weightData.bone.substring(0,weightData.bone.indexOf('.0'))
  }

  if(checkFloat(weightData.water)){
    weightData.water=parseFloat(weightData.water).toFixed(1)
    if(weightData.water.indexOf('.0')>0)
      weightData.water=weightData.water.substring(0,weightData.water.indexOf('.0'))
  }

  if(checkFloat(weightData.muscle)){
    weightData.muscle=parseFloat(weightData.muscle).toFixed(1)
    if(weightData.muscle.indexOf('.0')>0)
      weightData.muscle=weightData.muscle.substring(0,weightData.muscle.indexOf('.0'))
  }
}
