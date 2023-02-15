/**
 * Create action types here
 */
export const USERS_LOADED = 'usersLoaded'
export const USERS_ADDED = 'usersAdded'
export const POSTS_LOADED = 'postsLoaded'
export const VALIDATE_USERS = 'usersValidated'
export const RESET_VALIDATE = 'resetValidate'
export const GET_POSTS = 'getPosts'
export const FITER_POSTS = 'filterPosts'
export const ADD_POSTS = 'addPosts'
export const FETCH_FOLLOWERS = 'fetchFollowers'
export const REMOVE_FOLLOWERS = 'removeFollowers'
export const ADD_FOLLOWERS = 'addFollowers'
export const UPDATE_HEADLINE = 'updateHeadline'
export const GET_EMAIL = 'getEmail'
export const UPDATE_EMAIL = 'updateEmail'
export const GET_ZIPCODE = 'getZipcode'
export const UPDATE_ZIPCODE = 'updateZipcode'
export const GET_DOB = 'getDOB'
export const GET_AVATAR = 'getAvatar'
export const UPDATE_AVATAR = 'updateAvatar'
export const GET_HEADLINE = 'getHeadline'
export const UPDATE_PROFILE = 'updateProfile'
export const LOG_OUT = 'logOutUser'
export const GOOGLE_LOGIN = 'handleGoogleData'


/**
 * Action creators here
 */
export function loadUsers(data) {
    return {type: USERS_LOADED, payload: data}
}

export function addUsers(user) {
    return {type: USERS_ADDED, payload: user}
}

export function validateUsers(user) {
    return {type: VALIDATE_USERS, payload: user}
}

export function handleGoogleData(user) {
    return {type: GOOGLE_LOGIN, payload: user}
}

export function resetValidate() {
    return {type: RESET_VALIDATE, payload: ""}
}

export function loadPosts(posts) {
    return {type: POSTS_LOADED, payload: posts}
}

export function getPosts(userID) {
    return {type: GET_POSTS, payload: userID}
}

export function filterPosts(input) {
    return {type: FITER_POSTS, payload: input}
}

export function addPosts(post) {
    return {type: ADD_POSTS, payload: post}
}

export function fetchFollowers(user) {
    return {type: FETCH_FOLLOWERS, payload: user}
}

export function removeFollowers(user) {
    return {type: REMOVE_FOLLOWERS, payload: user}
}

export function addFollowers(user) {
    return {type: ADD_FOLLOWERS, payload: user}
}

export function getHeadline(payload) {
    return {type: GET_HEADLINE, payload: payload}
}

export function updateHeadline(headline) {
    return {type: UPDATE_HEADLINE, payload: headline}
}

export function getEmail(username) {
    return {type: GET_EMAIL, payload: username}
}

export function updateEmail(username) {
    return {type: UPDATE_EMAIL, payload: username}
}

export function getZipcode(username) {
    return {type: GET_ZIPCODE, payload: username}
}

export function updateZipcode(username) {
    return {type: UPDATE_ZIPCODE, payload: username}
}

export function getDOB(username) {
    return {type: GET_DOB, payload: username}
}

export function getAvatar(username) {
    return {type: GET_AVATAR, payload: username}
}

export function updateAvatar(username) {
    return {type: UPDATE_AVATAR, payload: username}
}

export function updateProfile(profile) {
    return {type: UPDATE_PROFILE, payload: profile}
}

export function logOut() {
    return {type: LOG_OUT, payload: ''}
}