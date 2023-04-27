import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import '../Reception.css';
import moment from 'moment';
import FLogin from '../../FLogin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const getOrgUrl = "http://10.1.0.99:3333/org?grpName=";
const getgroupDocketsUrl = "http://10.1.0.99:3333/posting";
const getfunctionfoodanddrinkUrl = "http://10.1.0.99:3333/getfoodanddrinks";
const userName = "http://10.1.0.99:3333/fofUserInfo";



class FandBReport extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside GstConstructor",props)

        this.state = {
            groupBillData:'',
            functionFandB:'',
            totalfuncttionFandB:'',
            org:'',
            orgName:'',
            startDate:'',
            endDate:'',
            departureDate:'',
            totalDockets:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''
            
        };
        this.starthandleChange = this.starthandleChange.bind(this);
        this.endhandleChange = this.endhandleChange.bind(this);
        
    }
    renderstartDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.starthandleChange}
                    maxDate={(new Date())}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize printing alignText112"
                    placeholderText="Search Start Date"
                />
            </div>
        )
    }

    starthandleChange(date) {
        this.setState({
            startDate: date
        });
    }


    renderendDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.endDate}
                    onChange={this.endhandleChange}
                    maxDate={(new Date())}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize printing alignText112"
                    placeholderText="Search End Date"
                />
            </div>
        )
    }

    endhandleChange(date) {
        this.setState({
            endDate: date
        });
    }



    handleChange=(event)=>{
        
        this.setState({
            [event.target.name]:event.target.value
        })

    }


    renderAllOrgs(data){
        if(data) {
           data.sort((a, b) => a.orgName - b.orgName);
            return data.map((item) => {
                return(
                    <>
                        <option key={item._id} value={item.orgName}>
                            {item.orgName}
                        </option>
                    </>
                )
                
                
            })
        }
    }

    findGroup(){
        var start = moment(this.state.startDate).format('MMM DD YYYY');
        var end = moment(this.state.endDate).format('MMM DD YYYY');
        var docketSearchUrl = `${getgroupDocketsUrl}?orgName=${this.state.orgName}&&startDate=${start}&&endDate=${end}`
        var FandBsearchUrl=`${getfunctionfoodanddrinkUrl}?orgName=${this.state.orgName}&&startDate=${start}&&endDate=${end}`
        
        fetch(`${docketSearchUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({groupBillData:data});
            var allDockets = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.cost)
            }, 0);
            this.setState({totalDockets:allDockets})
        });

        fetch(`${FandBsearchUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({functionFandB:data});
            var allFandB = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.amount)
            }, 0);
            this.setState({totalfuncttionFandB:allFandB})
        });
    }

    renderDockets=(data)=>{
        if(data){
            return data.map((item)=>{
                
                return(
                    <>
                            <tr key= {item.refID}>
                            
                            <td className="table-light table-striped adjust2">{item.date}</td>
                            <td className="table-light table-striped adjust2">{item.roomNumbers}</td>
                            <td className="table-light table-striped adjust2">{item.docketNum}</td>
                            <td className="table-light table-striped adjust2">{item.description}</td>
                            <td className="table-light table-striped adjust2"><NumberFormat value={item.cost}thousandSeparator={true}displayType={"text"}/></td>
                            
                        </tr>
                    </>
                )

            })
            
        }
           
    }

    renderFandB=(data)=>{
        if(data){
            return data.map((item)=>{
                
                return(
                    <>
                            <tr key= {item.resID}>
                            
                            <td className="table-light table-striped adjust2">{item.transactionDate}</td>
                            <td className="table-light table-striped adjust2">{item.resID}</td>
                            <td className="table-light table-striped adjust2">{item.description}</td>
                            <td className="table-light table-striped adjust2">{item.qty}</td>
                            <td className="table-light table-striped adjust2"><NumberFormat value={item.amount}thousandSeparator={true}displayType={"text"}/></td>
                            
                        </tr>
                    </>
                )

            })
            
        }
           
    }

    render() {
        console.log(">>> Inside Gstrender", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        return(
            
            <div className ="container">
                <div>
                    <img src= "zarvichlogo.png" className="alignImg2" style={{width:"100px", height:"70px"}} alt="companylogo"/>
                </div>
                <div>
                    <center>
                        <h6>Zarvich Hotels Ltd.</h6>
                        <p className="textSize">No ABC Road, Wuse II, Abuja, Nigeria</p>
                        <p className="textSize">+234 803 590 5421, info@zarvichosh.com</p>
                       
                    </center>
                </div>
                <center>
                    <h5>{this.state.orgName} Function F&B Report</h5><br/>
                    <hr style={{color:'deeppink'}}/>
                    <div className="row mt-4">
                        <div className="col-3">
                            <select type ="button" className="form-select mb-2 btn btn-primary mt-3 col-2 set1 printing" name="orgName" onChange={this.handleChange}>
                                <option selected value=''>Select Org</option>
                                {this.renderAllOrgs(this.state.org)}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                {this.renderstartDate(this.state.startDate)}
                            </label>
                        </div>
                        <div className="col-3">
                            <label>
                                {this.renderendDate(this.state.endDate)}
                            </label>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary printing set2" onClick={ () => this.findGroup()}>Find</button>
                        </div>
                    </div>
                    <hr style={{color:'deeppink'}}/>
                    <br/><br/>
               
                </center>
               
                <h6>Room Service Details</h6>
                <hr/>
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Date</th>
                            <th className="adjust5">Room Num</th>
                            <th className="adjust5">Docket Num</th>
                            <th className="adjust5">Description</th>
                            <th className="adjust5">Amount (NGN)</th>
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderDockets(this.state.groupBillData)}
                        <h6>Room Service Total: <NumberFormat value={this.state.totalDockets}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </tbody>
                </table>  
                <h6>Banquet Details</h6>
                <hr/>
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Date</th>
                            <th className="adjust5">ID</th>
                            <th className="adjust5">Description</th>
                            <th className="adjust5">Qty</th>
                            <th className="adjust5">Amount (NGN)</th>
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderFandB(this.state.functionFandB)}
                        <h6>Banquet Details Total: <NumberFormat value={this.state.totalfuncttionFandB}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </tbody>
                </table>  
                
                <hr/>
                <center>
                    <div className="row">
                        
                        <div className="col-4">
                            <h6>Room Service:</h6><p><NumberFormat value={this.state.totalDockets}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>    
                        </div>
                        <div className="col-4">
                            <h6>Banquet Bill:</h6><p><NumberFormat value={this.state.totalfuncttionFandB}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>    
                        </div>
                        <div className="col-4">
                                <h6>Total:</h6><h6><NumberFormat value={this.state.totalDockets+this.state.totalfuncttionFandB}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>   
                        </div>
                        <hr/>
                        
                    </div>    
                </center>

                <center>
                    <button className="btn btn-danger printing" onClick={ () => this.props.history.push('/FandBMenu')}>Close</button>
                    <button className="btn btn-primary movebtn printing" onClick={ () => window.print() }>Print</button>
                        
                </center>     

            </div>
                
        )
    }

    componentDidMount() {
        console.log(">>> Inside GstDidMount", this.state)

        fetch(`${getOrgUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
                this.setState({
                org:data
            })
        })

        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })

        this.myTimer = setTimeout(() => {

            var loginInfo = this.state.loginDetails;
            var nameDetails = this.state.name;
            if(loginInfo.some(item => item.name === nameDetails)){
                this.setState({Blogin:true})
            }
            else{
                this.setState({Blogin:false})
            }
        },1000);
    }
    
    
    
}

export default FandBReport;