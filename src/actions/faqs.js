import {GET_PROJECTS_LIST,GET_ALL_PROJECTS_LIST,GET_CATEGORYS,SEARCH_FAQ,CHANGE_FAQ_DISPLAY,DELETE_MODELS,DELETE_PROJECT,ADD_PROJECT,ADD_MODELS} from '../constants/actions';
import { createAction } from 'redux-actions';
import API from '../utils/api';

//creation
//获取方式+来源选项的action
export const getAllProjectsList=createAction(GET_ALL_PROJECTS_LIST,API.getAllProjectsList);
export const getCategorys=createAction(GET_CATEGORYS,API.getCategorys);
export const searchFAQ=createAction(SEARCH_FAQ,API.searchFAQ);
export const changeFAQdisplay=createAction(CHANGE_FAQ_DISPLAY,API.changeFAQdisplay);





