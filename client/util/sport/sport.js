
import {getWeekNumber, getWeekStartDate, getWeekEndDate} from '../DateTool'

export function round(e, v) {
    return Math.round(e * v) / v
}

export function caloriesConversion(c) {
    let v = 0
    let txts = ['颗葡萄', '根胡萝卜', '个冰淇淋', '碗米饭', '个汉堡', '只烤鸡']
    let t = ''
    if (!c) {
        v = 0
        t = txts[0]
    } else {
        if (c <= 20) {
            v = c / 20
            t = txts[0]
        } else if (c < 60) {
            v = c / 25
            t = txts[1]
        } else if (c <= 120) {
            v = c / 60
            t = txts[2]
        } else if (c < 250) {
            v = c / 116
            t = txts[3]
        } else if (c < 1130) {
            v = c / 250
            t = txts[4]
        } else {
            v = c / 1130
            t = txts[5]
        }
    }

    return round(v, 10) + t
}

export function distanceConversion(d) {
    let v = 0
    let txts = ['圈操场', '个迷你马拉松', '个全程马拉松']
    let t = ''
    if (!d) {
        v = 0
        t = txts[0]
    } else {
        if (d < 5000) {
            v = d / 400
            t = txts[0]
        } else if (d / 43000) {
            v = d / 5000
            t = txts[1]
        } else {
            v = d / 42200
            t = txts[2]
        }
    }
    return round(v, 10) + t
}

export function titleTipsDay(date) {
    let queryDate = new Date(date)
    let nowDate = new Date()
    let title = null
    let count = Math.abs((queryDate.getTime() - nowDate.getTime()) / (24 * 60 * 60 * 1000))
    if (count < 1) {
        title = '今天'
    } else if (count < 2) {
        title = '昨天'
    }
    //else if (count < 3) {
    //    title = '前天'
    //}
    else {
        if (new Date(date).getFullYear() == new Date().getFullYear()) {
            title = new Date(date).getMonth() + 1 + '月' + new Date(date).getDate() + '日'
        } else {
            // title = new Date(date).format('MM月dd日')
            title = new Date(date).getMonth() + 1 + '月' + new Date(date).getDate() + '日'
        }
    }
    return title
}

export function titleTipsDaySleep(date) {
  let queryDate = new Date(date)
  let nowDate = new Date()
  let title = null
  let count = Math.abs((queryDate.getTime() - nowDate.getTime()) / (24 * 60 * 60 * 1000))
  if (count < 1) {
    title = '昨晚'
  } else if (count < 2) {
    title = '前晚'
  }
  //else if (count < 3) {
  //    title = '前天'
  //}
  else {
    if (new Date(date).getFullYear() == new Date().getFullYear()) {
      title = new Date(date).getMonth() + 1 + '月' + new Date(date).getDate() + '日'
    } else {
      // title = new Date(date).format('MM月dd日')
      title = new Date(date).getMonth() + 1 + '月' + new Date(date).getDate() + '日'
    }
  }
  return title
}

export function titleTipsWeek(date) {
  let now = getWeekNumber(new Date())
  let num = getWeekNumber(date)
  let title = null
  if (now == num) {
      title = '本周'
  } else if (now - num == 1  || now - num == -51) {
      title = '上周'
  } else {
      let start = getWeekStartDate(date)
      let end = getWeekEndDate(date)
      if (start.getFullYear() == new Date().getFullYear()) {
        title = (start.getMonth() + 1) + '月' + start.getDate() + '日-'
        title += (end.getMonth() + 1) + '月' + end.getDate() + '日'
      } else {
        title = start.getFullYear() + '年' + (start.getMonth() + 1) + '月' + start.getDate() + '日-'
        title += end.getFullYear() + '年' + (end.getMonth() + 1) + '月' + end.getDate() + '日'
      }
  }
  return title
}
