import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/point/`)

// 获取总积分
export const getTotalPointApi = request((data) => `get_total_point?userId=`+data.userId, {method: 'get'})
export const getPointCompleteProgressApi = request((data) => `get_point_complete_progress?userId=`+data.userId, {method: 'get'})
export const getPointHistoryApi = request((data) => `get_point_history?userId=`+data.userId+`&count=`+data.count+`&endTime=`+data.endTime, {method: 'get'})
export const getPointStatusChangeApi = request((data) => {
    if(data.beginTime){
      return `get_point_status_change?userId=`+data.userId+`&beginTime=`+data.beginTime
    }else{
      return `get_point_status_change?userId=`+data.userId
    }
  }, {method: 'get'})

