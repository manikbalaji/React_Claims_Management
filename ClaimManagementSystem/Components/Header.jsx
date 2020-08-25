import React from 'react'
import '../CSS/Common.css'
import {store} from '../Store/Store.js'
import {connect} from 'react-redux';

class Header extends React.Component{
    constructor(props){
        super(props)
    }
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
                        <span id="welcome" className="right left-align"><i className="fa fa-user fa-fw"></i> {this.props.username}</span> <br></br>
                        <span id="time" className="right left-align">Logged In: {this.props.logtime}</span>
                    </div>
                </div>
        ];
        return(
            <header id="head1">
                {header}
            </header>
        );
    }
}

const MapStateToProps = (state) => {
    return {
    username: state.loggedInUser,
    logtime: state.loggedInTime
    };
};

export default connect(MapStateToProps)(Header);
// export default Header