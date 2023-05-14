import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSpots } from '../../store/spots';
import './SpotIndex.css'
const SpotIndex = ({ spotId }) => {
    const spotsObj =
        useSelector((state) => (state.spots.allSpots))
    const spotsArray = Object.values(spotsObj)
    const dispatch = useDispatch()
    const loggedInUser = useSelector((state) =>
        state.session.user)
    useEffect(() => {
        dispatch(fetchSpots(spotId))
    }, [dispatch, spotId])
    console.log('SPOTINDEX ID', spotId)
    return (
        <section>
            <div>
                <div className='header'>
                    <div className='Logobox'>
                        <img className='logo' src='https://static.vecteezy.com/system/resources/previews/022/091/985/original/martial-arts-logo-design-icon-illustration-free-vector.jpg'></img>
                        <h2>Fightbnb</h2>
                    </div>
                    <div className='newspot'>
                        {loggedInUser ? (
                            <Link
                                className="Create Spot"
                                to="/spots/new"
                            >
                                Create a New Spot
                            </Link>
                        ) : ""}
                    </div>
                </div>
                <div className='spotcontainer'>



                    {spotsArray.map((spot) => (

                        <div className='spot' key={spot.id}>
                            <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
                            {/* {spot.previewImage} */}
                            <img className='img1' src={spot.previewImage} />
                        <div className='spot1'>
                            {spot.city},
                            {spot.state},
                            ${spot.price}night
                            </div>
                            <div className='spot2'>
                                </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
export default SpotIndex