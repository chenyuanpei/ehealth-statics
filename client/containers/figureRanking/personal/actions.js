import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_PERSONAL_INIT_SUCCESS = Symbol('PAGE_PERSONAL_INIT_SUCCESS')
export const init = createAction(PAGE_PERSONAL_INIT_SUCCESS)

// 提交
export const SUBMIT = Symbol('SUBMIT')
export const submit = createAction(SUBMIT)

// 上传图片
export const UPLOAD_IMG = Symbol('UPLOAD_IMG_PERSONAL')
export const uploadImg = createAction(UPLOAD_IMG)

// 获取历史数据成功
export const GET_HISTORY_LIST_SUCCESS = Symbol('GET_HISTORY_LIST_SUCCESS')
export const getHistoryListSuccess = createAction(GET_HISTORY_LIST_SUCCESS)

// 获取图片成功
export const GET_PICTURE_DATA_SUCCESS = Symbol('GET_PERSONAL_PICTURE_DATA_SUCCESS')
export const getPictureDataSuccess = createAction(GET_PICTURE_DATA_SUCCESS)

// 获取历史数据
export const GET_HISTORY_LIST = Symbol('GET_HISTORY_LIST')
export const getHistoryList = createAction(GET_HISTORY_LIST)

export const CHANGE_RECORD_LOADING = Symbol('CHANGE_RECORD_LOADING')
export const changeRecordsLoading = createAction(CHANGE_RECORD_LOADING)

export const CHANGE_SHOW_MORE = Symbol('CHANGE_SHOW_MORE')
export const changeShowMore = createAction(CHANGE_SHOW_MORE)

export const CHANGE_PAGE_NO= Symbol('CHANGE_PAGE_NO')
export const changePageNo = createAction(CHANGE_PAGE_NO)

export const PAGE_PERSONAL_CLEAR = Symbol('PAGE_PERSONAL_CLEAR')
export const clear = createAction(PAGE_PERSONAL_CLEAR)

export const PAGE_PERSONAL_CLEAR_PICTURE_INFO = Symbol('PAGE_PERSONAL_CLEAR_PICTURE_INFO')
export const clearPersonalPictureInfo = createAction(PAGE_PERSONAL_CLEAR_PICTURE_INFO)



export default {
  push,
  init,
  submit,
  uploadImg,
  getHistoryList,
  getHistoryListSuccess,
  getPictureDataSuccess,
  changeRecordsLoading,
  changeShowMore,
  changePageNo,
  clear,
  clearPersonalPictureInfo,
  iframePush,
}
