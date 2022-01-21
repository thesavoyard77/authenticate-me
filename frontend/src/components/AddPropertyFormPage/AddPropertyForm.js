import './PropertyForm.css'
import { useState } from 'react';
import { createProperty } from '../../store/property';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom';

const AddPropertyForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state)=> state.session.user?.id)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0.00)
    const [image, setImage] = useState(null);
    // const [images, setImages] = useState(null);
    const [errors, setErrors] = useState([]);
    

    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    if (!userId) {
        return <Redirect to="/properties" />
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
        // console.log(file)
    };

    // //   for multiple file upload
    // const updateFiles = (e) => {
    //   const files = e.target.files;
    //   setImages(files);
    // };

 const handleSubmit = async (e) => {
     e.preventDefault();
     let newErrors = [];
     if (image === null) {
         newErrors.push("At least one property image is required")
     }
  


     await dispatch(createProperty({ name, address, userId, description, price, image,}))
    .then(() => {
        setName("");
        setAddress("");
        setDescription("");
        setPrice("");
        setImage(null);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          newErrors = data.errors;
        //   console.log(newErrors)
          setErrors(newErrors);
        };
    });

//    history.push(`/properties/${property.id}`)
};




return (
<div className="add-form-outer-wrapper">
    <section className="new-form-holder">
    {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
        <form onSubmit={handleSubmit} className="add-property-form">
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
            type="text"
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
            <b />
            <label>
            <input type="file" onChange={updateFile} />
            </label>
                    {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
            <b />
        <button className="add-property-submit" type="submit">Submit Your Property</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
        </form>
    </section>
</div>

);

};

export default AddPropertyForm;
