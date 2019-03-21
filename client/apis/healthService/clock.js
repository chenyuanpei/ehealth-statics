import {generateRequest} from '../request'
import {healthoperationService} from '../constant'

const request = generateRequest(`${healthoperationService}/`)
// 获取打卡记录
export const getRecordApi = request((data)=>'getRecord?userId='+data.userId+'&start='+data.start+'&end='+data.end, {method:'get'})
// 获取地址
export const getAeliveryAddressApi = request((data)=>'getAeliveryAddress?userId='+data.userId, {method:'get'})
// 获取连续打卡天数
export const getContinuousMeasureDaysApi = request((data)=>'getContinuousMeasureDays?userId='+data.userId, {method:'get'})
// 参加血压打卡活动,返回当前打卡状态
export const joinApi = request((data)=>'join?userId='+data.userId, {})

// 提交地址
export const commitAeliveryAddressApi = request('commitAeliveryAddress', {})






