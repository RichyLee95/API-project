import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewIndex from '../Reviews/ReviewIndex';
import { getSpotById } from '../../store/spots';
import CreateReviewForm from '../Reviews/CreateReviewForm';
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
if(!spot.SpotImages) return null
    return (
<>
<Link
        className="Create Spot"
        to="/spots/new"
      >
        Create a New Spot
      </Link>
<div className='singleSpotImgs'>
    {console.log('SINGLESPOT',spot)}
    <div className='images'>
        {spot.SpotImages.map((image)=>(
            <img src={image.url}/>
            
        ))}
    </div>
</div>
<h2>{spot.name}</h2>
<h3>{spot.city},{spot.state},{spot.country}</h3>
{/* <h3>Hosted By Placeholder for Owner</h3> */}
<h3>Hosted By {spot.Owner?.firstName}{spot.Owner?.lastName}</h3>
<div>${spot.price}night</div>

<div>  
Reviews
<CreateReviewForm spotId={spotId}/>
<ReviewIndex spotId={spotId}/>
</div>
</>
    )
}
export default SingleSpot