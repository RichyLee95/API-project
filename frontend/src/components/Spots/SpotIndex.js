import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSpots } from '../../store/spots';

const SpotIndex = () => {
    const spots = Object.values(
        useSelector((state) => (state.spots ? state.spots.allSpots: []))
    )
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchSpots())
    },[dispatch])
console.log('CHECKING', spots)
    return(
        <section>
            <ul>
            <Link
        className="Create Spot"
        to="/spots/new"
      >
        Create a New Spot
      </Link>
                {spots.map((spot)=>(
                <p key={spot.id}>{spot.name},{spot.city},{spot.state},${spot.price}night</p>    
                ))}
                <h1>img</h1> 
                
            </ul>
        </section>
    )
}
export default SpotIndex