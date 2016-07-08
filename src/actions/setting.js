import { createAction } from 'redux-actions';
import { GET_SOURCE_LIST,SET_SWITCH,LOADING} from '../constants/actions';
import API from '../utils/api';

export const getSourceList=createAction(GET_SOURCE_LIST,API.getSourceList);
export const setSwitch=createAction(SET_SWITCH,API.setSwitch);


