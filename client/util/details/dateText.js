import moment from 'moment'

export const dateFilter = (v) => {
  const nowTime = new Date()
  const addDay = moment(v).add(1, 'days').toDate()
  if (moment(v).isSame(nowTime, 'day')) {
    return '今天'
  } else if (moment(addDay).isSame(nowTime, 'day')) {
    return '昨天'
  } else {
    return moment(v).format('YYYY年MM月DD日')
  }
}
export const getWeekDay = (v) => {
  const weekDayArr = ['周日','周一','周二','周三','周四','周五','周六']
  let weekDayIndex = moment(v).format('d')
  return weekDayArr[weekDayIndex]
}
