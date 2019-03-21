import {select} from 'redux-saga/effects'
// import moment from 'moment'
import {callApi} from '../api'

// actions
import {
  GET_INFORMATION_COLUMN_REQUEST,
  GET_INFORMATION_COLUMN_SUCCESS,
  GET_INFORMATION_COLUMN_FAILURE,
  GET_INFORMATION_SUBSCRIBE_REQUEST,
  GET_INFORMATION_SUBSCRIBE_SUCCESS,
  GET_INFORMATION_SUBSCRIBE_FAILURE,
  GET_INFORMATION_TWO_COLUMN_REQUEST,
  GET_INFORMATION_TWO_COLUMN_SUCCESS,
  GET_INFORMATION_TWO_COLUMN_FAILURE,
  GET_INFORMATION_BANNER_REQUEST,
  GET_INFORMATION_BANNER_SUCCESS,
  GET_INFORMATION_BANNER_FAILURE,
  GET_INFORMATION_LIST_REQUEST,
  GET_INFORMATION_LIST_SUCCESS,
  GET_INFORMATION_LIST_FAILURE,
  GET_INFORMATION_INFO_REQUEST,
  GET_INFORMATION_INFO_SUCCESS,
  GET_INFORMATION_INFO_FAILURE,
  GET_INFORMATION_HOT_LIST_REQUEST,
  GET_INFORMATION_HOT_LIST_SUCCESS,
  GET_INFORMATION_HOT_LIST_FAILURE,
  GET_FAQ_LIST_REQUEST,
  GET_FAQ_LIST_SUCCESS,
  GET_FAQ_LIST_FAILURE,
} from '../../actions/data/information'

import {

} from '../../containers/FAQ/actions'

import {informationIdSelector} from '../../selectors/data/information'

// apis
import {
  getInformationIdApi, getInformationMenuApi, getInformationBannersApi, setInformationSubscribeApi,
  getInformationListApi, getInformationInfoApi, getInformationHotApi, getFaqListApi
} from '../../apis/healthService/information'

// 获取资讯栏目信息
export function * getInformationIdData(key) {
  return yield callApi({
    types: [
      GET_INFORMATION_COLUMN_REQUEST,
      GET_INFORMATION_COLUMN_SUCCESS,
      GET_INFORMATION_COLUMN_FAILURE,
    ],
    api: getInformationIdApi,
    data: key
  })
}

// 获取资讯二级栏目信息
export function * getInformationTwoColumn() {
  const id = yield select(informationIdSelector)
  return yield callApi({
    types: [
      GET_INFORMATION_TWO_COLUMN_REQUEST,
      GET_INFORMATION_TWO_COLUMN_SUCCESS,
      GET_INFORMATION_TWO_COLUMN_FAILURE,
    ],
    api: getInformationMenuApi,
    data: id,
    // formatResponse: (data) => data.id
  })
}

// 获取资讯banner
export function * getInformationBanner({position}) {
  return yield callApi({
    types: [
      GET_INFORMATION_BANNER_REQUEST,
      GET_INFORMATION_BANNER_SUCCESS,
      GET_INFORMATION_BANNER_FAILURE,
    ],
    api: getInformationBannersApi,
    data:{
      position
    }
  })
}

// 获取资讯订阅信息
export function * getInformationSubscribeData({list = []}) {
  return yield callApi({
    types: [
      GET_INFORMATION_SUBSCRIBE_REQUEST,
      GET_INFORMATION_SUBSCRIBE_SUCCESS,
      GET_INFORMATION_SUBSCRIBE_FAILURE,
    ],
    api: setInformationSubscribeApi,
    data: {
      list
    }
    // formatResponse: (data) => data.id
  })
}

// 获取资栏目下  列表
export function * getInformationListData({id, columnLevel = 1, pageNum = 1, pageSize = 15} = {}) {
  const defId = yield select(informationIdSelector)
  let columnInfoId = id || defId
  return yield callApi({
    types: [
      GET_INFORMATION_LIST_REQUEST,
      GET_INFORMATION_LIST_SUCCESS,
      GET_INFORMATION_LIST_FAILURE,
    ],
    api: getInformationListApi,
    data: {
      columnInfoId,
      pageNum,
      pageSize,
      columnLevel
    }
    // formatResponse: (data) => data.id
  })
}

// 获取资讯详情
export function * getInformationInfoData(id) {
  return yield callApi({
    types: [
      GET_INFORMATION_INFO_REQUEST,
      GET_INFORMATION_INFO_SUCCESS,
      GET_INFORMATION_INFO_FAILURE,
    ],
    api: getInformationInfoApi,
    data: id
  })
}

// 获取 热门文章列表
export function * getInformationHotListData({columnInfoId = '', columnContentInfoId, count = 5} = {}) {
  return yield callApi({
    types: [
      GET_INFORMATION_HOT_LIST_REQUEST,
      GET_INFORMATION_HOT_LIST_SUCCESS,
      GET_INFORMATION_HOT_LIST_FAILURE,
    ],
    api: getInformationHotApi,
    data: {
      columnInfoId,
      columnContentInfoId,
      count
    }
  })
}

// 获取 常见问题
export function * getFaqListData({id: oaId, size = 5} = {}) {
  const defId = yield select(informationIdSelector)
  let id = oaId || defId
  return yield callApi({
    types: [
      GET_FAQ_LIST_REQUEST,
      GET_FAQ_LIST_SUCCESS,
      GET_FAQ_LIST_FAILURE,
    ],
    api: getFaqListApi,
    data: {
      id,
      size
    }
  })
}
