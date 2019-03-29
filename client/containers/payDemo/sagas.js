// sagas
import axios from 'axios'
import uuid from 'node-uuid'
import {apiUrl} from '../../config'
import browserCookies from 'browser-cookies'
import {fork, take, put, call, select} from 'redux-saga/effects'
import {goBack} from 'react-router-redux'
// actions
import {
  PAGE_LOAD_DATA_PAY_DEMO_REQUEST,
  getProductInfoSeccuss,
  BUY_PRODUCT_EVENT
} from './actions'
import {createMemberSelector} from '../../selectors/data/member'
// toast
import {toast} from '../../components/common/toast/PubSubToast'
import {getSampleGoodsInfo,getPurchaseSampleGoods,getSampleOrderStatus} from '../../apis/healthService/pay'

function * watchLoadData() {
  while (true) {
    yield take(PAGE_LOAD_DATA_PAY_DEMO_REQUEST)
    const sampleGoodsInfo = yield call(getSampleGoodsInfo,{goodsId:6610670390611967})
    yield put(getProductInfoSeccuss(sampleGoodsInfo))
  }
}


// 监听
function * watchGoBuy() {
  while (true) {
    try {
      let {payload: {goodsId, amount}} = yield take(BUY_PRODUCT_EVENT)
      const buyerId = browserCookies.get('userId')
      const result = yield call(getPurchaseSampleGoods, {goodsId,amount,buyerId})
      if (result){
        appPay(result)
      }
    } catch (e) {
      toast(e.msg)
    }
  }
}
function appPay(data) {
  callWechatPay("testCallback",data)
}
export const callWechatPay = (callback,appData)=>{

  if (typeof(lxPayDelegate) !== 'undefined') {

    let appDataPay = {
      orderId: appData.orderId,
      partnerId: appData.partnerid,
      prepayId: appData.prepayid,
      nonceStr: appData.nonceStr,
      timeStamp: appData.timestamp,
      paySign: appData.paySign,
      callback:'testCallback',
    }
    lxPayDelegate.sendWxPayRequest(JSON.stringify(appDataPay))
  }
}
export const testCallback = (orderId,code)=>{
  if(code == 0){
    let url = apiUrl + '/health_service/order/sample/sample_order_status?orderId='+orderId+'&appType=23&requestId=' + uuid.v4().replace(/-/g, '')
    return axios.get(url).then(function (response) {
      const orderData = response['data']
      const {paymentStatus} = orderData['data']

      if(paymentStatus == 2){

        if (navigationBarControl && navigationBarControl.showToast){

          navigationBarControl.showToast('支付成功')
        }else{
          toast('支付成功')
        }
      }else{

        if (navigationBarControl && navigationBarControl.showToast){

          navigationBarControl.showToast('查询订单失败')
        }else{
          toast('查询订单失败')
        }
        // document.getElementById("j-pay-text").innerHTML('支付成功')
        // document.body.innerHTML('查询订单失败,paymentStatus状态:'+paymentStatus)
      }
    }).catch(function (e) {

      if (navigationBarControl && navigationBarControl.showToast){

        navigationBarControl.showToast(e.msg)
      }else{
        toast(e.msg)
      }
    })

  }else if(code == -1){

    if (navigationBarControl && navigationBarControl.showToast){

      navigationBarControl.showToast('支付失败'+code)
    }else{
      toast('支付失败')
    }
    // document.body.innerHTML('支付失败！')
  }else{
    // document.querySelector("＃j-pay-text").innerHTML('支付取消')
    // document.body.innerHTML('支付取消')
    if (navigationBarControl && navigationBarControl.showToast){

      navigationBarControl.showToast('支付取消'+code)
    }else{
      toast('支付取消')

    }
  }
}
window.testCallback = testCallback
export default function * bpDetailSaga() {
  yield fork(watchLoadData)
  yield fork(watchGoBuy)
}
