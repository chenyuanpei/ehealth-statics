import Immutable from 'immutable'
import {replace, push} from 'react-router-redux'
import {fork, take, put, call, select} from 'redux-saga/effects'
// util
import {toast} from '../../../util/toast'
// wxJsApi
import {chooseImage, uploadImage} from '../../../util/wxJs/wxApi'

// actions
import {
  PAGE_CENTER_EDIT_INIT_REQUEST,
  CHANGE_HEAD_IMAGE_REQUEST,
  UPDATE_NICKNAME_REQUEST,
} from './actions'

// sagas
import {getMyAccount, updateAccountNickName, updateAccountHeadImg} from '../../../sagas/data/account'

// 监听初始化
function * watchInit() {
  while (true) {
    yield take(PAGE_CENTER_EDIT_INIT_REQUEST)
    yield call(getMyAccount)
  }
}

// 监听修改昵称
function * watchUpdateNickName() {
  while (true) {
    const {payload: nickname} = yield take(UPDATE_NICKNAME_REQUEST) // 取出变化的数据
    yield call(updateAccountNickName, nickname) // 将新的nickname传给
  }
}

// 监听修改头像
function * watchUpdateHeadImage() {
  while (true) {
    yield take(CHANGE_HEAD_IMAGE_REQUEST)
    try {
      const serverId = yield call(chooseAndUploadImage) // 调jsapi获取serviceId
      // const serverId = 'gbJvfdoe9UhIzwljalC3WEAdqrUG0hk8rgSsBiESXnMl8dJv0k570buil1TEiPLI'
      yield call(updateAccountHeadImg, serverId) // 更新当前用户
    } catch (e) {
    }
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
    }, {count: 1})
  })
}

export default function * editSaga() {
  yield fork(watchInit)
  yield fork(watchUpdateHeadImage)
  yield fork(watchUpdateNickName)
}
