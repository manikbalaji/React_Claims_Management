This application is Claims Management System built using React, Redux, Express, JSON Server, MongoDB

###### Login 
We dispatch action to invoke axios call to JSON server that returns set of user details which is saved in store using redux.
We authenticate the users based on the user details in store.
Once the user is authenticated, username and login time are saved to store to display in header.

###### View Claim Summary 
We make axios call to fetch claim list from MongoDB and display in a table format and save the list in store using redux.
Click on the edit link in each row to open a form to edit claim details.

###### Update Claim 
The claim data from claim summary table is passed on to edit claim component as props which is then binded to form controls.
Validations are in place which will be triggered on form submit.
Once the validation is successfull, updated claim data is updated to store via redux and updated data is shown in claim summary

###### About, Home, ContactUs
There are static content forms.