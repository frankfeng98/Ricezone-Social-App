import { createReducer, current } from "@reduxjs/toolkit"
import { AccordionTitle } from "flowbite-react/lib/esm/components/Accordion/AccordionTitle";
import storage from 'redux-persist/lib/storage';
import { loadUsers, loadPosts, USERS_LOADED, USERS_ADDED, VALIDATE_USERS, RESET_VALIDATE, POSTS_LOADED, GET_POSTS, FITER_POSTS, ADD_POSTS, FETCH_FOLLOWERS, REMOVE_FOLLOWERS, ADD_FOLLOWERS, UPDATE_HEADLINE, UPDATE_PROFILE, GET_EMAIL, LOG_OUT, addUsers, validateUsers, resetValidate, GET_HEADLINE, getHeadline, updateHeadline, fetchFollowers, addFollowers, removeFollowers, getPosts, addPosts, getEmail, getZipcode, GET_ZIPCODE, getPhone, getDOB, GET_DOB, UPDATE_EMAIL, updateEmail, updateZipcode, UPDATE_ZIPCODE, getAvatar, GET_AVATAR, updateAvatar, UPDATE_AVATAR, handleGoogleData, GOOGLE_LOGIN } from "./actions"


const url = path => `https://finalricezone.herokuapp.com${path}`;
const initialState = {
    userList: [],
    userExisted: false,
    userValidated: false,
    postList: [],
    currentPost: "",
    displayPost: "",
    email: "",
    zipcode: "",
    dob: "",
    currentUser: '',
    profile_username: '',
    userHeadline: "",
    avatar: "",
    followerList: [],
    followerHeadlineList: [],
    followerAddError: false,
    toggle: false,
    loading: true
}

export function riceZoneApp( state = initialState, action) {
    switch (action.type) {
        //load placehoder users
        case USERS_LOADED:
            let date = new Date();
            let userList_placehoder = []
            action.payload.forEach(user => {
                user['password1'] = user.address.street
                user['zipcode'] = user.address.zipcode
                userList_placehoder.push(user)
            });
            return {
                ...state,
                userNum: action.payload.length,
                userList: [...userList_placehoder],
                timeStamp: date.toLocaleString(),
                defaultHeadLine: 'hello world'
            }
        case USERS_ADDED:
            let payload = action.payload;
            let userExists = false;
            let userValidated = false;
            let currentUser_register = ''; 
            if (payload.result === "User already exist") {
                userExists = true;
            } else {
                userValidated = true;
                currentUser_register = payload.username;
            }
            return {
                ...state,
                userExisted: userExists,
                userValidated: userValidated,
                currentUser: currentUser_register,
            }
        case VALIDATE_USERS:
            let logIn = action.payload;
            let currentUser = logIn.username;
            return {
                ...state,
                userValidated: true,
                currentUser: currentUser
            }
        case GOOGLE_LOGIN:
            return {
                ...state,
                userValidated: true,
                currentUser: action.payload.user.username
            }
        case RESET_VALIDATE:
            let toggle = !state.toggle;
            return {
                ...state,
                toggle: toggle
            }       
        case POSTS_LOADED:
            return {
                ...state,
                postList: [...action.payload],
                postNum: action.payload.length
            }  
        case GET_POSTS:
            return {
                ...state,
                currentPost: [...action.payload.articles],
                displayPost: [...action.payload.articles],
                loading: false
            }
        case FITER_POSTS:
            let filterPosts = [...state.currentPost];
            let query = action.payload;
            let displayPosts = [];
            if (query === '') {
                displayPosts = filterPosts;
            } else {
                filterPosts.forEach(post => {
                    if (post.text.toLowerCase().includes(query.toLowerCase()) || post.author.toLowerCase().includes(query.toLowerCase())) {
                        displayPosts.push(post);
                    }
                })  
            }
            return {
                ...state,
                displayPost: displayPosts
            }
        case ADD_POSTS:
            return {
                ...state,
                currentPost: [...action.payload.articles],
                displayPost: [...action.payload.articles]
            }  
        case FETCH_FOLLOWERS:
            let follower = [...action.payload.following.following];
            let headlinelist = [...action.payload.headlineList];
            return {
                ...state,
                followerList: [...follower],
                followerHeadlineList: action.payload.headlineList
            } 
        case REMOVE_FOLLOWERS:
            let follower_headline_list = [...state.followerHeadlineList];
            follower_headline_list = follower_headline_list.filter((user) => user.username !== action.payload.username);
            return {
                ...state,
                followerList: [...action.payload.following.following],
                followerHeadlineList: [...follower_headline_list]
            }  
        case ADD_FOLLOWERS:
            let toggle_follower;
            let followerAddError = state.followerAddError;
            let follower_add = [...state.followerList];
            let follower_headline = [...state.followerHeadlineList];
            if (action.payload.following.following === "user not found" || action.payload.following.following === "user already followed") {
                followerAddError = true;
                toggle_follower = !state.toggle;
            } else {
                follower_add = [...action.payload.following.following]
                followerAddError = false;
                follower_headline.push(action.payload.newFollower);
            }
            return {
                ...state,
                followerList: follower_add,
                followerAddError: followerAddError,
                followerHeadlineList: [...follower_headline],
                toggle: toggle_follower
            }
        case GET_HEADLINE:
             return {
                ...state,
                userHeadline: action.payload.headline
             }
        case UPDATE_HEADLINE:
            return {
                ...state,
                userHeadline: action.payload.headline
            } 
        case GET_EMAIL:
            return {
                ...state,
                email: action.payload.email
            }
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload.email
            }
        case GET_ZIPCODE:
            return {
                ...state,
                zipcode: action.payload.zipcode
            }
        case UPDATE_ZIPCODE:
            return {
                ...state,
                zipcode: action.payload.zipcode
            }
        case GET_DOB:
            return {
                ...state,
                dob: action.payload.dob
            }
        case GET_AVATAR:
            return {
                ...state,
                avatar: action.payload.avatar
            }
        case UPDATE_AVATAR:
            return {
                ...state,
                avatar: action.payload.avatar
            }      
        case LOG_OUT:
            storage.removeItem('root');
            return initialState           
        default:
            return state;
    }
}

