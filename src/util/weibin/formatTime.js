/**
* 将时间戳转为时间格式。
* @memberof  util
* @param { string } timeStamp 时间戳
* @param { string } type 时间之间的连接符 默认是 '/' 。
* @param { Boolean } needHMS 是否需要小时 分钟 秒。
 * @example
 *   const timestamp=new Date().getTime();
      JFE.util.formatTime(timestamp,'-',true) 输出：2017-12-22 17:33:17
      JFE.util.formatTime(timestamp)  输出：2017/12/22
 */
 function formatTime(timeStamp, type ,needHMS) {
  function add0(m) { return m < 10 ? '0' + m : m }
  var localType = type || '/'
  //timeStamp是整数，否则要parseInt转换
  var time = new Date(timeStamp);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  console.log(needHMS)
  return needHMS ? (y + localType + add0(m) + localType + add0(d) + ' ' +
                   h + ':' + mm + ':' + s) : (y + localType + add0(m) + localType + add0(d))
}


export {formatTime}
