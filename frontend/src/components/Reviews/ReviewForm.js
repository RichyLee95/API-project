import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReview, getReviews } from '../../store/reviews';
import { getSpotById } from '../../store/spots';
import StarsRatingInput from './ReviewRating';
import { useModal } from '../../context/Modal';
import './ReviewForm.css'

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
            // console.log('formresponse', reviews)
           const res =await dispatch(createReview(reviews,spotId))
        //    console.log('formresponse', res)
           .then(closeModal)
           dispatch(getSpotById(spotId))
           dispatch(getReviews(spotId))
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
        <div className='reviewform'>
        <form onSubmit={handleSubmit}>
            <div>
            {validationErrors.review?<p className="errors">{validationErrors.review}</p>:''}
            <div className='greeting'>
            <h2>How was your stay?</h2>
            </div>
                <input className='reviewinput'
                placeholder='Leave your review here...'
                    type='text'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />   
                
                <div className='starreview'>
                <StarsRatingInput
                     stars={stars}
                    //  disabled={false}
                    // value={stars}
                    onChange={onChange}
                />
                </div>
               Star Rating 
            </div>
            {/* <label>
                Star Rating
                 
            </label> */}
            {console.log('stars', {stars})}
            <button className='reviewsubmit' disabled={review.length < 10 || stars <= 0} type='submit'>Submit Your Review</button>
        </form>
        </div>
    )
}
export default ReviewForm