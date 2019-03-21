import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`weight_service/wechat/`)


const requestHealth = generateRequest(`weight_service/health/wechat/`)
const requestWeightData = generateRequest(`health_service/weight/`)

export const getLatestSevenRecord = requestHealth('getLatestSevenRecord', {
   //mock: {
   // data: () => JSON.parse('{"code":200,"msg":"成功","data":{"lastSevenWeight":[{"id":"cc87cabe30584ce48e47c7606209ac20","userId":4086697,"weight":66.0,"bmi":29.73,"measurementDate":"2016-11-30 09:58:27","deviceId":"","ip":"","clientId":"170425f8eab5f81396239c1f640e1e71","created":"2016-11-30 09:58:33","updated":1480471112695,"deleted":0},{"id":"f106aaf7da3f48b8a2b929e033722183","userId":4086697,"weight":63.0,"bmi":28.38,"measurementDate":"2016-11-30 09:58:19","deviceId":"","ip":"","clientId":"170425f8eab5f81396239c1f640e1e71","created":"2016-11-30 09:58:23","updated":1480471103481,"deleted":0},{"id":"d0cb3d24805941999ad555e24d0016b2","userId":4086697,"weight":62.0,"bmi":27.93,"measurementDate":"2016-11-30 09:58:12","deviceId":"","ip":"","clientId":"170425f8eab5f81396239c1f640e1e71","created":"2016-11-30 09:58:18","updated":1480471097821,"deleted":0},{"id":"610072d30f244319bdd43c17656fe193","userId":4086697,"weight":65.0,"bmi":29.28,"measurementDate":"2016-11-30 09:58:04","deviceId":"","ip":"","clientId":"170425f8eab5f81396239c1f640e1e71","created":"2016-11-30 09:58:08","updated":1480471088297,"deleted":0},{"id":"f6c24d1fba924a468cd2fc150ba069a2","userId":4086697,"weight":60.2,"bmi":18.0,"pbf":33.0,"muscle":15.0,"bone":2.9,"water":100.0,"measurementDate":"2016-11-17 20:15:11","deviceId":"400210302d76","deviceUserNo":0,"ip":"172.16.13.193","resistance50k":567.3,"clientId":"1e1bccf0cab94335922281d4f00d6e69","created":"2016-11-17 20:15:15","updated":1479384925054,"deleted":0},{"id":"988f5de5fdd64cb48eee7dcd2c9ae330","userId":4086697,"weight":7.9,"bmi":31.6,"pbf":0.0,"muscle":0.0,"bone":0.0,"water":0.0,"measurementDate":"2016-11-17 20:11:50","deviceId":"","deviceUserNo":0,"ip":"ip","resistance50k":0.0,"resistance5k":0.0,"clientId":"1e1bccf0cab94335922281d4f00d6e69","created":"2016-11-17 20:11:51","updated":1479384729813,"deleted":0},{"id":"82415d6e6e6f4ac6b1813df03d3f88cc","userId":4086697,"weight":35.9,"bmi":14.94,"pbf":0.0,"muscle":0.0,"bone":0.0,"water":0.0,"measurementDate":"2016-11-04 11:17:03","deviceId":"9502080118a4","deviceUserNo":1,"resistance50k":0.0,"resistance5k":0.0,"created":"2016-11-04 11:17:18","updated":1478229437730,"deleted":0}]}}')
   //}
})

export const getLatestRecord = requestWeightData('getLatestRecord', {
})

export const getRecordsList = requestHealth('getRecordsList', {
  //mock:{
  //  data:() => JSON.parse('{"code":200,"msg":"成功","data":{"weightList":[{"id":"9f9f443bdb494e3a9703fec78431144b","userId":1006291,"weight":40.0,"bmi":12.77,"measurementDate":"2016-12-07 18:21:26","created":"2016-12-07 18:21:26","updated":1481106085675,"deleted":0},{"id":"dfaabc097c2d4e3088c4b05c6347450a","userId":1006291,"weight":48.0,"bmi":15.32,"measurementDate":"2016-12-07 18:21:18","created":"2016-12-07 18:21:18","updated":1481106077985,"deleted":0},{"id":"76e9adaffb8142d2a58c8515c1bbd37b","userId":1006291,"weight":65.0,"bmi":20.75,"measurementDate":"2016-12-07 18:21:10","created":"2016-12-07 18:21:10","updated":1481106070099,"deleted":0},{"id":"7cbb4e0ae34648548ed4434785aeab27","userId":1006291,"weight":61.0,"bmi":19.47,"measurementDate":"2016-12-07 18:20:56","created":"2016-12-07 18:20:56","updated":1481106055640,"deleted":0},{"id":"064378966aa741d3a82b3e80d2701dcf","userId":1006291,"weight":59.0,"bmi":18.83,"measurementDate":"2016-12-07 18:20:52","created":"2016-12-07 18:20:52","updated":1481106052366,"deleted":0},{"id":"5343b9d4cb8f4977bc33bff592a04468","userId":1006291,"weight":60.0,"bmi":19.15,"measurementDate":"2016-12-07 18:20:49","created":"2016-12-07 18:20:49","updated":1481106048976,"deleted":0},{"id":"d1bf2b41d8a0459b82dff05258cd5d28","userId":1006291,"weight":59.0,"bmi":18.83,"measurementDate":"2016-12-07 18:20:46","created":"2016-12-07 18:20:46","updated":1481106045708,"deleted":0},{"id":"95d8d6a29aaf49c48a823efbe8fbe3ec","userId":1006291,"weight":60.0,"bmi":19.15,"measurementDate":"2016-12-07 12:04:32","created":"2016-09-29 12:04:32","updated":1475121871667,"deleted":0}],"firstTs":1475121872000}}')
  //}
})

export const getAllRecords = requestHealth('getAllRecordsByUser', {
})

export const deleteRecordsByIds = request('deleteRecordsByIds', {
})

export const getRecordsByIds = request('getRecordsByIds', {
})


const requestDevice = generateRequest(`device_service/device_info/`)
const requestWeight = generateRequest(`health_service/weight/`)
const requestOrgan = generateRequest(`health_service/organ/`)

export const getDeviceDetails = requestDevice('getDeviceDetails', {
})

export const addWeightRecordApi = requestWeight('add_weight_record', {
})
export const matchingUserWeightApi = requestWeight('matching_user', {
})
export const getWeightRecordByIdApi = requestWeight((data)=>'get_weight/'+data.weightId, {method: 'get'})
export const getWeightReportApi = requestWeightData((data)=>'get_weight_report/'+data.weightId, {method: 'get'})
export const getdeviceOrganInfoApi = requestWeightData((data)=>'deviceOrganInfo/'+data.deviceId, {method: 'get'})


//根据机构id，查询用户体重的当前排名
export const getCurrentUserWeightRankAPi = requestOrgan('get_current_user_weight_rank', {
})

//根据机构id，查询用户体重排名
export const getUserWeightRankApi = requestOrgan('get_user_weight_rank', {
})


