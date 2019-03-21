import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'

// actions
import {
  PUBLIC_DEVICE_MEMBER_DATA,
  PUBLIC_DEVICE_VOICE_DATA,
  ORGANIZATION_INFO_PUBLIC_DATA,
  ORGANIZATION_SHARE_SHOW_STATE,
  PUBLIC_DEVICE_WEIGHT_SUGGEST_SUCCESS,
  PUBLIC_DEVICE_WEIGHT_ALL_RECORDS_DATA_SUCCESS,

  PUBLIC_GET_BP_DATA_SECCUSS,
  PUBLIC_GET_SUGGEST_DATA_SECCUSS,
  PUBLIC_GET_BANNER_DATA_SECCUSS,
  PUBLIC_GET_RELATION_DOCTOR_LIST_DATA_SECCUSS,
  PUBLIC_GET_HOT_NEW_LIST_DATA_SECCUSS,
  CLEAR
} from './actions'

// member
const public_device_member_data = handleActions({
  [PUBLIC_DEVICE_MEMBER_DATA]: (state, {payload}) => payload,
}, null)

const shareShow = handleActions({
  [ORGANIZATION_SHARE_SHOW_STATE]: (state, {payload: shareShow}) => {
    return shareShow
  },
}, false)

// voiceData
const voiceData = handleActions({
  [PUBLIC_DEVICE_VOICE_DATA]: (state, {payload}) => payload,
}, null)


const organizationInfo = handleActions({
  [ORGANIZATION_INFO_PUBLIC_DATA]: (state, {payload}) => payload,
}, null)

// showSelect
const allRecords = handleActions({
  [PUBLIC_DEVICE_WEIGHT_ALL_RECORDS_DATA_SUCCESS]: (state, {payload}) => payload,
}, null)

// weightSuggest
const weightSuggest = handleActions({
  [PUBLIC_DEVICE_WEIGHT_SUGGEST_SUCCESS]: (state, {payload}) => payload,
}, null)

// getRecordById
const bpRecordById = handleActions({
  [CLEAR]: () => null,
  [PUBLIC_GET_BP_DATA_SECCUSS]: (state, {payload}) => payload,
}, null)

// suggestData 血压建议
const bpSuggestData = handleActions({
  [CLEAR]: () => null,
  [PUBLIC_GET_SUGGEST_DATA_SECCUSS]: (state, {payload}) => payload || {},
}, null)

// banner Data 品牌定制
const bannerData = handleActions({
  [CLEAR]: () => null,
  [PUBLIC_GET_BANNER_DATA_SECCUSS]: (state, {payload}) => payload || {},
}, null)

// doctorList
const doctorList = handleActions({
  [CLEAR]: () => null,
  [PUBLIC_GET_RELATION_DOCTOR_LIST_DATA_SECCUSS]: (state, {payload}) => payload || [],
}, List())

// hotNewList
const hotNewList = handleActions({
  [CLEAR]: () => null,
  [PUBLIC_GET_HOT_NEW_LIST_DATA_SECCUSS]: (state, {payload}) => payload,
}, null)

export default combineReducers({
  public_device_member_data,
  voiceData,
  organizationInfo,
  shareShow,
  weightSuggest,
  allRecords,
  bpRecordById,
  bpSuggestData,
  bannerData,
  doctorList,
  hotNewList,
})
