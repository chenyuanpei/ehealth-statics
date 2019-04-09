import {fork, take, put, call, select} from 'redux-saga/effects'
import axios from 'axios'
import uuid from 'node-uuid'
import {accessTokenSelector} from '../../../selectors/data/login'
// actions
import {
  POSTER_PAGE_DATA_PAGE_INIT,
  getPosterSuccess,
} from './actions'
// selectors
import {memberSelector} from './selectors'
import {protocol, rootRoute,hostname} from '../../../config'
import {
  ShareTimeline,
  onMenuShareAppMessage,
  showOptionMenu,
  hideAllNonBaseMenuItem,
  hideMenuItems,
  showMenuItems,
} from '../../../util/wxJs/wxApi'
// sagas
// api
import {enterpriseConscribeApi,long2shortApi} from '../../../apis/healthService/enterprise_conscribe'
// 监听初始化
function * watchInit() {
  while (true) {
    const {payload: {applyId}} = yield take(POSTER_PAGE_DATA_PAGE_INIT)
    // jsapi

    let url = '/health/#/special/poster?applyId='+applyId
    let appId = ''
    let bridgeUrl = ''
    if(window.location.href.indexOf('cdn')>=0){
      // appId = 'wxb8fd8c2cf1e6078e'
      bridgeUrl = 'https://web.lifejoy-health.com' + url
    }else{
      // appId = 'wx503cebfd53ed7d2a'
      bridgeUrl = 'https://static-qa2.lifesense.com' + url
    }
    // let encodeUrl = encodeURIComponent(bridgeUrl)
    // let publicUrlLink =  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeUrl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
    shareMember(bridgeUrl)
    // try{
    //   const {shortUrl} = yield call(long2shortApi,{longUrl:publicUrlLink,app:'乐心健康',remark:'海报',ttl:6000})
    //   shareMember(shortUrl)
    //   const data = yield call(enterpriseConscribeApi,{id:applyId})
    //   yield put(getPosterSuccess(data))
    //
    //
    // }catch(e){
    //   console.log(e)
    // }
  }
}
// function shorturl(long_url){
//   let url = 'https://api.weixin.qq.com/cgi-bin/shorturl'
//   axios.post(url).then(function (response) {
//     const cityData = response['data']
//     const cityList = cityData['data']
//     return cityList
//   }).catch(function (e) {
//     console.log("Oops, error");
//   })
//
// }
/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax(opt) {
  opt = opt || {};
  opt.method = opt.method.toUpperCase() || 'POST';
  opt.url = opt.url || '';
  opt.async = opt.async || true;
  opt.data = opt.data || null;
  opt.success = opt.success || function () {};
  var xmlHttp = null;
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }var params = [];
  for (var key in opt.data){
    params.push(key + '=' + opt.data[key]);
  }
  var postData = params.join('&');
  if (opt.method.toUpperCase() === 'POST') {
    xmlHttp.open(opt.method, opt.url, opt.async);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    xmlHttp.send(postData);
  }
  else if (opt.method.toUpperCase() === 'GET') {
    xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
    xmlHttp.send(null);
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      opt.success(xmlHttp.responseText);
    }
  };
}
function shareMember(shortUrl) {

  wx.ready(() => {
    onMenuShareAppMessage({
      title: '企业智能健康设备免费领',
      desc: '我申请了企业智能健康设备，快来支持我领取！',
      link: shortUrl,
      imgUrl: `${protocol}//${hostname}/healthbase/static/health/common/img/img-moment02.jpg`
    })
    ShareTimeline({
      title: '企业智能健康设备免费领',
      imgUrl: `${protocol}//${hostname}/healthbase/static/health/common/img/img-moment02.jpg`,
      link:shortUrl,
      success:function(){
        console.log('已分享')
      }
    })
    showOptionMenu()
    hideAllNonBaseMenuItem()
    hideMenuItems({
      menuList: [
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
      success: function () {
        showMenuItems({

          menuList: ['menuItem:share:appMessage','menuItem:share:timeline'],
        })
      }
    })
  })
}

export default function * dataSaga() {
  yield fork(watchInit)
}
