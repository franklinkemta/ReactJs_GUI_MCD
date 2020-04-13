// Root Reducer
import { combineReducers } from 'redux';
import modelReducer from './modelReducer';
import modelTypeReducer from './modelTypeReducer';
import instanceReducer from './instanceReducer';

export default combineReducers({
    model: modelReducer,
    modelType: modelTypeReducer,
    instance: instanceReducer,
}); // With all the reducers combined