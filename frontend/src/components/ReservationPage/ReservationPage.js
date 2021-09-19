import './ReservationPage.css'
import cabin from './PropertyImg/cabin.jpg'
// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
// import { NavLink } from "react-router-dom";

//import thunk creator
import { deleteReservation, getReservation } from '../../store/reservations';


const ReservationPage = () => {
    //declare variables from hooks

    const { id } = useParams()
    const dispatch = useDispatch();
    const userId = useSelector((state)=> state.session.user?.id)
    const history = useHistory();
    const reservation = useSelector((state) => Object.values(state.reservation))
    const property = reservation[0]?.Property;
    // console.log('==========>', property)



    // use a 'react' hook and cause a side effect

    useEffect(()=> {
        dispatch(getReservation(id))
    }, [dispatch, id]);


 const handleDelete = async () => {
    dispatch(deleteReservation(id))
     history.push(`/users/${userId}/reservations`)
 }


 if (!userId) {
    return <Redirect to="/properties" />
};
return (
 <div className="reservation-outer-wrapper">
    <div className="reservation-second-layer">

        <div className="reservation-card">
                 <img id="cabin-pic" src={cabin} alt="placeholder" />
             <div className="reservation-container">
                <h2><b>{property?.name}</b></h2>
                <p>{property?.address}</p>
                <p><b>Start Date: </b>{reservation[0]?.startDate} <b>To: </b>{reservation[0]?.endDate}</p>
                <p><b>Total Price of Stay: $</b>{reservation[0]?.totalPrice}</p>
                <button onClick={handleDelete}>Cancel</button>
             </div>
        </div>
    </div>
</div>
)
}

export default ReservationPage;
