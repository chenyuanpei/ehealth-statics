import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'

// 初始化
export const POWER_MODE_INIT = Symbol('POWER_MODE_INIT')
export const init = createAction(POWER_MODE_INIT)

// 显示省电模式选择
export const SHOW_POWER_MODE = Symbol('SHOW_POWER_MODE')
const showPowerMode = createAction(SHOW_POWER_MODE)

// 显示省电时间选择
export const SHOW_POWER_MODE_TIME = Symbol('SHOW_POWER_MODE_TIME')
const showPowerModeTime = createAction(SHOW_POWER_MODE_TIME)

// 修改省电模式属性并保存
export const UPDATE_POWER_MODE = Symbol('UPDATE_POWER_MODE')
export const updatePowerMode = createAction(UPDATE_POWER_MODE)

export default {
  push,
  init,
  showPowerMode,
  showPowerModeTime,
  updatePowerMode,
}
