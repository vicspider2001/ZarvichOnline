import React, { Component } from 'react';
import Billinglogin from '../../Billinglogin';
import '../Reception.css';
import NumberFormat from 'react-number-format';
import addDays from 'date-fns/addDays';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const getRoomSales = "http://10.1.0.99:3333/checkin?actual=";
const userName = "http://10.1.0.99:3333/billingUserInfo";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";

class DiscountedRoomsReport extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside CashConstructor",props)
        this.state = {
            discountedRooms:'',
            discountAmount:'',
            discountType:'',
            TotalDiscount:0,
            TotalRoomRate:0,
            TotalDailyRate:0,
            roomRate:'',
            date:new Date(),
            searchDates:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:''
            
        };
        this.checkinhandleChange = this.checkinhandleChange.bind(this);

    }
    checkinhandleChange(date) {
        this.setState({
            date: date
        });
    }
    
    renderDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.checkinhandleChange}
                    maxDate={addDays(new Date(),1)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize printing alignText112"
                />
            </div>
        )
    }
    

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    findRoomReport(){
        var searchdate = moment(this.state.date).format('YYYY-DD-MMM');
        
        fetch(`${getRoomSales}${searchdate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({discountedRooms:data});
            data.map((item) => {

                var discTotal = 0;
                var AlldiscTotal = discTotal + (parseInt(item.roomRate) - parseInt(item.dailyRate))
                this.setState({TotalDiscount:AlldiscTotal});
                return 'ok'
            });
            
        });

        

    }

    renderDiscountRooms=(data)=>{
        if(data){
            return data.map((item)=>{
                
                var defaultdate = moment(item.arrivalDate).format('YYYY-DD-MMM');
                if(item.discounType!==''){
                    return(
                        <>
                            <tr key= {item.refID}>
                                
                                <td className="table-light table-striped adjust2">{defaultdate}</td>
                                <td className="table-light table-striped adjust224">{item.fname} {item.lname}</td>
                                <td className="table-light table-striped adjust2">{item.roomNumbers}</td>
                                <td className="table-light table-striped adjust2">{item.roomtypeName}</td>
                                <td className="table-light table-striped adjust2">{item.discounType}</td>
                                <td className="table-light table-striped adjust2"><NumberFormat value={item.roomRate}thousandSeparator={true}displayType={"text"}/></td>
                                <td className="table-light table-striped adjust2"><NumberFormat value={item.dailyRate}thousandSeparator={true}displayType={"text"}/></td>
                                <td className="table-light table-striped adjust2"><b><NumberFormat value={parseInt(item.roomRate) - parseInt(item.dailyRate)}thousandSeparator={true}displayType={"text"}/></b></td> 
                                
                            </tr>
                            
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

    
    render() {
        console.log (">>> Inside Cashdetails", this.state)
        // var defaultdate = moment(this.state.date).format('MMM DD YYYY');
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Billinglogin/>
                </>
            )

        }

        return (
            <div className ="container">
                <div>
                    <img src= "https://i.ibb.co/sHNG07v/logo-5c.png" className="alignImg2" style={{width:"100px", height:"70px"}} alt="companylogo"/>
                </div>
                <div>
                    <center>
                        <h6>{this.state.Hotelname}</h6>
                        <p className="textSize">{this.state.Hoteladdress}</p>
                        <p className="textSize">{this.state.Hotelphone}</p>
                       
                    </center>
                </div>
                <center>
                    <h5>Room Discount Report</h5><br/>
                    {/* <label>
                        {this.renderDate(this.state.date)}
                    </label>
                    <p className="textSize printing blinkblink2">Select Report Date</p> */}
                    <br/>
                    {/* <button className="btn btn-primary printing alignBtn" onClick={ () => this.findRoomReport()}>Find</button> */}
                        
                                   
                </center>
                
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust50">Date</th>
                            <th className="adjust50">Names</th>
                            <th className="adjust50">Room Num</th>
                            <th className="adjust50">Room Type</th>
                            <th className="adjust50">Discount Type</th>
                            <th className="adjust50">Room Rate(NGN)</th>
                            <th className="adjust50">Daily Rate(NGN)</th>
                            <th className="adjust50">Discount (NGN)</th>
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderDiscountRooms(this.state.discountedRooms)}
                        <tr>
                            {/* <td className="table-light table-striped adjust2">{defaultdate}</td> */}
                            <td className="table-light table-striped adjust2"><b>Total Discount</b></td>
                            <td className="table-light table-striped adjust2"> </td>
                            <td className="table-light table-striped adjust2"> </td>
                            <td className="table-light table-striped adjust2"> </td>
                            <td className="table-light table-striped adjust2"> </td>
                            <td className="table-light table-striped adjust2"> </td>
                            <td className="table-light table-striped adjust2"> </td>
                            <td className="table-light table-striped adjust2"><b> <NumberFormat value={this.state.TotalDiscount}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr>
                        
                    </tbody>
                </table>
                
                
                <h6>Total Daily Discount:         <NumberFormat value={this.state.TotalDiscount}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                <hr/>
                <center>
                
                    <button className="btn btn-danger movebtn printing" onClick={ () => this.props.history.push('/EndOfDay') }>Close</button>
                    <button className="btn btn-primary movebtn printing" onClick={ () => window.print() }>Print</button>
                    <button className="btn btn-primary movebtn printing" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>  
                        
                </center>       
            </div>
            
        );
    }
  
    componentDidMount() {
        console.log(">>> Inside CashDidMount", this.state)
        // var defaultdate = moment(this.state.date).format('MMM-DD-YYYY');
        

        fetch(`${getRoomSales}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({discountedRooms:data});
            
            var allRmRate = data.map(item => item).reduce((rates, obj) =>{
                return rates + parseInt(obj.roomRate)
            }, 0);

            var allDailyRate = data.map(item => item).reduce((rates, obj) =>{
                return rates + parseInt(obj.dailyRate)
            }, 0);
            

            var discTotal = 0;
            var AlldiscTotal = discTotal + allRmRate - allDailyRate
            this.setState({TotalDiscount:AlldiscTotal});
            return 'ok'
          

        });

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


export default DiscountedRoomsReport;