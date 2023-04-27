import React, { Component } from 'react';
import Billinglogin from '../../Billinglogin';
import '../Reception.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';





const checkInDataUrl = "http://10.1.0.99:3333/getrmstatus";
const userName = "http://10.1.0.99:3333/billingUserInfo";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";





class OwingGuests extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside CashConstructor",props)
        this.state = {
            RoomSales:'',
            date:new Date(),
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            shift:'',
            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:''
            
        };
        

    }
    
    
    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    cleanup(){
        this.setState({
            RoomSales:'',
            
        })
    }
    
    renderRoomSales=(data)=>{
        if(data){
            return data.map((item)=>{
                data.sort((a, b) => a.date - b.date);
                if(item.fname!==''){
                    var defaultdate = moment(item.date).format('MMM DD YYYY');
                    return(
                        <>
                            <tr key= {item._id}>
                                
                                <td className="table-light table-striped adjust2">{defaultdate}</td>
                                <td className="table-light table-striped adjust2">{item.roomNumbers}</td>
                                <td className="table-light table-striped adjust2">{item.fname} {item.lname}</td>
                                <td className="table-light table-striped adjust2">{item.roomtypeName}</td>
                                <td className="table-light table-striped adjust2"><NumberFormat value={item.BillStatus}thousandSeparator={true}displayType={"text"}/></td>
                                
                            </tr>
                            
                        </>
                    )
                }
                else{
                    return null
                }
                
               
            })
            
        }
           
    }

    
    render() {
        console.log (">>> Inside Cashdetails", this.state)
       
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
                    <h5>Guests Balance Report</h5><br/>
                    
                </center>
                
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust50">Date</th>
                            <th className="adjust50">Room Number</th>
                            <th className="adjust50">Names</th>
                            <th className="adjust50">Room Type</th>
                            <th className="adjust50">Guest Balance (NGN)</th>
                            
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderRoomSales(this.state.RoomSales)}
                       
                    </tbody>
                </table>
                
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

        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })

        fetch(`${checkInDataUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({RoomSales:data});
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


export default OwingGuests;