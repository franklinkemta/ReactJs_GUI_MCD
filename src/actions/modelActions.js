import {
    GET_MODELS,
    ADD_MODEL,
    DELETE_MODEL,
    MODELS_LOADING,
    ADD_MODEL_FIELD, // Append a new attribute to the model
} from './types';

// OUR TREATENT AROUND OUR MODELS
export const getModels = () => dispatch => {
    dispatch(setModelsLoading()); // set loading to true
    dispatch({
        type: GET_MODELS
    });
}

export const addModel = (title) => dispatch => {
    // Build a model base prototype before dispatching it to state (via reducer)
    const newModel = {
        title: title,
        fields: [] // Will contain our model dynamic fields
    }
    dispatch({
        type: ADD_MODEL,
        payload: newModel // the new model will be added to the ModelList
    });
    return newModel; // If its come from the backend return the created model
}

export const deleteModel = (title) => dispatch => {
    dispatch({
        type: DELETE_MODEL,
        payload: title
    });
}


export const setModelsLoading = () => {
    return {
        type: MODELS_LOADING
    }
}

export const addModelField = ({ title, newField }) => dispatch => {
    dispatch({
        type: ADD_MODEL_FIELD,
        payload: {
            title: title, // model title
            newField: newField // field definition
        }
    });
}