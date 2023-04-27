import React, {Component} from 'react';
import './Reception.css';
import {Link} from 'react-router-dom';
import moment from 'moment';
import NumberFormat from 'react-number-format'; 
import FLogin from '../FLogin';
import 'bootstrap/dist/css/bootstrap.min.css';



const changeUrl = "http://10.1.0.99:3333/checkin?guest=";
const putchangeUrl = "http://10.1.0.99:3333/guestupdate2";
const groupputchangeUrl = "http://10.1.0.99:3333/groupguestupdate2";
const roomstatusUrl = "http://10.1.0.99:3333/rmstatus";
const roomupgradeUrl = "http://10.1.0.99:3333/rmstatus2";
const getrooms = "http://10.1.0.99:3333/roomstatus?Rstatus=green";
const getroomrates = "http://10.1.0.99:3333/rooms?rates=";
const getroomtypes = "http://10.1.0.99:3333/roomstatus?Rnumber=";
const globalRmUpdtUrl = "http://10.1.0.99:3333/rmstatus3";
const roomChangeReasonUrl = "http://10.1.0.99:3333/postRoomChangeReason";
const userName = "http://10.1.0.99:3333/fofUserInfo";


class RoomChange extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside RCContructor", props)

        this.state={
            _id:'',
            status:'',
            group:'',
            roomNumbers:'',
            roomRate:'',
            roomtypeName:'',
            dailyRate:'',
            discountAmount:0,
            discounType:'',
            comingFrom:'',
            goingTo:'',
            arrivalDate: '',
            departureDate: '',
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
            newroomNum:'',
            newroomtype:'',
            newdailyRate:'',
            displayrooms:'',
            displayroomrates:'',
            displayroomtypes:'',
            reason:'',
            transactionDate:'',
            calculatedstay:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            
            
           
        };
        this.handleChange3 = this.handleChange3.bind(this);
        
     
    }

    renderRooms = (data) => {
        if(data){
            return data.map((item, index) => {
                return(
                    <option key={index} value={item.roomNumbers}>
                        {item.roomNumbers}
                    </option>
                )
            })
        }
        
    }
    renderRoomTypes = (data) => {
        if(data){
            return data.map((item, index) => {
                if (this.state.roomNumbers === ''){
                    return(
                        <h5>
                            {'Select a Room Number'}
                        </h5>
                    )
                    
                }
                if (this.state.roomNumbers !==''){
                    return(
                        <option key={index} value={item.roomtypeName}>
                            {item.roomtypeName}
                        </option>
                    )
                    
                
                }
                return 'ok'
            })
            
                
        }
        
    }

    renderRoomRates = (data) => {
        if(data){
            return data.map((item, index) => {
                if (this.state.roomNumbers === ''){
                    return(
                        <h5>
                            {'Select a Room Number'}
                        </h5>
                    )
                }
                if (this.state.roomNumbers !==''){
                    return(
                        <option key={index} value={item.roomRate}>
                            {item.roomRate}
                        </option>
                    )
                    
                    
                }
                return 'ok'
                
                               
            })
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    handleChange4 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        sessionStorage.setItem ('drr', event.target.value)
      

        if (this.state.discountAmount===''){
            sessionStorage.setItem ('disc', 0)
            var drate3 = 0;
            drate3 = drate3 + parseInt(sessionStorage.getItem('drr')) - parseInt(sessionStorage.getItem('disc'))
            this.setState({dailyRate:drate3})
            
        }
        if (this.state.discounType==='Amount'){
            sessionStorage.setItem ('discAval', this.state.discountAmount)
            var drate4 = 0;
            drate4 = drate4 + parseInt(sessionStorage.getItem('drr')) - parseInt(sessionStorage.getItem('discAval'))
            this.setState({dailyRate:drate4})
        }

        if (this.state.discounType==='FlatRate'){
            sessionStorage.setItem ('discAval', this.state.discountAmount)
            var drate5 = 0;
            drate5 = drate5 + parseInt(sessionStorage.getItem('discAval')) 
            this.setState({dailyRate:drate5})
        }

        if (this.state.discounType==='Percentage'){
            sessionStorage.setItem ('discAval', this.state.discountAmount)
            var drate6 = 0;
            var per = parseInt(sessionStorage.getItem('discAval'))/100 * parseInt(sessionStorage.getItem('drr'))
            drate6 = drate6 + parseInt(sessionStorage.getItem('drr')) - per
            this.setState({dailyRate:drate6})
        }
        

    }

    handleChange3 = (event) => {
       this.setState({
            [event.target.name]:event.target.value

        })

        if (`${sessionStorage.getItem('rcNum')===null}`) {
            this.setState({
                displayroomtypes:'',
                displayroomrates:'',
                roomNumbers:'',
                roomtypeName:'',
                roomRate:''
                
                
            })
        }

        if (event.target.value !=='Select Room') {

            sessionStorage.setItem ('rcNum', event.target.value);
            
            fetch(`${getroomtypes}${sessionStorage.getItem('rcNum')}`, {method:'GET'})
            .then((respo) => respo.json())
            .then((data) => {
                this.setState({displayroomtypes:data})
            })
            fetch(`${getroomrates}${sessionStorage.getItem('rcNum')}`, {method:'GET'})
            .then((respd) => respd.json())
            .then((data) => {
                this.setState({displayroomrates:data})
            })
            this.setState({
                roomNumbers:event.target.value
            })
        }
       
        
        
    }

        
    async handleSubmit2() {
        
        try {
            var cid = sessionStorage.getItem('rcNum')
            var ind = sessionStorage.getItem('rcIndex')
            var nwrn = sessionStorage.getItem('nrn')

            var statusUpdate = {

                roomNumbers:`${this.state.roomNumbers}`,
                status:`${this.state.status}`,
                roomtypeName:`${this.state.roomtypeName}`,
                fname:`${this.state.fname}`,
                lname:`${this.state.lname}`,
                roomStatus:`${this.state.roomStatus}`,
                refID:`${this.state._id}`,
                BillStatus:0
                
            }

            var roomChangeReason = {
                OldRoomNum:`${this.state.newroomNum}`,
                NewRoomNum:`${this.state.roomNumbers}`,
                Reason:`${this.state.reason}`,
                date: new Date()

            }

            var globalRmChrgUpdate = {

                refID: `${this.state._id}`,
                arrivalDate:`${this.state.arrivalDate}`,
                departureDate:`${this.state.departureDate}`,
                roomNumbers:`${this.state.roomNumbers}`,
                dailyRate: `${this.state.dailyRate}`,
                description: 'Daily Room Rate'
            }

            var oldStatusUpdate = {

                roomNumbers:`${this.state.newroomNum}`,
                status:'',
                roomtypeName:`${this.state.newroomtype}`,
                fname: '',
                lname: '',
                roomStatus: 'black',
                refID:'',
                BillStatus:0
            }

            var roomchangedetails = {
                roomNumbers:`${this.state.roomNumbers}`,
                refID:`${this.state._id}`,
                status:`${this.state.status}`,
                group:`${this.state.group}`,
                roomRate:`${this.state.roomRate}`,
                roomtypeName:`${this.state.roomtypeName}`,
                dailyRate: `${this.state.dailyRate}`,
                discountAmount:`${this.state.discountAmount}`,
                discounType:`${this.state.discounType}`,
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
                transactionDate:`${this.state.transactionDate}`,
                calculatedstay:`${this.state.calculatedstay}`
            }
            let result = await fetch(`${putchangeUrl}/${ind}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    roomchangedetails
                )
                
            });
            
            console.log('result>  ' + result)
            var orgName = this.state.group;
            if(orgName!==''){
                let resultc = await fetch(`${groupputchangeUrl}/${ind}`, {
                    method: 'put',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        roomchangedetails
                    )
                    
                });
                
                console.log('resultc>  ' + resultc)
            }

            let result3 = await fetch(`${roomupgradeUrl}/${cid}`, {
                method:'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                 
                },
                body: JSON.stringify(
                    statusUpdate
                )
        

            });

            console.log('result3> '+ result3)
            

            let result4 = await fetch(`${roomstatusUrl}/${nwrn}`, {
                method:'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                 
                },
                body: JSON.stringify(
                    oldStatusUpdate
                )
        

            });

            console.log('result4> '+ result4)


            let result5 = await fetch(`${globalRmUpdtUrl}/${ind}`, {
                method:'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                 
                },
                body: JSON.stringify(
                    globalRmChrgUpdate
                )
        

            });

            console.log('result5> '+ result5)

            let result6 = await fetch(`${roomChangeReasonUrl}`, {
                method:'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                 
                },
                body: JSON.stringify(
                    roomChangeReason
                )
        
            });

            console.log('result6> '+ result6)
            alert("Room Change Successful")
            this.props.history.push('/roomchart')
                    
        } catch(e) {
            console.log(e)
        }

    }

    render(){
        console.log (">>> Inside RCdetails", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        
            return(
            <>
                
                <div className="background190">
                    
                    <div className="formdesign110">
                        
                        
                        <div className="row">
                            <div className="col-3">
                                <label className='form-label valid'>Names</label>
                                <label className="form-control mb-3 formsize2">{this.state.lname} {this.state.fname} </label>
                            </div>
                            <div className="col-3">
                               <label className='form-label valid'>Room Status</label>
                                <label className="form-control mb-3 formsize6">{this.state.newroomNum} | {this.state.newroomtype} </label>
                            </div>
                            <div className="col-3">
                               <label className='form-label valid'>Daily Room Rate</label>
                               <p className="form-control mb-3 formsize2"> <NumberFormat value={this.state.newdailyRate} displayType={"text"} thousandSeparator={true} prefix={"N"}/>.00</p>
                            </div>
                            <div className="col-3">
                               <label className='form-label valid'>Discount ({this.state.discounType})</label>
                               <input type="number" className="form-control mb-3 formsize2" name="discountAmount" value={this.state.discountAmount} onChange={this.handleChange}/>
                               
                            </div>
                            
                        </div>
                        <hr/>
                        
                        <form>
                        
                            <center>
                                <h5 className ="mb-3"> Room Change</h5>
                                <label className='form-label'>Vacant Rooms</label>
                                <select className="form-select formsize mb-3" name="roomNumbers" onChange={this.handleChange3.bind(this)}>
                                    <option selected value=''>Select Room</option>
                                    {this.renderRooms(this.state.displayrooms)}
                                                                        
                                </select>

                                <label className='form-label'>Room Types</label>
                                <select className="form-select formsize mb-3" name="roomtypeName" onChange={this.handleChange}>
                                    <option selected value=''>Select Room Type</option>
                                    {this.renderRoomTypes(this.state.displayroomtypes)}
                                                                        
                                </select>

                                <label className='form-label'>Room Rate</label>
                                <select className="form-select formsize mb-3" name="roomRate" onChange={this.handleChange4}>
                                    <option selected value=''>Select Room Rate</option>
                                    {this.renderRoomRates(this.state.displayroomrates)}
                                    
                                                                        
                                </select>
                                <label className='form-label'>Reason for Room Change</label>
                                <textarea row="4" className="form-control formsize mb-3" name="reason" value={this.state.reason} onChange={this.handleChange}/>

                                <input type="hidden" name="departureDate" value={this.state.departureDate}/>
                                <input type="hidden" name="arrivalDate" value={this.state.arrivalDate}/>
                                <input type="hidden" name="group" value={this.state.group}/>
                                <input type="hidden" name="status" value={this.state.status}/>
                                <input type="hidden" name="_id" value={this.state._id}/>
                                <input type="hidden" name="discounType" value={this.state.discounType}/>
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


                                <hr/>
                                
                                <label className='form-label valid'>Daily Room Rate</label>
                                
                                <p className="form-control mb-3 formsize2"> <NumberFormat value={this.state.dailyRate} displayType={"text"} thousandSeparator={true} prefix={"N"}/>.00</p>
                                                            
                                <hr/>
                            </center>
                        </form>
                        <div>
                            <center>
                                <span>
                                    <button disabled={this.state.dailyRate===''||this.state.reason===''} className="btn btn-primary" onClick={ () => this.handleSubmit2 () } >Change Room</button>
                                    <Link to="/roomchart">
                                        <button className="btn btn-danger space">Cancel Changes</button>
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

        var ExID = this.props.match.params.rcID;
        var NxID = parseInt(ExID)
       fetch(`${changeUrl}${NxID}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
           
            data.map((item) => {
                let checkindate = moment(`${item.arrivalDate}`).format('YYYY-DD-MMM')
                let checkoutdate = moment(`${item.departureDate}`).format('YYYY-DD-MMM')
               

                this.setState({
                    _id:item._id,
                    status:item.status,
                    group:item.group,
                    newdailyRate:item.dailyRate,
                    departureDate:checkoutdate,
                    discountAmount:item.discountAmount,
                    discounType:item.discounType,
                    comingFrom:item.comingFrom,
                    goingTo:item.goingTo,
                    arrivalDate:checkindate,
                    newroomNum:item.roomNumbers,
                    newroomtype:item.roomtypeName,
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
                
                sessionStorage.setItem ('rcIndex', item._id)
                sessionStorage.setItem ('nrn', this.state.newroomNum)
               
                return 'ok'
                

            })
        })
        fetch(`${getrooms}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                displayrooms:data
                
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
export default RoomChange;