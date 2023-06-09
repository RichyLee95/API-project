import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotById } from '../../store/spots';
import SpotForm from './SpotForm';

const EditSpotForm = () => {
    const {spotId} = useParams()
    const spot = useSelector((state) =>
    state.spots.allSpots[spotId])
    const dispatch = useDispatch()
console.log('editSpotform',spot)
    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])
    if(!spot || !spot.SpotImages) return (<></>)
// console.log('WHAT IS THIS', spot)
    return (
        Object.keys(spot).length >= 1 && (
            <>
            <SpotForm
            spot={spot}
            formType="Update Spot"/>
            </>
        )
    )
}

export default EditSpotForm