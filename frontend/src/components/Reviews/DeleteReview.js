import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { getSingleSpot, getSpotById } from '../../store/spots';

const DeleteReview = ({ review,spotId }) => {
    const {closeModal} = useModal()
    const history = useHistory()
    const dispatch = useDispatch()
    const handleDelete =async (e) => {
        e.preventDefault()
       await dispatch(deleteReview(review.id))
        dispatch(getSpotById(spotId))
        .then(closeModal)
    }

    return (
        <div>
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={handleDelete}>Delete Review</button>
            <button onClick={closeModal}>No</button>
        </div>
    )
}
export default DeleteReview