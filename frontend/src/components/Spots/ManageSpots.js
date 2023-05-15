import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsByUser } from '../../store/spots';
import { Link } from 'react-router-dom';
import DeleteSpot from './DeleteSpot';
import OpenModalButton from "../OpenModalButton";
const ManageSpots = () => {
    const dispatch = useDispatch()
    // const spotsObj = useSelector(state => state.spots.currentSpots[spot.id])
    // const spotsList = Object.values(spotsObj)
    const spots = Object.values(
        // useSelector((state) => (state.spots ? state.spots.allSpots: []))
        useSelector((state) => (state.spots ? state.spots.currentSpot : []))
    )
    console.log('this is manage spots', spots)

    useEffect(() => {
        dispatch(getSpotsByUser())
    }, [dispatch])

    return (
        <section>
            <h1>Manage Spots</h1>
            <ul>
                {spots.length > 0 && spots.map((spot) => (
                    <div key={spot.id}>
                        <div><Link to={`/spots/${spot.id}`}>{spot.name}</Link><img className='img1' src={spot.previewImage} />{spot.city},{spot.state}</div>
                        <p>${spot.price}night</p>
                        <button className='editbutton'><Link to={`/spots/${spot.id}/edit`}
          >
            Edit
          </Link></button>
                        <OpenModalButton buttonText={'Delete Spot'}
                        modalComponent={
                        <DeleteSpot
                            spot={spot}
                            key={spot.id} />
                        }
                        />
                    </div>
                ))}
            </ul>
        </section>
    )
}
export default ManageSpots