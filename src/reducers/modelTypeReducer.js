// import { v1 as uuid } from 'uuid'; 
/* in this file we define the types including default types (Number, String, Boolean)
   and the custom types generated from existing model
   we use those modelType to type our model fields (attributes) and for model instanciation
*/
import {
    GET_MODELTYPES,
    ADD_MODELTYPE,
    DELETE_MODELTYPE,
    MODELTYPES_LOADING
} from '../actions/types';

const initialState = {
    modelTypes: [{
            core: true,
            name: 'Number'
        },
        {
            core: true,
            name: 'String'
        },
        {
            core: true,
            name: 'Boolean'
        },
        /* To remove
        {   
            core: false,
            name: 'School',
            modelId: QPSLDKPESDDSPDSD // refer to the _id of the model in the existing models list.
        }, 
        */
    ],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MODELTYPES:
            return {
                ...state,
                modelTypes: action.payload,
                loading: false
            };
        case DELETE_MODELTYPE:
            return {
                ...state,
                modelTypes: state.modelTypes.filter(modelType => modelType.name !== action.payload)
            };
        case ADD_MODELTYPE:
            const modelTypes = state.modelTypes.filter(modelType => modelType.name !== action.payload.name)
            return {
                ...state,
                modelTypes: [action.payload, ...modelTypes]
            }
        case MODELTYPES_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}