import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from '../../store/reservations';
//import thunk creator
import { getProperties } from '../../store/properties';

const ReservationFinder = () => {
const findUser = useSelector((state)=> state.session.user?.id)
const reservations = useSelector((state)=> state.reservations)
const properties = useSelector((state) => state.properties);
const dispatch = useDispatch();
console.log(findUser, 'findUser=====')
console.log(reservations, 'reservations=====')
console.log(properties, 'properties=====')

useEffect(()=> {
    dispatch(getProperties());
    dispatch(getReservations());
}, [dispatch]);
 return (
     <div>

     </div>
 )

}

export default ReservationFinder;
