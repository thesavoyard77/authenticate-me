import './ReservationPage.css'
// import cabin from './PropertyImg/cabin.jpg'
// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
import { getProperty } from "../../store/property";
// import { NavLink } from "react-router-dom";

//import thunk creator
import { deleteReservation, getReservation } from '../../store/reservations';
import { Carousel } from 'react-carousel-minimal';


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

 const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }


 if (!userId) {
    return <Redirect to="/properties" />
};
return (
 <div className="reservation-outer-wrapper">
    <div className="reservation-second-layer">

        <div className="reservation-card">
        {/* <div className="App">
      <div style={{ textAlign: "center" }}>

        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={imageUrls}
            time={2000}
            width="50rem"
            height="30rem"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="top"
            automatic={false}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div> */}
             <div className="reservation-container">
                <h2><b>{property?.name}</b></h2>
                <p>{property?.address}</p>
                <p><b>Start Date: </b>{reservation[0]?.startDate} <b>To: </b>{reservation[0]?.endDate}</p>
                <p><b>Total Price of Stay: $</b>{reservation[0]?.totalPrice}</p>
                <button onClick={handleDelete}>Cancel Reservation</button>
             </div>
        </div>
    </div>
</div>
)
}

export default ReservationPage;
