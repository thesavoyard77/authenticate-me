// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";

//import thunk creator
import { getProperty } from "../../store/properties";


const PropertyPage = () => {
    //declare variables from hooks
    const { id } = useParams()
    const property = useSelector((state) => Object.values(state.properties))
    const dispatch = useDispatch();


    // use a 'react' hook and cause a side effect
    useEffect(() => {
        dispatch(getProperty(id));
    },[dispatch, id])


return (
 <div className="property-outer-wrapper">
    <div className="property-second-layer">
        <div class="property-card">
                 <img src={ require('./PropertyImg/cabin.jpg')} />
             <div class="property-container">
                 <h2><b>{property.name}</b></h2>
                 <p>{property.address}</p>
                 <p>{property.description}</p>
                 <p>{`Price Per Night: ${property.price}`}</p>
             </div>
        </div>
    </div>
</div>
)
}

export default PropertyPage;
