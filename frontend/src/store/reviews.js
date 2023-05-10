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