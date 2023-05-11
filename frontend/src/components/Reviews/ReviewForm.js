import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews';
import { getSpotById } from '../../store/spots';
const ReviewForm = ({ reviews, formType, spotId }) => {
    const history = useHistory()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        reviews = {
            ...reviews,
            review,
            stars
        }
        // if(formType==='Update Review'){
        //     const editedReview = dispatch(updateReview(review))
        //     review = editedReview
        // }else 
        if (formType === 'Create Review') {
           await dispatch(createReview(reviews,spotId))
           dispatch(getSpotById(spotId))
            // review = newReview
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Review Desc
                <input
                    type='text'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </label>
            <label>
                Star Rating
                <input
                    type='text'
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                />
            </label>
            <button type='submit'>{formType}</button>
        </form>
    )
}
export default ReviewForm