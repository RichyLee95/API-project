import { csrfFetch } from "./csrf"
/** Action Type Constants: */
export const GET_REVIEWS = 'spots/GET_REVIEWS'
export const GET_SINGLE_REVIEW = 'spots/GET_SINGLE_REVIEW'
export const UPDATE_REVIEW = 'spots/UPDATE_REVIEW'
export const REMOVE_REVIEW = 'spots/REMOVE_REVIEW'
export const GET_USER_REVIEW = 'spots/GET_USER_REVIEW'
/**  Action Creators: */

export const getAllReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews,

})
export const getSingleReview = (review) => ({
    type: GET_SINGLE_REVIEW,
    review,
})
export const editReview = (review) => ({
    type: UPDATE_REVIEW,
    review,
})

export const removeReview = (review) => ({
    type: REMOVE_REVIEW,
    review,
})
export const currentUserReview = (review) => ({
    type: GET_USER_REVIEW,
    review,
})

/** Thunk Action Creators: */
//not get all reviews, needs review by current user and review by spot
export const getReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllReviews(data.Reviews))
        return data.Reviews
    }
};
// export const getReviewBySpot = (reviewId) => async (dispatch) =>{
//     const res = await csrfFetch(`/api/spots/${spotId}`)
//     if(res.ok){
//         const reviewDetails = await res.json()
//         dispatch(getSingleReview(reviewDetails))
//         return spotDetails
//     }else{
//         const errors = await res.json()
//         return errors
//     }
// }
// export const getReviewsByUser = () => async (dispatch) => {
//     const res = await csrfFetch('/api/spots/current')
//     if (res.ok) {
//         const userReview = await res.json()
//         dispatch(currentUserReview(userReview.Reviews))
//         return userReview.Reviews
//     }
// }
// export const createReview = (review) => async (dispatch) => {
//     const res = await csrfFetch('/api/spots', {
//         method:'POST',
//         headers:{ 'Content-Type': 'application/json' },
//         body:JSON.stringify(review)
//     })
//     if (res.ok){
//         const newReview = await res.json()
//         dispatch(editReview(newReview))
//         return newReview
//     }else{
//         const errors = await res.json()
//         return errors
//     }
//     }
//     export const updateReview = (review) => async (dispatch) => {
//         const res = await csrfFetch(`/api/spots/${spot.id}`,{
//             method:'PUT',
//             headers:{'Content-Type': 'application/json' },
//             body:JSON.stringify(review)
            
//         })
//         if(res.ok){
//             const updatedReview = await res.json()
//             dispatch(editReview(updatedReview))
//             return updatedReview
//         // }else{
//         //     const errors = await res.json()
//         //     return errors
//         }
        
//     }
/** Review reducer */
const initialState = { allReviews: {}, currentReview: {} }//added current review
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_REVIEWS: {
            console.log('review reducer', action)
            const reviewsState = {
                ...state,//have to now spread state and add allReviews obj
                allReviews: {}
            }
            action.reviews.Reviews.forEach((review) => {
                reviewsState.allReviews[review.id] = review//have to update to key into allreviews of initial state
            })
            return reviewsState
        }
        // case GET_SINGLE_REVIEW:{
        //     return {...state,
        //         allReviews:{
        //             ...state.allReviews, //have to deep copy spread ...state to keep all prev AllSpots
        //          [action.review.id]:action.review
        //         },
        //         }
        // } 
        // case GET_USER_REVIEW:{
        //     const newState = {
        //         ...state,
        //           currentReview:{...state.currentReview}}
        //     action.review.forEach((review)=>{
        //         newState.currentReview[review.id] = review
        //     })
        //     return newState
        // }
        default:
            return state
    }
}

export default reviewsReducer