// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersReservations } from '../../store/reservations';
import { useParams } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom';

//import thunk creator
import  "./UserPage.css";
// import cabin from './PropertyImg/cabin.jpg';

const UsersPage = () => {
//declare variables from hooks
const dispatch = useDispatch();
const reservations = useSelector((state) => Object.values(state?.reservation))
// const userId = useSelector((state)=> state.session.user?.id)
const userId = useSelector((state)=> state.session.user?.id)
const history = useHistory();
// use a 'react' hook and cause a side effect
console.log(reservations)

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
<div className={'reservation-wrapper'}>
    {reservations?.map((reservation) =>  (
        <div  key={reservation.id} className="row">
            <div className="column">
                <div className="reservation-card">
                    {/* <img src={cabin} id='cabin' alt="placeholder" /> */}
                    <div className="reservation-container">
                        <img src={reservation?.Property?.Images[0]?.imageUrl}></img>
                        <h2><b>Cabin: {reservation?.Property?.name}</b></h2>
                        <p><b>Total Price</b><br /><b>$</b>{reservation?.totalPrice}</p>
                        <p><b>Dates of Stay</b><br /><b></b>{reservation?.startDate} to {reservation?.endDate}</p>
                        <div id="button">{<button type="button" onClick={()=> ModifyRes(reservation?.id)}>Details</button>}</div>
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

export default UsersPage;
