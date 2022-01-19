

// Define action types as constants
const GET_PROPERTIES = 'properties/setProperties';

// define action creators

//get all properties
const getProperties = (properties) => ({
    type: GET_PROPERTIES,
    properties,
});


//define thunks

//get all properties
export const getAllProperties = () => async (dispatch) => {
  const res = await fetch('/api/properties')
  const properties = await res.json();
  dispatch(getProperties(properties))
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
    switch (action.type) {
        case GET_PROPERTIES:
            // console.log(action.properties)
            const newState = {...state, ...action.properties}
            // action.properties.forEach(property => newState[property.id] = property);
            return newState;
            default:
                return state;
    }

};


// export the reducer

export default propertiesReducer;
