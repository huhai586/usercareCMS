import { handleActions } from 'redux-actions';
import { GET_CATEGORY,GET_FETCH_TYPE,
    GET_SOURCE_OPTION,GET_ACCOUNT,LOADING} from '../constants/actions';

import { merge } from 'lodash';



let optionsPublishStatus = [
    {value: '2', label: 'Published'},
    {value: '1', label: 'UnPublished'}
]

let timeTypeOption=[
    {value: '0', label: 'Original Published'},
    {value: '1', label: 'Review Time'}
]
let filterOption=[
    {value: '0', label: 'Latest release'},
    {value: '1', label: 'Most viewed'},
    {value: '2', label: 'Latest review'}

]

let fetchOption=[
    {value: '1', label: 'Portal'},
    {value: '2', label: 'Community'},
    {value: '3', label: 'Own'}

]
let articleType=[
    {value: '1', label: 'Article'},
    {value: '2', label: 'Pics'},
    {value: '3', label: 'Jokes'}

]
const initialState = {

    publishStatus: optionsPublishStatus,
    category: [],
    fetch_type: fetchOption,
    source_option: [],
    timeType:timeTypeOption,
    ajaxCount:0,
    filterOption:filterOption,
    articleType:articleType,
    selfAccount:[],
    loading:false

};

export default handleActions({
    [GET_CATEGORY]: (state, action) => {
        // do nothing
        if(action.error){
            return state
        }

        let category=action.payload.map(obj=>(
        {value: obj.categoryCode, label: obj.categoryName}
        ));

        return merge({}, state, {
            category: category,
            ajaxCount: state.ajaxCount + 1
        });
    },
    [GET_FETCH_TYPE]: (state, action) => {
        if(action.error){
            return state
        }

        let optionsFetch=action.payload.map(obj=>(
        {value: obj.sourceCode, label: obj.sourceName}
        ));

        return merge({}, state, {
            fetch_type: optionsFetch,
            ajaxCount:state.ajaxCount + 1
        });
    },
    [GET_SOURCE_OPTION]: (state, action) => {
        if(action.error){
            return state
        }

        let sourceOption=action.payload.map(obj=>(
        {value: obj.sourceId, label: obj.sourceName}
        ));

        return {...state, source_option: sourceOption,ajaxCount: state.ajaxCount + 1
        };
    },
    [GET_ACCOUNT]: (state, action) => {

        if(action.error){
            return state
        }

        let sourceOption=(action.payload||[]).map(obj=>(
        {value: obj.sourceId, label: obj.sourceName}
        ));
        return merge({}, state, {
            selfAccount: sourceOption
        });
    },
    [LOADING]: (state, action) => {

        var showStatus=action.payload.loading;
        return merge({}, state, {
            loading: showStatus
        });
    }






}, initialState);
