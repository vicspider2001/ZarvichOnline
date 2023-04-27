import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import '../Reception.css';
// import './OtherPosts.css';
import moment from 'moment';
import {Modal} from 'react-responsive-modal';
import Billinglogin from '../../Billinglogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import picture from '../../Reception/deglenLogo.png';


const delFromCheckinDb = "http://10.1.0.99:3333/delBooking";
const delFromFirstNiteDb = "http://10.1.0.99:3333/delFirstNite";
const delFromgrchargesDb = "http://10.1.0.99:3333/delBooking2";
const delFromroomratehargesDb = "http://10.1.0.99:3333/delBooking3";
const updateRoomStatus = "http://10.1.0.99:3333/rmstatus2";
const getBillrefIDsUrl = "http://10.1.0.99:3333/posting?GcheckinID=";
const getDepositsUrl = "http://10.1.0.99:3333/getRmDeposits?GstbillId=";
const getCheckinrefIDUrl = "http://10.1.0.99:3333/checkin?checkinID=";
const getRoomRateUrl = "http://10.1.0.99:3333/roomRates?gdetails=";
const postToCheckoutDb = "http://10.1.0.99:3333/goodbye";
const delfirstChkOut = "http://10.1.0.99:3333/delchkOut";
// const postGroupRmCharges = "http://10.1.0.99:3333/groupRoomCharges";
// const postBillSummary = "http://10.1.0.99:3333/allBillSummary";
const getGuestID = "http://10.1.0.99:3333/checkin?roomNumID=";

const postGuestDeposit = "http://10.1.0.99:3333/rmDeposit";
const TempRoomDepositUrl = "http://10.1.0.99:3333/PostTmpRmDep";
const getPaymentMethods = "http://10.1.0.99:3333/paymentMethods";

const postToCityLedger = "http://10.1.0.99:3333/addCityLedger";

const getRooms ="http://10.1.0.99:3333/checkin";
const editRoomStat ="http://10.1.0.99:3333/guestBalanceChk";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";
const getWorkDate = "http://10.1.0.99:3333/getActive";


const userName = "http://10.1.0.99:3333/billingUserInfo";