export async function fetchUsers(dispatch, getState) {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    dispatch(loadUsers(data));
}

export async function fetchPosts(dispatch, getState) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    dispatch(loadPosts(data));
}


export function createUser(payload) {
    return async function createUser(dispatch, getState) {
        const response = await fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: "include"
        });
        const data = await response.json();
        dispatch(addUsers(data));
    }
}

export function logInUser(payload) {
    return async function logInUser(dispatch, getState) {
        const response = await fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(validateUsers(data));
        } else {
            dispatch(resetValidate());
        }
    }
}

export function googleLogIn() {
    return async function googleLogIn(dispatch, getState) {
        window.location.href = "https://finalricezone.herokuapp.com/auth/google" 
    }
}

export function handleGoogleLogIn() {
    return async function handleGoogleLogIn(dispatch, getState) {
        const response = await fetch(url('/login/success'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,},
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            //dispatch(handleGoogleData(data));
        } else {
            
        }
    }
}

export function fetchHeadline(payload) {
    return async function fetchHeadline(dispatch, getState) {
        let response;
        response = await fetch(url(`/headline/${payload.username}`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(getHeadline(data));
        }
    }
}

export function updateHeadline_post(payload) {
    return async function updateHeadline_post(dispatch, getState) {
        let response;
        let body = {headline: payload.headline}
        response = await fetch(url(`/headline`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(updateHeadline(data));
        }
    }
}

export function fetchFollowers_get(payload) {
    return async function fetchFollowers_get(dispatch, getState) {
        const response = await fetch(url(`/following/${payload.username}`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        });
        if (response.status == 200) {
            const following = await response.json();
            let followerHeadlineList = [];
            await Promise.all(following.following.map(async (following) => {
                let follower = {};
                const response_headline = await fetch(url(`/headline/${following}`), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json'},
                    credentials: "include"
                });
                let headline_data = await response_headline.json();
                follower['username'] = headline_data.username;
                follower['headline'] = headline_data.headline;
                const response_avatar = await fetch(url(`/avatar/${following}`), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json'},
                    credentials: "include"
                });
                let avatar_data = await response_avatar.json();
                follower['avatar'] = avatar_data.avatar;
                followerHeadlineList.push(follower);
            }))
            const data = {following: following, headlineList: followerHeadlineList};
            dispatch(fetchFollowers(data));
        }
    }
}

