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
    const properties = useSelector((state) => Object.values(state.property))
    const dispatch = useDispatch();
    const { id } = useParams()

    // use a 'react' hook and cause a side effect
    useEffect(() => {
        dispatch(getProperty(id));
    },[dispatch, id])
}
