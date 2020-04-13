import {
    GET_INSTANCES,
    DELETE_INSTANCE,
    INSTANCES_LOADING,
    ADD_INSTANCE_ITEM, // Append a new attribute to the instance
    ADD_INSTANCE
} from './types';

import { v1 as uuid } from 'uuid'; // generate unique id for instances records

// OUR TREATENT AROUND OUR INSTANCES
export const getInstances = () => dispatch => {
    dispatch(setInstancesLoading()); // set loading to true
    dispatch({
        type: GET_INSTANCES
    });
}

export const deleteInstance = (title) => dispatch => {
    dispatch({
        type: DELETE_INSTANCE,
        payload: title
    });
}


export const setInstancesLoading = () => {
    return {
        type: INSTANCES_LOADING
    }
}

export const addInstanceItem = ({ title, item }) => dispatch => {
    dispatch({
        type: ADD_INSTANCE_ITEM,
        payload: {
            _id: uuid(),
            title: title, // instance/model title
            item: item // item record
        }
    });
}

export const addInstance = (title) => dispatch => {
    // Add or Update instance in the instances list
    const newInstance = {
        title: title,
        items: [],
        build: class { // build instance class from model description
            // map fields to properties
            constructor(fields) {
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
                        this[fieldItem.field] = fieldValue // set the field whith his default value
                    })
                    // return this; // return the constructor
            }
        }
    }
    dispatch({
        type: ADD_INSTANCE,
        payload: newInstance // the new instance will be added to the InstanceList
    });
    console.log('Added instance', newInstance);
}

export const buildInstance = (model) => dispatch => {
    // const { title, fields } = model;
    const INSTANCE_BUILDER_CLASS = class { // i chosed class but i will try function later
        // Fill instance fields with construction values
        constructor({ title, fields }) { // Take a model as parameter
            this.title = title; // __title now a private value

        }
    };
    return INSTANCE_BUILDER_CLASS;
};