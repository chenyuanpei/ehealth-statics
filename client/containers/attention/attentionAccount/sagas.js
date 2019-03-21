// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
// actions
import {
  // loadData,
  ATTENTION_ACCOUNT_PAGE_LOAD_DATA_REQUEST,
  ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_REQUEST,
  getBySubscribersSuccess,
  getQrcodeSuccess,
  unSubBySubscriberSuccess,
} from './actions'
// api
import {enterpriseConscribeApi,long2shortApi} from '../../../apis/healthService/enterprise_conscribe'
import {
  getBySubscribersApi,
  getQrcodeByMemberIdApi,
  unSubseribeBySubscriberApi,
} from '../../../apis/healthService/account'
import {
  getMyAccount
} from '../../../sagas/data/account'
import {
  getMemberById
} from '../../../sagas/data/member'
import {
  onMenuShareAppMessage,
  showOptionMenu,
  hideAllNonBaseMenuItem,
  hideMenuItems,
  showMenuItems
} from '../../../util/wxJs/wxApi'
import {protocol, rootRoute} from '../../../config'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

function * watchLoadData() {
  while (true) {
    try {
      const {payload: memberId} = yield take(ATTENTION_ACCOUNT_PAGE_LOAD_DATA_REQUEST)
      const attentions = yield call(getBySubscribersApi, {memberId})
      yield put(getBySubscribersSuccess(attentions))
      const account = yield call(getMyAccount)
      const member = yield call(getMemberById, memberId)
      const qrcode = yield call(getQrcodeByMemberIdApi, {memberId})
      yield put(getQrcodeSuccess)
      const {id, nickname, name} = member
      const publicUrlLink = encodeURI(`https://${rootRoute}/static/memberQrcode?qrcode=${qrcode}&name=${nickname || name}&id=${id}&account=${account.nickname}`)
      const {shortUrl} = yield call(long2shortApi,{longUrl:publicUrlLink,app:'乐心健康',remark:'分享成员',ttl:6000})
      shareMember(shortUrl, member)
    } catch (e) {
      toast('服务器繁忙...')
    }
  }
}

function shareMember(shortUrl, member) {
  const {id, nickname, name} = member

  /* eslint-disable */
  wx.ready(() => {
    /* eslint-enable */
    // "分享给朋友”按钮点击与分享状态、自定义分享内容接口
    onMenuShareAppMessage({
      title: '邀请关注',
      desc: `Hi，我向你分享了【${nickname || name}】成员的测量数据，点击这里接受吧！链接1小时内有效。`,
      imgUrl: `https://lifejoy-health.booen.co/healthbase/static/health/common/img/logo_03.png`,
      link: shortUrl,
      success:function(){
        console.log('已分享')
      }
    })
    // 显示右上角菜单
    showOptionMenu()
    // 隐藏所有非基本菜单项
    hideAllNonBaseMenuItem()
    // 批量隐藏菜单项
    hideMenuItems({
      menuList: [
        'menuItem:share:timeline',
        'menuItem:copyUrl',
        'menuItem:originPage',
        'menuItem:readMode',
        'menuItem:openWithQQBrowser',
        'menuItem:openWithSafari',
        'menuItem:share:email',
        'menuItem:exposeArticle',
        'menuItem:setFont',
        'menuItem:dayMode',
        'menuItem:nightMode',
        'menuItem:refresh',
        'menuItem:profile',
        'menuItem:addContact',
        'menuItem:share:qq',
        'menuItem:favorite',
        'menuItem:share:facebook',
        'menuItem:jsDebug',
        'menuItem:editTag',
        'menuItem:delete'
      ],
      // 要显示的菜单项，所有menu项见附录3
      success: function () {
        // 批量显示菜单项
        showMenuItems({
          menuList: ['menuItem:share:appMessage'], // 要显示的菜单项，所有menu项见附录3
        })
      }
    })
  })
}

// 解除当前成员与关注该成员的账号关系
function * unbindSubMember() {
  while (true) {
    const {payload: {memberId, accountId}} = yield take(ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_REQUEST)
    try {
      yield call(unSubseribeBySubscriberApi, {memberId, accountId})
      yield put(unSubBySubscriberSuccess(accountId))
      toast('删除成功!')
    } catch (e) {
      toast('删除失败！服务器繁忙...')
    }
  }
}

export default function * memberSaga() {
  yield fork(watchLoadData)
  yield fork(unbindSubMember)
}
