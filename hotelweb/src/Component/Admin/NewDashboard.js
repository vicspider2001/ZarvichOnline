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
import Adlogin from '../Adlogin';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
    
);


// Rooms Transactions Url //
const occupancyChart = "http://10.1.0.99:3333/getrmstatus";
const userName = "http://10.1.0.99:3333/adminUserInfo";
const otherSales = "http://10.1.0.99:3333/otherSalesPoints";
const guestDeposits = "http://10.1.0.99:3333/GetTmpRmDep";

// Restaurant Transactions Url //
const getRestaurantSales = "http://10.1.0.99:3333/restaurantSales"; 

// Bar Transactions Url //
const getBarNow = "http://10.1.0.99:3333/barSales"; 

// PoolBar Transactions Url //
const getPoolBarSales = "http://10.1.0.99:3333/poolbarSales"; 

// Club Transactions Url //
const getclubSales = "http://10.1.0.99:3333/clubSales"; 

// Refund Approvals Url 
// const getRefundApprovals = "http://192.168.8.102:3333/getHallReservation";

//restaurant tables//
const getTable = "http://10.1.0.99:3333/restTable";
const getTableID = "http://10.1.0.99:3333/restTable?resttableID=";

//Active work date//
const getWorkDate = "http://10.1.0.99:3333/getActive";

//bar table //
const getbarTable = "http://10.1.0.99:3333/barTable";
const getbarTableID = "http://10.1.0.99:3333/barTable?tableID=";

//PoolBar table //
const getPoolbarTable = "http://10.1.0.99:3333/poolbarTable";
const getPoolbarTableID = "http://10.1.0.99:3333/poolbarTable?tableID=";

//Club table //
const getClubTable = "http://10.1.0.99:3333/getclubTables";
const getClubTableID = "http://10.1.0.99:3333/getclubTables?tableID=";

//delete bar table
const putToBarTable = "http://10.1.0.99:3333/barTablePost";

//delete restaurant table
const postToTable = "http://10.1.0.99:3333/restaurantTablePost";

//delete Poolbar table
const putToPoolTable = "http://10.1.0.99:3333/poolbarTablePost";

