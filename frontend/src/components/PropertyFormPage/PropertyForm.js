import './PropertyForm.css'
import { useEffect, useState } from 'react';
import { createProperty } from '../../store/properties';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'


const addPropertyForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [userId, setUserId] = useState(0)
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0.00)

    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateUserId = (e) => setUserId(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const userSession = useSelector(state => state.session.user)

    const payload = {
        name,
        address,
        userId,
        description,
        price,
    }


   const property = useEffect(()=> {
        dispatch(createProperty())

        if (property) history.push()
    },[dispatch]);



};
