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


            <div className='spot-index-main'>

                <div className='spotcontainer'>



                    {spotsArray.map((spot) => (
                        <Link className='spotlink' to={`/spots/${spot.id}`}>
                            <div className='spot' key={spot.id}>
                               
                                <div className='prevImgindex'>
                                    <img className='img1' src={spot.previewImage} title={spot.name} />

                                </div>

                                <div className='location-container'>
                                    <div className='top-location'>
                                        <div className='spot1'>
                                            {spot.city},
                                            {spot.state}
                                        </div>


                                        
                                            <div className='star-rate'>

                                                {!spot.avgRating ? (<h2><i className="fa fa-star" />New</h2>) : ''}
                                                {spot.avgRating > 0 ? (<h2><i className="fa fa-star" />{spot.avgRating.toFixed(2)}</h2>) : ''}

                                            </div>
                                        
                                    </div>
                                </div>    
                                    <div className='spot2'>
                                        ${spot.price}night
                                    </div>


                                

                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}
export default SpotIndex