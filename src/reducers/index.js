import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import regions from './regions';
import models from './models';
import labels from './labels';
import config from './config';
import faqs from './faqs';


export default combineReducers({
  routeReducer, // react router
  form: formReducer, // redux form
  // custom reducers
  regions,
  models,
  labels,
  config,
  faqs
})

