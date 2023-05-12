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

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId,
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
    try{
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    // if (res.ok) {
        const newSpot = await res.json()
        dispatch(editSpot(newSpot))
        for(const image of spot.SpotImages){
       await dispatch (createImage(newSpot.id, image))
        }}catch (errors){
            const data=await errors.json()
            return data
        }
        // return newSpot
    // } else {
    //     const errors = await res.json()
    //     return errors
    // }
    
}
export const updateSpot = (spot) => async (dispatch) => {
    console.log('edit form thunk', spot.id)
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)

    })
    console.log('updatespotthunk', spot)
    if (res.ok) {
        const updatedSpot = await res.json()
        dispatch(editSpot(updatedSpot))
        return updatedSpot
        // }else{
        //     const errors = await res.json()
        //     return errors
    }

}
export const getSpotById = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if (res.ok) {
        const spotDetails = await res.json()
        dispatch(getSingleSpot(spotDetails))
        return spotDetails
    } else {
        const errors = await res.json()
        return errors
    }
}
export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(removeSpot(spotId))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const getSpotsByUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
    if (res.ok) {
        const userSpot = await res.json()
        console.log('get spot by user', userSpot)
        dispatch(currentUserSpot(userSpot.Spots))
        return userSpot.Spots
    }
}

export const createImage = (spotId,image) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
    })
    const newImage = await res.json()
    dispatch(editSpot(newImage))
    return newImage
}



/** Spot reducer */
const initialState = { allSpots: {}, currentSpot: {} }//added current spot
const spotsReducer = (state = initialState, action) => {
    console.log('spot reducer', action)
    switch (action.type) {

        case GET_SPOTS: {
            console.log('spot reducer', action)
            const spotsState = {
                ...state,//have to now spread state and add allSpots obj
                allSpots: {}
            }
            action.spots.Spots.forEach((spot) => {
                spotsState.allSpots[spot.id] = spot//have to update to key into allspots of initial state
            })
            return spotsState
        }
        case GET_SINGLE_SPOT: {
            return {
                ...state,
                allSpots: {
                    ...state.allSpots, //have to deep copy spread ...state to keep all prev AllSpots
                    [action.spot.id]: action.spot
                },
            }
        }
        case UPDATE_SPOT: {
            return {
                ...state,
                allSpots: {
                    ...state.allSpots,
                    [action.spot.id]: action.spot
                }
            }
        }
        case REMOVE_SPOT: {
            const newState = {
                ...state,
                currentSpot: { ...state.currentSpot },
                allSpots: {
                    ...state.allSpots
                }
            }
            delete newState.allSpots[action.spotId]
            delete newState.currentSpot[action.spotId]
            return newState
        }
        case GET_USER_SPOT: {
            console.log('action', action)
            const newState = {
                ...state,
                currentSpot: { ...state.currentSpot }
            }
            action.spot.forEach((spot) => {
                newState.currentSpot[spot.id] = spot
            })
            return newState
        }

        default:
            return state
    }

}

export default spotsReducer