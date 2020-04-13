import {
    GET_MODELTYPES,
    ADD_MODELTYPE,
    DELETE_MODELTYPE,
    MODELTYPES_LOADING
} from './types';


export const getModelTypes = () => dispatch => {
    dispatch(setModelTypesLoading()); // set loading to true
    // rember proxy on the package.json
    dispatch({
        type: GET_MODELTYPES
    });
}

export const addModelType = (modelType) => dispatch => {
    dispatch({
        type: ADD_MODELTYPE,
        payload: modelType // The new Model title will be added as a modelType if not already exist
    });
    console.log('created model type', modelType);
}

export const deleteModelType = (name) => dispatch => {
    dispatch({
        type: DELETE_MODELTYPE,
        payload: name
    });
}



export const setModelTypesLoading = () => {
    return {
        type: MODELTYPES_LOADING
    }
}