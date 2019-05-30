import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainLayout from './features/layouts/main';
import EmptyLayout from './features/layouts/empty';
import NotFoundPage from './features/NotFound';
import HomePage from './features/Home';
import AboutPage from './features/About';

export default (
	<Route>
		<Route path="/" component={EmptyLayout}>
			<IndexRoute component={AboutPage} />
			<Route path="/about" component={AboutPage} />
			<Route path="/expenses" component={HomePage} />
		</Route>
		<Route path="*" component={NotFoundPage} />
	</Route>
);