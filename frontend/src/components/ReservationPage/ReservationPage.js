import './ReservationPage.css'
// import cabin from './PropertyImg/cabin.jpg'
// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';

// import { NavLink } from "react-router-dom";

//import thunk creator
import { getReservation, deleteReservation } from '../../store/reservation';
// import { Carousel } from 'react-carousel-minimal';


const ReservationPage = () => {
    //declare variables from hooks

    const { id } = useParams()
    const dispatch = useDispatch();
    const userId = useSelector((state)=> state.session.user?.id)
    const history = useHistory();
    const reservation = useSelector((state) => Object.values(state?.reservation))
    const property = reservation[0]?.Property;
    // const propertyId = property?.id
    const images = reservation[0]?.Property?.Images
  
   



    // use a 'react' hook and cause a side effect

    useEffect(()=> {
        dispatch(getReservation(id))
        // dispatch(getProperty(propertyId));
        return
    }, [dispatch, id]);
    

    const imageUrls = []


    const imageMap = () => {
        images?.map(image => {
            imageUrls.push(image?.imageUrl)
            // console.log(imageUrls)
            return null;
        })
    }
imageMap()



 const handleDelete = async () => {
    dispatch(deleteReservation(id))
     history.push(`/users/${userId}/reservations`)
 }



 if (!userId) {
    return <Redirect to="/properties" />
};
return (
 <div className="reservation-card">
    <div className="card">
    <img src={imageUrls[0]} className='reservation-card-image' alt='cabin outside'></img>
        <div className='card-content'>  

                <h2><b>{property?.name}</b></h2>
                <p>{property?.address}</p>
                <p><b>Start Date: </b>{reservation[0]?.startDate} <b>To: </b>{reservation[0]?.endDate}</p>
                <p><b>Total Price of Stay: $</b>{reservation[0]?.totalPrice}</p>
           <div id="button" className='card-button'>
                  <button onClick={handleDelete}>Cancel Reservation</button>
          </div>
        </div>
    </div>
</div>
)
}

export default ReservationPage;
