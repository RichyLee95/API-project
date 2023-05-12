import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews';
import { getSpotById } from '../../store/spots';
import StarsRatingInput from './ReviewRating';

const ReviewForm = ({ reviews, formType, spotId }) => {
    const [validationErrors, setValidationErrors] = useState("")
    const history = useHistory()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}
        reviews = {
            ...reviews,
            review,
            stars
        }
        if (formType === 'Create Review') {
           await dispatch(createReview(reviews,spotId))
           dispatch(getSpotById(spotId))
            // review = newReview
        }
    }
    const onChange = (number) => {
        setStars(parseInt(number));
      };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Review Desc
                <p className="errors">{validationErrors.review}</p>
                <input
                    type='text'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />   
                Star Rating
                <div>
                <StarsRatingInput
                     stars={stars}
                    //  disabled={false}
                    // value={stars}
                    onChange={onChange}
                />
                </div>
                
            </label>
            {/* <label>
                Star Rating
                 
            </label> */}
            <button type='submit'>{formType}</button>
        </form>
    )
}
export default ReviewForm