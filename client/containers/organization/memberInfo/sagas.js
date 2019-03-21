import Immutable from 'immutable'
import {replace, push} from 'react-router-redux'
import {fork, take, put, call, select} from 'redux-saga/effects'

// actions
import {
  MEMBER_INFO_INIT_REQUEST,
  MEMBER_INFO_PAGE_SAVE,
  UPDATE_NICKNAME_REQUEST,
  changeMember,
  showResult,
} from './actions'
//apis
import {saveMember, getMemberById} from '../../../sagas/data/member'
// sagas
import {updateAccountNickName} from '../../../sagas/data/account'
// selectors
import {memberSelector} from './selectors'
import {getMyAccount} from '../../../sagas/data/account'
// 监听初始化
function * watchInit() {
  while (true) {
     const {payload: {memberId}} = yield take(MEMBER_INFO_INIT_REQUEST)
    let member
    if(!memberId){
      const account = yield call(getMyAccount)
       member = yield call(getMemberById, account.id)
    }else{
       member = yield call(getMemberById,memberId)
    }


    yield put(changeMember({...member}))
  }
}
// 监听保存信息
function * watchSave() {
  while (true) {
    const  {payload: deviceId} = yield take(MEMBER_INFO_PAGE_SAVE)
    let member = yield select(memberSelector)

    try{
      member = yield call(saveMember, {...member,deviceId, manager: true}) // 创建时，初始化manager为true，能修改的成员都是我管理的成员
      if(deviceId !== 'manual'){
        WeixinJSBridge.call('closeWindow')
        // yield put(showResult(true))
      }else{
        yield put(replace(`/weight/${member.id}/add`))
      }

    }catch (e){
      console.log(e)
    }


  }
}
// 监听修改昵称
function * watchUpdateNickName() {
  while (true) {
    const {payload: nickname} = yield take(UPDATE_NICKNAME_REQUEST) // 取出变化的数据
    yield call(updateAccountNickName, nickname) // 将新的nickname传给
  }
}


export default function * editSaga() {
  yield fork(watchInit)
  yield fork(watchSave)
  yield fork(watchUpdateNickName)
}
