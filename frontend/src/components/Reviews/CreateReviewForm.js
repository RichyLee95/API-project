import ReviewForm from "./ReviewForm";

const CreateReviewForm = () => {
    const review = {
        review:'',
        stars:''
    }
    return(
        <ReviewForm
        review={review}
        formType="Create Review"
        />
    )
}
export default CreateReviewForm