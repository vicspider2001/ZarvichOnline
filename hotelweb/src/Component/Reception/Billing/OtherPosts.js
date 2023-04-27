import React,{Component} from 'react';
import './OtherPosts.css';
import moment from 'moment';
import Billinglogin from '../../Billinglogin';
import {Modal} from 'react-responsive-modal';
import NumberFormat from 'react-number-format';
import 'bootstrap/dist/css/bootstrap.min.css';



const postOtherSalesUrl = "http://10.1.0.99:3333/otherSales";
const postLaundrySalesUrl = "http://10.1.0.99:3333/postLaundry";
const postGymSalesUrl = "http://10.1.0.99:3333/GymnasiumSales";
const postSmoothiesSalesUrl = "http://10.1.0.99:3333/SmoothiesSales";
const postSwimmingSalesUrl = "http://10.1.0.99:3333/SwimmingSales";
const postHallHireSalesUrl = "http://10.1.0.99:3333/HallHireSales";
const postShishaSalesUrl = "http://10.1.0.99:3333/ShishaSales";
const postBbqSalesUrl = "http://10.1.0.99:3333/BbqSales";
const postMiniMartSalesUrl = "http://10.1.0.99:3333/MiniMartSales";
const dailysalesPost = "http://10.1.0.99:3333/add";
// const postOthersupdater = "http://10.1.0.99:3333/postothersupdater";
const getRooms ="http://10.1.0.99:3333/checkin?docket=Yes";
const getCityLedger ="http://10.1.0.99:3333/getcityLedger?phoneNumb=";
const delCityLedger ="http://10.1.0.99:3333/delcityLedger";
const getGuestID = "http://10.1.0.99:3333/checkin?roomNumID=";
const postGuestDeposit = "http://10.1.0.99:3333/rmDeposit";
const postGuestDocket = "http://10.1.0.99:3333/bill";
const getPaymentMethods = "http://10.1.0.99:3333/paymentMethods";
const RoomUrl = "http://10.1.0.99:3333/getrmstatus";
const depositUrl = "http://10.1.0.99:3333/roomDeposits";
const TempRoomDepositUrl = "http://10.1.0.99:3333/PostTmpRmDep";
const getOrgUrl = "http://10.1.0.99:3333/org?grpName=";
const getDeptsWitOutPC = "http://10.1.0.99:3333/DeptWitOutPC";
const postFunctionBill = "http://10.1.0.99:3333/functionBillPost";
const postTempFunctionBill = "http://10.1.0.99:3333/PostTempfunction";
const HallUrl = "http://10.1.0.99:3333/getHalls?hallType=";
const userName = "http://10.1.0.99:3333/billingUserInfo";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";
const getWorkDate = "http://10.1.0.99:3333/getActive";


class OtherPosts extends Component {

    constructor(props) {
        super (props);
        console.log(">>>Inside OthrConstructor",props)

        this.state = {
            rate:'',
            guestInhouseID:'',
            amountPaid:'',
            roomNumbers:'',
            paymentMethod:'',
            paymentMethod3:'',
            paymentMethod2:'',
            displayPaymentMethods:'',
            displayRoomNums:'',
            displayAllRoomNums:'',
            displayDeposits:'',
            transactionDate:'',
            description1:'',
            description2:'',
            description3:'',
            amountPaid3:'',
            depositAmount:'',
            rmType:'',
            cost:'',
            roomNumbers3:'',
            cost3:'',
            org:'',
            orgName:'',
            group:'',
            functionDeposit:'',
            description12:'',
            orgID:'',
            email:'',
            phone:'',
            class:'',
            paymentMethod4:'',
            displayAllHalls:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',

            cityLedgerData:'',
            phoneCode:'',

            printBTN:'Print',

            othersedit:false,
            deptwdpc:false,
            deptwdpc2:false,
            deptwdpc3:false,
            deptwdpc4:false,
            deptwdpc5:false,
            deptwdpc6:false,
            deptwdpc7:false,
            depositedit:false,
            functionedit:false,
            Dcktedit:false,

            arrivalDate:'',
            departureDate:'',

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:'',

            otherDepartments:'',
            CashPay:0,
            POSPay:0,
            TransferPay:0,
            CompPay:0,
            DeptsWdPC:''

        
        }   
        
    }

    onOpenDktModal(){
        this.setState({
            Dcktedit:true,
        })
        
        
    }

    
    onCloseDktModal(){
        this.setState({
            Dcktedit: false
        })
        
    }

    onCloseDepModal(){
        this.setState({
            depositedit: false
        })
        
    }

    onOpenDepModal(){
        this.setState({
            depositedit: true

        })
        
        
    }

    onCloseOthrspModal(){
        this.setState({
            othersedit: false
        })
        
    }

    onOpenOthrsModal(){
        this.setState({
            othersedit: true

        })
        
        
    }
    setfigures(){
        if(this.state.CashPay===''){
            this.setState({CashPay:0})
        }

        if(this.state.POSPay===''){
            this.setState({POSPay:0})
        }

        if(this.state.TransferPay===''){
            this.setState({TransferPay:0})
        }

        if(this.state.CompPay===''){
            this.setState({CompPay:0})
        }
        
    }

    onOpendeptwoutpcModal(){
        if(this.state.otherDepartments==="Laundry"){
            
            this.handleLaundry()
        }

        if(this.state.otherDepartments==="Gymnasium"){
            this.handleGymn()
        }

        if(this.state.otherDepartments==="Pizza"){
            this.handleSmoothie()
        }

       if(this.state.otherDepartments==="MiniMart"){
            this.handleMiniMart()
        }

        if(this.state.otherDepartments==="Barbeque"){
            this.handleBbq()
        }

        if(this.state.otherDepartments==="Shisha"){
            this.handleShisha()
        }

        if(this.state.otherDepartments==="HallHire"){
            this.handleHallHires()
        }

        if(this.state.otherDepartments==="Swimming"){
            this.handleSwimming()
        }
        
        
        
    }

    

    onCloseFunctnModal(){
        this.setState({
            functionedit: false
        })
        
    }

    onOpenFunctnModal(){
        this.setState({
            functionedit: true

        })
        
        
    }

