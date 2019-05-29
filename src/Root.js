import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import routes from './routes';
import {Router} from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';


class Root extends Component {
	render() {
		const { store, history, persistor } = this.props;
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router history={history} routes={routes}/>
				</PersistGate>
			</Provider>
		);
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	persistor: PropTypes.object.isRequired,
};

export default Root;