//delete Club table
const putToClubTable = "http://10.1.0.99:3333/clubTablePost";
const roomstatusUrl = "http://10.1.0.99:3333/rmstatus2";
const roomsdataUrl = "http://10.1.0.99:3333/rooms?details=";
const checkINdataUrl = "http://10.1.0.99:3333/checkin?roomNumID=";
const StatusdataUrl = "http://10.1.0.99:3333/newRoomStat?wrtRmNum=";

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

            PoolTotalSales:0,
            PoolRoom:0,
            PoolComplimentary:0,
            PoolTransfer:0,
            PoolCash:0,
            PoolPOS:0,

            ClubTotalSales:0,
            ClubRoom:0,
            ClubComplimentary:0,
            ClubTransfer:0,
            ClubCash:0,
            ClubPOS:0,

            Gtotal:0,

            

            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',

            labels:['Rooms','Others','Restaurant','PoolBar','Inner Bar'],

            showRooms:false,
            showOthers:false,
            showRest:false,
            showPool:false,
            showClub:false,
            showInnerBar:false,

            resttables:'',
            selected:'',
            cost:'',
            bartables:'',
            poolbartables:'',
            Clubtables:'',

            roomNum:'',
            roomtypeName:'',

            resetid:'',
            resetroomNumbers:'',
            resetRoomStatus:'',
            resetroomtypeName:'',
            resetfname:'',
            resetlname:'',
            resetstatus:'',
            resetRefID:'',
            resetBillStatus:0,
            resetButtonCntrl:0


            

        };

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

    handlePoolClose(){
        this.setState({showPool:false})
    }

    handleClubClose(){
        this.setState({showClub:false})
    }

    handlePoolShow(){
        this.setState({showPool:true})
    }

    handleClubShow(){
        this.setState({showClub:true})
    }

    handleInnerBarClose(){
        this.setState({showInnerBar:false})
    }

    handleInnerBarShow(){
        this.setState({showInnerBar:true})
    }


    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
                       
        })

        fetch(`${roomsdataUrl}${event.target.value}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    roomtypeName:item.roomtypeName
                })
                return 'ok'
            });
                        
        })

    }

    handleChangeReset = (event) => {
        this.setState({
            [event.target.name]:event.target.value
                       
        })

        fetch(`${checkINdataUrl}${event.target.value}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    resetid:item._id,
                    resetroomNumbers:item.roomNumbers,
                    resetRoomStatus:item.roomStatus,
                    resetroomtypeName:item.roomtypeName,
                    resetfname:item.fname,
                    resetlname:item.lname,
                    resetstatus:item.status,
                    resetRefID:item.refID,
                    resetButtonCntrl:1
                    

                })
                return 'ok'
            });
                        
        })

        fetch(`${StatusdataUrl}${event.target.value}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    resetBillStatus:item.BillStatus,
                    
                })
                return 'ok'
            });
                        
        })

    }

    async RoomReset(){
        try{

            var roomStatus = {

                _id:`${this.state.roomNum}`,
                roomNumbers:`${this.state.roomNum}`,
                roomStatus: 'black',
                roomtypeName:`${this.state.roomtypeName}`,
                fname:'',
                lname:'',
                status:'',
                refID:'',
                BillStatus:0,

            }

            let result2 = fetch(`${roomstatusUrl}/${this.state.roomNum}`, {
                method:'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                 
                },
                body: JSON.stringify(
                    roomStatus
                )
        
            });

            console.log('result2> '+ result2)
            alert("Room " +this.state.roomNum +" Has Been Checked Out")

            this.setState({
                roomNum:'',
                roomtypeName:''
            })

        } catch(e) {
            console.log(e)
        }
    }

    async NowRoomReset(){
        try{

            var roomResetting = {

                _id:`${this.state.roomNum}`,
                roomNumbers:`${this.state.roomNum}`,
                roomStatus: `${this.state.resetRoomStatus}`,
                roomtypeName:`${this.state.resetroomtypeName}`,
                fname:`${this.state.resetfname}`,
                lname:`${this.state.resetlname}`,
                status:`${this.state.resetstatus}`,
                refID:`${this.state.resetRefID}`,
                BillStatus:`${this.state.resetBillStatus}`

            }

            let resetStatNow = fetch(`${roomstatusUrl}/${this.state.roomNum}`, {
                method:'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                 
                },
                body: JSON.stringify(
                    roomResetting
                )
        
            });

            console.log('resetStatNow> '+ resetStatNow)
            alert("Room " +this.state.roomNum +" Has Been Reset")

            this.setState({
                roomNum:'',
                roomtypeName:'',
                resetRoomStatus:'',
                resetroomtypeName:'',
                resetfname:'',
                resetlname:'',
                resetstatus:'',
                resetRefID:'',
                resetBillStatus:0,
                resetButtonCntrl:0

            })

        } catch(e) {
            console.log(e)
        }
    }

    
    async getTableR() {
          
        try {
            
            var tableID2 = sessionStorage.getItem('tableNumber2');
           
            fetch(`${getTableID}${tableID2}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        selected:item.selected,
                        cost:item.billCost
                       
                       
                    })
                    return 'ok'
                   
                })
                
            })

        } catch(e) {
            console.log(e)
        }

    }

    async getTableB() {
          
        try {
            
            var tableID2 = sessionStorage.getItem('tableNumber3');
           
            fetch(`${getbarTableID}${tableID2}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        selected:item.selected,
                        cost:item.billCost
                       
                       
                    })
                    return 'ok'
                   
                })
                
            })

        } catch(e) {
            console.log(e)
        }

    }

    async getTableP() {
          
        try {
            
            var tableID2 = sessionStorage.getItem('tableNumber3');
           
            fetch(`${getPoolbarTableID}${tableID2}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        selected:item.selected,
                        cost:item.billCost
                       
                       
                    })
                    return 'ok'
                   
                })
                
            })

        } catch(e) {
            console.log(e)
        }

    }

    async getTableC() {
          
        try {
            
            var tableID2 = sessionStorage.getItem('tableNumber3');
           
            fetch(`${getClubTableID}${tableID2}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        selected:item.selected,
                        cost:item.billCost
                       
                       
                    })
                    return 'ok'
                   
                })
                
            })

        } catch(e) {
            console.log(e)
        }

    }

    
       
    renderOders(data){
        
        if(data) {
            return data.map((item) =>{
               
                return(
                    <>
                        <tr key= {item.id}>
                            {/* <td className="table-light table-striped adjust texted8Nw">{item.id}</td> */}
                            <td className="table-light table-striped adjust texted8Nw">{item.meal}</td>
                            <td className="table-light table-striped adjust texted8Nw">{item.qty}</td>
                            <td className="table-light table-striped adjust texted8Nw"><NumberFormat value={item.mealPrice} thousandSeparator={true} displayType={"text"}/></td>
                            <td className="table-light table-striped adjust texted8Nw"><NumberFormat value={item.mealPrice*item.qty} thousandSeparator={true} displayType={"text"}/></td>
                        </tr>
                        
                    </>
                )
            })
        }
    }

    async deleteRest() {
          
        
        try {
            var tableID = sessionStorage.getItem('tableNumber2');
            
            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber2')
            }

            let result12 = await fetch(`${postToTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result12>  ' + result12)

            alert("Table Deleted Successfully")
            this.setState({selected:[]});
            this.setState({cost:0})
            
            sessionStorage.removeItem('tableNumber2')

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({resttables:data})
            })
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async deleteBar() {
          
        
        try {
            var tableID = sessionStorage.getItem('tableNumber3');
            
            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber3')
            }

            let result12 = await fetch(`${putToBarTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result12>  ' + result12)

            alert("Table Deleted Successfully")
            this.setState({selected:[]});
            this.setState({cost:0})
            
            sessionStorage.removeItem('tableNumber3')

            fetch(`${getbarTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({bartables:data})
            })
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async deletePoolBar() {
          
        
        try {
            var tableID = sessionStorage.getItem('tableNumber3');
            
            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber3')
            }

            let result12 = await fetch(`${putToPoolTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result12>  ' + result12)

            alert("Table Deleted Successfully")
            this.setState({selected:[]});
            this.setState({cost:0})
            
            sessionStorage.removeItem('tableNumber3')

            fetch(`${getPoolbarTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({poolbartables:data})
            })
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async deleteClub() {
          
        
        try {
            var tableID = sessionStorage.getItem('tableNumber3');
            
            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber3')
            }

            let result12 = await fetch(`${putToClubTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result12>  ' + result12)

            alert("Table Deleted Successfully")
            this.setState({selected:[]});
            this.setState({cost:0})
            
            sessionStorage.removeItem('tableNumber3')

            fetch(`${getClubTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({Clubtables:data})
            })
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    
    renderRestTables(data){
        if(data) {
            data.sort((a, b) => a.tableNum - b.tableNum);
           
            return data.map((item) => {
                if(item.billCost>0){
                    return(
                        <div key={item._id}>
                            <button className="btn btn-warning cartBtn3 alignroomsgreen2" onClick={() => {sessionStorage.setItem('tableNumber2', item.tableNum); this.getTableR()}}>
                                {item.tableNum}
                            </button>
                        </div>
                    )
                }
                else{
                    return null
                }
               
            })
        }
    }

    renderBarTables(data){
        if(data) {
            data.sort((a, b) => a.tableNum - b.tableNum);
           
            return data.map((item) => {
                if(item.billCost>0){
                    return(
                        <div key={item._id}>
                            <button className="btn btn-warning cartBtn3 alignroomsgreen2" onClick={() => {sessionStorage.setItem('tableNumber3', item.tableNum); this.getTableB()}}>
                                {item.tableNum}
                            </button>
                        </div>
                    )
                }
                else{
                    return null
                }
               
            })
        }
    }

    renderPoolBarTables(data){
        if(data) {
            data.sort((a, b) => a.tableNum - b.tableNum);
           
            return data.map((item) => {
                if(item.billCost>0){
                    return(
                        <div key={item._id}>
                            <button className="btn btn-warning cartBtn3 alignroomsgreen2" onClick={() => {sessionStorage.setItem('tableNumber3', item.tableNum); this.getTableP()}}>
                                {item.tableNum}
                            </button>
                        </div>
                    )
                }
                else{
                    return null
                }
               
            })
        }
    }

    renderClubTables(data){
        if(data) {
            data.sort((a, b) => a.tableNum - b.tableNum);
           
            return data.map((item) => {
                if(item.billCost>0){
                    return(
                        <div key={item._id}>
                            <button className="btn btn-warning cartBtn3 alignroomsgreen2" onClick={() => {sessionStorage.setItem('tableNumber3', item.tableNum); this.getTableC()}}>
                                {item.tableNum}
                            </button>
                        </div>
                    )
                }
                else{
                    return null
                }
               
            })
        }
    }

    resetRooms(){
        return (
            <>
                <center>

                    <div className="mt-4">
                        <center>
                            <input type="number" className="form-control mb-3 formsize" require placeholder = "Enter Room Num"name="roomNum" value={this.state.roomNum} onChange={this.handleChange}/>
                        </center>
                    </div>
                    <div>
                        <button className="btn btn-primary mb-3" onClick={ ()=> {this.RoomReset()}}>Check Out</button>
                    </div>
                </center>
                

            </>
            
        )
        
        
    }

    resetRoomsNow(){
        return (
            <>
                <center>

                    <div className="mt-4">
                        <center>
                            <input type="number" className="form-control mb-3 formsize" require placeholder = "Enter Room Num"name="roomNum" value={this.state.roomNum} onChange={this.handleChangeReset}/>
                        </center>
                    </div>
                    <div>
                        <button disabled={this.state.resetButtonCntrl===0} className="btn btn-primary mb-3" onClick={ ()=> {this.NowRoomReset()}}>Reset</button>
                    </div>
                </center>
                

            </>
            
        )
        
        
    }


    render(){
        console.log (">>> Inside Render", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Adlogin/>
                </>
            )

        }

        var count=this.state.allOccupied;
        if (count!=='green'){
            var result = count.length;
        }

        var labels=this.state.labels;

        const data = {
            labels:labels,
            datasets: [
              {
                
                data: [this.state.TotalSales, this.state.OtherTotalSales, this.state.RestTotalSales, this.state.PoolTotalSales, this.state.ClubTotalSales, this.state.BarTotalSales,],
                backgroundColor: ['chartreuse', 'cornflowerblue', 'cyan', 'hotpink','lightseagreen',]
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

       
        return(
            <>
                
                <div className="Dashbackground">
                    
                    <div className="heading">
                        
                        <h5 type="button" onClick={()=>this.props.history.push('/AppMenu')}>Dashboard</h5>
                        
                        
                        
                    </div>
                    
                    <div className="miniDash">
                        <Button variant="Danger" className="DashSheet1" type="button" onClick={()=>this.handleRoomShow()}>
                            
                            <p className="mobileText">Rooms <span className='placeTxt'>Occupied: {result}</span>: <NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></p>
                           
                            
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
                        <Button variant="Danger" className="DashSheet5" type="button" onClick={()=>this.handlePoolShow()}> 
                           
                            <p className="mobileText">Pool Bar: <NumberFormat value={this.state.PoolTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                           
                            
                        </Button>

                        <Button variant="Danger" className="DashSheet6" type="button" onClick={()=>this.handleClubShow()}> 
                           
                            <p className="mobileText">Club: <NumberFormat value={this.state.ClubTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                           
                            
                        </Button>

                        <Button variant="Danger" className="DashSheet7"> 
                            <Card.Title>
                                <p className="mobileText">Total: <NumberFormat value={parseInt(this.state.PoolTotalSales) + parseInt(this.state.ClubTotalSales) + parseInt(this.state.BarTotalSales) + parseInt(this.state.RestTotalSales) + parseInt(this.state.OtherTotalSales) + parseInt(this.state.TotalSales)}thousandSeparator={true}displayType={"text"}/></p>
                            </Card.Title>
                            
                        </Button>
                    </div>
                    

                    <div className="chart">
                        <Bar 
                            options={options} 
                            data={data} 
                        />
                        
                    </div>

                    <div className='restTab'>

                       <div>
                            <h5 style={{color:'silver'}}>Table Manager</h5>
                            <table className="table table-hover">
                                <thead className="table-warning">
                                    <tr>
                                        {/* <th className="adjust2">ID</th> */}
                                        <th className="adjust2">Menu</th>
                                        <th className="adjust2">Qty</th>
                                        <th className="adjust2">Price(=N)</th>
                                        <th className="adjust2">Amount(=N)</th>
                                    
                                        
                                    </tr>
                                </thead>
                                <tbody className="table table-hover tableheight">
                                    {this.renderOders(this.state.selected)}
                                    
                                </tbody>
                                
                                
                            
                            </table>
                        
                        </div>
                        <div className="butncontrl">
                                    
                            <button className="btn btn-primary cartBtn4new" onClick={() => {this.setState({selected:'',cost:''})}}>
                                Close
                            </button>
                        
                            <button className="btn btn-danger cartBtn4new" onClick={() => this.deleteRest()}>
                                Void Rest
                            </button>
                        
                            <button className="btn btn-danger cartBtn4new" onClick={() => this.deleteBar()}>
                                Void Bar
                            </button>

                            <button className="btn btn-danger cartBtn4new" onClick={() => this.deletePoolBar()}>
                                Void Pool
                            </button>

                            <button className="btn btn-danger cartBtn4new" onClick={() => this.deleteClub()}>
                              Void  Club
                            </button>
                            
                        </div>
                        <br/>

                        <Accordion defaultActiveKey="">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Active Restaurant Tables</Accordion.Header>
                                <Accordion.Body style={{backgroundColor:'rgb(23, 23, 71)'}}>
                                    <div className='setHeight'>
                                        {this.renderRestTables(this.state.resttables)}
                                    </div>
                                    
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Active Bar Tables</Accordion.Header>
                                <Accordion.Body style={{backgroundColor:'rgb(23, 23, 71)'}}>
                                    <div className='setHeight'>
                                        {this.renderBarTables(this.state.bartables)}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Active PoolBar Tables</Accordion.Header>
                                <Accordion.Body style={{backgroundColor:'rgb(23, 23, 71)'}}>
                                    <div className='setHeight'>
                                        {this.renderPoolBarTables(this.state.poolbartables)}
                                    </div>
                                    </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Active Club Tables</Accordion.Header>
                                <Accordion.Body style={{backgroundColor:'rgb(23, 23, 71)'}}>
                                    <div className='setHeight'>
                                        {this.renderPoolBarTables(this.state.Clubtables)}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Force Check Out</Accordion.Header>
                                <Accordion.Body style={{backgroundColor:'rgb(23, 23, 71)'}}>
                                    <div className='setHeight'>
                                        {this.resetRooms()}
                                    </div>
                                    
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Force Reset Rooms</Accordion.Header>
                                <Accordion.Body style={{backgroundColor:'rgb(23, 23, 71)'}}>
                                    <div className='setHeight'>
                                        {this.resetRoomsNow()}
                                    </div>
                                    
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                        <br/>

                        {/* <div className='mb-5 setHeight'>
                            <h5 className="texted2" style={{color:'silver'}}>Active Restaurant Tables</h5>
                            {this.renderRestTables(this.state.resttables)}
                        </div> */}
                        
                        {/* <div className='mb-5 setHeight'>
                            <h5 className="texted2" style={{color:'silver'}}>Active Bar Tables</h5>
                            {this.renderBarTables(this.state.bartables)}
                        </div> */}
                        <div className='row'>
                            <center>
                                <button className="btn btn-warning mb-3 setbutton col-3" onClick={ ()=> {this.props.history.push('/AppMenu')}}>App Menu</button>
                                <button className="btn btn-warning mb-3 space setbutton col-3" onClick={ ()=> {this.props.history.push('/EndOfDay')}}>All Reports</button>
                                <button className="btn btn-warning mb-3 space setbutton col-3" onClick={ ()=> {this.props.history.push('/StoreReport')}}>Stock Movement</button>
                                
                            </center>
                            
                        </div>
                        <div className='row'>
                            <center>
                                <button className="btn btn-warning mb-3 space setbutton col-4" onClick={ ()=> {this.props.history.push('/CashCollection')}}>Sales Summary</button>
                                <button className="btn btn-warning mb-3 space setbutton col-4" onClick={ ()=> {this.props.history.push('/PoolBarDailySales')}}>PoolBar Report</button>
                                <button className="btn btn-warning mb-3 space setbutton col-4" onClick={ ()=> {this.props.history.push('/ClubDailySales')}}>Club Report</button>
                                <button className="btn btn-danger mb-3 space setbutton col-4" onClick={ ()=> {this.props.history.push('/BillingMenu')}}>Work Date</button>
                                <button className="btn btn-danger mb-3 space setbutton col-4" onClick={ ()=> this.logout()}> Log Out</button>
                            </center>
                            
                        </div>
                        
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

                <Offcanvas show={this.state.showPool}>
                    
                    <div className="missionvission">
                        <Offcanvas.Body>
                            <div className="size13">
                                <CloseButton onClick={()=>this.handlePoolClose()}/>
                            </div>
                            <div className="missionStatement">
                                    
                                <Card.Title className="mb-3">
                                    Pool Bar Payment Analysis
                                </Card.Title>
                                <hr/>
                                <Card.Subtitle className="mb-3 text-muted editsub">
                                   {transDate}
                                </Card.Subtitle>
                                <Card.Text className="mb-3 editsub">
                                    <div className="tableBody">
                                                        
                                        <p className="adjust5">Cash: <NumberFormat value={this.state.PoolCash}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">POS: <NumberFormat value={this.state.PoolPOS}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Transfer: <NumberFormat value={this.state.PoolTransfer}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Room: <NumberFormat value= {this.state.PoolRoom}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Comp.: <NumberFormat value= {this.state.PoolComplimentary}thousandSeparator={true}displayType={"text"}/></p> 
                                        <p className="adjust5">Total: <NumberFormat value= {this.state.PoolTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                                                
                                    </div>
                                </Card.Text>
                                    
                              
                                <br/><br/>
                                
                                        
                            </div>
                            
                        </Offcanvas.Body>
                    </div>
                    
                </Offcanvas>

                <Offcanvas show={this.state.showClub}>
                    
                    <div className="missionvission">
                        <Offcanvas.Body>
                            <div className="size13">
                                <CloseButton onClick={()=>this.handleClubClose()}/>
                            </div>
                            <div className="missionStatement">
                                    
                                <Card.Title className="mb-3">
                                    Club Payment Analysis
                                </Card.Title>
                                <hr/>
                                <Card.Subtitle className="mb-3 text-muted editsub">
                                   {transDate}
                                </Card.Subtitle>
                                <Card.Text className="mb-3 editsub">
                                    <div className="tableBody">
                                                        
                                        <p className="adjust5">Cash: <NumberFormat value={this.state.PoolCash}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">POS: <NumberFormat value={this.state.PoolPOS}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Transfer: <NumberFormat value={this.state.PoolTransfer}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Room: <NumberFormat value= {this.state.PoolRoom}thousandSeparator={true}displayType={"text"}/></p>
                                        <p className="adjust5">Comp.: <NumberFormat value= {this.state.PoolComplimentary}thousandSeparator={true}displayType={"text"}/></p> 
                                        <p className="adjust5">Total: <NumberFormat value= {this.state.PoolTotalSales}thousandSeparator={true}displayType={"text"}/></p>
                                                
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

                
        fetch(`${getPoolBarSales}`, {method:'GET'})
        .then((resp) => resp.json())    
        .then((data) => {
            var allPOS = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({PoolPOS:allPOS})

            var allCash = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({PoolCash:allCash})

            var allTransfer = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TransferAmount)
            }, 0);
            this.setState({PoolTransfer:allTransfer})

            var allComp = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CompDebit)
            }, 0);
            this.setState({PoolComplimentary:allComp})

            var allRoom = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.roomDebit)
            }, 0);
            this.setState({PoolRoom:allRoom})
            
            var Sales5 = 0;
            var dailySales5 = Sales5 + this.state.PoolCash + this.state.PoolPOS + this.state.PoolTransfer + this.state.PoolRoom
            this.setState({PoolTotalSales:dailySales5})
            
        })

        fetch(`${getclubSales}`, {method:'GET'})
        .then((resp) => resp.json())    
        .then((data) => {
            var allPOS = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({ClubPOS:allPOS})

            var allCash = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({ClubCash:allCash})

            var allTransfer = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TransferAmount)
            }, 0);
            this.setState({ClubTransfer:allTransfer})

            var allComp = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CompDebit)
            }, 0);
            this.setState({ClubComplimentary:allComp})

            var allRoom = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.roomDebit)
            }, 0);
            this.setState({ClubRoom:allRoom})
            
            var Sales6 = 0;
            var dailySales6 = Sales6 + this.state.ClubCash + this.state.ClubPOS + this.state.ClubTransfer + this.state.ClubRoom
            this.setState({ClubTotalSales:dailySales6})
            
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

            var AllSales = parseInt(this.state.TotalSales)+parseInt(this.state.OtherTotalSales);
            this.setState({ReceptionSales:AllSales})

           
        },1000);

        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })

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

                
            fetch(`${getPoolBarSales}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({PoolPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({PoolCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({PoolTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({PoolComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({PoolRoom:allRoom})
                
                var Sales5 = 0;
                var dailySales5 = Sales5 + this.state.PoolCash + this.state.PoolPOS + this.state.PoolTransfer + this.state.PoolRoom
                this.setState({PoolTotalSales:dailySales5})
                
            })

            fetch(`${getclubSales}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({ClubPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({ClubCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({ClubTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({ClubComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({ClubRoom:allRoom})
                
                var Sales6 = 0;
                var dailySales6 = Sales6 + this.state.ClubCash + this.state.ClubPOS + this.state.ClubTransfer + this.state.ClubRoom
                this.setState({ClubTotalSales:dailySales6})
                
            })
        },20000);

        

        fetch(`${getWorkDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({date:item.date})
                return 'ok'
            })
            
           
        })

        fetch(`${getTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({resttables:data})
        });

        fetch(`${getbarTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({bartables:data})
        });

        fetch(`${getPoolbarTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({poolbartables:data})
        });

        fetch(`${getClubTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({Clubtables:data})
        });

        this.myTimer = setInterval(() => {
             fetch(`${getWorkDate}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
            data.map((item)=>{
                this.setState({date:item.date})
                return 'ok'
            })

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({resttables:data})
            });

            fetch(`${getbarTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({bartables:data})
            });

            fetch(`${getPoolbarTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({poolbartables:data})
            });

            fetch(`${getClubTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({Clubtables:data})
            });

        })
            
        },1000);
        
        
        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
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

                
        fetch(`${getPoolBarSales}`, {method:'GET'})
        .then((resp) => resp.json())    
        .then((data) => {
            var allPOS = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({PoolPOS:allPOS})

            var allCash = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({PoolCash:allCash})

            var allTransfer = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TransferAmount)
            }, 0);
            this.setState({PoolTransfer:allTransfer})

            var allComp = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CompDebit)
            }, 0);
            this.setState({PoolComplimentary:allComp})

            var allRoom = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.roomDebit)
            }, 0);
            this.setState({PoolRoom:allRoom})
            
            var Sales5 = 0;
            var dailySales5 = Sales5 + this.state.PoolCash + this.state.PoolPOS + this.state.PoolTransfer + this.state.PoolRoom
            this.setState({PoolTotalSales:dailySales5})
            
        })

        fetch(`${getclubSales}`, {method:'GET'})
        .then((resp) => resp.json())    
        .then((data) => {
            var allPOS = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({ClubPOS:allPOS})

            var allCash = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({ClubCash:allCash})

            var allTransfer = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TransferAmount)
            }, 0);
            this.setState({ClubTransfer:allTransfer})

            var allComp = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CompDebit)
            }, 0);
            this.setState({ClubComplimentary:allComp})

            var allRoom = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.roomDebit)
            }, 0);
            this.setState({ClubRoom:allRoom})
            
            var Sales6 = 0;
            var dailySales6 = Sales6 + this.state.ClubCash + this.state.ClubPOS + this.state.ClubTransfer + this.state.ClubRoom
            this.setState({ClubTotalSales:dailySales6})
            
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

            var AllSales = parseInt(this.state.TotalSales)+parseInt(this.state.OtherTotalSales);
            this.setState({ReceptionSales:AllSales})

           
        },1000);

        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })

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

                
            fetch(`${getPoolBarSales}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({PoolPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({PoolCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({PoolTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({PoolComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({PoolRoom:allRoom})
                
                var Sales5 = 0;
                var dailySales5 = Sales5 + this.state.PoolCash + this.state.PoolPOS + this.state.PoolTransfer + this.state.PoolRoom
                this.setState({PoolTotalSales:dailySales5})
                
            })

            fetch(`${getclubSales}`, {method:'GET'})
            .then((resp) => resp.json())    
            .then((data) => {
                var allPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POSAmount)
                }, 0);
                this.setState({ClubPOS:allPOS})

                var allCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CashAmount)
                }, 0);
                this.setState({ClubCash:allCash})

                var allTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.TransferAmount)
                }, 0);
                this.setState({ClubTransfer:allTransfer})

                var allComp = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.CompDebit)
                }, 0);
                this.setState({ClubComplimentary:allComp})

                var allRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.roomDebit)
                }, 0);
                this.setState({ClubRoom:allRoom})
                
                var Sales6 = 0;
                var dailySales6 = Sales6 + this.state.ClubCash + this.state.ClubPOS + this.state.ClubTransfer + this.state.ClubRoom
                this.setState({ClubTotalSales:dailySales6})
                
            })
        },20000);

        

        fetch(`${getWorkDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({date:item.date})
                return 'ok'
            })
            
           
        })

        fetch(`${getTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({resttables:data})
        });

        fetch(`${getbarTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({bartables:data})
        });

        fetch(`${getPoolbarTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({poolbartables:data})
        });

        fetch(`${getClubTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({Clubtables:data})
        });

        this.myTimer = setInterval(() => {
             fetch(`${getWorkDate}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
            data.map((item)=>{
                this.setState({date:item.date})
                return 'ok'
            })

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({resttables:data})
            });

            fetch(`${getbarTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({bartables:data})
            });

            fetch(`${getPoolbarTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({poolbartables:data})
            });

            fetch(`${getClubTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({Clubtables:data})
            });

        })
            
        },1000);
        
        
        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })

        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })
            
        },1000);
            
        


    }
}
export default NewDashboard;

