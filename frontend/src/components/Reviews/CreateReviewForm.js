import ReviewForm from "./ReviewForm";
import OpenModalButton from "../OpenModalButton";
const CreateReviewForm = ({spotId}) => {
    const reviews = {
        review:'',
        stars:''
    }
    return(
        // <OpenModalButton buttonText={'Reviews'}
        // modalComponent={
        <ReviewForm
        reviews={reviews}
        spotId={spotId}
        formType="Create Review"
        />
    // }>
        // </OpenModalButton>
    )
}
export default CreateReviewForm