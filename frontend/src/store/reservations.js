import { csrfFetch } from "./csrf";

//Define actions types as constants

//Get reservations
const GET_RESERVATIONS = 'reservations/getReservations';


// define action creators
//Get reservations
const getReservations = (reservations) => {
return {
    type: GET_RESERVATIONS,
    reservations
 }
};


//define thunks
//Get reservations
export const getUsersReservations = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reservations/user/${userId}`)
    const reservations = await res.json();

    dispatch(getReservations(reservations))
};



// define an initial state
const initialState = {};

//define a reducer
const reservationsReducer = (state = initialState, action) => {
    let newState;
 switch (action.type) {
     case GET_RESERVATIONS:
        newState = {...state, ...action.reservations}
        return newState;

     default:
         return state;
 }
}

// export the reducer
export default reservationsReducer;
