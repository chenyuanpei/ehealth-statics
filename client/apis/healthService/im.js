import {generateRequest} from '../request'
import {healthServer,imService} from '../constant'

const request = generateRequest(`${healthServer}/im/`)
const requestImService = generateRequest(`${imService}/`)

// 创建im帐号
// request = {
//   userType (integer, optional) // 账户类型，如 0医生,1患者,2助理,
//   userId (string, optional) // 账户id,如医生
// }
export const createAccount = request('create_account', {})

// 获取im帐号
// request = {
//   userType (integer, optional) // 账户类型，如 0医生,1患者,2助理,
//   userId (string, optional) // 账户id,如医生
// }
export const getAccount = request('get_account', {toast:false})

// 获取im语音消息微信网关的MediaId
// request = {
//   "uuid": "string",
//   "url": "string"
// }
export const getMsgMediaId = request('get_msg_media_id', {toast:false})

// 获取IM群组聊天记录
// request = {
//   "tid": "string",
//   "endTime": 0,
//   "count": 0
// }
export const getTeamHistoryMsg = request('get_team_msg', {toast:false})

export const checkUnreadMsg = request('check_unread_msg', {toast:false})

export const getUnreadMsg = request('get_unread_msg', {toast:false})

export const updateReadTime = request('update_read_time', {toast:false})

export const getTeam = request('get_team', {toast:false})


export const getImUserMsg = request('get_im_user_msg', {toast:false})

export const checkTid = request('check_tid', {toast:false})

export const getByTid = request('get_by_tid', {toast:false})
// 判断是否为付费服务
export const isPaidConsultService = request((data) =>'is_paid_consult_service?tid='+data.tid+'&patientId='+data.patientId, {method: 'get',toast:false})

export const refreshAccount = requestImService((data) => 'refresh_account/'+data.accid, {method: 'get',toast:false})



export const getTeamData = request((data)=>'get_team_with_id/'+data.teamId, {method: 'get',toast:false})





