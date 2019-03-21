// sagas
import {fork, take, call, select} from 'redux-saga/effects'
import moment from 'moment'
// actions
import {
  INFORMATION_PAGE_LOAD_DATA_REQUEST,
  INFORMATION_PAGE_INFO_REQUEST,
  SET_INFORMATION_SUBSCRIBE_REQUEST,
  MEMBER_PAGE_INFORMATION_LIST_REQUEST,
  GET_INFORMATION_TWO_COUMN_TAS_REQUEST,
} from './actions'
import {getMyAccount} from '../../sagas/data/account'
// sagas
import {
  getInformationIdData, getInformationTwoColumn, getInformationBanner, getInformationSubscribeData,
  getInformationListData, getInformationInfoData, getInformationHotListData
} from '../../sagas/data/information'
// api
import {reportApi} from '../../apis/healthService/datacollectionRest'
// toast
import {toast} from '../../components/common/toast/PubSubToast'

function * watchLoadData() {
  while (true) {
    yield take(INFORMATION_PAGE_LOAD_DATA_REQUEST)
    const {userId} = yield call(getMyAccount)
    const menuUrl = window.location.href
    const timestamp = moment().format('x')
    let pram = {jsonData:{eventId:'click_menu',userId:userId,menuId:'information',menuUrl},timestamp,checksum:''}
    try {
      yield call(getInformationIdData, 'healthnews')
      yield call(getInformationBanner,{position:8})
      yield call(getInformationTwoColumn)
      yield call(getInformationListData)
      // 埋点请求
      yield call(reportApi,pram)

    } catch (e) {
      toast('初始化，服务器繁忙...')
    }
  }
}

// 获取栏目
function * getTwoCoumnTas() {
  while (true) {
    yield take(GET_INFORMATION_TWO_COUMN_TAS_REQUEST)
    try {
      yield call(getInformationTwoColumn)
    } catch (e) {
      toast('服务器繁忙...')
    }
  }
}

// 资讯详情
function * watchInfoLoadData() {
  while (true) {
    const {payload: {columnContentInfoId} = {}} = yield take(INFORMATION_PAGE_INFO_REQUEST)
    try {
      const {columnInfoId} = yield call(getInformationInfoData, columnContentInfoId)
      yield call(getInformationHotListData, {columnInfoId, columnContentInfoId})
    } catch (e) {
      toast('资讯详情页面，服务器繁忙...')
    }
  }
}

// 设置订阅栏目
function * setSubscribe() {
  while (true) {
    const {payload: {subList: list, text}} = yield take(SET_INFORMATION_SUBSCRIBE_REQUEST)
    try {
      yield call(getInformationSubscribeData, {list})
      // toast(text, {time: 2000})
      setTimeout(() => {
        toast(text, {time: 2000})
      }, 1000)
    } catch (e) {
      toast('设置失败！服务器繁忙...')
    }
  }
}

// 获取栏目 下资讯列表
function * getInformationList() {
  while (true) {
    const {payload: {id, columnLevel, pageSize}} = yield take(MEMBER_PAGE_INFORMATION_LIST_REQUEST)
    try {
      yield call(getInformationListData, {id, columnLevel, pageSize})
    } catch (e) {
      toast('获取文章列表失败！服务器繁忙...')
    }
  }
}

export default function * memberSaga() {
  yield fork(watchLoadData)
  yield fork(watchInfoLoadData)
  yield fork(getInformationList)
  yield fork(setSubscribe)
  yield fork(getTwoCoumnTas)
}
