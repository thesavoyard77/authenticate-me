// import hooks from 'react'. Which hook is meant for causing side effects?
// import hooks from 'react-redux'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import thunk creator
import { getProperties } from '../../store/properties';
import  "./PropertiesContainer.css"

const PropertiesContainer = () => {
//declare variables from hooks
const dispatch = useDispatch();
const properties = useSelector((state) => state.properties);
const propertiesArray = Object.values(properties);

// use a 'react' hook and cause a side effect
useEffect(()=> {
    dispatch(getProperties());
}, [dispatch]);


return (
    <div className={'property-wrapper'}>
        <table className={'table-wrapper'}>
            <thead className={'thead'}>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody className={'tbody'}>
            {propertiesArray.map((property) =>  (
               <tr key={property.id}>
                   <td>{property.name}</td>
                   <td>{property.address}</td>
                   <td>{property.description}</td>
                   <td>{property.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>

);


};

export default PropertiesContainer;
