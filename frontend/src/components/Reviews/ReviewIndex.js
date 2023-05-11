import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllReviews } from '../../store/reviews';

const ReviewIndex = () => {
    const reviews = Object.values(
        useSelector((state) => (state.reviews ? state.reviews.allReviews: []))
    )
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getAllReviews())
    },[dispatch])

    return(
        <ul>
            {reviews.map((review)=>(
                <p key={review.id}>{review.userId}, {review.review}</p>    
                ))}
        </ul>
    )
}
export default ReviewIndex