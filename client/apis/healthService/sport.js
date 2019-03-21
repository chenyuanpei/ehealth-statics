import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`sport_service/sport/weixin/`)

export const getLatestPedometerRecord = request('getLatestPedometerRecord', {
  //mock:{
  //  data:()=>JSON.parse('{"code":200,"msg":"成功","data":{"pedometerRecordDay":{"id":"8107ef5fbc204006b90ba795a7f1bb82","autoid":73406023,"measurementTime":"2017-01-11 06:51:00","userId":4086697,"deviceId":"M_7B0BDFA118C15FD1B62853EBD23B160503042003","step":2556,"calories":79.89,"distance":1487.00,"dataSource":3,"created":"2016-12-23 08:21:04","updated":1482459127801,"active":1}}}')
  //}
})

export const getTargetStep = request('getTargetStep', {
})

export const queryPedometerRecordsHourly = request('queryPedometerRecordsHourly', {
  //mock:{
  //  data:()=>JSON.parse('{"code":200,"msg":"成功","data":{"ts":1482474347169,"firstTs":1466611200000,"pedometerRecordHourlyList":[{"id":"82016cd35db642a992fce59ed06f35cb","userId":4086697,"deviceId":"M_7B0BDFA118C15FD1B62853EBD23B160503042003","measurementTime":"2016-12-23 00:00:00","step":"0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0","calories":"0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,68.34,79.89,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00","distance":"0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1302.00,1487.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00","dataSource":3,"created":"2016-12-23 08:21:04","active":1,"updated":1482459127820}]}}')
  //}

})

export const queryPedometerRecordDayByCount = request('queryPedometerRecordDayByCount', {
})

export const queryPedometerRecordDay = request('queryPedometerRecordDay', {
})

