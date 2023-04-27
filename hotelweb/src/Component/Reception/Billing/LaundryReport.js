import React, { Component } from 'react';
import Billinglogin from '../../Billinglogin';
import '../Reception.css';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import 'bootstrap/dist/css/bootstrap.min.css';




const getRoomSales = "http://10.1.0.99:3333/findLaundrySales?laundry12=Laundry%20Sales";
// const getRoomSales2 = "http://10.1.0.99:3333/findRmDeposits?roomDep13=Room%20Deposit";
const userName = "http://10.1.0.99:3333/billingUserInfo";
const levyUrl= "http://10.1.0.99:3333/feesAndCharges";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";



class LaundryReport extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside CashConstructor",props)
        this.state = {
            RoomSales:'',
            RoomTotal:'',
            depPOS:'',
            depCash:'',
            depTransfer:'',
            depComp:'',
            TotalSales:'',
            date:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            shift:'',
            startdate:'',
            endDate:'',
            levyData:'',
            ServiceChrg:'',
            TourismLevy:'',
            VAT:'',

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:''
            
            
        };
        this.checkinhandleChange = this.checkinhandleChange.bind(this);
        this.endhandleChange = this.endhandleChange.bind(this);

    }
    checkinhandleChange(date) {
        this.setState({
            date: date,
            startdate: date

        });
    }

    endhandleChange(date) {
        this.setState({
            endDate: date
        });
    }
    
    renderDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.checkinhandleChange}
                    maxDate={addDays(new Date(),0)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize printing alignText112"
                    placeholderText='Select Start Date'
                />
            </div>
        )
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
                    className="form-control mb-3 formsize printing alignText112 mvrght"
                    placeholderText="Search End Date"
                />
            </div>
        )
    }


    handleChange=(event)=>{
        
        this.setState({
            [event.target.name]:event.target.value
        })

    }
    handleChange10=(event)=>{
        
        this.setState({
            [event.target.name]:event.target.value,
            roomSales:''
        })

    }
    
    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    cleanup(){
        this.setState({
            RoomSales:0,
            RoomTotal:0,
            depPOS:0,
            depCash:0,
            depTransfer:0,
            depComp:0,
            TotalSales:0
            
        })
    }

    findRoomReport(){
        var start = moment(this.state.date).format('MMM DD YYYY');
        var end = moment(this.state.endDate).format('MMM DD YYYY');

       var findAllBar = `${getRoomSales}&&Laundrystartdate12=${start}&&LaundryendDate12=${end}`
        // var findBarwrtshift = `${getRoomSales2}&&startdate13=${start}&&endDate13=${end}&&shiftNow2='All Day'`

        
            this.setState({RoomSales:''})
            fetch(`${findAllBar}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({RoomSales:data});
                data.map((item) => {
    
                    var RmSales = 0;
                    var roomSales = RmSales + parseInt(item.CashAmount) + parseInt(item.POSAmount) + parseInt(item.TransferAmount) + parseInt(item.roomDebit)
                    this.setState({RoomTotal:roomSales});
    
                    var allPOS = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.POSAmount)
                    }, 0);
                    this.setState({depPOS:allPOS});
    
                    var allCash = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.CashAmount)
                    }, 0);
                    this.setState({depCash:allCash});
    
                    var allTransfer = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.TransferAmount)
                    }, 0);
                    this.setState({depTransfer:allTransfer});
    
                    var allComp = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.CompDebit)
                    }, 0);
                    this.setState({depComp:allComp});
    
                    var allRoom = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.roomDebit)
                    }, 0);
                    this.setState({deproom:allRoom});
                    
                    return 'ok'
                })
                
                
            });
            this.myTimer = setTimeout(() => {
            
                var AllSalesPoint = 0;
                var TotalSalesPoints = AllSalesPoint + this.state.RoomTotal;
                this.setState({TotalSales:TotalSalesPoints})
    
            },1000)
        

        
            // this.setState({RoomSales:''})
            // fetch(`${findBarwrtshift}`, {method:'GET'})
            // .then((res) => res.json())
            // .then((data) => {
            //     this.setState({RoomSales:data});
            //     data.map((item) => {

            //         var RmSales = 0;
            //         var roomSales = RmSales + parseInt(item.CashAmount) + parseInt(item.POSAmount) + parseInt(item.TransferAmount) + parseInt(item.CompDebit) + parseInt(item.roomDebit)
            //         this.setState({RoomTotal:roomSales});
    
            //         var allPOS = data.map(item => item).reduce((totals, item) =>{
            //             return totals + parseInt(item.POSAmount)
            //         }, 0);
            //         this.setState({depPOS:allPOS});
    
            //         var allCash = data.map(item => item).reduce((totals, item) =>{
            //             return totals + parseInt(item.CashAmount)
            //         }, 0);
            //         this.setState({depCash:allCash});
    
            //         var allTransfer = data.map(item => item).reduce((totals, item) =>{
            //             return totals + parseInt(item.TransferAmount)
            //         }, 0);
            //         this.setState({depTransfer:allTransfer});
    
            //         var allComp = data.map(item => item).reduce((totals, item) =>{
            //             return totals + parseInt(item.CompDebit)
            //         }, 0);
            //         this.setState({depComp:allComp});
    
            //         var allRoom = data.map(item => item).reduce((totals, item) =>{
            //             return totals + parseInt(item.roomDebit)
            //         }, 0);
            //         this.setState({deproom:allRoom});
                    
            //         return 'ok'
            //     })
                
                
            // });
            
            this.myTimer = setTimeout(() => {
            
                var AllSalesPoint = 0;
                var TotalSalesPoints = AllSalesPoint + this.state.RoomTotal;
                this.setState({TotalSales:TotalSalesPoints})
    
            },1000)
            
        
       
    }
        
    

    renderRoomSales=(data)=>{
        if(data){
            return data.map((item)=>{
                data.sort((a, b) => a.date - b.date);
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust222">{defaultdate}</td>
                            {/* <td className="table-light table-striped adjust2">{item.roomNumbers}</td> */}
                            <td className="table-light table-striped adjust223 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POSAmount}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.CashAmount}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.TransferAmount}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.CompDebit}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POSAmount) + parseInt(item.CashAmount) + parseInt(item.TransferAmount)}thousandSeparator={true}displayType={"text"}/></b></td> 
                            
                        </tr>
                        
                    </>
                )
               
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
                    <h5>Laundry Sales Report</h5><br/>
                    <div>
                        <span>
                            <label>
                                {this.renderDate(this.state.startdate)}
                            </label>
                        </span>
                        <span>
                            <label>
                                {this.renderendDate(this.state.endDate)}
                            </label>
                        </span>
                        <span>
                            {/* <select type ="button" className="form-select mb-2 btn btn-primary mt-3 btnwidthp printing space selectadjuster" name="shift" value ={this.state.shift} onChange={this.handleChange10}>
                                <option selected value=''>Select Shift</option>
                                <option value='Morning Shift'>Morning Shift</option>
                                <option value='Night Shift'>Night Shift</option>
                                <option value='All Day'>All Day</option>
                                <option value='All Shifts'>All Shifts</option>
                                
                            </select> */}
                            <button className="btn btn-primary space btnadjuster printing" onClick={ () => {this.cleanup();this.findRoomReport()}}>Find</button>
                        </span>
                    </div>
                                   
                </center>
                
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust50">Date</th>
                            {/* <th className="adjust50">Room Number</th> */}
                            <th className="adjust50b">Description</th>
                            <th className="adjust50">POS (NGN)</th>
                            <th className="adjust50">Cash(NGN)</th>
                            <th className="adjust50">Transfer(NGN)</th>
                            <th className="adjust50">Complimentary(NGN)</th>
                            <th className="adjust50">Total(NGN)</th>
                            
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderRoomSales(this.state.RoomSales)}
                        <tr>
                            {/* <td className="table-light table-striped adjust2"> </td> */}
                            <td className="table-light table-striped adjust2"><b>Total</b></td>
                            <td className="table-light table-striped adjust2"><b> </b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depPOS)}thousandSeparator={true}displayType={"text"}/></b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depCash)}thousandSeparator={true}displayType={"text"}/></b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depTransfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depComp)}thousandSeparator={true}displayType={"text"}/></b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b> <NumberFormat value={this.state.depPOS + this.state.depCash + this.state.depTransfer}thousandSeparator={true}displayType={"text"}/></b></td>
                        </tr>

                        
                        
                        
                    </tbody>
                </table>
                
                
                <h6>Gross Collection:         <NumberFormat value={this.state.depPOS + this.state.depCash + this.state.depTransfer}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                
                <hr/>
                <center>
                
                    <button className="btn btn-danger movebtn printing" onClick={ () => this.props.history.push('/EndOfDay') }>Close</button>
                    <button className="btn btn-primary movebtn printing" onClick={ () => window.print() }>Print</button>
                        
                </center>       
            </div>
            
        );
    }
  
    componentDidMount() {
        console.log(">>> Inside CashDidMount", this.state)

        fetch(`${levyUrl}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({levyData:data})
               
        })
        
        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })

    
        var start = moment(new Date()).format('MMM DD YYYY');
        var end = moment(new Date()).format('MMM DD YYYY');

        var findAllBar = `${getRoomSales}&&Laundrystartdate12=${start}&&LaundryendDate12=${end}`

        this.setState({RoomSales:''})
        fetch(`${findAllBar}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({RoomSales:data});
            data.map((item) => {

                var RmSales = 0;
                var roomSales = RmSales + parseInt(item.CashAmount) + parseInt(item.POSAmount) + parseInt(item.TransferAmount) + parseInt(item.roomDebit)
                this.setState({RoomTotal:roomSales});

                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({depPOS:allPOS});

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({depCash:allCash});

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({depTransfer:allTransfer});

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({depComp:allComp});

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({deproom:allRoom});
                
                return 'ok'
            })
            
            
        });
        this.myTimer = setTimeout(() => {
        
            var AllSalesPoint = 0;
            var TotalSalesPoints = AllSalesPoint + this.state.RoomTotal;
            this.setState({TotalSales:TotalSalesPoints})

        },1000)

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


export default LaundryReport;