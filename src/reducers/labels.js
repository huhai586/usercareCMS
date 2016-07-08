import { handleActions } from 'redux-actions';
import { GET_LABELS} from '../constants/actions';
import { merge, union } from 'lodash';

const initialState = {
  labelsData:[]

};

export default handleActions({
  [GET_LABELS]: (state, action) => {
    
    if (!action.error) {
      return {...state,
        labelsData: action.payload
      };
    }

    return state
  }




}, initialState);

