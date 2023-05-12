import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSpots } from '../../store/spots';

const SpotIndex = ({ spotId }) => {
    const spotsObj =

        useSelector((state) => (state.spots.allSpots))
    const spotsArray = Object.values(spotsObj)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSpots(spotId))
    }, [dispatch, spotId])
    console.log('SPOTINDEX ID', spotId)
    return (
        <section>
            <ul>
                <div className='Logo'>Fightbnb</div>
                <div className='profile'>
                <Link
                    className="Create Spot"
                    to="/spots/new"
                >
                    Create a New Spot
                </Link>
                </div>
                <div className='singleSpotImgs'>

                </div>

                {spotsArray.map((spot) => (

                    <div key={spot.id}>
                        <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
                        {/* {spot.previewImage} */}
                        <img className='img1' src={spot.previewImage} />

                        {spot.city},
                        {spot.state},
                        ${spot.price}night
                     </div>
                ))}


            </ul>
        </section>
    )
}
export default SpotIndex