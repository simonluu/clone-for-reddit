import React from 'react';
import { Route, IndexRoute } from 'react-router';

// imports main application
import App from './components/app';
import Subreddit from './containers/subreddit';

export default (
	<Route path="/cloneforreddit" component={App}>
		<IndexRoute component={Subreddit} />
		<Route path="/cloneforreddit/:name" component={Subreddit} />
	</Route>
);