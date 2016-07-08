import { CHANGE_STATUS,GET_CATEGORY,CHANGE_CATEGORY} from '../constants/actions';
import { createAction } from 'redux-actions';
import { GET_CHART_DATA_REQUEST, GET_CHART_DATA_SUCCESS, GET_CHART_DATA_FAILURE } from '../constants/actions';
import API from '../utils/api';

//createAction接受2个参数第一个代表type，第二个代表异步的fun对象（同步的参数，会自动传递到action.payload）
//公共select的action
//选择发布状态的值
export const changeStatus=createAction(CHANGE_STATUS);

//获取分类

export const getCategory=createAction(GET_CATEGORY,API.getCategory);

//选择分类
export const changeCategory=createAction(CHANGE_CATEGORY);



//export const getCategory=()=>{
//  return({
//    type:GET_CATEGORY,
//    payload:API.getCategory()
//  })
//};
