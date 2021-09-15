

// Define action types as constants
const SET_PROPERTIES = 'properties/setProperties'
const CREATE_PROPERTY = 'properties/createProperties'
// define action creators
const setProperties = (properties) => ({
    type: SET_PROPERTIES,
    properties,
});

const createOneProperty = (properties) => ({
    type: CREATE_PROPERTY,
    properties,
});
//define thunks
export const getProperties = () => async (dispatch) => {
  const res = await fetch('/api/properties', )
  const properties = await res.json();
  dispatch(setProperties(properties))
};

export const createProperty = (data) => async (dispatch) => {
    console.log(data)
    const response = await fetch(`/api/properties`, {
        method:'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if(response.ok) {
        const property = await response.json();
        dispatch(createOneProperty(property));
        return property
    }
};

// define an initial state
const initialState = {};

//define a reducer
const propertiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROPERTIES:
            const newState = {}
            action.properties.forEach(property => newState[property.id] = property);
            return newState;
        default:
            return state;
    }
};


// export the reducer

export default propertiesReducer;
