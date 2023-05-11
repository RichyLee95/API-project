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
    return (
<>
<Link
        className="Create Spot"
        to="/spots/new"
      >
        Create a New Spot
      </Link>
<div className='singleSpotImgs'>
    <div className='images'>
        
      {/* <img className='img1' src={spot.SpotImages[0].url}/>      
      <img className='img2' src={spot.SpotImages[1].url}/>
      <img className='img3' src={spot.SpotImages[2].url}/>
      <img className='img4' src={spot.SpotImages[3].url}/>
      <img className='img5' src={spot.SpotImages[4].url}/>
         */}
    </div>
</div>
<h2>{spot.name}</h2>
<h3>{spot.city},{spot.state},{spot.country}</h3>
<h3>Hosted by PLACEHOLDER FOR OWNER</h3>
<div>${spot.price}night</div>

<div>  
Reviews
<CreateReviewForm spotId={spotId}/>
<ReviewIndex spotId={spotId}
/>
</div>
</>
    )
}
export default SingleSpot