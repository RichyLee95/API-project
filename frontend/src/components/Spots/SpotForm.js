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
    // useEffect(()=>{
    //     let validationErrors = {}
    //     if()
    // })
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
        if (!url1) errors.url1 = 'Preview image is required'
        // if(!url2) errors.url2='Image URL must end in .png, .jpg, or .jpeg'

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
                <div>
                    <h1>Create a new Spot</h1>
                </div>
                <div>
                    <h2>Where's your place located?</h2>

                    <p>Guests will only get your exact address once they booked a reservation.</p>
                </div>
                <div>
                    {validationErrors.country ? <p className="errors">{validationErrors.country}</p> : ''}
                    Country
                    <input
                        placeholder='Country'
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    {validationErrors.address ? <p className="errors">{validationErrors.address}</p> : ''}
                    Street Address
                    <input
                        placeholder='Address'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    City
                    {validationErrors.city ? <p className="errors">{validationErrors.city}</p> : ''}
                    <input
                        placeholder='City'
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    State
                    {validationErrors.state ? <p className="errors">{validationErrors.state}</p> : ''}
                    <input
                        placeholder='State'
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>

                <div>
                    <hr />
                    <h4>Describe your place to guests</h4>
                    <p>Mention the best features of your space, any special amentities like
                        fast wifi or parking, and what you love about the neighborhood.</p>
                    {validationErrors.description ? <p className="errors">{validationErrors.description}</p> : ''}
                    <input
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
                    <input
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
                    <input
                        placeholder='Price per night (USD)'
                        type='text'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div>
                    <hr />
                    <h4>Liven up your spot with photos</h4>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    {validationErrors.url1 ? <p className="errors">{validationErrors.url1}</p> : ''}
                    <input
                        placeholder='Preview Image URL'
                        type='text'
                        value={url1}
                        onChange={(e) => seturl1(e.target.value)}
                    />
                    {validationErrors.url2 ? <p className="errors">{validationErrors.url2}</p> : ''}
                    <input
                        placeholder='Image URL'
                        type='text'
                        value={url2}
                        onChange={(e) => seturl2(e.target.value)}
                    />
                    <input
                        placeholder='Image URL'
                        type='text'
                        value={url3}
                        onChange={(e) => seturl3(e.target.value)}
                    />
                    <input
                        placeholder='Image URL'
                        type='text'
                        value={url4}
                        onChange={(e) => seturl4(e.target.value)}
                    />
                    <input
                        placeholder='Image URL'
                        type='text'
                        value={url5}
                        onChange={(e) => seturl5(e.target.value)}
                    />
                    <hr />
                </div>

                <button type='submit'>{formType}</button>
            </form>
        </div>
    )

}
export default SpotForm