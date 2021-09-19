import './EditPropertyForm.css'
import { useState } from 'react';
import { changeProperty, deleteProperty } from '../../store/properties';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router';

const EditPropertyForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state)=> state.session.user?.id)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0.00)
    let { id } = useParams();
    id = parseInt(id);
    // console.log(id)
    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    if (!userId) {
        return <Redirect to="/properties" />
    };

 const handleSubmit = async (e) => {
    const payload = {
        name,
        address,
        userId,
        description,
        price,
    };


   const property = await dispatch(changeProperty(payload));
   if (property){
        history.push(`/properties/${property.id}`)

    };

};

const deleteButton = () => {
    dispatch(deleteProperty(id))
    history.push(`/properties`)
};

return (
<div className="add-form-outer-wrapper">
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
            type="textarea"
            placeholder="Property Address"
            required
            value={address}
            onChange={updateAddress}
            />
            <input
            type="textarea"
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
        <button type="button" onClick={deleteButton}>Cancel Reservation</button>
        </form>
    </section>
</div>

);

};

export default EditPropertyForm;
