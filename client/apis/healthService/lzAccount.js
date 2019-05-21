import uuid from 'uuid'
import browserCookies from 'browser-cookies'
import axios from 'axios'
import { generateRequest } from '../request'
import { healthServer } from '../constant'

const request = generateRequest(`${healthServer}/account/`)
const requestAccess = generateRequest(`${healthServer}/access/`)

console.log('\client\apis\healthService\account', `${healthServer}/account/`, `${healthServer}/access/`)

// 我的成员集合
// request = {}
//export const getAccountApi = request('get_account', {
// mock: {
//   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":{"id":"3c7d8f0d4d62428f8e7180c1c1634c4a","userId":4086281,"headImgurl":"https://sports-dev-files.lifesense.com/headimg/20160729/1594b978432b4abf9b27cea4dea776f8"}}'))
// }
//})

export const getAccountApi = async function () {

  let requesId = uuid.v4().replace(/-/g, '')

  var md5omatic = require('md5-o-matic')
  let signature = md5omatic("speed_" + requesId + "2")

  let lzCurrentUserResponse = await axios.get(`http://app.lifejoy-health.com/api-gateway/user-service/user/current_user?requestId=${requesId}&appType=2&signature=${signature}`, {
    headers: {
      'Content-Type': 'application/json'
      , 'accessToken': lzAccessToken().access_token
    }
  })

  console.log('lzCurrentUserResponse', lzCurrentUserResponse)
}

export const getChengyishengApi = requestAccess('chengyisheng_url'

)
// 我的成员集合
// request = {}
export const getMembersApi = request('get_members', {
  // mock: {
  //   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":[{"id":"8c1172ef847b4cd59b52f2a8610f65e0","nickname":"爸爸","headimgurl":"http://jk.lifesense.com/static/images/icon_user_no_man.png","sex":1,"manager":true,"bpMeasurementDate":1469690585000},{"id":"0913353c964043cd9b958e510b907efc","nickname":"翔晨","headimgurl":"http://wx.qlogo.cn/mmopen/ajNVdqHZLLCqPfFYzibabpPbdromrPe339bmDrtB2oiaITE1QYhZVpiatpsnlOZ4kPKlaBBRt2JEaOYvlciagAhNqic0qE7tunWg8fghXS7uPglw/0","sex":1,"manager":true},{"id":"e6b873a0e93a430b8664529f0fb0b16e","nickname":"老船长1","headimgurl":"http://wx.qlogo.cn/mmopen/ajNVdqHZLLCqPfFYzibabpPbdromrPe339bmDrtB2oiaITE1QYhZVpiatpsnlOZ4kPKlaBBRt2JEaOYvlciagAhNqic0qE7tunWg8fghXS7uPglw/0","sex":1,"manager":true},{"id":"c0b2349d3ad34f27a8bb45bec85587f1","nickname":"爸爸","headimgurl":"http://jk.lifesense.com/static/images/icon_user_no_man.png","sex":1,"manager":true},{"id":"5649b9db268c4ea79493134f0f94f0b9","nickname":"爸爸","headimgurl":"http://jk.lifesense.com/static/images/icon_user_no_man.png","sex":1,"manager":true,"bpMeasurementDate":1469692246000}]}'))
  // }
})

// 我关注的成员集合
// request = {}
export const getSubscribeMembersApi = request('get_subscribe_members', {
  // mock: {
  //   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":[{"id":"5860b0c0ee574477b8b4af620663f13c","name":"林浩彬","nickname":"林浩彬","headimgurl":"https://rest-jk.lifesense.com/static/common/img/default_father.png","sex":1,"manager":false}]}'))
  // }
})

// 获取成员被关注数量
// {
//   "memberId": "string"
// }
export const getSubscribeCountApi = request('get_bysubscribe_count', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":${parseInt(Math.random() * 10)}}`))
  // }
})

// 创建或保存成员
// request = {
//   "name": "string",
//   "nickname": "string",
//   "sex": 0,
//   "birthday": 0,
//   "weight": 0,
//   "height": 0,
//   "waist": 0,
//   "headImgurl": "string",
// }
export const saveMemberApi = request((data) => 'save_member?action=1&deviceId=' + data.deviceId, {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":"0f91d8403df2423db7519604a0ae67f9"}`))
  // }
})

// 根据id获取成员
// {
//   "memberId": "string"
// }
export const getMemberByIdApi = request('get_member_byid', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":{"id":"47767690cbb64d298b9efd75917d5efb","accountId":"47767690cbb64d298b9efd75917d5efb","userId":4086299,"name":"31232","nickname":"31232","sex":1,"birthday":473356800000,"weight":60.0,"height":170.0,"manager":true}}`))
  // }
})

// 获取当前帐户管理的成员数量
export const getmemberCountApi = request('get_member_count', {})

// 上传成员头像
// request = {
//   "serverId": "string"
// }
// export const uploadHeadimgApi = request('upload_headimg', {})

// 修改用户昵称
export const updateAccountNickNameApi = request('update_account_nickname', {})

// 修改用户头像
export const updateAccountHeadImgApi = request('update_account_headimg', {})

// 发送验证码
// request = {
//   "mobile": "string"
// }
//export const sendVerificationCodeApi = request('send_verificationCode', {
// mock: {
//   data: (req) => (JSON.parse(`{"code":200,"msg":"成功"}`))
// }
//})

