import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSpots, getSpotsByUser } from '../../store/spots';
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
        return () => {dispatch (clearSpots())}
    }, [dispatch])

    return (
        <section>
            <div className='page'>
                <div className='managespots'>
                    <h1>Manage Spots</h1>
                <div className='no-spots'>
                {spots.length >= 1 ? (
          ""
        ) :
                    <Link
                        className="Create Spot"
                        to="/spots/new"
                    >
                        <button className='manage-newspot'>
                            Create a New Spot
                        </button>
                    </Link>}
</div>
                </div>

                <div className='mainspotcontainer'>

                    {spots.length > 0 && spots.map((spot) => (

                        <div className='manage-spot-card' key={spot.id}>
                            <Link className='manage-spot-card-link' to={`/spots/${spot.id}`}>
                                <div className='imgspot'>
                                    <div><img className='single-spot-img1' src={spot.previewImage} /></div>
                                    </div>
                                    
                                <div className='manage-starindex'>
                                    <div className='manage-city-state'>{spot.city},{spot.state}</div>
                                    <div className='star-rate'>
                                        <h2>
                                            {!spot.avgRating ? (<h3><i className="fa fa-star" />New</h3>) : ''}
                                            {spot.avgRating > 0 ? (<h3><i className="fa fa-star" />{spot.avgRating.toFixed(2)}</h3>) : ''}
                                        </h2>
                                    </div>
                                </div>
                                <div className='manageprice'>
                                    <p>${spot.price}night</p>

                                </div>
                            </Link>
                            <div className='update-delete'>
                            <div className='edit-btn'>
                                <Link className='edit-btn-link' to={`/spots/${spot.id}/edit`}
                                ><button className='editbutton'>
                                    Update
                                </button></Link>
                            </div>
                            <div className='delete-spot-btn'>
                                <OpenModalButton buttonText={'Delete Spot'}
                                    modalComponent={
                                        <DeleteSpot
                                            spot={spot}
                                            key={spot.id} />
                                    }
                                />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default ManageSpots