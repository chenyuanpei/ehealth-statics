import uuid from 'uuid'
import axios from 'axios'
import Immutable from 'immutable'
import { replace, goBack, push } from 'react-router-redux'
import { fork, take, put, call, select } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import browserCookies from 'browser-cookies'
// util
import { toast } from '../../../util/toast'
// wxJsApi
import { chooseImage, uploadImage } from '../../../util/wxJs/wxApi'
// const
import { defMembers, CREATE_MEMBER_ID } from '../../../const/member'
import { reLogin } from '../../../sagas/data/account'
import { login } from '../../../util/login'
// actions
import {
  MEMBER_DATA_PAGE_INIT,
  changeMember,
  MEMBER_DATA_PAGE_SAVE,
  MEMBER_DATA_EDIT_EDIT_HEADIMG,
  UPDATE_NICKNAME_REQUEST
} from './actions'

// selectors
import { memberSelector } from './selectors'
import { memberCountSelector } from '../../../selectors/data/member.js'

// sagas
import { updateAccountNickName, getMyAccount } from '../../../sagas/data/account'
import { saveMember, getMemberById } from '../../../sagas/data/member'
import { bindDeviceUser } from '../../../sagas/data/device'
import { getMergeNewMember } from '../../../sagas/data/accountMerge'
// apis
import { uploadImgApi, uploadImgV2Api } from '../../../apis/healthService/common'
import { getBySubscribersApi } from '../../../apis/healthService/account'

// 监听初始化
function* watchInit() {
  while (true) {
    let { payload: { id: memberId, memberType } } = yield take(MEMBER_DATA_PAGE_INIT)
    let member
    // id == 'create'时，根据memberType从defMembers中获取默认值
    let subscribers = null
    if (memberId !== CREATE_MEMBER_ID) {
      subscribers = yield call(getBySubscribersApi, { memberId })
    }

    if (memberId === CREATE_MEMBER_ID) {
      member = defMembers[memberType || 0]
      if (memberType - 0 === 0) { // memberType == 0 的时候，使用account的头像、昵称
        const account = yield call(getMyAccount)

        member = {
          ...member,
          nickname: account.nickname,
          headImgurl: account.headImgurl,
        }
      }
    } else {
      // 不是创建页面，加载成员信息
      member = yield call(getMemberById, memberId)
    }
    if (subscribers) {
      member = {
        ...member,
        inviteCount: subscribers.length
      }
    }

    yield put(changeMember({ ...member }))
  }
}

// 监听保存信息
function* watchSave() {
  while (true) {
    let { payload: { redirect, deviceId, userNo, mergeaccount } } = yield take(MEMBER_DATA_PAGE_SAVE)

    let member = yield select(memberSelector)

    if (!member.nickname || !member.nickname.trim().length) {
      toast('请填写昵称...')
      return
    }
    if (!member.sex) {
      toast('请填写性别...')
      return
    }
    if (!member.idCard) {
      toast('请填写身份证号...')
      return
    }
    if (!member.medicalCard) {
      toast('请填写医保卡号...')
      return
    }
    if (!member.weight) {
      toast('请选择体重...')
      return
    }
    if (!member.birthday) {
      toast('请选择出生...')
      return
    }
    if (!member.height) {
      toast('请选择身高...')
      return
    }
    if (!member.waistline) {
      toast('请选择腰围...')
      return
    }
    const account = yield call(getMyAccount)
    if (mergeaccount - 1 === 0) {
      member.id = account.id
      try {
        mergeaccount = yield call(getMergeNewMember, { ...member })
        // const LOGIN_DATA_KEY = '___LOGIN_DATA'
        // let openId = JSON.parse(window.localStorage.getItem(LOGIN_DATA_KEY)).openId
        // let code =JSON.parse(window.localStorage.getItem(LOGIN_DATA_KEY)).code

        // window.localStorage.removeItem(LOGIN_DATA_KEY)
        //
        // if(typeof(openId) !== 'undefined'){
        //   window.location.href = "//" + window.location.hostname + "/health/#/home?openId=" + openId + '&mergeId=' + member.id
        // }else if(typeof(code) !== 'undefined'){
        //   window.location.href = "//" + window.location.hostname + "/health/#/home?code=" + code+ '&mergeId=' + member.id
        // }
        // const LOGIN_DATA_KEY = '___LOGIN_DATA'
        // window.localStorage.removeItem(LOGIN_DATA_KEY)

        browserCookies.erase('session', { domain: '.lifesense.com' })
        // yield call(reLogin, '/health/#/home?memberId='+member.id)
        login()
      } catch (e) {
        toast(e.msg)
      }
      return
    }
    member = yield call(saveMember, { ...member, manager: true }) // 创建时，初始化manager为true，能修改的成员都是我管理的成员
    if (!redirect) {
      yield put(goBack())
    } else {
      const redirectUrl = decodeURIComponent(redirect).replace(':memberId', member.id)
      if (redirectUrl == 'doctorTeam/buy') {
        localStorage.setItem('doctorTeamBuyMemberId', member.id)
        yield put(goBack())
      } else {
        yield put(goBack())
        yield put(replace(redirectUrl))
      }
    }
  }
}

function* watchEditHeadimg() {
  yield* takeLatest(MEMBER_DATA_EDIT_EDIT_HEADIMG, editHeadimg)

}

// 监听修改昵称
function* watchUpdateNickName() {
  while (true) {
    const { payload: nickname } = yield take(UPDATE_NICKNAME_REQUEST) // 取出变化的数据
    yield call(updateAccountNickName, nickname) // 将新的nickname传给
  }
}

function* editHeadimg(data) {
  let base64Img = data.payload.base64Img
  // let {payload: {base64Img}} = yield take(MEMBER_DATA_EDIT_EDIT_HEADIMG)
  try {
    // const serverId = yield call(chooseAndUploadImage)
    // const headImgurl = yield call(uploadImgApi, {serverId})
    // const member = yield select(memberSelector)
    // yield put(changeMember({...member, headImgurl}))
    const headImgurl = yield call(uploadImgV2Api, { id: base64Img })
    const member = yield select(memberSelector)
    yield put(changeMember({ ...member, headImgurl }))
  } catch (e) {
    console.error('修改头像失败', e)
  }
}

function chooseAndUploadImage() {
  return new Promise((resolve, reject) => {
    chooseImage((localId) => {
      if (localId.length !== 1) {
        toast('请选择一张图片...')
        reject()
      }
      uploadImage({
        success: (i, serverId) => {
          resolve(serverId)
        },
        fail: (res) => {
          toast('服务器繁忙！')
          reject()
        }
      })
    }, { count: 1 })
  })
}

export default function* memberDataSaga() {
  yield fork(watchInit)
  yield fork(watchEditHeadimg)
  yield fork(watchSave)
  yield fork(watchUpdateNickName)
}

export function lzAccessToken() {
  let str = decodeURIComponent(browserCookies.get('lzAccessToken'))
  return str && str !== 'undefined' ? JSON.parse(str) : {}
}