// 获取主账号合并状态
export const GET_ACCOUNT_MERGE_REQUEST = Symbol('GET_ACCOUNT_MERGE_REQUEST')
export const GET_ACCOUNT_MERGE_SUCCESS = Symbol('GET_ACCOUNT_MERGE_SUCCESS')
export const GET_ACCOUNT_MERGE_FAILURE = Symbol('GET_ACCOUNT_MERGE_FAILURE')

// 还没有成员请求接口的状态getMergeNullMemberApi
export const GET_MERGE_NULL_MEMBER_REQUEST = Symbol('GET_MERGE_NULL_MEMBER_REQUEST')
export const GET_MERGE_NULL_MEMBER_SUCCESS = Symbol('GET_MERGE_NULL_MEMBER_SUCCESS')
export const GET_MERGE_NULL_MEMBER_FAILURE = Symbol('GET_MERGE_NULL_MEMBER_FAILURE')

// 还没有创建主账号，新建一个主账号getMergeNewMemberApi
export const GET_MERGE_NEWMEMBER_REQUEST = Symbol('GET_MERGE_NEWMEMBER_REQUEST')
export const GET_MERGE_NEWMEMBER_SUCCESS = Symbol('GET_MERGE_NEWMEMBER_SUCCESS')
export const GET_MERGE_NEWMEMBER_FAILURE = Symbol('GET_MERGE_NEWMEMBER_FAILURE')

// 选择现有成员合并getMergeMemberApi
export const GET_MERGE_MEMBER_REQUEST = Symbol('GET_MERGE_MEMBER_REQUEST')
export const GET_MERGE_MEMBER_SUCCESS = Symbol('GET_MERGE_MEMBER_SUCCESS')
export const GET_MERGE_MEMBER_FAILURE = Symbol('GET_MERGE_MEMBER_FAILURE')