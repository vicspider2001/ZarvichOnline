import React, { Component } from 'react';
import '../Reception.css';
import moment from 'moment';
import FLogin from '../../FLogin';


const getroomchangereport = "http://10.1.0.99:3333/getRoomChangeReason";
const userName = "http://10.1.0.99:3333/fofUserInfo";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";


class RoomChangeReport extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside ROConstructor")

        this.state = {
            roomchangereportdata:'',
            CountRooms:'',
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

    renderRoomChReport(data){
        if (data){
            data.sort((a, b) => a.OldRoomNum - b.OldRoomNum);
            return data.map((item) => {
                var reportdate = moment(item.date).format('YYYY-DD-MMM')
                
                return(
                    <>
                        <tr key= {item._id}>
                            <td className="table-light table-striped adjust2">{reportdate}</td>
                            <td className="table-light table-striped adjust2">{item.OldRoomNum}</td>
                            <td className="table-light table-striped adjust2">{item.NewRoomNum}</td>
                            <td className="table-light table-striped adjust2">{item.Reason}</td>
                                    
                        </tr>
                    </>
                )
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
                    <center><h5>Room Change Report</h5></center>
                    <br/>
                    <table className="table table-hover">
                    
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust5">Date</th>
                                <th className="adjust5">Old Room</th>
                                <th className="adjust5">New Room</th>
                                <th className="adjust5">Reason</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            {this.renderRoomChReport(this.state.roomchangereportdata)}
                        
                        </tbody>
                        <br/>
                    
                    </table>
                    <div>
                        <div>
                            <p><span className="textSize30">Room Change Summary:  No. of Rooms Changed:</span><span className="textSize31">   {this.state.counted}</span></p>
                          
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
        
        fetch(`${getroomchangereport}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.setState({
                roomchangereportdata:data,
                CountRooms:data.map(item => item.NewRoomNum).filter(item=> item)
               
            })
            var changedRooms=this.state.CountRooms;
            var changed = changedRooms.length;
            this.setState({counted:changed});
            
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
        
        
    }
}

export default RoomChangeReport;