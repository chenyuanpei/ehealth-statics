import {generateRequest} from '../request'
import {temperatureService} from '../constant'
// 温度接口
const request = generateRequest(`${temperatureService}/`)

// 根据ID获取一条温度记录
export const getTemperatureByIdApi = request((id) => '' + id, {method: 'get'})

//新增温度测量记录
export const addTemperatureRecordApi = request('add_record', {

})

//删除温度测量记录
export const deleteTemperatureRecordApi = request((id) => 'delete_record/'+ id, {

})

//获取最新7条温度测量记录
export const getLastRecordApi = request((data) => 'get_last_records/'+ data.userId+'?count='+data.count, {method: 'get'})

//获取温度测量历史记录
export const getHistoryRecordApi = request('get_history_records/', {})

//修改温度记录
export const updateRecordApi = request('update_record/', {})












