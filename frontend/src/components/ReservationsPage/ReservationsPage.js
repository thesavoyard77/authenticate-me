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
const reservations = useSelector((state)=> state.reservations)
const properties = useSelector((state) => state.properties);
const userId = useSelector((state)=> state.session.user?.id)
const propertiesArray = Object.values(properties);
console.log(reservations)
// use a 'react' hook and cause a side effect
useEffect(()=> {
    dispatch(getProperties());
    dispatch(getReservations());
}, [dispatch]);





return (
<div className={'property-wrapper'}>
    {propertiesArray.map((property) =>  (
        <div  key={property.id} className="row">
            <div className="column">
                <div className="property-card">
                    <img src={cabin} id='cabin' alt="placeholder" />
                    <div className="property-container">
                        <h2><b>{property.name}</b></h2>
                        <p><b>Price Per Night</b><br /><b>$</b>{property.price}</p>
                    </div>
                </div>
            </div>
        </div>
    ))}

</div>

);


};

export default ReservationsPage;
