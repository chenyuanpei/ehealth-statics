import Im from './Im'
import {im} from '../../config'
import {getAccount} from '../../apis/healthService/im'

// im缓存
const imsCache = {}

// 获取im
export const getIm = (id) => {
  let im = imsCache[id]
  if (!im) {
    im = imsCache[id] = new Im()
  }

  return im
}

const getLoginInfo = async(id) => {
  const account = await getAccount({
    userType: 1, // 账户类型，如 0医生,1患者,2助理,
    userId: id, // 账户id
  })
  return {
    sdkAppID: im.sdkAppId,
    accountType: im.accountType,
    identifier: account.accid,
    userSig: account.token,
  }
}
//登出
export const imLogout = async(id) => {
  const account = await getAccount({
    userType: 1, // 账户类型，如 0医生,1患者,2助理,
    userId: id, // 账户id
  })
  window.loginChans={}
  if (account.accid) {
    const im = getIm(account.accid)
    //sdk登出

    im.logout(
      {
        loginInfo: getLoginInfo(id),
      }
    )
  } else {
    console.log('未登录');
  }
}

export const login = ({id, onLoginSuccess, onMsgs}) => {
  const im = getIm(id)
  im.login({
    loginInfo: getLoginInfo(id),
    onLoginSuccess,
    onMsgs
  })
}