export function addFollowers_put(payload) {
    return async function addFollowers_put(dispatch, getState) {
        const response = await fetch(url(`/following/${payload.follower}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        });
        if (response.status == 200) {
            const following = await response.json();
            const response_headline = await fetch(url(`/headline/${payload.follower}`), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'},
                credentials: "include"
            });
            const headline = await response_headline.json();
            const response_avatar = await fetch(url(`/avatar/${payload.follower}`), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'},
                credentials: "include"
            });
            let avatar_data = await response_avatar.json();
            let follower = {'username': headline.username, 'headline': headline.headline, 'avatar': avatar_data.avatar};

            const data = {following: following, newFollower: follower}
            dispatch(fetchArticles(data));
            dispatch(addFollowers(data));
        }
    }
}

export function removeFollowers_delete(payload) {
    return async function fetchFollowers_get(dispatch, getState) {
        const response = await fetch(url(`/following/${payload.username}`), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        });
        if (response.status == 200) {
            const following = await response.json();
            const data = {username: payload.username, following: following};
            dispatch(fetchArticles(data));
            dispatch(removeFollowers(data));
        }
    }
}

export function fetchArticles(payload) {
    return async function fetchArticles(dispatch, getState) {
        let response;
        response = await fetch(url(`/articles`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(getPosts(data));
        }
    }
}

export function addArticles(payload) {
    return async function addArticles(dispatch, getState) {
        if (payload.image && payload.image !== 'empty') {
            let fd = new FormData();
            fd.append('text', payload.body);
            fd.append('image', payload.image);
            let response = await fetch(url(`/article_image`), {
                method: 'POST',
                body: fd,
                credentials: "include"
            });
            if (response.status == 200) {
                const data = await response.json();
                dispatch(addPosts(data));
            }
        } else {
            let response = await fetch(url('/article'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({text: payload.body}),
                credentials: "include"
            })
            if (response.status == 200) {
                const data = await response.json();
                dispatch(addPosts(data));
            }
        }
    }
}

export function addComments(payload) {
    return async function addComments(dispatch, getState) {
        let req_body = {};
        req_body['text'] = payload.comment;
        req_body['commentId'] = -1;
        let response = await fetch(url(`/articles/${payload.pid}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(req_body),
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(fetchArticles(data));
        }
    }
}

export function editArticle(payload) {
    return async function editArticle(dispatch, getState) {
        let req_body = {};
        req_body['text'] = payload.text;
        let response = await fetch(url(`/articles/${payload.pid}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(req_body),
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(fetchArticles(data));
        }
    }
}

export function editComment(payload) {
    return async function editComment(dispatch, getState) {
        let response = await fetch(url(`/articles/${payload.pid}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(fetchArticles(data));
        }
    }
}

export function fetchEmail(payload) {
    return async function fetchEmail(dispatch, getState) {
        let response;
        response = await fetch(url(`/email`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(getEmail(data));
        }
    }
}

export function fetchZipcode(payload) {
    return async function fetchZipcode(dispatch, getState) {
        let response;
        response = await fetch(url(`/zipcode`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(getZipcode(data));
        }
    }
}

export function fetchDOB(payload) {
    return async function fetchDOB(dispatch, getState) {
        let response;
        response = await fetch(url(`/dob`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(getDOB(data));
        }
    }
}

export function fetchAvatar(payload) {
    return async function fetchAvatar(dispatch, getState) {
        let response;
        response = await fetch(url(`/avatar/${payload}`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        });
        if (response.status == 200) {
            const data = await response.json();
            dispatch(getAvatar(data));
        }
    }
}

export function UpdateProfile_put(payload) {
    return async function UpdateProfile_put(dispatch, getState) {
        if (payload.email !== '') {
            let response = await fetch(url(`/email`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': payload.email}),
                credentials: "include"
            });
            if (response.status == 200) {
                const data = await response.json();
                dispatch(updateEmail(data));
            }
        }
        if (payload.zipcode !== '') {
            let response = await fetch(url(`/zipcode`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'zipcode': payload.zipcode}),
                credentials: "include"
            });
            if (response.status == 200) {
                const data = await response.json();
                dispatch(updateZipcode(data));
            }
        }
        if (payload.password1 !== '') {
            let response = await fetch(url(`/password`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'password': payload.password1}),
                credentials: "include"
            });
            if (response.status == 200) {
                const data = await response.json();
            }
        }
        if (payload.image !== '') {
            let fd = new FormData();
            fd.append("text", "text");
            fd.append('image', payload.image);
            let response = await fetch(url('/avatar'), {
                method: 'PUT',
                body: fd,
                credentials: "include"
            });
            if (response.status == 200) {
                const data = await response.json();
                dispatch(updateAvatar(data))
            }
        }
    }
}

export default {riceZoneApp} ;