import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteReview from './DeleteReview';
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
            
            {reviewArray.map((review)=>(
                <div key={review.id}>
                <p> 
                {review.userId}, {review.review}
                </p>  
                  <DeleteReview review={review}/>
                </div>
                ))}
                
        </ul>
    )
}
export default ReviewIndex