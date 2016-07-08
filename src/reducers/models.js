import { handleActions } from 'redux-actions';
import { GET_PROJECTS_LIST} from '../constants/actions';
import { merge, union } from 'lodash';

const initialState = {
    projectsList:[]

};

export default handleActions({
    [GET_PROJECTS_LIST]: (state, action) => {
        
        if (!action.error) {
            return {projectsList: action.payload};
        }

        return state
    }




}, initialState);

