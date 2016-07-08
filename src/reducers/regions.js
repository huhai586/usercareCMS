import { handleActions } from 'redux-actions';
import { GET_REGIONS_LIST} from '../constants/actions';
import { merge, union } from 'lodash';


const initialState = {
  regionsData:""
};

export default handleActions({
  [GET_REGIONS_LIST]: (state, action) => {



    console.log("开始时间", action)
    if(action.error) return state;
    return {...state,regionsData: action.payload}


  }




}, initialState);

