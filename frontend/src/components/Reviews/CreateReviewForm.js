import ReviewForm from "./ReviewForm";

const CreateReviewForm = ({spotId}) => {
    const reviews = {
        review:'',
        stars:''
    }
    return(
        <ReviewForm
        reviews={reviews}
        spotId={spotId}
        formType="Create Review"
        />
    )
}
export default CreateReviewForm