import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/doctor/`)
const requestDoctorTeam = generateRequest(`${healthServer}/doctor_team/`)
const requestOrgan = generateRequest(`${healthServer}/organ/`)
// 查询成员关联的医生集合
// request = {
//   "memberId": "string"
// }
// export const getDoctorsByMemberIdApi = request('get_doctors_by_memberid', {
//   // mock: {
//   //   data: (req) => JSON.parse('{"code":200,"data":[{"id":"1","certificationStatus":0,"qrcodeSqmb":"string","name":"string","sex":0,"birthday":"2016-08-04T02:41:36.070Z","doctorType":0,"mobile":"string","email":"string","headimgurl":"string","departments":[{"id":"string","name":"string","phone":"string"}],"hospital":"string","hospitalId":"string","introduction":"string","licenseNum":"string","major":"string","title":"string","qrcode":"string","created":0,"deleted":false},{"id":"2","certificationStatus":0,"qrcodeSqmb":"string","name":"string","sex":0,"birthday":"2016-08-04T02:41:36.070Z","doctorType":0,"mobile":"string","email":"string","headimgurl":"string","departments":[{"id":"string","name":"string","phone":"string"}],"hospital":"string","hospitalId":"string","introduction":"string","licenseNum":"string","major":"string","title":"string","qrcode":"string","created":0,"deleted":false}]}')
//   // }
// })

// 根据id获取医生
// request = {
//   "id": "string"
// }
export const getDoctorByIdApi = request('get_doctor_byid', {})

// 获取慢病患者信息
// request = {
//   "memberId": "string"
// }
// export const getSqmbMemberByMemberIdApi = request('get_sqmbmember_by_memberid', {})

// 查询发送关联请求给医生的状态
// 返回 0-没有关联也没有医生等待处理的请求，1-和医生已经关联；2-和医生没有关联但是等待医生处理
// request = {
//   "memberId": "string",
//   "doctorId": "string"
// }
export const sendRequestStatusApi = request('check_linked', {})

// 发送关联请求给医生
// request = {
//   "id": "string",
//   "accountId": "string",
//   "userId": 0,
//   "openId": "string",
//   "name": "string",
//   "nickname": "string",
//   "sex": 0,
//   "birthday": 0,
//   "weight": 0,
//   "height": 0,
//   "waist": 0,
//   "headImgurl": "string",
//   "manager": false,
//   "phone": "string",
//   "address": "string",
//   "sickType": 0,
//   "idNO": "string",
//   "docId": "string"
// }
export const saveSendRequestApi = request('save_send_request', {})

// 医生列表
export const getDoctorsApi = request('get_doctors', {})
// 根据设备id查询关联医生列表
export const getRelationDoctorsListApi = requestOrgan('get_device_doctors', {})
// 医生详情页，已关联患者，未关联患者
export const getDoctorMembersApi = request('get_doctor_members', {})
// 个人中心 检查是否有关联医生，显示入口
export const checkDoctorsApi = request('check_doctors', {})

export const getDoctorById = request('get_doctor_byid', {})
// 院后管理的服务接口
export const leaveHospitalService = request((data)=>'leave_hospital_service/'+data.doctorId, {method:'get'})
// 院前管理的服务接口
export const preHospitalService = request((data)=>'pre_hospital_service/'+data.doctorId, {method:'get'})
// 获取工作室列表
export const getDoctorTeamList = requestDoctorTeam((data)=>'doctor_team_list/'+data.userId, {method:'get'})

export const getDoctorsOnce = request((data)=>'get_doctors_once', {})
export const getDoctorTeamListOnce = requestDoctorTeam((data)=>'doctor_team_list_once/'+data.userId, {method:'get'})









