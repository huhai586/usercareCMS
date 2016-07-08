import {createStore, applyMiddleware} from 'redux';

// middleware
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
// import {syncHistory} from 'react-router-redux';
import {browserHistory} from 'react-router';

// reducer
import rootReducer from '../reducers';

export default ((initialState) => {
    const create = window.devToolsExtension
        ? window.devToolsExtension()(createStore)
        : createStore;

    const createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
        promiseMiddleware,

    )(create);

    const store = createStoreWithMiddleware(rootReducer, initialState);
    console.log("初始化得到的store", store.getState());

    if (module.hot) {
        console.log('hot');
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        });
    }
    return store;
})();