import React, { Component } from 'react';
import '../Reception.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import FLogin from '../../FLogin';


const occuppancyUrl = "http://10.1.0.99:3333/checkedout";
const userName = "http://10.1.0.99:3333/fofUserInfo";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";



class RoomOccupancy extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside ROConstructor")

        this.state = {
            checkoutData:'',
            total:'',
            counted:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:''
            
        }

    }

    rendercheckout(data){
        if (data){
            data.sort((a, b) => a.roomNumbers - b.roomNumbers);
            return data.map((item) => {
                var arrDt = moment(item.arrivalDate).format('YYYY-DD-MMM')
                var depDt = moment(item.departureDate).format('YYYY-DD-MMM')
                if(depDt===sessionStorage.getItem('chkOutDate')){
                    return(
                        <>
                            <tr key= {item._id}>
                                <td className="table-light table-striped adjust2">{item.title}. {item.fname} {item.lname}</td>
                                <td className="table-light table-striped adjust2">{item.roomNumbers}</td>
                                <td className="table-light table-striped adjust2">{item.roomtypeName}</td>
                                <td className="table-light table-striped adjust20"><NumberFormat value= {item.roomRate}thousandSeparator={true}displayType={"text"}/></td>
                                <td className="table-light table-striped adjust2">{item.discounType}</td>
                                <td className="table-light table-striped adjust20"><NumberFormat value= {item.discountAmount}thousandSeparator={true}displayType={"text"}/></td>
                                <td className="table-light table-striped adjust20"><NumberFormat value= {item.dailyRate}thousandSeparator={true}displayType={"text"}/></td>
                                <td className="table-light table-striped adjust2">{arrDt}</td>
                                <td className="table-light table-striped adjust2">{depDt}</td>
                                        
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
        console.log(">>> Inside ROtrender", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        var rooms = this.state.total;
        var occuppied = rooms.length;
        
        return (
            <>
                <div className="container">
                    <div>
                        <img src= "https://i.ibb.co/sHNG07v/logo-5c.png" className="alignImg2" style={{width:"100px", height:"70px"}} alt="companylogo"/>
                    </div>
                    <center>
                        <h6>{this.state.Hotelname}</h6>
                        <p className="textSize">{this.state.Hoteladdress}</p>
                        <p className="textSize">{this.state.Hotelphone}</p>

                    </center>
                    <br/>
                    <center><h5>Daily Check Out Report</h5></center>
                    <center><p className="textSize">As at {sessionStorage.getItem('chkOutDate')}</p></center>
                    <br/>
                    <table className="table table-hover">
                    
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust5">Names</th>
                                <th className="adjust5">Room Num</th>
                                <th className="adjust5">Room Type</th>
                                <th className="adjust5">Room Rate(NGN)</th>
                                <th className="adjust5">Discount Type</th>
                                <th className="adjust5">Discount Amount</th>
                                <th className="adjust5">Daily Rate(NGN)</th>
                                <th className="adjust5">Arrival Date</th>
                                <th className="adjust5">Departure Date</th>
                                
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            {this.rendercheckout(this.state.checkoutData)}
                        
                        </tbody>
                        <br/>
                    
                    </table>
                    <div className="row">
                        <h6>Check Out Summary:</h6>
                        <hr/>
                        <div className="col-4">
                            <p><span className="textSize30">Total Check Out Rooms:</span><span className="textSize31"> {occuppied} Rooms</span></p>
                        </div>
                        
                        <hr/>
                    </div>

                    <center>
                        <button className="btn btn-warning printing" onClick={ () => window.print()}>Print</button>
                        <button className="btn btn-danger printing space" onClick={ () => this.props.history.push('/ReceptionMenu')}>Close</button>
                    </center>
                   

                </div>
            </>
        );
    }

    async componentDidMount() {
        console.log (">>> Inside ROdidMount")
        fetch(`${occuppancyUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.setState({
                checkoutData:data,
                total:data.map(item => item._id).filter(item=> item) ,
               
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

        //var out = sessionStorage.getItem('chkOutDate');
        
        //fetch(`${dailycheckoutUrl}${out}`, {method:'GET'})
        //.then((res) => res.json())
        //.then((data) =>{
           // this.setState({
              //  checkoutData:data,
               
            //})
            
        //})
        
       

    }
}

export default RoomOccupancy;