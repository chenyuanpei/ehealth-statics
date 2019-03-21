import {generateRequest} from '../request'
import {healthServer,publicDeviceService} from '../constant'

const request = generateRequest(`${publicDeviceService}/`)

//血糖认领接口请求
const requestOrgan = generateRequest(`${healthServer}/organ/`)

const requestCommon = generateRequest(`${healthServer}/common/`)

// request = {
//   "serverId": "string"
// }
export const suggestVoiceUrlApi = request(({recordId}) =>'suggest_voice_url?recordId='+recordId, {method: 'get'})

// 公共设备关联医生列表
export const getPublicDeviceDoctorApi = requestOrgan('get_device_doctors', {})
// 机构介绍

export const getOrganApi = requestOrgan('get_organ', {})

export const getWeightSuggest = requestCommon((data) => 'weight_suggest?bmi='+data.bmi+'&userId='+data.userId+'&weightRecordId=' + data.weightRecordId, {method:'get'})

// 获取血压测量建议
export const getBpSuggestDataApi = requestCommon((level) => 'bloodpressure_suggest?level=' + level, {method: 'get'})

// 根据公用设备ID查询机构信息
export const getInOrganDataApi = requestOrgan((deviceId) => 'get_organ_with_public_deviceId?deviceId=' + deviceId, {method: 'get'})


