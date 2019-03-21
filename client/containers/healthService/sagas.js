// sagas
import {fork, take, call, put} from 'redux-saga/effects'
// actions
import {
  HEALTH_SERVICE_PAGE_LOAD_DATA_REQUEST,
  HEALTH_SERVICE_PAGE_INFO_REQUEST,
  SET_HEALTH_SERVICE_SUBSCRIBE_REQUEST,
  MEMBER_PAGE_HEALTH_SERVICE_LIST_REQUEST,
  GET_HEALTH_SERVICE_TWO_COUMN_TAS_REQUEST,
  GET_HEALTH_SERVICE_ADD_PV,
  getHotActiveSuccess
} from './actions'
import {getHotActiveApi} from '../../apis/healthService/healthService'
// api
import {
  getChengyishengApi,
} from '../../apis/healthService/account'
import {addPvApi} from '../../apis/healthService/healthService'

// sagas
import {
  getInformationIdData, getInformationTwoColumn, getInformationBanner, getInformationSubscribeData,
  getInformationListData, getInformationInfoData, getInformationHotListData
} from '../../sagas/data/information'
// toast
import {toast} from '../../components/common/toast/PubSubToast'

function * watchLoadData() {
  while (true) {
    yield take(HEALTH_SERVICE_PAGE_LOAD_DATA_REQUEST)

    try {
      yield call(getInformationIdData, 'healthnews')
      yield call(getInformationBanner,{position:81})
      yield call(getInformationTwoColumn)
      yield call(getInformationListData)
      // const hotData = yield call(getHotActiveApi)
      // const famousUrl = yield call(getChengyishengApi, {action: 1})
      // let data = {...hotData,famousUrl:famousUrl.url}
      //
      // yield put(getHotActiveSuccess(data))

    } catch (e) {
      console.log(e)
    }
  }
}

// 监听
function * watchAddPv() {
  while (true) {
    try {
      let {payload: {id,url}} = yield take(GET_HEALTH_SERVICE_ADD_PV)
      yield call(addPvApi, {id})
      yield put(goToUrl(url))

    } catch (e) {
      console.log(e)
    }
  }
}

// 监听
function goToUrl(url) {
    window.location.href = url
}
// 获取栏目
function * getTwoCoumnTas() {
  while (true) {
    yield take(GET_HEALTH_SERVICE_TWO_COUMN_TAS_REQUEST)
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
    const {payload: {columnContentInfoId} = {}} = yield take(HEALTH_SERVICE_PAGE_INFO_REQUEST)
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
    const {payload: {subList: list, text}} = yield take(SET_HEALTH_SERVICE_SUBSCRIBE_REQUEST)
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
    const {payload: {id, columnLevel, pageSize}} = yield take(MEMBER_PAGE_HEALTH_SERVICE_LIST_REQUEST)
    try {
      yield call(getInformationListData, {id, columnLevel, pageSize:4})
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
  yield fork(watchAddPv)
}
