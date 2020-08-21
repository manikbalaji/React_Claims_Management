import React from 'react';
import axios from 'axios';
import '../CSS/Login.css';
import { Logger } from "react-logger-lib";
import {store} from '../Store/Store.js';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state={
            userName: "",
            password: "",
            userNameError: false,
            lowerError: false,
            capitalError: false,
            numberError: false,
            lengthError: false,
            userNameMismatch: false,
            passwordMismatch: false,
            isValid: true,
            users: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    };
    
    componentDidMount() {
        axios.get(`http://localhost:7000/users`)
          .then(res => {
            Logger.of('App.Login.componentDidlMount').info('List of Users retreived', res.data);
            const users = res.data;
            this.setState({ users });
          })
          .catch(error=>{
            Logger.of('App.Login.componentDidlMount').error('Error retreiving list of Users',error);
          })
      }

    checkAuthentication(){
        let userNameMismatch = false, passwordMismatch = false;
        const users = this.state.users;
        const res = users.find(user => user.username == this.state.userName);
        if(res == undefined){
            userNameMismatch = true;
            this.setState({
                userNameMismatch
            });
            return false;
        }
        else{
            if(res.password != this.state.password){
                passwordMismatch = true;
                this.setState({
                    userNameMismatch,
                    passwordMismatch
                });
                return false;
            }
        }
        this.setState({
            userNameMismatch,
            passwordMismatch
        });
        return true;
    }

    validateCredentials() {
        let userNm = this.state.userName;
        let pwd = this.state.password;
        let userNameError = false, lowerError  = false,capitalError  = false,numberError  = false,lengthError=false;

        userNameError = (userNm == null || userNm == "") ? true : false;
    
        let lowerCaseLetters = /[a-z]/g;
        if(!pwd.match(lowerCaseLetters)) {
            lowerError=true;
           }
           
           let upperCaseLetters = /[A-Z]/g;
           if(!pwd.match(upperCaseLetters)) {  
            capitalError=true;
           }
    
           // Validate numbers
           let numbers = /[0-9]/g;
           if(!pwd.match(numbers)) {  
            numberError=true;
           }
           
           // Validate length
           if(pwd.length < 8) {
            lengthError=true;
           }

           if(userNameError || lowerError || capitalError || numberError || lengthError){
            this.setState({
                isValid: false,
                userNameError,
                lowerError,
                capitalError,
                numberError,
                lengthError
            });
            return false;
           }
           else{
                let isAuthenticUser = this.checkAuthentication();
                store.dispatch({
                   type:"Login",
                   payload:{
                    loggedInUser: this.state.userName,
                    loggedInTime: new Date().toLocaleString().replace(/,/, ' ')
                   }
                });
                // store.subscribe(() =>
                // alert(store.getState().loggedInUser)
                // );
                sessionStorage.userName = this.state.userName;
                sessionStorage.loginTime = new Date().toLocaleString().replace(/,/, ' ');
                this.setState({
                    isValid: isAuthenticUser,
                    userNameError,
                    lowerError,
                    capitalError,
                    numberError,
                    lengthError
            });
            return isAuthenticUser;
           }
     }

     handleSubmit(event) {
        event.preventDefault();
        const isValid = this.validateCredentials();
        if(isValid){
            this.props.router.push("/Home");
        }
     }

    render(){

        let body = [
            <div key="lcontainer" className="container center">
                <div key="lrow" className="row">
			        <div key="lcolmd5" className="col-md-5 mx-auto">
			            <div key="first">
				            <div key="lmyform" className="myform">
					            <div  key="llogo"className="logo mb-3">
					            </div>
                                <form name="login" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" name="username" className="form-control" id="username" placeholder="Enter username" value={this.state.userNamne} onChange={e=>this.setState({userName: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" name="password" id="password"  className="form-control" placeholder="Enter Password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})}
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
                                    </div>
                                    <div className="col-md-12 text-center ">
                                        <input type="button" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.handleSubmit} value="Login"></input>
                                    </div>
                                </form>
                            </div>
                            <div id="summary" className={this.state.isValid?"validationSummary valid":"validationSummary invalid"}>
                                <p id="usrname" className={this.state.userNameError?"invalid":"valid"}>Username is <b>mandatory</b></p>
                                <p id="lower" className={this.state.lowerError?"invalid":"valid"}>Password must have a <b>lowercase</b> letter</p>
                                <p id="capital" className={this.state.capitalError?"invalid":"valid"}>Password must have a <b>uppercase</b> letter</p>
                                <p id="number" className={this.state.numberError?"invalid":"valid"}>Password must have a <b>number</b></p>
                                <p id="length" className={this.state.lengthError?"invalid":"valid"}>Password must have minimum <b>8 characters</b></p>
                                <p id="usrnamemismatch" className={this.state.userNameMismatch?"invalid":"valid"}>Username <b>doesn't exist</b></p>
                                <p id="passwordmismatch" className={this.state.passwordMismatch?"invalid":"valid"}>Username and password <b>doesn't match</b></p>
                            </div>
		                </div>
                    </div> 
                </div> 
            </div>      
        ];
        return (
            <div>
                <h1 className="loginheader">CLAIM MANAGEMENT SYSYTEM</h1>
                <div key="lbody" className="body">
                    {body}
                </div>
            </div>
        );
    }
}

export default Login;