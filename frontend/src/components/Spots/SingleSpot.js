import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewIndex from '../Reviews/ReviewIndex';
import { getSpotById } from '../../store/spots';
import CreateReviewForm from '../Reviews/CreateReviewForm';
import './SingleSpot.css'
const SingleSpot = () => {
    const { spotId } = useParams()
    const spot = useSelector((state) =>
        state.spots.allSpots[spotId])
    const dispatch = useDispatch()

    const reviewsObj =
        useSelector((state) => (state.reviews.allReviews))
    const reviewArray = Object.values(reviewsObj)
    // const reviewcheck = reviewArray.find(id)
    // console.log('REVIEW ARRAY', reviewcheck)

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
    let smallImg = spot.SpotImages.slice(1, 5)
    // let prevImg = spot.SpotImages.find(() => )
    let usersReview = reviewArray.find((review) => loggedInUser.id === review.userId)


    const previewImage = spot.SpotImages.find((image) => image.preview===true)
    return (
        <>
        <div className='main-div'>
            {/* {console.log('REVIEWINFO',usersReview)} */}
            <div className='singleSpotdetail'>
              <div className='spotname'>  <h2>{spot.name}</h2></div>
              <div className='citystate'> <h3>{spot.city},{spot.state},{spot.country}</h3></div> 
            </div>
<div className='img-box'>
            <div className='prevImgcontainer'>
                <img className='prevImg' src={previewImage.url} />
            </div>
            {/* {console.log('PREVIMG',prevImg)} */}
            {/* {spot.SpotImages} */}
            <div className='smallImg'>
                {/* {previewImage ? <div><img src={previewImage.url} /></div> : ''} */}
                {smallImg.map((image) =>

                (<div className='subimages'><img class='fourpic' src={image.url} /></div>

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
                <div>
                    {spot.numReviews === 0 ? (<h2><i className="fa fa-star" />New</h2>) : ''}
                    {spot.numReviews === 1 ? (<h2><i className="fa fa-star" />{spot.avgStarRating.toFixed(2)} · {spot.numReviews}   review</h2>) : ''}
                    {spot.numReviews > 1 ? (<h2><i className="fa fa-star" />{spot.avgStarRating.toFixed(2)} · {spot.numReviews}   reviews</h2>) : ''}
                    {spot?.Owner?.id !== loggedInUser?.id && loggedInUser && usersReview !== loggedInUser.id ? (<CreateReviewForm spotId={spotId} />) : ""}
                    {spot.numReviews === 0 && spot?.Owner.id !== loggedInUser?.id ? (<p>Be the first to post a review!</p>) : ''}
                    {console.log('REVIEWINFO', usersReview)}
                    {/* {spot.numReviews === 1 ? (<p>Be the first to post a review!</p>) : ''} */}
                </div>

                {/* <CreateReviewForm spotId={spotId} /> */}

                <ReviewIndex spotId={spotId} />
            </div>
            </div>
        </>
    )
}
export default SingleSpot