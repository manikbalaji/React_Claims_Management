import React from 'react'
import '../CSS/Common.css'

class Footer extends React.Component{
    render(){
        let footer = [
            <span key="copyright" className="far fa-copyright"> 2020 Mani</span>
        ];
        return (
            <footer>
                {footer}
            </footer>
        );
    }
}

export default Footer