import React,{Component} from 'react';
import './Reception.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer3 from '../Footer3';
import FLogin from '../FLogin';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const roomchartUrl = "http://10.1.0.99:3333/getrmstatus";
const checkinguestUrl = "http://10.1.0.99:3333/checkin?guest=";
const userName = "http://10.1.0.99:3333/fofUserInfo";
const getWorkDate = "http://10.1.0.99:3333/getActive";

class RoomChart extends Component {

    constructor(props) {
        super(props);
        console.log(">>>Inside RMConstructor")

        this.state={
            roomchart:'',
            guestrecord:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            transactionDatex:''

        }

    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    renderRoomchart=((data)=>{
        
        if (data){
            return data.map((item) =>{
                data.sort((a, b) => a.roomNumbers - b.roomNumbers);
                if(item.fname||item.lname||item.roomStatus==="black"||item.roomStatus!=='green'){
                    return(
                        <>
                            <Link to={`/guestForm/${item.roomNumbers}`} key={item.roomNumbers}>
                                <div className="card alignroomsgreen" style={{backgroundColor:`${item.roomStatus}`}}>
                                    <div className="card-body top">
                                        <h5 className="card-title">{item.roomNumbers}</h5>
                                        <h6 className="card-subtitle mb-2 size">{item.fname} {item.lname}</h6>
                                        <h6 className="card-subtitle mb-2 size2">{item.roomtypeName}</h6>
                                    </div>
                                </div>
                            </Link>
                        </>
                    )
                    
                }

                
                else{
                    return(
                        <>
                            <Link to={`/form/${item.roomNumbers}`} key={item.roomNumbers}>
                                <div className="card alignroomsgreen" style={{backgroundColor:`${item.roomStatus}`}}>
                                    <div className="card-body top">
                                        <h5 className="card-title">{item.roomNumbers}</h5>
                                        <h6 className="card-subtitle mb-2 size">{item.fname} {item.lname}</h6>
                                        <h6 className="card-subtitle mb-2 size2">{item.roomtypeName}</h6>
                                    </div>
                                </div>
                            </Link>
                        </>
                    )
                }
                
                   
            })
        }
        
    }) 
    

    render(){
        console.log(">>> Inside RMrender", this.state)
        var trDate = moment(this.state.transactionDatex).format('MMM DD YYYY');
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        return(
            <>
                <Footer3/>
                
                <div className="pagebody12">
                    <br/>
                    {this.renderRoomchart(this.state.roomchart)}
                </div>

                
                
                <center>
                    <div className="pagebody2">
                        <center><h6 style={{color:'yellow'}}>Active Work Date is: {trDate}</h6></center>
                        <div className="space">
                            <br/>
                            
                            <button className="btn btn-danger gap6" onClick={ () => this.props.history.push('./Reservation')}>Reservation</button>
                            <button disabled='true' className="btn btn-danger gap6" onClick={ () => this.props.history.push('./HallHire')}>Hall Reservation</button>
                            <button className="btn btn-danger gap6" onClick={ () => this.props.history.push('./Group')}>Register Group</button>
                            <button className="btn btn-danger gap6" onClick={ () => this.props.history.push('./ReceptionMenu')}>Reception Reports</button>
                            {/* <button className="btn btn-warning gap" onClick={ ()=> {this.props.history.push('/AppMenu')}}>App Menu</button> */}
                            <button className="btn btn-warning gap6" onClick={ ()=> {this.props.history.push('/BillingMenu')}}>Goto Billing</button>
                            <button className="btn btn-success gap6" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>    
                            
                            
                        </div>
                        <div className="row mt-3">
                            <div className="col-3">
                                <h6 style = {{color:'purple',marginLeft:'880px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                            </div>
                            <div className="col-3">
                                <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                            </div>
                        </div>
                    </div>
                    
                
                </center>
                
                
                
               
                
            </>
        )
        
        
    }

    async componentDidMount(){
        
        console.log (">>> Inside RMdidMount")
        const response = await axios.get(`${roomchartUrl}`)
        const resp = await axios.get(`${checkinguestUrl}`)
        this.setState({roomchart:response.data, guestrecord:resp.data})
      
        this.myTimer = setInterval(() => {
            console.log (">>> Inside RMdidMount")
            
            fetch(`${roomchartUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({roomchart:data});
                
            })

            fetch(`${checkinguestUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({guestrecord:data});
                
            })

        },30000);

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
        },1000);

        await fetch(`${getWorkDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({transactionDatex:item.date})
                return 'ok'
            })
            
           
        })

        this.myTimer = setInterval(() => {
            fetch(`${getWorkDate}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({transactionDatex:item.date})
                    return 'ok'
                })
                
            
            })
            
        },1000);
    }


}
export default RoomChart;