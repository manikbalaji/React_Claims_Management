import React from 'react'
import {Link} from 'react-router'
import '../CSS/Common.css'

class Menu extends React.Component{
    render(){
        // let menu = [
            
        //         <ul>
        //             <li id="home"><a href="Home"><i className="fas fa-home fa-fw"></i> Home</a></li>
        //             <li id="update"><a href="javascript:void(0);" onClick="editRowFromLink()">Update Claim</a></li> 
        //             <li id="about"><a href="About"><i className="fa fa-address-card fa-fw"></i> About</a></li>
        //             <li id="contact"><a href="ContactUs"><i className="fa fa-phone fa-fw"></i> Contact Us</a></li>
        //             <li id="logout"><a href="/" className="right"><i className="fa fa-sign-out-alt fa-fw"></i>Logout</a></li>
        //         </ul>
        // ];

        let sample = [
            // <ul>
            //     <Link to="Home"><i className="fas fa-home fa-fw"></i> Home</Link>
            //     <Link to="About"><i className="fa fa-address-card fa-fw"></i> About</Link>
            //     <Link to="ContactUs"><i className="fa fa-phone fa-fw"></i> Contact Us</Link>
            //     <Link to="/"><i className="fa fa-sign-out-alt fa-fw"></i> Logout</Link>
            // </ul>
            
            <ul key="list">
                <div id = "nav">
                    <li key="1"><Link to="Home"><i className="fas fa-home fa-fw"></i> Home</Link></li>
                    <li key="2"><Link to ="ClaimSummary">ClaimSummary</Link></li>
                    <li key="3"><Link to ="About"> <i className="fa fa-address-card fa-fw"></i> About</Link></li> 
                    <li key="4"><Link to ="ContactUS"><i className="fa fa-phone fa-fw"></i> ContactUs</Link></li>
                    <li key="5"><Link to ="Login" className="right"><i className="fa fa-sign-out-alt fa-fw"></i> Logout</Link></li>
                </div>
                {this.props.children}
            </ul> 
        ];

        return(
            // <div id="menu">
            <React.Fragment>
                {sample}
            </React.Fragment>
            // </div>
        );
    }
}

export default Menu