import {select} from 'redux-saga/effects'
import {callApi} from '../api'

// actions
import {
  GET_ACCOUNT_MERGE_REQUEST,
  GET_ACCOUNT_MERGE_SUCCESS,
  GET_ACCOUNT_MERGE_FAILURE,
  GET_MERGE_NULL_MEMBER_REQUEST,
  GET_MERGE_NULL_MEMBER_SUCCESS,
  GET_MERGE_NULL_MEMBER_FAILURE,
  GET_MERGE_NEWMEMBER_REQUEST,
  GET_MERGE_NEWMEMBER_SUCCESS,
  GET_MERGE_NEWMEMBER_FAILURE,
  GET_MERGE_MEMBER_REQUEST,
  GET_MERGE_MEMBER_SUCCESS,
  GET_MERGE_MEMBER_FAILURE,
} from '../../actions/data/accountMerge'

// selectors
import {myAccountMergeSelector} from '../../selectors/data/accountMerge'

// apis
import {
  getAccountMergeApi,
  getMergeNullMemberApi,
  getMergeNewMemberApi,
  getMergeMemberApi,
} from '../../apis/healthService/accountMerge'

import {ACCOUNTMERGE} from '../../schemas'

// 获取主账号合并状态
export function * getAccountMerge() {
  return yield callApi({
    types: [
      GET_ACCOUNT_MERGE_REQUEST,
      GET_ACCOUNT_MERGE_SUCCESS,
      GET_ACCOUNT_MERGE_FAILURE,
    ],
    api: getAccountMergeApi,
    schema: ACCOUNTMERGE,
  })
}

export function * getMergeNullMember() {
  return yield callApi({
    types: [
      GET_MERGE_NULL_MEMBER_REQUEST,
      GET_MERGE_NULL_MEMBER_SUCCESS,
      GET_MERGE_NULL_MEMBER_FAILURE,
    ],
    api: getMergeNullMemberApi,
    schema: ACCOUNTMERGE,
  })
}

export function * getMergeMember(memberId) {
  return yield callApi({
    types: [
      GET_MERGE_MEMBER_REQUEST,
      GET_MERGE_MEMBER_SUCCESS,
      GET_MERGE_MEMBER_FAILURE,
    ],
    data:{
      memberId:memberId
    },
    api: getMergeMemberApi,
    schema: ACCOUNTMERGE,
  })
}


export function * getMergeNewMember(member) {
  return yield callApi({
    types: [
      GET_MERGE_NEWMEMBER_REQUEST,
      GET_MERGE_NEWMEMBER_SUCCESS,
      GET_MERGE_NEWMEMBER_FAILURE,
    ],
    data: member,
    api: getMergeNewMemberApi,
    schema: ACCOUNTMERGE,
  })
}
