import { createAction } from 'redux-actions';
import { GET_TAGS,CHANGE_ORDER,ADD_CATEGORY,GET_ALL_SOURCE ,DELETE_TAG,MODIFY_CATEGORY} from '../constants/actions';
import API from '../utils/api';

export const getTags=createAction(GET_TAGS,API.getTags);
export const changeOrder=createAction(CHANGE_ORDER,API.changeOrder);
export const addCategory=createAction(ADD_CATEGORY,API.addCategory);
export const getAllSource=createAction(GET_ALL_SOURCE,API.getAllSource);
export const deleteTag=createAction(DELETE_TAG,API.deleteTag);
export const modifyCategory=createAction(MODIFY_CATEGORY,API.modifyCategory);