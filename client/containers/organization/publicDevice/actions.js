import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 初始化
export const INIT = Symbol('PUBLICK_DEVICE_INIT')
const init = createAction(INIT)

// 获取member信息
export const PUBLIC_DEVICE_MEMBER_DATA = Symbol('PUBLIC_DEVICE_MEMBER_DATA')
export const public_device_member = createAction(PUBLIC_DEVICE_MEMBER_DATA)

// 获取音频信息
export const PUBLIC_DEVICE_VOICE_DATA = Symbol('PUBLIC_DEVICE_VOICE_DATA')
export const get_public_device_voice_data = createAction(PUBLIC_DEVICE_VOICE_DATA)

// 机构信息
export const ORGANIZATION_INFO_PUBLIC_DATA = Symbol('ORGANIZATION_INFO_PUBLIC_DATA')
export const getPublicOrganizationInfo = createAction(ORGANIZATION_INFO_PUBLIC_DATA)

// 设置分享的值
export const ORGANIZATION_SHARE_SHOW_STATE = Symbol('ORGANIZATION_SHARE_SHOW_STATE')
export const setShareShow = createAction(ORGANIZATION_SHARE_SHOW_STATE)

// getAllRecords
export const PUBLIC_DEVICE_WEIGHT_ALL_RECORDS_DATA_REQUEST = Symbol('PUBLIC_DEVICE_WEIGHT_ALL_RECORDS_DATA_REQUEST')
export const getAllRecords = createAction(PUBLIC_DEVICE_WEIGHT_ALL_RECORDS_DATA_REQUEST)

// getAllRecordsSuccess
export const PUBLIC_DEVICE_WEIGHT_ALL_RECORDS_DATA_SUCCESS = Symbol('PUBLIC_DEVICE_WEIGHT_ALL_RECORDS_DATA_SUCCESS')
export const getAllRecordsSuccess = createAction(PUBLIC_DEVICE_WEIGHT_ALL_RECORDS_DATA_SUCCESS)

// getWeightSuggest
export const PUBLIC_DEVICE_WEIGHT_SUGGEST_SUCCESS = Symbol('PUBLIC_DEVICE_WEIGHT_SUGGEST_SUCCESS')
export const getWeightSuggestSuccess = createAction(PUBLIC_DEVICE_WEIGHT_SUGGEST_SUCCESS)

// 获取 血压数据
export const PUBLIC_GET_BP_DATA_SECCUSS = Symbol('PUBLIC_GET_BP_DATA_SECCUSS')
export const getBpDataSeccuss = createAction(PUBLIC_GET_BP_DATA_SECCUSS)

// 获取 血压建议
export const PUBLIC_GET_SUGGEST_DATA_SECCUSS = Symbol('PUBLIC_GET_SUGGEST_DATA_SECCUSS')
export const getSuggestDataSeccuss = createAction(PUBLIC_GET_SUGGEST_DATA_SECCUSS)

// 获取 品牌定制
export const PUBLIC_GET_BANNER_DATA_SECCUSS = Symbol('PUBLIC_GET_BANNER_DATA_SECCUSS')
export const getBannerDataSeccuss = createAction(PUBLIC_GET_BANNER_DATA_SECCUSS)

// 获取 健康顾问 医生信息
export const PUBLIC_GET_RELATION_DOCTOR_LIST_DATA_SECCUSS = Symbol('PUBLIC_GET_RELATION_DOCTOR_LIST_DATA_SECCUSS')
export const getRelationDoctorListDataSeccuss = createAction(PUBLIC_GET_RELATION_DOCTOR_LIST_DATA_SECCUSS)

// 获取 热门文章 列表
export const PUBLIC_GET_HOT_NEW_LIST_DATA_SECCUSS = Symbol('PUBLIC_GET_HOT_NEW_LIST_DATA_SECCUSS')
export const getHotNewListDataSeccuss = createAction(PUBLIC_GET_HOT_NEW_LIST_DATA_SECCUSS)

// clear
export const CLEAR = Symbol('PAGE_GET_BP_RECORD@clear')
export const clear = createAction(CLEAR)

export default {
  push,
  get_public_device_voice_data,
  getPublicOrganizationInfo,
  public_device_member,
  init,
  setShareShow,
  getAllRecords,
  getAllRecordsSuccess,
  getWeightSuggestSuccess,
  getBpDataSeccuss,
  getSuggestDataSeccuss,
  getBannerDataSeccuss,
  getRelationDoctorListDataSeccuss,
  getHotNewListDataSeccuss,
  clear
}

