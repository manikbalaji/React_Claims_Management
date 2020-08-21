import React from 'react';
import './CSS/Login.css';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state={
            userName: "",
            password: "",
            isValid: "true"
        }

        this.validateCredentials = this.validateCredentials.bind(this);
    }
    

    validateCredentials(){
        console.log("User Name: " + this.state.isValid);
        let userNm = this.state.userName;
        let pwd = this.state.password;
        if(userNm == null || userNm ==""){
            console.log("Came in" + this.state.isValid)
            this.setState({isValid:"false"})
            console.log("Going out" + this.state.isValid)
        } 
    
        let lowerCaseLetters = /[a-z]/g;
        if(!pwd.match(lowerCaseLetters)) {  
            this.setState({isValid:"false"})
           }
           
           let upperCaseLetters = /[A-Z]/g;
           if(!pwd.match(upperCaseLetters)) {  
            this.setState({isValid:"false"})
           }
    
           // Validate numbers
           let numbers = /[0-9]/g;
           if(!pwd.match(numbers)) {  
            this.setState({isValid:"false"})
           }
           
           // Validate length
           if(!pwd.length >= 8) {
            this.setState({isValid:"false"})
           }
           if(this.state.isValid == true){
        //    window.location.href = "ClaimSummary.html";
           sessionStorage.userName = this.state.userName;
           sessionStorage.loginTime = new Date().toLocaleString().replace(/,/, ' ');
           console.log("After Change" + this.state.isValid);
           console.log(this.state.userName);
           console.log(userNm);
           }
     }
    render(){

        let body = [
            <div className="container">
                <div className="row">
			        <div className="col-md-5 mx-auto">
			            <div id="first">
				            <div className="myform form ">
					            <div className="logo mb-3">
					            </div>
                                <form name="login">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" name="username"  className="form-control" id="username" placeholder="Enter username" value={this.state.userNamne} onChange={e=>this.setState({userName: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" name="password" id="password"  className="form-control" placeholder="Enter Password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})}
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
                                    </div>
                                    <div className="col-md-12 text-center ">
                                        <input type="button" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.validateCredentials} value="Login"></input>
                                    </div>
                                </form>
                            </div>
                            <div id="summary" className={"validationSummary " + this.state.isValid==false?"valid":"invalid"}>
                                <p id="usrname" className={this.state.isValid==false?"valid":"invalid"}>Username is <b>mandatory</b></p>
                                <p id="letter" className={this.state.isValid==false?"valid":"invalid"}>Password must have a <b>lowercase</b> letter</p>
                                <p id="capital" className={this.state.isValid==false?"valid":"invalid"}>Password must have a <b>uppercase</b> letter</p>
                                <p id="number" className={this.state.isValid==false?"valid":"invalid"}>Password must have a <b>number</b></p>
                                <p id="length" className={this.state.isValid==false?"valid":"invalid"}>Password must have minimum <b>8 characters</b></p>
                            </div>
		                </div>
                    </div> 
                </div> 
            </div>      
        ];
        return (
            <div className="body">
            {body}
            </div>
        );
    }
}

export default Login;