import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews';
import { getSpotById } from '../../store/spots';
import StarsRatingInput from './ReviewRating';
import { useModal } from '../../context/Modal';


const ReviewForm = ({ reviews, formType, spotId }) => {
    const [validationErrors, setValidationErrors] = useState({})
    const history = useHistory()
    const {closeModal} = useModal()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}
        if(!review) errors.review='Review input is required'
        
        setValidationErrors(errors)
        reviews = {
            ...reviews,
            review,
            stars
        }
        if (formType === 'Create Review') {
           await dispatch(createReview(reviews,spotId))
           dispatch(getSpotById(spotId))
           .then(closeModal)
           if (reviews.validationErrors) {
            return setValidationErrors(reviews.validationErrors)
        }
            // review = newReview
        }
    }
    const onChange = (number) => {
        setStars(parseInt(number));
      };
    return (
        <form onSubmit={handleSubmit}>
            <label>
            {validationErrors.review?<p className="errors">{validationErrors.review}</p>:''}
            How was your stay?
                <input
                placeholder='Leave your review here...'
                    type='text'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />   
                
                <div>
                <StarsRatingInput
                     stars={stars}
                    //  disabled={false}
                    // value={stars}
                    onChange={onChange}
                />
                </div>
               Star Rating 
            </label>
            {/* <label>
                Star Rating
                 
            </label> */}
            {console.log('stars', {stars})}
            <button disabled={review.length < 10 || stars <= 0} type='submit'>Submit Your Review</button>
        </form>
    )
}
export default ReviewForm