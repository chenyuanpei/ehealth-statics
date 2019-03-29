import axios from 'axios'
import uuid from 'node-uuid'
import {apiUrl} from '../../config'
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
        alert('支付成功！')

      }
    }).catch(function (e) {
      console.log("Oops, error");
    })

  }else if(code == -1){
    alert('支付失败')
  }
}
window.testCallback = testCallback
