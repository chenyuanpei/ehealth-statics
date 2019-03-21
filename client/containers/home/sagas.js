import {replace} from 'react-router-redux'
import {fork, take, put, call, select} from 'redux-saga/effects'
import moment from 'moment'
// const
import {CREATE_MEMBER_ID} from '../../const/member'
// actions
import {
  PAGE_HOME_INIT_REQUEST,
  HOME_MEMBER_SELECT,
  selectMember,
} from './actions'
import {login} from '../../actions/im'

// api
import {reportApi} from '../../apis/healthService/datacollectionRest'
// selectors
import {membersSelector, memberSelector, doctorsSelector, loadedSelector} from './selectors'
import {accountMembersSelector} from '../../selectors/data/member'
// sagas
import {getAccountMembers, getSubscribeMembers, getMemberSubscribeCount} from '../../sagas/data/member'

import {getMyAccount} from '../../sagas/data/account'
import {getStatPatientRequest} from '../../sagas/data/statPatient'

import {getAccountMerge, getMergeNullMember} from '../../sagas/data/accountMerge'
// 监听初始化
function * watchInit() {
  while (true) {
    let {payload: {memberId, id}} = yield take(PAGE_HOME_INIT_REQUEST)
    //合并主账号
    // try {
    //   const accountMerge = yield call(getAccountMerge)
    //   const memberCount = yield select(accountMembersSelector)
    //   if(!accountMerge.status && memberCount.size > 1) {
    //     yield put(replace({
    //       pathname: '/center/update'
    //     }))
    //     return false
    //   }else if (!accountMerge.status && memberCount.size === 1) {
    //     yield call(getMergeNullMember)
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
    //合并主账号结束
    const account = yield call(getMyAccount)
    yield [

      call(getAccountMembers),
      call(getSubscribeMembers),
    ]
    const {userId} = account
    // 埋点
    const menuUrl = window.location.href
    const timestamp = moment().format('x')
    let pram = {jsonData:{eventId:'click_menu',userId:userId,menuId:'home',menuUrl},timestamp,checksum:''}

    const members = yield select(membersSelector)
    if (!memberId || !members.some(member => member.id === memberId)) {
      // 如果 memberId不存在,或者  memberId存在 而且memberId 不等于"创建",但memberId不存在于当前所有成员
      if (members && members.size) {
        if(typeof(id) !== 'undefined') {
          memberId = id
        }else {

          memberId = account.id
        }

      } else {
        // 创建成员
        memberId = CREATE_MEMBER_ID
      }
    }

    yield put(selectMember(memberId))
    // 埋点请求
    yield call(reportApi,pram)
  }
}

// 监听 选择成员
function * watchSelectMember() {
  while (true) {
    try {
      let {payload: memberId} = yield take(HOME_MEMBER_SELECT)
      yield [
        call(handleLoadMemberData, memberId),
        // put(replace(`home/${memberId}`)),
      ]
    } catch (e) {
      console.error(e)
    }
  }
}

// 加载当前患者数据
function * handleLoadMemberData(memberId) {
  if (memberId !== CREATE_MEMBER_ID) {
    yield call(getStatPatientRequest,memberId)

  }
}

export default function * homeSaga() {
  yield fork(watchInit)
  yield fork(watchSelectMember)
}
