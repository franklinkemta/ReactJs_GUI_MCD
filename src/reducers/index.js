// Root Reducer
import { combineReducers } from 'redux';
import modelReducer from './modelReducer';
import modelTypeReducer from './modelTypeReducer';

export default combineReducers({
    model: modelReducer,
    modelType: modelTypeReducer
}); // With all the reducers combined