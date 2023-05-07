import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSpots } from '../../store/spots';

const SpotIndex = () => {
    const spots = Object.values(
        useSelector((state) => (state.spots ? state.spots: []))
    )
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchSpots())
    },[dispatch])
console.log('CHECKING', spots)
    return(
        <section>
            <ul>
                {spots.map((spot)=>(
                <p>{spot.id}</p>    
                ))}
                <h1>img</h1> 
                
            </ul>
        </section>
    )
}
export default SpotIndex