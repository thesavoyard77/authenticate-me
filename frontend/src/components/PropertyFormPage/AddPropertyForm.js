import './PropertyForm.css'
import { useState } from 'react';
import { createProperty } from '../../store/properties';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'


const AddPropertyForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state)=> state.session.user.id)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0.00)

    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);


 const handleSubmit = async (e) => {
    const payload = {
        name,
        address,
        userId,
        description,
        price,
    };


   const property = await dispatch(createProperty(payload));
   if (property){
        history.push(`/properties/${property.id}`)

    };

};

const handleCancelClick = (e) => {
    e.preventDefault();

}

return (
    <section className="new-form-holder">
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Property Name"
            required
            value={name}
            onChange={updateName}
            />
            <input
            type="text"
            placeholder="Property Address"
            required
            value={address}
            onChange={updateAddress}
            />
            <input
            type="text"
            placeholder="Property Description"
            required
            value={description}
            onChange={updateDescription}
            />
            <input
            type="number"
            required
            value={price}
            onChange={updatePrice}
            />
        <button type="submit">Submit Your Property</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </section>

);

};

export default AddPropertyForm;
