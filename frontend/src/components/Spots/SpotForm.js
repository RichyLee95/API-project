import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createSpot } from '../../store/spots';

const SpotForm = ({spot,formType}) => {
// const history = useHistory()
const dispatch = useDispatch()
const [country,setCountry] = useState(spot?.country)
const [address,setAddress] = useState(spot?.address)
const [city,setCity] = useState(spot?.city)
const [state,setState] = useState(spot?.state)
const [lat,setLat] = useState(spot?.lat)
const [lng,setLng] = useState(spot?.lng)
const [price,setPrice] = useState(spot?.price)
const [description,setDescription]= useState(spot?.description)
const [name,setName] = useState(spot?.name)
const [preview,setPreview] = useState(spot?.preview)
const [url,seturl] = useState(spot?.url)
const [validationErrors,setValidationErrors] = useState("")

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
        preview,
        url,
    }
    // if(formType === 'Update Spot'){
    //     const editedSpot = await dispatch(updateSpot(spot))
    //     spot=editedSpot
    if (formType === 'Create Spot'){
        const newSpot = await dispatch(createSpot(spot))
        spot = newSpot
    }
    // if(spot.validationErrors){
    //     setValidationErrors(spot.validationErrors)
    // // }else{
    // //     history.pushState(`/spots/${spot.id}`)
    // }
}
return(
    <form onSubmit ={handleSubmit}>
    <h1>Create a new Spot</h1>
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
        Description
    <input
    type='text'
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    />
    </label>
    <label>
        Name
    <input
    type='text'
    value={name}
    onChange={(e) => setName(e.target.value)}
    />
    </label>
    <label>
        Price
    <input
    type='text'
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    />
    </label>
    <button type='submit'>{formType}</button>
    </form>
)

}
export default SpotForm