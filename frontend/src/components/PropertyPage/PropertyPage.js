// import hooks from 'react'. Which hook is meant for causing side effects?
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fr"
// import hooks from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
// import { NavLink } from "react-router-dom";
import "./PropertyPage.css"
//import thunk creator
import { getProperty } from "../../store/property";
import { createReservation } from "../../store/reservation";
import { Carousel } from 'react-carousel-minimal';



const PropertyPage = () => {
    const { id } = useParams()
    const propertyId = id;
    const propertyName = useSelector((state) => state.property?.name)
    const propertyAddress = useSelector((state) => state.property?.address)
    const propertyDescription = useSelector((state) => state.property?.description)
    const propertyPrice = useSelector((state) => state.property?.price)
    const propertyOwner = useSelector((state) => state.property?.userId)
    const dispatch = useDispatch();
    const images = useSelector((state)=> state.property?.Images)
    const userId = useSelector((state)=> state.session.user?.id)
    const history = useHistory();
    const [ startDate, setStartDate ] = useState(Date.now)
    const [ endDate, setEndDate ] = useState(Date.now)
    const updateStart = (e) => setStartDate(e.target.value)
    const updateEnd = (e) => setEndDate(e.target.value)
    const cost = parseInt(propertyPrice || 0);

    const begin = new Date(startDate)
    const end = new Date(endDate)

    const lengthOfStay =( end - begin) / 86400000;

    const totalPrice = cost * lengthOfStay;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            userId,
            propertyId,
            startDate,
            endDate,
            totalPrice,
        }

    const reservation = await dispatch(createReservation(payload));
    if (reservation){
        history.push(`/users/${userId}/reservations`)

    };
 }



    useEffect(() => {
        dispatch(getProperty(id));
        return
        },[dispatch, id])
        // console.log(propertyName)


        const imageUrls = []


        const imageMap = () => {
            images?.map(image => {
                imageUrls.push({image: `${image?.imageUrl}`})
                // console.log(imageUrls)
                return null;
            })
        }
 imageMap()

//  console.log(imageUrls)



    const toEditPage = () => {
        history.push(`/properties/${id}/edit`)
    }


    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }


     if (!propertyName) return null;
    return (
        <div className="property-outer-wrapper">
        <div className="property-second-layer">
            <div className="property-card">
            <div className="App">
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
    </div>
                 <div className="property-container">
                     <h2><b>{propertyName}</b></h2>
                     <p><b>Address: </b>{propertyAddress}</p>
                     <p><b>Description: </b>{propertyDescription}</p>
                     <p><b>Price Per Night: </b>{propertyPrice}</p>
                 </div>
                    <div className="calendars">
                    <form onSubmit={handleSubmit} >
                        <div>
                    <p><b>Start Date:</b></p>
                        <input
                            type="date"
                            required
                            value={startDate}
                            min={startDate}
                            onChange={updateStart}
                            />
                            <p><b>End Date:</b></p>
                        <input
                            type="date"
                            required
                            value={endDate}
                            min={startDate}
                            onChange={updateEnd}
                            />
                            </div>
                            <button type="submit">Submit Reservation</button>
                            {propertyOwner === userId && <button type="submit" onClick={toEditPage}>Edit Property</button>}
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PropertyPage;