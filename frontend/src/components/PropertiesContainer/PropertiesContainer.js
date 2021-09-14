// import hools from 'react'. Which hook is meant for causing side effects?
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
debugger;
// use a 'react' hook and cause a side effect
useEffect(()=> {
    dispatch(getProperties());
}, [dispatch]);


return (
    <div className={'property-wrapper'}>
        <table className={'table-wrapper'}>
            <thead className={'thead'}>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
        </table>
    </div>

);


};

export default PropertiesContainer;
