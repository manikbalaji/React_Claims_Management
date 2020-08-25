import axios from 'axios';
import {Logger} from 'react-logger-lib'
import {store} from '../Store/Store.js'

// const actionCreators = {
//     getUsers: () => {
//         getsUsersList();
//     }
// };

let users = {};
export function getsUsersList(){
    //const users = 
    return function(dispatch) {
        return axios.get(`http://localhost:7000/users`)
        .then(res => res.data
        // {
        // Logger.of('App.Login.componentDidlMount').info('List of Users retreived', res.data);
        // users = res.data;
        // console.log(users)
        // }
        )
        .then(data => {
            dispatch({
                    type: 'GET_USERS',
                    payload: data
                })
        })
        // return {
        //     type: 'GET_USERS',
        //     payload: users
        // }
        // .catch(error=>{
        // Logger.of('App.Login.componentDidlMount').error('Error retreiving list of Users',error);
        // })
        // store.dispatch({
        //     type: 'GET_USERS',
        //     users: users
        // })
    //}
    }
}

// export default actionCreators;