/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2023-03-07 17:14:32
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-08 09:29:12
 * @FilePath: \cloud_dirve\client\src\utils\tools.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//时间间隔函数
export function timeInterval(timesData) {
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  let dateBegin = timesData;//将-转化为/，使用new Date    
  let dateEnd = new Date();//获取当前时间   
  let dateDiff = Math.abs( dateEnd.getTime() - dateBegin );  //时间差的毫秒数
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));  //计算出相差天数
  let leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  let timesString = '';
  let daysAgo = ''
  let hoursAgo = ''
  let minutesAgo = ''
  let JustNow = localStorage.getItem('language') == 'zh' ? '刚刚' : ' Just now'
  if(dayDiff > 1) {
    daysAgo = localStorage.getItem('language') == 'zh' ? '天前' : ' days ago'
  } else {
    daysAgo = localStorage.getItem('language') == 'zh' ? '天前' : ' day ago'
  }
  if(hours > 1) {
    hoursAgo = localStorage.getItem('language') == 'zh' ? '小时前' : ' hours ago'
  } else {
    hoursAgo = localStorage.getItem('language') == 'zh' ? '小时前' : ' hour ago'
  }
  if(minutes > 1) {
    minutesAgo = localStorage.getItem('language') == 'zh' ? '分钟前' : ' minutes ago'
  } else {
    minutesAgo = localStorage.getItem('language') == 'zh' ? '分钟前' : ' minute ago'
  }

  if (dayDiff > 4){
    timesString = timesData.toLocaleString()
  } else if (dayDiff <= 3 && dayDiff > 0) {
    timesString = dayDiff + daysAgo
  } else if (dayDiff == 0 && hours != 0) {
    timesString = hours + hoursAgo;
  } else if (hours == 0 && minutes != 0) {      
    timesString = minutes + minutesAgo;      
  } else if (minutes == 0 && seconds<60){ 
    timesString = JustNow; 
  } 
  return timesString 
}