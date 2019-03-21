import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/doctor_team/`)
const requestInfo = generateRequest(`${healthServer}/patienteducation/`)


export const getDoctorTeamApi = request('get_doctor_team', {
})
export const getDoctorTeamMemberApi = request('get_doctor_team_member', {})
export const getGoodsApi = request('get_goods', {
})
export const getTeamMemberWhichOpendConsultService = request('doctor_team_member_which_opend_consult_service', {
})



const requestOrder = generateRequest(`${healthServer}/order/`)
export const checkExpireTimeApi = requestOrder('check_expire_time', {
})

export const purchaseGoodsApi = requestOrder('purchase_goods', {})

export const purchaseLeaveHospitalServiceApi = requestOrder('purchase_leave_hospital_service', {})

// 咨询订单服务 结束订单
export const closeConsultOrder = requestOrder((data)=>'closeConsultOrder?groupId='+data.groupId+'&patientId='+data.patientId, {})

// 倒计时
export const getChatCountdown = requestOrder((data)=>'getChatCountdown?groupId='+data.groupId+'&patientId='+data.patientId, {method: 'get'})

export const hasServiceLeaveHospitalService = requestOrder((data)=>'has_in_serviceleave_hospital_service/'+data.buyerId+'?doctorId='+data.doctorId, {method: 'get'})
// 结束服务
export const finishApi = requestOrder('finish', {})
export const hasPaidPreOrder = requestOrder((data)=>'has_paid_preorder/'+data.buyerId, {method:'get'})


export const getPatientEducation = requestInfo((data)=>'getInfoById/'+data.id, {method:'get'})



export const finishWithDoctorTeamIdApi = requestOrder((data)=>'finish_with_doctor_team_id?doctorTeamId='+data.doctorTeamId+'&userId='+data.userId, {})












