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

    const singleSpot = useSelector((state) =>
        state.spots.allSpots[spotId])

    const loggedInUser = useSelector((state) =>
        state.session.user)

    useEffect(() => {
        dispatch(fetchSpots(spotId))
    }, [dispatch, spotId])

    return (
        <section>

            {/* <div className='header'>
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
                </div> */}
            <div className='main'>
                <div className='spotcontainer'>



                    {spotsArray.map((spot) => (

                        <div className='spot' key={spot.id}>
                            <Link to={`/spots/${spot.id}`}>{spot.name}
                                {/* {spot.previewImage} */}
                                <div className='prevImgindex'>
                                    <img className='img1' src={spot.previewImage} title={spot.name} />

                                </div>
                            </Link>
                            <div className='location-container'>
                                <div className='spot1'>
                                    {spot.city},
                                    {spot.state}
                                </div><div className='starindex'>
                                    <div className='star-rate'>
                                        <h2>
                                            {spot.avgRating === 0 ? (<h3><i className="fa fa-star" />New</h3>) : ''}
                                            {spot.avgRating > 0 ? (<h3><i className="fa fa-star" />{spot.avgRating.toFixed(2)}</h3>) : ''}
                                        </h2>
                                    </div>
                                </div>
                                {/* {console.log('SPOTINDEX ID', singleSpot)} */}
                                <div className='spot2'>
                                    ${spot.price}night
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
export default SpotIndex