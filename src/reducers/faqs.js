import { handleActions } from 'redux-actions';
import { GET_PROJECTS_LIST,GET_LABELS,GET_CATEGORYS,SEARCH_FAQ} from '../constants/actions';
import { merge, union } from 'lodash';

const initialState = {
    projectsList:[],
    labelsData:[],
    categoryData:[],
    searchFAQ:{}
};

export default handleActions({
    [GET_PROJECTS_LIST]: (state, action) => {
        
        if (!action.error) {
            return {...state,projectsList: action.payload};
        }

        return state
    },
    [GET_LABELS]: (state, action) => {

        if (!action.error) {
            return {...state,
                labelsData: action.payload
            };
        }

        return state
    },
    [GET_CATEGORYS]: (state, action) => {

        if (!action.error) {
            return {...state,
                categoryData: action.payload
            };
        }

        return state
    },
    [SEARCH_FAQ]: (state, action) => {

        if (!action.error) {
            return {...state,
                searchFAQ: action.payload
            };
        }

        return state
    }




}, initialState);

