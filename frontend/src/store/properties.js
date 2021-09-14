// Define action types as constants
const SET_PROPERTIES = 'properties/setProperties'

// define action creators
const setProperties = (properties) => ({
    type: SET_PROPERTIES,
    properties,
});
//define thunks
export const getProperties = () => async (dispatch) => {
  const res = await fetch('/api/properties', )
  const properties = await res.json();
  dispatch(setProperties(properties))
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
