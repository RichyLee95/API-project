import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { getSingleSpot, getSpotById } from '../../store/spots';
import './DeleteReview.css'
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
        <div className='delete-review'>
            <h1 className='confirm-delete'>Confirm Delete</h1>
            <h3 className='delete-check'>Are you sure you want to delete this review?</h3>
            <div className='delete-button'>
            <button className='btn-yes' onClick={handleDelete}>Yes (Delete Review)</button>
            <button className='btn-no' onClick={closeModal}>No (Keep Review)</button>
        </div>
        </div>
    )
}
export default DeleteReview