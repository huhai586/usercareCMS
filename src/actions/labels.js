import {GET_LABELS,ADD_LABELS,DELETE_LABELS} from '../constants/actions';
import { createAction } from 'redux-actions';
import API from '../utils/api';

//creation
//获取方式+来源选项的action
export const getLabels=createAction(GET_LABELS,API.getLabels);
export const addLabels=createAction(ADD_LABELS,API.addLabels);
export const deleteLabels=createAction(DELETE_LABELS,API.deleteLabels);



