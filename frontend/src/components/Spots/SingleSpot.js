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
    const alertClick = () => {
        alert('Feature Coming Soon')
    }
    // if(!review) return null
    if (!spot) {
        return null
    }
    if (!spot.SpotImages) return null
    return (
        <>
            {loggedInUser ? (
                <Link
                    className="Create Spot"
                    to="/spots/new"
                >
                    Create a New Spot
                </Link>
            ) : ""}
            <div className='singleSpotdetail'>
                <h2>{spot.name}</h2>
                <h3>{spot.city},{spot.state},{spot.country}</h3>
            </div>
            <div className='singleSpotImgs'>
                {/* {console.log('SINGLESPOT', spot)} */}
                <div className='images'>
                    {spot.SpotImages.map((image) => (
                        <img src={image.url} />

                    ))}
                </div>
            </div>

            <div className='spot desc'>
                <h3>Hosted By {spot.Owner?.firstName}{spot.Owner?.lastName}</h3>
            </div>

            <div className=''>{spot.description}</div>

            <div className='reservebox'>
                ${spot.price}night
                <h4>
                    {spot.numReviews === 0 ? (<h2><i className="fa fa-star" />New</h2>) : ''}
                    {spot.numReviews === 1 ? (<h2><i className="fa fa-star" />{spot.avgStarRating.toFixed(2)} · {spot.numReviews}   review</h2>) : ''}
                    {spot.numReviews > 1 ? (<h2><i className="fa fa-star" />{spot.avgStarRating.toFixed(2)} · {spot.numReviews}   reviews</h2>) : ''}
                </h4>
                <button className='reserve-btn' onClick={alertClick}>Reserve</button>
            </div>

            <div>
                {/* Reviews */}
                <div></div>
                {spot.numReviews === 0 ? (<h2><i className="fa fa-star" />New</h2>) : ''}
                {spot.numReviews === 1 ? (<h2><i className="fa fa-star" />{spot.avgStarRating.toFixed(2)} · {spot.numReviews}   review</h2>) : ''}
                {spot.numReviews > 1 ? (<h2><i className="fa fa-star" />{spot.avgStarRating.toFixed(2)} · {spot.numReviews}   reviews</h2>) : ''}
                {spot?.Owner?.id !== loggedInUser?.id ? (<CreateReviewForm spotId={spotId} />) : ""}
                {spot.numReviews === 0 && spot?.Owner.id !== loggedInUser?.id ? (<p>Be the first to post a review!</p>) : ''}
                {/* {spot.numReviews === 1 ? (<p>Be the first to post a review!</p>) : ''} */}



                {/* <CreateReviewForm spotId={spotId} /> */}

                <ReviewIndex spotId={spotId} />
            </div>
        </>
    )
}
export default SingleSpot