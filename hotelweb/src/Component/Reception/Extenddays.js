import React, {Component} from 'react';
import './Reception.css';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';
import {Link} from 'react-router-dom';
import moment from 'moment';
import NumberFormat from 'react-number-format'; 
import FLogin from '../FLogin';
import 'bootstrap/dist/css/bootstrap.min.css';





const extendUrl = "http://10.1.0.99:3333/checkin?guest=";
const extenddateUrl = "http://10.1.0.99:3333/guestupdate";
const groupextenddateUrl = "http://10.1.0.99:3333/groupguestupdate";
const globalRmUpdtUrl2 = "http://10.1.0.99:3333/rmstatus3";
const userName = "http://10.1.0.99:3333/fofUserInfo";


class Extenddays extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside ExtContructor", props)

        this.state={
            _id:'',
            status:'',
            group:'',
            roomNumbers:'',
            roomRate:'',
            roomtypeName:'',
            dailyRate:'',
            discounType:'',
            discountAmount:'',
            comingFrom:'',
            goingTo:'',
            arrivalDate: '',
            departureDate: new Date(),
            stay:'',
            postBillStatus:'',
            title:'',
            fname:'',
            lname:'',
            middlename:'',
            dob:'',
            mob:'',
            phone:'',
            email:'',
            ID:'',
            passportNum:'',
            Gender:'',
            Nationality:'',
            Address:'',
            occupation:'',
            NokLname:'',
            NokFname:'',
            NokMname:'',
            NokRelationship:'',
            NokPhone:'',
            POV:'',
            vehicleReg:'',
            roomStatus:'',
            newDepartureDate: new Date(),
            transactionDate:'',
            calculatedstay:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''
        };
        this.checkouthandleChange = this.checkouthandleChange.bind(this);
     
    }

    checkouthandleChange(Date) {
        this.setState({
            departureDate: Date
        });
        this.myTimer = setTimeout(() => {
            var thisDate = this.state.departureDate;
            var endDate = moment(thisDate);
            var startDt = moment(this.state.arrivalDate);
            var diff =endDate.diff(startDt);
            var datecomp = Math.ceil(diff/(1000*3600*24)-1);
            this.setState({stay:datecomp})
        },1000)
        this.myTimer = setTimeout(() => {
            var stay = this.state.stay
            var dailyrate = this.state.dailyRate;
            var calc = 0;
            var calcstay = calc + (stay*dailyrate)

            this.setState({calculatedstay:calcstay});
        },1000)
    }
    
    
    rendercheckOutDate() {
        return (
            <div >
                
                <DatePicker
                    selected={this.state.departureDate}
                    onChange={this.checkouthandleChange}
                    minDate={addDays(this.state.departureDate,1)}
                    maxDate={addDays(new Date(),31)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                />
            </div>
        )
    }


    async handleSubmit() {
        
        try {
            var eid = this.props.match.params.stID;
            var extID = sessionStorage.getItem('extStayID')
            var depDate = moment(this.state.departureDate).format('YYYY-DD-MMM')
            
            var globalRmChrgUpdate2 = {

                refID: `${this.state._id}`,
                arrivalDate:`${this.state.arrivalDate}`,
                departureDate:`${this.state.departureDate}`,
                roomNumbers:`${this.state.roomNumbers}`,
                dailyRate: `${this.state.dailyRate}`,
                description: 'Daily Room Rate'
            }
           
            var extendstaydetails = {
                status:`${this.state.status}`,
                refID:`${this.state._id}`,
                group:`${this.state.group}`,
                roomRate:`${this.state.roomRate}`,
                roomtypeName:`${this.state.roomtypeName}`,
                dailyRate: `${this.state.dailyRate}`,
                discounType:`${this.state.discounType}`,
                discountAmount:`${this.state.discountAmount}`,
                comingFrom:`${this.state.comingFrom}`,
                goingTo:`${this.state.goingTo}`,
                arrivalDate:`${this.state.arrivalDate}`,
                departureDate:depDate,
                stay:`${this.state.stay}`,
                postBillStatus:`${this.state.postBillStatus}`,
                title:`${this.state.title}`,
                fname:`${this.state.fname}`,
                lname:`${this.state.lname}`,
                middlename:`${this.state.middlename}`,
                dob: `${this.state.dob}`,
                mob:`${this.state.mob}`,
                phone:`${this.state.phone}`,
                email:`${this.state.email}`,
                ID:`${this.state.ID}`,
                passportNum:`${this.state.passportNum}`,
                Gender:`${this.state.Gender}`,
                Nationality:`${this.state.Nationality}`,
                Address:`${this.state.Address}`,
                occupation:`${this.state.occupation}`,
                NokLname:`${this.state.NokLname}`,
                NokFname:`${this.state.NokFname}`,
                NokMname:`${this.state.NokMname}`,
                NokRelationship:`${this.state.NokRelationship}`,
                NokPhone:`${this.state.NokPhone}`,
                POV:`${this.state.POV}`,
                vehicleReg:`${this.state.vehicleReg}`,
                roomStatus:`${this.state.roomStatus}`,
                transactionDate:`${this.state.transactionDate}`,
                calculatedstay:`${this.state.calculatedstay}`
            }
            let result = await fetch(`${extenddateUrl}/${eid}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    extendstaydetails
                )
                
            });
            
            console.log('result>  ' + result)
            
            var orgName = this.state.group;
            if(orgName!==''){
                let resultd = await fetch(`${groupextenddateUrl}/${eid}`, {
                    method: 'put',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        extendstaydetails
                    )
                    
                });
                
                console.log('resultd>  ' + resultd)
            }
            
            let result2 = await fetch(`${globalRmUpdtUrl2}/${extID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    globalRmChrgUpdate2
                )
                
            });
            
            console.log('result2>  ' + result2)
            alert("Guest Records Updated")
            this.props.history.push('/roomchart')
                    
        } catch(e) {
            console.log(e)
        }

    }

    render(){
        console.log (">>> Inside Exdetails", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        return(
            <>
            
                <div className="background120">
                    
                    <div className="formdesign101">
                        
                        <div className="row">
                            <div className="col-4">
                                <label className='form-label valid'>Names</label>
                                <label className="form-control mb-3 formsize2">{this.state.lname} {this.state.fname} </label>
                            </div>
                            <div className="col-4">
                               <label className='form-label valid'>Room No.</label>
                                <label className="form-control mb-3 formsize2">{this.state.roomNumbers} </label>
                            </div>
                            <div className="col-4">
                               <label className='form-label valid'>Daily Room Rate</label>
                               <p className="form-control mb-3 formsize2"> <NumberFormat value={this.state.dailyRate} displayType={"text"} thousandSeparator={true} prefix={"N"}/>.00</p>
                            </div>
                            
                        </div>
                        <hr/>
                        
                        <form>
                        
                            <center>
                                <h5 className ="mb-3"> Existing Dates</h5>
                                <label className='form-label'>Arrival Date</label>
                                <input type="text" className="form-control mb-3 formsize" name="arrivalDate" value={this.state.arrivalDate} readOnly/>
                                <label className='form-label'>Departure Date</label>
                                <input type="text" className="form-control mb-3 formsize" name="departureDate" value={this.state.newDepartureDate} readOnly/>
                                <input type="hidden" name="group" value={this.state.group}/>
                                <input type="hidden" name="roomRate" value={this.state.roomRate}/>
                                <input type="hidden" name="status" value={this.state.status}/>
                                <input type="hidden" name="_id" value={this.state._id}/>
                                <input type="hidden" name="roomtypeName" value={this.state.roomtypeName}/>
                                <input type="hidden" name="dailyRate" value={this.state.dailyRate}/>
                                <input type="hidden" name="discountType" value={this.state.discounType}/>
                                <input type="hidden" name="discountAmount" value={this.state.discountAmount}/>
                                <input type="hidden" name="comingFrom" value={this.state.comingFrom}/>
                                <input type="hidden" name="goingTo" value={this.state.goingTo}/>
                                <input type="hidden" name="stay" value={this.state.stay}/>
                                <input type="hidden" name="title" value={this.state.title}/>
                                <input type="hidden" name="middlename" value={this.state.middlename}/>
                                <input type="hidden" name="dob" value={this.state.dob}/>
                                <input type="hidden" name="mob" value={this.state.mob}/>
                                <input type="hidden" name="phone" value={this.state.phone}/>
                                <input type="hidden" name="email" value={this.state.email}/>
                                <input type="hidden" name="ID" value={this.state.ID}/>
                                <input type="hidden" name="passportNum" value={this.state.passportNum}/>
                                <input type="hidden" name="Gender" value={this.state.Gender}/>
                                <input type="hidden" name="Nationality" value={this.state.Nationality}/>
                                <input type="hidden" name="Address" value={this.state.Address}/>
                                <input type="hidden" name="occupation" value={this.state.occupation}/>
                                <input type="hidden" name="NokLname" value={this.state.NokLname}/>
                                <input type="hidden" name="NokFname" value={this.state.NokFname}/>
                                <input type="hidden" name="NokMname" value={this.state.NokMname}/>
                                <input type="hidden" name="NokRelationship" value={this.state.NokRelationship}/>
                                <input type="hidden" name="NokPhone" value={this.state.NokPhone}/>
                                <input type="hidden" name="POV" value={this.state.POV}/>
                                <input type="hidden" name="vehicleReg" value={this.state.vehicleReg}/>
                                <input type="hidden" name="roomStatus" value={this.state.roomStatus}/>


                                <br/><hr/>
                                <h5 className ="mb-3"> Change Departure Date</h5>

                                <label className="formsize">{this.rendercheckOutDate(this.state.departureDate)}</label>
                                <br/><br/><hr/>
                            </center>
                        </form>
                        <div>
                            <center>
                                <span>
                                    <button className="btn btn-primary" onClick={ () => this.handleSubmit () } >Extend Stay</button>
                                    <Link to="/roomchart">
                                        <button className="btn btn-danger space">Cancel</button>
                                    </Link>
                                </span>
                            </center>
                        </div>
                        
                    </div>
                    <div>
                    
                                    
                </div> 
                    
                   
                </div>
                
            </>
        )
    }

    componentDidMount(){
        console.log(">>> Inside ExDidMount", this.state)

        var ExID = this.props.match.params.stID;
        var NxID = parseInt(ExID)
       fetch(`${extendUrl}${NxID}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item) => {
                let checkindate = moment(`${item.arrivalDate}`).format('YYYY-DD-MMM')
                let checkoutdate = moment(`${item.departureDate}`).format('YYYY-DD-MMM')
               

                this.setState({
                    _id:item._id,
                    status:item.status,
                    group:item.group,
                    roomNumbers:item.roomNumbers,
                    roomRate:item.roomRate,
                    roomtypeName:item.roomtypeName,
                    dailyRate:item.dailyRate,
                    discounType:item.discounType,
                    discountAmount:item.discountAmount,
                    comingFrom:item.comingFrom,
                    goingTo:item.goingTo,
                    arrivalDate:checkindate,
                    newDepartureDate:checkoutdate,
                    stay:item.stay,
                    postBillStatus:item.postBillStatus,
                    title:item.title,
                    fname:item.fname,
                    lname:item.lname,
                    middlename:item.middlename,
                    dob:item.dob,
                    mob:item.mob,
                    phone:item.phone,
                    email:item.email,
                    ID:item.ID,
                    passportNum:item.passportNum,
                    Gender:item.Gender,
                    Nationality:item.Nationality,
                    Address:item.Address,
                    occupation:item.occupation,
                    NokLname:item.NokLname,
                    NokFname:item.NokFname,
                    NokMname:item.NokMname,
                    NokRelationship:item.NokRelationship,
                    NokPhone:item.NokPhone,
                    POV:item.POV,
                    vehicleReg:item.vehicleReg,
                    roomStatus:item.roomStatus,
                    transactionDate:item.transactionDate,
                    calculatedstay:item.calculatedstay
                })
                sessionStorage.setItem('extStayID', this.state._id)
                return 'ok'
               
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
export default Extenddays;