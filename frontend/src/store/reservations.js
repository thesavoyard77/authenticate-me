import { csrfFetch } from "./csrf";

//Define actions types as constants

//Get reservations
const GET_RESERVATIONS = 'reservations/setReservations';
//Get one reservation
const GET_RESERVATION = 'reservations/getReservation'
//Post a new reservation
const CREATE_RESERVATION = 'reservations/createReservation'
//delete a reservation
const DELETE_RESERVATION = 'reservations/deleteReservation'

// define action creators
//Get reservations
const getReservations = (reservations) => {
return {
    type: GET_RESERVATIONS,
    reservations
 }
};

//Get one reservation
const getOneReservation = (reservation) => ({
    type: GET_RESERVATION,
    reservation,
})

//Post a new reservation
const createOneReservation = (reservations) => ({
 type: CREATE_RESERVATION,
 reservations,
});

//Delete a reservation
const deleteOneReservation = (reservations) => ({
    type: DELETE_RESERVATION,
    reservations,
})


//define thunks
//Get reservations
export const getUsersReservations = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reservations/user/${userId}`)
    const reservations = await res.json();

    dispatch(getReservations(reservations))
};

//Get one reservation
export const getReservation = (id) => async (dispatch) => {
 const response = await fetch(`/api/reservations/${id}`)

 if (response.ok) {
     const reservation =await response.json();
     dispatch(getOneReservation(reservation));
    };
};

//Post a new reservation
export const createReservation = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/reservations`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    if (response.ok) {
        const reservation = await response.json();
        dispatch(createOneReservation(reservation));
        return reservation;
    };
};

//Delete a reservation
export const deleteReservation = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reservations/${id}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(deleteOneReservation(id));
    };
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
     case GET_RESERVATION: {
             newState = {
             ...state,
             [action.reservation.id]: action.reservation
         }
             return newState;
         }
     case CREATE_RESERVATION: {
         const newState = {
             ...state,
             [action.reservations.id]: action.reservations
             };
             return newState;
             };
     case DELETE_RESERVATION: {
         const newState = {...state};
         delete newState[action.reservations]
         return newState;
        }
     default:
         return state;
 }
}

// export the reducer
export default reservationsReducer;
