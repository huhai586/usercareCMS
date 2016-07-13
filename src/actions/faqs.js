import {SAVE_TEMPLATE,SAVE_LAN_TRANS,GET_DETAIL,GET_CUR_STATUS,INVALID_DATE,DELETE_FAQ,GET_ALL_PROJECTS_LIST,GET_CATEGORYS,SEARCH_FAQ,CHANGE_FAQ_DISPLAY,DELETE_MODELS,DELETE_PROJECT,ADD_PROJECT,ADD_MODELS} from '../constants/actions';
import { createAction } from 'redux-actions';
import API from '../utils/api';

//creation
//获取方式+来源选项的action
export const getAllProjectsList=createAction(GET_ALL_PROJECTS_LIST,API.getAllProjectsList);
export const getCategorys=createAction(GET_CATEGORYS,API.getCategorys);
export const searchFAQ=createAction(SEARCH_FAQ,API.searchFAQ);
export const changeFAQdisplay=createAction(CHANGE_FAQ_DISPLAY,API.changeFAQdisplay);
export const saveTemplate=createAction(SAVE_TEMPLATE,API.saveTemplate);
export const deleteFAQ=createAction(DELETE_FAQ,API.deleteFAQ);
export const invalidate=createAction(INVALID_DATE,API.invalidate);
export const getCurStatus=createAction(GET_CUR_STATUS,API.getCurStatus);
export const getDetailInfo=createAction(GET_DETAIL,API.getDetailInfo);
export const saveLanTrans=createAction(SAVE_LAN_TRANS,API.saveLanTrans);





