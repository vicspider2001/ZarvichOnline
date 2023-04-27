import React, {Component} from 'react';
import './Reception.css';
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format'; 
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';
import FLogin from '../FLogin';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import picture from '../Reception/deglenLogo.png';




const regDel = "http://10.1.0.99:3333/delBooking";
const regformUrl = "http://10.1.0.99:3333/bookNow";
// const postGroupGuest = "http://10.1.0.99:3333/groupGuestDetail";
const roomstatusUrl = "http://10.1.0.99:3333/rmstatus2";
const roomsUrl = "http://10.1.0.99:3333/rooms?details=";
const companyUrl= "http://10.1.0.99:3333/org";
const globalrmChrgUrl = "http://10.1.0.99:3333/firstNight";
const userName = "http://10.1.0.99:3333/fofUserInfo";
const levyUrl= "http://10.1.0.99:3333/feesAndCharges";
const retGuestUrl= "http://10.1.0.99:3333/checkedout?findPastGuest=";

const postGuestDeposit = "http://10.1.0.99:3333/rmDeposit";
const TempRoomDepositUrl = "http://10.1.0.99:3333/PostTmpRmDep";
const delReservation = "http://10.1.0.99:3333/delReservation";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";
const getWorkDate = "http://10.1.0.99:3333/getActive";



