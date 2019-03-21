import uuid from 'uuid'
import browserCookies from 'browser-cookies'
import axios from 'axios'
import { createAction } from 'redux-actions'
import { put, select, call } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { callApi } from '../api'

// actions
import { merge } from '../../actions/entities'
import {
  ACCOUNT_MEMBERS_REQUEST,
  ACCOUNT_MEMBERS_SUCCESS,
  ACCOUNT_MEMBERS_FAILURE,
  SUBSCRIBE_MEMBERS_REQUEST,
  SUBSCRIBE_MEMBERS_SUCCESS,
  SUBSCRIBE_MEMBERS_FAILURE,
  UPDATE_SUBSCRIBE_MEMBERS_SUCCESS,
  MEMBER_SUBSCRIBE_COUNT_REQUEST,
  MEMBER_SUBSCRIBE_COUNT_SUCCESS,
  MEMBER_SUBSCRIBE_COUNT_FAILURE,
  SAVE_MEMBER_REQUEST,
  SAVE_MEMBER_SUCCESS,
  SAVE_MEMBER_FAILURE,
  GET_MEMBER_BY_ID_REQUEST,
  GET_MEMBER_BY_ID_SUCCESS,
  GET_MEMBER_BY_ID_FAILURE,
  GET_MEMBER_COUNT_REQUEST,
  GET_MEMBER_COUNT_SUCCESS,
  GET_MEMBER_COUNT_FAILURE,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILURE,
  UNBIND_SUB_MEMBER_REQUEST,
  UNBIND_SUB_MEMBER_SUCCESS,
  UNBIND_SUB_MEMBER_FAILURE,
} from '../../actions/data/member'

// selectors
import {
  accountMembersSelector,
  subscribeMembersSelector,
  createMemberSelector,
  memberCountSelector
} from '../../selectors/data/member'

// apis
import {
  getMembersApi,
  getSubscribeMembersApi,
  getSubscribeCountApi,
  saveMemberApi,
  getMemberByIdApi,
  getmemberCountApi,
  deleteMemberByIdApi,
  unbindSubMemberByIdApi,
  getAccountApi
} from '../../apis/healthService/account'

// schemas
import { MEMBER, MEMBER_ARRAY, DOCTOR_ARRAY, ASSISTANT_ARRAY } from '../../schemas'

const accountMemberRequest = createAction(ACCOUNT_MEMBERS_REQUEST)
const accountMemberSuccess = createAction(ACCOUNT_MEMBERS_SUCCESS, null, () => ({ schema: MEMBER_ARRAY }))
const accountMemberFailure = createAction(ACCOUNT_MEMBERS_FAILURE)

// 获取当前帐号的成员集合
export function* getAccountMembers() {
  let accountMembers = yield select(accountMembersSelector)

  if (accountMembers) {
    return accountMembers
  }

  try {
    yield put(accountMemberRequest())
    accountMembers = yield call(getMembersApi)

    let account = yield call(getAccountApi)
    if (accountMembers) {

      accountMembers.unshift(account)
    } else {
      accountMembers = [account]
    }

    const doctorsList = [] // 医生
    const assistantList = [] // 助理

    accountMembers.forEach(member => {
      // 标识该成员属于当前帐号所管理
      member.manager = true
      // 服务器返回字段为healthDoctors，转换为doctors
      const doctors = member.healthDoctors || []
      delete member.healthDoctors

      member.relations = doctors.map(doctor => {
        doctorsList.push(doctor)
        // tid
        const tid = doctor.tid
        delete doctor.tid
        // assistants
        const assistants = doctor.assistants || [] // TODO:服务器字段命名错误 assistents 应该为 assistants
        delete doctor.assistants

        const assistantIds = assistants.map(assistant => {
          assistantList.push(assistant)
          return assistant.id
        })

        return {
          doctorId: doctor.id,
          tid,
          assistantIds,
        }
      })
    })

    yield put(merge({ schema: DOCTOR_ARRAY, data: doctorsList }))
    yield put(merge({ schema: ASSISTANT_ARRAY, data: assistantList }))

    yield put(accountMemberSuccess(accountMembers))
    return accountMembers
  } catch (error) {
    console.error(error)
    yield put(accountMemberFailure())
    throw error
  }
  // const accountMembers = yield callApi({
  //   types: [ACCOUNT_MEMBERS_REQUEST, ACCOUNT_MEMBERS_SUCCESS, ACCOUNT_MEMBERS_FAILURE],
  //   api: getMembersApi,
  //   schema: MEMBER_ARRAY,
  //   formatResponse: (res = [], req) => res.map(v => {
  //     // TODO: 标识该成员属于当前帐号所管理
  //     v.manager = true
  //     return v
  //   }),
  // })
}

