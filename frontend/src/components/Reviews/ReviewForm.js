import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ReviewForm = ({review, formType}) => {
    const history = useHistory()
    const [review,setReview] = useState(review?.review)
    const [stars,setStars] = useState(review?.stars) 

    const handleSubmit = async (e) =>{
        e.preventDefault()
        review = {
            ...review,
            stars
        }
        if(formType==='Update Review'){
            const editedReview = dispatch(updateReview(review))
            review = editedReview
        }else if (formType==='Create Review'){
            const newReview = dispatch(createReview(review))
            review= newReview
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
                </form>
    )
}