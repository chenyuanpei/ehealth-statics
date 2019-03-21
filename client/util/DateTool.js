/**
 * Created by Arvin on 16/9/7.
 */
/**
 * 获得 当前/指定 的日期所属周的第一天 （不传参数返回当前时间）
 * @param time  毫秒 or 字符串 2015-11-11
 * @returns {Date}
 */
export function getWeekStartDate(time) {
    time = time ? time : new Date();
    var date = new Date(time);
    var nowYear = date.getFullYear();
    var nowMonth = date.getMonth();
    var nowDay = date.getDate();
    var nowDayOfWeek = date.getDay() == 0 ? 7 : date.getDay();
    // var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
    // return formatDate(weekStartDate);
    return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
}
/**
 * 获得 当前/指定 的日期所属周的最后一天    （不传参数返回当前时间）
 * @param time  毫秒 or 字符串 2015-11-11
 * @returns {Date}
 */
export function getWeekEndDate(time) {
    time = time ? time : new Date();
    var date = new Date(time);
    var nowYear = date.getFullYear();
    var nowMonth = date.getMonth();
    var nowDay = date.getDate();
    var nowDayOfWeek = date.getDay() == 0 ? 7 : date.getDay();
    // var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
    // return formatDate(weekEndDate);
    return new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
}
/**
 * 判断年份是否为润年
 *
 * @param {Number} year
 */
function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
/**
 * 获取某一年份的某一月份的天数
 *
 * @param {Number} year
 * @param {Number} month
 */
function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}
/**
 * 获取某年的某天是第几周
 * @param {Number} y
 * @param {Number} m
 * @param {Number} d
 * @returns {Number}
 */
function getWeekNumber(y, m, d) {
    var now = new Date(y, m - 1, d),
        year = now.getFullYear(),
        month = now.getMonth(),
        days = now.getDate();
    //那一天是那一年中的第多少天
    for (var i = 0; i < month; i++) {
        days += getMonthDays(year, i);
    }

    //那一年第一天是星期几
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

    var week = null;
    if (yearFirstDay == 1) {
        week = Math.ceil(days / yearFirstDay);
    } else {
        days -= (7 - yearFirstDay + 1);
        week = Math.ceil(days / 7) + 1;
    }

    return week;
}
export function getWeekNumber(date) {
    var now = new Date(date),
        year = now.getFullYear(),
        month = now.getMonth(),
        days = now.getDate();
    //那一天是那一年中的第多少天
    for (var i = 0; i < month; i++) {
        days += getMonthDays(year, i);
    }

    //那一年第一天是星期几
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

    var week = null;
    if (yearFirstDay == 1) {
        week = Math.ceil(days / 7);
    } else {
        days -= (7 - yearFirstDay + 1);
        week = Math.ceil(days / 7) + 1;
    }
    return week;
}