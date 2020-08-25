import React from 'react'
import '../CSS/Common.css'
import Header from './Header.jsx'
import Menu from './Menu.jsx'
import Footer from './Footer.jsx'

class ContactUs extends React.Component{
    render(){
        let content = [
            <div id="content">
                <ul key="1" className="contact">
                    <li key="1" className="list"><i className="fa fa-globe fa-fw"></i>DigitalizeBusiness.com</li>
                    <li key="2" className="list"><i className="fa fa-envelope fa-fw"></i> digitalizebusiness@gmail.com</li>
                    <li key="3" className="list"><i className="fa fa-mobile fa-fw"></i>1234567890</li>
                </ul>
          </div>
        ];
        return(
            // <div id="content1">
            <React.Fragment>
                <Header/>
                <Menu/>
                {content}
                <Footer/>
                </React.Fragment>
            // </div>
        );
    }
}

export default ContactUs