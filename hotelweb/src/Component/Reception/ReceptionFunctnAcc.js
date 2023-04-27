import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import './Reception.css';
import moment from 'moment';
import FLogin from '../FLogin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const getOrgUrl = "http://10.1.0.99:3333/org?grpName=";
const getGroupDataUrl = "http://10.1.0.99:3333/groupCheckin";
const userName = "http://10.1.0.99:3333/fofUserInfo";



class ReceptionFunctnAcc extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside GstConstructor",props)

        this.state = {
            groupData:'',
            org:'',
            orgName:'',
            startDate:'',
            endDate:'',
            departureDate:'',
            totalAcc:0,
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

    cleanup(){
        this.setState({
            groupData:'',
            departureDate:'',
            totalAcc:0
           
        })
    }

    findGroup(){
        var start = moment(this.state.startDate).format('MMM DD YYYY');
        var end = moment(this.state.endDate).format('MMM DD YYYY');
        var searchUrl=`${getGroupDataUrl}?orgName=${this.state.orgName}&&startDate=${start}&&endDate=${end}`
               

        fetch(`${searchUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({groupData:data});
            data.map((item) => {
                var allstay = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.calculatedstay)
                }, 0);
                this.setState({totalAcc:allstay})
                return 'ok'
            })
            
        });

       
    }

    renderRooms=(data)=>{
        if(data){
            data.sort((a, b) => a.arrivalDate - b.arrivalDate);
            return data.map((item)=>{
                var thisDate = new Date();
                var endDate = moment(thisDate);
               
                var startDt = moment(item.arrivalDate);
               
                var diff =endDate.diff(startDt);
                var datecomp = Math.ceil(diff/(1000*3600*24));
               

                var arrival = moment(item.arrivalDate).format('MMM DD YYYY');

               
                    
                return(
                    <>
                        <tr key= {item.refID}>
                            
                            <td className="table-light table-striped adjust2">{item.fname} {item.lname}</td>
                            <td className="table-light table-striped adjust2">{arrival}</td>
                            <td className="table-light table-striped adjust2">{item.roomNumbers}</td>
                            <td className="table-light table-striped adjust2">{item.roomtypeName}</td>
                            <td className="table-light table-striped adjust2">{item.discounType}</td>
                            <td className="table-light table-striped adjust2"><NumberFormat value={item.discountAmount}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2"><NumberFormat value={item.dailyRate}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2">{datecomp} Nights</td>
                            <td className="table-light table-striped adjust2"><NumberFormat value={datecomp*item.dailyRate}thousandSeparator={true}displayType={"text"}/></td>
                    
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
                    <h5>{this.state.orgName} Group Bill</h5>
                    <p className="textSize">From {moment(this.state.startDate).format('MMM DD YYYY')} to { moment(this.state.endDate).format('MMM DD YYYY')}</p>

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
                            <button className="btn btn-primary printing set2" onClick={ () => {this.cleanup();this.findGroup()}}>Find</button>
                        </div>
                    </div>
                    <hr style={{color:'deeppink'}}/>
                    <br/><br/>
               
                </center>
                <h6>Accommodation Details</h6>
                <hr/>
                                               
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Names</th>
                            <th className="adjust5">Arrival Date</th>
                            <th className="adjust5">Room Num</th>
                            <th className="adjust5">Room Type</th>
                            <th className="adjust5">Discount Type</th>
                            <th className="adjust5">Discount Amount</th>
                            <th className="adjust5">Daily Rate(NGN)</th>
                            <th className="adjust5">Stay</th>
                            <th className="adjust5">Amount(NGN)</th>
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderRooms(this.state.groupData)}
                        <h6>Accommodation Total: <NumberFormat value={this.state.totalAcc}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </tbody>
                    
                </table>
                
                <hr/>
                <center>
                    <div className="row">
                       
                        
                    </div>    
                </center>

                <center>
                    <button className="btn btn-danger printing" onClick={ () => this.props.history.push('/ReceptionMenu')}>Close</button>
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

export default ReceptionFunctnAcc;