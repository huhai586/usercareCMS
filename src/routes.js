import React from 'react';
import { Router, Route, IndexRedirect, IndexRoute, hashHistory } from 'react-router';
import App from './containers/App';
import NotFound from './containers/NotFound';
import Regions from './containers/Regions';
import Models from './containers/Models';
import Labels from './containers/Labels';
import faqs from './containers/faqs';


export default React.createClass({
  render() {
  
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="regions" component={Regions}/>
          <Route path="models" component={Models}/>
          <Route path="labels" component={Labels}/>
          <Route path="faqs" component={faqs}/>
          <IndexRedirect to="regions"/>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    );
  }
});
