import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/account_merge/`)
// 获取主账号合并状态
export const getAccountMergeApi = request('merge_status', {
  // mock: {
  //   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":{"status":false}}'))
  // }
})
// 我的成员为空时，直接合并
export const getMergeNullMemberApi = request('merge_null_member', {
  // mock: {
  //   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":{"status":false}}'))
  // }
})

// 选择新成员合并
export const getMergeNewMemberApi = request('merge_new_member', {
  // mock: {
  //   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":{"status":false}}'))
  // }
})


// 选择现有成员合并
export const getMergeMemberApi = request('merge_member', {
  // mock: {
  //   data: (req) => (JSON.parse('{"code":200,"msg":"成功","data":{"status":false}}'))
  // }
})

