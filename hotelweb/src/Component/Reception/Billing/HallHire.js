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
import '../Reception.css';
import 'react-datepicker/dist/react-datepicker.css';
import FLogin from '../../FLogin';
import 'react-datepicker/dist/react-datepicker.css';
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
const PostReservation = "http://10.1.0.99:3333/functionPosts";
const GetReservation = "http://10.1.0.99:3333/getHallReservation";
const HallUrl = "http://10.1.0.99:3333/getHalls?hallType=";
const fofUserInfo = "http://10.1.0.99:3333/fofUserInfo";
const getPaymentMethods = "http://10.1.0.99:3333/paymentMethods";
const postOtherSalesUrl = "http://10.1.0.99:3333/otherSales";

class HallHire extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside ReservContructor", props)
        this.state = {
            events: [],
            _id:Math.floor(Math.random()*10000),
            fname:'',
            lname:'',
            allDay: '',
            start: '',
            end: '',
            Hall: '',
            title:'',
            phone:'',
            price:'',
            rsvAmount:'',
            displayAllHalls:'',
            othersedit:false,
            printBTN:'Print',
            displayPaymentMethods:'',
            paymentMethod:'',
            date:new Date(),
            loginDetails:'',
            description1:'Room Reservation',
            email:'None',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''
            
            
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

    // handleChange2 = (event) => {
    //     this.setState({
    //         [event.target.name]:event.target.value
           
    //     })
    //     fetch(`${HallUrl}${event.target.value}`, {method:'GET'})
    //     .then((res) => res.json())
    //     .then((data) => {
    //        data.map((item)=> {
    //             this.setState({price:item.price})
    //             return 'ok'
    //        })
           
    //     })
        
        
    // }

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
                    maxDate={addDays(new Date(),31)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize51"
                    placeholderText="Start Date"
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
                    maxDate={addDays(new Date(),31)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize51"
                    placeholderText="End Date"
                />
            </div>
        )
    }

    handleroomData2=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
            allDay:true
        })
        
        if(this.state.orgName!==null){
            fetch(`${HallUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayAllHalls:data
                })
            })
        }
    }

    async handleSubmit() {
          
        try {
            if(this.state.paymentMethod==="POS"){
                var billingPOSSales = {
                    docketNum:'BillSales'+Math.floor(Math.random()*10000),
                    date: moment(`${new Date()}`).format('MMM DD YYYY'),
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
                    date: moment(`${new Date()}`).format('MMM DD YYYY'),
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
                    date: moment(`${new Date()}`).format('MMM DD YYYY'),
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
                    date: moment(`${new Date()}`).format('MMM DD YYYY'),
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
                Hall: `${this.state.Hall}`,
                rsvAmount:`${this.state.rsvAmount}`,
                transactionDate:moment(this.state.date).format('MMM DD YYYY')
                
            };
            
            // var grpName = this.state.findGroup;
            // var name = this.state.orgName;
            
            // var groupData = {
                
            //     class:"Corporate",
            //     orgName:`${this.state.orgName}`,
            //     orgAddress:`${this.state.orgAddress}`,
            //     orgEmail:`${this.state.orgEmail}`,
            //     orgPhone:`${this.state.phone}`,
            //     _id:`${this.state._id}`,
            //     orgID:`${this.state._id}`
                
            // }
            // if(grpName.some(item => item.orgName===name)){
               
                let result2 = await fetch(PostReservation ,{
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        events 
                            
                    )
                        
                });
                console.log('result2>  ' + result2)
            // }
            
                
                // let result3 = await fetch(PostReservation ,{
                //     method: 'post',
        
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
        
                //     body: JSON.stringify(
                        
                //         events 
                            
                //     )
                        
                // });
                // console.log('result3>  ' + result3)

                // let result = await fetch(postGroup, {
                //     method: 'post',
        
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
        
                //     body: JSON.stringify(
                        
                //         groupData
                            
                //     )
                        
                // });
                // console.log('result>  ' + result)
            
            
            alert("Reservation made for " +this.state.title);
            this.setState({
                fname:'',
                lname:'',
                allDay: '',
                start: '',
                end: '',
                title: '',
                Hall:'',
                phone:'',
                rsvAmount:'',
                displayAllHalls:'',
                _id:'',
                
                
            })
            fetch(`${GetReservation}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
            this.setState({
                events:data
                
            })
            this.myTimer = setTimeout(() => {
                this.setState({
                    _id:Math.floor(Math.random()*10000)
                })
            },1000);
           
        })
            
        } catch(e) {
            console.log(e)
        }

    }

    renderHalls(data){
        if(data) {
           data.sort((a, b) => a.price - b.price);
            return data.map((item) => {
                
                return(
                    <>
                        <option key={item._id} value={item.hallName}>
                            {item.hallName}
                        </option>
                    </>
                )
                
            })
        }
    }

    // renderGroup(data){
    //     if(data) {
    //        data.sort((a, b) => a.orgName - b.orgName);
    //         return data.map((item) => {
                
    //             return(
    //                 <>
    //                     <option key={item._id} value={item.orgName}>
    //                         {item.orgName}
    //                     </option>
    //                 </>
    //             )
                
    //         })
    //     }
    // }
        
    
    render() {
        console.log (">>> Inside Rsvdetails", this.state)
        
        if(localStorage.getItem('userInfo')==null || this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        
        return (
            <div className="background993">
                <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Hall Reservation </h4>
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
                        <div className="col-3">
                            <input type="text" className="form-control mb-3 formsize51" name="fname" require placeholder="Firstname" value={this.state.fname} onChange={this.handleroomData2}/>
                        </div>
                        <div className="col-3">
                            <input type="text" className="form-control mb-3 formsize51" name="lname" require placeholder="Surname" value={this.state.lname} onChange={this.handleChange}/>
                        </div>
                        <div className="col-3">
                            <input type="text" className="form-control mb-3 formsize51" name="phone" require placeholder="Phone Num." value={this.state.phone} onChange={this.handleChange}/>
                        </div>
                        <div className="col-3">
                            <select className="form-select  mb-3 formsize51" name="Hall" onChange={this.handleChange}>
                                <option defaultValue=''>Select Hall</option>
                                {this.renderHalls(this.state.displayAllHalls)}
                            </select>
                        </div>

                    </div>
                    <div className="row">
                        
                        <div className="col-3">
                            <label>
                                {this.renderstartDate(this.state.start)}
                            </label>
                        </div>

                        <div className="col-3">
                            <label>
                                {this.renderendDate(this.state.end)}
                            </label>
                        </div>  
                        <div className="col-3">
                            <input type="number" className="form-control mb-3 formsize51" name="rsvAmount" require placeholder="Enter Amount" value={this.state.rsvAmount} onChange={this.handlePayMethData}/>
                        </div>
                        <select type ="button" className="form-select formsize3 mb-2 btn btn-primary mt-3 spaceleft" name="paymentMethod" onChange={this.handleChange}>
                            <option selected value=''>Payment Method</option>
                            {this.renderPayMeth(this.state.displayPaymentMethods)}
                        </select>
                    </div>
                    
                    <div>
                        {/* <center>
                            <span>
                                <button disabled={this.state.fname===''||this.state.Hall===''||this.state.phone===''||this.state.start===''||this.state.end===''||this.state.paymentMethod===''} className="btn btn-warning" onClick={ () => this.onOpenOthrsModal () } >Reserve</button>
                                <button className="btn btn-primary gap" onClick={ () => this.props.history.push('EditHallReservation')}>Goto Reservation</button>
                                <button className="btn btn-danger space" onClick={ () => this.props.history.push('/')}>Close</button>
                            </span>
                        </center> */}
                    </div>  
                    <Modal open={this.state.othersedit}>
                        <div className='backgroundRetRep'>
                            <center>
                                <h6>Zarvich Hotels Ltd.</h6>
                                <p className="textSize">No ABC Road, Wuse II, Abuja, Nigeria</p>
                                <p className="textSize">+234 803 590 5421, info@zarvichosh.com</p>

                                <h5>General Receipt</h5>
                                <p className="textSize">Date: {this.state.date}</p>

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
    componentDidMount(){
        console.log(">>> Inside RsvDidMount", this.state)
        
        fetch(`${GetReservation}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                events:data,
                
            })
            
        })

        
        fetch(`${fofUserInfo}`, {method:'GET'})
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

export default HallHire;