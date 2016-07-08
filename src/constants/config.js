/**
 * Created by zhengguo.chen on 2016/3/16.
 */
export const DATE_FORMAT_DAY = 'YYYY-MM-DD';
export const DATE_FORMAT_SECONDS = 'YYYY-MM-DD HH:mm:ss';
export const HMS = 'HH:mm';
export const PAGE_SIZE = 20;
export const ALL_OPTION = {label:'[ALL]', value:''};
//CU查询规则正则
export const CU_REG = /^([A-Z0-9]{3,6})\-[A-Z0-9]{2}([A-Z0-9]{2})([A-Z0-9]{2})[A-Z0-9]+(-[A-Z0-9]+)?$/;
export const CHART_TYPES = {
  bar: 'bar',
  line: 'line',
  pie: 'pie',
  heatmap: 'heatmap'
};

export const SYNC_OPTIONS = {
  USER_APP_FLAG: [
    {label: 'TRUE', value: 1},
    {label: 'FALSE', value: 0}
  ]
};

export const USER_APP_FLAG_OPTION = {
  title: 'User App Flag',
  type: 'USER_APP_FLAG',
  name: 'userAppFlag'
};