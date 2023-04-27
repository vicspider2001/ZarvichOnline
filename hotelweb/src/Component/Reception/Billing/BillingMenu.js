import React,{Component} from 'react';
import '../Reception.css';
import Footer3 from '../../Footer3';
import Billinglogin from '../../Billinglogin';
import {Modal} from 'react-responsive-modal';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';





const roomchartUrl = "http://10.1.0.99:3333/getrmstatus";
const checkinguestUrl = "http://10.1.0.99:3333/checkin?guest=";
const postRmChrgToRooms = "http://10.1.0.99:3333/postRmCharges";
const getGlobalChrgesUrl = "http://10.1.0.99:3333/globalRmChrges?getRef=";
const getFirstNight = "http://10.1.0.99:3333/getFirstNite?getRefID=";
const delGlobalChrgesUrl = "http://10.1.0.99:3333/delCharges";
const userName = "http://10.1.0.99:3333/billingUserInfo";
const globalrmChrgUrl = "http://10.1.0.99:3333/globalRmPost";
const postDailyOccuppancy = "http://10.1.0.99:3333/postOccuppancy";
const delAWD = "http://10.1.0.99:3333/delworkdate";
const postActiveDate = "http://10.1.0.99:3333/postActive";
const getWorkDate = "http://10.1.0.99:3333/getActive";



class BillingMenu extends Component {

    constructor(props) {
        super(props);
        console.log(">>>Inside RMConstructor", props)

        this.state={
            roomchart:'',
            guestrecord:'',
            roomCharge:'',
            GstID:'',
            arrivDt:'',
            dailyR:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            Time:'',
            Day:'',
            pass9:'',
           
            pword:false,
            pword9:false,
            wdate:false,
            activeWorkDate:'',
            transactionDatex:'',
            TodayOccupancy:''
            
        };
        this.checkinhandleChange = this.checkinhandleChange.bind(this);

    }

    checkinhandleChange(date) {
        this.setState({
            activeWorkDate: date
        });
    }

    rendercheckinDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.activeWorkDate}
                    onChange={this.checkinhandleChange}
                    minDate={new Date()}
                    maxDate={addDays(new Date(),1)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    placeholderText='Select Work Date'
                   
                   
                                        
                    
                />
            </div>
        )
    }
    onOpenPword9(){
        this.setState({
            pword9:true
        })
    }
    onClosePword9(){
        this.setState({
            pword9: false
            
        })
        
    }

    AllowRefund9(){
        if(this.state.pass9==='Deglen2019'){
            this.onOpenwdate()
            this.onClosePword9()
           

        }
        else{
            alert('Access Denied')
        }
    }


    onOpenPword(){
       
        fetch(`${checkinguestUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            
            this.setState({
                TodayOccupancy:data,
                
            });
            
        });

        this.myTimer = setTimeout(() => {
            if(this.state.TodayOccupancy.length>0){
                this.setState({
                    pword: true
    
                });
            }
            else{
                return(
                    <>
                        <Spinner animation="border" variant="primary" />
                        <Spinner animation="border" variant="danger" />
                        <Spinner animation="border" variant="warning" />
                    </>
                )
            }
            
        },1000);


       
    }

    onOpenwdate(){
        this.setState({
             wdate: true,
             pass9:''
             
         })
             
     }

    onClosePword(){
        this.setState({
             pword: false
         })
             
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    
    }

    onClosewdate(){
        this.setState({
            wdate: false
         })
             
    }

    AllowRefund(){
        
        this.onClosePword();
        this.dailyOccupancy();
        this.globalRmCharge();
        
    }

    ExecuteWDate(){
        
        this.onClosewdate();
        this.activateWorkDate();
    }

    async activateWorkDate(){
        
        try {
            let delActiv = await fetch (`${delAWD}`, {
                method:'delete'
            
            });
            console.log('delActiv>  ' + delActiv);
            
            var workdate = {
                date:`${this.state.activeWorkDate}`
                
            }
            let workDateGo = await fetch(`${postActiveDate}` , {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(
                    workdate
                )

            });
            console.log('workDateGo>  ' + workDateGo)
            this.setState({activateWorkDate:''})
            alert("Active Work Date has Changed");
            

        } catch(e) {
            console.log(e)
        }
       
        
    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    globalRmCharge(){
        // var date = new Date();
        // var currentTime = moment(date).hour();
        // this.setState({Time:currentTime});
        // if(currentTime){
        fetch(`${checkinguestUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                var globalrmchrg = {
                    fname:item.fname,
                    lname:item.lname,
                    group:item.group,
                    refID:item.refID,
                    arrivalDate:item.arrivalDate,
                    departureDate:item.departureDate,
                    roomNumbers:item.roomNumbers,
                    dailyRate:item.dailyRate,
                    VAT:item.VAT,
                    TourismLevy:item.TourismLevy,
                    ServiceCharge:item.ServiceCharge,
                    tranDate:new Date(),
                    description: 'Daily Room Rate',
                    searchKey:'GuestBill',
                    roomtypeName:item.roomtypeName
    
                }
                
                let result3 = fetch(`${globalrmChrgUrl}` , {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(
                        globalrmchrg
                    )
    
                });
                console.log('result3>  ' + result3);
                return 'ok'
            })
            alert('All Rooms have been billed Successfully. Click OK to close this Message. ')
            alert('Please Change Active Work Date before starting a new shift')
                
        })
            
        
    }

    dailyOccupancy(){

        var exportOccuppancy = {
            OccuppancyDate: moment(this.state.transactionDatex).format('MMM DD YYYY'),
            OccuppancyData: this.state.TodayOccupancy
        };
        let sendOccuppancy = fetch(`${postDailyOccuppancy}` , {
            method: 'post',

            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(
                exportOccuppancy
            )

        });
        console.log('sendOccuppancy>  ' + sendOccuppancy);
        this.setState({
            TodayOccupancy:''

        })
                      
    }

    async handleGlobalRoomCharge() {
       
       
        try {
            let result2 = await fetch(delGlobalChrgesUrl, {
                method: 'delete',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    this.state.roomCharge.map(item => item)
                        
                )
                    
            });
            console.log('result2>  ' + result2)
            
            let result = await fetch(postRmChrgToRooms, {
                method: 'post',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    this.state.roomCharge.map(item => item)
                        
                )
                    
            });
            console.log('result>  ' + result)
                        
            
        } catch(e) {
            console.log(e)
        }

    }

    renderRoomchart=((data)=>{
        
        if (data){
            return data.map((item) =>{
                data.sort((a, b) => a.roomNumbers - b.roomNumbers);
                if(item.roomStatus!=="green"&&item.roomStatus!=="black"){
                    return(
                        <>
                           
                                <button className="btn alignroomsgreen" style={{backgroundColor:`${item.roomStatus}`}} onMouseOver={() => 
                                    fetch(`${getGlobalChrgesUrl}${item.refID}`, {method:'GET'})
                                    .then((res) => res.json())
                                    .then((data) => {
                                        this.setState({
                                            roomCharge:data
                                            
                                        })

                                        data.map((item)=>{
                                            sessionStorage.setItem('gstrefID',item.refID);
                                            sessionStorage.setItem('getarrvDt',item.arrivalDate);
                                            sessionStorage.setItem('getDailyRt',item.dailyRate);

                                            return 'ok'
                                        })

                                        if(this.state.roomCharge.length===0){
                                            fetch(`${getFirstNight}${item.refID}`, {method:'GET'})
                                            .then((res) => res.json())
                                            .then((data) => {
                                                this.setState({
                                                    roomCharge:data
                                                    
                                                    
                                                })
                                                data.map((item)=>{
                                                    sessionStorage.setItem('gstrefID',item.refID);
                                                    sessionStorage.setItem('getarrvDt',item.arrivalDate);
                                                    sessionStorage.setItem('getDailyRt',item.dailyRate);
    
                                                    return 'ok'
                                                })
                                            })
                                        }
                                            
                                        
                                    })} 
                                    onClick={()=> {this.handleGlobalRoomCharge(); this.props.history.push(`/guestBill/${sessionStorage.getItem('gstrefID')}`)}}>
                                   
                                    <h5 className="card-title">{item.roomNumbers}</h5>
                                    <h6 className="card-subtitle mb-2 size">{item.fname} {item.lname}</h6>
                                    <h6 className="card-subtitle mb-2 size2">{item.roomtypeName}</h6>
                                    
                                </button>
                            
                        </>
                    )
                    
                }

                
                else{
                    return(
                        <>
                            
                                <button className="btn alignroomsgreen" style={{backgroundColor:`${item.roomStatus}`}}>
                                    <div className="card-body top">
                                        <h5 className="card-title">{item.roomNumbers}</h5>
                                        <h6 className="card-subtitle mb-2 size">{item.fname} {item.lname}</h6>
                                        <h6 className="card-subtitle mb-2 size2">{item.roomtypeName}</h6>
                                    </div>
                                </button>
                            
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
                    <Billinglogin/>
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
                
                <div className="pagebody2">
                <center>
                    <h6 style={{color:'yellow'}}>Active Work Date is: {trDate}</h6></center>
                    <div>
                   
                        <button className="btn btn-danger space" onClick={ () => this.props.history.push('./otherSales')}>Post Bills</button>
                        <button className="btn btn-danger space" onClick={ () => this.props.history.push('./RetireBar')}>Retire Sales Points</button>
                        <button className="btn btn-danger space" onClick={ () => this.props.history.push('./EndOfDay')}>Billing Reports</button>
                        <button className="btn btn-success space" onClick={ () => this.onOpenPword()}>Charge All Rooms</button>
                        <label type = 'button' className="btn space">{this.rendercheckinDate(this.state.arrivalDate)}</label>
                        <button className="btn btn-success space" onClick={ () => this.onOpenPword9()}>Change Work Date</button>
                        <button className="btn btn-warning space" onClick={ ()=> {this.props.history.push('/roomchart')}}>Goto Reception</button>
                        <button className="btn btn-danger space" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>    
                        
                    </div>
                    <div className="row mt-3">
                        <center>
                            <div className="col-3">
                                <h6 style = {{color:'purple',marginLeft:'480px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                            </div>
                            <div className="col-3">
                                <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                                  
                            </div>
                            
                        </center>
                    </div>
                </div>

                <Modal open={this.state.pword} onClose={()=>this.onClosePword()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Attention {this.state.name}</h6>
                            <div>
                                <center>
                                    
                                    <h6 styles={{color:'red'}}>This Action will Bill all the rooms. Click Yes to Proceed or No to Stop</h6>
                                    <button className="btn btn-warning formsize91" onClick={()=>this.AllowRefund()}>Yes</button>
                                    <button className="btn btn-warning formsize91" onClick={()=>this.onClosePword()}>No</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.wdate} onClose={()=>this.onClosewdate()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Attention {this.state.name}</h6>
                            <div>
                                <center>
                                    
                                    <h6 styles={{color:'red'}}>Active Work Date will Change. Click Yes to Proceed or No to Cancel</h6>
                                    <button className="btn btn-warning formsize91" onClick={()=>this.ExecuteWDate()}>Yes</button>
                                    <button className="btn btn-warning formsize91" onClick={()=>this.onClosewdate()}>No</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal open={this.state.pword9} onClose={()=>this.onClosePword9()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Access Required</h6>
                            <div>
                                <center>
                                    
                                    <input type="password" autoComplete="off" className="form-control mb-3 formsize51" name="pass9" require placeholder="Enter Access Code" value={this.state.pass9} onChange={this.handleChange}/>
                                    <button disabled = {this.state.pass9===''} className="btn btn-warning formsize91" onClick={()=>this.AllowRefund9()}>Login</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>
                
            </>
        )
        
    }

    async componentDidMount(){
               
       console.log (">>> Inside RMdidMount")
       const response = await axios.get(`${roomchartUrl}`)
        const resp = await axios.get(`${checkinguestUrl}`)
        this.setState({roomchart:response.data, guestrecord:resp.data})

       
        this.myTimer = setInterval(() => {
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
        
        },300000);
        
        
        // this.myTimer = setInterval(() => {
        //     var date = new Date();
        //     var currentTime = moment(date).hour();
        //     this.setState({Time:currentTime});
        //     if(currentTime===0){
        //         this.setState({
        //             globalClock:'start',
        //             retireClock:'start'
        //         })

        //     }

            

        // },1000);

        // this.myTimer = setInterval(() => {
        //     var date = new Date();
        //     var currentTime = moment(date).hour();
        //     this.setState({Time:currentTime});
        //     if(currentTime===0){
        //         this.setState({
        //             retireClock:'End'
        //         })

        //     }

            

        // },1000);

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
export default BillingMenu;