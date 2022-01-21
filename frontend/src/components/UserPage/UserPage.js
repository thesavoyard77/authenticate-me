// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersReservations } from '../../store/reservations';
import { Redirect, useHistory } from 'react-router-dom';

//import thunk creator
import  "./UserPage.css";
// import cabin from './PropertyImg/cabin.jpg';

const UsersPage = () => {
//declare variables from hooks
const dispatch = useDispatch();
const reservations = useSelector((state) => Object.values(state?.reservations))
// const userId = useSelector((state)=> state.session.user?.id)
const userId = useSelector((state)=> state.session.user?.id)
const history = useHistory();
// use a 'react' hook and cause a side effect
// console.log(reservations)

useEffect(()=> {
    dispatch(getUsersReservations(userId))
}, [dispatch, userId]);


if (!userId) {
    return <Redirect to="/properties" />
};

const ModifyRes = (id) => {
    // e.preventDefault()
    history.push(`/reservations/${id}`)
};


return (
<div className="cards" >
    {reservations?.map((reservation) =>  (
                
                    <div className="card" key={reservation.id}>
                        <img src={reservation?.Property?.Images[0]?.imageUrl} className='card-image' alt='cabin outside'></img>
                            <div className='card-content'>
                                <h2><b>{reservation?.Property?.name}</b></h2>
                                <p><b>Total Price</b><br /><b>$</b>{reservation?.totalPrice}</p>
                                <p><b>Dates of Stay</b><br /><b></b>{reservation?.startDate} to {reservation?.endDate}</p>
                            </div>
                        <div id="button" className='card-button'>
                            {<button type="button" onClick={()=> ModifyRes(reservation?.id)}>Reservation Details</button>}
                        </div>
                    </div>
              

    ))}

</div>

);


};

export default UsersPage;
