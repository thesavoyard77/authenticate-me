import { csrfFetch } from './csrf';

// Define action types as constants
const GET_PROPERTIES = 'properties/setProperties';
const DELETE_PROPERTY = 'properties/deleteProperty';
// define action creators

//get all properties
const getProperties = (properties) => ({
    type: GET_PROPERTIES,
    properties,
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

//delete a property
export const deleteProperty = (property) => async (dispatch) => {
    const response = await csrfFetch(`/api/properties/${property}`, {
        method: 'delete',
    })
    if(response.ok) {
        dispatch(deleteOneProperty(property));
    };
};



// //Create a new property
// export const createProperty = (data) => async (dispatch) => {
//     // console.log(data)
//     const response = await csrfFetch(`/api/properties`, {
//         method:'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(data),
//     });

//     if(response.ok) {
//         const property = await response.json();
//         dispatch(createOneProperty(property));
//         return property
//     };
// };



// define an initial state
const initialState = {};

//define a reducer
const propertiesReducer = (state = initialState, action) => {
    var newState = {};
    switch (action.type) {
        case GET_PROPERTIES:
            action.properties.forEach((property)=> {
                newState[property.id] = property
            })
            return newState;
        case DELETE_PROPERTY: 
            newState = {...state};
            delete newState[action.property]
            return newState;
        default:
            return state;
    }

};


// export the reducer

export default propertiesReducer;
