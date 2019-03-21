import {generateRequest} from '../request'
import {healthServer,bloodSugarService} from '../constant'

const request = generateRequest(`${healthServer}/report/`)
const requestSugar = generateRequest(`${bloodSugarService}/report/`)


// 获取某个成员最近的周报记录
// request = {
//   "memberId": "string"
// }
export const getLeastReportApi = request('get_least_report', {
  // mock: {
  //   data: (req) => (JSON.parse(`{"code":200,"msg":"成功"}`))
  // }
})

// 根据id获取周报
// request = {
//   "id": "string"
// }
export const getReportByIdApi = request('get_report_by_id', {})

// 生成周报
// request = {
//   "memberId": "string"
// }
export const generateReportApi = request('generate_report', {})

// 获取账号先成员的周报
// request = {
//   "reportDate": "2016-08-18T03:48:41.605Z"
// }
export const getReportMemberListApi = request('get_report_member_List', {})

export const getReportHistoryForAllMembers = request((data) => 'report_history_for_all_members?userId='+data.userId+'&count='+data.count+'&timestamp='+data.timestamp, {method: 'get'})

export const getListForAllMembers = requestSugar((data) => 'list_for_all_members?count='+data.count+'&timestamp='+data.timestamp, {method: 'get'})

export const getSugarReportDetail = requestSugar((data) => 'detail/'+data.id, {method: 'get'})

export const getDetailList = requestSugar((data) => 'detail_list?count='+data.count+'&timestamp='+data.timestamp, {method: 'get'})




