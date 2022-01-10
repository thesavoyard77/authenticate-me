// import hooks from 'react'. Which hook is meant for causing side effects?
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fr"
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
    const { id } = useParams()
    const propertyName = useSelector((state) => state.properties?.name)
    const propertyAddress = useSelector((state) => state.properties?.address)
    const dispatch = useDispatch();
    // const propertyStructure = useSelector((state) => state.properties)
    const images = useSelector((state)=> state.properties?.Images)
    // console.log(images)

    useEffect(() => {
        dispatch(getProperty(id));
        return
        },[dispatch, id])
        // console.log(propertyName)
        const imageUrls = []

        const imageMap = () => {
            images?.map(image => {
                imageUrls.push(image?.imageUrl)
                console.log(imageUrls)
            })
        }
        imageMap()

        if (!propertyName) return null;
    return (
        <>
        <div>
            <p>{imageUrls[0]}</p>
        </div>
        </>
    )
}

export default PropertyPage;