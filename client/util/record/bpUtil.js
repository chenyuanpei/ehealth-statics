export function calcStatus(bpState) {
  // 血压状况：1-低血压，2-正常血压，3-正常高值，4-轻度高血压，5-中度高血压，6-重度高血压
  switch (bpState) {
    case 1:
      return 'low'
    case 2:
      return 'normal'
    case 3:
      return 'normal_height'
    case 4:
      return 'light'
    case 5:
      return 'medium'
    case 6:
      return 'height'
    case 7:
      return 'highest'
    default:
      return 'no_data'
  }
}

// 获取文本
export function getIconText(param) {
  let status = null
  if (!isNaN(param)) {
    status = calcStatus(param)
  } else {
    status = param
  }

  return ({
    no_data: '未测量',
    normal: '正常血压',
    low: '低血压',
    normal_height: '正常高值',
    light: 'h1级高血压',
    medium: '2级高血压',
    height: '3级高血压',
    highest: '单纯收缩期高血压',
  })[status]
}

// 获取文本
export function getIconClass(param) {
  let status = null
  if (!isNaN(param)) {
    status = calcStatus(param)
  } else {
    status = param
  }

  const iconStatus = ({
    no_data: 'no_data',
    low: 'light',
    normal: 'normal',
    normal_height: 'normal',
    light: 'light',
    medium: 'high',
    height: 'high',
  })[status]

  return `icon_blood_${iconStatus}`
}

const bpUtil = {
  calcStatus,
  getIconText,
  getIconClass
}

module.exports = bpUtil
