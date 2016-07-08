import { CHANGE_STATUS,GET_CATEGORY,CHANGE_CATEGORY} from '../constants/actions';
import { createAction } from 'redux-actions';
import { GET_CHART_DATA_REQUEST, GET_CHART_DATA_SUCCESS, GET_CHART_DATA_FAILURE } from '../constants/actions';
import API from '../utils/api';

//createAction����2��������һ������type���ڶ��������첽��fun����ͬ���Ĳ��������Զ����ݵ�action.payload��
//����select��action
//ѡ�񷢲�״̬��ֵ
export const changeStatus=createAction(CHANGE_STATUS);

//��ȡ����

export const getCategory=createAction(GET_CATEGORY,API.getCategory);

//ѡ�����
export const changeCategory=createAction(CHANGE_CATEGORY);



//export const getCategory=()=>{
//  return({
//    type:GET_CATEGORY,
//    payload:API.getCategory()
//  })
//};
