import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`healthoperation_service/`)

//获取排行榜
export const getUserRanks = request('fitness/get_user_ranks', {
  //mock:{
  //  data:()=>JSON.parse('{"code":200,"msg":"成功","data":[{"userId":4},{"userId":5},{"userId":6},{"userId":6}]}')
  //},
  showToast:1
})

//获取当前用户排名
export const getCurrentUserRank = request('fitness/get_user_rank', {
  showToast:1
})

//获取用户历史记录
export const getHistoryInfo = request('fitness/get_history_info', {

})

//投票
export const voteApi = request('fitness/vote', {

})

//当前用户封面
export const pictureApi = request('fitness/picture', {
  method:'get',
})

//当前其他用户封面
export const pictureOtherApi = request((data)=>'fitness/user/userId?userId='+data.userId, {
  method:'get',
})

//上传图片
export const uploadImgApi = request('fitness/upload_img', {

})

//添加收货地址
export const receiverUpdateApi = request('fitness/receiver/update', {

})

//获取收货地址
export const receiverDetailApi = request((data)=>'fitness/receiver/detail?priceType='+data.priceType + '&activityId='+ data.activityId, {
  method:'get',
})

//获取活动是否结束
export const checkExpireApi = request('fitness/check_expire', {

})
