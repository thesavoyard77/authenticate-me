const GET_ONE = 'properties/oneProperty';

//get one property by id
const getOneProperty = (property) => ({
    type: GET_ONE,
    property,
});

//get one property by id
export const getProperty = (id) => async (dispatch) => {
    const response = await fetch(`/api/properties/${id}`)
    if (response.ok) {
        const property = await response.json();
        // console.log(property)
        dispatch(getOneProperty(property));
    };
};


const initialState = {};
const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ONE: {
            const newState = {...state, ...action.property};
                return newState;
            };
        default:
                return state;
    }

}

export default propertyReducer;