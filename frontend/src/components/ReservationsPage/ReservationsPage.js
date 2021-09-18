// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations, deleteReservation } from '../../store/reservations';
//import thunk creator
import { getProperties } from '../../store/properties';
import  "./ReservationsPage.css";
import cabin from './PropertyImg/cabin.jpg';

const ReservationsPage = () => {
//declare variables from hooks
const dispatch = useDispatch();
const reservations = useSelector((state)=> state.reservation)
const properties = useSelector((state) => state.properties);
const userId = useSelector((state)=> state.session.user?.id)
const reservationsArray = Object.values(reservations);
// console.log("---------------->",reservations)
// console.log("---------------->",properties)
// use a 'react' hook and cause a side effect
useEffect(()=> {
    dispatch(getProperties());
    dispatch(getReservations());
    dispatch(deleteReservation());
}, [dispatch]);





return (
<div className={'reservation-wrapper'}>
    {reservationsArray.map((reservation) =>  (
        <div  key={reservation.id} className="row">
            <div className="column">
                <div className="reservation-card">
                    <img src={cabin} id='cabin' alt="placeholder" />
                    <div className="reservation-container">
                        <h2><b>{reservation.userId}</b></h2>
                        <p><b>Total Price</b><br /><b>$</b>{reservation.totalPrice}</p>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    ))}

</div>

);


};

export default ReservationsPage;
