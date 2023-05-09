import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsByUser } from '../../store/spots';
import { Link } from 'react-router-dom';
import DeleteSpot from './DeleteSpot';
const ManageSpots = () => {
    const dispatch = useDispatch()
    // const spotsObj = useSelector(state => state.spots.currentSpots[spot.id])
    // const spotsList = Object.values(spotsObj)
    const spots = Object.values(
        // useSelector((state) => (state.spots ? state.spots.allSpots: []))
        useSelector((state) => (state.spots ? state.spots.currentSpot:[]))
    )
console.log('this is manage spots',spots)

    useEffect(() => {
        dispatch(getSpotsByUser())
    }, [dispatch])

    return (
        <section>
            <Link
        className="Create Spot"
        to="/spots/new"
      >
        Create a New Spot
      </Link>
            <h1>Manage Your Spots</h1>
            <ul>
                {spots.length > 0 && spots.map((spot) => (
        <div key={spot.id}>
        <p>{spot.city},{spot.state}</p>
        <p>${spot.price}night</p>
        <DeleteSpot
        spot={spot}
        key={spot.id}/>
        </div>
                ))}
            </ul>
        </section>
    )
}
export default ManageSpots