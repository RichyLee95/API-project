import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteReview from './DeleteReview';
import { clearReviews, getReviews } from '../../store/reviews';
import OpenModalButton from "../OpenModalButton";
const ReviewIndex = ({ spotId }) => {
    const reviewsObj =
        useSelector((state) => (state.reviews.allReviews))
    const reviewArray = Object.values(reviewsObj)
    const dispatch = useDispatch()
    
    const loggedInUser = useSelector((state) =>
        state.session.user)
//         const createdAt = new Date(reviewsObj.createdAt);
const sortedreview = reviewArray.sort((a,b) => 
new Date (b.createdAt) - new Date(a.createdAt)
)
//   const date = toLocaleString('default', {
//     month: 'long',
//     year: 'numeric'
//   });
    useEffect(() => {
        dispatch(getReviews(spotId))
        return () => {dispatch (clearReviews())}
    }, [dispatch, spotId])

    
// const reviewDate = review.createdAt
    //     const userInfo=useSelector(state=>state.session.user)
    console.log('review user info', reviewsObj)
    // console.log('this is reviews array',reviewArray)
    // if(!reviewsObj.User.firstName) return null
    console.log('REVIEWOBJ',sortedreview)
    return (

        <div>
            {/* <h2>Avg Star Rating Number of Reviews {review.Reviews.length}</h2> */}
            {/* {reviewArray.map((review) => ( */}
                {sortedreview.map((review) => (
                <div className='review-text-block' key={review.id}>
                    <p>{review?.User?.firstName}</p>
                    <p>{new Date(review.createdAt).toLocaleDateString('default',
                   {month:'long',year:'numeric'} )}</p>
                    <p>{review.review}</p>
                    {loggedInUser?.id === review.userId &&
                        <OpenModalButton buttonText={'Delete Review'}
                            modalComponent={
                                <DeleteReview review={review} spotId={spotId} />
                            }
                        /> }
                    {/* {console.log('USER ID', loggedInUser.id)} */}

                </div>
            ))}

        </div>
    )
}
export default ReviewIndex