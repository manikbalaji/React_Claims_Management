import React from 'react';
import Header from './Header.jsx'
import Menu from './Menu.jsx'
import Footer from './Footer.jsx'
import '../CSS/Common.css'
import '../CSS/ClaimSummary.css'
import UpdateClaim from './UpdateClaim.jsx'
import axios from 'axios'
import {Logger} from 'react-logger-lib'
import {store} from '../Store/Store.js'

class ClaimSummary extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            lstclaims : [
                { ['Employee Id']: "1", ['Employee Name']: "Test1", ['Claim Number']: "1", ['Claim Type']: "Paid", ['Claim Program']: "Life Insurance", ['Start Date']: "08/12/2020", ['End Date']: "12/12/2020" }
            ],
            selectedclaim : [],
            showUpdateClaim: false,
            selectedIndex: 0
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:7001/claims`)
            .then(res => {
                Logger.of('App.ClaimSummary.componentDidlMount').info('List of claims retreived', res.data);
                const lstclaims = res.data;
                // this.setState({ lstclaims });
                store.dispatch({
                    type: 'ClaimList',
                    payload: lstclaims
                });
            })
            .catch(error=>{
                Logger.of('App.UpdateClaim.componentDidMount').error('Error retreiving claim list',error);
            })
            store.subscribe(()=>{
                this.setState({
                    lstclaims: store.getState().claimList
                })
            });
      }

    updateClaim(claim,index){
        this.setState({
            selectedclaim : claim,
            showUpdateClaim: true,
            selectedIndex: index
        });
    }

    generateTableHead() {
        let header = Object.keys(this.state.lstclaims[0])
        return header.map((key, index) => {
            return (
                    <th key={index}>{key}</th>
            )
        })
      }

    handleChange(number){
        let claimlist = this.state.lstclaims;
        claimlist[0].ClaimNumber = number;
        this.setState({
            lstclaims: claimlist
        });
    }

    handleCancel(){
        this.setState({
            showUpdateClaim: !this.state.showUpdateClaim
        });
    }

    handleSubmit(claimlist){
        let updatedClaimlist = this.state.lstclaims;
        updatedClaimlist[this.state.selectedIndex] = claimlist;
        this.setState({
            lstclaims: updatedClaimlist,
            showUpdateClaim: !this.state.showUpdateClaim
        });
    }
      
    generateTableBody() {
        return this.state.lstclaims.map((claim, index) => {
            const { EmployeeId, EmployeeName, ClaimNumber, ClaimType, ClaimProgram, StartDate, EndDate } = claim; //destructuring
            return (
                    <tr key={index}>
                        <td>{EmployeeId}</td>
                        <td>{EmployeeName}</td>
                        <td>{ClaimNumber}</td>
                        <td>{ClaimType}</td>
                        <td>{ClaimProgram}</td>
                        <td>{StartDate}</td>
                        <td>{EndDate}</td>
                        <td className="edit" onClick={()=>this.updateClaim(claim,index)}><i className="fas fa-edit"></i>Update</td>
                    </tr>
            )
         })
      }
    render(){
        let table = [
                <div id="table">
                    <table id="tblClaimSummary">
                        <thead>
                            <tr key={"tablehead"}>
                                {this.generateTableHead()}
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.generateTableBody()}
                        </tbody>
                    </table>
                </div>
        ];

        return (
            <div id="main" key="main">
                <Header/>
                <Menu/>
                {table}
                {this.state.showUpdateClaim ? <UpdateClaim claim={this.state.selectedclaim} showUpdateClaim={this.state.showUpdateClaim} claimsList={this.state.lstclaims} 
                    numberChange={this.handleChange} updatedClaim={this.handleSubmit} cancelledClaim={this.handleCancel} rowClicked={this.state.selectedIndex}/> : null}
                <Footer/>
            </div>
            );
    }
}

export default ClaimSummary