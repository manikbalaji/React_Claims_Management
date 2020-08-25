import React from 'react'
import '../CSS/Common.css'
import Header from './Header.jsx'
import Menu from './Menu.jsx'
import Footer from './Footer.jsx'

class Home extends React.Component{
    render(){
        let content = [
            <div id="content1" className="textcenter">
                <h1>Welcome</h1>
                <h2>This application is used to manage your claims.</h2>
            </div>
        ];
        return(
            // <div id="content">
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

export default Home