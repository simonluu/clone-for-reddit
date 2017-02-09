import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers, { initialState } from './reducers';
import routes from './routes';

const loggerMiddleware = createLogger();

function configureStore(preloadedState) {
	return createStore(
		reducers,
		preloadedState,
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	);
}

ReactDOM.render(
	<Provider store={configureStore(initialState)}>
		<Router history={browserHistory} routes={routes} />
	</Provider>
, document.getElementById('main-container'));