import { csrfFetch } from './csrf';

// Define action types as constants
const GET_PROPERTIES = 'properties/setProperties';
const CREATE_PROPERTY = 'properties/createProperties';
const GET_ONE = 'properties/oneProperty';
const CHANGE_PROPERTY = 'properties/changeProperty';
const DELETE_PROPERTY = 'properties/deleteProperty';
// define action creators

//get all properties
const getProperties = (properties) => ({
    type: GET_PROPERTIES,
    properties,
});

//get one property by id
const getOneProperty = (property) => ({
    type: GET_ONE,
    property,
});

//Create a new property
const createOneProperty = (properties) => ({
    type: CREATE_PROPERTY,
    properties,
});

//Update an existing property
const changeOneProperty = (property) => ({
    type: CHANGE_PROPERTY,
    property,
});

//Delete a property by ID
const deleteOneProperty = (property) => ({
    type: DELETE_PROPERTY,
    property,
})

//define thunks

//get all properties
export const getAllProperties = () => async (dispatch) => {
  const res = await fetch('/api/properties')
  const properties = await res.json();
  dispatch(getProperties(properties))
};

//get one property by id
export const getProperty = (id) => async (dispatch) => {
    const response = await fetch(`/api/properties/${id}`)
    if (response.ok) {
        const property = await response.json();
        // console.log(property)
        dispatch(getOneProperty(property));
    };
};

//Create a new property
export const createProperty = (data) => async (dispatch) => {
    // console.log(data)
    const response = await csrfFetch(`/api/properties`, {
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });

    if(response.ok) {
        const property = await response.json();
        dispatch(createOneProperty(property));
        return property
    };
};

// Update an existing property
export const changeProperty = (payload, id) => async (dispatch) => {
    // console.log(data)
    const { name, address, userId, description, price } = payload
    const response = await csrfFetch(`/api/properties/${id}/edit`, {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            address,
            userId,
            description,
            price,
        }),
    });
    if(response.ok) {
        const property = await response.json();
        dispatch(changeOneProperty(property));
        return property;
    };
};

//delete a property
export const deleteProperty = (data) => async (dispatch) => {
        const response = await csrfFetch(`/api/properties/${data}`, {
            method: 'delete',
        })
        if(response.ok) {
            dispatch(deleteOneProperty(data));
        };
};

// define an initial state
const initialState = {};

//define a reducer
const propertiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROPERTIES:
            // console.log(action.properties)
            const newState = {...state, ...action.properties}
            // action.properties.forEach(property => newState[property.id] = property);
            return newState;
        case GET_ONE: {
            const newState = {...state, ...action.property};
                return newState;
            };

        case CREATE_PROPERTY: {
            const newState = {
                ...state,
                [action.properties.id]: action.properties
            };
                return newState;
            };
        case CHANGE_PROPERTY: {
                const newState = {
                ...state,
                [action.property.id]: action.property
             };
                return newState;
            }
            case DELETE_PROPERTY: {
                const newState = {...state};
                delete newState[action.property]
                return newState;
            }
            default:
                return state;
    }

};


// export the reducer

export default propertiesReducer;
