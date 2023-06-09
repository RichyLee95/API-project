import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createSpot, updateSpot } from '../../store/spots';
import './SpotForm.css'
const SpotForm = ({ spot, formType }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [lat, setLat] = useState(1)
    const [lng, setLng] = useState(1)
    const [price, setPrice] = useState(spot?.price)
    const [description, setDescription] = useState(spot?.description)
    const [name, setName] = useState(spot?.name)
    const [preview, setPreview] = useState(spot?.preview)
    const [url1, seturl1] = useState(spot?.SpotImages?.[0]?.url ?? '')
    const [url2, seturl2] = useState(spot?.SpotImages?.[1]?.url ?? '')
    const [url3, seturl3] = useState(spot?.SpotImages?.[2]?.url ?? '')
    const [url4, seturl4] = useState(spot?.SpotImages?.[3]?.url ?? '')
    const [url5, seturl5] = useState(spot?.SpotImages?.[4]?.url ?? '')
    const [validationErrors, setValidationErrors] = useState({})
    useEffect(()=>{
        if(spot){
            setCountry(spot.country || '');
      setAddress(spot.address || '');
      setCity(spot.city || '');
      setState(spot.state || '');
      setLat(spot.lat || 1);
      setLng(spot.lng || 1);
      setPrice(spot.price || '');
      setDescription(spot.description || '');
      setName(spot.name || '');
      setPreview(spot.preview || '');
      seturl1(spot.SpotImages?.[0]?.url || '');
      seturl2(spot.SpotImages?.[1]?.url || '');
      seturl3(spot.SpotImages?.[2]?.url || '');
      seturl4(spot.SpotImages?.[3]?.url || '');
      seturl5(spot.SpotImages?.[4]?.url || '');
        }
    },[spot])
    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}
        if (!country) errors.country = 'Country is required'
        if (!address) errors.address = 'Address is required'
        if (!city) errors.city = 'City is required'
        if (!state) errors.state = 'State is required'
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if (!name) errors.name = 'Name is required'
        if (!price) errors.price = 'Price is required'
        if (price <= 0 ) errors.price = 'Price must be valid'
        if (formType === 'Create Spot') {
        if (!url1) errors.url1 = 'Preview image is required'
        if (url1 && !url1.endsWith('.png') && !url1.endsWith('.jpg') && !url1.endsWith('.jpeg')) errors.url1 = 'Image URL needs to end in .png or .jpg (or .jpeg)'
        if (url2 && !url2.endsWith('.png') && !url2.endsWith('.jpg') && !url2.endsWith('.jpeg')) errors.url2 = 'Image URL needs to end in .png or .jpg (or .jpeg)'
        if (url3 && !url3.endsWith('.png') && !url3.endsWith('.jpg') && !url3.endsWith('.jpeg')) errors.url3 = 'Image URL needs to end in .png or .jpg (or .jpeg)'
        if (url4 && !url4.endsWith('.png') && !url4.endsWith('.jpg') && !url4.endsWith('.jpeg')) errors.url4 = 'Image URL needs to end in .png or .jpg (or .jpeg)'
        if (url5 && !url5.endsWith('.png') && !url5.endsWith('.jpg') && !url5.endsWith('.jpeg')) errors.url5 = 'Image URL needs to end in .png or .jpg (or .jpeg)'
        }
        setValidationErrors(errors)
        if (Object.keys(errors).length === 0) {//added error.length check to stop page if errors present
            spot = {
                ...spot,
                country,
                address,
                city,
                state,
                lat,
                lng,
                price,
                description,
                name,
                SpotImages: [
                    { preview: true, url: url1 },
                    { preview: false, url: url2 },
                    { preview: false, url: url3 },
                    { preview: false, url: url4 },
                    { preview: false, url: url5 },
                ]
            }

            if (formType === 'Update Spot') {
                const editedSpot = await dispatch(updateSpot(spot))
                spot = editedSpot
                history.push(`/spots/${spot.id}`)
                if (spot.validationErrors) {
                    return setValidationErrors(editedSpot.validationErrors)
                }
            } if (formType === 'Create Spot') {
                const newSpot = await dispatch(createSpot(spot))

                history.push(`/spots/${newSpot.id}`)
                if (spot.validationErrors) {
                    return setValidationErrors(newSpot.validationErrors)
                }
                // } else {
                //     history.push(`/spots/${spot.id}`)
                // State(`/spots/${spot.id}`)

                // }else{
            }
            // }
        }
    }
    return (
        <div className='form-container'>
            <form className='create-spot-form' onSubmit={handleSubmit}>
                {formType === 'Create Spot' && (
                    <h1>Create a Spot</h1>
                )}
                {formType === 'Update Spot' && (
                    <h1>Update your Spot</h1>
                )}
                <div className='create-spot-where'>
                    <h2>Where's your place located?</h2>

                    <p>Guests will only get your exact address once they booked a reservation.</p>
                </div>
                <div>
                    {validationErrors.country ? <p className="errors">{validationErrors.country}</p> : ''}
                    <p>Country</p>
                    <input className='country-input'
                        placeholder='Country'
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    {validationErrors.address ? <p className="errors">{validationErrors.address}</p> : ''}
                    <p>Street Address</p>
                    <input className='address-input'
                        placeholder='Address'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='city-state'>
                <div>
                    <p>City</p>
                    {validationErrors.city ? <p className="errors">{validationErrors.city}</p> : ''}
                    <input className='city-input'
                        placeholder='City'
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
</div>
                    <div>
                        <p>State</p>
                        {validationErrors.state ? <p className="errors">{validationErrors.state}</p> : ''}
                        <input className='state-input'
                            placeholder='State'
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <hr />
                    <h4>Describe your place to guests</h4>
                    <p>Mention the best features of your space, any special amentities like
                        fast wifi or parking, and what you love about the neighborhood.</p>
                    {validationErrors.description ? <p className="errors">{validationErrors.description}</p> : ''}
                    <input className='description-input'
                        placeholder='Please write at least 30 characters'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <hr />
                    <h4>Create a title for your spot</h4>
                    <p>Catch guests' attention with a spot title that highlights what makes
                        your place special.</p>
                    {validationErrors.name ? <p className="errors">{validationErrors.name}</p> : ''}
                    <input className='title-input'
                        placeholder='Name of your spot'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <hr />
                    <h4>Set a base price for your spot</h4>
                    <p>Competitive pricing can help your listing stand out and rank higher
                        in search results.</p>
                    {validationErrors.price ? <p className="errors">{validationErrors.price}</p> : ''}
                    <input className='price-input'
                        placeholder='Price per night (USD)'
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                {formType === 'Create Spot' && (
                    <div className='create-spot-photos'>
                        <hr />
                        <h4>Liven up your spot with photos</h4>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        {validationErrors.url1 ? <p className="errors">{validationErrors.url1}</p> : ''}
                        <div>
                        <input className='photo-input1'
                            placeholder='Preview Image URL'
                            type='text'
                            value={url1}
                            onChange={(e) => seturl1(e.target.value)}
                        />
                        </div>
                        {validationErrors.url2 ? <p className="errors">{validationErrors.url2}</p> : ''}
                        <div>
                        <input className='photo-input2'
                            placeholder='Image URL'
                            type='text'
                            value={url2}
                            onChange={(e) => seturl2(e.target.value)}
                        />
                        </div>
                        {validationErrors.url3 ? <p className="errors">{validationErrors.url3}</p> : ''}
                        <div>
                        <input className='photo-input3'
                            placeholder='Image URL'
                            type='text'
                            value={url3}
                            onChange={(e) => seturl3(e.target.value)}
                        />
                        </div>
                        {validationErrors.url4 ? <p className="errors">{validationErrors.url4}</p> : ''}
                        <div>
                        <input className='photo-input4'
                            placeholder='Image URL'
                            type='text'
                            value={url4}
                            onChange={(e) => seturl4(e.target.value)}
                        />
                        </div>
                        {validationErrors.url5 ? <p className="errors">{validationErrors.url5}</p> : ''}
                        <input className='photo-input5'
                            placeholder='Image URL'
                            type='text'
                            value={url5}
                            onChange={(e) => seturl5(e.target.value)}
                        />
                        <hr />
                    </div>
                )}
                <div>
                <button className='spotform-submit-btn' type='submit'>{formType}</button>
            </div>
            </form>
        </div>
    )

}
export default SpotForm