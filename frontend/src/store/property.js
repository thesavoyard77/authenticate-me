import { csrfFetch } from './csrf';
const GET_ONE = 'properties/oneProperty';
const CREATE_PROPERTY = 'properties/createProperties';
const CHANGE_PROPERTY = 'properties/changeProperty';


//get one property by id
const getOneProperty = (property) => ({
    type: GET_ONE,
    property,
});

//Create a new property
const createOneProperty = (property) => ({
    type: CREATE_PROPERTY,
    payload: property,
});

//Update an existing property
const changeOneProperty = (property) => ({
    type: CHANGE_PROPERTY,
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

export const createProperty = (payload) => async (dispatch) => {
    const { images, image, name, address, userId, description, price } = payload;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("userId", userId);
    formData.append("description", description);
    formData.append("price", price);
  
    // for multiple files
    if (images && images.length !== 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
  
    // for single file
    if (image) formData.append("image", image);
  
    const res = await csrfFetch(`/api/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  
    const data = await res.json();
    dispatch(createOneProperty(data.property));
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



const initialState = {};
const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ONE: {
            const newState = {...state, ...action.property};
                return newState;
            };
            case CREATE_PROPERTY: {
                return {...state, property: action.payload }
                };
            case CHANGE_PROPERTY: {
                    const newState = {
                    ...state,
                    [action.property.id]: action.property
                 };
                    return newState;
                }

            default:
                return state;
    }

}

export default propertyReducer;