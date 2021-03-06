import React from 'react';
import '../CSS/UpdateClaim.css';
// import '../CSS/Common.css';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { Logger } from 'react-logger-lib';
import {browserHistory} from 'react-router';
import {store} from '../Store/Store.js';
import moment from 'moment'

class UpdateClaim extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state={
            claim: props.claim,
            claims: props.claimsList,
            claimNumberError: "Enter max of 9 digit alphanumeric",
            claimProgramError: "Enter max of 20 characters",
            claimStartDate: "Enter a valid date",
            claimEndDate: "Enter a valid date",
            isValidNumber: true,
            isValidProgram: true,
            isValidStartDate: true,
            isValidEndDate: true,
            isUpdated: false,
            showForm: props.showUpdateClaim,
            rowIndex: props.rowClicked
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps!=this.props){
            let lstClaims = nextProps.claimsList;
            this.setState({
                claim: lstClaims[nextProps.rowClicked],
                claims: lstClaims,
                showForm: nextProps.showUpdateClaim,
                rowIndex: nextProps.rowClicked
            });
        }
    }


    handleChange(event){
        let modifiedClaim = this.state.claim;
        let name = event.target.name;
        let value = event.target.value;
        if(name == "StartDate" || name == "EndDate"){
            console.log(moment(value).isValid());
            value = value.split("-").reverse().join("/");
        }
        modifiedClaim[name] = value;
        this.setState({
            claim: modifiedClaim
        });
    }

    invalidDateCheck(date){
        const modifiedDateFormat = date.split("/").reverse().join("-");
        console.log("ModifiedDate: ", modifiedDateFormat)
        const dateregex = /^(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
        if(dateregex.test(modifiedDateFormat)){
            return !moment(modifiedDateFormat).isValid()
        }
        return true;
    }

    validateClaim(claim){
        let clmNumRegex = /^([a-zA-Z0-9]{1,9})$/;
        let isValidNumber = true, isValidProgram = true, isValidStartDate = true, isValidEndDate = true;
        if(!claim.ClaimNumber.match(clmNumRegex)){
            isValidNumber = false;
          }
        
        if(claim.ClaimProgram.length < 1 || claim.ClaimProgram.length > 20){
            isValidProgram = false;
        }
        
        if(claim.StartDate == null || claim.StartDate =="" || this.invalidDateCheck(claim.StartDate)){
            isValidStartDate = false;
        }

        if(claim.EndDate == null || claim.EndDate =="" || this.invalidDateCheck(claim.EndDate)){
            isValidEndDate = false;
        }

        

        this.setState({
            isValidNumber,
            isValidProgram,
            isValidStartDate,
            isValidEndDate
        });

        return isValidNumber && isValidProgram && isValidStartDate && isValidEndDate;
    }

    updateStore(claim){
        let claims = this.state.claims;
        let updatedIndex = this.state.rowIndex;
        claims[updatedIndex] = claim;
        store.dispatch({
            type: 'ClaimList',
            payload: claims
        });
    }

    updateJSON(claim) {
        const params = {
            EmployeeId: claim.EmployeeId,
            EmployeeName: claim.EmployeeName,
            ClaimNumber: claim.ClaimNumber,
            ClaimType: claim.ClaimType,
            ClaimProgram: claim.ClaimProgram,
            StartDate: claim.StartDate,
            EndDate: claim.EndDate
          }
    
        axios.put('http://localhost:7001/claims/' + params.EmployeeId, params)
        .then(response=>{
            this.setState({
                showForm: !this.state.showForm
            });
            Logger.of('App.UpdateClaim.updateJSON').info('Claim updated', response);
        })
        .catch(error=>{
            Logger.of('App.UpdateClaim.updateJSON').error('Claim update failed', error);
        });
    }

    // reloadClaimSummary(){
    //     browserHistory.push('/ClaimSummary');
    // }

    handleUpdate(e){
        // this.props.updateList(this.state.claim);
        e.preventDefault();
        const claim = this.state.claim;
        const isValid = this.validateClaim(claim);
        if(isValid){
            this.updateJSON(claim);
            this.updateStore(claim);
            // this.props.cancelledClaim();
            // this.props.router.push("/ClaimSummary");
            // if(isUpdated){
            //     // this.props.cancelledClaim();
            //     console.log("update clicked");
            //     this.setState({
            //         showForm: !this.state.showForm
            //     });
            //this.reloadClaimSummary();
            // }
        }
    }

    handleCancel(){
        this.setState({
            showForm: !this.state.showForm
        });
        // this.props.cancelledClaim();
    }


    render(){
        const claim = this.state.claim;
        let startDate = "";
        let endDate = "";
        if(claim.StartDate){
            startDate = this.state.claim.StartDate.split("/").reverse().join("-");
        }
        if(claim.EndDate){
            endDate = this.state.claim.EndDate.split("/").reverse().join("-");
        }


        let sample = [
            <Container>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Employee id</Form.Label>
                        <Col sm="5">
                            <Form.Control name="EmployeeId" placeholder="Employee id" value={this.state.claim.EmployeeId} readOnly/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Employee Name</Form.Label>
                        <Col sm="5">
                        <Form.Control name="EmployeeName" placeholder="Employee Name" value={this.state.claim.EmployeeName} readOnly/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Claim Number</Form.Label>
                        <Col sm="5">
                        <Form.Control name="ClaimNumber" placeholder="Claim Number" value = {this.state.claim.ClaimNumber} onChange={this.handleChange} className= {this.state.isValidNumber ? "" : "errorField"}/>
                        {!this.state.isValidNumber && <Form.Label column sm="9" className="errorLabel">{this.state.claimNumberError}</Form.Label>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Claim Type</Form.Label>
                        <Col sm="5">
                        <Form.Control name="ClaimType" as="select" placeholder="Employee Name" option = {this.state.claim.ClaimType} onChange={this.handleChange}>
                            <option value="Submitted">Submitted</option>
                            <option value="Received">Received</option>
                            <option value="Pending">Pending</option>
                            <option value="More Info Required">More Info Required</option>
                            <option value="Denied">Denied</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Paid">Paid</option>
                        </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Claim Program</Form.Label>
                        <Col sm="5">
                        <Form.Control name="ClaimProgram" placeholder="Claim Program" value = {this.state.claim.ClaimProgram} 
                            onChange={this.handleChange} className= {this.state.isValidProgram ? "" : "errorField"}/>
                        {!this.state.isValidProgram && <Form.Label column sm="9" className="errorLabel">{this.state.claimProgramError}</Form.Label>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Claim Start Date</Form.Label>
                        <Col sm="5">
                        <Form.Control type="date" name="StartDate" placeholder="Claim Start Date" value = {startDate} onChange={this.handleChange} 
                            className= {this.state.isValidStartDate ? "" : "errorField"} min="1900-01-01"/>
                        {!this.state.isValidStartDate && <Form.Label column sm="5" className="errorLabel">{this.state.claimStartDate}</Form.Label>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Claim End Date</Form.Label>
                        <Col sm="5">
                        <Form.Control type="date" name="EndDate" placeholder="Claim End Date" value = {endDate} onChange={this.handleChange} 
                            className= {this.state.isValidEndDate ? "" : "errorField"} min="1900-01-01"/>
                        {!this.state.isValidEndDate && <Form.Label column sm="5" className="errorLabel">{this.state.claimEndDate}</Form.Label>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2"></Form.Label>
                        <Col sm="2">
                        <Button variant="primary" type="submit" onClick={this.handleUpdate}>
                            Update
                        </Button>
                        </Col>
                        <Col sm="2">
                        <Button variant="primary" type="submit" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        ];
        return (
            this.state.showForm ? 
            <div className="form"> 
                {sample}
            </div>
            : null
            );
    }
}

export default UpdateClaim