import {GET_REGIONS_LIST,ADD_REGION,DELETE_REGION,GET_ALL_COUNTRY,
    DELETE_COUNTRY,GET_ALL_ADMIN,ADD_COUNTRY,DELETE_ADMIN,ADD_ADMIN} from '../constants/actions';
import { createAction } from 'redux-actions';
import API from '../utils/api';

//creation
//获取方式+来源选项的action
export const getRegionsList=createAction(GET_REGIONS_LIST,API.getRegionsList);
export const addRegion=createAction(ADD_REGION,API.addRegion);
export const deleteRegion=createAction(DELETE_REGION,API.deleteRegion);
export const getAllCountry=createAction(GET_ALL_COUNTRY,API.getAllCountry);
export const getAllAdmin=createAction(GET_ALL_ADMIN,API.getAllAdmin);
export const deleteCountry=createAction(DELETE_COUNTRY,API.deleteCountry);
export const addCountry=createAction(ADD_COUNTRY,API.addCountry);
export const addAdmin=createAction(ADD_ADMIN,API.addAdmin);
export const deleteAdmin=createAction(DELETE_ADMIN,API.deleteAdmin);



