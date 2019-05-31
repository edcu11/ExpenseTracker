import {
	combineReducers
} from 'redux';
import {
	routerReducer
} from 'react-router-redux';
import HomePageReducer from '../features/Home/reducer';
import AccountsReducer from '../features/Accounts/reducer';

const rootReducer = combineReducers({
	routing: routerReducer,
	home: HomePageReducer,
	accounts: AccountsReducer,
});

export default rootReducer;