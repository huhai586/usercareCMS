// require('es6-promise');
// require('whatwg-fetch');

import qs from 'querystring';
import * as API from '../constants/api';
import {loading} from '../actions/forloading';
import { delay } from './common';
import 'whatwg-fetch';
import store from '../store';

const METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

const request = (url, params, method = 'post', jsonType = true) => {
  //$(".spinner").show();



  

  var x=loading({loading:true});
  store.dispatch(x);
  var options = {
    headers: {
      'Content-Type': jsonType ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8',
      'Accept':'application/json'
    },

    method: method,
    credentials: 'include'
  };
  if(method !== METHOD.GET && params) {
    options.body = jsonType ? JSON.stringify(params) : qs.stringify(params)
  }
  if(method === METHOD.GET && params) {
    url += ('?' + qs.stringify(params));
  }

    return fetch(url, options).then(checkRespStatus);





};

// check resp status
const checkRespStatus = (respPromise) => {

  var x=loading({loading:false});
  store.dispatch(x);

  if(respPromise.status !== 200) {
    debugger
    alert('Server error occurred')
    console.log('Server error occurred');
    return Promise.reject();
  }
  
  return respPromise.json().then(resp => {
    return new Promise((resolve, reject) => {

      if(resp.status == 1) {
        
        resolve(resp);

      } else {
        alert("response error occoured")
         resp.msg && alert(resp.msg);
        reject(resp);
      }
    });
  }).catch(e=>{
    debugger
    return Promise.reject(e)
  });
};

export default {
  //REGIONS
  getRegionsList: (params) => request(API.GET_REGIONS_LIST, params, METHOD.GET),
  addRegion: (params) => request(API.ADD_REGION, params, METHOD.GET),
  deleteRegion: (params) => request(API.DELETE_REGION, params, METHOD.GET),
  getAllCountry: (params) => request(API.GET_ALL_COUNTRY, params, METHOD.GET),
  getAllAdmin: (params) => request(API.GET_ALL_ADMIN, params, METHOD.GET),
  deleteCountry: (params) => request(API.DELETE_COUNTRY, params, METHOD.POST),
  addCountry: (params) => request(API.ADD_COUNTRY, params, METHOD.POST),
  deleteAdmin: (params) => request(API.DELETE_ADMIN, params, METHOD.POST),
  addAdmin: (params) => request(API.ADD_ADMIN, params, METHOD.POST),

// PROJECT
  getProjectsList: (params) => request(API.GET_PROJECTS_LIST, params, METHOD.GET),
  deleteProject: (params) => request(API.DELETE_PROJECT, params, METHOD.GET),
  addProject: (params) => request(API.ADD_PROJECT, params, METHOD.GET),
  addModels: (params) => request(API.ADD_MODELS, params, METHOD.POST),
  deleteModels: (params) => request(API.DELETE_MODELS, params, METHOD.POST),

//labels
  getLabels: (params) => request(API.GET_LABELS, params, METHOD.GET),
  addLabels: (params) => request(API.ADD_LABELS, params, METHOD.GET),
  deleteLabels: (params) => request(API.DELETE_LABELS, params, METHOD.POST),
 //FAQ
  getCategorys: (params) => request(API.GET_CATEGORYS, params, METHOD.GET),
  searchFAQ: (params) => request(API.SEARCH_FAQ, params, METHOD.POST),
  changeFAQdisplay: (params) => request(API.CHANGE_FAQ_DISPLAY, params, METHOD.GET),
  getAllProjectsList: (params) => request(API.GET_ALL_PROJECTS_LIST, params, METHOD.GET),





};

