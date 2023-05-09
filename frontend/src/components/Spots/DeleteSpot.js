import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';

const DeleteSpot = ({spot}) => {
    const dispatch = useDispatch()
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteSpot(spot.id))
    }

    return (
        <li>
      <div className="li-contents-flex">
        <div className="button-container">
          <Link
            className="edit-link"
            to={`/spots/${spot.id}/edit`}
          >
            Edit
          </Link>
            <button onClick={handleDelete}>Delete </button>
            </div>
            </div>
        </li>
    )
}
export default DeleteSpot