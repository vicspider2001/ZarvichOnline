import React,{Component} from 'react';
import './Dashboard.css';
import Card from 'react-bootstrap/Card';
import NumberFormat from 'react-number-format';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CloseButton from 'react-bootstrap/CloseButton';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Newheader from '../Newheader';
import Adlogin from '../Adlogin';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
    
);


// Rooms Transactions Url //
const occupancyChart = "https://us3.localto.net:39344/getrmstatus";
const otherSales = "https://us3.localto.net:39344/otherSalesPoints";
const guestDeposits = "https://us3.localto.net:39344/GetTmpRmDep";


// Restaurant Transactions Url //
const getRestaurantSales = "http://us3.localto.net:39344/restaurantSales"; 

// Bar Transactions Url //
const getBarNow = "http://us3.localto.net:39344/barSales"; 

// PoolBar Transactions Url //
// const getPoolBarSales = "http://us3.localto.net:39344/poolbarSales"; 


//Active work date//
const getWorkDate = "http://us3.localto.net:39344/getActive";
// const url = "http://us3.localto.net:39344/api/auth/userinfo";




class NewDashboard extends Component{

    constructor(props){
        super(props)
        console.log(">>>Inside Constructor")

        this.state = {
           
            allOccupied:'',
            allVacant:'',
            allCorporate:'',
            allIndividual:'',
            allStaff:'',
            allComplimentary:'',
            allCheckout:'',

            
            TotalSales:0,
            POS:0,
            Cash:0,
            Transfer:0,
            Complimentary:0,
            Room:0,


            OtherTotalSales:0,
            OtherRoom:0,
            OtherComplimentary:0,
            OtherTransfer:0,
            OtherCash:0,
            OtherPOS:0,

            ReceptionSales:0,
           
            date:'',

            RestTotalSales:0,
            RestRoom:0,
            RestComplimentary:0,
            RestTransfer:0,
            RestCash:0,
            RestPOS:0,
           

            BarTotalSales:0,
            BarRoom:0,
            BarComplimentary:0,
            BarTransfer:0,
            BarCash:0,
            BarPOS:0,

            Gtotal:0,
           
            Blogin:'',

            labels:['Rooms','Others','Restaurant','Inner Bar'],

            showRooms:false,
            showOthers:false,
            showRest:false,
            showInnerBar:false


        };

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
                       
        })

    }

    handleRoomShow(){
        this.setState({showRooms:true})
    }

    handleRoomClose(){
        this.setState({showRooms:false})
    }

    handleOthersShow(){
        this.setState({showOthers:true})
    }

    handleOthersClose(){
        this.setState({showOthers:false})
    }

    handleRestShow(){
        this.setState({showRest:true})
    }

    handleRestClose(){
        this.setState({showRest:false})
    }

    
    handleInnerBarClose(){
        this.setState({showInnerBar:false})
    }

    handleInnerBarShow(){
        this.setState({showInnerBar:true})
    }


    logout(){
        localStorage.removeItem('rtk');
        localStorage.removeItem('userdata');
               
    }

        
    render(){
        console.log (">>> Inside Render", this.state)

        var count=this.state.allOccupied;
        if (count!=='green'){
            var result = count.length;
        }

        var labels=this.state.labels;

        const data = {
            labels:labels,
            datasets: [
              {
                
                data: [this.state.TotalSales, this.state.OtherTotalSales, this.state.RestTotalSales,  this.state.BarTotalSales,],
                backgroundColor: ['chartreuse', 'cornflowerblue', 'hotpink','lightseagreen',]
              }
            
            ]
        };
    
        const options = {
            responsive: true,
            plugins: {
           
              title: {
                display: true,
                text: 'Income Chart',
              },
              
            },
            
        };

        var transDate = moment(this.state.date).format('YYYY-DD-MMM');

        if(localStorage.getItem('rtk')==null||localStorage.getItem('userdata')===null){
            return(
                <>
                    <Adlogin/>
                </>
            )

        }

       
        return(
            <>
                <Newheader/>
                <div className="Dashbackground">
                    
                    <div className="heading">
                        
                        <h5 type="button" onClick={()=>this.props.history.push('/AppMenu')}>Dashboard</h5>
                        
                        
                        
                    </div>
                    
                    <div className="miniDash">
                        <Button variant="Danger" className="DashSheet1" type="button" onClick={()=>this.handleRoomShow()}>
                            
                            <p className="mobileText">Rooms: <NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></p>
                           
                            
                        </Button>

                        <Button variant="Danger" className="DashSheet2" type="button" onClick={()=>this.handleOthersShow()}> 
                           
                            <p className="mobileText">Other Sales: <NumberFormat value={this.state.OtherTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                            
                            
                        </Button>

                        <Button variant="Danger" className="DashSheet3" type="button" onClick={()=>this.handleRestShow()}> 
                            
                            <p className="mobileText">Restaurant: <NumberFormat value={this.state.RestTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                            
                        
                        </Button>

                        <Button variant="Danger" className="DashSheet4" type="button" onClick={()=>this.handleInnerBarShow()}>
                           
                            <p className="mobileText">Bar: <NumberFormat value={this.state.BarTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                           
                            
                        </Button>
                        {/* <Button variant="Danger" className="DashSheet5" type="button" onClick={()=>this.handlePoolShow()}> 
                           
                            <p className="mobileText">Pool Bar: <NumberFormat value={this.state.PoolTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                           
                            
                        </Button> */}

                        <Button variant="Danger" className="DashSheet6"> 
                            <Card.Title>
                                <p className="mobileText">Total: <NumberFormat value={parseInt(this.state.BarTotalSales) + parseInt(this.state.RestTotalSales) + parseInt(this.state.OtherTotalSales) + parseInt(this.state.TotalSales)}thousandSeparator={true}displayType={"text"}/></p>
                            </Card.Title>
                            
                        </Button>
                    </div>
                    

                    <div className="chart">
                        <Bar 
                            options={options} 
                            data={data} 
                        />
                        
                    </div>

                    
                </div>
                    
                    
                <Offcanvas show={this.state.showRooms}>
                    
                    <div className="missionvission">
                        <Offcanvas.Body>
                            <div className="size13">
                                <CloseButton onClick={()=>this.handleRoomClose()}/>
                            </div>
                            <div className="missionStatement">
                                    
                                <Card.Title className="mb-3">
                                    Rooms Payment Analysis
                                </Card.Title>
                                <hr/>
                                <Card.Subtitle className="mb-3 text-muted editsub2">
                                   {transDate}
                                </Card.Subtitle>
                                <Card.Text className="mb-3 editsub">
                                    <div className="tableBody">
                                        <p className="adjust5">Occupancy:{result}</p>
                                        <p className="adjust5">Cash: <NumberFormat value={this.state.Cash}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">POS: <NumberFormat value={this.state.POS}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Transfer: <NumberFormat value={this.state.Transfer}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Room: <NumberFormat value= {this.state.Room}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Reservation Deposit.: <NumberFormat value= {this.state.Complimentary}thousandSeparator={true}displayType={"text"}/></p> 
                                        <p className="adjust5">Total: <NumberFormat value= {this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></p>
                                        
                                    </div>
                                </Card.Text>
                                    
                                <br/><br/>
                                
                                        
                            </div>
                            
                            
                        </Offcanvas.Body>
                    </div>
                    
                </Offcanvas>

                <Offcanvas show={this.state.showOthers}>
                    
                    <div className="missionvission">
                        <Offcanvas.Body>
                            <div className="size13">
                                <CloseButton onClick={()=>this.handleOthersClose()}/>
                            </div>
                            <div className="missionStatement">
                                    
                                <Card.Title className="mb-3">
                                    Others Payment Analysis
                                </Card.Title>
                                <hr/>
                                <Card.Subtitle className="mb-3 text-muted editsub">
                                   {transDate}
                                </Card.Subtitle>
                                <Card.Text className="mb-3 editsub">
                                    <div className="tableBody">
                                                
                                        <p className="adjust5">Cash: <NumberFormat value={this.state.OtherCash}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">POS: <NumberFormat value={this.state.OtherPOS}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Transfer: <NumberFormat value={this.state.OtherTransfer}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Room: <NumberFormat value= {this.state.OtherRoom}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Comp.: <NumberFormat value= {this.state.OtherComplimentary}thousandSeparator={true}displayType={"text"}/></p> 
                                        <p className="adjust5">Total: <NumberFormat value= {this.state.OtherTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                                                
                                    </div>
                                   
                                </Card.Text>
                                    
                                <br/><br/>
                                
                                        
                            </div>
                            
                        </Offcanvas.Body>
                    </div>
                    
                </Offcanvas>

                <Offcanvas show={this.state.showRest}>
                    
                    <div className="missionvission">
                        <Offcanvas.Body>
                            <div className="size13">
                                <CloseButton onClick={()=>this.handleRestClose()}/>
                            </div>
                            <div className="missionStatement">
                                    
                                <Card.Title className="mb-3">
                                    Restaurant Payment Analysis
                                </Card.Title>
                                <hr/>
                                <Card.Subtitle className="mb-3 text-muted editsub">
                                   {transDate}
                                </Card.Subtitle>
                                <Card.Text className="mb-3 editsub">
                                    <div className="tableBody">
                                                    
                                        <p className="adjust5">Cash: <NumberFormat value={this.state.RestCash}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">POS: <NumberFormat value={this.state.RestPOS}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Transfer: <NumberFormat value={this.state.RestTransfer}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Room: <NumberFormat value= {this.state.RestRoom}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Comp.: <NumberFormat value= {this.state.RestComplimentary}thousandSeparator={true}displayType={"text"}/></p> 
                                        <p className="adjust5">Total: <NumberFormat value= {this.state.RestTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                                                
                                    </div>
                                </Card.Text>
                                    
                              
                                <br/><br/>
                                
                                        
                            </div>
                            
                        </Offcanvas.Body>
                    </div>
                    
                </Offcanvas>

                <Offcanvas show={this.state.showInnerBar}>
                    
                    <div className="missionvission">
                        <Offcanvas.Body>
                            <div className="size13">
                                <CloseButton onClick={()=>this.handleInnerBarClose()}/>
                            </div>
                            <div className="missionStatement">
                                    
                                <Card.Title className="mb-3">
                                    Bar Payment Analysis
                                </Card.Title>
                                <hr/>
                                <Card.Subtitle className="mb-3 text-muted editsub">
                                   {transDate}
                                </Card.Subtitle>
                                <Card.Text className="mb-3 editsub">
                                    <div className="tableBody">
                                                        
                                        <p className="adjust5">Cash: <NumberFormat value={this.state.BarCash}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">POS: <NumberFormat value={this.state.BarPOS}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Transfer: <NumberFormat value={this.state.BarTransfer}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Room: <NumberFormat value= {this.state.BarRoom}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Comp.: <NumberFormat value= {this.state.BarComplimentary}thousandSeparator={true}displayType={"text"}/></p> 
                                        <p className="adjust5">Total: <NumberFormat value= {this.state.BarTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                                                
                                    </div>
                                </Card.Text>
                                    
                              
                                <br/><br/>
                                
                                        
                            </div>
                            
                        </Offcanvas.Body>
                    </div>
                    
                </Offcanvas>

                                
            
            </>
        )
    }
    componentDidMount(){
        console.log (">>> Inside DidMount")
        fetch(`${occupancyChart}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                allOccupied:data.map(item => item.roomStatus).filter(item=> item !=='green'&& item !=='black'),
                allVacant:data.map(item => item.roomStatus).filter(item=> item ==='green'),
                allCorporate:data.map(item => item.roomStatus).filter(item=> item ==='blue'),
                allIndividual:data.map(item => item.roomStatus).filter(item=> item ==='blueviolet'),
                allStaff:data.map(item => item.roomStatus).filter(item=> item ==='deeppink'),
                allComplimentary:data.map(item => item.roomStatus).filter(item=> item ==='orange'),
                allCheckout:data.map(item => item.roomStatus).filter(item=> item ==='black')
            })
            
        })

        fetch(`${guestDeposits}`, {method:'GET'})
        .then((resp) => resp.json())    
        .then((data) => {
            

            var allPOS = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({POS:allPOS})

            var allCash = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({Cash:allCash})

            var allTransfer = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TransferAmount)
            }, 0);
            this.setState({Transfer:allTransfer})

            var allComp = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CompDebit)
            }, 0);
            this.setState({Complimentary:allComp})

            var allRoom = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.roomDebit)
            }, 0);
            this.setState({Room:allRoom})
            
            var Sales = 0;
            var dailySales = Sales + this.state.Cash + this.state.POS + this.state.Transfer + this.state.Room
            this.setState({TotalSales:dailySales})
            
        })

        fetch(`${otherSales}`, {method:'GET'})
        .then((resp) => resp.json())    
        .then((data) => {
           

            var allPOS = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({OtherPOS:allPOS})

            var allCash = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({OtherCash:allCash})

            var allTransfer = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TransferAmount)
            }, 0);
            this.setState({OtherTransfer:allTransfer})

            var allComp = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CompDebit)
            }, 0);
            this.setState({OtherComplimentary:allComp})

            var allRoom = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.roomDebit)
            }, 0);
             this.setState({OtherRoom:allRoom})
            
            var Sales2 = 0;
            var dailySales2 = Sales2 + this.state.OtherCash + this.state.OtherPOS + this.state.OtherTransfer + this.state.OtherRoom 
            this.setState({OtherTotalSales:dailySales2})
            
        })

        fetch(`${getRestaurantSales}`, {method:'GET'})
        .then((resp) => resp.json())    
        .then((data) => {
            var allPOS = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({RestPOS:allPOS})

            var allCash = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({RestCash:allCash})

            var allTransfer = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TransferAmount)
            }, 0);
            this.setState({RestTransfer:allTransfer})

            var allComp = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CompDebit)
            }, 0);
            this.setState({RestComplimentary:allComp})

            var allRoom = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.roomDebit)
            }, 0);
            this.setState({RestRoom:allRoom})
            
            var Sales3 = 0;
            var dailySales3 = Sales3 + this.state.RestCash + this.state.RestPOS + this.state.RestTransfer + this.state.RestRoom
            this.setState({RestTotalSales:dailySales3})
            
        })

        fetch(`${getBarNow}`, {method:'GET'})
        .then((resp) => resp.json())    
        .then((data) => {
            var allPOS = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({BarPOS:allPOS})

            var allCash = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({BarCash:allCash})

            var allTransfer = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TransferAmount)
            }, 0);
            this.setState({BarTransfer:allTransfer})

            var allComp = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CompDebit)
            }, 0);
            this.setState({BarComplimentary:allComp})

            var allRoom = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.roomDebit)
            }, 0);
            this.setState({BarRoom:allRoom})
            
            var Sales4 = 0;
            var dailySales4 = Sales4 + this.state.BarCash + this.state.BarPOS + this.state.BarTransfer + this.state.BarRoom
            this.setState({BarTotalSales:dailySales4})
            
        })

        fetch(`${getWorkDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({date:item.date})
                return 'ok'
            })
            
           
        })

        this.myTimer = setTimeout(() => {
            fetch(`${occupancyChart}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    allOccupied:data.map(item => item.roomStatus).filter(item=> item !=='green'&& item !=='black'),
                    allVacant:data.map(item => item.roomStatus).filter(item=> item ==='green'),
                    allCorporate:data.map(item => item.roomStatus).filter(item=> item ==='blue'),
                    allIndividual:data.map(item => item.roomStatus).filter(item=> item ==='blueviolet'),
                    allStaff:data.map(item => item.roomStatus).filter(item=> item ==='deeppink'),
                    allComplimentary:data.map(item => item.roomStatus).filter(item=> item ==='orange'),
                    allCheckout:data.map(item => item.roomStatus).filter(item=> item ==='black')
                })
                
            })

            fetch(`${guestDeposits}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                

                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({POS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({Cash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({Transfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({Complimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({Room:allRoom})
                
                var Sales = 0;
                var dailySales = Sales + this.state.Cash + this.state.POS + this.state.Transfer + this.state.Room
                this.setState({TotalSales:dailySales})
                
                })

            fetch(`${otherSales}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
            

                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({OtherPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({OtherCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({OtherTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({OtherComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({OtherRoom:allRoom})
                
                var Sales2 = 0;
                var dailySales2 = Sales2 + this.state.OtherCash + this.state.OtherPOS + this.state.OtherTransfer + this.state.OtherRoom
                this.setState({OtherTotalSales:dailySales2})
                
            })

            fetch(`${getRestaurantSales}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({RestPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({RestCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({RestTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({RestComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({RestRoom:allRoom})
                
                var Sales3 = 0;
                var dailySales3 = Sales3 + this.state.RestCash + this.state.RestPOS + this.state.RestTransfer + this.state.RestRoom
                this.setState({RestTotalSales:dailySales3})
                
            })

            fetch(`${getBarNow}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({BarPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({BarCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({BarTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({BarComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({BarRoom:allRoom})
                
                var Sales4 = 0;
                var dailySales4 = Sales4 + this.state.BarCash + this.state.BarPOS + this.state.BarTransfer + this.state.BarRoom
                this.setState({BarTotalSales:dailySales4})
                
            })

            
        },3000);

                       
                     
        
        this.myTimer = setInterval(() => {
            fetch(`${occupancyChart}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    allOccupied:data.map(item => item.roomStatus).filter(item=> item !=='green'&& item !=='black'),
                    allVacant:data.map(item => item.roomStatus).filter(item=> item ==='green'),
                    allCorporate:data.map(item => item.roomStatus).filter(item=> item ==='blue'),
                    allIndividual:data.map(item => item.roomStatus).filter(item=> item ==='blueviolet'),
                    allStaff:data.map(item => item.roomStatus).filter(item=> item ==='deeppink'),
                    allComplimentary:data.map(item => item.roomStatus).filter(item=> item ==='orange'),
                    allCheckout:data.map(item => item.roomStatus).filter(item=> item ==='black')
                })
                
            })

            fetch(`${guestDeposits}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                

                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({POS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({Cash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({Transfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({Complimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({Room:allRoom})
                
                var Sales = 0;
                var dailySales = Sales + this.state.Cash + this.state.POS + this.state.Transfer + this.state.Room
                this.setState({TotalSales:dailySales})
                
                })

            fetch(`${otherSales}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
            

                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({OtherPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({OtherCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({OtherTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({OtherComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({OtherRoom:allRoom})
                
                var Sales2 = 0;
                var dailySales2 = Sales2 + this.state.OtherCash + this.state.OtherPOS + this.state.OtherTransfer + this.state.OtherRoom
                this.setState({OtherTotalSales:dailySales2})
                
            })

            fetch(`${getRestaurantSales}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({RestPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({RestCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({RestTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({RestComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({RestRoom:allRoom})
                
                var Sales3 = 0;
                var dailySales3 = Sales3 + this.state.RestCash + this.state.RestPOS + this.state.RestTransfer + this.state.RestRoom
                this.setState({RestTotalSales:dailySales3})
                
            })

            fetch(`${getBarNow}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({BarPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({BarCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({BarTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({BarComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({BarRoom:allRoom})
                
                var Sales4 = 0;
                var dailySales4 = Sales4 + this.state.BarCash + this.state.BarPOS + this.state.BarTransfer + this.state.BarRoom
                this.setState({BarTotalSales:dailySales4})
                
            })

           
        },300000);


    }
}
export default NewDashboard;

