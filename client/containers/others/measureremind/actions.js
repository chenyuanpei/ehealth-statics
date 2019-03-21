import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 初始化
export const MEASURE_REMIND_INIT_REQUEST = Symbol('MEASURE_REMIND_INIT_REQUEST')
const init = createAction(MEASURE_REMIND_INIT_REQUEST)

// 显示时间选择框
export const SHOW_SELECT_REQUIRE = Symbol('SHOW_SELECT_REQUIRE')
const showSelect = createAction(SHOW_SELECT_REQUIRE)

// 获取提醒
export const GET_MEASURE_REMIND_REQUIRE = Symbol('GET_MEASURE_REMIND_REQUIRE')
export const getTimeRemind = createAction(GET_MEASURE_REMIND_REQUIRE)

// 保存提醒成功
export const SAVE_MEASURE_REMIND_SUCCESS = Symbol('SAVE_MEASURE_REMIND_SUCCESS')
export const getTimeRemindSuccess = createAction(SAVE_MEASURE_REMIND_SUCCESS)

// 保存提醒
export const SAVE_MEASURE_REMIND_REQUIRE = Symbol('SAVE_MEASURE_REMIND_REQUIRE')
const save = createAction(SAVE_MEASURE_REMIND_REQUIRE)

// 设置time的值
export const SET_MEASURE_REMIND_PAGE_SET_TIME = Symbol('SET_MEASURE_REMIND_PAGE_SET_TIME')
export const setTime = createAction(SET_MEASURE_REMIND_PAGE_SET_TIME)

export default {
  init,
  showSelect,
  getTimeRemind,
  getTimeRemindSuccess,
  save,
  setTime,
  push,
}
