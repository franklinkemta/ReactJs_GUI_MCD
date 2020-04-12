// import { v1 as uuid } from 'uuid'; 

import {
    GET_MODELS,
    ADD_MODEL,
    DELETE_MODEL,
    MODELS_LOADING,
    ADD_MODEL_FIELD
} from '../actions/types';

const initialState = {
    models: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MODELS:
            return {
                ...state,
                models: action.payload,
                loading: false
            };
        case DELETE_MODEL:
            return {
                ...state,
                models: state.models.filter(model => model.title !== action.payload)
            };
        case ADD_MODEL:
            const models = state.models.filter(model => model.title !== action.payload.title)
            return {
                ...state,
                models: [...models, action.payload]
            }
        case ADD_MODEL_FIELD:
            let modelsList = state.models.slice();
            // Get the model Index
            const modelIndex = modelsList.findIndex(m => m.title === action.payload.title);

            // Update the field if it already exist
            modelsList[modelIndex].fields = modelsList[modelIndex].fields.filter(m => m.field !== action.payload.newField.field) // remove the field if it already exist;

            // Update the model at the index adding the new field
            modelsList[modelIndex].fields.push(action.payload.newField);

            return {
                ...state,
                models: modelsList
            }
        case MODELS_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}