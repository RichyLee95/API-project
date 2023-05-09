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
            <button onClick={handleDelete}>Delete </button>
        </li>
    )
}
export default DeleteSpot