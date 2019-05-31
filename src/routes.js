import React from 'react';
import { Route, IndexRoute } from 'react-router';

import EmptyLayout from './features/layouts/empty';
import NotFoundPage from './features/NotFound';
import HomePage from './features/Home';
import AccountsPage from './features/Accounts';

export default (
	<Route>
		<Route path="/" component={EmptyLayout}>
			<Route path="/Accounts" >
				<IndexRoute component={AccountsPage} />
				<Route path=":id" component={HomePage} />
			</Route>
		</Route>
		<Route path="*" component={NotFoundPage} />
	</Route>
);