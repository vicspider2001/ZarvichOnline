import React, {Component} from 'react';
import './Reception.css';
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format'; 
import moment from 'moment';
import Header2 from '../Header2';
import FLogin from '../FLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import picture from '../Reception/deglenLogo.png';



const guestformUrl = "http://10.1.0.99:3333/checkin?guest=";
const guestUpdateUrl = "http://10.1.0.99:3333/guestupdate";
const userName = "http://10.1.0.99:3333/fofUserInfo";
const companyUrl= "http://10.1.0.99:3333/org";
const updateRoomStatus = "http://10.1.0.99:3333/rmstatus2";
const updateFirstNit = "http://10.1.0.99:3333/updateFirstNite";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";

class guestForm extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside GstContructor", props)

        this.state = {
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
            arrivalDate:'',
            departureDate:'',
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
            VAT:0,
            TourismLevy:0,
            ServiceChrg:0,
            NokLname:'',
            NokFname:'',
            NokMname:'',
            NokRelationship:'',
            NokPhone:'',
            POV:'',
            vehicleReg:'',
            roomStatus:'',
            transactionDate:'',
            calculatedstay:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            groupDatax:'',
            renameBtn:'Add to Group',

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:''

            
            
        }

    }

    renderCompany = (data) => {
        if(data){
            data.sort((a, b) => a.orgName - b.orgName);
            return data.map((item) => {
                return(
                    <option key={item.orgName} value={item.orgName}>
                        {item.orgName}
                        
                    </option>
                )
            })
        }
    }

   
   
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value

        })
    }

    handleChange2 = (event) => {
        if(this.state.renameBtn==='Add to Group'){
            this.setState({
                [event.target.name]:event.target.value,
                status:'Corporate',
                roomStatus:'blue',
                renameBtn:'Return to Individual'
                
            })
        }
        
        else{
            this.setState({
                group:'',
                status:"Individual",
                roomStatus:'blueviolet',
                renameBtn:'Add to Group'
                
            })
        }
        
    }





    async handleSubmit() {
        
        try {
            var rid = this.props.match.params.rmID;
            var FNID = this.state._id;

            var roomStatusUpdate = {

                status:`${this.state.status}`,
                roomtypeName:`${this.state.roomtypeName}`,
                fname: `${this.state.fname}`,
                lname: `${this.state.lname}`,
                roomStatus: `${this.state.roomStatus}`,
                refID:`${this.state._id}`,
               
            }

            var updateFirstNite = {
                
                group:`${this.state.group}`,
                roomtypeName:`${this.state.roomtypeName}`,
                dailyRate: `${this.state.dailyRate}`,
                arrivalDate:`${this.state.arrivalDate}`,
                departureDate:`${this.state.departureDate}`,
                fname:`${this.state.fname}`,
                lname:`${this.state.lname}`,
                VAT:parseFloat(`${this.state.useVAT}`),
                TourismLevy:parseFloat(`${this.state.useTourismLevy}`),
                roomNumbers:(`${this.state.roomNumbers}`),
                ServiceCharge:(`${this.state.ServiceCharge}`),
                tranDate:(`${this.state.transactionDate}`),
                description:'Daily Room Rate',
                searchKey:'GuestBill'
               
                
            }
            
            var checkindetails = {
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
                departureDate:`${this.state.departureDate}`,
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
                VAT:parseFloat(`${this.state.VAT}`),
                TourismLevy:parseFloat(`${this.state.TourismLevy}`),
                ServiceChrg:parseFloat(`${this.state.ServiceChrg}`),
                calculatedstay:`${this.state.calculatedstay}`
            }
            let result = await fetch(`${guestUpdateUrl}/${rid}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    checkindetails
                )
                
            });
            console.log('result>  ' + result)

            let FirstNite = await fetch(`${updateFirstNit}/${FNID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    updateFirstNite
                )
                
            });
            
            console.log('FirstNite>  ' + FirstNite)

            let RmStatus = await fetch(`${updateRoomStatus}/${rid}`, {
                method: 'put',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    roomStatusUpdate
                        
                )
                    
                    
            });
            console.log('RmStatus>  ' + RmStatus)
            alert("Guest Records Updated")
            this.props.history.push('/roomchart')
                    
        } catch(e) {
            console.log(e)
        }

    }

    render () {
        console.log (">>> Inside Gsdetails", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        return(
            <>
            <Header2/>
                <div className="container" key={this.state.roomNumbers}>
                    <div className="formdesign11">
                        <div className="NoPrint">
                        <div>
                            <img src={picture} className="alignImg2" style={{width:"100px", height:"70px"}} alt="companylogo"/>
                        </div>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                        </center>
                        </div>
                        <center><h4>Guests Registration Form</h4></center>
                        <form><br/>
                            <h5 className="mb-3 background11 formsize">Booking Info</h5>
                            <div className="row">
                                    
                                <div className="mb-3 col-4">
                                    <label className='form-label'>GuestID</label>
                                    <input type="number" className="form-control mb-3 formsize" name="_id" value={this.state._id} readOnly/>
                                            
                                    <label className='form-label valid'>Guest Status</label> 
                                    <input type="text" className="form-control mb-3 formsize" name="status" value={this.state.status} readOnly/>
                                    <select type ="button" className="form-select formsize mb-3 btn btn-primary" name="group" onChange={this.handleChange2}>
                                        <option selected value=''>{this.state.renameBtn}</option>
                                        {this.renderCompany(this.state.groupDatax)}
                                        
                                        
                                                                                    
                                    </select>

                                    <label className='form-label'>Organisations</label>
                                    <input type="text" className="form-control mb-3 formsize" name="group" value={this.state.group} readOnly/>
                                    
                                    <label className='form-label'>Room Number</label>
                                    <input type="text" className="form-control mb-3 formsize" name="roomNumbers" value={this.state.roomNumbers} readOnly/>
                                    <label className='form-label'>Room Type</label>
                                    <input type="text" className="form-control mb-3 formsize" name="roomtypeName" value={this.state.roomtypeName} readOnly/>
                                    <label className='form-label'>Room Rate</label>
                                    <p className="form-control mb-3 formsize"><NumberFormat value={this.state.roomRate} displayType={"text"} thousandSeparator={true} prefix={"N"}/>.00</p>
                                </div>
                                <div className="col-4">
                                    <label className='form-label'>Discount Type</label>
                                    <input type="text" className="form-control mb-3 formsize" name="discounType" value={this.state.discounType} readOnly/>

                                    <label className='form-label'>{this.state.discounType}</label>
                                    <input type="number" className="form-control mb-3 formsize" name="discountAmount" value={this.state.discountAmount} readOnly/>
                                            
                                    <label className='form-label'>Daily Rate</label>
                                    <p className="form-control mb-3 formsize"> <NumberFormat value={this.state.dailyRate} displayType={"text"} thousandSeparator={true} prefix={"N"}/>.00</p>

                                    <label className='form-label'>VAT</label>
                                    <p className="form-control mb-3 formsize"> <NumberFormat value={this.state.VAT} displayType={"text"} thousandSeparator={true} prefix={"N"}/></p>

                                    <label className='form-label'>Tourism Levy</label>
                                    <p className="form-control mb-3 formsize"> <NumberFormat value={this.state.TourismLevy} displayType={"text"} thousandSeparator={true} prefix={"N"}/></p>

                                    <label className='form-label'>Service Charge</label>
                                    <p className="form-control mb-3 formsize"> <NumberFormat value={this.state.ServiceChrg} displayType={"text"} thousandSeparator={true} prefix={"N"}/></p>

                                    <label className='form-label'>Hotel's Income</label>
                                    <p className="form-control mb-3 formsize"> <NumberFormat value={parseFloat(this.state.dailyRate) - parseFloat(this.state.VAT) - parseFloat(this.state.TourismLevy) - parseFloat(this.state.ServiceChrg)} displayType={"text"} thousandSeparator={true} prefix={"N"}/></p>

                                </div>
                                <div className="col-4">
                                    <label className='form-label'>Travelling From</label>
                                    <input type="text" className="form-control mb-3 formsize" name="comingFrom" value={this.state.comingFrom} readOnly/>
                                    <label className='form-label'>Next Destination</label>
                                    <input type="text" className="form-control mb-3 formsize" name="goingTo" value={this.state.goingTo} readOnly/>
                                    <label className='form-label'>Arrival Date</label>
                                    <input type="text" className="form-control mb-3 formsize" name="arrivalDate" value={this.state.arrivalDate} readOnly/>
                                    <label className='form-label'>Departure Date</label>
                                    <input type="text" className="form-control mb-3 formsize" name="departureDate" value={this.state.departureDate} readOnly/>
                                    <label className="form-check-label valid">Enable Dockets is set to - {this.state.postBillStatus}</label>
                                    
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="postBillStatus" value="No" id="flexRadioDefault1" onChange={this.handleChange}></input>
                                        <label className="form-check-label" for="flexRadioDefault1">No</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="postBillStatus" value="Yes" id="flexRadioDefault2" onChange={this.handleChange}></input>
                                        <label className="form-check-label" for="flexRadioDefault1">Yes</label>
                                    </div>
                                    
                                    
                                </div> 
                                <hr/>
                                    
                            </div>
                            <br/>
                            <h5 className="mb-3 background11 formsize2" >Personal Info</h5>
                            <div className="row">
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Title</label>
                                    <input type="text" className="form-control mb-3 formsize" name="title" value={this.state.title} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label valid'>Surname</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="lname" value={this.state.lname} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Firstname</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="fname" value={this.state.fname} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Middle Name</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="middlename" value={this.state.middlename} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Birth Day</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="dob" value={this.state.dob} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Birth Month</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="mob" value={this.state.mob} readOnly/>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="mb-3 col-2">
                                    <label className='form-label valid'>Phone</label>
                                    <input type="number" className="form-control mb-3 formsize21" name="phone" value={this.state.phone} readOnly/>
                                </div>
                                 <div className="mb-3 col-2">
                                    <label className='form-label'>Email</label>
                                    <input type="email" className="form-control mb-3 formsize21" name="email" value={this.state.email} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>ID</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="ID" value={this.state.ID} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Passport Num</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="passportNum" value={this.state.passportNum} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Gender</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="Gender" value={this.state.Gender} readOnly/>
                                            
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Nationality</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="Nationality" value={this.state.Nationality} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Address</label>
                                    <textarea row="4" className="form-control mb-3" name="Address" value={this.state.Address} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>occupation</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="occupation" value={this.state.occupation}readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Purpose of Visits</label>
                                    <textarea row="4" className="form-control mb-3 formsize21" name="POV" value={this.state.POV} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Vehicle Reg</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="vehicleReg" value={this.state.vehicleReg} readOnly/>
                                </div>
                                </div>
                                <hr/>
                                <h5 className="mb-3 background11 formsize4" >Next of Kin Details</h5>
                                <div className="row">
                                    <div className="mb-3 col-2">
                                    <label className='form-label'>Surname</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="NokLname" value={this.state.NokLname} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Firstname</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="NokFname" value={this.state.NokFname} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Middle Name</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="NokMname" value={this.state.NokMname} readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Relationship</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="NokRelationship" value={this.state.NokRelationship}readOnly/>
                                </div>
                                <div className="mb-3 col-2">
                                    <label className='form-label'>Phone</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="NokPhone" value={this.state.NokPhone} readOnly/>
                                </div>
                                   
                            </div>
                        </form>
                        <div>
                            <center>
                                <span>
                                    <button disabled={this.state.postBillStatus===''||this.state.fname===''} className="btn btn-primary printing" onClick={ () => this.handleSubmit () }>Save Changes</button>
                                    <Link to="/roomchart">
                                        <button className="btn btn-danger space printing">Cancel Changes</button>
                                    </Link>
                                </span>
                            </center>
                        </div>
                    </div>
                </div>
                       
            </>
        )
               
            
        
    }
    
    
    componentDidMount(){
        console.log(">>> Inside GsDidMount", this.state)

        var chkinID = this.props.match.params.rmID;
        var chkgstID = parseInt(chkinID)
        fetch(`${guestformUrl}${chkgstID}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item) =>{
                let checkindate = moment(`${item.arrivalDate}`).format('YYYY-DD-MMM')
                let checkoutdate = moment(`${item.departureDate}`).format('YYYY-DD-MMM')
               
                sessionStorage.setItem ('rmNum', item.roomNumbers);
                
                this.setState({
                    _id:item._id,
                    status:item.status,
                    group:item.group,
                    roomNumbers:item.roomNumbers,
                    roomRate:item.roomRate,
                    roomtypeName:item.roomtypeName,
                    dailyRate:item.dailyRate,
                    VAT:item.VAT,
                    TourismLevy:item.TourismLevy,
                    ServiceChrg:item.ServiceCharge,
                    discounType:item.discounType,
                    discountAmount:item.discountAmount,
                    comingFrom:item.comingFrom,
                    goingTo:item.goingTo,
                    arrivalDate:checkindate,
                    departureDate:checkoutdate,
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
                
                return 'ok'
            })
               
        })

        fetch(`${getHotelAddress}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    Hotelname:item.HotelName,
                    Hoteladdress:item.Address,
                    Hotelphone:item.Phone
                
                })
                return 'ok'
            })
            
        })

        

        fetch(`${companyUrl}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                groupDatax:data
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
export default guestForm;