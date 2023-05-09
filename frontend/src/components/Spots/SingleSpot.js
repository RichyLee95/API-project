import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSpotById } from '../../store/spots';


const SingleSpot = () => {
    const {spotId} = useParams()
    const spot = useSelector((state) =>
    state.spots.allSpots[spotId])
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])
if(!spot){
    return null
}
    return (
<>
<h2>{spot.name}</h2>
<h3>{spot.city},{spot.state},{spot.country}</h3>
<h3>Hosted by PLACEHOLDER FOR OWNER</h3>
<div>${spot.price}night</div>
</>
    )
}
export default SingleSpot