import axios from 'axios'
import uuid from 'node-uuid'
import moment from 'moment'
import { select } from '../store'
import { accessTokenSelector } from '../selectors/data/login'
import { LOADING } from '../const/loading'
import { loading, toast } from '../util/loading'
import { apiUrl } from '../config'
import { login } from '../util/login'
import browserCookies from 'browser-cookies'

console.log('apiUrl', apiUrl);

export let instance = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => status === 200,
  transformRequest: [
    (data) => JSON.stringify(data),
  ],
  data: null
})

const defaultParams = () => {
  return ({
    appType: 23,
    requestId: uuid.v4().replace(/-/g, ''), // uuid 去掉 -
    accessToken: select ? select(accessTokenSelector) : ''
    //accessToken: login().accessToken
  })
}

const unknownError = {
  code: 500,
  msg: '服务器繁忙'
}

const defaultTost = {
  loading: LOADING,
  success: null,
  failure: null,
}

export const request = async (options) => {
  const { showToast, mock, toast: toastOption = defaultTost } = options
  let { params } = options
  try {
    if (showToast != 1) {
      // 显示加载中
      if (toastOption.loading) {
        loading(true, toastOption.loading)
      }
    }


    // params
    if (typeof params === 'function') {
      params = params(options.data)
    }
    options.params = {
      ...defaultParams(),
      ...params
    }

    let response
    if (mock) {
      await (new Promise((resolve) => setTimeout(() => {
        resolve()
      }, mock.timeout || 1000)))
      response = {
        data: mock.data(options.data)
      }
    } else {
      response = await instance.request(options)
    }

    console.log('options', options);

    if (showToast != 1) {
      // 关闭加载中
      if (toastOption.loading) {
        loading(false, toastOption.loading)
      }
    }
    // code 不等于200 视为错误
    if (!response.data || response.data.code !== 200) {
      if (response.data.code == 401) {
        browserCookies.erase('session', { domain: '.lifesense.com' })
        browserCookies.erase('accessToken2', { domain: '.lifesense.com' })
        browserCookies.erase('appType2', { domain: '.lifesense.com' })
        browserCookies.erase('expireAt2', { domain: '.lifesense.com' })
        browserCookies.erase('gray2', { domain: '.lifesense.com' })
        browserCookies.erase('loginId2', { domain: '.lifesense.com' })
        browserCookies.erase('userType2', { domain: '.lifesense.com' })
        browserCookies.erase('session')
        browserCookies.erase('lzAccessToken')
        console.log('response.data.code', response.data.code);
        login()
      } else {
        let extraJson = {
          appCodeName: navigator.appCodeName,
          appName: navigator.appName,
          appVersion: navigator.appVersion,
          cookieEnabled: navigator.cookieEnabled,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
        }
        const { accessToken } = defaultParams()
        let url = apiUrl + '/supportplatform_service/loghub/submit?appType=23&accessToken=' + accessToken + '&requestId=' + uuid.v4().replace(/-/g, '')
        const paramsInfo = [{
          clientId: browserCookies.get('userId'),
          requestUrl: apiUrl + '/' + options.url + '',
          requestBody: options.data ? options.data : {},
          responseCode: response.data.code,
          responseBody: response.data,
          recordTime: moment().format('X'),
          message: '请求接口异常',
          extra: extraJson
        }]
        axios.post(url, paramsInfo, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });


      }

      return Promise.reject(response.data)
    }

    if (options.url == 'health_service/account/get_member_byid') {
      let requesId = uuid.v4().replace(/-/g, '')

      var md5omatic = require('md5-o-matic')
      let signature = md5omatic("speed_" + requesId + "2")

      let lzCurrentUserResponse = await axios.get(`http://lz-qa.hiwarp.cn:80/api-gateway/user-service/user/current_user?requestId=${requesId}&appType=2&signature=${signature}`, {
        headers: {
          'Content-Type': 'application/json'
          , 'accessToken': lzAccessToken().access_token
        }
      })

      console.log('lzCurrentUserResponse', lzCurrentUserResponse);

      response.data.data = {
        ...response.data.data,
        idCard: lzCurrentUserResponse.data.data.idCard,
        medicalCard: lzCurrentUserResponse.data.data.medicalCard
      }

    } else if (options.url == 'weight_service/health/wechat/getRecordsList') {
      //同步体重记录到服务端
      if (response.data.data.weightList) {

        let requesId = uuid.v4().replace(/-/g, '')

        var md5omatic = require('md5-o-matic')
        let signature = md5omatic("speed_" + requesId + "2")

        let lzSyncWeightRecordToServerDataList = []
        response.data.data.weightList.forEach(function (item) {
          var _object = {}
          Object.keys(item).forEach(function (key) {
            if (key == 'measurementDate' || key == 'created') {
              let s = item[key]
              let d = new Date(s)
              if(isNaN(d)){
                s = s.split(/\D/);
                d= new Date(s[0],s[1]-1,s[2],s[3],s[4],s[5]);
              }
              _object[key] = d.getTime()
              console.log('_time', key, item[key], _object[key]);
              // _object[key] = new Date(item[key]).getTime()
            } else {
              _object[key] = item[key]
            }
          })
          if (typeof item.deviceId === "undefined") {
            _object.deviceId = 'add_by_man'
          }
          lzSyncWeightRecordToServerDataList.push(_object)
        })

        console.log('lzSyncWeightRecordToServerResponse', lzSyncWeightRecordToServerDataList)

        let lzSyncWeightRecordToServerResponse = await axios.post(`http://lz-qa.hiwarp.cn:80/api-gateway/data-service/weight/syncWeightRecordToServer?requestId=${requesId}&appType=2&signature=${signature}`, {
          'dataList': lzSyncWeightRecordToServerDataList
        }, {
            headers: {
              'Content-Type': 'application/json'
              , 'accessToken': lzAccessToken().access_token
            }
          })

        console.log('lzSyncWeightRecordToServerResponse', lzSyncWeightRecordToServerResponse)
      }
    } else if (options.url == 'sport_service/sport/weixin/queryPedometerRecordDayByCount') {

      //同步天步数记录到服务端
      if (response.data.data.pedometerRecordDayList) {

        console.log('pedometerRecordDayList', response.data.data.pedometerRecordDayList);

        let requesId = uuid.v4().replace(/-/g, '')

        var md5omatic = require('md5-o-matic')
        let signature = md5omatic("speed_" + requesId + "2")

        let lzSyncPedometerRecordDayToServerDataList = []
        response.data.data.pedometerRecordDayList.forEach(function (item) {
          var _object = {}
          Object.keys(item).forEach(function (key) {
            if (key == 'measurementTime' || key == 'created') {
              let s = item[key]
              let d = new Date(s)
              if(isNaN(d)){
                s = s.split(/\D/);
                d= new Date(s[0],s[1]-1,s[2],s[3],s[4],s[5]);
              }
              _object[key] = d.getTime()
              console.log('_time', key, item[key], _object[key]);
              // _object[key] = new Date(item[key]).getTime()
            } else {
              _object[key] = item[key]
            }
          })
          if (typeof item.deviceId === "undefined") {
            _object.deviceId = 'add_by_man'
          }
          lzSyncPedometerRecordDayToServerDataList.push(_object)
        })

        console.log('lzSyncPedometerRecordDayToServerDataList', lzSyncPedometerRecordDayToServerDataList);

        let lzSyncPedometerRecordDayToServerResponse = await axios.post(`http://lz-qa.hiwarp.cn:80/api-gateway/data-service/sport/syncPedometerRecordDayToServer?requestId=${requesId}&appType=2&signature=${signature}`, {
          'dataList': lzSyncPedometerRecordDayToServerDataList
        }, {
            headers: {
              'Content-Type': 'application/json'
              , 'accessToken': lzAccessToken().access_token
            }
          })

        console.log('lzSyncPedometerRecordDayToServerResponse', lzSyncPedometerRecordDayToServerResponse);
      }
    } else if (options.url == 'sport_service/sport/weixin/queryPedometerRecordsHourly') {

      //同步小时步数记录到服务端
      if (response.data.data.pedometerRecordHourlyList) {

        console.log('pedometerRecordHourlyList', response.data.data.pedometerRecordHourlyList);

        let requesId = uuid.v4().replace(/-/g, '')

        var md5omatic = require('md5-o-matic')
        let signature = md5omatic("speed_" + requesId + "2")

        let lzSyncPedometerRecordHourlyToServerDataList = []
        response.data.data.pedometerRecordHourlyList.forEach(function (item) {
          var _object = {}
          Object.keys(item).forEach(function (key) {
            if (key == 'measurementTime' || key == 'created') {
              let s = item[key]
              let d = new Date(s)
              if(isNaN(d)){
                s = s.split(/\D/);
                d= new Date(s[0],s[1]-1,s[2],s[3],s[4],s[5]);
              }
              _object[key] = d.getTime()
              console.log('_time', key, item[key], _object[key]);
              // _object[key] = new Date(item[key]).getTime()
            } else {
              _object[key] = item[key]
            }
          })
          if (typeof item.deviceId === "undefined") {
            _object.deviceId = 'add_by_man'
          }
          lzSyncPedometerRecordHourlyToServerDataList.push(_object)
        })

        console.log('lzSyncPedometerRecordHourlyToServerDataList', lzSyncPedometerRecordHourlyToServerDataList);

        let lzSyncPedometerRecordHourlyToServerResponse = await axios.post(`http://lz-qa.hiwarp.cn:80/api-gateway/data-service/sport/syncPedometerRecordHourlyToServer?requestId=${requesId}&appType=2&signature=${signature}`, {
          'dataList': lzSyncPedometerRecordHourlyToServerDataList
        }, {
            headers: {
              'Content-Type': 'application/json'
              , 'accessToken': lzAccessToken().access_token
            }
          })

        console.log('lzSyncPedometerRecordHourlyToServerResponse', lzSyncPedometerRecordHourlyToServerResponse);
      }
    } else if (options.url == 'heartrate_service/health/wechat/getRecordsList') {

      //同步常规心率记录到心率服务
      if (response.data.data.heartRateAnalysisList) {

        console.log('heartRateAnalysisList', response.data.data.heartRateAnalysisList);

        let requesId = uuid.v4().replace(/-/g, '')

        var md5omatic = require('md5-o-matic')
        let signature = md5omatic("speed_" + requesId + "2")

        let lzSyncHeartRateToServerDataList = []
        response.data.data.heartRateAnalysisList.forEach(function (item) {
          var _object = {}
          Object.keys(item).forEach(function (key) {
            if (key == 'measurementDate' || key == 'created') {
              let s = item[key]
              let d = new Date(s)
              if(isNaN(d)){
                s = s.split(/\D/);
                d= new Date(s[0],s[1]-1,s[2],s[3],s[4],s[5]);
              }
              _object[key] = d.getTime()
              console.log('_time', key, item[key], _object[key]);
            } else {
              _object[key] = item[key]
            }
          })
          if (typeof item.deviceId === "undefined") {
            _object.deviceId = 'add_by_man'
          }
          lzSyncHeartRateToServerDataList.push(_object)
        })

        console.log('lzSyncHeartRateToServerDataList', lzSyncHeartRateToServerDataList);

        let lzSyncHeartRateToServerResponse = await axios.post(`http://lz-qa.hiwarp.cn:80/api-gateway/data-service/heartrate/syncHeartRateToServer?requestId=${requesId}&appType=2&signature=${signature}`, {
          'dataList': lzSyncHeartRateToServerDataList
        }, {
            headers: {
              'Content-Type': 'application/json'
              , 'accessToken': lzAccessToken().access_token
            }
          })

        console.log('lzSyncHeartRateToServerResponse', lzSyncHeartRateToServerResponse);
      }
    } else if (options.url == 'sleep_service/sleep/health/weixin/getSleepRecordsByCount') {

      //同步睡眠结果记录到服务端
      if (response.data.data.sleepRecords) {

        let requesId = uuid.v4().replace(/-/g, '')

        var md5omatic = require('md5-o-matic')
        let signature = md5omatic("speed_" + requesId + "2")

        let lzSyncSleepAnalysisToServerDataList = []
        response.data.data.sleepRecords.forEach(function (item) {
          var _object = {}
          Object.keys(item).forEach(function (key) {
            if (key == 'measurementDate' || key == 'created') {
              let s = item[key]
              let d = new Date(s)
              if(isNaN(d)){
                s = s.split(/\D/);
                d= new Date(s[0],s[1]-1,s[2],s[3],s[4],s[5]);
              }
              _object[key] = d.getTime()
              console.log('_time', key, item[key], _object[key]);
              // _object[key] = new Date(item[key]).getTime()
            } else {
              _object[key] = item[key]
            }
          })
          if (typeof item.deviceId === "undefined") {
            _object.deviceId = 'add_by_man'
          }
          if (typeof item.deepSleep === "undefined") {
            _object.deepSleep = item.deepSleepMinutes
          }
          if (typeof item.awakening === "undefined") {
            _object.awakening = item.awakeningMinutes
          }
          if (typeof item.shallowSleep === "undefined") {
            _object.shallowSleep = item.shallowSleepMinutes
          }
          lzSyncSleepAnalysisToServerDataList.push(_object)
        })

        let lzSyncSleepAnalysisToServerResponse = await axios.post(`http://lz-qa.hiwarp.cn:80/api-gateway/data-service/sleep/syncSleepAnalysisToServer?requestId=${requesId}&appType=2&signature=${signature}`, {
          'dataList': lzSyncSleepAnalysisToServerDataList
        }, {
            headers: {
              'Content-Type': 'application/json'
              , 'accessToken': lzAccessToken().access_token
            }
          })

        console.log('lzSyncSleepAnalysisToServerResponse', lzSyncSleepAnalysisToServerResponse);
      }
    } else if (options.url == 'bloodpressure_service/bp/get_bp_heRecords') {

      //同步血压记录到服务端
      if (response.data.data) {

        let requesId = uuid.v4().replace(/-/g, '')

        var md5omatic = require('md5-o-matic')
        let signature = md5omatic("speed_" + requesId + "2")

        let lzSyncBloodpressureToServerDataList = []
        response.data.data.forEach(function (item) {
          var _object = {}
          Object.keys(item).forEach(function (key) {
            if (key == 'created') {
              let s = item[key]
              let d = new Date(s)
              if(isNaN(d)){
                s = s.split(/\D/);
                d= new Date(s[0],s[1]-1,s[2],s[3],s[4],s[5]);
              }
              _object[key] = d.getTime()
              console.log('_time', key, item[key], _object[key]);
              // _object[key] = new Date(item[key]).getTime()
            } else {
              _object[key] = item[key]
            }
          })
          if (typeof item.deviceId === "undefined") {
            _object.deviceId = 'add_by_man'
          }
          lzSyncBloodpressureToServerDataList.push(_object)
        })

        let lzSyncBloodpressureToServerResponse = await axios.post(`http://lz-qa.hiwarp.cn:80/api-gateway/data-service/Bloodpressure/syncBloodpressureToServer?requestId=${requesId}&appType=2&signature=${signature}`, {
          'dataList': lzSyncBloodpressureToServerDataList
        }, {
            headers: {
              'Content-Type': 'application/json'
              , 'accessToken': lzAccessToken().access_token
            }
          })

        console.log('lzSyncBloodpressureToServerResponse', lzSyncBloodpressureToServerResponse);
      }
    } else if (options.url == 'bloodsugar_service/bs/health/get_history_Records') {

      //同步血糖记录到服务端
      if (response.data.data) {

        let requesId = uuid.v4().replace(/-/g, '')

        var md5omatic = require('md5-o-matic')
        let signature = md5omatic("speed_" + requesId + "2")

        let lzSyncBloodsugarToServerDataList = []
        response.data.data.forEach(function (item) {
          var _object = {}
          Object.keys(item).forEach(function (key) {
            if (key == 'created') {
              let s = item[key]
              let d = new Date(s)
              if(isNaN(d)){
                s = s.split(/\D/);
                d= new Date(s[0],s[1]-1,s[2],s[3],s[4],s[5]);
              }
              _object[key] = d.getTime()
              console.log('_time', key, item[key], _object[key]);
              // _object[key] = new Date(item[key]).getTime()
            } else {
              _object[key] = item[key]
            }
          })
          if (typeof item.deviceId === "undefined") {
            _object.deviceId = 'add_by_man'
          }
          lzSyncBloodsugarToServerDataList.push(_object)
        })

        let lzSyncBloodsugarToServerResponse = await axios.post(`http://lz-qa.hiwarp.cn:80/api-gateway/data-service/Bloodsugar/syncBloodsugarToServer?requestId=${requesId}&appType=2&signature=${signature}`, {
          'dataList': lzSyncBloodsugarToServerDataList
        }, {
            headers: {
              'Content-Type': 'application/json'
              , 'accessToken': lzAccessToken().access_token
            }
          })

        console.log('lzSyncBloodsugarToServerResponse', lzSyncBloodsugarToServerResponse);
      }
    } else if (options.url == 'health_service/device/get_device' || options.url == 'health_service/device/get_device_member') {



      
    }

    // toast成功信息
    if (toastOption.success) {
      toast(toastOption.success)
    }

    // formatData
    const { data } = response.data
    if (typeof data == 'undefined') {
      response.data.data = []
    }
    return options.formatData ? options.formatData(response.data.data, options.data) : response.data.data
  } catch (error) {
    try {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error)
      }
      if (showToast != 1) {
        // 关闭加载中
        if (toastOption.loading) {
          loading(false, toastOption.loading)
        }
      }
      // toast错误信息
      if (toastOption.failure) {
        toast(toastOption.failure)
      } else {
        toast('服务器繁忙')
      }
      return Promise.reject(unknownError)
    } catch (error) {
      toast('服务器繁忙')
    }
  }

  // return instance.request(options).catch((error) => {
  //   if (process.env.NODE_ENV !== 'production') {
  //     console.error(error)
  //   }
  //   Promise.reject(unknownError)
  // }).then((response) => {
  //   if (!response.data || response.data.code !== 200) {
  //     return Promise.reject(response.data)
  //   }
  //
  //   return response.data
  // }).catch((data) => {
  //   data = data || unknownError
  //   return Promise.reject(data)
  // })
}

export const generateRequest = (baseUrl) => (url, baseOptions) => (data, options) => {
  let reqUrl
  if (typeof url === 'function') { // 原来写法是 ul = url(data) 会造成bug，url调用后结果直接覆盖原来的url了
    reqUrl = url(data)
  } else {
    reqUrl = url
  }
  const requestOptions = {
    url: baseUrl + reqUrl,
    method: 'post',
    ...baseOptions,
    ...options
  }
  if (data !== undefined) {
    requestOptions.data = data
  }
  return request(requestOptions)
}

export const generateUrl = (url) => {
  const { appType, requestId, accessToken } = defaultParams()

  return `${apiUrl}/${url}${url.indexOf('?') === -1 ? '?' : '&'}appType=${appType}&requestId=${requestId}&accessToken=${accessToken}`
}

export function lzAccessToken() {
  let str = decodeURIComponent(browserCookies.get('lzAccessToken'))
  return str && str !== 'undefined' ? JSON.parse(str) : {}
}