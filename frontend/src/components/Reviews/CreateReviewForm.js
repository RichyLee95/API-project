import ReviewForm from "./ReviewForm";
import OpenModalButton from "../OpenModalButton";
const CreateReviewForm = ({ spotId }) => {
    const reviews = {
        review: '',
        stars: ''
    }
    return (
        <OpenModalButton buttonText={'Create Review'}
            modalComponent={
                <ReviewForm
                    reviews={reviews}
                    spotId={spotId}
                    formType="Create Review"
                />}
        />
        
    )
}
export default CreateReviewForm