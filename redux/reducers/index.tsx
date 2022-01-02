import { combineReducers } from 'redux';
import addressReducer from './addressReducer';
import cartReducer from './cartReducer';

let reducers = combineReducers({
	cartReducer: cartReducer,
	addressReducer: addressReducer,
});

const rootReducer = (state, action) => {
	return reducers(state, action);
};

export default rootReducer;
