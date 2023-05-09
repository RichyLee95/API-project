import { csrfFetch } from "./csrf"
/** Action Type Constants: */
export const GET_SPOTS = 'spots/GET_SPOTS'
export const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT'
export const UPDATE_SPOT = 'spots/UPDATE_SPOT'
export const REMOVE_SPOT = 'spots/REMOVE_SPOT'
export const GET_USER_SPOT = 'spots/GET_USER_SPOT'
/**  Action Creators: */

//get all spots
export const getAllSpots = (spots) => ({
    type: GET_SPOTS,
    spots,
    
})
export const getSingleSpot = (spot) => ({
    type: GET_SINGLE_SPOT,
    spot,
})
export const editSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot,
})

export const removeSpot = (spot) => ({
    type: REMOVE_SPOT,
    spot,
})
export const currentUserSpot = (spot) => ({
    type: GET_USER_SPOT,
    spot,
})

/** Thunk Action Creators: */
//get all spots
export const fetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllSpots(data))
        return data.Spots
    }
};
export const createSpot = (spot) => async (dispatch) => {
const res = await csrfFetch('/api/spots', {
    method:'POST',
    headers:{ 'Content-Type': 'application/json' },
    body:JSON.stringify(spot)
})
if (res.ok){
    const newSpot = await res.json()
    dispatch(editSpot(newSpot))
    return newSpot
}else{
    const errors = await res.json()
    return errors
}
}
export const updateSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch(`api/spots/${spot.id}`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json' },
        body:JSON.stringify(spot)
    })
    if(res.ok){
        const updatedSpot = await res.json()
        dispatch(editSpot(updatedSpot))
        return updatedSpot
    }else{
        const errors = await res.json()
        return errors
    }
}
export const getSpotById = (spotId) => async (dispatch) =>{
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if(res.ok){
        const spotDetails = await res.json()
        dispatch(getSingleSpot(spotDetails))
    }else{
        const errors = await res.json()
        return errors
    }
}
export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(deleteSpot(spotId))
    }else{
        const errors = await res.json()
        return errors
    }
}

export const getSpotsByUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
    if (res.ok) {
        const userSpot = await res.json()
        dispatch(currentUserSpot(userSpot))
        return userSpot.Spots
    }
}


/** Spot reducer */
const initialState= {allSpots:{}, currentSpot:{}}
const spotsReducer = (state = initialState, action) => {
    console.log('spot reducer',action)
    switch (action.type) {
        
        case GET_SPOTS:{
            console.log('spot reducer',action)
            const spotsState = {}
            action.spots.Spots.forEach((spot) => {
                spotsState[spot.id] = spot
            })
            return spotsState
        }
        case GET_SINGLE_SPOT:{
            return {...state, [action.spot.id]:action.spot}
        }    
        case UPDATE_SPOT:{
            return {...state, [action.spot.id]:action.spot}
        }    
        case REMOVE_SPOT:{
            const newState = {...state}
            delete newState[action.reportId]
            return newState
        }
        case GET_USER_SPOT:{
            const newState = {...state, allSpots:{}, currentSpot:{...state.currentSpot}}
            action.spots.forEach((spot)=>{
                newState.allSpots[spot.id] = spot
            })
            return newState
        }
        // case GET_USER_SPOT:{
        //     const newState = {...state, allSpots:{}, currentSpot:{...state.currentSpot}}
        //     action.spots.forEach((spot)=>{
        //         newState.allSpots[spot.id] = spot
        //     })
        //     return newState
        // }
        default:
            return state
    }
    
}

export default spotsReducer