import {GET_PROJECTS_LIST,DELETE_MODELS,DELETE_PROJECT,ADD_PROJECT,ADD_MODELS} from '../constants/actions';
import { createAction } from 'redux-actions';
import API from '../utils/api';

//creation
//获取方式+来源选项的action
export const getProjectsList=createAction(GET_PROJECTS_LIST,API.getProjectsList);
// export const getAllModels=createAction(GET_MODELS_LIST,API.getModelsList);
export const deleteProject=createAction(DELETE_PROJECT,API.deleteProject);
export const addProject=createAction(ADD_PROJECT,API.addProject);
export const addModels=createAction(ADD_MODELS,API.addModels);
export const deleteModels=createAction(DELETE_MODELS,API.deleteModels);





