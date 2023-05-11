import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewIndex from '../Reviews/ReviewIndex';
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
<div className='singleSpotImgs'>
    <div className='prevImg'>
        {spot.map((spot)=>(
      <img src={spot.SpotImages}/>      
        ))}
        
    </div>
</div>
<h2>{spot.name}</h2>
<h3>{spot.city},{spot.state},{spot.country}</h3>
<h3>Hosted by PLACEHOLDER FOR OWNER</h3>
<div>${spot.price}night</div>

<div>
<ReviewIndex spotId={spotId}
/>
</div>
</>
    )
}
export default SingleSpot