export const sendVerificationCodeApi = async function (inkey) {

  let requesId = uuid.v4().replace(/-/g, '')

  var md5omatic = require('md5-o-matic')
  let signature = md5omatic("speed_" + requesId + "2")

  let lzSendCaptureResponse = await axios.post(`http://app.lifejoy-health.com/api-gateway/user-service/user_account/send_capture?requestId=${requesId}&appType=2&signature=${signature}`, {
    "mobileOrEmail": inkey.mobile
  }, {
      headers: {
        'Content-Type': 'application/json'
        , 'accessToken': lzAccessToken().access_token
      }
    })

  console.log('lzSendCaptureResponse', lzSendCaptureResponse)
}

// 校验验证码
// request = {
//   "mobile": "string",
//   "verificationCode": "string"
// }
export const checkCodeApi = request('check_verification_code', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功"}`))
  // }
})

// 更新手机号（绑定）
// request = {
//   "mobile": "string",
//   "verificationCode": "string"
// }
//export const updateMobileApi = request('update_mobile', {
// mock: {
//   data: (req) => (JSON.parse(`{"code":200,"msg":"成功"}`))
// }
//})

export const updateMobileApi = async function (inkey) {

  let requestId = uuid.v4().replace(/-/g, '')

  var md5omatic = require('md5-o-matic')
  let signature = md5omatic("speed_" + requestId + "2")

  // let lzBindMobileResponse = await axios.post(`http://app.lifejoy-health.com/api-gateway/user-service/user_account/bind_mobile?requestId=${requestId}&appType=2&signature=${signature}`, {
  //   "captureCode": inkey.verificationCode
  //   , "mobile": inkey.mobile
  // }, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //       , 'accessToken': lzAccessToken().access_token
  //     }
  //   })

  // console.log('lzBindMobileResponse', lzBindMobileResponse)

  let accessToken = session().accessToken

  let getAccountResponse = await axios.post(`http://health.lifesense.com/health_service/account/get_account?appType=23&requestId=${requestId}&accessToken=${accessToken}`)

  console.log('getAccountResponse', getAccountResponse)



}

// 根据id删除成员
// {
//   "memberId": "string"
// }
export const deleteMemberByIdApi = request('delete_member', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":{"id":"47767690cbb64d298b9efd75917d5efb","accountId":"47767690cbb64d298b9efd75917d5efb","userId":4086299,"name":"31232","nickname":"31232","sex":1,"birthday":473356800000,"weight":60.0,"height":170.0,"manager":true}}`))
  // }
})

// 根据id取消关注成员
// {
//   "memberId": "string"
// }
export const unbindSubMemberByIdApi = request('unsubseribe_subscriber', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":{"id":"47767690cbb64d298b9efd75917d5efb","accountId":"47767690cbb64d298b9efd75917d5efb","userId":4086299,"name":"31232","nickname":"31232","sex":1,"birthday":473356800000,"weight":60.0,"height":170.0,"manager":true}}`))
  // }
})

// 根据成员id获取某个成员被关注的帐户集合
// {
//   "memberId": "string"
// }
export const getBySubscribersApi = request('get_bysubscribers', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":{"id":"47767690cbb64d298b9efd75917d5efb","accountId":"47767690cbb64d298b9efd75917d5efb","userId":4086299,"name":"31232","nickname":"31232","sex":1,"birthday":473356800000,"weight":60.0,"height":170.0,"manager":true}}`))
  // }
})

// 根据成员id获取分享成员的带参二维码
// {
//   "memberId": "string"
// }
export const getQrcodeByMemberIdApi = request('get_qrcode_by_memberid', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":{"id":"47767690cbb64d298b9efd75917d5efb","accountId":"47767690cbb64d298b9efd75917d5efb","userId":4086299,"name":"31232","nickname":"31232","sex":1,"birthday":473356800000,"weight":60.0,"height":170.0,"manager":true}}`))
  // }
})

// 根据成员id获取分享成员的带参二维码
// {
//   "accountId": "string",
//   "memberId": "string"
// }
export const unSubseribeBySubscriberApi = request('unsubseribe_bysubscriber', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":{"id":"47767690cbb64d298b9efd75917d5efb","accountId":"47767690cbb64d298b9efd75917d5efb","userId":4086299,"name":"31232","nickname":"31232","sex":1,"birthday":473356800000,"weight":60.0,"height":170.0,"manager":true}}`))
  // }
})

// 根据成员id获取被当前账号关注成员的成员的账号信息及备注
// {
//   "memberId": "string"
// }
export const getSubscribeMemberByidApi = request('get_subscribe_member_byid', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":{"id":"47767690cbb64d298b9efd75917d5efb","accountId":"47767690cbb64d298b9efd75917d5efb","userId":4086299,"name":"31232","nickname":"31232","sex":1,"birthday":473356800000,"weight":60.0,"height":170.0,"manager":true}}`))
  // }
})

// 更新关注成员的备注
// {
//   "memberId": "string",
//   "remark": "string"
// }
export const updateSubscriberRemarkApi = request('update_subscriber_remark', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功","data":{"id":"47767690cbb64d298b9efd75917d5efb","accountId":"47767690cbb64d298b9efd75917d5efb","userId":4086299,"name":"31232","nickname":"31232","sex":1,"birthday":473356800000,"weight":60.0,"height":170.0,"manager":true}}`))
  // }
})


//  扫患者，认领成员

export const claimPatientBindDeviceApi = request('claim_patient_bind_device', {})


//  认领患者的信息

export const getClaimPatientInfoApi = request('get_claim_patient_info', {})

// 首页统计数据卡片
export const getStatPatient = request('get_stat_patient', { toast: false })

export function lzAccessToken() {
  let str = decodeURIComponent(browserCookies.get('lzAccessToken'))
  return str && str !== 'undefined' ? JSON.parse(str) : {}
}

export function session() {
  let str = decodeURIComponent(browserCookies.get('session'))
  return str && str !== 'undefined' ? JSON.parse(str) : {}
}