import {
    GET_MODELS,
    ADD_MODEL,
    DELETE_MODEL,
    MODELS_LOADING,
    ADD_MODEL_FIELD, // Append a new attribute to the model
    BUILD_MODEL, // Build a Custom Model Class/Function and return and instanciable Object 
} from './types';

import { v1 as uuid } from 'uuid'; // To generate uniqueKey for our models

// OUR TREATENT AROUND OUR MODELS
export const getModels = () => dispatch => {
    dispatch(setModelsLoading()); // set loading to true
}

export const addModel = (title) => dispatch => {
    // Build a model base prototype before dispatching it to state (via reducer)
    const newModel = {
        _id: uuid(),
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

export const buildModel = (fields) => dispatch => {
    // const { id, title, fields } = model;
    const MODEL_BUILDER = () => { // i chosed class but i will try function later
        // this._id = id; // _id now a private value indicating the class
        // this.title = title; // __title now a private value
        // Fill model fields with construction values
        fields.map((fieldItem) => {
            let fieldValue;
            switch (fieldItem.type) {
                case 'Number':
                    fieldValue = Number();
                    break;
                case 'Boolean':
                    fieldValue = Boolean();
                    break;
                case 'String':
                    fieldValue = String();
                    break;
                default: // custom type
                    fieldValue = Object();
                    break;
            }
            this[fieldItem.field] = fieldValue
        })
    };

    dispatch({
        type: BUILD_MODEL
    });
    return MODEL_BUILDER;
}