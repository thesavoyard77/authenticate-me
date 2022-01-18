// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import thunk creator
import { getAllProperties } from '../../store/properties';
import  "./PropertiesContainer.css";
import { NavLink } from 'react-router-dom';
// import cabin from './PropertyImg/cabin.jpg';


const AllProperties = () => {
//declare variables from hooks
const dispatch = useDispatch();
const properties = useSelector((state) => state.properties);
const propertiesArray = Object.values(properties);
// console.log({properties}, '<-------------properties deconstructed')
// console.log(propertiesArray, '<-------------propertiesArray')

// use a 'react' hook and cause a side effect
useEffect(() => {
    dispatch(getAllProperties());
    return
}, [dispatch]);


return (
<div className='cards'>
    {propertiesArray.map((property) =>  (
        <div  key={property.id} className="card">
            <NavLink to={`/properties/${property?.id}`}><img src={property?.Images[0]?.imageUrl} className='card-image' alt='cabin outside' /></NavLink>
            <div className="card-content">
                <h2><b>{property.name}</b></h2>
                <p><b>Price Per Night</b><br /><b>$</b>{property.price}</p>
            </div>
            <div className='card-navlink'>
            <NavLink to={`/properties/${property?.id}`} className='nav-text'>Availability</NavLink>
            </div>
        </div>
    ))}

</div>

);


};

export default AllProperties;
