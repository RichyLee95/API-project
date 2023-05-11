import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getReviews } from '../../store/reviews';

const ReviewIndex = ({spotId}) => {
    const reviewsObj = 
        useSelector((state) => (state.reviews.allReviews))
        const reviewArray = Object.values(reviewsObj)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getReviews(spotId))
    },[dispatch, spotId])
//     const userInfo=useSelector(state=>state.session.user)
// console.log('review user info', userInfo)
// console.log('this is reviews array',reviewArray)
    return(
        <ul>
            <div> is this working</div>
            {reviewArray.map((review)=>(
                <p key={review.id}> 
                {review.userId}, {review.review}
                </p>    
                ))}
        </ul>
    )
}
export default ReviewIndex