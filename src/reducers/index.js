import {
	combineReducers
} from 'redux';
import {
	routerReducer
} from 'react-router-redux';
import HomePageReducer from '../features/Home/reducer';


const rootReducer = combineReducers({
	routing: routerReducer,
	home: HomePageReducer,
});

export default rootReducer;