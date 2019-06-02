import {
	combineReducers
} from 'redux';
import {
	routerReducer
} from 'react-router-redux';
import HomePageReducer from '../features/Expenses/reducer';
import AccountsReducer from '../features/Accounts/reducer';

const rootReducer = combineReducers({
	routing: routerReducer,
	expenses: HomePageReducer,
	accounts: AccountsReducer
});

export default rootReducer;