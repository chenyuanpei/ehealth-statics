import {generateRequest} from '../request'
import {healthServer, bloodpressureService} from '../constant'

const request = generateRequest(`${bloodpressureService}/bp/`)

//血糖认领接口请求
const requestBs = generateRequest(`${healthServer}/bs/`)

const requestAcount = generateRequest(`${healthServer}/account/`)

export const getMemberByUserId = requestAcount((data) => 'member_user_id/'+data.userId,{method: 'get'})
// 根据结束时间查询指定数量血压记录
// request = {
// "userId": 0,
//   "date": 0,
//   "count": 0
// }
export const getBpRecordsByEndDateApi = request('get_bp_heRecords', {
  // mock: {
  //   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":[{"id":"3f9f9f730dc74265afc537189a83e5be","memberId":"8c1172ef847b4cd59b52f2a8610f65e0","deviceId":"userAdded","userNo":1,"systolicPressure":105,"diastolicPressure":70,"heartRate":65,"bpState":2,"measurementDate":1469690585000,"measuringDate":1469690585000},{"id":"35fc2ebb1ea94d768ce4c0926ef45022","memberId":"8c1172ef847b4cd59b52f2a8610f65e0","deviceId":"userAdded","userNo":1,"systolicPressure":105,"diastolicPressure":70,"heartRate":65,"bpState":2,"measurementDate":1469689186000,"measuringDate":1469689186000}]}'))
  // }
})

// 根据日期查询指定数量血压记录
// request = {
// "userId": 0,
//   "year": 0,
//   "month": 0
//   "day": 0
// }
export const getBpRecordsByHourAvgApi = request(({id,yearNo,monthNo,dayNo}) => 'get_hour_avg?userId=' + id + '&year=' + yearNo + '&month=' + monthNo + '&day=' + dayNo , {method: 'get'})

// 获取某个时间段的血压测量活跃度（测量总次数，正常次数，异常次数）
// request = {
//   "userId": 0,
//   "startDate": 0,
//   "endDate": 0
// }

export const getActiveDegreeApi = request('get_active_degree', {
  // mock: {
  //   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":{"normal":0,"total":2,"abnormal":2}}'))
  // }
})

// 获取指定周期的历史平均记录，按周、月查询各天的平均值，按年查询各个月份平均值
// request = {
//   "date": 0,
//   "userId": 0,
//   "type": 0
// }
export const getBpRoundRecordsApi = request('get_roundrecords', {
  // mock: {
  //   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":[{"systolicPressure":116,"diastolicPressure":79,"heartRate":71,"measuringDate":1470153600000}]}'))
  // }
})

// 获取某个时间段(年、月、周、日)血压最高测量记录
// userId必填，日期参数可选。例如查询2016年5月份，只需要填year=2016,month=6
// request = {
//   "userId": 0,
//   "year": 0,
//   "month": 0,
//   "day": 0,
//   "week": 0
// }
export const getBpHighestRecordApi = request('get_highest_bp_record', {})
export const maxBloodpressureInDayrangeApi = request(({userId,startDate,endDate}) => 'hight_sys_bloodpressure_in_dayrange?userId='+userId+'&startTs='+startDate+'&endTs='+endDate, {method: 'get'})

// 获取某个时间段(年、月、周、日)最低血压测量记录
// userId必填，日期参数可选。例如查询2016年5月份，只需要填year=2016,month=6.
// request = {
//   "userId": 0,
//   "year": 0,
//   "month": 0,
//   "day": 0,
//   "week": 0
// }
export const getBpLowestRecordApi = request('get_lowest_bp_record', {})
export const minBloodpressureInDayRangeApi = request(({userId,startDate,endDate}) => 'hight_dia_bloodpressure_in_dayrange?userId='+userId+'&startTs='+startDate+'&endTs='+endDate, {method: 'get'})

// 获取指定用户某段时间的平均血压记录
// request = {
//   "userId": 0,
//   "startDate": 0,
//   "endDate": 0
// }
export const getBpAverageRecordApi = request('get_average_bp_record', {})
export const averageBloodpressureInDayrangeApi = request(({userId,startDate,endDate}) => 'average_bloodpressure_in_dayrange?userId='+userId+'&startTs='+startDate+'&endTs='+endDate, {method: 'get'})

// 新增血压测量记录
// request = {
//   "userId": 0,
//   "measurementDate": 0,
//   "systolicPressure": 0,
//   "diastolicPressure": 0,
//   "heartRate": 0,
//   "deviceId": "string",
//   "movementError": 0,
//   "temperature": 0
// }
export const addBpRecordApi = request('add_bp_record', {})

// 修改血压测量记录
// request = {
//   "userId": 0,
//   "measurementDate": 0,
//   "systolicPressure": 0,
//   "diastolicPressure": 0,
//   "heartRate": 0,
//   "deviceId": "string",
//   "movementError": 0,
//   "temperature": 0
// }
export const updateBpRecordApi = request('update_bp_record', {})



// 删除血压记录
export const delBpRecordApi = request((id) => 'delete_bp_record/' + id, {})

// 根据血压纪录ID获取一条血压
export const getBpRecordsByIdApi = request((id) => '' + id, {method: 'get'})

// 判定该测量记录是否已认领，userId=0未认领
export const hasMatchingApi = request((id) => 'get_bp_record_byid/' + id, {method: 'get'})

// 判定该血糖测量记录是否已认领 ，userId=0未认领
export const hasMatchingBsApi = requestBs((id) => 'hasMatching/' + id, {method: 'get'})

// 用户认领测量记录
export const matchingUserApi = request((id) => 'matching_user', {})

// 用户认领血糖测量记录
export const matchingUserBsApi = requestBs((id) => 'matching_user', {})


