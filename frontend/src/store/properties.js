// Define action types as constants
const SET_PROPERTIES = 'properties/setProperties'

// define action creators
const setProperties = (properties) => ({
    type: SET_PROPERTIES,
    properties,
})
//define thunks
export const getUsers = () => async (dispatch) => {
  const res = await fetch('/api/properties', )
  const properties = await res.json();
  dispatch(setProperties(properties))
};

// define an initial state
const initialState = {};

//define a reducer
const propertiesReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


// export the reducer

export default propertiesReducer;
