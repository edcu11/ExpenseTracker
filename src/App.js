
import React from 'react';
import PropTypes from 'prop-types';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';

const App = ({store,persistor, history}) => (
				<AppContainer>
					<Root 
						store={store} 
						persistor={persistor}
						history={history}
					/>
				</AppContainer>
			);

App.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	persistor: PropTypes.object.isRequired
};

export default App;