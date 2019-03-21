import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`sleep_service/sleep/health/weixin/`)

export const getSleepRecordsByCount = request('getSleepRecordsByCount', {
})

export const getDaySleepRecords = request('getDaySleepRecord', {
  //mock:{
  //  data:()=>JSON.parse('{"code":200,"msg":"成功","data":{"shllowSleepHoursM":345,"yValues":"10,25,40,5,25,20,60,20,5,45,30,30,15,60,5,15,15,40","analysisDate":1480639199000,"deepSleepHoursM":120,"sleepHoursM":465,"dataPrevious":false,"getupTime":1480639199000,"xLabels":"2,3,2,3,2,3,2,2,3,2,3,2,3,2,3,2,3,2","daySetTwDate":null,"awakeningHoursM":0,"sleepTime":1480611299000,"daySetTsDate":null,"firstAnalysisDate":1445986800000}}')
  //}
})