    sendtoprinterDkt(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({Dcktedit: false})      
            this.setState({printBTN:'Print'})

            this.handleRoomDockets()
            
        }
        
       
    }

   
    sendtoprinterDep(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({depositedit: false})      
            this.setState({printBTN:'Print'})

            this.handleRoomDeposit()
            
        }
        
       
    }

    sendtoprinterOthrs(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({othersedit: false})      
            this.setState({printBTN:'Print'})

            this.handleSubmit()
            
        }
        
       
    }

    // sendtoprinterDeptWP(){
    //     if(this.state.printBTN==='Print'){
    //         window.print();
    //         this.setState({printBTN:'Close'})
    //     }
    //     else if(this.state.printBTN==='Close'){
    //         this.setState({deptwdpc: false})      
    //         this.setState({printBTN:'Print'})
            
    //         this.handleLaundry()
    //         // if(this.state.otherDepartments==='Laundry'){
    //         //     this.handleLaundry()
    //         // }

    //         // else if(this.state.otherDepartments==='Gymnasium'){
    //         //     this.handleGymn()
    //         // }

    //         // else if(this.state.otherDepartments==='Smoothie'){
    //         //     this.handleSmoothie()
    //         // }

    //         // else if(this.state.otherDepartments==='MiniMart'){
    //         //     this.handleMiniMart()
    //         // }

    //         // else if(this.state.otherDepartments==='Barbeque'){
    //         //     this.handleBbq()
    //         // }

    //         // else if(this.state.otherDepartments==='Shisha'){
    //         //     this.handleShisha()
    //         // }

    //         // else if(this.state.otherDepartments==='HallHire'){
    //         //     this.handleHallHires()
    //         // }

    //     }
        
    // }

    // sendtoprinterDeptWP2(){
    //     if(this.state.printBTN==='Print'){
    //         window.print();
    //         this.setState({printBTN:'Close'})
    //     }
    //     else if(this.state.printBTN==='Close'){
    //         this.setState({deptwdpc: false})      
    //         this.setState({printBTN:'Print'})
            
    //         this.handleGymn()
    //         // if(this.state.otherDepartments==='Laundry'){
    //         //     this.handleLaundry()
    //         // }

    //         // else if(this.state.otherDepartments==='Gymnasium'){
    //         //     this.handleGymn()
    //         // }

    //         // else if(this.state.otherDepartments==='Smoothie'){
    //         //     this.handleSmoothie()
    //         // }

    //         // else if(this.state.otherDepartments==='MiniMart'){
    //         //     this.handleMiniMart()
    //         // }

    //         // else if(this.state.otherDepartments==='Barbeque'){
    //         //     this.handleBbq()
    //         // }

    //         // else if(this.state.otherDepartments==='Shisha'){
    //         //     this.handleShisha()
    //         // }

    //         // else if(this.state.otherDepartments==='HallHire'){
    //         //     this.handleHallHires()
    //         // }

    //     }
        
    // }
    // sendtoprinterDeptWP3(){
    //     if(this.state.printBTN==='Print'){
    //         window.print();
    //         this.setState({printBTN:'Close'})
    //     }
    //     else if(this.state.printBTN==='Close'){
    //         this.setState({deptwdpc: false})      
    //         this.setState({printBTN:'Print'})
            
    //         this.handleSmoothie()
    //         // if(this.state.otherDepartments==='Laundry'){
    //         //     this.handleLaundry()
    //         // }

    //         // else if(this.state.otherDepartments==='Gymnasium'){
    //         //     this.handleGymn()
    //         // }

    //         // else if(this.state.otherDepartments==='Smoothie'){
    //         //     this.handleSmoothie()
    //         // }

    //         // else if(this.state.otherDepartments==='MiniMart'){
    //         //     this.handleMiniMart()
    //         // }

    //         // else if(this.state.otherDepartments==='Barbeque'){
    //         //     this.handleBbq()
    //         // }

    //         // else if(this.state.otherDepartments==='Shisha'){
    //         //     this.handleShisha()
    //         // }

    //         // else if(this.state.otherDepartments==='HallHire'){
    //         //     this.handleHallHires()
    //         // }

    //     }
        
    // }

    // sendtoprinterDeptWP4(){
    //     if(this.state.printBTN==='Print'){
    //         window.print();
    //         this.setState({printBTN:'Close'})
    //     }
    //     else if(this.state.printBTN==='Close'){
    //         this.setState({deptwdpc: false})      
    //         this.setState({printBTN:'Print'})
            
    //         this.handleMiniMart()
    //         // if(this.state.otherDepartments==='Laundry'){
    //         //     this.handleLaundry()
    //         // }

    //         // else if(this.state.otherDepartments==='Gymnasium'){
    //         //     this.handleGymn()
    //         // }

    //         // else if(this.state.otherDepartments==='Smoothie'){
    //         //     this.handleSmoothie()
    //         // }

    //         // else if(this.state.otherDepartments==='MiniMart'){
    //         //     this.handleMiniMart()
    //         // }

    //         // else if(this.state.otherDepartments==='Barbeque'){
    //         //     this.handleBbq()
    //         // }

    //         // else if(this.state.otherDepartments==='Shisha'){
    //         //     this.handleShisha()
    //         // }

    //         // else if(this.state.otherDepartments==='HallHire'){
    //         //     this.handleHallHires()
    //         // }

    //     }
        
    // }

    // sendtoprinterDeptWP5(){
    //     if(this.state.printBTN==='Print'){
    //         window.print();
    //         this.setState({printBTN:'Close'})
    //     }
    //     else if(this.state.printBTN==='Close'){
    //         this.setState({deptwdpc: false})      
    //         this.setState({printBTN:'Print'})
            
    //         this.handleBbq()
    //         // if(this.state.otherDepartments==='Laundry'){
    //         //     this.handleLaundry()
    //         // }

    //         // else if(this.state.otherDepartments==='Gymnasium'){
    //         //     this.handleGymn()
    //         // }

    //         // else if(this.state.otherDepartments==='Smoothie'){
    //         //     this.handleSmoothie()
    //         // }

    //         // else if(this.state.otherDepartments==='MiniMart'){
    //         //     this.handleMiniMart()
    //         // }

    //         // else if(this.state.otherDepartments==='Barbeque'){
    //         //     this.handleBbq()
    //         // }

    //         // else if(this.state.otherDepartments==='Shisha'){
    //         //     this.handleShisha()
    //         // }

    //         // else if(this.state.otherDepartments==='HallHire'){
    //         //     this.handleHallHires()
    //         // }

    //     }
        
    // }

    // sendtoprinterDeptWP6(){
    //     if(this.state.printBTN==='Print'){
    //         window.print();
    //         this.setState({printBTN:'Close'})
    //     }
    //     else if(this.state.printBTN==='Close'){
    //         this.setState({deptwdpc: false})      
    //         this.setState({printBTN:'Print'})
            
    //         this.handleShisha()
    //         // if(this.state.otherDepartments==='Laundry'){
    //         //     this.handleLaundry()
    //         // }

    //         // else if(this.state.otherDepartments==='Gymnasium'){
    //         //     this.handleGymn()
    //         // }

    //         // else if(this.state.otherDepartments==='Smoothie'){
    //         //     this.handleSmoothie()
    //         // }

    //         // else if(this.state.otherDepartments==='MiniMart'){
    //         //     this.handleMiniMart()
    //         // }

    //         // else if(this.state.otherDepartments==='Barbeque'){
    //         //     this.handleBbq()
    //         // }

    //         // else if(this.state.otherDepartments==='Shisha'){
    //         //     this.handleShisha()
    //         // }

    //         // else if(this.state.otherDepartments==='HallHire'){
    //         //     this.handleHallHires()
    //         // }

    //     }
        
    // }

    // sendtoprinterDeptWP7(){
    //     if(this.state.printBTN==='Print'){
    //         window.print();
    //         this.setState({printBTN:'Close'})
    //     }
    //     else if(this.state.printBTN==='Close'){
    //         this.setState({deptwdpc: false})      
    //         this.setState({printBTN:'Print'})
            
    //         this.handleHallHires()
    //         // if(this.state.otherDepartments==='Laundry'){
    //         //     this.handleLaundry()
    //         // }

    //         // else if(this.state.otherDepartments==='Gymnasium'){
    //         //     this.handleGymn()
    //         // }

    //         // else if(this.state.otherDepartments==='Smoothie'){
    //         //     this.handleSmoothie()
    //         // }

    //         // else if(this.state.otherDepartments==='MiniMart'){
    //         //     this.handleMiniMart()
    //         // }

    //         // else if(this.state.otherDepartments==='Barbeque'){
    //         //     this.handleBbq()
    //         // }

    //         // else if(this.state.otherDepartments==='Shisha'){
    //         //     this.handleShisha()
    //         // }

    //         // else if(this.state.otherDepartments==='HallHire'){
    //         //     this.handleHallHires()
    //         // }

    //     }
        
    // }


    sendtoprinterFunctn(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({functionedit: false})      
            this.setState({printBTN:'Print'})

            this.handleFunctionDeposit()
            
        }
        
       
    }

    
    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        localStorage.removeItem('shift')
        
    }
        
    handleroomData=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
        
        if(this.state.description2!==null&&this.state.description3!==null){
            fetch(`${getRooms}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayRoomNums:data
                })
            })

        }

        
    }

    handleDepositData=()=>{
        
        fetch(`${depositUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
                this.setState({
                displayDeposits:data
            })
        })
        
        
    }

    handleFunctionData=(event)=>{
        
        this.setState({
            [event.target.name]:event.target.value
        })

        fetch(`${getOrgUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
                this.setState({
                org:data
            })
        })
        
    }


    handleroomData2=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
        
        if(this.state.description2!==null){
            fetch(`${RoomUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayAllRoomNums:data
                })
            })
        }

        
    }

    handleOrgData2(){
               
        if(this.state.description12!==null){
            fetch(`${depositUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                    this.setState({
                    displayDeposits:data
                })
            })
        }
        
    }

    getOrgData(){

        fetch(`${getDeptsWitOutPC}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                org:data
            })
        })
    }


    
    handlePayMethData=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })

        if(this.state.description1!==null){
            fetch(`${getPaymentMethods}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayPaymentMethods:data
                })
            })
        }

       

    }
   
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    
    }

    handleChange99 = (event) => {
        if(event.target.value===''){
            this.setState({
                [event.target.name]:0
            })
        }

        else{
            this.setState({
                [event.target.name]:event.target.value
            })
        }
        
        
    }

    handleChange2 = (event) => {
        console.log('inside handle', this.props)
        this.setState({
           [event.target.name]:event.target.value
        })

       
        fetch(`${getPaymentMethods}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                displayPaymentMethods:data
            })
        })
        
        fetch(`${getGuestID}${event.target.value}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item) => {
                this.setState({
                    rate:item.dailyRate,
                    rmType:item.roomtypeName,
                    guestInhouseID:item.refID,
                    phoneCode:item.phone,
                    arrivalDate:item.arrivalDate,
                    departureDate:item.departureDate
                   
                })
                fetch(`${getCityLedger}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        cityLedgerData:data
                    })
                    this.myTimer = setTimeout(() => {

                        var finddeptID = this.state.cityLedgerData;
                        var founddeptID = this.state.phoneCode;
    
                        if(finddeptID.some(item => item.phone===founddeptID)){
                            alert('City Ledger Balance is Available');
                            this.setState({ displayPaymentMethods:''});
                            fetch(`${getCityLedger}${this.state.phoneCode}`, {method:'GET'})
                            .then((res) => res.json())
                            .then((data) => {
                                this.setState({
                                    depositAmount:data.map(item => item.Amount),
                                    paymentMethod2:'Transfer',
                                    description2:'City Ledger Bal.'
                                    
    
                                })
                            })
                            

                        }
                        else{
                            return 'ok'
                        }
                    },1000)
                })

               
                return 'ok'
            })
        })
    
    }

    handleChange12 = (event) => {
        console.log('inside handle', this.props)
        this.setState({
           [event.target.name]:event.target.value
        })

        fetch(`${getPaymentMethods}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                displayPaymentMethods:data
            })
        })
        this.myTimer = setTimeout(() => {
            if(this.state.orgName!==''){
                fetch(`${getOrgUrl}${this.state.orgName}`, {method: 'GET'})
                .then((res) => res.json())
                .then((data) => {
                    data.map((item) => {
                        this.setState({
                            group:item.orgName,
                            refID:item.orgID,
                            email:item.orgEmail,
                            phone:item.orgPhone,
                            class:item.class
                        })
                        return 'ok'
                    })
                })
            }

            else{
                this.setState({
                    group:'',
                    refID:'',
                    email:'',
                    phone:'',
                    class:''
                })
            }
        },2000)
       
    }

    handleChange14 = (event) => {
        console.log('inside handle', this.props)
        this.setState({
           [event.target.name]:event.target.value
        })

        this.myTimer = setTimeout(() => {
            if(this.state.orgName!==''){
                fetch(`${getOrgUrl}${this.state.orgName}`, {method: 'GET'})
                .then((res) => res.json())
                .then((data) => {
                    data.map((item) => {
                        this.setState({
                            group:item.orgName,
                            refID:item.orgID,
                            email:item.orgEmail,
                            phone:item.orgPhone,
                            class:item.class
                        })
                        return 'ok'
                    })
                })
            }
           
            else{
                this.setState({
                    group:'',
                    refID:'',
                    email:'',
                    phone:'',
                    class:''
                })
            }
           
        },2000)
    
    }

    handleChange3 = (event) => {
        console.log('inside handle', this.props)
        this.setState({
           [event.target.name]:event.target.value
        })
        fetch(`${getGuestID}${event.target.value}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item) => {
                this.setState({
                    
                    guestInhouseID:item.refID,
                    group:item.group
                })
                return 'ok'
            })
        })
    
    }

    async handleSubmit() {
          
        try {
            if(this.state.paymentMethod==="POS"){
                var billingPOSSales = {
                    docketNum:'BillSales'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:`${this.state.amountPaid}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    description:`${this.state.description1}`,
                    group:`${this.state.group}`,
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    refID:`${this.state.orgID}`,
                    department: "Other Sales",
                    paymentMethod:`${this.state.paymentMethod}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift'),
                    arrivalDate:`${this.state.orgID}`
                   
                }
                let result1 = await fetch(postOtherSalesUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        billingPOSSales
                       
                    )
                    
                });
                console.log('result1>  ' + result1)

                // let result1b = await fetch(postOthersupdater, {
                //     method: 'post',
    
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
    
                //     body: JSON.stringify(
                //         billingPOSSales
                       
                //     )
                    
                // });
                // console.log('result1b>  ' + result1b)

               
            }
            
            if(this.state.paymentMethod==="Cash"){
                var billingCashSales = {
                    docketNum:'BillSales'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:0,
                    CashAmount:`${this.state.amountPaid}`,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    description:`${this.state.description1}`,
                    group:`${this.state.group}`,
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    refID:`${this.state.orgID}`,
                    department: "Other Sales",
                    paymentMethod:`${this.state.paymentMethod}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                   
                }
                let result2 = await fetch(postOtherSalesUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        billingCashSales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)
                // let result1b = await fetch(postOthersupdater, {
                //     method: 'post',
    
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
    
                //     body: JSON.stringify(
                //         billingCashSales
                       
                //     )
                    
                // });
                // console.log('result1b>  ' + result1b)

               
            }

           
           

            if(this.state.paymentMethod==="Transfer"){
                var billingTransferSales = {
                    docketNum:'BillSales'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:`${this.state.amountPaid}`,
                    CompDebit:0,
                    roomDebit:0,
                    description:`${this.state.description1}`,
                    group:`${this.state.group}`,
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    refID:`${this.state.orgID}`,
                    department: "Other Sales",
                    paymentMethod:`${this.state.paymentMethod}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                   
                }
                let result3 = await fetch(postOtherSalesUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        billingTransferSales
                       
                    )
                    
                });
                console.log('result3>  ' + result3)

                // let result1b = await fetch(postOthersupdater, {
                //     method: 'post',
    
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
    
                //     body: JSON.stringify(
                //         billingTransferSales
                       
                //     )
                    
                // });
                // console.log('result1b>  ' + result1b)

               
            }
           

            if(this.state.paymentMethod==="Complimentary"){
                var billingComplSales = {
                    docketNum:'BillSales'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:`${this.state.amountPaid}`,
                    roomDebit:0,
                    description:`${this.state.description1}`,
                    group:`${this.state.group}`,
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    refID:`${this.state.orgID}`,
                    department: "Other Sales",
                    paymentMethod:`${this.state.paymentMethod}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                   
                }
                let result4 = await fetch(postOtherSalesUrl, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        billingComplSales
                       
                    )
                    
                });
                console.log('result4>  ' + result4)

                // let result1b = await fetch(postOthersupdater, {
                //     method: 'post',
    
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
    
                //     body: JSON.stringify(
                //         billingComplSales
                       
                //     )
                    
                // });
                // console.log('result1b>  ' + result1b)
               
            }

            alert("Sales Posted")
            this.setState({description1:''})
            this.setState({amountPaid:''})
            this.setState({displayRoomNums:''})
            this.setState({orgName:''})
            this.setState({paymentMethod:''})
            this.setState({displayPaymentMethods:''})
            this.setState({org:''})
            this.setState({refID:''})
            this.setState({email:''})
            this.setState({phone:''})
            this.setState({class:''})
            this.setState({shift:''})

                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleLaundry() {
          
        try {
                     
            var LaundryNow = {
                docketNum:'LaundrySales'+Math.floor(Math.random()*10000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:0,
                POSAmount:`${this.state.POSPay}`,
                CashAmount:`${this.state.CashPay}`,
                TransferAmount:`${this.state.TransferPay}`,
                CompDebit:`${this.state.CompPay}`,
                roomDebit:0,
                description:`${this.state.otherDepartments}`,
                department: "Laundry Sales",
                paymentMethod:'NA',
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
               
                
            }

            var LDSReport = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Laundry Sales",
                department: "Laundry Sales",
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                POS:`${this.state.POSPay}`,
                Cash:`${this.state.CashPay}`,
                Room:0,
                Transfer:`${this.state.TransferPay}`,
                Complimentary:`${this.state.CompPay}`,
                user:localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            }

            let result1 = await fetch(postLaundrySalesUrl, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    LaundryNow
                    
                )
                
            });
            console.log('result1>  ' + result1)

            let result5 = await fetch(dailysalesPost, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    LDSReport
                    
                )
                
            });
            console.log('result5>  ' + result5)

            alert("Sales Posted")
            this.setState({otherDepartments:''})
            this.setState({CashPay:0})
            this.setState({POSPay:0})
            this.setState({TransferPay:0})
            this.setState({CompPay:0})
            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleGymn() {
          
        try {
            
            var GymnSales = {
                docketNum:'GymnSales'+Math.floor(Math.random()*10000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:0,
                POSAmount:`${this.state.POSPay}`,
                CashAmount:`${this.state.CashPay}`,
                TransferAmount:`${this.state.TransferPay}`,
                CompDebit:`${this.state.CompPay}`,
                roomDebit:0,
                description:`${this.state.otherDepartments}`,
                department: "Gymnasium Sales",
                paymentMethod:'NA',
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
               
                
            }

            var GymnReport = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Gymnasium Sales",
                department: "Gymnasium Sales",
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                POS:`${this.state.POSPay}`,
                Cash:`${this.state.CashPay}`,
                Room:0,
                Transfer:`${this.state.TransferPay}`,
                Complimentary:`${this.state.CompPay}`,
                user:localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            }

            let result1 = await fetch(postGymSalesUrl, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    GymnSales
                    
                )
                
            });
            console.log('result1>  ' + result1)

            let result5 = await fetch(dailysalesPost, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    GymnReport
                    
                )
                
            });
            console.log('result5>  ' + result5)

            alert("Sales Posted")
            this.setState({otherDepartments:''})
            this.setState({CashPay:0})
            this.setState({POSPay:0})
            this.setState({TransferPay:0})
            this.setState({CompPay:0})
            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleSmoothie() {
          
        try {
            
            var SmoothieSales = {
                docketNum:'PizzaSales'+Math.floor(Math.random()*10000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:0,
                POSAmount:`${this.state.POSPay}`,
                CashAmount:`${this.state.CashPay}`,
                TransferAmount:`${this.state.TransferPay}`,
                CompDebit:`${this.state.CompPay}`,
                roomDebit:0,
                description:`${this.state.otherDepartments}`,
                department: "Pizza Sales",
                paymentMethod:'NA',
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
               
                
            }

            var PizzaReport = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Pizza Sales",
                department: "Pizza Sales",
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                POS:`${this.state.POSPay}`,
                Cash:`${this.state.CashPay}`,
                Room:0,
                Transfer:`${this.state.TransferPay}`,
                Complimentary:`${this.state.CompPay}`,
                user:localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            }

            let result1 = await fetch(postSmoothiesSalesUrl, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    SmoothieSales
                    
                )
                
            });
            console.log('result1>  ' + result1)

            let result5 = await fetch(dailysalesPost, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    PizzaReport
                    
                )
                
            });
            console.log('result5>  ' + result5)


            alert("Sales Posted")
            this.setState({otherDepartments:''})
            this.setState({CashPay:0})
            this.setState({POSPay:0})
            this.setState({TransferPay:0})
            this.setState({CompPay:0})
            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleSwimming() {
          
        try {
            
            var SwimmingSales = {
                docketNum:'SwimmingSales'+Math.floor(Math.random()*10000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:0,
                POSAmount:`${this.state.POSPay}`,
                CashAmount:`${this.state.CashPay}`,
                TransferAmount:`${this.state.TransferPay}`,
                CompDebit:`${this.state.CompPay}`,
                roomDebit:0,
                description:`${this.state.otherDepartments}`,
                department: "Swimming Sales",
                paymentMethod:'NA',
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
               
                
            }

            var SwimmingReport = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Swimming Sales",
                department: "Swimming Sales",
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                POS:`${this.state.POSPay}`,
                Cash:`${this.state.CashPay}`,
                Room:0,
                Transfer:`${this.state.TransferPay}`,
                Complimentary:`${this.state.CompPay}`,
                user:localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            }

            let result1 = await fetch(postSwimmingSalesUrl, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    SwimmingSales
                    
                )
                
            });
            console.log('result1>  ' + result1)

            let result5 = await fetch(dailysalesPost, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    SwimmingReport
                    
                )
                
            });
            console.log('result5>  ' + result5)


            alert("Sales Posted")
            this.setState({otherDepartments:''})
            this.setState({CashPay:0})
            this.setState({POSPay:0})
            this.setState({TransferPay:0})
            this.setState({CompPay:0})
            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleHallHires() {
          
        try {
            
            var HallMatters = {
                docketNum:'HallHire'+Math.floor(Math.random()*10000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:0,
                POSAmount:`${this.state.POSPay}`,
                CashAmount:`${this.state.CashPay}`,
                TransferAmount:`${this.state.TransferPay}`,
                CompDebit:`${this.state.CompPay}`,
                roomDebit:0,
                description:`${this.state.otherDepartments}`,
                department: "Hall Hire",
                paymentMethod:'NA',
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
               
                
            }

            var HallReport = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Hall Hire",
                department: "Hall Hire",
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                POS:`${this.state.POSPay}`,
                Cash:`${this.state.CashPay}`,
                Room:0,
                Transfer:`${this.state.TransferPay}`,
                Complimentary:`${this.state.CompPay}`,
                user:localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            }

            let result1 = await fetch(postHallHireSalesUrl, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    HallMatters
                    
                )
                
            });
            console.log('result1>  ' + result1)

            let result5 = await fetch(dailysalesPost, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    HallReport
                    
                )
                
            });
            console.log('result5>  ' + result5)

            alert("Sales Posted")
            this.setState({otherDepartments:''})
            this.setState({CashPay:0})
            this.setState({POSPay:0})
            this.setState({TransferPay:0})
            this.setState({CompPay:0})
            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleShisha() {
          
        try {
            
            var shisha = {
                docketNum:'Shisha'+Math.floor(Math.random()*10000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:0,
                POSAmount:`${this.state.POSPay}`,
                CashAmount:`${this.state.CashPay}`,
                TransferAmount:`${this.state.TransferPay}`,
                CompDebit:`${this.state.CompPay}`,
                roomDebit:0,
                description:`${this.state.otherDepartments}`,
                department: "Shisha Sales",
                paymentMethod:'NA',
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
               
                
            }

            var ShishaReport = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Shisha Sales",
                department: "Shisha Sales",
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                POS:`${this.state.POSPay}`,
                Cash:`${this.state.CashPay}`,
                Room:0,
                Transfer:`${this.state.TransferPay}`,
                Complimentary:`${this.state.CompPay}`,
                user:localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            }

            let result1 = await fetch(postShishaSalesUrl, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    shisha
                    
                )
                
            });
            console.log('result1>  ' + result1)

            let result5 = await fetch(dailysalesPost, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    ShishaReport
                    
                )
                
            });
            console.log('result5>  ' + result5)

            alert("Sales Posted")
            this.setState({otherDepartments:''})
            this.setState({CashPay:0})
            this.setState({POSPay:0})
            this.setState({TransferPay:0})
            this.setState({CompPay:0})
            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleBbq() {
          
        try {
            
            var Bbq = {
                docketNum:'Bbq'+Math.floor(Math.random()*10000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:0,
                POSAmount:`${this.state.POSPay}`,
                CashAmount:`${this.state.CashPay}`,
                TransferAmount:`${this.state.TransferPay}`,
                CompDebit:`${this.state.CompPay}`,
                roomDebit:0,
                description:`${this.state.otherDepartments}`,
                department: "Barbeque Sales",
                paymentMethod:'NA',
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
               
                
            }

            var BbqReport = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Barbeque Sales",
                department: "Barbeque Sales",
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                POS:`${this.state.POSPay}`,
                Cash:`${this.state.CashPay}`,
                Room:0,
                Transfer:`${this.state.TransferPay}`,
                Complimentary:`${this.state.CompPay}`,
                user:localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            }

            let result1 = await fetch(postBbqSalesUrl, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    Bbq
                    
                )
                
            });
            console.log('result1>  ' + result1)

            let result5 = await fetch(dailysalesPost, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    BbqReport
                    
                )
                
            });
            console.log('result5>  ' + result5)

            alert("Sales Posted")
            this.setState({otherDepartments:''})
            this.setState({CashPay:0})
            this.setState({POSPay:0})
            this.setState({TransferPay:0})
            this.setState({CompPay:0})
            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleMiniMart() {
          
        try {
            
            var MiniMartSales = {
                docketNum:'MartSales'+Math.floor(Math.random()*10000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:0,
                POSAmount:`${this.state.POSPay}`,
                CashAmount:`${this.state.CashPay}`,
                TransferAmount:`${this.state.TransferPay}`,
                CompDebit:`${this.state.CompPay}`,
                roomDebit:0,
                description:`${this.state.otherDepartments}`,
                department: "Mart Sales",
                paymentMethod:'NA',
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
               
                
            }

            var MartReport = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Mart Sales",
                department: "Mart Sales",
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                POS:`${this.state.POSPay}`,
                Cash:`${this.state.CashPay}`,
                Room:0,
                Transfer:`${this.state.TransferPay}`,
                Complimentary:`${this.state.CompPay}`,
                user:localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            }

            let result1 = await fetch(postMiniMartSalesUrl, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    MiniMartSales
                    
                )
                
            });
            console.log('result1>  ' + result1)

            let result5 = await fetch(dailysalesPost, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    MartReport
                    
                )
                
            });
            console.log('result5>  ' + result5)

            alert("Sales Posted")
            this.setState({otherDepartments:''})
            this.setState({CashPay:0})
            this.setState({POSPay:0})
            this.setState({TransferPay:0})
            this.setState({CompPay:0})
            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleRoomDockets() {
          
        try {

            var billingDockets = {
                _id:Math.floor(Math.random()*10000),
                docketNum:'BillDockt'+Math.floor(Math.random()*10000),
                refID:`${this.state.guestInhouseID}`,
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                amountPaid:`${this.state.amountPaid3}`,
                POSAmount:0,
                CashAmount:0,
                TransferAmount:0,
                CompDebit:0,
                roomDebit:`${this.state.cost3}`,
                cost:`${this.state.cost3}`,
                paymentMethod:`${this.state.paymentMethod}`,
                roomNumbers:`${this.state.roomNumbers3}`,
                description:`${this.state.description3}`,
                group:`${this.state.group}`,
                department: "Room Sales",
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
                
            }
            let result = await fetch(postGuestDocket, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    billingDockets
                    
                )
                
            });
            console.log('result>  ' + result)
            
           
            alert("Docket Posted to Room " +this.state.roomNumbers3)
            this.setState({description3:''})
            this.setState({amountPaid3:''})
            this.setState({displayRoomNums:''})
            this.setState({roomNumbers3:''})
            this.setState({paymentMethod3:''})
            this.setState({displayPaymentMethods:''})
            this.setState({guestInhouseID:''})
            this.setState({group:''})
            this.setState({cost3:''})
            this.setState({shift:''})
                              
        } catch(e) {
            console.log(e)
        }

    }

    async handleRoomDeposit() {
        
        try {
            if(this.state.paymentMethod2==="POS"){
                var POSroomDeposit = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*1000),
                    _id:Math.floor(Math.random()*1000000),
                    refID:`${this.state.guestInhouseID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:parseInt(`${this.state.depositAmount}`),
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.roomNumbers}`,
                    description:`${this.state.description2}`,
                    department: "Room Deposit",
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift'),
                    
                   
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
                    receiptNum:'BillRec'+Math.floor(Math.random()*1000),
                    _id:Math.floor(Math.random()*1000000),
                    refID:`${this.state.guestInhouseID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:parseInt(`${this.state.depositAmount}`),
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.roomNumbers}`,
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
                    receiptNum:'BillRec'+Math.floor(Math.random()*1000),
                    _id:Math.floor(Math.random()*1000000),
                    refID:`${this.state.guestInhouseID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:parseInt(`${this.state.depositAmount}`),
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.roomNumbers}`,
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
                    receiptNum:'BillRec'+Math.floor(Math.random()*1000),
                    _id:Math.floor(Math.random()*1000000),
                    refID:`${this.state.guestInhouseID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:parseInt(`${this.state.depositAmount}`),
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    roomNumbers:`${this.state.roomNumbers}`,
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
            fetch(`${delCityLedger}/${this.state.phoneCode}`, {method:'delete'})
            alert("Deposit Posted for Room " +this.state.roomNumbers)
            this.setState({depositAmount:''})
            this.setState({description2:''})
            this.setState({displayRoomNums:''})
            this.setState({roomNumbers:''})
            this.setState({paymentMethod2:''})
            this.setState({guestInhouseID:''})
            this.setState({rate:''})
            this.setState({rmType:''})
            this.setState({displayAllRoomNums:''})
            this.setState({displayPaymentMethods:''})
            this.setState({displayRoomNums:''})
            this.setState({displayDeposits:''})
            this.setState({shift:''})
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleFunctionDeposit() {
        
        try {
            if(this.state.paymentMethod4==="POS"){
                var POSroomDeposit = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*1000),
                    _id:Math.floor(Math.random()*1000000),
                    refID:`${this.state.refID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:`${this.state.functionDeposit}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    group:`${this.state.group}`,
                    description:`${this.state.description12}`,
                    department: "Function Deposit",
                    user: localStorage.getItem('userInfo'),
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    shift:localStorage.getItem('shift')
                    
                   
                }
                let result1 = await fetch(postFunctionBill, {
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
                let result1b = await fetch(postTempFunctionBill, {
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
                // let resulto = await fetch(postOthersupdater, {
                //     method: 'post',
    
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
    
                //     body: JSON.stringify(
                //         POSroomDeposit
                       
                //     )
                    
                // });
                // console.log('resulto>  ' + resulto)
            }

            if(this.state.paymentMethod4==="Cash"){
                var CashroomDeposit = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    _id:Math.floor(Math.random()*10000),
                    refID:`${this.state.refID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:`${this.state.functionDeposit}`,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    group:`${this.state.group}`,
                    description:`${this.state.description12}`,
                    department: "Function Deposit",
                    user: localStorage.getItem('userInfo'),
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    shift:localStorage.getItem('shift')
                   
                }
                let result2 = await fetch(postFunctionBill, {
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

                let result2b = await fetch(postTempFunctionBill, {
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
                // let resulto = await fetch(postOthersupdater, {
                //     method: 'post',
    
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
    
                //     body: JSON.stringify(
                //         CashroomDeposit
                       
                //     )
                    
                // });
                // console.log('resulto>  ' + resulto)
            }
            
            if(this.state.paymentMethod4==="Transfer"){
                var TransferroomDeposit = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    _id:Math.floor(Math.random()*10000),
                    refID:`${this.state.refID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:`${this.state.functionDeposit}`,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    group:`${this.state.group}`,
                    description:`${this.state.description12}`,
                    department: "Function Deposit",
                    user: localStorage.getItem('userInfo'),
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    shift:localStorage.getItem('shift')
                   
                }
                let result3 = await fetch(postFunctionBill, {
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

                let result3b = await fetch(postTempFunctionBill, {
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
                // let resulto = await fetch(postOthersupdater, {
                //     method: 'post',
    
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
    
                //     body: JSON.stringify(
                //         TransferroomDeposit
                       
                //     )
                    
                // });
                // console.log('resulto>  ' + resulto)
                
            }

            if(this.state.paymentMethod4==="Complimentary"){
                var ComplroomDeposit = {
                    receiptNum:'BillRec'+Math.floor(Math.random()*10000),
                    _id:Math.floor(Math.random()*10000),
                    refID:`${this.state.refID}`,
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:`${this.state.functionDeposit}`,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod2}`,
                    group:`${this.state.group}`,
                    description:`${this.state.description12}`,
                    department: "Function Deposit",
                    user: localStorage.getItem('userInfo'),
                    groupEmail:`${this.state.email}`,
                    groupPhone:`${this.state.phone}`,
                    shift:localStorage.getItem('shift')
                   
                }
                let result3 = await fetch(postFunctionBill,{
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

                let result3b = await fetch(postTempFunctionBill, {
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
                // let resulto = await fetch(postOthersupdater, {
                //     method: 'post',
    
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-type': 'application/json',
                //     },
    
                //     body: JSON.stringify(
                //         ComplroomDeposit
                       
                //     )
                    
                // });
                // console.log('resulto>  ' + resulto)
            }

            alert(this.state.group +" Function Deposit Posted")
            this.setState({functionDeposit:''})
            this.setState({description12:''})
            this.setState({displayRoomNums:''})
            this.setState({group:''})
            this.setState({paymentMethod4:''})
            this.setState({refID:''})
            this.setState({email:''})
            this.setState({phone:''})
            this.setState({displayAllRoomNums:''})
            this.setState({displayPaymentMethods:''})
            this.setState({org:''})
            this.setState({displayDeposits:''})
            this.setState({class:''})
            this.setState({shift:''})
           
                   
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

    renderDepositTypes(data){
        if(data) {
            return data.map((item) => {
                return(
                    <>
                        <option key={item.id} value={item.method}>
                            {item.method}
                        </option>
                    </>
                )
            })
        }
    }
    renderRooms(data){
        if(data) {
           data.sort((a, b) => a.roomNumbers - b.roomNumbers);
            return data.map((item) => {
                return(
                    <>
                        <option key={item.roomNumbers} value={item.roomNumbers}>
                            {item.roomNumbers} - {item.fname} {item.lname} - {item.roomtypeName}
                        </option>
                    </>
                )
            })
        }
    }

    renderAllRooms(data){
        if(data) {
           data.sort((a, b) => a.roomNumbers - b.roomNumbers);
            return data.map((item, index) => {
                if(item.roomStatus==="green"||item.roomStatus==='black'){
                    return(
                        <>
                            
                        </>
                    )
                }
                else{
                    return(
                        <>
                            <option key={index} value={item.roomNumbers}>
                                {item.roomNumbers} - {item.fname} {item.lname} - {item.roomtypeName}
                            </option>
                        </>
                    )
                }
                
            })
        }
    }

    renderAllDeptWPC(data){
        if(data) {
           data.sort((a, b) => a.DeptName - b.DeptName);
            return data.map((item) => {
                return(
                    <>
                        <option key={item._id} value={item.DeptName}>
                            {item.DeptName}
                        </option>
                    </>
                )
                
                
            })
        }
    }

    renderHalls(data){
        if(data) {
           data.sort((a, b) => a.price - b.price);
            return data.map((item) => {
                
                return(
                    <>
                        <option key={item._id} value={item.hallName}>
                            {item.hallName}
                        </option>
                    </>
                )
                
            })
        }
    }

        
    render() {
        console.log(">>> Inside RESrender", this.state)
        var receptDate = moment(`${this.state.transactionDate}`).format('MMM DD YYYY')
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Billinglogin/>
                </>
            )

        }

        return(
            <>  
            
                <div className="background1505nw">
                    
                    <center>
                        <br/>
                        <center><h6 style = {{color:'yellow'}}>Active Shift: {localStorage.getItem('shift')} </h6></center>
                        
                        <div className="formdesign15 ">
                            <h4 className="mb-3 mt-3">Room Deposits</h4>
                            <div className="row">
                                <select type ="button" className="form-select mb-2 btn btn-primary mt-3 col-2 aligntext1" name="description2" onMouseOver={()=> this.handleDepositData()} onChange={this.handleroomData2}>
                                    <option selected value=''>Deposit Types</option>
                                    {this.renderDepositTypes(this.state.displayDeposits)}

                                </select>
                                <select type ="button" className="form-select mb-2 btn btn-primary mt-3 col-2 aligntext" name="roomNumbers" onChange={this.handleChange2}>
                                    <option selected value=''>Select Room</option>
                                    {this.renderAllRooms(this.state.displayAllRoomNums)}
                                </select>
                                <div className="col-2 mb-3">
                                    <input className="form-control mb-3 formsize3 mt-3 aligntext2" name="dailyRate" value={this.state.rate} require placeholder="Daily Rate" readOnly/>
                                </div>
                                <select type ="button" className="form-select formsize3 mb-2 btn btn-primary mt-3 aligntext5" name="paymentMethod2" onChange={this.handleChange}>
                                    <option selected value=''>Payment Method</option>
                                    {this.renderPayMeth(this.state.displayPaymentMethods)}
                                </select>
                                
                                <div className="col-2 mb-3">
                                    <input type="number" className="form-control mb-3 formsize3 mt-3 aligntext6" name="depositAmount" require placeholder="Deposit Amount" value={this.state.depositAmount} onChange={this.handleChange}/>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div>
                            <center>
                                <button disabled={this.state.description2===''||this.state.roomNumbers===''||this.state.paymentMethod2===''||this.state.depositAmount===''} className="btn btn-warning mt-3" onClick={ () => this.onOpenDepModal()}>Post Deposit</button>
                                <button className="btn btn-danger flipright mt-3" onClick={()=> this.props.history.push('./BillingMenu')}>Close</button>
                            </center>
                            
                            <hr style={{color:'silver'}}/>
                        </div>
                        
                        <br/>

                        <div className="formdesign15">
                            <h4 className="mb-3 mt-3">Other Sales</h4>
                            
                            <div className="row">
                                
                                <select type ="button" className="form-select mb-2 btn btn-primary mt-3 col-2 aligntext spaceright" name="otherDepartments" onChange={this.handleChange}>
                                    <option selected value=''>Select Dept</option>
                                    {this.renderAllDeptWPC(this.state.DeptsWdPC)}
                                </select>

                                <div className="col-2 mb-3">
                                    <label>Cash</label>
                                    <input type="number" className="form-control mb-3 formsize4 mt-3" name="CashPay" value={this.state.CashPay} onChange={this.handleChange99}/>
                                </div>

                                <div className="col-2 mb-3">
                                    <label>POS</label>
                                    <input type="number" className="form-control mb-3 formsize4 mt-3" name="POSPay" value={this.state.POSPay} onChange={this.handleChange99}/>
                                </div>

                                <div className="col-2 mb-3">
                                    <label>Transfer</label>
                                    <input type="number" className="form-control mb-3 formsize4 mt-3" name="TransferPay" value={this.state.TransferPay} onChange={this.handleChange99}/>
                                </div>

                                <div className="col-2 mb-3">
                                    <label>Complimentary</label>
                                    <input type="number" className="form-control mb-3 formsize4 mt-3" name="CompPay" value={this.state.CompPay} onChange={this.handleChange99}/>
                                </div>
                                                                                               
                                
                            </div>
                            
                        </div>
                        <div>
                            <center>
                                <button disabled={this.state.otherDepartments===''}className="btn btn-warning mt-3" onClick={ () => this.onOpendeptwoutpcModal()}>Post Payment</button>
                                <button className="btn btn-danger flipright mt-3" onClick={()=> this.props.history.push('./BillingMenu')}>Close</button>
                                
                            </center>
                           
                            
                            
                        </div>
                        <hr style={{color:'silver'}}/>
                        <br/>

                        <div className="formdesign15">
                            <h4 className="mb-3 mt-3">Miscellaneous Sales</h4>
                            
                            <div className="row">

                                <div className="col-3 mb-3">
                                    <input type="text" className="form-control formsize2 mt-3" name="description1" require placeholder="Description" value={this.state.description1} list="halls" onChange={this.handlePayMethData}/>
                                    
                                </div>
                                
                                <select type ="button" className="form-select formsize3 mb-2 btn btn-primary mt-3 spaceleft" name="paymentMethod" onChange={this.handleChange}>
                                    <option selected value=''>Payment Method</option>
                                    {this.renderPayMeth(this.state.displayPaymentMethods)}
                                </select>

                                <div className="col-3 mb-3">
                                    <input type="number" className="form-control mb-3 formsize4 mt-3" name="amountPaid" require placeholder="Amount Paid" value={this.state.amountPaid} onChange={this.handleChange}/>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div>
                            <center>
                                <button disabled={this.state.description1===''||this.state.amountPaid===''||this.state.paymentMethod===''}className="btn btn-warning mt-3" onClick={ () => this.onOpenOthrsModal()}>Post Payment</button>
                                <button className="btn btn-danger flipright mt-3" onClick={()=> this.props.history.push('./BillingMenu')}>Close</button>
                            </center>
                           
                            
                            
                        </div>

                        <hr style={{color:'silver'}}/>
                        <br/>
                        
                        <div className="formdesign15">
                            <h4 className="mb-3 mt-3">Room Dockets</h4>
                            <div className="row">
                                <div className="col-3 mb-3">
                                    <input type="text" className="form-control formsize2 mt-3" name="description3" require placeholder="Description" value={this.state.description3} onChange={this.handleroomData}/>
                                </div>
                                <select type ="button" className="form-select mb-2 btn btn-primary mt-3 col-2 aligntext" name="roomNumbers3" onChange={this.handleChange3}>
                                    <option selected value=''>Select Room</option>
                                    {this.renderRooms(this.state.displayRoomNums)}
                                </select>
                                <div className="col-2 mb-3">
                                    <input className="form-control mb-3 formsize3 mt-3 aligntext2" type="number" name="cost3" value={this.state.cost3} require placeholder="Cost" onChange={this.handleChange}/>
                                </div>
                                <div className="col-2 mb-3">
                                    <input className="form-control mb-3 formsize3 mt-3 aligntext3" type="number" name="amountPaid3" value={this.state.amountPaid3} require placeholder="Amount Paid" readOnly/>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div>
                            <center>
                                <button disabled={this.state.description3===''||this.state.roomNumbers3===''||this.state.cost3===''} className="btn btn-warning mt-3" onClick={ () => this.onOpenDktModal()}>Post Room Dockets</button>
                                <button className="btn btn-danger flipright mt-3" onClick={()=> this.props.history.push('./BillingMenu')}>Close</button>
                            </center>
                            
                        </div>
                        <hr style={{color:'silver'}}/>
                        
                    </center>
                    
                </div>
                
                
                <div className="pagebody2">
                    <input type="number" className="form-control mb-3 formsize3 mt-3 aligntext4" name="depositAmount9" value={this.state.depositAmount9} hidden/>
                </div>


                <Modal open={this.state.Dcktedit}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>Room Docket</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Description</th>
                                <th className="adjust50">Room Num</th>
                                <th className="adjust50">Cost(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.description3}</b></td>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.roomNumbers3}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.cost3)}thousandSeparator={true}displayType={"text"}/></b></td>
                                
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    <div className="printing">
                        <center>
                            <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinterDkt()}}>
                                <p>{this.state.printBTN}</p>
                            </button>
                        </center>
                        
                    </div>
                    
                </Modal>

                
                
                <Modal open={this.state.depositedit}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>Room Deposit Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Description</th>
                                <th className="adjust50">Room Num</th>
                                <th className="adjust50">Daily Rate(NGN)</th>
                                <th className="adjust50">Payment Method</th>
                                <th className="adjust50">Deposit Amount(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.description2}</b></td>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.roomNumbers}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.rate)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.paymentMethod2}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depositAmount)}thousandSeparator={true}displayType={"text"}/></b></td>
                                
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    <div className="printing">
                        <center>
                            <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinterDep()}}>
                                <p>{this.state.printBTN}</p>
                            </button>
                        </center>
                        
                    </div>
                    
                </Modal>

                <Modal open={this.state.othersedit}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>General Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Description</th>
                                {/* <th className="adjust50">Organisation</th> */}
                                <th className="adjust50">Payment Method</th>
                                <th className="adjust50">Amount Paid(NGN)</th>
                                                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.description1}</b></td>
                                {/* <td className="table-light table-striped adjust2 alignTet"><b>{this.state.orgName}</b></td> */}
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.paymentMethod}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.amountPaid)}thousandSeparator={true}displayType={"text"}/></b></td>
                                                                
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    <div className="printing">
                        <center>
                            <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinterOthrs()}}>
                                <p>{this.state.printBTN}</p>
                            </button>
                        </center>
                        
                    </div>
                    
                </Modal>

                <Modal open={this.state.deptwdpc}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>General Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Description</th>
                                <th className="adjust50">Amount Paid(NGN)</th>
                                                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.DeptsWdPC}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseFloat(this.state.CashPay)+parseFloat(this.state.POSPay)+parseFloat(this.state.TransferPay)}thousandSeparator={true}displayType={"text"}/></b></td>
                                                                
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    <div className="printing">
                        <center>
                            <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinterDeptWP()}}>
                                <p>{this.state.printBTN}</p>
                            </button>
                        </center>
                        
                    </div>
                    
                </Modal>

                <Modal open={this.state.functionedit}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>General Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Description</th>
                                <th className="adjust50">Organisation</th>
                                <th className="adjust50">Payment Method</th>
                                <th className="adjust50">Amount Paid(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.description12}</b></td>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.orgName}</b></td>
                                <td className="table-light table-striped adjust2 alignTet"><b>{this.state.paymentMethod4}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.functionDeposit)}thousandSeparator={true}displayType={"text"}/></b></td>
                                
                                
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    <div className="printing">
                        <center>
                            <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinterFunctn()}}>
                                <p>{this.state.printBTN}</p>
                            </button>
                        </center>
                        
                    </div>
                    
                </Modal>
                
            </>

        )
    }

    async componentDidMount(){
        fetch(`${HallUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
            this.setState({
                displayAllHalls:data
            })
        })

        await fetch(`${getDeptsWitOutPC}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
            this.setState({
                DeptsWdPC:data
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

        await fetch(`${getWorkDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({transactionDate:item.date})
                return 'ok'
            })
            
           
        })

        this.myTimer = setInterval(() => {
            fetch(`${getWorkDate}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({transactionDate:item.date})
                    return 'ok'
                })
                
               
            })
            
        },1000);

        this.myTimer = setTimeout(() => {

            var loginInfo = this.state.loginDetails;
            var nameDetails = this.state.name;
            if(loginInfo.some(item => item.name === nameDetails)){
                this.setState({Blogin:true})
            }
            else{
                this.setState({Blogin:false})
            }

            fetch(`${getDeptsWitOutPC}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
            this.setState({
                DeptsWdPC:data
            })
        })
        },1000);
    
    }
    
}
export default OtherPosts;