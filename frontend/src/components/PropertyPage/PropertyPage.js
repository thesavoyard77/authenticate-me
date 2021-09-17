// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
// import { NavLink } from "react-router-dom";
import cabin from './PropertyImg/cabin.jpg'
import "./PropertyPage.css"
//import thunk creator
import { getProperty } from "../../store/properties";
import { createReservation } from "../../store/reservations";


const PropertyPage = () => {
    //declare variables from hooks

    // id is property id from url
    const { id } = useParams()
    const property = useSelector((state) => Object.values(state.properties))
    const dispatch = useDispatch();
    const userId = useSelector((state)=> state.session.user?.id)
    const [ startDate, setStartDate ] = useState(Date.now)
    const [ endDate, setEndDate ] = useState(Date.now)
    const history = useHistory();
    const propertyId = id;
    const propertyObj = property[0];
    const cost = parseInt(propertyObj.price)

 const updateStart = (e) => setStartDate(e.target.value)
 const updateEnd = (e) => setEndDate(e.target.value)
    // use a 'react' hook and cause a side effect
    useEffect(() => {
        dispatch(getProperty(id));
    },[dispatch, id])
    const begin = new Date(startDate)
    const end = new Date(endDate)
    const lengthOfStay = end - begin;
    console.log(lengthOfStay)
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
          history.push(`/reservations`)

      };
 }



if (!property[0]) return null;
return (
 <div className="property-outer-wrapper">
    <div className="property-second-layer">

        <div className="property-card">
                 <img src={cabin} alt="placeholder" />
             <div className="property-container">
                 <h2><b>{property[0].name}</b></h2>
                 <p>{property[0].address}</p>
                 <p>{property[0].description}</p>
                 <p><b>Price Per Night: </b>{property[0].price}</p>
             </div>
                <div className="calendars">
                <form onSubmit={handleSubmit} >
                    <input
                        type="date"
                        required
                        value={startDate}
                        min={startDate}
                        onChange={updateStart}
                        /><br />
                    <input
                        type="date"
                        required
                        value={endDate}
                        min={startDate}
                        onChange={updateEnd}
                        />
                        <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
)
}

export default PropertyPage;
