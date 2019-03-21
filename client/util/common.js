// 自定义加法,解决小数加整数后精确度的问题
export function add(n1, n2) {
  let s1, s2, m
  try {
    s1 = n1.toString().toString().split(".")[1].length
  } catch (e) {
    s1 = 0
  }
  try {
    s2 = n2.toString().toString().split(".")[1].length
  } catch (e) {
    s2 = 0
  }
  m = Math.pow(10, Math.max(s1, s2))
  return (n1 * m + n2 * m) / m
}
// debug
export const debug = function (selector) {
  if (process.env.NODE_ENV === 'production') {
    return selector
  }

  let last = null
  return (state, props) => {
    const obj = selector(state, props)
    if (last) {
      console.log('-------------------------------------------------------------------------------')
      const keys = Object.keys(obj)
      keys.forEach(key => {
        if (obj[key] !== last[key]) {
          console.log(key, last[key], obj[key])
        }
      })
    }

    last = obj

    return obj
  }
}

// 获取字符长度
export function getByteLen(val) {
  var len = 0
  for (let i = 0; i < val.length; i++) {
    var length = val.charCodeAt(i)
    if (length >= 0 && length <= 128) {
      len += 1
    } else {
      len += 2
    }
  }
  return len
}


export function getUpdateDateDesc(updateDate){
  let nowD = new Date()
  let delta = nowD - updateDate
  if(delta<60*2*1000){
    return '刚刚更新'
  }else if(delta<=60*60*1000){
    return `${Math.floor(delta/1000/60)}分钟前更新`
  }else if(delta<=60*60*1000*24){
    return `${Math.floor(delta/1000/60/60)}小时前更新`
  }else if(delta<=60*60*1000*24*30){
    return `${Math.floor(delta/1000/60/60/24)}天前更新`
  }else if(delta<=60*60*1000*24*365){
    return `${Math.floor(delta/1000/60/60/24/30)}个月前更新`
  }else {
    return `${Math.floor(delta/1000/60/60/24/365)}年前更新`
  }
}

export function checkFloat(c){
  let r= /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
  return r.test(c);
}


Date.prototype.format = function(format) {
  /*
   * format="yyyy-MM-dd hh:mm:ss";
   */
  var o = {
    "M+" : this.getMonth() + 1,
    "d+" : this.getDate(),
    "h+" : this.getHours(),
    "m+" : this.getMinutes(),
    "s+" : this.getSeconds(),
    "q+" : Math.floor((this.getMonth() + 3) / 3),
    "S" : this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for ( var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;

}


export function getWeekStart(time){
  time = time ? time : new Date();
  var date = new Date(time);
  var nowYear = date.getFullYear();
  var nowMonth = date.getMonth();
  var nowDay = date.getDate();
  var nowDayOfWeek = date.getDay() == 0 ? 7 : date.getDay();
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
  return weekStartDate;
}
export function getWeekEnd(time) {
  time = time ? time : new Date();
  var date = new Date(time);
  var nowYear = date.getFullYear();
  var nowMonth = date.getMonth();
  var nowDay = date.getDate();
  var nowDayOfWeek = date.getDay() == 0 ? 7 : date.getDay();
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek),23,59,59,999);
  return weekEndDate;
}

export function setWechatTitle(title){
  document.title=title;
  var iframe=document.createElement('iframe');
  iframe.src='/favicon.ico' + Math.random()
  iframe.style.display="none";
  iframe.onload=function(){
    setTimeout(function() {
      document.body.removeChild(iframe);
    },100);
  }
  document.body.appendChild(iframe);
}


export function hex2DecimalData(hexString){
  let digiArr = []
  for(let i=0;i<hexString.length;i=i+2){
    let n = parseInt(hexString.substr(i,2),16)
    digiArr.push(n)
    // if(n>0){
    //     console.log(n)
    // }
  }
  return digiArr
}
