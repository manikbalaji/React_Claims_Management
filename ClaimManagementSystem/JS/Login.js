function validateCredentials(){
    let isValid = true;
    let userName = document.login.username.value;
    let password = document.login.password.value;
    let letter = document.getElementById("letter");
    let capital = document.getElementById("capital");
    let number = document.getElementById("number");
    let length = document.getElementById("length");
    if(userName == null || userName ==""){
          usrname.classList.add("invalid");
          usrname.classList.remove("valid");
          isValid = false;
       } else {
          usrname.classList.add("valid");
          usrname.classList.remove("invalid");
       }

       let lowerCaseLetters = /[a-z]/g;
       if(password.match(lowerCaseLetters)) {  
          letter.classList.remove("invalid");
          letter.classList.add("valid");
       } else {
          letter.classList.remove("valid");
          letter.classList.add("invalid");
          isValid = false;
       }
       
       // Validate capital letters
       let upperCaseLetters = /[A-Z]/g;
       if(password.match(upperCaseLetters)) {  
          capital.classList.remove("invalid");
          capital.classList.add("valid");
       } else {
          capital.classList.remove("valid");
          capital.classList.add("invalid");
          isValid = false;
       }

       // Validate numbers
       let numbers = /[0-9]/g;
       if(password.match(numbers)) {  
          number.classList.remove("invalid");
          number.classList.add("valid");
       } else {
          number.classList.remove("valid");
          number.classList.add("invalid");
          isValid = false;
       }
       
       // Validate length
       if(password.length >= 8) {
          length.classList.remove("invalid");
          length.classList.add("valid");
       } else {
          length.classList.remove("valid");
          length.classList.add("invalid");
          isValid = false;
       }
       if(isValid){
       let queryString = "?name=" + userName;
      //  window.location.href = "ClaimSummary.html";
       sessionStorage.userName = userName;
       sessionStorage.loginTime = new Date().toLocaleString().replace(/,/, ' ');
       }
       else{
          summary.classList.add("invalid");
          summary.classList.remove("valid");
       }
 }