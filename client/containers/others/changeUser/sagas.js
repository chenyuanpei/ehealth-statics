// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
var md5hex = require('md5-hex')
// actions
import {
  CHANGE_USER_PAGE_LOAD_DATA_REQUEST,
} from './actions'
// api
import {changeUserCookieApi} from '../../../apis/healthService/changeUser'
// toast

function * watchLoadData() {
  while (true) {
    try {
      const {payload: {userId,hash}} = yield take(CHANGE_USER_PAGE_LOAD_DATA_REQUEST)
      let key = 'a4349cf9be43f4808d9a98a3207507a4'
      if(hash == key){
        let timestamp = new Date().getTime()
        let checksum = md5hex([timestamp, key])
        const {session} = yield call(changeUserCookieApi,{userId,timestamp,checksum,key})
        setUserCookie(session)
      }

    } catch (e) {
      console.log('服务器繁忙...')
    }
  }
}
function setUserCookie(session){
  var now=new Date();
  now.setDate(now.getDate()+10000000000);
  var cookies="session="+session+"; accessToken2=00e2da33aa7f4200813a0c9c00b3bf34;expires="+now.toString()+";path=/; domain=.lifesense.com";
  document.cookie=cookies;
}

export default function * claimDataSaga() {
  yield fork(watchLoadData)
}
