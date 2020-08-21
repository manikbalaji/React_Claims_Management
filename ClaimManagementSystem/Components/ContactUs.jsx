import React from 'react'
import '../CSS/Common.css'
import Header from './Header.jsx'
import Menu from './Menu.jsx'
import Footer from './Footer.jsx'

class ContactUs extends React.Component{
    render(){
        let content = [
            <div id="content">
                <ul className="contact">
                <li className="list"><i className="fa fa-globe fa-fw"></i>DigitalizeBusiness.com</li>
                <li className="list"><i className="fa fa-envelope fa-fw"></i> digitalizebusiness@gmail.com</li>
                <li className="list"><i className="fa fa-mobile fa-fw"></i>1234567890</li>
                </ul>
          </div>
        ];
        return(
            <div id="content1">
                <Header/>
                <Menu/>
                {content}
                <Footer/>
            </div>
        );
    }
}

export default ContactUs