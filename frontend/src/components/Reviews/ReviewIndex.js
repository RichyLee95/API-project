import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteReview from './DeleteReview';
import { getReviews } from '../../store/reviews';
import OpenModalButton from "../OpenModalButton";
const ReviewIndex = ({ spotId }) => {
    const reviewsObj =
        useSelector((state) => (state.reviews.allReviews))
    const reviewArray = Object.values(reviewsObj)
    const dispatch = useDispatch()
    const loggedInUser = useSelector((state) =>
        state.session.user)
    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])

// const reviewDate = review.createdAt
    //     const userInfo=useSelector(state=>state.session.user)
    console.log('review user info', reviewsObj)
    // console.log('this is reviews array',reviewArray)
    return (

        <div>
            {/* <h2>Avg Star Rating Number of Reviews {review.Reviews.length}</h2> */}
            {reviewArray.map((review) => (
                <div key={review.id}>
                    <p>Posted by:{review.firstName}</p>
                    <p>Created at:{review.createdAt}</p>
                    <p>Review description:{review.review}</p>
                    {loggedInUser?.id === review.userId &&
                        <OpenModalButton buttonText={'Delete Review'}
                            modalComponent={
                                <DeleteReview review={review} spotId={spotId} />
                            }
                        /> }
                    {/* {console.log('USER ID', loggedInUser.id)} */}
                    {console.log('REVIEW ID', reviewsObj)}
                </div>
            ))}

        </div>
    )
}
export default ReviewIndex