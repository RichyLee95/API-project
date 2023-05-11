import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getReviews } from '../../store/reviews';

const ReviewIndex = ({spotId}) => {
    const reviewsObj = 
        useSelector((state) => (state.reviews.allReviews))
    console.log('Get all reviews',spotId)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getReviews(spotId))
    },[dispatch])

    return(
        <ul>
            {/* {reviews.map((review)=>(
                <p key={review.id}>{review.userId}, {review.review}</p>    
                ))} */}
        </ul>
    )
}
export default ReviewIndex