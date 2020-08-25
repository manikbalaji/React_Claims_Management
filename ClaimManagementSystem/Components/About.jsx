import React from 'react'
import '../CSS/Common.css'
import Header from './Header.jsx'
import Menu from './Menu.jsx'
import Footer from './Footer.jsx'

class About extends React.Component{
    render(){
        let content = [
            <div id="about" className="box">
                <h3>Vision</h3>
                <p>To become the number one service and consultancy firm for Digitalizing Businesses</p>
                <h3>Mission</h3>
                <p>Help clients digitalize their businesses</p>
                <h3>Our Story</h3>
                <p id="story">We established our first service on August 6, 2020. <br></br>
                This is our first application created for Claims Management. <br></br>
                This application helps to manage your claims with MongoDB database. <br></br>
                We are helping many clients to digitalise their business. <br></br>
                Reach out to us if you have any digitilazation needs. <br></br>
                Please check the Contact Us page to reach us.</p>
            </div>
        ];
        return(
            <React.Fragment>
                <Header/>
                <Menu/>
                {content}
                <Footer/>
            </React.Fragment>
        );
    }
}

export default About