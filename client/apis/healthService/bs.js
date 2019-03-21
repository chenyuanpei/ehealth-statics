import {generateRequest} from '../request'
import {bsService} from '../constant'
//血糖认领接口请求
const request = generateRequest(`${bsService}/`)

// 判定该血糖测量记录是否已认领 ，userId=0未认领
export const hasMatchingBsApi = request((id) => 'hasMatching/' + id, {method: 'get'})

//新增血糖测量记录
export const addBsRecordApi = request('add_record', {

})

// 删除血糖测量记录
export const delBsRecordsApi = request((recordId) => 'delete_record/' + recordId, {

})

// 获取某个用户某个时间段某个用餐状态的血糖测量活跃度
export const getBsActiveDegreeApi = request('get_active_degree', {

})


// 获取指定用户某段时间某个用餐状态的平均血糖记录（startTime:开始时间戳,endTime:结束时间戳,mealPeroid:用餐状态，必填）
export const getBsAverageRecordApi = request('get_average_record', {})

// 获取用户某天每小时的血糖平均值
export const getBsAverageHourRecordApi = request((data)=>'get_date_averagehour_records?userId='+data.userId+'&someDateTime='+data.someDateTime, {method: 'get'})


// 获取最近的一条记录
export const getBsDateLastRecordApi = request((data)=>'get_date_last_record/'+data.userId+'/'+data.someDateTime, {method: 'get'})

// 获取某个时间段(年、月、周、日)所有血糖的详细测量记录
export const getBsDetailRecordsApi = request('get_days_meal_peroid_last_record', {})

// 获取某个时间段(年、月、周、日)血糖最高测量记录
export const getBsHighestRecordApi = request('get_highest_record', {})

// 获取小于某个时间的历史测量记录降序(翻页查询使用)
export const getBsHistoryRecordsApi = request('get_history_Records', {})

// 获取某个时间段(年、月、周、日)血糖最低测量记录
export const getBsLowestRecordApi = request('get_lowest_record', {})


// 获取指定周期的历史平均记录
export const getBsRoundRecordsApi = request('get_meal_peroid_last_records', {})

// 修改血糖测量记录
export const getBsUpdateRecordApi = request('update_record', {

})

// 取最后一笔血糖数据
export const getBsLastRecord = request((data)=> 'get_last_record/' + data.userId, {method: 'get'})
// 获取每一天每一个用餐时间段的最后一笔血糖数据
export const getRecordPerMealAndDay = request((data)=> 'last_record_per_meal_and_day?userId=' + data.userId + '&beginTs='+data.beginTs+'&endTs='+data.endTs, {method: 'get'})

// 根据id血糖数据
export const getBsRecordById = request((id)=> '' + id, {method: 'get'})









