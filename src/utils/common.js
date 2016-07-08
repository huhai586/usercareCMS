import moment from 'moment';
import { DATE_FORMAT_DAY,DATE_FORMAT_SECONDS } from '../constants/config';
//import Ps from 'perfect-scrollbar';

export const delay = (timeout = 50) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timeout);
  });
};

export const getPromiseTypes = (actionName) => {
  return [actionName + '_REQUEST', actionName + '_SUCCESS', actionName + '_FAILURE'];
};

export const getDateToday = () => {
  return moment(new Date()).format(DATE_FORMAT_DAY);
};

export const getDateTodayINseconds = () => {
  return moment(new Date()).format(DATE_FORMAT_SECONDS);
};

export const getDateYesterday = () => {
  return moment(new Date()).subtract(1, 'days').format(DATE_FORMAT_DAY);
};

export const getDateBeforeWeek = (date) => {
  if(moment(date).isValid()) return moment(date).subtract(6, 'days').format(DATE_FORMAT_DAY);

};

export const getDateBefore2Days = (date) => {
  if(moment(date).isValid()) return moment(date).subtract(2, 'days').format(DATE_FORMAT_DAY);

};

export const isValidDate = (date) => {
  return moment(date).isValid();
};

export const isBeforeDate = (date1, date2) => {

  return moment(parseInt(date1)).isBefore(parseInt(date2));
};

export const perfectScroll = (container) => {
  Ps.destroy(container);
  Ps.initialize(container, {
    wheelSpeed: 1,
    wheelPropagation: true,
    minScrollbarLength: 20
  });
};

export const perfectScrollUpdate = (container) => {
  Ps.update(container);
};

export const humanizeTime = (value, type = 'seconds') => {
  var mt = moment.duration(value, type);
  return (mt.days() ? (mt.days() + 'd, '): '') +
      (mt.hours() ? (mt.hours() + 'h, '): '') +
      (mt.minutes() ? (mt.minutes() + 'm, '): (type == 'minutes' ? '0m, ' : '')) +
      (mt.seconds() ? (mt.seconds() + 's'): (type == 'seconds' ? '0s' : ''));
};

export const changeTOmillSec=(time,from)=>{
  var timeCopy
  if(!moment(time).isValid()) return
  if(from=='start'){
    timeCopy=time+" 0:00:00"
  }
  if(from=='end'){
    timeCopy=time+" 23:59:59"
  }
  //转换成毫秒数
  var curMillSec=moment(timeCopy).format("x");
  //得到正确的utc毫秒数
  // var currentDate=new Date();
  // var timeZoneMillSec=(currentDate.getTimezoneOffset()*60*1000);
  // var utc=parseInt(curMillSec)+timeZoneMillSec;
  // var y=moment(utc).format("YYYY-MM-DD H:mm:ss");
  // console.log("解析出的UTC时间为",y,from)
  return curMillSec

}

export const parseTime=(time)=>{
  //时间为毫秒数
  // var currentDate=new Date();
  // var localTime=parseInt(time)-(currentDate.getTimezoneOffset()*60*1000);
  var localTime=moment(time).format("YYYY-MM-DD H:mm:ss Z");
  return localTime

}

export const utcTime=()=>{
  //此时此刻的utcTime
  var pushTime=new Date();

  return pushTime.getTime()+(pushTime.getTimezoneOffset()*60*1000);
}

export const convertTOutc=(time)=>{
  //时间为毫秒数
  //指定日期变为uct
  var millTime=moment(time).format("x")
  // var currentDate=new Date();
  // var utcTime=parseInt(millTime)+(currentDate.getTimezoneOffset()*60*1000);
  return millTime
}