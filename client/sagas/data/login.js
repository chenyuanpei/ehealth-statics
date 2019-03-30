import {call, put, take} from 'redux-saga/effects'
import {devLoginInfo} from '../../config'
import {login} from '../../util/login'
import {reportApi} from '../../apis/healthService/datacollectionRest'
import {getMyAccount} from '../../sagas/data/account'
import moment from 'moment'
import browserCookies from 'browser-cookies'
// actions
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure
} from '../../actions/page/login'
// apis
import {loginApi} from '../../apis/healthService/wx'
import {getPointStatusChangeApi} from '../../apis/healthService/point'
// sagas
import {getAccountMembers} from '../../sagas/data/member'
import {toast} from '../../components/common/toast/PubSubToast'
const LOGIN_DATA_KEY = '___LOGIN_DATA'

export default function * watchLoginRequest() {
  yield take(LOGIN_REQUEST)
  //const {payload: {code, openId}} = yield take(LOGIN_REQUEST)

  try {
    //const loginData = yield call(getLoginData, {code, openId})

    const loginData = login()

    yield put(loginSuccess(loginData))
    yield call(getAccountMembers)
    // 登录埋点
    const menuUrl = window.location.href
    const timestamp = moment().format('x')
    const {userId} = yield call(getMyAccount)
    let pram = {jsonData:{eventId:'click_menu',userId,menuId:'login',menuUrl},timestamp,checksum:''}
    yield call(reportApi,pram)
    // 登录埋点结束
    // 积分信息toast
    let beginTime = localStorage.getItem("beginTime")
    let pramPoint = {
      userId
    }
    if (parseInt(beginTime)>0){
      pramPoint.beginTime = beginTime
    }

    const pointChangeData = yield call(getPointStatusChangeApi,{...pramPoint})
    if(pointChangeData && pointChangeData.length > 0){
      let htmlToast = ''
      for (let i = 0;i<pointChangeData.length;i++){
        htmlToast +=`${pointChangeData[i].ruleName},奖励<span class="orangeFont"> + ${pointChangeData[i].point}</span> 积分 <br />`
      }
      toast(htmlToast,{icon:'null'})
      localStorage.setItem("beginTime",moment().format('x'))
    }



  } catch (error) {
    console.error('登录失败', error)

    // 将登录信息缓存到localStorage
    window.localStorage.removeItem(LOGIN_DATA_KEY)
    yield put(loginFailure(error))

    browserCookies.erase('session')
    browserCookies.erase('lzAccessToken')

    var url = require('url');
    var url_parts = url.parse(window.location.href, true);

    var newQuery = {}
    Object.keys(url_parts.query).forEach(function (key) {
      if (key != 'code' && key != 'state' && key != 'accessToken' && key != 'userId') {
        newQuery[key] = url_parts.query[key]
      }
    })

    let newUrl = url.format({
      protocol: url_parts.protocol,
      host: url_parts.host,
      pathname: url_parts.pathname,
      query: newQuery,
      hash: url_parts.hash
    })

    location.replace(newUrl)

  }
}

function * getLoginData({code, openId}) {
  // 如果配置了登录信息，则使用配置的登录信息
  if (devLoginInfo) {
    return devLoginInfo
  }

  // 从 localStorage 中获取登录信息
  let loginData = window.localStorage.getItem(LOGIN_DATA_KEY)
  loginData = JSON.parse(loginData)

  // 存在缓存的登录信息时
  // 正式环境code有值，qa和dev环境有openId
  if (loginData && (!code || loginData.code === code) && (!openId || loginData.openId === openId)) {
    // 判断是否将要过期，剩余有效期超过24小时的不需要重新登录
    if (loginData.data.expireAt - new Date().getTime() > 24 * 60 * 60 * 1000) {
      return loginData.data
    }
  }

  // 根据code、opendId获取登录信息
  if (code || openId) {
    const data = yield call(loginApi, {code, openId})

    // 将登录信息缓存到localStorage
    window.localStorage.setItem(LOGIN_DATA_KEY, JSON.stringify({
      code,
      openId,
      data
    }))

    return data
  }

  throw new Error('没有登录信息且没有wx授权code')
}
