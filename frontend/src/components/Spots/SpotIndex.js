import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSpots } from '../../store/spots';

const SpotIndex = ({spotId}) => {
    const spotsObj = 
    
        useSelector((state) => (state.spots.allSpots))
    const spotsArray =Object.values(spotsObj)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchSpots(spotId))
    },[dispatch,spotId])
    console.log('SPOTINDEX ID', spotId)
    return(
        <section>
            <ul>
            <Link
        className="Create Spot"
        to="/spots/new"
      >
        Create a New Spot
      </Link>
      <div className='singleSpotImgs'>
        {/* {console.log('SPOT INDEX IMAGE',spotId)} */}
    {/* <div className='prevImg'>
        
      <img className='img1' src={spots.SpotImages[0].url}/>      
        
    </div> */}
</div>

                {spotsArray.map((spot)=>(
                     
                <p key={spot.id}>
                    {/* {spot.previewImage} */}
                    <img className='img1' src={spot.previewImage}/>
                    {spot.name},
                    {spot.city},
                    {spot.state},
                    ${spot.price}night</p>    
                ))}

                
            </ul>
        </section>
    )
}
export default SpotIndex