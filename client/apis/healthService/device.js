import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/device/`)

// 查询帐户下的设备数量
export const getDeviceCountApi = request('get_device_count', {})

// 查询帐户下的设备列表 /device/get_device_member
export const getDevicesApi = request('get_device_member', {
  // mock: {
  //  data: () => JSON.parse('{"code":200,"msg":"成功","data":[{"deviceId":"b80805406180","remark":"网关1","devicePicture":"https://rest-jk.lifesense.com/static/common/img/i5_device.png","saleModel":"GPRS血压计i5","deviceName":"电子血压计","deviceModel":"i5"}]}')
  // }
})

// 绑定设备add_device
export const addDeviceApi = request('add_device', {})

// 根据二维码查询设备
export const getDeviceByQrcodeApi = request('get_device_byqrcode', {})

// 根据id查询设备
export const getDeviceByIdApi = request('get_device', {})

// 删除设备
export const deleteDeviceApi = request('delete_device', {})

// 修改设备备注
export const updateRemarkApi = request('update_device_remark', {})

// 获取设备绑定的用户 /device/get_binded_members
export const getDeviceUserApi = request('get_binded_members', {})
// mock: {
// data: () => JSON.parse('{"code":200,"msg":"成功","data":[{"memberId": "9a76ce8d99dc4f839cf3590253e25ee4","userNo": 1,"name": "爸爸111","nickname": "爸爸爸","sex": 1},{"memberId": "b1c127129d2e4271ad71a34c80132f2e", "userNo": 2, "name": "妈妈", "nickname": "妈妈sef", "sex": 2}]}')}

// 绑定设备成员
export const bindDeviceUserApi = request('bind_device_member', {})

// 解绑设备成员 /device/unbind_device_member
export const unbindDeviceUserApi = request('unbind_device_member', {})

// 找回设备
export const findBackDeviceApi = request('findback_device', {})

// 推送配置wifi成功通知
export const configWifiApi = request('send_wifi_right_notice', {})

// 新增一键联系人
export const addLinkmanApi = request('add_call_linkman', {})

// 获取一键联系人列表
export const getLinkmansApi = request('get_call_linkmans', {})

// 根据id查询一键联系人
export const getLinkmanByIdApi = request('get_call_linkman_byid', {})

// 删除一键联系人
export const deletelinkmanApi = request('delete_call_linkman', {})

// 通过主键查询用户是否同意ota升级
export const findOtaByidApi = request('find_ota_byid', {})

// 是否同意ota升级
export const otaOpinionApi = request('ota_opinion', {})

// 更新设备一键呼叫联系人
export const updateLinkManApi = request('update_call_linkman', {})

// 获取测量提醒设置 /device/get_measure_reminds
export const getMeasureRemindApi = request('get_measure_reminds', {})

// 保存并下发测量提醒设置 /device/send_measure_reminds
export const sendMeasureRemindApi = request('send_measure_reminds', {})

// 语音历史记录
// request = {
//   "deviceId": "string",
//   "created": "2016-09-08T01:13:59.071Z",
//   "count": 0
// }
export const getDeviceVoicesApi = request('get_device_voices')

// 更新语音的mediaid
// request = {id}
export const updateVoiceMediaIdApi = request('update_voice_mediaid')

// 语音标识已读
// request = {id}
export const markVoiceReadedApi = request('mark_voice_readed')
// 获取省电模式
// 获取省电模式
// request = {
// "deviceId": "string"
// }
export const getPowerModeApi = request('get_device_power_saving')
// 获取省电模式
// request = {
// "id": "string",
//   "deviceId": "string",
//   "userId": 0,
//   "start": "string",
//   "end": "string",
//   "model": 0
// }
export const savePowerModeApi = request('save_device_power_saving')
// 认领人员信息
export const getClaimDeviceInfoApi = request('get_claim_device_info',{
  //
  // mock: {
  //  data: () => JSON.parse('{"code":200,"msg":"成功","data":{"deviceId": 0,"userId": 0,"status": 0,"communicationType": 0,"deviceUserInfos":[{"userId": 0,"memberId": "string","headImgurl": "string","nickname": "string","name": "string","sex": 0,"userNo": 0}]}}')
  // }
})

// 认领成员绑定设备
export const claimMemberBindApi = request('claim_member_bind_device',{})
// 体重秤单位选择
export const updateDeviceUnit = request('update_device_unit',{})
// 绑定设备情况
export const listDeviceForUser = request((data)=>'list_device_for_user/'+data.userId,{method:'get'})


