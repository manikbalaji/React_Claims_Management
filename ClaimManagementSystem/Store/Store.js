import {createStore} from 'redux';

const initialState = {
    loggedInUser: "",
    loggedInTime: "",
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

export const store = createStore(reducer ,initialState);