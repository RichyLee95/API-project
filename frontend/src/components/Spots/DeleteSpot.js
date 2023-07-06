import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
import './DeleteSpot.css'
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
        <div className='delete-spot'>
          <h1 className='confirm-delete-spot'>Confirm Delete</h1>
          <h3 className='delete-check-spot'>Are you sure you want to delete this spot?</h3>
          <div className='delete-button-spot'>
          <button className='btn-yes' onClick={handleDelete}>Yes (Delete Spot) </button>
          <button className='btn-no' onClick={closeModal}>No</button>
        </div>
        </div>
      </div>
    </div>
  )
}
export default DeleteSpot