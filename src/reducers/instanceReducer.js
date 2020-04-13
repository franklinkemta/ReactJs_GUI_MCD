// import { v1 as uuid } from 'uuid'; 

import {
    GET_INSTANCES,
    DELETE_INSTANCE,
    INSTANCES_LOADING,
    ADD_INSTANCE_ITEM,
    ADD_INSTANCE
} from '../actions/types';

const initialState = {
    instances: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_INSTANCES:
            return {
                ...state,
                instances: action.payload,
                loading: false
            };
        case DELETE_INSTANCE:
            return {
                ...state,
                instances: state.instances.filter(instance => instance.title !== action.payload)
            };
        case ADD_INSTANCE:
            const instances = state.instances.filter(instance => instance.title !== action.payload.title)
            return {
                ...state,
                instances: [...instances, action.payload]
            }
        case ADD_INSTANCE_ITEM:
            let instancesList = state.instances.slice();
            // Get the instance Index
            const instanceIndex = instancesList.findIndex(m => m.title === action.payload.title);

            // Update the instance at the index adding the new item
            instancesList[instanceIndex].items.push({
                _id: action.payload._id,
                ...action.payload.item
            });

            return {
                ...state,
                instances: instancesList
            }
        case INSTANCES_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}