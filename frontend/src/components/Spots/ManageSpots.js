import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsByUser } from '../../store/spots';
import { Link } from 'react-router-dom';
import DeleteSpot from './DeleteSpot';
import OpenModalButton from "../OpenModalButton";
import './ManageSpots.css'
const ManageSpots = () => {
    const dispatch = useDispatch()
    // const spotsObj = useSelector(state => state.spots.currentSpots[spot.id])
    // const spotsList = Object.values(spotsObj)
    const spots = Object.values(
        // useSelector((state) => (state.spots ? state.spots.allSpots: []))
        useSelector((state) => (state.spots ? state.spots.currentSpot : []))
    )
    console.log('this is manage spots', spots)
    const loggedInUser = useSelector((state) =>
    state.session.user)
    useEffect(() => {
        dispatch(getSpotsByUser())
    }, [dispatch])

    return (
        <section>
            <div className='page'>
                <div className='managespots'>
                    <h1>Manage Spots</h1>
                </div>
                
                <div className='mainspotcontainer'>
                    
                    {spots.length > 0 && spots.map((spot) => (
                        <div key={spot.id}>
                            <div className='imgspot'>
                            <div><Link to={`/spots/${spot.id}`}>{spot.name}</Link><img className='img1' src={spot.previewImage} /></div>
                            {spot.city},{spot.state}</div>
                            <div className='manageprice'>
                            <p>${spot.price}night</p>
                            </div>
                            <div className='edit-btn'>
                            <button className='editbutton'><Link to={`/spots/${spot.id}/edit`}
                            >
                                Edit
                            </Link></button>
                            </div>
                            <div className='delete-btn'>
                            <OpenModalButton buttonText={'Delete Spot'}
                                modalComponent={
                                    <DeleteSpot
                                        spot={spot}
                                        key={spot.id} />
                                }
                            />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default ManageSpots