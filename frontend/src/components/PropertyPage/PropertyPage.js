// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'

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
    const { startDate, setStartDate } = useState(Date.now)
    const { endDate, setEndDate } = useState(Date.now)
//  console.log(property)

 const updateStart = (e) => setEndDate(e.target.value)
 const updateEnd = (e) => setEndDate(e.target.value)
    // use a 'react' hook and cause a side effect
    useEffect(() => {
        dispatch(getProperty(id));
    },[dispatch, id])

    useEffect(() => {
        dispatch(createReservation(id));
    },[dispatch, id])



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
             <label htmlFor="start">Start date:</label>
            <input type="date" id="start" name="stay-start"
             value={startDate}
             min={startDate}
             onChange={updateStart}
             ></input><br />
            <label htmlFor="end">End date:</label>
            <input type="date" id="end" name="stay-end"
             value={endDate}
             min={startDate}
             onChange={updateEnd}
             ></input>
        </div>
    </div>
</div>
)
}

export default PropertyPage;