const updateSubMemberSuccess = createAction(UPDATE_SUBSCRIBE_MEMBERS_SUCCESS, null, () => ({ schema: MEMBER_ARRAY }))
// 我关注的成员集合
export function* getSubscribeMembers(obj) {
  let subscribeMembers = yield select(subscribeMembersSelector)
  if (obj) {
    // TODO: 如果是修改关注的成员备注，obj有值，执行以下操作
    const { memberId, remark } = obj
    const arr = subscribeMembers.map(v => {
      if (v.id === memberId) {
        return { ...v, remark: remark }
      }
      return v
    })
    yield put(updateSubMemberSuccess(arr.toArray()))
    return
  }
  if (subscribeMembers) {
    return subscribeMembers
  }
  return yield callApi({
    types: [SUBSCRIBE_MEMBERS_REQUEST, SUBSCRIBE_MEMBERS_SUCCESS, SUBSCRIBE_MEMBERS_FAILURE],
    api: getSubscribeMembersApi,
    schema: MEMBER_ARRAY,
  })
}

// 获取管理的成员数量
export function* getMemberCount() {
  let memberCount = yield select(memberCountSelector)
  if (memberCount !== null) {
    return memberCount
  }
  return yield callApi({
    types: [GET_MEMBER_COUNT_REQUEST,
      GET_MEMBER_COUNT_SUCCESS,
      GET_MEMBER_COUNT_FAILURE],
    api: getmemberCountApi,
  })
}

// 获取成员被关注数量
export function* getMemberSubscribeCount(memberId) {
  const member = yield select(createMemberSelector(() => memberId))

  // manager 是否我的成员
  if (!member.manager || member.inviteCount !== undefined) {
    return member.inviteCount
  }
  const { inviteCount } = yield callApi({
    types: [MEMBER_SUBSCRIBE_COUNT_REQUEST, MEMBER_SUBSCRIBE_COUNT_SUCCESS, MEMBER_SUBSCRIBE_COUNT_FAILURE],
    api: getSubscribeCountApi,
    schema: MEMBER,
    options: {
      formatData: (res, req) => ({
        id: memberId,
        inviteCount: res,
      })
    },
    data: {
      memberId
    }
  })

  return inviteCount
}

// 根据id获取成员
export function* getMemberById(memberId) {
  // const member = yield select(createMemberSelector(() => memberId))
  // if (member) {
  //   return member
  // }
  yield callApi({
    types: [GET_MEMBER_BY_ID_REQUEST, GET_MEMBER_BY_ID_SUCCESS, GET_MEMBER_BY_ID_FAILURE],
    api: getMemberByIdApi,
    schema: MEMBER,
    data: {
      memberId
    }
  })

  return yield select(createMemberSelector(() => memberId))
}

// 创建或保存成员
const saveMemberRequest = createAction(SAVE_MEMBER_REQUEST)
const saveMemberSuccess = createAction(SAVE_MEMBER_SUCCESS, null, () => ({ schema: MEMBER }))
const saveMemberFailure = createAction(SAVE_MEMBER_FAILURE)
export function* saveMember(member) {
  try {
    const isCreate = !member.id
    yield put(saveMemberRequest())
    const memberId = yield call(saveMemberApi, member)
    if (isCreate) {
      const newMember = yield call(getMemberById, memberId)
      member = {
        ...member,
        ...newMember
      }
    }
    yield put(saveMemberSuccess(member))

    console.log('saveMember', member)

    let lzSaveUser = async function () {

      let requesId = uuid.v4().replace(/-/g, '')

      var md5omatic = require('md5-o-matic')
      let signature = md5omatic("speed_" + requesId + "2")

      let lzSaveUserResponse = await axios.post(`http://lz-qa.hiwarp.cn:80/api-gateway/user-service/user/save_user?requestId=${requesId}&appType=2&signature=${signature}`, {
        "idCard": member.idCard,
        "medicalCard": member.medicalCard,
        "age": member.age,
        "birthday": member.birthday,
        "headImg": member.headImgurl,
        "height": member.height,
        "nickname": member.nickname,
        "sex": member.sex,
        "weight": member.weight
      }, {
          headers: {
            'Content-Type': 'application/json'
            , 'accessToken': lzAccessToken().access_token
          }
        })

      console.log('lzSaveUserResponse', lzSaveUserResponse)

    }

    lzSaveUser()

    return member
  } catch (res) {
    yield put(saveMemberFailure(res))
    throw res
  }
}

// 根据id删除成员
export function* delMemberById(memberId) {
  return yield callApi({
    types: [DELETE_MEMBER_REQUEST, DELETE_MEMBER_SUCCESS, DELETE_MEMBER_FAILURE],
    api: deleteMemberByIdApi,
    data: {
      memberId
    },
  })
}

// 根据成员id取消关注的成员
export function* unbindSubMemberById(memberId) {
  return yield callApi({
    types: [UNBIND_SUB_MEMBER_REQUEST, UNBIND_SUB_MEMBER_SUCCESS, UNBIND_SUB_MEMBER_FAILURE],
    api: unbindSubMemberByIdApi,
    data: {
      memberId
    },
  })
}

export function lzAccessToken() {
  let str = decodeURIComponent(browserCookies.get('lzAccessToken'))
  return str && str !== 'undefined' ? JSON.parse(str) : {}
}