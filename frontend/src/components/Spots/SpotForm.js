import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createSpot, updateSpot } from '../../store/spots';

const SpotForm = ({ spot, formType }) => {
    // const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [lat, setLat] = useState(spot?.lat)
    const [lng, setLng] = useState(spot?.lng)
    const [price, setPrice] = useState(spot?.price)
    const [description, setDescription] = useState(spot?.description)
    const [name, setName] = useState(spot?.name)
    const [preview, setPreview] = useState(spot?.preview)
    const [url1, seturl1] = useState(spot?.url)
    const [url2, seturl2] = useState(spot?.url)
    const [url3, seturl3] = useState(spot?.url)
    const [url4, seturl4] = useState(spot?.url)
    const [url5, seturl5] = useState(spot?.url)
    const [validationErrors, setValidationErrors] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()

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

            console.log('update thunk spot', spot)
            const editedSpot = dispatch(updateSpot(spot))
            spot = editedSpot
        } if (formType === 'Create Spot') {
            const newSpot = dispatch(createSpot(spot))
            spot = newSpot
        }
        // if(spot.validationErrors){
        //     return setValidationErrors(newSpot.validationErrors)
        // }else{
        //     history.pushState(`/spots/${spot.id}`)
        // }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{formType}</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <label>
                Country
                <input
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>
            <label>
                Street Address
                <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <label>
                City
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </label>
            <label>
                State
                <input
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </label>
            <label>
                Latitude
                <input
                    type='text'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
            </label>
            <label>
                Longitude
                <input
                    type='text'
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
            </label>
            <label>
                Describe your place to guests
                Mention the best features of your space, any special amentities like
                fast wifi or parking, and what you love about the neighborhood.
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Create a title for your spot
                Catch guests' attention with a spot title that highlights what makes
                your place special.
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Set a base price for your spot
                Competitive pricing can help your listing stand out and rank higher
                in search results.
                <input
                    type='text'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <label>
                Liven up your spot with photos
                <input
                    type='text'
                    value={url1}
                    onChange={(e) => seturl1(e.target.value)}
                />
                <input
                    type='text'
                    value={url2}
                    onChange={(e) => seturl2(e.target.value)}
                />
                <input
                    type='text'
                    value={url3}
                    onChange={(e) => seturl3(e.target.value)}
                />
                <input
                    type='text'
                    value={url4}
                    onChange={(e) => seturl4(e.target.value)}
                />
                <input
                    type='text'
                    value={url5}
                    onChange={(e) => seturl5(e.target.value)}
                />
            </label>

            <button type='submit'>{formType}</button>
        </form>
    )

}
export default SpotForm