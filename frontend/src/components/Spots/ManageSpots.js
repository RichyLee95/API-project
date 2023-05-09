import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsByUser } from '../../store/spots';
import { Link } from 'react-router-dom';
const ManageSpots = () => {
    const dispatch = useDispatch()
    const spotsObj = useSelector(state => state.spots.allSpots)
    const spotsList = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getSpotsByUser())
    }, [dispatch])

    return (
        <section>
            <h1>Manage Your Spots</h1>
            <ul>
                {spotsList.length > 0 && spotsList.map((spot) => (
        <div>
        <p>{spot.city},{spot.state}</p>
        <p>${spot.price}night</p>
        </div>
                ))}
            </ul>
        </section>
    )
}
export default ManageSpots