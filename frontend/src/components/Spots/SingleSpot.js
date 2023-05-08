import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSpotById } from '../../store/spots';


const SingleSpot = () => {
    const {spotId} = useParams()
    const spot = useSelector((state) =>
    state.spots[spotId])
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])
if(!spot){
    return null
}
    return (
<>
<h1>{spot.name}</h1>
<p>{spot.city},{spot.state},{spot.country}</p>
</>
    )
}
export default SingleSpot