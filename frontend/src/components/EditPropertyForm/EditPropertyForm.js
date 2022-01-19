import './EditPropertyForm.css'
import { useState, useEffect } from 'react';
import { changeProperty } from '../../store/property';
import { deleteProperty } from '../../store/properties';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router';
import { getProperty } from "../../store/property";

const EditPropertyForm = () => {

    const propertyName = useSelector((state) => state.property?.name)
    const propertyAddress = useSelector((state) => state.property?.address)
    const propertyDescription = useSelector((state) => state.property?.description)
    const propertyPrice = useSelector((state) => state.property?.price)
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state)=> state.session.user?.id)
    const [name, setName] = useState(`${propertyName}`)
    const [address, setAddress] = useState(`${propertyAddress}`)
    const [description, setDescription] = useState(`${propertyDescription}`)
    const [price, setPrice] = useState(`${propertyPrice}`)
    let { id } = useParams();
    const [image, setImage] = useState(null);
    // const [images, setImages] = useState(null);
    // const [errors, setErrors] = useState([]);
    id = parseInt(id);


    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);


    useEffect(() => {
        dispatch(getProperty(id));
        return
        },[dispatch, id])

    if (!userId) {
        return <Redirect to="/properties" />
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
        console.log(file)
    };

    // //   for multiple file upload
    // const updateFiles = (e) => {
    //   const files = e.target.files;
    //   setImages(files);
    // };

 const handleSubmit = async (e) => {
     e.preventDefault()
    const payload = {
        name,
        address,
        userId,
        description,
        price,
        image,
    };
    console.log(payload)
   const property = await dispatch(changeProperty(payload, id));
   if (property){
        history.push(`/properties/${id}`)
    };
};

const deleteButton = () => {
    dispatch(deleteProperty(id))
    history.push(`/properties`)
};

return (
<div className="edit-form-outer-wrapper">
    <section className="edit-form-holder">
        <form onSubmit={handleSubmit} className="edit-property-form">
        <label className="form-label">Name of Your Property</label>
            <input
            type="text"
            placeholder="Should have bear in it..."
            required
            value={name}
            onChange={updateName}
            />
            <label className="form-label">Property Address</label>
            <textarea
            type="text"
            placeholder="123 Easy St..."
            required
            value={address}
            onChange={updateAddress}
            />
            <label className="form-label">Property Description</label>
            <textarea
            type="textarea"
            placeholder="Property Description"
            required
            value={description}
            onChange={updateDescription}
            />
            <label className="form-label">Price Per Night</label>
            <input
            type="currency"
            required
            value={price}
            onChange={updatePrice}
            />
            <label>
            <input type="file" onChange={updateFile} />
            </label>
        <button type="submit" className="edit-property-submit">Submit Your Property</button>
        <button type="button" onClick={deleteButton}>Remove Property</button>
        </form>
    </section>
</div>

);

};

export default EditPropertyForm;
