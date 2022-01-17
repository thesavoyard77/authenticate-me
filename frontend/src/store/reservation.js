import { csrfFetch } from "./csrf";

//Get one reservation
const GET_RESERVATION = 'reservation/getReservation'
//Post a new reservation
const CREATE_RESERVATION = 'reservations/createReservation'
//delete a reservation
const DELETE_RESERVATION = 'reservations/deleteReservation'

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
const reservationReducer = (state = initialState, action) => {
    let newState;
 switch (action.type) {
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
export default reservationReducer;