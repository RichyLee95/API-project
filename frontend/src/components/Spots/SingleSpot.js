import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewIndex from '../Reviews/ReviewIndex';
import { getSpotById } from '../../store/spots';
import CreateReviewForm from '../Reviews/CreateReviewForm';
const SingleSpot = () => {
    const { spotId } = useParams()
    const spot = useSelector((state) =>
        state.spots.allSpots[spotId])
    const dispatch = useDispatch()

    const loggedInUser = useSelector((state) =>
        state.session.user)

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    // if(!review) return null
    if (!spot) {
        return null
    }
    if (!spot.SpotImages) return null
    return (
        <>
        {loggedInUser ?(
            <Link
                className="Create Spot"
                to="/spots/new"
            >
                Create a New Spot
            </Link>
            ) :""  }
            <div className='singleSpotImgs'>
                {console.log('SINGLESPOT', spot)}
                <div className='images'>
                    {spot.SpotImages.map((image) => (
                        <img src={image.url} />

                    ))}
                </div>
            </div>
            <h2>{spot.name}</h2>
            <h3>{spot.city},{spot.state},{spot.country}</h3>
            <h3>Hosted By {spot.Owner?.firstName}{spot.Owner?.lastName}</h3>
            <div className='spot desc'>{spot.description}</div>
            <div>${spot.price}night</div>

            <div>
                {/* Reviews */}
                <div></div>
                {spot.numReviews === 0 ? (<h2><i className="fa fa-star" />New</h2>) : ''}
                {spot.numReviews === 1 ? (<h2><i className="fa fa-star" />{spot.avgStarRating} · {spot.numReviews} review</h2>) : ''}
                {spot.numReviews > 1 ? (<h2><i className="fa fa-star" />{spot.avgStarRating}{spot.numReviews} review</h2>) : ''}
                {spot?.Owner?.id !== loggedInUser?.id ? (<CreateReviewForm spotId={spotId}/>) :""  }
                {spot.numReviews === 0 ? (<p>Be the first to post a review!</p>) : ''}
                {/* {spot.numReviews === 1 ? (<p>Be the first to post a review!</p>) : ''} */}


                
                {/* <CreateReviewForm spotId={spotId} /> */}

                <ReviewIndex spotId={spotId} />
            </div>
        </>
    )
}
export default SingleSpot