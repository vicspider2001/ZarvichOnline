import React, { Component } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import { locales } from 'moment';
import addDays from 'date-fns/addDays';
import './Reception.css';
import {Link} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import FLogin from '../FLogin';
import {Modal} from 'react-responsive-modal';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import 'bootstrap/dist/css/bootstrap.min.css';


const localizer = dateFnsLocalizer({
   format,
   parse,
   startOfWeek,
   getDay,
   locales,
})
const PostReservation = "http://10.1.0.99:3333/reserveNow";
const GetReservation = "http://10.1.0.99:3333/reservation";
const RoomUrl = "http://10.1.0.99:3333/getrmstatus";
const OccupiedRoomUrl = "http://10.1.0.99:3333/checkin?guest=";
const userName = "http://10.1.0.99:3333/fofUserInfo";
const getPaymentMethods = "http://10.1.0.99:3333/paymentMethods";
const postOtherSalesUrl = "http://10.1.0.99:3333/otherSales";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";
const getWorkDate = "http://10.1.0.99:3333/getActive";

class Reservation extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside RsvCobtructor", props)

        console.log(">>> inside ReservContructor", props)
        this.state = {
            events: [],
            _id:Math.floor(Math.random()*100000000),
            fname:'',
            lname:'',
            allDay: '',
            start: '',
            end: '',
            room: '',
            title:'',
            phone:'',
            rsvAmount:'',
            displayAllRoomNums:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            displayOccupiedRoomNums:'',
            othersedit:false,
            printBTN:'Print',
            displayPaymentMethods:'',
            paymentMethod:'',
            description1:'Room Reservation',
            memo:'',
            email:'None',
            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:'',
            transactionDate:''
            
            
            
        };
        this.starthandleChange = this.starthandleChange.bind(this);
        this.endhandleChange = this.endhandleChange.bind(this);
    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    onOpenOthrsModal(){
        this.setState({
            othersedit: true

        })
        
        
    }

    onCloseOthrspModal(){
        this.setState({
            othersedit: false
        })
        
    }
    
    sendtoprinterOthrs(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({othersedit: false})      
            this.setState({printBTN:'Print'})

            this.handleResvSubmit();
            this.handleSubmit()
            
        }
        
       
    }

    handlePayMethData=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })

        if(this.state.rsvAmount!==null){
            fetch(`${getPaymentMethods}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayPaymentMethods:data
                })
            })
        }

       

    }

    renderPayMeth(data){
        if(data) {
            return data.map((item) => {
                return(
                    <>
                        <option key={item.method} value={item.method}>
                            {item.method}
                        </option>
                    </>
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
        this.setState({start:''});
        this.setState({
            [event.target.name]:event.target.value
           
        })

        fetch(`${OccupiedRoomUrl}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({start:new Date(item.departureDate)})
                return 'ok'
            })
        })

        
        
    }

    starthandleChange(date) {
        this.setState({
            start: date
        });
        var newtitle =(this.state.room+  ' '   +this.state.fname+  ' '  +this.state.lname+ ' ' +this.state.phone)
        this.setState({title:newtitle})
    }

    endhandleChange(date) {
        this.setState({
            end: date
        });
    }

    renderstartDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.start}
                    onChange={this.starthandleChange}
                    minDate={new Date()}
                    // maxDate={addDays(new Date(),26)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize51"
                    placeholderText="Arrival Date"
                />
            </div>
        )
    }
    
    renderendDate() {
        return (
            <div >
                <DatePicker
                    selected={this.state.end}
                    onChange={this.endhandleChange}
                    minDate={addDays(this.state.start,1)}
                    // maxDate={addDays(new Date(),31)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize51"
                    placeholderText="Departure Date"
                />
            </div>
        )
    }

    handleroomData2=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
            allDay:true
        })
        
        if(this.state.fname!==null){
            fetch(`${RoomUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayAllRoomNums:data
                })
            })
            fetch(`${OccupiedRoomUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayOccupiedRoomNums:data
                })
            })
        }

        
    }

    async handleSubmit() {
          
        try {
            if(this.state.paymentMethod==="POS"){
                var billingPOSSales = {
                    docketNum:'BillSales'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.rsvAmount}`,
                    POSAmount:`${this.state.rsvAmount}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    description:`${this.state.description1}`,
                    group:`${this.state.group}`,
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    refID:`${this.state._id}`,
                    department: "Other Sales",
                    paymentMethod:`${this.state.paymentMethod}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result1 = await fetch(postOtherSalesUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        billingPOSSales
                       
                    )
                    
                });
                console.log('result1>  ' + result1)

                               
            }
            
            if(this.state.paymentMethod==="Cash"){
                var billingCashSales = {
                    docketNum:'BillSales'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.rsvAmount}`,
                    POSAmount:0,
                    CashAmount:`${this.state.rsvAmount}`,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    description:`${this.state.description1}`,
                    group:`${this.state.group}`,
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    refID:`${this.state._id}`,
                    department: "Other Sales",
                    paymentMethod:`${this.state.paymentMethod}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                   
                }
                let result2 = await fetch(postOtherSalesUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        billingCashSales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)
                
               
            }

           
           

            if(this.state.paymentMethod==="Transfer"){
                var billingTransferSales = {
                    docketNum:'BillSales'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.rsvAmount}`,
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:`${this.state.rsvAmount}`,
                    CompDebit:0,
                    roomDebit:0,
                    description:`${this.state.description1}`,
                    group:`${this.state.group}`,
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    refID:`${this.state._id}`,
                    department: "Other Sales",
                    paymentMethod:`${this.state.paymentMethod}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                   
                }
                let result3 = await fetch(postOtherSalesUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        billingTransferSales
                       
                    )
                    
                });
                console.log('result3>  ' + result3)

            }
           

            if(this.state.paymentMethod==="Complimentary"){
                var billingComplSales = {
                    docketNum:'BillSales'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.rsvAmount}`,
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:`${this.state.rsvAmount}`,
                    roomDebit:0,
                    description:`${this.state.description1}`,
                    group:`${this.state.group}`,
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    refID:`${this.state._id}`,
                    department: "Other Sales",
                    paymentMethod:`${this.state.paymentMethod}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                   
                }
                let result4 = await fetch(postOtherSalesUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        billingComplSales
                       
                    )
                    
                });
                console.log('result4>  ' + result4)

                
            }

            
            this.setState({description1:''})
            this.setState({displayPaymentMethods:''})
            
                              
        } catch(e) {
            console.log(e)
        }

    }


    async handleResvSubmit() {
       
        try {
           
            var events = {
                _id:`${this.state._id}`,
                resID:`${this.state._id}`,
                fname:`${this.state.fname}`,
                lname:`${this.state.lname}`,
                allDay: `${this.state.allDay}`,
                start: `${this.state.start}`,
                end: `${this.state.end}`,
                title: `${this.state.title}`,
                phone: `${this.state.phone}`,
                rsvAmount:`${this.state.rsvAmount}`,
                room: `${this.state.room}`,
                memo: `${this.state.memo}`,
            }
            let result = await fetch(PostReservation, {
                method: 'post',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    events
                        
                )
                    
            });
            console.log('result>  ' + result)
            alert("Reservation made for room " +this.state.title);
            this.setState({
                fname:'',
                lname:'',
                allDay: '',
                start: '',
                end: '',
                title: '',
                room:'',
                phone:'',
                rsvAmount:'',
                displayAllRoomNums:'',
                _id:'',
                memo:''
                
            })
            fetch(`${GetReservation}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
            this.setState({
                events:data
                
            })
            this.myTimer = setTimeout(() => {
                this.setState({
                    _id:Math.floor(Math.random()*100000000)
                })
            },1000);
           
           
        })
            
        } catch(e) {
            console.log(e)
        }

    }

    renderVacantRooms(data){
        if(data) {
           data.sort((a, b) => a.roomNumbers - b.roomNumbers);
            return data.map((item, index) => {
                if(item.roomStatus==="green"){
                    
                    return(
                        <>  
                            
                            <option key={index} value={item.roomNumbers}>
                               {item.roomNumbers} - {item.roomtypeName}
                            </option>
                        </>
                    )
                }
                else{
                    return(
                        <>
                           
                        </>
                    )
                }
                
            })
        }
    }

    renderOccuppiedRooms(data){
        if(data) {
           data.sort((a, b) => a.roomNumbers - b.roomNumbers);
            return data.map((item, index) => {
               
                    
                return(
                    <>  
                        <option key={index} value={item.roomNumbers}>
                        {item.roomNumbers} - {item.roomtypeName}
                        </option>
                    </>
                )
                
                                
            })
        }
    }

    
    render() {
        console.log (">>> Inside Rsvdetails", this.state)
        
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        return (
            
            <div  className="background993">
                <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Add Reservation </h4>
                        </div>
                        <div className="col-6">
                            <h6 style = {{color:'purple',marginLeft:'480px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                        </div>
                        <div className="col-3">
                            <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                        </div>
                </div>
                <h4 style = {{color:'rgb(23, 23, 71)',marginLeft:'50px', marginBottom:'-40px'}}> </h4>
                
                <div className="formdesign510">
                    
                    <div className="row">
                        <div className="col-2">
                            <input type="text" className="form-control mb-3 formsize51" name="fname" require placeholder="Firstname" value={this.state.fname} onChange={this.handleroomData2}/>
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control mb-3 formsize51" name="lname" require placeholder="Surname" value={this.state.lname} onChange={this.handleChange}/>
                        </div>

                        <div className="col-2">
                            <input type="number" className="form-control mb-3 formsize51" name="phone" require placeholder="Phone" value={this.state.phone} onChange={this.handleChange}/>
                        </div>

                        <select className="form-select  mb-3 formsize510" name="room" onChange={this.handleChange2}>
                            <option defaultValue=''>Vacant Room</option>
                            {this.renderVacantRooms(this.state.displayAllRoomNums)}
                            <option defaultValue=''>Occupied Rooms</option>
                            {this.renderOccuppiedRooms(this.state.displayOccupiedRoomNums)}
                            <hr/>
                        </select>
                        
                        <div className="col-2">
                            <label>
                                {this.renderstartDate(this.state.start)}
                            </label>
                        </div>
                        <div className="col-2">
                            <label>
                                {this.renderendDate(this.state.end)}
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="number" className="form-control mb-3 formsize51" name="rsvAmount" require placeholder="Enter Amount" value={this.state.rsvAmount} onChange={this.handlePayMethData}/>
                        </div>
                        <select type ="button" className="form-select formsize3 mb-2 btn btn-primary mt-3 spaceleft" name="paymentMethod" onChange={this.handleChange}>
                            <option selected value=''>Payment Method</option>
                            {this.renderPayMeth(this.state.displayPaymentMethods)}
                        </select>
                        <div className="col-2">
                            <textarea type="text" className="form-control mb-3 textareawidth formsize51" name="memo" rows='2' require placeholder="Enter Comment" value={this.state.memo} onChange={this.handleChange}/>
                        </div>
                        <center>
                            <span>
                                <button disabled={this.state.fname===''||this.state.room===''||this.state.phone===''||this.state.start===''||this.state.end===''||this.state.paymentMethod===''} className="btn btn-warning" onClick={ () => this.onOpenOthrsModal () } >Reserve</button>
                                <button className="btn btn-primary gap" onClick={ () => this.props.history.push('./EditReservation')}>Goto Reservation</button>
                                <Link to="/roomchart">
                                    <button className="btn btn-danger space">Close</button>
                                </Link>
                            </span>
                        </center>
                        
                    </div>
                    <Modal open={this.state.othersedit}>
                        <div className='backgroundRetRep'>
                            <div>
                                <img src= "https://i.ibb.co/sHNG07v/logo-5c.png" className="alignImg2" style={{width:"100px", height:"70px"}} alt="companylogo"/>
                            </div>
                            <center>
                                <h6>{this.state.Hotelname}</h6>
                                <p className="textSize">{this.state.Hoteladdress}</p>
                                <p className="textSize">{this.state.Hotelphone}</p>

                            </center>

                        </div>
                        <table className="table table-hover">
                            
                            <thead className="table-warning">
                                <tr>
                                    <th className="adjust50">Description</th>
                                    {/* <th className="adjust50">Organisation</th> */}
                                    <th className="adjust50">Payment Method</th>
                                    <th className="adjust50">Amount Paid(NGN)</th>
                                                                            
                                </tr>
                            </thead>
                            <tbody className="table table-hover">
                                <tr>
                                    <td className="table-light table-striped adjust2 alignTet"><b>{this.state.description1}</b></td>
                                    {/* <td className="table-light table-striped adjust2 alignTet"><b>{this.state.orgName}</b></td> */}
                                    <td className="table-light table-striped adjust2 alignTet"><b>{this.state.paymentMethod}</b></td>
                                    <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.rsvAmount)}thousandSeparator={true}displayType={"text"}/></b></td>
                                                                    
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        <div className="printing">
                            <center>
                                <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinterOthrs()}}>
                                    <p>{this.state.printBTN}</p>
                                </button>
                            </center>
                            
                        </div>
                        
                    </Modal>
                    
                        <Calendar 
                            localizer={localizer} events={this.state.events} 
                            startAccessor="start" endAccessor= "end" style={{height: 500, margin: "50px"}}
                            selectable={true}
                            onSelectEvent={this.handleEventSelection} 
                        />       
                    
                    
                </div>
                 
            </div>
        );
    }
    async componentDidMount(){
        console.log(">>> Inside RsvDidMount", this.state)
        fetch(`${GetReservation}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                events:data
            })
            
        })

        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
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

        await fetch(`${getWorkDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({transactionDate:item.date})
                return 'ok'
            })
            
           
        })

        this.myTimer = setInterval(() => {
            fetch(`${getWorkDate}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({transactionDate:item.date})
                    return 'ok'
                })
                
               
            })
            
        },1000);

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

export default Reservation;