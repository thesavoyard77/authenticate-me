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
<div className={'property-wrapper'}>
    {propertiesArray.map((property) =>  (
        <div  key={property.id} className="row">
            <div className="column">
                <div className="property-card">
                    <NavLink to={`/properties/${property?.id}`}><img src={property?.Images[0]?.imageUrl} id='cabin' alt="outside of property" /></NavLink>
                    <div className="property-container">
                        <h2><b>{property.name}</b></h2>
                        <p><b>Price Per Night</b><br /><b>$</b>{property.price}</p>
                    </div>
                </div>
            </div>
        </div>
    ))}

</div>

);


};

export default AllProperties;
