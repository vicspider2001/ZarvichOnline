import React, { Component } from 'react';
import './Reception.css';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import Newheader from './Newheader';
import Adlogin from './Adlogin';




const getAllbar = "https://us3.localto.net:39344/salesReport?BarSales=Bar%20Sales";
const getAllRest = "https://us3.localto.net:39344/salesReport?restSales=Restaurant%20Sales";
const getAllOther = "https://us3.localto.net:39344/salesReport?otherSales=Other%20Sales";
const getAllDeposits = "https://us3.localto.net:39344/salesReport?accDepositReceptn=Accommodation%20Deposits";


class CashCollection extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside CashConstructor",props)
        this.state = {
            RoomDeposits:'',
            RoomTotal:0,
            depPOS:0,
            depCash:0,
            depTransfer:0,
            depRoom:0,
            BarSales:0,
            BarTotal:0,
            barPOS:0,
            barCash:0,
            barTransfer:0,
            barRoom:0,
            RestSales:'',
            RestTotal:0,
            restPOS:0,
            restCash:0,
            restTransfer:0,
            restRoom:0,
            otherSales:0,
            othersTotal:0,
            otherPOS:0,
            otherCash:0,
            otherTransfer:0,
            otherRoom:0,
            POSCal:0,
            CashCal:0,
            TransferCal:0,
            RoomCal:0,
            poolPOS:0,
            poolCash:0,
            poolRoom:0,
            poolTransfer:0,
            
            startdate:'',
            endDate:'',

            
        };
        this.checkinhandleChange = this.checkinhandleChange.bind(this);
        this.endhandleChange = this.endhandleChange.bind(this);

    }
    checkinhandleChange(date) {
        this.setState({
            date: date,
           

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

    findSalesReport(){
        var thisDate = moment(this.state.date).format('MMM DD YYYY')
        
        this.setState({
            depRoom:0,
            depTransfer:0,
            depCash:0,
            depPOS:0,
            RoomTotal:0,
            RoomDeposits:'',
            RestSales:'',
            BarSales:'',
            otherSales:''




        })
        fetch(`${getAllDeposits}&&today=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({RoomDeposits:data});
            
                data.map((item) => {

                    
                    var allPOS = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.POS)
                    }, 0);
                    this.setState({depPOS:allPOS});
    
                    var allCash = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Cash)
                    }, 0);
                    this.setState({depCash:allCash});
    
                    var allTransfer = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Transfer)
                    }, 0);
                    this.setState({depTransfer:allTransfer});
    
                    var allRoom = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Room)
                    }, 0);
                    this.setState({depRoom:allRoom});
                    
                    this.myTimer = setTimeout(() =>{
                        var RmSales = 0;
                        var roomSales = RmSales + parseInt(this.state.depCash) + parseInt(this.state.depPOS) + parseInt(this.state.depTransfer) + parseInt(this.state.depRoom)
                        this.setState({RoomTotal:roomSales});
                    
                    },2000)
                    
                    return 'ok'
                })
            
                if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    depRoom:0,
                    depTransfer:0,
                    depCash:0,
                    depPOS:0,
                    RoomTotal:0

                })
            }
            
            
            
        });
                
       
        fetch(`${getAllRest}&&resttoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({RestSales:data});
        
            data.map((item) => {
              
                var restallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({restPOS:restallPOS});

                var restallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({restCash:restallCash});

                var restallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({restTransfer:restallTransfer});

                var restallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({restRoom:restallRoom});

                this.myTimer = setTimeout(() => {
                    var AllRest = 0;
                    var restSales = AllRest + parseInt(this.state.restCash) + parseInt(this.state.restPOS) + parseInt(this.state.restTransfer) + parseInt(this.state.restRoom)
                    this.setState({RestTotal:restSales})
                },2000)
                
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    restRoom:0,
                    restTransfer:0,
                    restCash:0,
                    restPOS:0,
                    RestTotal:0

                })
            }
        
        });

        fetch(`${getAllbar}&&bartoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({BarSales:data});
        
            data.map((item) => {

                var barallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({barPOS:barallPOS});

                var barallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({barCash:barallCash});

                var barallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({barTransfer:barallTransfer});

                var barallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({barRoom:barallRoom});

                this.myTimer = setTimeout(() => {
                    var BarTotal = 0;
                    var barSales = BarTotal + parseInt(this.state.barCash) + parseInt(this.state.barPOS) + parseInt(this.state.barTransfer) + parseInt(this.state.barRoom)
                    this.setState({BarTotal:barSales})

                },2000)
                                    
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    barRoom:0,
                    barTransfer:0,
                    barCash:0,
                    barPOS:0,
                    BarTotal:0

                })
            }
        
        });
        

        fetch(`${getAllOther}&&othertoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({otherSales:data});
        
            data.map((item) => {

                var othersallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({otherPOS:othersallPOS});

                var othersallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({otherCash:othersallCash});

                var othersallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({otherTransfer:othersallTransfer});

                var othersallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({otherRoom:othersallRoom});

                this.myTimer = setTimeout(() => {
                    var AllOthers = 0;
                    var OtherSales = AllOthers + parseInt(this.state.otherCash) + parseInt(this.state.otherPOS) + parseInt(this.state.otherTransfer) + parseInt(this.state.otherRoom)
                    this.setState({othersTotal:OtherSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    otherRoom:0,
                    otherTransfer:0,
                    otherCash:0,
                    otherPOS:0,
                    othersTotal:0

                })
            }
            
        });
    }
    

    // logout(){
    //     localStorage.removeItem('userInfo');
    //     this.setState({
    //         login:true
    //     })
    //     localStorage.removeItem('shift')
        
    // }
    cleanupfirst(){
        this.setState({ RoomDeposits:'',
                        RoomTotal:0,
                        depPOS:0,
                        depCash:0,
                        depTransfer:0,
                        depRoom:0,
                        BarSales:0,
                        BarTotal:0,
                        barPOS:0,
                        barCash:0,
                        barTransfer:0,
                        barRoom:0,
                        RestSales:'',
                        RestTotal:0,
                        restPOS:0,
                        restCash:0,
                        restTransfer:0,
                        restRoom:0,
                        functionSales:0,
                        functionTotal:0,
                        functionRoom:0,
                        functionTransfer:0,
                        functionCash:0,
                        functionPOS:0,
                        otherSales:0,
                        othersTotal:0,
                        otherPOS:0,
                        otherCash:0,
                        otherTransfer:0,
                        otherRoom:0,
                        poolSales:0,
                        PoolTotal:0,
                        SpoolPOS:0,
                        poolsCash:0,
                        poolsTransfer:0,
                        poolsRoom:'',
                        POSCal:0,
                        CashCal:0,
                        TransferCal:0,
                        RoomCal:0,
                        poolPOS:0,
                        poolCash:0,
                        poolRoom:0,
                        poolTransfer:0
                    })
    }

    
    renderRoomSales=(data)=>{
        if(data){
            
            return data.map((item)=>{
                
                
                
                return(
                    <>
                        <tr key= {item._id}>
                            
                            
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td> 
                            
                        </tr>
                        
                    </>
                )
               
            })
            
        }
        
    }

    renderRestSales=(data)=>{
        if(data){
           
            return data.map((item)=>{
                
                
                return(
                    <>
                        <tr key= {item._id}>
                            
                            
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr>
                        
                    </>
                )
               
            })
            
        }
        
           
    }

    renderBarSales=(data)=>{
        if(data){
           
            return data.map((item)=>{
               
                
                return(
                    <>
                        <tr key= {item._id}>
                            
                            
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
          
    }

   
    renderOtherSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                
                return(
                    <>
                        <tr key= {item._id}>
                            
                            
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

   

    render() {
        console.log (">>> Inside Cashdetails", this.state)
        
        if(localStorage.getItem('rtk')==null||localStorage.getItem('userdata')===null){
            return(
                <>
                    <Adlogin/>
                </>
            )

        }

        return (
            <>
                <Newheader/>
                <div className ="mobilevi">
                    <div className='container'>
                        <div>
                            <center>
                                <h6>{this.state.Hotelname}</h6>
                                <p className="textSize">{this.state.Hoteladdress}</p>
                                <p className="textSize">{this.state.Hotelphone}</p>

                            </center>
                        </div>
                        <center>
                            <h5>Daily Sales Report</h5><br/>
                            <div>
                                <span>
                                    <label>
                                        {this.renderDate(this.state.startdate)}
                                    </label>
                                </span>
                            
                                <span>
                                    
                                    <button className="btn btn-primary space btnadjuster printing" onClick={ () => {this.cleanupfirst();this.findSalesReport()}}>Find</button>
                                    
                                </span>
                            </div>
                                        
                        </center>
                        
                        <table className="table table-hover">
                            
                            <thead className="table-warning">
                                <tr>
                                    
                                    <th className="adjust50">Desc.</th>
                                    <th className="adjust50">POS</th>
                                    <th className="adjust50">Cash</th>
                                    <th className="adjust50">Room</th>
                                    <th className="adjust50">Transfer</th>
                                    <th className="adjust50">Total</th>
                                    
                                            
                                </tr>
                            </thead>
                            <tbody className="table table-hover">
                                {this.renderRoomSales(this.state.RoomDeposits)}
                                {this.renderRestSales(this.state.RestSales)}
                                {this.renderBarSales(this.state.BarSales)}
                                {this.renderOtherSales(this.state.otherSales)}
                                <tr>
                                    
                                    <td className="table-light table-striped adjust2"><b>Total</b></td>
                                    <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depPOS) + parseInt(this.state.restPOS) + parseInt(this.state.barPOS) + parseInt(this.state.otherPOS)}thousandSeparator={true}displayType={"text"}/></b></td>
                                    <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depCash) + parseInt(this.state.restCash) + parseInt(this.state.barCash) + parseInt(this.state.otherCash)}thousandSeparator={true}displayType={"text"}/></b></td>
                                    <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depRoom) + parseInt(this.state.restRoom) + parseInt(this.state.barRoom) + parseInt(this.state.otherRoom)}thousandSeparator={true}displayType={"text"}/></b></td>
                                    <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depTransfer) + parseInt(this.state.restTransfer) + parseInt(this.state.barTransfer) + parseInt(this.state.otherTransfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                                    <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.RoomTotal) + parseInt(this.state.BarTotal) + parseInt(this.state.RestTotal) + parseInt(this.state.othersTotal)}thousandSeparator={true}displayType={"text"}/></b></td>
                                </tr>
                                
                            </tbody>
                        </table>
                        
                        
                        <h6>Total Collection:         <NumberFormat value={parseInt(this.state.RoomTotal) + parseInt(this.state.BarTotal) + parseInt(this.state.RestTotal) + parseInt(this.state.othersTotal)}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                        <hr/>
                        <center>
                        
                            <button className="btn btn-danger movebtn printing" onClick={ () => this.props.history.push('/') }>Close</button>
                            <button className="btn btn-primary movebtn printing" onClick={ () => window.print() }>Print</button>
                                
                        </center>  

                    </div>
                         
                </div>
            </>
            
            
        );
    }
  
    componentDidMount() {
        console.log(">>> Inside CashDidMount", this.state)
        var defaultDate = moment(new Date()).format('MMM DD YYYY')
        
        this.setState({
            depRoom:'',
            depTransfer:'',
            depCash:'',
            depPOS:'',
            RoomTotal:''

        })
        fetch(`${getAllDeposits}&&today=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({RoomDeposits:data});
            
                data.map((item) => {

                    
                    var allPOS = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.POS)
                    }, 0);
                    this.setState({depPOS:allPOS});
    
                    var allCash = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Cash)
                    }, 0);
                    this.setState({depCash:allCash});
    
                    var allTransfer = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Transfer)
                    }, 0);
                    this.setState({depTransfer:allTransfer});
    
                    var allRoom = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Room)
                    }, 0);
                    this.setState({depRoom:allRoom});
                    
                    this.myTimer = setTimeout(() =>{
                        var RmSales = 0;
                        var roomSales = RmSales + parseInt(this.state.depCash) + parseInt(this.state.depPOS) + parseInt(this.state.depTransfer) + parseInt(this.state.depRoom)
                        this.setState({RoomTotal:roomSales});
                    
                    },2000)
                    
                    return 'ok'
                })
            
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    depRoom:'',
                    depTransfer:'',
                    depCash:'',
                    depPOS:'',
                    RoomTotal:''

                })
            }
            
            
            
        });
                
       
        fetch(`${getAllRest}&&resttoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({RestSales:data});
        
            data.map((item) => {
              
                var restallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({restPOS:restallPOS});

                var restallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({restCash:restallCash});

                var restallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({restTransfer:restallTransfer});

                var restallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({restRoom:restallRoom});

                this.myTimer = setTimeout(() => {
                    var AllRest = 0;
                    var restSales = AllRest + parseInt(this.state.restCash) + parseInt(this.state.restPOS) + parseInt(this.state.restTransfer) + parseInt(this.state.restRoom)
                    this.setState({RestTotal:restSales})
                },2000)
                
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    restRoom:'',
                    restTransfer:'',
                    restCash:'',
                    restPOS:'',
                    RestTotal:''

                })
            }
        
        });

        fetch(`${getAllbar}&&bartoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({BarSales:data});
        
            data.map((item) => {

                var barallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({barPOS:barallPOS});

                var barallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({barCash:barallCash});

                var barallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({barTransfer:barallTransfer});

                var barallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({barRoom:barallRoom});

                this.myTimer = setTimeout(() => {
                    var BarTotal = 0;
                    var barSales = BarTotal + parseInt(this.state.barCash) + parseInt(this.state.barPOS) + parseInt(this.state.barTransfer) + parseInt(this.state.barRoom)
                    this.setState({BarTotal:barSales})

                },2000)
                                    
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    barRoom:'',
                    barTransfer:'',
                    barCash:'',
                    barPOS:'',
                    BarTotal:''

                })
            }
        
        });
        

        fetch(`${getAllOther}&&othertoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({otherSales:data});
        
            data.map((item) => {

                var othersallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({otherPOS:othersallPOS});

                var othersallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({otherCash:othersallCash});

                var othersallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({otherTransfer:othersallTransfer});

                var othersallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({otherRoom:othersallRoom});

                this.myTimer = setTimeout(() => {
                    var AllOthers = 0;
                    var OtherSales = AllOthers + parseInt(this.state.otherCash) + parseInt(this.state.otherPOS) + parseInt(this.state.otherTransfer) + parseInt(this.state.otherRoom)
                    this.setState({othersTotal:OtherSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    otherRoom:'',
                    otherTransfer:'',
                    otherCash:'',
                    otherPOS:'',
                    othersTotal:''

                })
            }
            
        });

       
    }

}


export default CashCollection;