class Guestbill extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside GstConstructor",props)

        this.state = {

            guestDetails:'',
            guestbilldetails:'',
            guestDeposits:'',
            roomCharging:'',
            arrivalDate:'',
            departureDate:'',
            stay:'',
            dailyRateNow:'',
            calcAccommodatn:0,
            calDockets:0,
            calDeposits:0,
            TotalRmRate:0,
            Balance:0,
            color:'',
            CheckOutBtn:'Check Out',
            checkout:'',
            roomNum:'',
            roomType:'',
            datecalculation:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            Oths:0,
            org:[],
            firstName:'',
            lastName:'',
                       

            edit: false,
            displayPaymentMethods:'',
            paymentMethod2:'',
            depositAmount:'',
            description2:'Bill Settlement',
            guestInhouseID:'',
            transactionDate:'',

            editcityLedger: false,
            phoneCode:'',
            emailCode:'',
            cityLedgerAmount:'',
            cityLedgerDescription:'City Ledger',
            cityLedgerID: sessionStorage.getItem('gstrefID'),
            cityLedgerDate:new Date(),

            editdepositTrnfr: false,
            toRoom:'',
            fromRoom:'',
            depTrnfAmount:'',
            depTrnDescription:'Deposit Transfer',
            fromdepTrnID: sessionStorage.getItem('gstrefID'),
            todepTrnID:'',
            depTrnDate:new Date(),
            allRooms:'',
            getAllPayMeth:'',

            balanceStatus:'',
            balanceRoomType:'',
            balanceFname:'',
            balanceLname:'',
            balanceRoomStatus:'',
            balanceRefID:sessionStorage.getItem('gstrefID'),

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:'',

            pass:'',
            pword:false,
            pword2:false,

            chktAddress:'',
            chkGender:'',
            chkID:'',
            chkNationality:'',
            chkNokFname:'',
            chkNokLname:'',
            chkNokMname:'',
            chkNokPhone:'',
            chkNokRelationship:'',
            chkPOV:'',
            chkServiceCharge:'',
            chkTourismLevy:'',
            chkVAT:'',
            chkArrivalDate:'',
            chkCalculatedstay:'',
            chkComingFrom:'',
            chkDailyRate:'',
            chkdepartureDate:'',
            chkdiscounType:'',
            chkdiscountAmount:'',
            chkdob:'',
            chkemail:'',
            chkfname:'',
            chkgointTo:'',
            chkgroup:'',
            chklname:'',
            chkmiddlename:'',
            chkmob:'',
            chkoccupation:'',
            chkpassportNum:'',
            chkphone:'',
            chkpostBillStatus:'',
            chkrefID:'',
            chkroomNumbers:'',
            chkroomRate:'',
            chkroomStatus:'',
            chkroomtypeName:'',
            chkstatus:'',
            chkstay:'',
            chktitle:'',
            chktransactionDate:'',
            chk_id:''
        
        }
        
    }

    onOpenPword(){
        if(this.state.CheckOutBtn==='Guest Refund'){
            this.setState({
                pword: true
            })
            
        }
        else{
            this.setState({
                pword: false
            });
            this.checkOut()
        }

        
        
    }

    onOpenPword2(){
        
        this.setState({
            pword2: true
        })
        
    }

    onClosePword(){
        this.setState({
            pword: false
            
        })
        
    }

    AllowRefund(){
        if(this.state.pass==='Deglen2019'){
            this.checkOut();
            this.onClosePword()
            this.setState({pass:''})

        }
        else{
            alert('Access Denied')
        }
    }

    AllowCityLedger(){
        if(this.state.pass==='Deglen2019'){
            this.openCityLedger();
            this.onClosePword2();
            this.setState({pass:''})

        }
        else{
            alert('Access Denied')
        }
    }

    onClosePword2(){
        this.setState({
            pword2: false
        })
        
    }

    onOpenModaledit(){
        this.setState({
            edit:true
        })
        
    }

    onCloseModaltransfer(){
        this.setState({
            editdepositTrnfr:false
        })
        window.location.reload();
        
    }

    onOpenModaltransfer(){
        fetch(`${getRooms}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                allRooms:data,
                editdepositTrnfr:true
            })
        })

        fetch(`${getPaymentMethods}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    getAllPayMeth:data,
                    
                })
            })
                
    }

    onCloseModaledit(){
        this.setState({
            edit:false
        })
        window.location.reload();
        
    }

    openCityLedger(){
        // var getDptmt=this.state.pass;
        // if(getDptmt==='1977Veektor/1977'){
            this.setState({
                editcityLedger:true
            })
        // }
        // else{
        //     alert('Access Denied')
        // }
        
    }

    closeCityLedger(){
        this.setState({
            editcityLedger:false
        })
        window.location.reload();
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    
    }
    
    handleChange2 = (event) => {
        console.log('inside handle', this.props)
        this.setState({
           [event.target.name]:event.target.value
        })
        fetch(`${getGuestID}${event.target.value}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item) => {
                this.setState({
                    todepTrnID:item.refID,
                    depTrnfAmount:item.dailyRate
                    
                })
                return 'ok'
            })
        })
    
    }


    
    async checkOut() {
        if(this.state.CheckOutBtn==='Check Out'){
            try {
                
                var rfID = sessionStorage.getItem('gstrefID');
                var rmNumber = this.state.roomNum;
               
                var roomStatusUpdate = {
                    status:'',
                    roomtypeName:`${this.state.roomType}`,
                    fname: '',
                    lname: '',
                    roomStatus: 'black',
                    BillStatus:0,
                    refID:''
                   
                }

                // var guestSummary = {
                    
                //     fname:`${this.state.firstName}`,
                //     lname:`${this.state.lastName}`,
                //     roomNum:`${this.state.roomNum}`, 
                //     roomtype:`${this.state.roomType}`,
                //     dailyRte:`${this.state.dailyRateNow}`,
                //     stay:`${this.state.stay}`,
                //     arrivalDate:`${this.state.arrivalDate}`,
                //     departureDate:`${new Date()}`,
                //     TotalRoomService:`${this.state.calDockets}`,
                //     TotalAccommodation:`${this.state.calcAccommodatn}`,
                //     TotalDeposits:`${this.state.calDeposits}`,
                //     group:`${this.state.org}`,
                //     searchKey:'SummaryBill',
                //     description: 'Daily Room Rate',
                   
                // }

                var GuestDeta = {
                    
                    Address:this.state.chktAddress,
                    Gender:this.state.chkGender,
                    ID:this.state.chkID,
                    Nationality:this.state.chkNokFname,
                    NokFname:this.state.chkNokFname,
                    NokLname:this.state.chkNokLname,
                    NokMname:this.state.chkNokMname,
                    NokPhone:this.state.chkNokPhone,
                    NokRelationship:this.state.chkNokRelationship,
                    chkPOV:this.state.chkPOV,
                    ServiceCharge:this.state.chkServiceCharge,
                    TourismLevy:this.state.chkTourismLevy,
                    VAT:this.state.chkVAT,
                    ArrivalDate:this.state.chkArrivalDate,
                    Calculatedstay:this.state.chkCalculatedstay,
                    ComingFrom:this.state.chkComingFrom,
                    DailyRate:this.state.chkDailyRate,
                    departureDate:this.state.chkdepartureDate,
                    discounType:this.state.chkdiscounType,
                    discountAmount:this.state.chkdiscountAmount,
                    dob:this.state.chkdob,
                    email:this.state.chkemail,
                    fname:this.state.chkfname,
                    gointTo:this.state.chkgointTo,
                    group:this.state.chkgroup,
                    lname:this.state.chklname,
                    middlename:this.state.chkmiddlename,
                    mob:this.state.chkmob,
                    occupation:this.state.chkoccupation,
                    passportNum:this.state.chkpassportNum,
                    phone:this.state.chkphone,
                    postBillStatus:this.state.chkpostBillStatus,
                    refID:this.state.chkrefID,
                    roomNumbers:this.state.chkroomNumbers,
                    roomRate:this.state.chkroomRate,
                    roomStatus:this.state.chkroomStatus,
                    roomtypeName:this.state.chkroomtypeName,
                    status:this.state.chkstatus,
                    stay:this.state.chkstay,
                    title:this.state.chktitle,
                    transactionDate:this.state.chktransactionDate
                }

                let dellast = await fetch(`${delfirstChkOut}/${this.state.chk_id}`, {
                    method: 'delete',
        
                                          
                        
                });
                console.log('dellast>  ' + dellast)
                
                this.myTimer = setTimeout(() => {
                    let delChkOutDb= fetch(postToCheckoutDb, {
                        method: 'post',
            
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
            
                        body: JSON.stringify(
                            
                            GuestDeta
                                
                        )
                            
                            
                    });
                    console.log('delChkOutDb>  ' + delChkOutDb)
    
                    // let keepBills = await fetch(postGroupRmCharges, {
                    //     method: 'post',
            
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-type': 'application/json',
                    //     },
            
                    //     body: JSON.stringify(
                    //         this.state.roomCharging.map(item => item)
                            
                    //     )
                            
                            
                    // });
                    // console.log('keepBills>  ' + keepBills)
    
                    // let summaryBills = await fetch(postBillSummary, {
                    //     method: 'post',
            
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-type': 'application/json',
                    //     },
            
                    //     body: JSON.stringify(
                    //         guestSummary
                            
                    //     )
                            
                            
                    // });
                    // console.log('summaryBills>  ' + summaryBills)
        
                    let updtRmStat = fetch(`${updateRoomStatus}/${rmNumber}`, {
                        method: 'put',
            
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
            
                        body: JSON.stringify(
                            
                            roomStatusUpdate
                                
                        )
                            
                            
                    });
                    console.log('updtRmStat>  ' + updtRmStat)
        
                    let delChkInDb = fetch(`${delFromCheckinDb}/${rfID}`, {
                        method: 'delete',
            
                        // headers: {
                        //     'Accept': 'application/json',
                        //     'Content-type': 'application/json',
                        // },
            
                        // body: JSON.stringify(
                            
                        //     this.state.guestDetails.map(item => item)
                                
                        // )
                            
                            
                    });
                    console.log('delChkInDb>  ' + delChkInDb)
    
                    let delFirstNite = fetch(`${delFromFirstNiteDb}/${rfID}`, {
                        method: 'delete',
            
                        // headers: {
                        //     'Accept': 'application/json',
                        //     'Content-type': 'application/json',
                        // },
            
                        // body: JSON.stringify(
                            
                        //     GuestDeta
                                
                        // )
                            
                            
                    });
                    console.log('delFirstNite>  ' + delFirstNite)
    
                    
                    let delgrRmChrg = fetch(`${delFromgrchargesDb}/${rfID}`, {
                        method: 'delete',
            
                        // headers: {
                        //     'Accept': 'application/json',
                        //     'Content-type': 'application/json',
                        // },
            
                        // body: JSON.stringify(
                            
                        //     this.state.guestDetails.map(item => item)
                                
                        // )
                            
                            
                    });
                    console.log('delgrRmChrg>  ' + delgrRmChrg)
        
                    let delfrmRmRate = fetch(`${delFromroomratehargesDb}/${rfID}`, {
                        method: 'delete',
            
                        // headers: {
                        //     'Accept': 'application/json',
                        //     'Content-type': 'application/json',
                        // },
            
                        // body: JSON.stringify(
                            
                        //     this.state.guestDetails.map(item => item)
                                
                        // )
                            
                            
                    });
                    console.log('delfrmRmRate>  ' + delfrmRmRate)

                    alert( "Room "+ this.state.roomNum+ " Check Out Was Successful")
                    this.props.history.push("/BillingMenu")

                },1000);
    
               
            } catch(e) {
                console.log(e)
            }
        }
        
        else if(this.state.CheckOutBtn==='Bill Settlement'){
            
            fetch(`${getPaymentMethods}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayPaymentMethods:data,
                    description2:'Bill Settlement'
                })
            })

            this.setState({
                edit:true
            })
            
            fetch(`${getGuestID}${this.state.roomNum}`, {method: 'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item) => {
                    this.setState({
                        guestInhouseID:item.refID,
                                                                
                    })
                    return 'ok'
                })
            })
        }
        
        else if(this.state.CheckOutBtn==='Guest Refund'){
            // var getdptmnt = this.state.pass;
            // if(getdptmnt==='1977Veektor/1977'){
                
                fetch(`${getPaymentMethods}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        displayPaymentMethods:data,
                        description2:'Guest Refund'
                    })
                })

                this.setState({
                    edit:true
                })
                
                fetch(`${getGuestID}${this.state.roomNum}`, {method: 'GET'})
                .then((res) => res.json())
                .then((data) => {
                    data.map((item) => {
                        this.setState({
                            guestInhouseID:item.refID,
                                                                    
                        })
                        return 'ok'
                    })
                })
            // }

            // else{
            //     alert('Access Denied')
            // }
            
        }


    }

    async handleRoomDeposit() {
        if(this.state.CheckOutBtn==='Bill Settlement'){
            try {
                if(this.state.paymentMethod2==="POS"){
                    var POSroomDeposit = {
                        receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                        _id:Math.floor(Math.random()*100000000),
                        refID:`${this.state.guestInhouseID}`,
                        date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                        POSAmount:Math.abs(parseInt(`${this.state.newBal2}`)),
                        CashAmount:0,
                        TransferAmount:0,
                        CompDebit:0,
                        roomDebit:0,
                        paymentMethod:`${this.state.paymentMethod2}`,
                        roomNumbers:`${this.state.roomNum}`,
                        description:`${this.state.description2}`,
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
                            POSroomDeposit
                           
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
                            POSroomDeposit
                           
                        )
                        
                    });
                    console.log('result1b>  ' + result1b)
                    
    
                }
    
                if(this.state.paymentMethod2==="Cash"){
                    var CashroomDeposit = {
                        receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                        _id:Math.floor(Math.random()*100000000),
                        refID:`${this.state.guestInhouseID}`,
                        date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                        POSAmount:0,
                        CashAmount:Math.abs(parseInt(`${this.state.newBal2}`)),
                        TransferAmount:0,
                        CompDebit:0,
                        roomDebit:0,
                        paymentMethod:`${this.state.paymentMethod2}`,
                        roomNumbers:`${this.state.roomNum}`,
                        description:`${this.state.description2}`,
                        department: "Room Deposit",
                        user: localStorage.getItem('userInfo'),
                        shift:localStorage.getItem('shift')
                       
                    }
                    let result2 = await fetch(postGuestDeposit, {
                        method: 'post',
        
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
        
                        body: JSON.stringify(
                            CashroomDeposit
                           
                        )
                        
                    });
                    console.log('result2>  ' + result2)
    
                    let result2b = await fetch(TempRoomDepositUrl, {
                        method: 'post',
        
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
        
                        body: JSON.stringify(
                            CashroomDeposit
                           
                        )
                        
                    });
                    console.log('result2b>  ' + result2b)
                    
                }
                
                if(this.state.paymentMethod2==="Transfer"){
                    var TransferroomDeposit = {
                        receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                        _id:Math.floor(Math.random()*100000000),
                        refID:`${this.state.guestInhouseID}`,
                        date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                        POSAmount:0,
                        CashAmount:0,
                        TransferAmount:Math.abs(parseInt(`${this.state.newBal2}`)),
                        CompDebit:0,
                        roomDebit:0,
                        paymentMethod:`${this.state.paymentMethod2}`,
                        roomNumbers:`${this.state.roomNum}`,
                        description:`${this.state.description2}`,
                        department: "Room Deposit",
                        user: localStorage.getItem('userInfo'),
                        shift:localStorage.getItem('shift')
                       
                    }
                    let result3 = await fetch(postGuestDeposit, {
                        method: 'post',
        
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
        
                        body: JSON.stringify(
                            TransferroomDeposit
                           
                        )
                        
                    });
                    console.log('result3>  ' + result3)
    
                    let result3b = await fetch(TempRoomDepositUrl, {
                        method: 'post',
        
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
        
                        body: JSON.stringify(
                            TransferroomDeposit
                           
                        )
                        
                    });
                    console.log('result3b>  ' + result3b)
                    
                    
                }
    
                if(this.state.paymentMethod2==="Complimentary"){
                    var ComplroomDeposit = {
                        receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                        _id:Math.floor(Math.random()*100000000),
                        refID:`${this.state.guestInhouseID}`,
                        date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                        POSAmount:0,
                        CashAmount:0,
                        TransferAmount:0,
                        CompDebit:Math.abs(parseInt(`${this.state.newBal2}`)),
                        roomDebit:0,
                        paymentMethod:`${this.state.paymentMethod2}`,
                        roomNumbers:`${this.state.roomNum}`,
                        description:`${this.state.description2}`,
                        department: "Room Deposit",
                        user: localStorage.getItem('userInfo'),
                        shift:localStorage.getItem('shift')
                       
                    }
                    let result3 = await fetch(postGuestDeposit, {
                        method: 'post',
        
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
        
                        body: JSON.stringify(
                            ComplroomDeposit
                           
                        )
                        
                    });
                    console.log('result3>  ' + result3)
    
                    let result3b = await fetch(TempRoomDepositUrl, {
                        method: 'post',
        
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
        
                        body: JSON.stringify(
                            ComplroomDeposit
                           
                        )
                        
                    });
                    console.log('result3b>  ' + result3b)
    
                    
                }

                alert("Deposit Posted for Room " +this.state.roomNum)
                
                this.setState({paymentMethod2:''})
                this.setState({edit:false})
                window.location.reload();
               
                
                       
            } catch(e) {
                console.log(e)
            }
        }
        else if(this.state.CheckOutBtn==='Guest Refund'){
            try {
                if(this.state.paymentMethod2==="POS"){
                    var POSroomDepositGR = {
                        receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                        _id:Math.floor(Math.random()*100000000),
                        refID:`${this.state.guestInhouseID}`,
                        date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                        POSAmount:-Math.abs(parseInt(`${this.state.newBal2}`)),
                        CashAmount:0,
                        TransferAmount:0,
                        CompDebit:0,
                        roomDebit:0,
                        paymentMethod:`${this.state.paymentMethod2}`,
                        roomNumbers:`${this.state.roomNum}`,
                        description:`${this.state.description2}`,
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
                            POSroomDepositGR
                           
                        )
                        
                    });
                    console.log('result1>  ' + result1)
                    // let result1b = await fetch(TempRoomDepositUrl, {
                    //     method: 'post',
        
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-type': 'application/json',
                    //     },
        
                    //     body: JSON.stringify(
                    //         POSroomDepositGR
                           
                    //     )
                        
                    // });
                    // console.log('result1b>  ' + result1b)
                    
    
                }
                                    
                if(this.state.paymentMethod2==="Transfer"){
                    var TransferroomDepositGR = {
                        receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                        _id:Math.floor(Math.random()*100000000),
                        refID:`${this.state.guestInhouseID}`,
                        date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                        POSAmount:0,
                        CashAmount:0,
                        TransferAmount:-Math.abs(parseInt(`${this.state.newBal2}`)),
                        CompDebit:0,
                        roomDebit:0,
                        paymentMethod:`${this.state.paymentMethod2}`,
                        roomNumbers:`${this.state.roomNum}`,
                        description:`${this.state.description2}`,
                        department: "Room Deposit",
                        user: localStorage.getItem('userInfo'),
                        shift:localStorage.getItem('shift')
                       
                    }
                    let result3 = await fetch(postGuestDeposit, {
                        method: 'post',
        
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
        
                        body: JSON.stringify(
                            TransferroomDepositGR
                           
                        )
                        
                    });
                    console.log('result3>  ' + result3)
    
                    // let result3b = await fetch(TempRoomDepositUrl, {
                    //     method: 'post',
        
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-type': 'application/json',
                    //     },
        
                    //     body: JSON.stringify(
                    //         TransferroomDepositGR
                           
                    //     )
                        
                    // });
                    // console.log('result3b>  ' + result3b)
                    
                    
                }
    
                if(this.state.paymentMethod2==="Complimentary"){
                    var ComplroomDepositGR = {
                        receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                        _id:Math.floor(Math.random()*100000000),
                        refID:`${this.state.guestInhouseID}`,
                        date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                        POSAmount:0,
                        CashAmount:0,
                        TransferAmount:0,
                        CompDebit:-Math.abs(parseInt(`${this.state.newBal2}`)),
                        roomDebit:0,
                        paymentMethod:`${this.state.paymentMethod2}`,
                        roomNumbers:`${this.state.roomNum}`,
                        description:`${this.state.description2}`,
                        department: "Room Deposit",
                        user: localStorage.getItem('userInfo'),
                        shift:localStorage.getItem('shift')
                       
                    }
                    let result3 = await fetch(postGuestDeposit, {
                        method: 'post',
        
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
        
                        body: JSON.stringify(
                            ComplroomDepositGR
                           
                        )
                        
                    });
                    console.log('result3>  ' + result3)
    
                    // let result3b = await fetch(TempRoomDepositUrl, {
                    //     method: 'post',
        
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-type': 'application/json',
                    //     },
        
                    //     body: JSON.stringify(
                    //         ComplroomDepositGR
                           
                    //     )
                        
                    // });
                    // console.log('result3b>  ' + result3b)
    
                    
                }
    
                alert("Refund Posted for Room " +this.state.roomNum)
                
                this.setState({paymentMethod2:''})
                this.setState({edit:false})
                window.location.reload();
               
                
                       
            } catch(e) {
                console.log(e)
            }
        }
        

    }

    async handleDepositTransfer() {
        
        try {
            if(this.state.paymentMethod2==="POS"){
                var ToRoomPos = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    refID:`${this.state.todepTrnID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:Math.abs(parseInt(`${this.state.depTrnfAmount}`)),
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.toRoom}`,
                    description:`${this.state.depTrnDescription}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }
                var FromRoomPos = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    refID:`${this.state.fromdepTrnID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:-Math.abs(parseInt(`${this.state.depTrnfAmount}`)),
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.roomNum}`,
                    description:`${this.state.depTrnDescription}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }
                let posdeposit = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        ToRoomPos
                        
                    )
                    
                });
                console.log('posdeposit>  ' + posdeposit)
                let postransfer = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        FromRoomPos
                        
                    )
                    
                });
                console.log('postransfer>  ' + postransfer)

                let result1b = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        ToRoomPos
                        
                    )
                    
                });
                console.log('result1b>  ' + result1b)
                let fromPos = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        FromRoomPos
                        
                    )
                    
                });
                console.log('fromPos>  ' + fromPos)
                

            }

            if(this.state.paymentMethod2==="Cash"){
                var ToRoomCash = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    refID:`${this.state.todepTrnID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:Math.abs(parseInt(`${this.state.depTrnfAmount}`)),
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.toRoom}`,
                    description:`${this.state.depTrnDescription}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }

                var FromRoomCash = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    refID:`${this.state.fromdepTrnID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:-Math.abs(parseInt(`${this.state.depTrnfAmount}`)),
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.roomNum}`,
                    description:`${this.state.depTrnDescription}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }
                let toRoomCash = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        ToRoomCash
                        
                    )
                    
                });
                console.log('toRoomCash>  ' + toRoomCash)

                let fromRoomCash = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        FromRoomCash
                        
                    )
                    
                });
                console.log('fromRoomCash>  ' + fromRoomCash)

                let toRoomCash2 = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        ToRoomCash
                        
                    )
                    
                });
                console.log('toRoomCash2>  ' + toRoomCash2)

                let fromRoomCash2 = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        FromRoomCash
                        
                    )
                    
                });
                console.log('fromRoomCash2>  ' + fromRoomCash2)
                
            }
            
            if(this.state.paymentMethod2==="Transfer"){
                var ToRoomTrns = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    refID:`${this.state.todepTrnID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:Math.abs(parseInt(`${this.state.depTrnfAmount}`)),
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.toRoom}`,
                    description:`${this.state.depTrnDescription}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }

                var FromRoomTrns = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    refID:`${this.state.fromdepTrnID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:-Math.abs(parseInt(`${this.state.depTrnfAmount}`)),
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.roomNum}`,
                    description:`${this.state.depTrnDescription}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }

                let toRmTrns = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        ToRoomTrns
                        
                    )
                    
                });
                console.log('toRmTrns>  ' + toRmTrns)

                let fromRmTrns = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        FromRoomTrns
                        
                    )
                    
                });

                console.log('fromRmTrns>  ' + fromRmTrns)

                let toRmTrns2 = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        ToRoomTrns
                        
                    )
                    
                });
                console.log('toRmTrns2>  ' + toRmTrns2)

                let fromRmTrns2 = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        FromRoomTrns
                        
                    )
                    
                });
                console.log('fromRmTrns2>  ' + fromRmTrns2)
                
                
            }

            if(this.state.paymentMethod2==="Complimentary"){
                var toRoomCompl = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    refID:`${this.state.todepTrnID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:Math.abs(parseInt(`${this.state.depTrnfAmount}`)),
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.toRoom}`,
                    description:`${this.state.depTrnDescription} from ${this.state.roomNum}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }

                var fromRoomCompl = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    refID:`${this.state.fromdepTrnID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:-Math.abs(parseInt(`${this.state.depTrnfAmount}`)),
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.roomNum}`,
                    description:`${this.state.depTrnDescription} to ${this.state.toRoom}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }

                
                let rmTrnCompl1 = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        toRoomCompl
                        
                    )
                    
                });
                console.log('rmTrnCompl1>  ' + rmTrnCompl1)

                let rmTrnCompl2 = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        fromRoomCompl
                        
                    )
                    
                });
                console.log('rmTrnCompl2>  ' + rmTrnCompl2)

                let rmTrnCompl3 = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        toRoomCompl
                        
                    )
                    
                });
                console.log('rmTrnCompl3>  ' + rmTrnCompl3)

                let rmTrnCompl4 = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        fromRoomCompl
                        
                    )
                    
                });
                console.log('rmTrnCompl4>  ' + rmTrnCompl4)

                
            }

            alert("Deposit Transferred to Room " +this.state.toRoom)
            
            this.setState({paymentMethod2:''})
            this.setState({editdepositTrnfr:false})
            window.location.reload();
            
            
                    
        } catch(e) {
        console.log(e)
        }
        
    }


    async handleCityLedger() {
        if(this.state.CheckOutBtn==='Bill Settlement'){
            try {
            
                var cityLedgerPost = {
                    phone:`${this.state.phoneCode}`,
                    date: moment(`${this.state.cityLedgerDate}`).format('MMM DD YYYY'),
                    Amount:parseInt(`${this.state.newBal2}`),
                    description:`${this.state.CheckOutBtn}`,
                    CityLedgerCode:`${this.state.cityLedgerID}`,
                    roomNumbers:`${this.state.roomNum}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }
    
                var guestAccount2 = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    _id:Math.floor(Math.random()*100000000),
                    refID:`${this.state.cityLedgerID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:Math.abs(parseInt(`${this.state.newBal2}`)),
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:'Transfer',
                    roomNumbers:`${this.state.roomNum}`,
                    description:`${this.state.cityLedgerDescription}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift') 
                }
                let result1 = await fetch(postToCityLedger, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        cityLedgerPost
                        
                    )
                    
                });
              
                console.log('result1>  ' + result1)
                let result1b = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        guestAccount2
                        
                    )
                    
                });
              
                console.log('result1b>  ' + result1b)

                let result1bc = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        guestAccount2
                        
                    )
                    
                });
              
                console.log('result1bc>  ' + result1bc)
                
                alert("Balance Posted for Room " +this.state.roomNum)
                
                this.setState({editcityLedger:false})
                window.location.reload();
                
                        
            } catch(e) {
                console.log(e)
            }
            
        }
        else if (this.state.CheckOutBtn==='Guest Refund'){
            try {
            
                var cityLedgerPost2 = {
                    phone:`${this.state.phoneCode}`,
                    date: moment(`${this.state.cityLedgerDate}`).format('MMM DD YYYY'),
                    Amount:parseInt(`${this.state.newBal2}`),
                    description:`${this.state.CheckOutBtn}`,
                    CityLedgerCode:`${this.state.cityLedgerID}`,
                    roomNumbers:`${this.state.roomNum}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                    
                }
    
                
                var guestAccount = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    _id:Math.floor(Math.random()*100000000),
                    refID:`${this.state.cityLedgerID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:-Math.abs(parseInt(`${this.state.newBal2}`)),
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:'Transfer',
                    roomNumbers:`${this.state.roomNum}`,
                    description:`${this.state.cityLedgerDescription}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift') 
                }
    
                let result1 = await fetch(postToCityLedger, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        cityLedgerPost2
                        
                    )
                    
                });
               
                console.log('result1>  ' + result1)

                let result1b = await fetch(postGuestDeposit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        guestAccount
                        
                    )
                    
                });
              
                console.log('result1b>  ' + result1b)

                let result1bc = await fetch(TempRoomDepositUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        guestAccount
                        
                    )
                    
                });
              
                console.log('result1bc>  ' + result1bc)
                
                
                alert("Balance Posted for Room " +this.state.roomNum)
                
                this.setState({editcityLedger:false})
                window.location.reload();
                
                        
            } catch(e) {
                console.log(e)
            }
            
        }
        

    }


    
    offload(){
        this.setState({Balance:0});
        this.setState({calDeposits:0});
        this.setState({calDockets:0});
        this.setState({calcAccommodatn:0});
        this.setState({calcVAT:0});
        this.setState({calcTourismLev:0});
        this.setState({VAT:0});
        this.setState({TourismLevy:0});
        this.setState({Oths:0});
        this.setState({newBal2:0});
        this.setState({TotalRmRate:0});
        this.props.history.push('/BillingMenu');

        this.guestBalance()

    }

    async guestBalance() {
    
        try {
            var getrefID = sessionStorage.getItem('gstrefID')
            var statusUpdate = {

                status:`${this.state.balanceStatus}`,
                roomtypeName:`${this.state.balanceRoomType}`,
                fname:`${this.state.balanceFname}`,
                lname:`${this.state.balanceLname}`,
                roomStatus:`${this.state.balanceRoomStatus}`,
                BillStatus:parseInt(`${this.state.newBal2}`),
                refID:`${this.state.balanceRefID}`,

            }
            
            
            let result2 = await fetch(`${editRoomStat}/${getrefID}`, {
                method:'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                 
                },
                body: JSON.stringify(
                    statusUpdate
                )
        
            });
            console.log('result2>  ' + result2)
        
        } catch(e) {
            console.log(e)
        }

    }

    renderPayMeth(data){
        if(data) {
            return data.map((item) => {
                return(
                    <>
                        <option key={item.method} value={item.method}>
                            {item.method}
                            
                        </option>
                    </>
                )
            })
        }
    }

    renderTrnfRooms(data){
        if(data) {
           data.sort((a, b) => a.roomNumbers - b.roomNumbers);
            return data.map((item, index) => {
                return(
                    <>
                        <option key={index} value={item.roomNumbers}>
                            {item.roomNumbers} - {item.fname} {item.lname}
                        </option>
                    </>
                )
            })
        }
    }

    
    accommodationInfo=(data)=>{
        if(data){
            return data.map((item)=>{
                if(item.refID ===`${sessionStorage.getItem('gstrefID')}`){
                    return(
                        <>
                            <div className="row">
                                <div className="col-4">
                                <p className="textSize">Names: {item.lname} {item.fname}</p>
                                <p className="textSize">Contact Address: {item.Address}</p>
                                <p className="textSize">Phone Num: {item.phone}</p>
                                <p className="textSize">Folio Num: {item.refID}</p>
                                    
                                </div>

                                <div className="col-4">
                                <p className="textSize">Room Type: {item.roomtypeName} {item.roomNumbers}</p>
                                <p className="textSize">Room Rate: <NumberFormat value= {item.roomRate}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>
                                <p className="textSize">Discount Type: {item.discounType}</p>
                                <p className="textSize">Discount Amount: <NumberFormat value= {item.discountAmount}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className="col-4">
                                <p className="textSize">Group: {item.group}</p>
                                <p className="textSize">Arrival Date: {this.state.arrivalDate}</p>
                                <p className="textSize">Departure Date: {this.state.departureDate}</p>
                                <p className="textSize">Num. of Nights: {this.state.stay}</p>
                                </div>


                            </div>
                            

                        </>
                    )
                }

                return(
                    <>

                    </>
                )
            })
            
        }
           
    }
    

    renderRooms=(data)=>{
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>new Date(a.tranDate) - new Date(b.tranDate));
                var TDate = moment(item.tranDate).format('MMM DD YYYY')
                if(item.refID ===`${sessionStorage.getItem('gstrefID')}`){
                    
                    return(
                        <>
                            <tr key= {item.refID}>
                                
                                <td className="table-light table-striped adjust2b">{TDate}</td>
                                <td className="table-light table-striped adjust2b">{item.roomNumbers}</td>
                                <td className="table-light table-striped adjust2b">{item.description}</td>
                                <td className="table-light table-striped adjust2b"><NumberFormat value={item.dailyRate}thousandSeparator={true}displayType={"text"}/></td>
                                
                                
                            </tr> 
                        </>
                    )
                }

                return(
                    <>

                    </>
                )
            })
            
        }
           
    }
    loadRooms(data){
        if(data) {
           data.sort((a, b) => a.roomNumbers - b.roomNumbers);
            return data.map((item, index) => {
                return(
                    <>
                        <option key={index} value={item.roomNumbers}>
                            {item.roomNumbers} - {item.fname} {item.lname}
                        </option>
                    </>
                )
            })
        }
    }

    renderDockets=(data)=>{
        if(data){
            return data.map((item)=>{
                if(item.refID ===`${sessionStorage.getItem('gstrefID')}`){
                    return(
                        <>
                             <tr key= {item.refID}>
                                
                                <td className="table-light table-striped adjust2b">{item.date}</td>
                                <td className="table-light table-striped adjust2b">{item.docketNum}</td>
                                <td className="table-light table-striped adjust2b">{item.description}</td>
                                <td className="table-light table-striped adjust2bc"><NumberFormat value={item.cost}thousandSeparator={true}displayType={"text"}/></td>
                                
                            </tr>
                        </>
                    )
                }

                return(
                    <>

                    </>
                )
            })
            
        }
           
    }

    renderDeposits=(data)=>{
        if(data){
            return data.map((item)=>{
                if(item.refID ===`${sessionStorage.getItem('gstrefID')}`){
                    return(
                        <>
                             <tr key= {item.refID}>
                                
                                <td className="table-light table-striped adjust2b">{item.date}</td>
                                <td className="table-light table-striped adjust2b">{item.receiptNum}</td>
                                <td className="table-light table-striped adjust2b">{item.description}</td>
                                <td className="table-light table-striped adjust2b">{item.paymentMethod}</td>
                                <td className="table-light table-striped adjust2bc"><NumberFormat value={item.POSAmount||item.CashAmount||item.TransferAmount||item.CompDebit||item.roomDebit}thousandSeparator={true}displayType={"text"}/></td>
                                
                            </tr>
                        </>
                    )
                }

                return(
                    <>

                    </>
                )
            })
            
        }
           
    }
        
    
    render() {
        console.log(">>> Inside Gstrender", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Billinglogin/>
                </>
            )

        }
        return(
            
            <div className ="container">
                <div>
                        <img src={picture} className="alignImg2" style={{width:"100px", height:"70px"}} alt="companylogo"/>
                    </div>
                <div>
                    <center>
                        <h6>{this.state.Hotelname}</h6>
                        <p className="textSize">{this.state.Hoteladdress}</p>
                        <p className="textSize">{this.state.Hotelphone}</p>

                    </center>
                </div>
                <center><h5>Guest Bill</h5></center>
                
                <h6>Accommodation Details</h6>
                <hr/>
                {this.accommodationInfo(this.state.guestDetails)}
                <hr/>
                               
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Date</th>
                            <th className="adjust5">Room Num</th>
                            <th className="adjust5">Description</th>
                            <th className="adjust5">Daily Rate(NGN)</th>
                           
                            
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderRooms(this.state.roomCharging)}
                        
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-3">
                        <h6>Accommodation: <NumberFormat value={this.state.calcAccommodatn} thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </div>
                    {/* <div className="col-3">
                        <p>VAT (7.5%): <NumberFormat value={this.state.calcVAT}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>
                    </div>
                    <div className="col-3">
                        <p>Tourism Levy (10%): <NumberFormat value={this.state.calcTourismLev}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>
                    </div>
                    <div className="col-3">
                        <h6>Grand Total: <NumberFormat value={this.state.calcAccommodatn + this.state.calcVAT + this.state.calcTourismLev}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </div> */}
                </div>
                <hr/>
                
                <h6>Room Service Details</h6>
                
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Date</th>
                            <th className="adjust5">Docket Num</th>
                            <th className="adjust5">Description</th>
                            <th className="adjust5b">Amount (NGN)</th>
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderDockets(this.state.guestbilldetails)}
                        <h6>Room Service Total: <NumberFormat value={this.state.calDockets}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </tbody>
                </table>  
                <hr/>
                
                <h6>Guest Deposits</h6>
                
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Date</th>
                            <th className="adjust5">Receipt Num</th>
                            <th className="adjust5">Description</th>
                            <th className="adjust5">Payment Method</th>
                            <th className="adjust5b">Deposit Amount(NGN)</th>
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderDeposits(this.state.guestDeposits)}
                        <h6>Total Deposit: <NumberFormat value={this.state.calDeposits}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </tbody>
                </table>    
                <hr/>
            
                <h6 style={{color:(`${this.state.color}`)}}>Bill Summary</h6>
                <hr/>
                <div className="row">
                    <div className="col-3">
                        <h6>Total Deposit:</h6><p><NumberFormat value={this.state.calDeposits}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>
                    </div>
                    <div className="col-3">
                        <h6>Accommodation:</h6><p><NumberFormat value={this.state.calcAccommodatn}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>
                    </div>
                    <div className="col-3">
                        <h6>Room Service:</h6><p><NumberFormat value={this.state.calDockets}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>    
                    </div>
                   <div className="col-3">
                        <h6 style={{color:(`${this.state.color}`)}}>Balance:</h6><h6 style={{color:(`${this.state.color}`)}}><NumberFormat value={this.state.calDeposits - (this.state.calcAccommodatn + this.state.calDockets)}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>   
                   </div>
                    
                </div>     
                <center>
                    <button className="btn btn-danger printing" onClick={ () => this.offload() }>Close</button>
                    <button className="btn btn-primary movebtn printing" onClick={ () => window.print() }>Print</button>
                    <button style={{backgroundColor:(`${this.state.color}`)}} className="btn btn-danger movebtn printing" onClick={ () =>this.onOpenPword() }>{this.state.CheckOutBtn}</button>
                    <button disabled={this.state.CheckOutBtn==='Check Out'} className="btn btn-warning movebtn printing" onClick={ () =>this.onOpenPword2() }>Add to City Ledger</button>
                    <button disabled={this.state.CheckOutBtn==='Check Out'||this.state.CheckOutBtn==='Bill Settlement'} className="btn btn-warning movebtn printing" onClick={ () =>this.onOpenModaltransfer() }>Transfer Deposit</button>
                        
                        
                </center>       
                <br/> <br/>

                <Modal open={this.state.edit} onClose={()=>this.onCloseModaledit()} style={{color:"silver"}}>
                    <div className = "background591100">
                        <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-70px'}}>{this.state.description2}</h4>
                        <div className="formdesign50211">
                            <center>
                                <div className="row">
                                
                                    <div className="col-3 mb-3">
                                        <p className="form-select mb-2 btn btn-primary mt-3" style={{marginLeft:'5px', width:'160px'}}>{this.state.description2}</p>
                                    </div>
                                    
                                <div className="col-3 mb-3">
                                    <p className="form-select mb-2 btn btn-primary mt-3"style={{marginRight:'30px', width:'160px'}}>{this.state.roomNum}</p>
                                </div>
                                    
                                    <div className="col-3 mb-3">
                                        <select type ="button" className="form-select mb-2 btn btn-primary mt-3 blinkblink" style={{marginRight:'30px', width:'160px'}} name="paymentMethod2" onChange={this.handleChange} >
                                            <option selected value=''>Payment Method</option>
                                            {this.renderPayMeth(this.state.displayPaymentMethods)}
                                            
                                        </select>
                                    </div>
                                    
                                    <div className="col-3 mb-3">
                                        <input type="number" className="form-control mb-3 mt-3" style={{marginRight:'30px', width:'140px'}} name="depositAmount" value={this.state.newBal2} readOnly/>
                                    </div>
                                    
                                </div>
                            </center>
                            
                        </div>
                        <div>
                            <center>
                                <button disabled={this.state.paymentMethod2===''} className="btn btn-warning mt-3" onClick={ () => this.handleRoomDeposit()}>Post Deposit</button>
                                <button className="btn btn-danger flipright mt-3" onClick={()=> {this.onCloseModaledit();this.onClosePword()}}>Close</button>
                            </center>
                            
                            <hr style={{color:'silver'}}/>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.pword} onClose={()=>this.onClosePword()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Access Required</h6>
                            <div>
                                <center>
                                    
                                    <input type="password" autoComplete="off" className="form-control mb-3 formsize51" name="pass" require placeholder="Enter Access Code" value={this.state.pass} onChange={this.handleChange}/>
                                    <button disabled = {this.state.pass===''} className="btn btn-warning formsize91" onClick={()=>this.AllowRefund()}>Login</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.pword2} onClose={()=>this.onClosePword2()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Access Required</h6>
                            <div>
                                <center>
                                    
                                    <input type="password" autoComplete="off" className="form-control mb-3 formsize51" name="pass" require placeholder="Enter Access Code" value={this.state.pass} onChange={this.handleChange}/>
                                    <button disabled = {this.state.pass===''} className="btn btn-warning formsize91" onClick={()=>this.AllowCityLedger()}>Login</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.editdepositTrnfr} onClose={()=>this.onCloseModaltransfer()} style={{color:"silver"}}>
                    <div className = "background591100Tr">
                        <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-70px'}}>{this.state.depTrnDescription}</h4>
                        <div className="formdesign50211Tr">
                            <center>
                                <div className="row">
                                
                                    <div className="col-4 mb-3">
                                        <p className="form-control mb-2 btn btn-primary mt-3" style={{marginLeft:'5px', width:'160px'}}>{this.state.depTrnDescription}</p>
                                    </div>
                                    
                                    <div className="col-4 mb-3">
                                        <p className="form-control mb-2 btn btn-primary mt-3"style={{marginRight:'30px', width:'160px'}}>From: {this.state.roomNum}</p>
                                    </div>

                                    <div className='col-4 mb-3'>
                                        <select type ="button" className="form-select mb-2 btn btn-primary mt-3" name="toRoom" onChange={this.handleChange2}>
                                            <option selected value=''>Rooms</option>
                                            {this.loadRooms(this.state.allRooms)}
                                                                                        
                                        </select>
                                    </div>
                                    <div className="col-4 mb-3">
                                        <select type ="button" className="form-select mb-2 btn btn-primary mt-3 blinkblink" style={{marginLeft:'8px', width:'160px'}} name="paymentMethod2" onChange={this.handleChange}>
                                            <option selected value=''>Payment Method</option>
                                            {this.renderPayMeth(this.state.getAllPayMeth)}
                                            
                                        </select>
                                    </div>

                                    <div className="col-4 mb-3">
                                        <p className="form-control mb-2 btn btn-primary mt-3"style={{marginRight:'30px', width:'160px'}}>{this.state.depTrnfAmount}</p>
                                    </div>
                                
                                </div>
                                
                            </center>
                            
                        </div>
                        <div>
                            <center>
                                <button disabled={this.state.depTrnfAmount===''||this.state.paymentMethod2===''} className="btn btn-warning mt-3" onClick={ () => this.handleDepositTransfer()}>Post</button>
                                <button className="btn btn-danger flipright mt-3" onClick={()=> this.onCloseModaltransfer()}>Close</button>
                            </center>
                            
                            <hr style={{color:'silver'}}/>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.editcityLedger} onClose={()=>this.openCityLedger()} style={{color:"silver"}}>
                    <div className = "background591100">
                        <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-70px'}}>{this.state.cityLedgerDescription}</h4>
                        <div className="formdesign50211">
                            <center>
                                <div className="row">
                                
                                    <div className="col-3 mb-2">
                                        <p className="form-select mb-2 btn btn-primary mt-3" style={{marginLeft:'5px', width:'160px'}}>{this.state.cityLedgerDescription}</p>
                                    </div>
                                    
                                    <div className="col-3 mb-2">
                                        <p className="form-select mb-2 btn btn-primary mt-3"style={{marginRight:'30px', width:'160px'}}>{this.state.roomNum}</p>
                                    </div>
                                        
                                    <div className="col-3 mb-2">
                                        <input type="number" className="form-control mb-3 mt-3" style={{marginRight:'30px', width:'140px'}} name="phoneCode" value={this.state.phoneCode} readOnly/>
                                    </div>
                                    
                                    <div className="col-3 mb-2">
                                        <input type="number" className="form-control mb-3 mt-3" style={{marginRight:'30px', width:'140px'}} name="cityLedgerAmount" value={this.state.newBal2} readOnly/>
                                    </div>
                                    
                                </div>
                            </center>
                            
                        </div>
                        <div>
                            <center>
                                <button disabled={this.state.phoneCode===''} className="btn btn-warning mt-3" onClick={ () => this.handleCityLedger()}>Post</button>
                                <button className="btn btn-danger flipright mt-3" onClick={()=> {this.closeCityLedger();this.onClosePword2()}}>Close</button>
                            </center>
                            
                            <hr style={{color:'silver'}}/>
                        </div>
                    </div>
                </Modal>
            </div>
            
            
        )
    }

    async componentDidMount() {
        
        console.log(">>> Inside GstDidMount", this.state)
        this.myTimer = setInterval(() => {
            var guestID = sessionStorage.getItem('gstrefID');
                
            fetch(`${getRoomRateUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({roomCharging:data});

                var allRoomRates = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.dailyRate)
                }, 0);
                this.setState({calRoomRate:allRoomRates})
                sessionStorage.setItem('RoomCalc',allRoomRates)

                this.myTimer = setTimeout(() => {
                    var GD = this.state.roomCharging;
                    GD.map((item)=>{
                        this.setState({
                            dailyRateNow:item.dailyRate,
                            
                        })
                        var depDate = new Date()
                        var fmtdepDate = moment(depDate).format('YYYY-DD-MMM');
                        this.setState({departureDate:fmtdepDate})

                        let arrDate = moment(sessionStorage.getItem('getarrvDt')).format('YYYY-DD-MMM');
                        this.setState({arrivalDate:arrDate});
                        var thisDate = item.tranDate;
                        var endDate = moment(thisDate);
                        sessionStorage.setItem('endate',endDate)
                        var checkinDate = moment(sessionStorage.getItem('getarrvDt'));
                        sessionStorage.setItem('chkindate',checkinDate)
                        var diff = endDate.diff(checkinDate);
                        var comp = Math.ceil(diff/(1000*3600*24));
                        sessionStorage.setItem('difdate',comp);
                        this.setState({stay:parseInt(sessionStorage.getItem('difdate'))})
                        
                        fetch(`${getBillrefIDsUrl}${guestID}`, {method:'GET'})
                        .then((res) => res.json())
                        .then((data) => {
                            this.setState({guestbilldetails:data})

                            var allDockets = data.map(item => item).reduce((totals, item) =>{
                                return totals + parseInt(item.cost)
                            }, 0);
                            this.setState({calDockets:allDockets})
                            sessionStorage.setItem('Dockets',allDockets)


                        })


                        
                        var TotalRmRate =0;
                        TotalRmRate = allRoomRates;
                        
                        this.setState({
                            calcAccommodatn:TotalRmRate,
                            TotalRmRate:TotalRmRate,
                                                        
                        })
                        sessionStorage.setItem('TotRmRate',TotalRmRate)
                        return 'ok'
                    })
                },1000)
                
                
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getRoomRateUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({roomCharging:data});

                    var allRoomRates = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.dailyRate)
                    }, 0);
                    this.setState({calRoomRate:allRoomRates})
                    sessionStorage.setItem('RoomCalc',allRoomRates)

                    this.myTimer = setTimeout(() => {
                        var GD = this.state.roomCharging;
                        GD.map((item)=>{
                            this.setState({
                                dailyRateNow:item.dailyRate,
                                
                            })
                            var depDate = new Date()
                            var fmtdepDate = moment(depDate).format('YYYY-DD-MMM');
                            this.setState({departureDate:fmtdepDate})

                            let arrDate = moment(sessionStorage.getItem('getarrvDt')).format('YYYY-DD-MMM');
                            this.setState({arrivalDate:arrDate});
                            var thisDate = item.tranDate;
                            var endDate = moment(thisDate);
                            sessionStorage.setItem('endate',endDate)
                            var checkinDate = moment(sessionStorage.getItem('getarrvDt'));
                            sessionStorage.setItem('chkindate',checkinDate)
                            var diff = endDate.diff(checkinDate);
                            var comp = Math.ceil(diff/(1000*3600*24));
                            sessionStorage.setItem('difdate',comp);
                            this.setState({stay:parseInt(sessionStorage.getItem('difdate'))})
                            
                            fetch(`${getBillrefIDsUrl}${guestID}`, {method:'GET'})
                            .then((res) => res.json())
                            .then((data) => {
                                this.setState({guestbilldetails:data})

                                var allDockets = data.map(item => item).reduce((totals, item) =>{
                                    return totals + parseInt(item.cost)
                                }, 0);
                                this.setState({calDockets:allDockets})
                                sessionStorage.setItem('Dockets',allDockets)


                            })


                            
                            var TotalRmRate =0;
                            TotalRmRate = allRoomRates;
                            
                            this.setState({
                                calcAccommodatn:TotalRmRate,
                                TotalRmRate:TotalRmRate,
                                                            
                            })
                            sessionStorage.setItem('TotRmRate',TotalRmRate)
                            return 'ok'
                        })
                    },1000)
                    
                    
                })
            },1000)

            
            fetch(`${getCheckinrefIDUrl}${guestID}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({guestDetails:data});
                this.setState({roomNum: data.map((item) => item.roomNumbers)});
                this.setState({roomType: data.map((item) => item.roomtypeName)})
                this.setState({phoneCode: data.map((item) => item.phone)})
                this.setState({emailCode: data.map((item) => item.email)})
                this.setState({firstName: data.map((item) => item.fname)})
                this.setState({lastName: data.map((item) => item.lname)})
                data.map((item)=>{
                    this.setState({
                        balanceStatus:item.status,
                        balanceFname:item.fname,
                        balanceLname:item.lname,
                        balanceRoomType:item.roomtypeName,
                        balanceRoomStatus:item.roomStatus,
                        chktAddress:item.Address,
                        chkGender:item.Gender,
                        chkID:item.ID,
                        chkNokFname:item.NokFname,
                        chkNationality:item.Nationality,
                        chkNokLname:item.NokLname,
                        chkNokMname:item.NokMname,
                        chkNokPhone:item.NokPhone,
                        chkNokRelationship:item.NokRelationship,
                        chkPOV:item.POV,
                        chkServiceCharge:item.ServiceCharge,
                        chkTourismLevy:item.TourismLevy,
                        chkVAT:item.VAT,
                        chkArrivalDate:item.arrivalDate,
                        chkCalculatedstay:item.calculatedstay,
                        chkComingFrom:item.comingFrom,
                        chkDailyRate:item.dailyRate,
                        chkdepartureDate:item.departureDate,
                        chkdiscounType:item.discounType,
                        chkdiscountAmount:item.discountAmount,
                        chkdob:item.dob,
                        chkemail:item.email,
                        chkfname:item.fname,
                        chkgointTo:item.goingTo,
                        chkgroup:item.group,
                        chklname:item.lname,
                        chkmiddlename:item.middlename,
                        chkmob:item.mob,
                        chkoccupation:item.occupation,
                        chkpassportNum:item.passportNum,
                        chkphone:item.phone,
                        chkpostBillStatus:item.postBillStatus,
                        chkrefID:item.refID,
                        chkroomNumbers:item.roomNumbers,
                        chkroomRate:item.roomRate,
                        chkroomStatus:item.roomStatus,
                        chkroomtypeName:item.roomtypeName,
                        chkstatus:item.status,
                        chkstay:item.stay,
                        chktitle:item.title,
                        chktransactionDate:item.transactionDate,
                        chk_id:item._id


                    })
                    return 'ok'
                })
                
                data.map((item)=>{
                this.setState({
                        org:item.group
                    })
                    return 'ok'
                })
                
            })

            fetch(`${getDepositsUrl}${guestID}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({guestDeposits:data})

                var allPOS = data.map(item => item).reduce((deposits, obj) =>{
                    return deposits + parseInt(obj.POSAmount)
                }, 0);

                var allCash = data.map(item => item).reduce((deposits, obj) =>{
                    return deposits + parseInt(obj.CashAmount)
                }, 0);

                var allTransfer = data.map(item => item).reduce((deposits, obj) =>{
                    return deposits + parseInt(obj.TransferAmount)
                }, 0);

                var allComp = data.map(item => item).reduce((deposits, obj) =>{
                    return deposits + parseInt(obj.CompDebit)
                }, 0);

                var alDeposits = 0;
                var allDeposits = alDeposits + allPOS + allCash + allTransfer + allComp;
                this.setState({calDeposits:allDeposits})
                sessionStorage.setItem('Deposits',allDeposits)
            })

            this.myTimer = setTimeout(() => {
                var DO = parseInt(sessionStorage.getItem('Dockets'));
                var DE = parseInt(sessionStorage.getItem('Deposits'));
                var ACC = parseInt(sessionStorage.getItem('TotRmRate'));

                var comS = 0;
                comS = DO + ACC;

                var bal = 0;
                bal = DE - comS;

                this.setState({
                    newBal:Math.sign(bal),
                    newBal2:bal
                })

                this.myTimer = setTimeout(() => {
                    if(this.state.newBal===1&&this.state.org===''){
                        this.setState({
                            color:'blue',
                            CheckOutBtn:'Guest Refund'
                        })
                    }
                                        
                    else if(this.state.newBal===-1&&this.state.org===''){
                        this.setState({
                            color:'red',
                            CheckOutBtn:'Bill Settlement'
                        })

                    }

                    else if(this.state.newBal===0&&this.state.org!==''){
                        this.setState({
                            color:'green',
                            CheckOutBtn:'Check Out'
                        })
                    }

                    else if(this.state.newBal===1&&this.state.org!==''){
                        this.setState({
                            color:'green',
                            CheckOutBtn:'Check Out'
                        })
                    }

                    else if(this.state.newBal===-1&&this.state.org!==''){
                        this.setState({
                            color:'green',
                            CheckOutBtn:'Check Out'
                        })
                    }


                },1000)
                
            },1000);

            
           
            fetch(`${userName}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    loginDetails:data
                })
                data.map((item)=>{
                    sessionStorage.setItem('dptmnt', item.department)
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

            fetch(`${getWorkDate}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({transactionDate:item.date})
                    return 'ok'
                })
                
            
            })


           
        },1000)
        
        
    }
    
}

export default Guestbill;