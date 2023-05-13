import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
const DeleteSpot = ({ spot }) => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteSpot(spot.id))
      .then(closeModal)
  }

  return (
    <div>
      <div className="li-contents-flex">
        <div className="button-container">
          <h1>Confirm Delete</h1>
          <h3>Are you sure you want to delete this spot?</h3>
          <button onClick={handleDelete}>Yes (Delete Spot) </button>
          <button onClick={closeModal}>No</button>
        </div>
      </div>
    </div>
  )
}
export default DeleteSpot