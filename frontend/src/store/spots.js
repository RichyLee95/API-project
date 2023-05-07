/** Action Type Constants: */
export const GET_SPOTS = 'spots/GET_SPOTS'
export const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT'
export const UPDATE_SPOT = 'spots/UPDATE_SPOT'
export const REMOVE_SPOT = 'spots/REMOVE_SPOT'
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

/** Thunk Action Creators: */
//get all spots
export const fetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')

    if (res.ok) {
        const data = await res.json()
        console.log('this is in fetch spots',data.Spots)
        dispatch(getAllSpots(data))
        return data.Spots
    }
};


/** Spot reducer */

const spotsReducer = (state = {}, action) => {
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
        default:
            return state
    }
}

export default spotsReducer