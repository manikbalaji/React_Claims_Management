import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

const initialState = {
    loggedInUser: "",
    loggedInTime: "",
    users: [],
    claimList: []
}

const reducer=(state,action)=>{
    state = state || initialState;
    // switch (action.type){
    //     case "ClaimList":
    //         claimList=action.payload;
        
    //     case "Login":
    //         loggedInUser=action.payload.loggedInUser;
    //         loggedInTime=action.payload.loggedInTime;
    // }
   
    //    return state;

    if(action.type==='GET_USERS'){
        return Object.assign({}, state, {
            users: action.payload
        })
    }

    if(action.type==='ClaimList'){
        return Object.assign({}, state, {
            claimList: action.payload
        })
    }

    if(action.type==='Login'){
        return Object.assign({}, state, {
            loggedInUser: action.payload.loggedInUser,
            loggedInTime: action.payload.loggedInTime
        })
    }

    return state;

   };

export const store = createStore(reducer ,initialState, middleware);