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
import {connect} from 'react-redux';

class ClaimSummary extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            lstclaims : [],
            selectedclaim : [],
            showUpdateClaim: false,
            selectedIndex: 0
        }
    }

    componentDidMount() {
        // axios.get(`http://localhost:7001/claims`)
        axios.get('http://localhost:4000/getClaims')
            .then(res => {
                Logger.of('App.ClaimSummary.componentDidlMount').info('List of claims retreived', res.data);
                const lstclaims = res.data;
                store.dispatch({
                    type: 'ClaimList',
                    payload: lstclaims
                });
            })
            .catch(error=>{
                Logger.of('App.ClaimSummary.componentDidMount').error('Error retreiving claim list',error);
            })
            store.subscribe(()=>{
                this.setState({
                    lstclaims: this.props.claimList
                })
            });
      }

    // componentWillReceiveProps(nextprops){
    //     console.log(nextprops);
    //     console.log(this.props);
    //     if(nextprops != this.props){
    //         this.setState({
    //             lstclaims: this.props.claimList
    //         })
    //     }
    // }

    updateClaim(claim,index){
        this.setState({
            selectedclaim : claim,
            showUpdateClaim: true,
            selectedIndex: index
        });
    }

    generateTableHead() {
        let header = Object.keys(this.props.claimList[0])
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
        return this.props.claimList.map((claim, index) => {
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
                                {this.props.claimList.length > 0 && this.generateTableHead()}
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.claimList.length > 0 && this.generateTableBody()}
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

const MapStateToProps = (state) => {
    return {
        claimList: state.claimList,
    };
};

export default connect(MapStateToProps)(ClaimSummary);

// export default ClaimSummary