class RegForm extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside RegCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*100000000),
            status:'',
            group:'',
            roomNumbers:'',
            roomRate:0,
            roomtypeName:'',
            dailyRate: 0,
            discounType:'',
            discountAmount:'',
            comingFrom:'',
            goingTo:'',
            transactionDate:'',
            arrivalDate:'',
            departureDate:'',
            stay:'',
            stay2:'',
            calculatedstay:'',
            postBillStatus:'',
            title:'',
            fname:'',
            lname:'',
            middlename:'',
            dob: '',
            mob:'',
            phone:'',
            email:'',
            ID:'',
            passportNum:'',
            Gender:'',
            Nationality:'',
            Address:'',
            occupation:'',
            NokLname:'',
            NokFname:'',
            NokMname:'',
            NokRelationship:'',
            NokPhone:'',
            POV:'',
            vehicleReg:'',
            roomStatus:'green',
            groupDetails:'',
            valid1:'red',
            valid2:'red',
            valid3:'red',
            valid4:'red',
            valid5:'red',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',

            VAT:0,
            TourismLevy:0,
            ServiceChrg:0,
            useVAT:0,
            useTourismLevy:0,
            useServiceChrg:0,
            levyData:'',
            // toggle1:true || false,
            // bubble:true || false,
            // servi:true || false

            pastGuestData:'',
            existingGuest:'',
            regformSetting:'hidden',
            FoundGuest:'',
            BillStatus:0,

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:''
            
            

        };
        this.checkinhandleChange = this.checkinhandleChange.bind(this);
        this.checkouthandleChange = this.checkouthandleChange.bind(this);
        // this.handleChangeVAT = this.handleChangeVAT.bind(this);
        // this.handleChangeLevy = this.handleChangeLevy.bind(this);
        // this.handleChangeServiceChrg = this.handleChangeServiceChrg.bind(this);
        

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
            
           
        })
    }

    handleChangePast = (event) => {
        this.setState({
            [event.target.name]:event.target.value,
            
            
        })

        if(event.target.value===''){
            this.setState({regformSetting:'hidden'})
        }

        else{
            fetch(`${retGuestUrl}${event.target.value}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    FoundGuest:data
                })
                
            })
           
            this.myTimer = setTimeout(() => {
                if(this.state.FoundGuest.length>0){
                    this.setState({regformSetting:'visibe'})
                    var useGuest = this.state.FoundGuest;
                    useGuest.map((item)=>{
                        
                        this.setState({
                           status:item.status,
                            group:item.group,
                            discounType:item.discounType,
                            discountAmount:item.discountAmount,
                            title:item.title,
                            fname:item.fname,
                            lname:item.lname,
                            middlename:item.middlename,
                            dob:item.dob,
                            mob:item.mob,
                            phone:item.phone,
                            email:item.email,
                            ID:item.ID,
                            passportNum:item.passportNum,
                            Gender:item.Gender,
                            Nationality:item.Nationality,
                            Address:item.Address,
                            occupation:item.occupation,
                            NokLname:item.NokLname,
                            NokFname:item.NokFname,
                            NokMname:item.NokMname,
                            NokRelationship:item.NokRelationship,
                            NokPhone:item.NokPhone,
                            POV:item.POV,
                            vehicleReg:item.vehicleReg
    
                        })
                        return 'ok'
                            
                        
                    })
                   
                }
            },1000)
            
                
                
        }
    }

    handleChangeP = (event) => {
        this.setState({
            [event.target.name]:event.target.value,
            valid2:'black'
           
        })
        var vatData = this.state.levyData;
        var VATAmt = vatData.filter(levy=>levy.feesName.includes('VAT')).reduce((total, item)=>{
            return total + parseFloat(item.feesRate)
        },0);
        this.setState({VAT:VATAmt});

        this.myTimer = setTimeout(() => {
            var VT = this.state.VAT;
            var DailyR = this.state.dailyRate;
            var VATCal = (VT/100)*DailyR
            this.setState({useVAT:VATCal})
            
        },1000)

        var LData = this.state.levyData;
        var LevyAmt = LData.filter(levy=>levy.feesName.includes('Tourism')).reduce((total, item)=>{
        return total + parseFloat(item.feesRate)
        },0);
        this.setState({TourismLevy:LevyAmt});

        this.myTimer = setTimeout(() => {
            var LV = this.state.TourismLevy;
            var DailyR = this.state.dailyRate;
            var LEVCal = (LV/100)*DailyR
            this.setState({useTourismLevy:LEVCal})
        },1000)

        var SData = this.state.levyData;
        var SChrgAmt = SData.filter(levy=>levy.feesName.match('Service Charge')).reduce((total, item)=>{
        return total + parseFloat(item.feesRate)
        },0);
        this.setState({ServiceChrg:SChrgAmt});

        this.myTimer = setTimeout(() => {
            var SC = this.state.ServiceChrg;
            var DailyR = this.state.dailyRate;
            var SVCCal = (SC/100)*DailyR
            this.setState({useServiceChrg:SVCCal})
        },1000)


    }

    handleChangeS = (event) => {
        this.setState({
            [event.target.name]:event.target.value,
            valid3:'black'
           
        })
       
    }
    
    handleChangePh = (event) => {
        this.setState({
            [event.target.name]:event.target.value,
            valid4:'black'
           
        })
    }
   
    handleChange2 = (event) => {
        this.setState({
            [event.target.name]:event.target.value

        })
        
        if (this.state.discounType ==='Amount'){
            sessionStorage.setItem('pdc', event.target.value)
            sessionStorage.setItem('rmR', this.state.roomRate)

            let DscAmt = parseFloat(sessionStorage.getItem('pdc'))
            let DRmRate = 0;
            let rmRate = parseFloat(sessionStorage.getItem('rmR'))
            DRmRate = parseFloat(DRmRate + rmRate - DscAmt)
            this.setState({dailyRate:DRmRate})
        }

        if (this.state.discounType ==='Percentage'){
            sessionStorage.setItem('pdc', event.target.value)
            sessionStorage.setItem('rmR', this.state.roomRate)
           
            let PDscAmt = parseFloat(sessionStorage.getItem('pdc'))
            let PDRmRate = 0;
            let PrmRate = parseInt(sessionStorage.getItem('rmR'))
            PDRmRate = parseInt(PDRmRate + PrmRate - (PDscAmt/100*PrmRate))
            this.setState({dailyRate:PDRmRate})
        }

        if (this.state.discounType ==='FlatRate'){
            sessionStorage.setItem('pdc', event.target.value)
            
            let FDscAmt = parseFloat(sessionStorage.getItem('pdc'))
            let FDRmRate = 0;
            FDRmRate = parseFloat(FDRmRate + FDscAmt)
            this.setState({dailyRate:FDRmRate})
        }
        
    }

    // handleChangeVAT(){
    //     this.setState({
    //         toggle1:!this.state.toggle1
    //     })
    //     if(this.state.toggle1===true){
    //         var vatData = this.state.levyData;
    //         var VATAmt = vatData.filter(levy=>levy.feesName.includes('VAT')).reduce((total, item)=>{
    //             return total + parseFloat(item.feesRate)
    //         },0);
    //         this.setState({VAT:VATAmt});
    
    //         this.myTimer = setTimeout(() => {
    //             var VT = this.state.VAT;
    //             var DailyR = this.state.dailyRate;
    //             var VATCal = (VT/100)*DailyR
    //             this.setState({useVAT:VATCal})
                
    //         },1000)
    //     }
    //     else if(this.state.toggle1===false){
    //         this.setState({useVAT:0})
    //     }
       
        
        
    // }
    

    // handleChangeLevy(){
    //     this.setState({
    //         bubble:!this.state.bubble
    //     })
    //     if(this.state.bubble===true){
    //         var LData = this.state.levyData;
    //         var LevyAmt = LData.filter(levy=>levy.feesName.includes('Tourism')).reduce((total, item)=>{
    //         return total + parseFloat(item.feesRate)
    //         },0);
    //         this.setState({TourismLevy:LevyAmt});

    //         this.myTimer = setTimeout(() => {
    //             var LV = this.state.TourismLevy;
    //             var DailyR = this.state.dailyRate;
    //             var LEVCal = (LV/100)*DailyR
    //             this.setState({useTourismLevy:LEVCal})
    //         },1000)
    //     }
    //     else if(this.state.bubble===false){
    //         this.setState({useTourismLevy:0})
    //     }
        
        
    // }

    // handleChangeServiceChrg(){
    //     this.setState({
    //         servi:!this.state.servi
    //     })
    //     if(this.state.servi===true){
    //         var SData = this.state.levyData;
    //         var SChrgAmt = SData.filter(levy=>levy.feesName.match('Service Charge')).reduce((total, item)=>{
    //         return total + parseFloat(item.feesRate)
    //         },0);
    //         this.setState({ServiceChrg:SChrgAmt});

    //         this.myTimer = setTimeout(() => {
    //             var SC = this.state.ServiceChrg;
    //             var DailyR = this.state.dailyRate;
    //             var SVCCal = (SC/100)*DailyR
    //             this.setState({useServiceChrg:SVCCal})
    //         },1000)
    //     }
    //     else if(this.state.servi===false){
    //         this.setState({useServiceChrg:0})
    //     }
        
        
    // }

    checkinhandleChange(date) {
        this.setState({
            arrivalDate: date
        });
    }

    checkouthandleChange(date) {
        this.setState({
            departureDate: date,
            valid5:'black'
            
        });
        this.myTimer = setTimeout(() => {
            var thisDate = this.state.departureDate;
            var endDate = moment(thisDate);
            var startDt = moment(this.state.arrivalDate);
            var diff =endDate.diff(startDt);
            var datecomp = Math.ceil(diff/(1000*3600*24));
            this.setState({stay:datecomp})
            sessionStorage.setItem('stayLenght', datecomp)

            

        },1000)
        this.myTimer = setTimeout(() => {
            var stayL = parseInt(this.state.stay);
            var dailyRt = parseInt(this.state.dailyRate);
            var calcstay = 0;
            var calcstayLenght = calcstay + (stayL*dailyRt)

            this.setState({calculatedstay:calcstayLenght});
        },1000)
    }
       
    rendercheckinDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.arrivalDate}
                    onChange={this.checkinhandleChange}
                    minDate={new Date()}
                    maxDate={addDays(new Date(),31)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    
                />
            </div>
        )
    }

    newGuest(){
        this.setState({
            regformSetting:'visibe'
        })
    }
    
    rendercheckOutDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.departureDate}
                    onChange={this.checkouthandleChange}
                    minDate={addDays(this.state.arrivalDate,1)}
                    maxDate={addDays(new Date(),31)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                />
            </div>
        )
    }

       
    handleGueststatus (event) {
        
        this.setState({status:event.target.value, valid1:'black'},
            () => {
            if (this.state.status==='Individual') {
                this.setState({roomStatus:'blueviolet'})
                this.setState({groupDetails:''})
                this.setState({group:''})
            }
            else if(this.state.status==='Corporate') {
                this.setState({roomStatus:'blue'});
                fetch(`${companyUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                this.setState({groupDetails:data})
                })
                    
            }
            else if(this.state.status==='Staff') {
                this.setState({roomStatus:'deeppink'})
                this.setState({groupDetails:''})
                this.setState({group:''})
            }

            else if(this.state.status==='Complimentary') {
                this.setState({roomStatus:'orange'})
                this.setState({groupDetails:''})
                this.setState({group:''})
            }
                 
            else if(this.state.roomStatus==='green') {
                this.setState({status:''})
                this.setState({groupDetails:''})
                this.setState({group:''})
            }

            else {
                this.setState({roomStatus:'green'})
                this.setState({groupDetails:''})
                this.setState({group:''})
            }

        })
        
    }
    renderCompany = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option key={item.orgName} value={item.orgName}>
                        {item.orgName}
                    </option>
                )
            })
        }
    }

    renderPastGuest = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option key={item.refID} value={item.refID}>
                        {item.lname}  {item.fname}  {item.phone}
                    </option>
                )
            })
        }
    }
    
    async handleSubmit() {
    
        try {
            var rid = this.props.match.params.reID;
            var roomID = parseInt(rid);
            
            var statusUpdate = {

                status:`${this.state.status}`,
                roomtypeName:`${this.state.roomtypeName}`,
                fname:`${this.state.fname}`,
                lname:`${this.state.lname}`,
                roomStatus:`${this.state.roomStatus}`,
                refID:`${this.state._id}`,
                BillStatus:`${this.state.BillStatus}`,

                
            }
            
            var globalrmchrg = {
                refID:`${this.state._id}`,
                fname:`${this.state.fname}`,
                lname:`${this.state.lname}`,
                group:`${this.state.group}`,
                roomtypeName:`${this.state.roomtypeName}`,
                arrivalDate:`${this.state.arrivalDate}`,
                departureDate:`${this.state.departureDate}`,
                roomNumbers:`${this.state.roomNumbers}`,
                dailyRate: `${this.state.dailyRate}`,
                tranDate:new Date(),
                description: 'Daily Room Rate',
                searchKey: "GuestBill"


            }

            var arrvDate = (this.state.arrivalDate).toISOString();
            var depDater = (this.state.departureDate).toISOString();
            var tranDate = moment(this.state.transactionDate).format('MMM DD YYYY')
           
            var guestdetails = {

            _id:`${this.state._id}`,
            refID:`${this.state._id}`,
            status:`${this.state.status}`,
            group:`${this.state.group}`,
            roomNumbers:`${this.state.roomNumbers}`,
            roomRate:`${this.state.roomRate}`,
            roomtypeName:`${this.state.roomtypeName}`,
            dailyRate: `${this.state.dailyRate}`,
            discounType:`${this.state.discounType}`,
            discountAmount:`${this.state.discountAmount}`,
            comingFrom:`${this.state.comingFrom}`,
            goingTo:`${this.state.goingTo}`,
            arrivalDate:arrvDate,
            departureDate:depDater,
            stay:`${this.state.stay}`,
            calculatedstay:`${this.state.calculatedstay}`,
            postBillStatus:`${this.state.postBillStatus}`,
            title:`${this.state.title}`,
            fname:`${this.state.fname}`,
            lname:`${this.state.lname}`,
            middlename:`${this.state.middlename}`,
            dob: `${this.state.dob}`,
            mob:`${this.state.mob}`,
            phone:`${this.state.phone}`,
            email:`${this.state.email}`,
            ID:`${this.state.ID}`,
            passportNum:`${this.state.passportNum}`,
            Gender:`${this.state.Gender}`,
            Nationality:`${this.state.Nationality}`,
            Address:`${this.state.Address}`,
            occupation:`${this.state.occupation}`,
            NokLname:`${this.state.NokLname}`,
            NokFname:`${this.state.NokFname}`,
            NokMname:`${this.state.NokMname}`,
            NokRelationship:`${this.state.NokRelationship}`,
            NokPhone:`${this.state.NokPhone}`,
            POV:`${this.state.POV}`,
            vehicleReg:`${this.state.vehicleReg}`,
            roomStatus:`${this.state.roomStatus}`,
            transactionDate:tranDate,
            
           
            }
            
            let delFirst = await fetch(`${regDel}/${this.state._id}`, {
                method: 'delete',

            });
            console.log('delFirst>  ' + delFirst)
            
            this.myTimer = setTimeout(() => {
                let result = fetch(regformUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                       guestdetails
                    )
                    
                });
                
                console.log('result>  ' + result)

                let result2 = fetch(`${roomstatusUrl}/${roomID}`, {
                    method:'put',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                     
                    },
                    body: JSON.stringify(
                        statusUpdate
                    )
            
    
                });
    
                console.log('result2> '+ result2)
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
                console.log('result3>  ' + result3)
                
                alert("Check in Completed")
            
                this.props.history.push('/roomchart')

                
            },1000);
            
            

            // var organisations=this.state.group;
            // if(organisations!==''){
            //     let resultb = await fetch(postGroupGuest, {
            //         method: 'post',
    
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-type': 'application/json',
            //         },
    
            //         body: JSON.stringify(
            //            guestdetails
            //         )
                    
            //     });
            //     console.log('resultb>  ' + resultb)
            // }
            

            
        
        } catch(e) {
            console.log(e)
        }

    }

    async applyReservation(){
        try {
            var rsvAmount = sessionStorage.getItem('getrsvAmount')
            var rsvID = sessionStorage.getItem('getrsvCode')
            var rsvPost = {
                receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                _id:`${this.state._id}`,
                refID:`${this.state._id}`,
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                POSAmount:0,
                CashAmount:0,
                TransferAmount:0,
                CompDebit:(parseInt(`${rsvAmount}`)),
                roomDebit:0,
                paymentMethod:'Complimentary',
                roomNumbers:`${this.state.roomNumbers}`,
                description:'Reservation Deposit',
                department: "Room Deposit",
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            
            }
            let result1 = await fetch(postGuestDeposit, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    rsvPost
                
                )
                
            });
            console.log('result1>  ' + result1)
            let result1b = await fetch(TempRoomDepositUrl, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    rsvPost
                
                )
                
            });
            console.log('result1b>  ' + result1b)
            fetch(`${delReservation}/${rsvID}`, {method:'delete'});

            this.handleSubmit();
           
            alert("Reservation Deposit has been applied to " +this.state.roomNumbers)
            sessionStorage.removeItem('getrsvAmount')
            sessionStorage.removeItem('getrsvCode')


        } catch(e) {
            console.log(e)
        }
        
    }
    
    render(){
        console.log (">>> Inside REgdetails", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        return(
            <>
                <div className="container" key={this.state.roomNumbers}>
                    <div className="formdesign11">
                        
                        <button className="btn btn-warning movebtn2 printing" onClick={ () => window.print()}>Print Form</button>
                            
                        
                    <div>
                    <div>
                        <img src={picture} className="alignImg2" style={{width:"100px", height:"70px"}} alt="companylogo"/>
                    </div>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                        </center>
                        </div>
                        <center><h4>Guests Registration Form</h4></center>
                        <form><br/>
                            <div className='row'>
                                <div className='col-6'>
                                    <h5 className="form-control mb-3 background11 searchColor formsize btn btn-warning" onClick={()=>this.newGuest()}>Register New Guests</h5>
                                </div>
                                <div className='col-6'>
                                    <h5>
                                        <input type="text" className="form-control mb-3 background11 searchColor btn-warning" name="existingGuest" require placeholder="Find Existing Guests" value={this.state.existingGuest} list="findGuest" onChange={this.handleChangePast}/>
                                        <datalist id="findGuest">
                                            {this.renderPastGuest(this.state.pastGuestData)}
                                        </datalist>
                                    </h5>
                                    
                                </div>
                            </div>

                            <div className={this.state.regformSetting}>
                            
                                <div className="row">
                                    
                                    <div className="mb-3 col-4">
                                        <label className='form-label'>GuestID</label>
                                        <input type="number" className="form-control mb-3 formsize" name="_id" value={this.state._id} readOnly/>
                                        
                                        <label className='form-label' style={{color:this.state.valid1}}>Guest Status</label>
                                        <select className="form-select formsize mb-3" name="status" onChange={this.handleGueststatus.bind(this)}>
                                            <option selected value=''>Choose</option>
                                            <option value="Individual">Individual</option>
                                            <option value="Corporate">Group/Corporate</option>
                                            <option value="Staff">Staff</option>
                                            <option value="Complimentary">Complimentary</option>
                                        </select>

                                        <label className='form-label'>Organisations</label>
                                        <select className="form-select formsize mb-3" name="group" onChange={this.handleChange}>
                                            <option selected value=''>Select Company</option>
                                            {this.renderCompany(this.state.groupDetails)}
                                                                            
                                        </select>

                                    
                                        <label className='form-label'>Room Number</label>
                                        <input type="text" className="form-control mb-3 formsize" name="roomNumbers" value={this.state.roomNumbers} readOnly/>
                                        <label className='form-label'>Room Type</label>
                                        <input type="text" className="form-control mb-3 formsize" name="roomtypeName" value={this.state.roomtypeName} readOnly/>
                                        <label className='form-label'>Room Rate</label>
                                        <p className="form-control mb-3 formsize"><NumberFormat value={this.state.roomRate} displayType={"text"} thousandSeparator={true} prefix={"N"}/>.00</p>
                                    </div>
                                    <div className="col-4">
                                        <label className='form-label'>Discount Type</label>
                                        <select className="form-select formsize mb-3" name="discounType" onChange={this.handleChange2}>
                                            <option selected value='None'>Select</option>
                                            <option value="Amount">Discount Amount</option>
                                            <option value="Percentage">Percentage Discount</option>
                                            <option value="FlatRate">Flat Rate</option>
                                                                    
                                        </select>

                                        <label className='form-label'>{this.state.discounType}</label>
                                        <input type="number" className="form-control mb-3 formsize" name="discountAmount" value={this.state.discountAmount} onChange={this.handleChange2}/>
                                        
                                        <label className='form-label'>Daily Rate</label>
                                        <p className="form-control mb-4 formsize"> <NumberFormat value={this.state.dailyRate} displayType={"text"} thousandSeparator={true} prefix={"N"}/></p>
                                        
                                        {/* <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" checked value={this.state.toggle1}/>
                                            <label class="form-check-label" for="inlineCheckbox1">VAT({this.state.VAT})%</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-4">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" checked value={this.state.bubble}/>
                                            <label class="form-check-label" for="inlineCheckbox2">Tourism Levy({this.state.TourismLevy})%</label>
                                        </div> 
                                        <div className="form-check form-check-inline mb-4">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" checked value={this.state.servi}/>
                                            <label class="form-check-label" for="inlineCheckbox3">Service Charge({this.state.ServiceChrg})%</label>
                                        </div> 
                                        
                                        <p><label className='form-label'><b>Hotel's Income</b></label></p>
                                    <p className="form-control mb-3 formsize"> <b> <NumberFormat value={this.state.dailyRate - this.state.useVAT - this.state.useTourismLevy - this.state.useServiceChrg} displayType={"text"} thousandSeparator={true} prefix={"N"}/></b></p> */}

                                    </div>
                                    <div className="col-4">
                                        <label className='form-label'>Travelling From</label>
                                        <input type="text" className="form-control mb-3 formsize" name="comingFrom" value={this.state.comingFrom} onChange={this.handleChange}/>
                                        <label className='form-label'>Next Destination</label>
                                        <input type="text" className="form-control mb-3 formsize" name="goingTo" value={this.state.goingTo} onChange={this.handleChange}/>
                                        <label className='form-label'>Arrival Date</label>
                                        <label className="formsize">{this.rendercheckinDate(this.state.arrivalDate)}</label>
                                        <label className='form-label' style={{color:this.state.valid5}}>Departure Date</label>
                                        <label className="formsize">{this.rendercheckOutDate(this.state.departureDate)}</label>
                                        <label className='form-label' style={{color:this.state.valid2}}>Enable Dockets?</label>
                                        <select className="form-select formsize mb-3" name="postBillStatus" onChange={this.handleChangeP}>
                                            <option selected value=''>Select</option>
                                            <option value='No'>No</option>
                                            <option value='Yes'>Yes</option>
                                        </select>
                                    </div> 
                                    <hr/>
                                    
                                </div>
                                <br/>
                                <h5 className="mb-3 background11 formsize21" >Personal Info</h5>
                                <div className="row">
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Title</label>
                                        <select className="form-select formsize21 mb-3" name="title" onChange={this.handleChange}>
                                            <option selected value=''>Select</option>
                                            <option value='Mr'>Mr</option>
                                            <option value='Mrs'>Mrs</option>
                                            <option value='Miss'>Miss</option>
                                            <option value='Rev'>Rev.</option>
                                            <option value='Mal'>Mal.</option>
                                            <option value='Alh'>Alh.</option>
                                            <option value='Chief'>Chief</option>
                                            <option value='Engr'>Engr.</option>
                                            <option value='Bar'>Bar.</option>
                                            <option value='Dr.'>Dr.</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label' style={{color:this.state.valid3}}>Surname</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="lname" value={this.state.lname} onChange={this.handleChangeS}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Firstname</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="fname" value={this.state.fname} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Middle Name</label>
                                    <input type="text" className="form-control mb-3 formsize21" name="middlename" value={this.state.middlename} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Birth Day</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="dob" value={this.state.dob} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Birth Month</label>
                                        <select className="form-select formsize21 mb-3" name="mob" onChange={this.handleChange}>
                                            <option selected value=''>Select Month</option>
                                            <option value='Jan'>Jan</option>
                                            <option value='Feb'>Feb</option>
                                            <option value='Mar'>Mar</option>
                                            <option value='Apr'>Apr</option>
                                            <option value='May'>May</option>
                                            <option value='Jun'>Jun</option>
                                            <option value='Jul'>Jul</option>
                                            <option value='Aug'>Aug</option>
                                            <option value='Sept'>Sept</option>
                                            <option value='Oct'>Oct</option>
                                            <option value='Nov'>Nov</option>
                                            <option value='Dec'>Dec</option>
                                        </select>
                                    </div>
                                
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-2">
                                        <label className='form-label' style={{color:this.state.valid4}}>Phone</label>
                                        <input type="number" className="form-control mb-3 formsize21" name="phone" value={this.state.phone} onChange={this.handleChangePh}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Email</label>
                                        <input type="email" className="form-control mb-3 formsize21" name="email" value={this.state.email} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>ID</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="ID" value={this.state.ID} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Passport Num</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="passportNum" value={this.state.passportNum} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Gender</label>
                                        <select className="form-select formsize21 mb-3" name="Gender" onChange={this.handleChange}>
                                            <option selected value=''>Select</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                        
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Nationality</label>
                                        <select className="form-select formsize21 mb-3" name="Nationality" onChange={this.handleChange}>
                                            <option selected value=''>Select</option>
                                            <option value='Nigeria'>Nigeria</option>
                                            <option value='Others'>Others</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Address</label>
                                        <textarea row="4" className="form-control mb-3" name="Address" value={this.state.Address} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>occupation</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="occupation" value={this.state.occupation} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Purpose of Visits</label>
                                        <textarea row="4" className="form-control mb-3 formsize21" name="POV" value={this.state.POV} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Vehicle Reg</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="vehicleReg" value={this.state.vehicleReg} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <hr/>
                                <h5 className="mb-3 background11 formsize4" >Next of Kin Details</h5>
                                <div className="row">
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Surname</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="NokLname" value={this.state.NokLname} onChange={this.handleChangeS}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Firstname</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="NokFname" value={this.state.NokFname} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Middle Name</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="NokMname" value={this.state.NokMname} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Relationship</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="NokRelationship" value={this.state.NokRelationship} onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-3 col-2">
                                        <label className='form-label'>Phone</label>
                                        <input type="text" className="form-control mb-3 formsize21" name="NokPhone" value={this.state.NokPhone} onChange={this.handleChange}/>
                                    </div>
                                    
                                </div>
                            </div>
                        </form>
                        <div>
                            <center>
                                <span>
                                    <button disabled={this.state.status===''||this.state.lname===''||this.state.phone===''||this.state.postBillStatus===''||this.state.departureDate===''||sessionStorage.getItem('getrsvAmount')!==null} className="btn btn-primary printing" onClick={()=>this.handleSubmit()}>Check In</button>
                                    <Link to="/roomchart">
                                        <button className="btn btn-danger space printing" onClick={()=>{sessionStorage.removeItem('getrsvAmount')}}>Cancel</button>
                                    </Link>
                                    <button disabled={sessionStorage.getItem('getrsvAmount')===''||this.state.status===''||this.state.lname===''||this.state.phone===''||this.state.postBillStatus===''||this.state.departureDate===''||sessionStorage.getItem('getrsvAmount')===null}className="btn btn-warning movebtn31 printing" onClick={ () => this.applyReservation()}>Check In Reservation</button>
                                </span>
                            </center>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    async componentDidMount(){
        console.log(">>> Inside RegDidMount", this.state)
        
        var fomID = this.props.match.params.reID;
        var rumID = parseInt(fomID)
       fetch(`${roomsUrl}${rumID}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item) =>{
                let xyz=Number(item.roomRate)
                this.setState({roomNumbers:item.roomNumbers})
                this.setState({roomRate:xyz})
                this.setState({roomtypeName:item.roomtypeName})
                this.setState({_id:Math.floor(Math.random()*100000000)})
                this.setState({dailyRate:xyz})
                                
                return 'ok'

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

        await fetch(`${getWorkDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({transactionDate:item.date})
                return 'ok'
            })
            
           
        })

        await fetch(`${getWorkDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({arrivalDate:new Date(item.date)})
                return 'ok'
            })
            
           
        })

                
        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })

        fetch(`${retGuestUrl}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                pastGuestData:data
            })
            
        })

        fetch(`${levyUrl}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({levyData:data})
               
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
export default RegForm;