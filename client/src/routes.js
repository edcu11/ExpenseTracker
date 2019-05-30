import React from 'react';
import { Route, IndexRoute } from 'react-router';

import EmptyLayout from './features/layouts/empty';
import NotFoundPage from './features/NotFound';
import HomePage from './features/Home';
import AccountsPage from './features/Accounts';

export default (
	<Route>
		<Route path="/" component={EmptyLayout}>
			<IndexRoute component={AccountsPage} />
			<Route path="/Accounts" component={AccountsPage} />
			<Route path="/expenses" component={HomePage} />
		</Route>
		<Route path="*" component={NotFoundPage} />
	</Route>
);