import React from 'react'
import '../CSS/Common.css'
import {store} from '../Store/Store.js'

class Header extends React.Component{
    render(){
        // const userName = store.subscribe(()=>store.getState().loggedInUser);
        // const LoginTime = store.subscribe(()=>store.getState().loggedInTime);
        // console.log("User Name" ,store.getState().loggedInUser)
        // store.subscribe(() =>
        //     console.log("User Name" ,store.getState().loggedInUser)
        // );
        // store.subscribe(() =>
        //     console.log("Login Time" ,store.getState().loggedInTime)
        // );
        let header = [
            
                <div id="head">
                    <span id="header"> CLAIM MANAGEMENT SYSTEM</span>
                    <div id="userDetails" className="userDetails">
                        <span id="welcome" className="right left-align"><i className="fa fa-user fa-fw"></i> {store.getState().loggedInUser}</span> <br></br>
                        <span id="time" className="right left-align">Logged In: {store.getState().loggedInTime}</span>
                    </div>
                </div>
        ];
        return(
            <header>
                {header}
            </header>
        );
    }
}

export default Header