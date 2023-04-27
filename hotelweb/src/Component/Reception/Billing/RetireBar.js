import React, { Component } from 'react';
import Billinglogin from '../../Billinglogin';
import '../Reception.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import {Modal} from 'react-responsive-modal';
import 'bootstrap/dist/css/bootstrap.min.css';




const getbarSales = "http://10.1.0.99:3333/barSales?staff=";
const getpoolbarSales = "http://10.1.0.99:3333/poolbarSales?Pstaff=";
const getRestSales = "http://10.1.0.99:3333/restaurantSales?Rstaff=";
const getClubSales = "http://10.1.0.99:3333/clubSales?Cstaff=";
const dailysalesPost = "http://10.1.0.99:3333/add";
const barWarehousePost = "http://10.1.0.99:3333/retireBar";
const poolbarWarehousePost = "http://10.1.0.99:3333/retirepoolBar";
const clubWarehousePost = "http://10.1.0.99:3333/retireClub";
const poolbarTempPost = "http://10.1.0.99:3333/TemppoolBar";
const clubTempPost = "http://10.1.0.99:3333/Tempclub";
const restWarehousePost = "http://10.1.0.99:3333/retireRest";
const delBarDataWRTUser = "http://10.1.0.99:3333/delBar";
const delpoolBarDataWRTUser = "http://10.1.0.99:3333/delpoolBar";
const delClubDataWRTUser = "http://10.1.0.99:3333/delClub";
const delRestDataWRTUser = "http://10.1.0.99:3333/delRest";
const getrevenueData = "http://10.1.0.99:3333/otherSalesPoints?Fostaff=";
const posttorevenueWarehouse = "http://10.1.0.99:3333/postRWarehouse";
const delrevenueData = "http://10.1.0.99:3333/delOtherrevenue";
const getDepositsUrl = "http://10.1.0.99:3333/GetTmpRmDep?Bstaff=";
const getTempFunctionBill = "http://10.1.0.99:3333/functionDep?Fnstaff=";
const delTempFunctionBill = "http://10.1.0.99:3333/delTempFunctionBills";
const postAllpoolTemp = "http://10.1.0.99:3333/addMany";
const postAllClubTemp = "http://10.1.0.99:3333/addManyClub";
const getAllpoolbarSales = "http://10.1.0.99:3333/poolbarSales";
const getAllClubSales = "http://10.1.0.99:3333/clubSales";
const getAllTemppoolbarSales = "http://10.1.0.99:3333/GetpoolBarTemp";
const getAllTempClubSales = "http://10.1.0.99:3333/GetclubTemp";
const delTempPool = "http://10.1.0.99:3333/delpoolBarTemp";
const delTempClub = "http://10.1.0.99:3333/delclubTemp";
const delTempRoomDeposit = "http://10.1.0.99:3333/delTmpRmDep";

const users = "http://10.1.0.99:3333/barUserInfo";
const Fousers = "http://10.1.0.99:3333/fofUserInfo";
const Poolusers = "http://10.1.0.99:3333/poolUserInfo";
const Restusers = "http://10.1.0.99:3333/restUserInfo";
const Billingusers = "http://10.1.0.99:3333/billingUserInfo";
const FandBusers = "http://10.1.0.99:3333/fandbUserInfo";
const Clubusers = "http://10.1.0.99:3333/clubUserInfo";

const userName = "http://10.1.0.99:3333/billingUserInfo";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";
const getWorkDate = "http://10.1.0.99:3333/getActive";


class RetireBar extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside GstConstructor",props)
        this.state = {
            bar:'',
            staff:'',
            
            barstaff:'',
            receptionStaff:'',
            poolbarStaff:'',
            restaurantStaff:'',
            billingStaff:'',
            fandbstaff:'',
            clubStaff:'',

            name:'',
            Cash:'',
            POS:'',
            Room:'',
            Transfer:'',
            Complimentary:'',
            TotalSales:'',
            date:'',
            checkPool:'',
            checkDeposit:'',
            PoolRemaininPosts:'',
            PoolTempSales:'',
            ClubRemaininPosts:'',
            ClubTempSales:'',
            loginDetails:'',
            name2:localStorage.getItem('userInfo'),
            shift:'',
            login:'',
            Blogin:'',

            printBTN:'Print',
            Baredit:false,
            PoolBaredit:false,
            Clubedit:false,
            Restedit:false,
            depositedit:false,
            othersedit:false,
            functionedit:false,

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:''
           
          
        }

    }

    onOpenBarModal(){
        this.setState({
            Baredit: true
        })
        
        
    }

    onOpenRestModal(){
        this.setState({
            Restedit: true
        })
        
        
    }

    onCloseRestModal(){
        this.setState({
            Restedit: true
        })
        
        
    }

    onOpenPoolBarModal(){
        this.setState({
            PoolBaredit: true
        })
        
        
    }

    onOpenClubModal(){
        this.setState({
            Clubedit: true
        })
        
        
    }

    onCloseBarModal(){
        this.setState({
            Baredit: false
        })
        
    }

    onClosePoolBarModal(){
        this.setState({
            PoolBaredit: false
        })
        
    }

    onCloseClubModal(){
        this.setState({
            Clubedit: false
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


    sendtoprinter2(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({Baredit: false})      
            this.setState({printBTN:'Print'})

            this.handleSubmitForBar()
            
        }
        
       
    }

    sendtoprinterPool(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({PoolBaredit: false})      
            this.setState({printBTN:'Print'})

            this.handlePoolSubmit()
            
        }
        
       
    }

    sendtoprinterClub(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({Clubedit: false})      
            this.setState({printBTN:'Print'})

            this.handleClubSubmit()
            
        }
        
       
    }

    sendtoprinterRest(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({Restedit: false})      
            this.setState({printBTN:'Print'})

            this.handleRestSubmit()
            
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

            this.handleRoomDepositSubmit()
            
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

            this.handleOtherSalesSubmit()
            
        }
        
       
    }

    sendtoprinterFunctn(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({functionedit: false})      
            this.setState({printBTN:'Print'})

            this.handleFunctionDepositSubmit()
            
        }
        
       
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    getSales(){
        

        fetch(`${getbarSales}${this.state.name}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({bar:data});

            
                
            if(this.state.bar.length>0){
                data.map((item)=>{
                    var shiftNow = [];
                    shiftNow.push(item.shift);
                    this.setState({shift:shiftNow})
                    return 'ok'
                })

            }

            var allPOS = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({POS:allPOS})

            var allCash2 = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({Cash:parseInt(allCash2)})

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
            
        });
        
    }

    getRestSales(){
        
        fetch(`${getRestSales}${this.state.name}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({bar:data});

            if(this.state.bar.length>0){
                data.map((item)=>{
                    var shiftNow = [];
                    shiftNow.push(item.shift);
                    this.setState({shift:shiftNow})
                    return 'ok'
                })

            }

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
            
        });

    }

    getPoolSales(){
        
        fetch(`${getpoolbarSales}${this.state.name}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({bar:data});

            if(this.state.bar.length>0){
                data.map((item)=>{
                    var shiftNow = [];
                    shiftNow.push(item.shift);
                    this.setState({shift:shiftNow})
                    return 'ok'
                })

            }

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
            
        });
    }

    getClubSales(){
        
        fetch(`${getClubSales}${this.state.name}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({bar:data});

            if(this.state.bar.length>0){
                data.map((item)=>{
                    var shiftNow = [];
                    shiftNow.push(item.shift);
                    this.setState({shift:shiftNow})
                    return 'ok'
                })

            }

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
            
        });
    }

    getOtherSales(){
        fetch(`${getrevenueData}${this.state.name}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                bar:data,
                
            });

            if(this.state.bar.length>0){
                data.map((item)=>{
                    var shiftNow = [];
                    shiftNow.push(item.shift);
                    this.setState({shift:shiftNow})
                    return 'ok'
                })

            }

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

            this.setState({Room:0})

            var Sales = 0;
            var dailySales = Sales + this.state.Cash + this.state.POS + this.state.Transfer + this.state.Room 
            this.setState({TotalSales:dailySales})
            
        })
    }

    getDeposits(){
       
        fetch(`${getDepositsUrl}${this.state.name}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                bar:data,
                
            });

            if(this.state.bar.length>0){
                data.map((item)=>{
                    var shiftNow = [];
                    shiftNow.push(item.shift);
                    this.setState({shift:shiftNow})
                    return 'ok'
                })

            }

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

            this.setState({Room:0})

            var Sales = 0;
            var dailySales = Sales + this.state.Cash + this.state.POS + this.state.Transfer + this.state.Room 
            this.setState({TotalSales:dailySales})
           
        })
    }

    getFunctionDeposits(){
       
        fetch(`${getTempFunctionBill}${this.state.name}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                bar:data,
                
            });

            if(this.state.bar.length>0){
                data.map((item)=>{
                    var shiftNow = [];
                    shiftNow.push(item.shift);
                    this.setState({shift:shiftNow})
                    return 'ok'
                })

            }
            
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

            this.setState({Room:0})

            var Sales = 0;
            var dailySales = Sales + this.state.Cash + this.state.POS + this.state.Transfer + this.state.Room
            this.setState({TotalSales:dailySales})
           
        })
    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        localStorage.removeItem('shift')
        
    }

   renderUsers(data){
        if(data){
            return data.map((item) =>{
                return(
                    <>
                        <option key={item._id} value={item.name}>
                            {item.name}
                        </option>
                    </>
                )
            })
        }
    }

    async handleSubmitForBar() {
          
        try {
            var barSalesWRTUser = this.state.bar;

            var BarSales = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Bar Sales",
                department: "Bar Sales",
                date: moment(`${this.state.date}`).format('MMM DD YYYY'),
                POS:`${this.state.POS}`,
                Cash:`${this.state.Cash}`,
                Room:`${this.state.Room}`,
                Transfer:`${this.state.Transfer}`,
                Complimentary:`${this.state.Complimentary}`,
                user:`${this.state.name}`,
                shift:`${this.state.shift}`
                
            }
            if((barSalesWRTUser).length===0){
                alert("Bar Data is not available")
            }
           
            else{
                let dailyPost = await fetch(dailysalesPost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        BarSales
                        
                    )
                    
                });
                console.log('dailyPost>  ' + dailyPost)
               
                let warePost = await fetch(barWarehousePost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        barSalesWRTUser.map(item => item)
                        
                    )
                    
                });
                console.log('warePost>  ' + warePost)
                
                let delBarD = fetch(`${delBarDataWRTUser}/${this.state.name}`, {
                    method: 'delete',
                
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
            
                    body: JSON.stringify(
                            
                        this.state.bar
                                
                    )
                                
                                
                });
                console.log('delBarD>  ' + delBarD)
    
                alert("Sales Retired")
                this.setState({name:''})
                this.setState({Cash:''})
                this.setState({POS:''})
                this.setState({Room:''})
                this.setState({Transfer:''})
                this.setState({Complimentary:''})
                this.setState({TotalSales:''})
                this.setState({bar:''})
                this.setState({staff:''})
                this.setState({shift:''})

                fetch(`${users}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({barstaff:data});
                    
                });

                fetch(`${Fousers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({receptionStaff:data});
                    
                });

                fetch(`${Poolusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({poolbarStaff:data});
                    
                });

                fetch(`${Clubusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({clubStaff:data});
                    
                });

                fetch(`${Restusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({restaurantStaff:data});
                    
                });

                fetch(`${Billingusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({billingStaff:data});
                    
                });

                fetch(`${FandBusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({fandbstaff:data});
                    
                });
                    this.myTimer = setTimeout(() => {
                    var barstaff=this.state.barstaff;
                    var receptionStaff=this.state.receptionStaff;
                    var poolbarStaff=this.state.poolbarStaff;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.restaurantStaff;
                    var billingStaff=this.state.billingStaff;
                    var fandbstaff=this.state.fandbstaff;
                    this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})
    
                },2000);
            }
            
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleRestSubmit() {
          
        try {
            var barSalesWRTUser = this.state.bar;

            var RestSales = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Restaurant Sales",
                department: "Restaurant Sales",
                date: moment(`${this.state.date}`).format('MMM DD YYYY'),
                POS:`${this.state.POS}`,
                Cash:`${this.state.Cash}`,
                Room:`${this.state.Room}`,
                Transfer:`${this.state.Transfer}`,
                Complimentary:`${this.state.Complimentary}`,
                user:`${this.state.name}`,
                shift:`${this.state.shift}`
                
            }

            if((barSalesWRTUser).length===0){
                alert("Restaurant Data is not available")
            }

            else{
                let result5 = await fetch(dailysalesPost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        RestSales
                        
                    )
                    
                });
                console.log('result5>  ' + result5)
               
                let result4 = await fetch(restWarehousePost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        barSalesWRTUser.map(item => item)
                        
                    )
                    
                });
                console.log('result4>  ' + result4)
                
                let result3 = fetch(`${delRestDataWRTUser}/${this.state.name}`, {
                    method: 'delete',
                
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
                
                        body: JSON.stringify(
                                
                            this.state.bar
                                    
                        )
                                
                                
                });
                console.log('result3>  ' + result3)
    
                alert("Sales Retired")
                this.setState({name:''})
                this.setState({Cash:''})
                this.setState({POS:''})
                this.setState({Room:''})
                this.setState({Transfer:''})
                this.setState({Complimentary:''})
                this.setState({TotalSales:''})
                this.setState({bar:''})
                this.setState({staff:''})
                this.setState({shift:''})


                fetch(`${users}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({barstaff:data});
                    
                });

                fetch(`${Fousers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({receptionStaff:data});
                    
                });

                fetch(`${Poolusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({poolbarStaff:data});
                    
                });

                fetch(`${Clubusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({clubStaff:data});
                    
                });

                fetch(`${Restusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({restaurantStaff:data});
                    
                });

                fetch(`${Billingusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({billingStaff:data});
                    
                });

                fetch(`${FandBusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({fandbstaff:data});
                    
                });
                    this.myTimer = setTimeout(() => {
                    var barstaff=this.state.barstaff;
                    var receptionStaff=this.state.receptionStaff;
                    var poolbarStaff=this.state.poolbarStaff;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.restaurantStaff;
                    var billingStaff=this.state.billingStaff;
                    var fandbstaff=this.state.fandbstaff;
                    this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})
    
                },2000);
            }
            
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handlePoolSubmit() {
          
        try {
            var barSalesWRTUser = this.state.bar;

            var PoolSales = {
                _id:'DSR'+Math.floor(Math.random()*100000000),
                description: "Pool Bar Sales",
                department: "Pool Bar Sales",
                date: moment(`${this.state.date}`).format('MMM DD YYYY'),
                POS:`${this.state.POS}`,
                Cash:`${this.state.Cash}`,
                Room:`${this.state.Room}`,
                Transfer:`${this.state.Transfer}`,
                Complimentary:`${this.state.Complimentary}`,
                user:`${this.state.name}`,
                shift:`${this.state.shift}`
            }
            
            if((barSalesWRTUser).length===0){
                alert("Pool Data is not available")
            }

            else{
                let result4 = await fetch(poolbarWarehousePost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        barSalesWRTUser.map(item => item)
                        
                    )
                    
                });
                console.log('result4>  ' + result4)
    
                let result2 = await fetch(poolbarTempPost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        PoolSales
                        
                    )
                    
                });
                console.log('result2>  ' + result2)
                
                let result3 = fetch(`${delpoolBarDataWRTUser}/${this.state.name}`, {
                    method: 'delete',
                
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
                
                        body: JSON.stringify(
                                
                            this.state.bar
                                    
                        )
                                
                                
                });
                console.log('result3>  ' + result3)
               
                this.setState({name:''})
                this.setState({Cash:''})
                this.setState({POS:''})
                this.setState({Room:''})
                this.setState({Transfer:''})
                this.setState({Complimentary:''})
                this.setState({TotalSales:''})
                this.setState({bar:''})
                this.setState({staff:''})
                this.setState({shift:''})


                fetch(`${users}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({barstaff:data});
                    
                });

                fetch(`${Fousers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({receptionStaff:data});
                    
                });

                fetch(`${Poolusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({poolbarStaff:data});
                    
                });
                fetch(`${Clubusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({clubStaff:data});
                    
                });

                fetch(`${Restusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({restaurantStaff:data});
                    
                });

                fetch(`${Billingusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({billingStaff:data});
                    
                });

                fetch(`${FandBusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({fandbstaff:data});
                    
                });
                    this.myTimer = setTimeout(() => {
                    var barstaff=this.state.barstaff;
                    var receptionStaff=this.state.receptionStaff;
                    var poolbarStaff=this.state.poolbarStaff;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.restaurantStaff;
                    var billingStaff=this.state.billingStaff;
                    var fandbstaff=this.state.fandbstaff;
                    this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})
    
                },2000);


                fetch(`${getAllTemppoolbarSales}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({PoolTempSales:data});
                    
                });
                fetch(`${getAllpoolbarSales}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({PoolRemaininPosts:data});
        
                    this.myTimer = setTimeout(() => {
        
                        if((this.state.PoolRemaininPosts).length===0){
                            this.setState({checkPool:0})
                        }
                                                
                    },3000)
                
                });
                alert("Pool Sales Added Successfully");
            }
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleClubSubmit() {
          
        try {
            var barSalesWRTUser = this.state.bar;

            var ClubSales = {
                _id:'DSR'+Math.floor(Math.random()*100000000),
                description: "Club Sales",
                department: "Club Sales",
                date: moment(`${this.state.date}`).format('MMM DD YYYY'),
                POS:`${this.state.POS}`,
                Cash:`${this.state.Cash}`,
                Room:`${this.state.Room}`,
                Transfer:`${this.state.Transfer}`,
                Complimentary:`${this.state.Complimentary}`,
                user:`${this.state.name}`,
                shift:`${this.state.shift}`
            }
            
            if((barSalesWRTUser).length===0){
                alert("Pool Data is not available")
            }

            else{
                let result4 = await fetch(clubWarehousePost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        barSalesWRTUser.map(item => item)
                        
                    )
                    
                });
                console.log('result4>  ' + result4)
    
                let result2 = await fetch(clubTempPost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        ClubSales
                        
                    )
                    
                });
                console.log('result2>  ' + result2)
                
                let result3 = fetch(`${delClubDataWRTUser}/${this.state.name}`, {
                    method: 'delete',
                
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
                
                        body: JSON.stringify(
                                
                            this.state.bar
                                    
                        )
                                
                                
                });
                console.log('result3>  ' + result3)
               
                this.setState({name:''})
                this.setState({Cash:''})
                this.setState({POS:''})
                this.setState({Room:''})
                this.setState({Transfer:''})
                this.setState({Complimentary:''})
                this.setState({TotalSales:''})
                this.setState({bar:''})
                this.setState({staff:''})
                this.setState({shift:''})


                fetch(`${users}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({barstaff:data});
                    
                });

                fetch(`${Fousers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({receptionStaff:data});
                    
                });

                fetch(`${Poolusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({poolbarStaff:data});
                    
                });

                fetch(`${Clubusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({clubStaff:data});
                    
                });

                fetch(`${Restusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({restaurantStaff:data});
                    
                });

                fetch(`${Billingusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({billingStaff:data});
                    
                });

                fetch(`${FandBusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({fandbstaff:data});
                    
                });
                    this.myTimer = setTimeout(() => {
                    var barstaff=this.state.barstaff;
                    var receptionStaff=this.state.receptionStaff;
                    var poolbarStaff=this.state.poolbarStaff;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.restaurantStaff;
                    var billingStaff=this.state.billingStaff;
                    var fandbstaff=this.state.fandbstaff;
                    this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})
    
                },2000);


                fetch(`${getAllTempClubSales}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ClubTempSales:data});
                    
                });
                fetch(`${getAllClubSales}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ClubRemaininPosts:data});
        
                    this.myTimer = setTimeout(() => {
        
                        if((this.state.ClubRemaininPosts).length===0){
                            this.setState({checkPool:0})
                        }
                                                
                    },3000)
                
                });
                alert("Club Sales Added Successfully");
            }
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleRetirePoolSubmit() {
          
        try {
            if((this.state.PoolTempSales).length===0){
                alert ("Pool Data is not available")
            }
            else{
                var poolData = this.state.PoolTempSales;
                let result5 = fetch(postAllpoolTemp, {
                    method: 'post',

                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },

                    body: JSON.stringify(
                        poolData.map(item =>item)
                        
                    )
                
                });
                console.log('result5>  ' + result5)

                let result13 = fetch(`${delTempPool}`, {
                    method: 'delete',
            
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
            
                    body: JSON.stringify(
                            
                        this.state.PoolTempSales
                                
                    )
                            
                            
                });
                console.log('result13>  ' + result13)
                    
                alert("Sales Retired")
                this.setState({name:''})
                this.setState({Cash:''})
                this.setState({POS:''})
                this.setState({Room:''})
                this.setState({Transfer:''})
                this.setState({Complimentary:''})
                this.setState({TotalSales:''})
                this.setState({bar:''})
                this.setState({staff:''})
                this.setState({checkPool:''})

                fetch(`${users}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({barstaff:data});
                    
                });

                fetch(`${Fousers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({receptionStaff:data});
                    
                });

                fetch(`${Poolusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({poolbarStaff:data});
                    
                });

                fetch(`${Clubusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({clubStaff:data});
                    
                });

                fetch(`${Restusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({restaurantStaff:data});
                    
                });

                fetch(`${Billingusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({billingStaff:data});
                    
                });

                fetch(`${FandBusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({fandbstaff:data});
                    
                });
                    this.myTimer = setTimeout(() => {
                    var barstaff=this.state.barstaff;
                    var receptionStaff=this.state.receptionStaff;
                    var poolbarStaff=this.state.poolbarStaff;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.restaurantStaff;
                    var billingStaff=this.state.billingStaff;
                    var fandbstaff=this.state.fandbstaff;
                    this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})
    
                },2000);
            }
            
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleRetireClubSubmit() {
          
        try {
            if((this.state.ClubTempSales).length===0){
                alert ("Pool Data is not available")
            }
            else{
                var clubData = this.state.ClubTempSales;
                let result5 = fetch(postAllClubTemp, {
                    method: 'post',

                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },

                    body: JSON.stringify(
                        clubData.map(item =>item)
                        
                    )
                
                });
                console.log('result5>  ' + result5)

                let result13 = fetch(`${delTempClub}`, {
                    method: 'delete',
            
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
            
                    body: JSON.stringify(
                            
                        this.state.ClubTempSales
                                
                    )
                            
                            
                });
                console.log('result13>  ' + result13)
                    
                alert("Sales Retired")
                this.setState({name:''})
                this.setState({Cash:''})
                this.setState({POS:''})
                this.setState({Room:''})
                this.setState({Transfer:''})
                this.setState({Complimentary:''})
                this.setState({TotalSales:''})
                this.setState({bar:''})
                this.setState({staff:''})
                this.setState({checkPool:''})

                fetch(`${users}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({barstaff:data});
                    
                });

                fetch(`${Fousers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({receptionStaff:data});
                    
                });

                fetch(`${Poolusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({poolbarStaff:data});
                    
                });

                fetch(`${Clubusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({clubStaff:data});
                    
                });

                fetch(`${Restusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({restaurantStaff:data});
                    
                });

                fetch(`${Billingusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({billingStaff:data});
                    
                });

                fetch(`${FandBusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({fandbstaff:data});
                    
                });
                    this.myTimer = setTimeout(() => {
                    var barstaff=this.state.barstaff;
                    var receptionStaff=this.state.receptionStaff;
                    var poolbarStaff=this.state.poolbarStaff;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.restaurantStaff;
                    var billingStaff=this.state.billingStaff;
                    var fandbstaff=this.state.fandbstaff;
                    this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})
    
                },2000);
            }
            
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleOtherSalesSubmit() {
          
        try {
            var barSalesWRTUser = this.state.bar;

            var OtherSales = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Other Sales",
                department: "Other Sales",
                date: moment(`${this.state.date}`).format('MMM DD YYYY'),
                POS:`${this.state.POS}`,
                Cash:`${this.state.Cash}`,
                Room:`${this.state.Room}`,
                Transfer:`${this.state.Transfer}`,
                Complimentary:`${this.state.Complimentary}`,
                user:`${this.state.name}`,
                shift:`${this.state.shift}`
            }

            if((barSalesWRTUser).length===0){
                alert("Other Sales Data is not available")
            }

            else{
                let result5 = await fetch(dailysalesPost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        OtherSales
                        
                    )
                    
                });
                console.log('result5>  ' + result5)
               
                let result4 = await fetch(posttorevenueWarehouse, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        barSalesWRTUser.map(item => item)
                        
                    )
                    
                });
                console.log('result4>  ' + result4)
                
                let result3 = fetch(`${delrevenueData}/${this.state.name}`, {
                    method: 'delete',
                
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
                
                        body: JSON.stringify(
                                
                            this.state.bar
                                    
                        )
                                
                                
                });
                console.log('result3>  ' + result3)
    
                alert("Sales Retired")
                this.setState({name:''})
                this.setState({Cash:''})
                this.setState({POS:''})
                this.setState({Room:''})
                this.setState({Transfer:''})
                this.setState({Complimentary:''})
                this.setState({TotalSales:''})
                this.setState({bar:''})
                this.setState({staff:''})
                this.setState({shift:''})

                fetch(`${users}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({barstaff:data});
                    
                });

                fetch(`${Fousers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({receptionStaff:data});
                    
                });

                fetch(`${Poolusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({poolbarStaff:data});
                    
                });

                fetch(`${Clubusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({clubStaff:data});
                    
                });

                fetch(`${Restusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({restaurantStaff:data});
                    
                });

                fetch(`${Billingusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({billingStaff:data});
                    
                });

                fetch(`${FandBusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({fandbstaff:data});
                    
                });
                    this.myTimer = setTimeout(() => {
                    var barstaff=this.state.barstaff;
                    var receptionStaff=this.state.receptionStaff;
                    var poolbarStaff=this.state.poolbarStaff;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.restaurantStaff;
                    var billingStaff=this.state.billingStaff;
                    var fandbstaff=this.state.fandbstaff;
                    this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})
    
                },2000);
            }
            
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleRoomDepositSubmit() {
          
        try {
            var barSalesWRTUser = this.state.bar;

            var roomDeposits = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Accommodation Deposits",
                department: "Accommodation Deposits",
                date: moment(`${this.state.date}`).format('MMM DD YYYY'),
                POS:`${this.state.POS}`,
                Cash:`${this.state.Cash}`,
                Room:`${this.state.Room}`,
                Transfer:`${this.state.Transfer}`,
                Complimentary:`${this.state.Complimentary}`,
                user:`${this.state.name}`,
                shift:`${this.state.shift}`
                
            }

            if((barSalesWRTUser).length===0){
                alert("Room Deposit Data is not available")
            }
            else{
                let result5 = await fetch(dailysalesPost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        roomDeposits
                        
                    )
                    
                });
                console.log('result5>  ' + result5)
               
                let result4 = await fetch(posttorevenueWarehouse, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        barSalesWRTUser.map(item => item)
                        
                    )
                    
                });
                console.log('result4>  ' + result4)
    
                let result9 = await fetch(delTempRoomDeposit, {
                    method: 'delete',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        barSalesWRTUser.map(item => item)
                        
                    )
                    
                });
                console.log('result9>  ' + result9)
    
                alert("Sales Retired")
                this.setState({name:''})
                this.setState({Cash:''})
                this.setState({POS:''})
                this.setState({Room:''})
                this.setState({Transfer:''})
                this.setState({Complimentary:''})
                this.setState({TotalSales:''})
                this.setState({bar:''})
                this.setState({staff:''})
                this.setState({shift:''})
                
                fetch(`${users}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({barstaff:data});
                    
                });

                fetch(`${Fousers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({receptionStaff:data});
                    
                });

                fetch(`${Poolusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({poolbarStaff:data});
                    
                });

                fetch(`${Clubusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({clubStaff:data});
                    
                });

                fetch(`${Restusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({restaurantStaff:data});
                    
                });

                fetch(`${Billingusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({billingStaff:data});
                    
                });

                fetch(`${FandBusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({fandbstaff:data});
                    
                });
                    this.myTimer = setTimeout(() => {
                    var barstaff=this.state.barstaff;
                    var receptionStaff=this.state.receptionStaff;
                    var poolbarStaff=this.state.poolbarStaff;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.restaurantStaff;
                    var billingStaff=this.state.billingStaff;
                    var fandbstaff=this.state.fandbstaff;
                    this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})
    
                },2000);
            }
            
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleFunctionDepositSubmit() {
          
        try {
            var barSalesWRTUser = this.state.bar;

            var roomDeposits = {
                _id:'DSR'+Math.floor(Math.random()*10000),
                description: "Function Deposits",
                department: "Function Deposits",
                date: moment(`${this.state.date}`).format('MMM DD YYYY'),
                POS:`${this.state.POS}`,
                Cash:`${this.state.Cash}`,
                Room:`${this.state.Room}`,
                Transfer:`${this.state.Transfer}`,
                Complimentary:`${this.state.Complimentary}`,
                user:`${this.state.name}`,
                shift:`${this.state.shift}`
                
            }

            if((barSalesWRTUser).length===0){
                alert("Function Deposit Data is not available")
            }
            else{
                let result6 = await fetch(dailysalesPost, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        roomDeposits
                        
                    )
                    
                });
                console.log('result6>  ' + result6)
               
                let result9 = await fetch(delTempFunctionBill, {
                    method: 'delete',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        barSalesWRTUser.map(item => item)
                        
                    )
                    
                });
                console.log('result9>  ' + result9)
    
                alert("Sales Retired")
                this.setState({name:''})
                this.setState({Cash:''})
                this.setState({POS:''})
                this.setState({Room:''})
                this.setState({Transfer:''})
                this.setState({Complimentary:''})
                this.setState({TotalSales:''})
                this.setState({bar:''})
                this.setState({staff:''})
                this.setState({shift:''})
               
                
                fetch(`${users}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({barstaff:data});
                    
                });

                fetch(`${Fousers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({receptionStaff:data});
                    
                });

                fetch(`${Poolusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({poolbarStaff:data});
                    
                });

                fetch(`${Clubusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({clubStaff:data});
                    
                });

                fetch(`${Restusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({restaurantStaff:data});
                    
                });

                fetch(`${Billingusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({billingStaff:data});
                    
                });

                fetch(`${FandBusers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({fandbstaff:data});
                    
                });
                    this.myTimer = setTimeout(() => {
                    var barstaff=this.state.barstaff;
                    var receptionStaff=this.state.receptionStaff;
                    var poolbarStaff=this.state.poolbarStaff;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.restaurantStaff;
                    var billingStaff=this.state.billingStaff;
                    var fandbstaff=this.state.fandbstaff;
                    this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})
    
                },2000);
            }
            
                   
        } catch(e) {
            console.log(e)
        }

    }



    render() {
        console.log (">>> Inside Grpdetails", this.state)
        var receptDate = moment(`${this.state.date}`).format('MMM DD YYYY');
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Billinglogin/>
                </>
            )

        }

        return (
            <>
                <div  className="background990">
                <br/>
                    <div className="row">
                    
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Retire All Sales Points </h4>
                        </div>
                        <div className="col-6">
                            <h6 style = {{color:'purple',marginLeft:'480px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                            
                        </div>
                        <div className="col-3">
                            <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                        </div>
                    </div>
                    <h4 style = {{color:'rgb(23, 23, 71)',marginLeft:'50px', marginBottom:'-40px'}}> </h4>

                    <div className="formdesign510b">
                        <>
                            <span>
                                
                                <select className="form-select formsizeAA mb-3 headingspace" name="name" onChange={this.handleChange}>
                                    <option defaultValue=''>Select User</option>
                                    {this.renderUsers(this.state.staff)}
                                </select>
                            </span>
                            <span>
                                <button disabled={this.state.name===''} className="btn btn-primary setthis4" onClick={ () => this.getSales()}>Get Bar</button>
                                <button disabled={this.state.name===''} className="btn btn-danger setthis3" onClick={ () => this.getPoolSales()} onDoubleClick={()=> this.onOpenPoolBarModal()}>Get Pool</button>
                                <button disabled={this.state.name===''} className="btn btn-danger setthis3" onClick={ () => this.getClubSales()} onDoubleClick={()=> this.onOpenClubModal()}>Get Club</button>
                                <button disabled={this.state.name===''} className="btn btn-primary setthis5" onClick={ () => this.getRestSales() }>Get Rest</button>
                                <button disabled={this.state.name===''} className="btn btn-primary setthis6" onClick={ () => this.getOtherSales() }>Get Others</button>
                                <button disabled={this.state.name===''} className="btn btn-primary setthis6" onClick={ () => this.getDeposits() }>Get Deposits</button>
                                <button disabled={this.state.name===''} className="btn btn-primary setthis6" onClick={ () => this.getFunctionDeposits() }>Get Function Deposits</button>
                            
                            </span>
                        </>
                        
                        <div className="row">
                            <div className="col-4">
                                <label className='form-label bodyspace'>Cash</label>
                                <p className="form-control mb-3 formsizeAA bodyspace"><NumberFormat value={this.state.Cash}thousandSeparator={true}displayType={"text"}prefix={"NGN" }/></p>
                               
                            </div>
                            <div className="col-4">
                                <label className='form-label innerspace'>POS</label>
                                <p className="form-control mb-3 formsizeAA innerspace"><NumberFormat value={this.state.POS}thousandSeparator={true}displayType={"text"}prefix={"NGN" }/></p>
                            </div>
                            <div className="col-4">
                                <label className='form-label innerspace'>Transfer</label>
                                <p className="form-control mb-3 formsizeAA innerspace"><NumberFormat value={this.state.Transfer}thousandSeparator={true}displayType={"text"}prefix={"NGN" }/></p>
                            </div>
                            
                        </div>
                        <div className="row">
                            
                            <div className="col-4">
                                <label className='form-label bodyspace'>Room</label>
                                <p className="form-control mb-3 formsizeAA bodyspace"><NumberFormat value={this.state.Room}thousandSeparator={true}displayType={"text"}prefix={"NGN" }/></p>
                            </div>
                            <div className="col-4">
                                <label className='form-label innerspace'>Complimentary/Reservation Transfer</label>
                                <p className="form-control mb-3 formsizeAA innerspace"><NumberFormat value={this.state.Complimentary}thousandSeparator={true}displayType={"text"}prefix={"NGN" }/></p>
                            </div>
                            <div className="col-4">
                                <label className='form-label innerspace'>TOTAL SALES</label>
                                <p className="form-control mb-3 formsizeAA innerspace"><NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}prefix={"NGN" }/></p>
                            </div>
                            
                            
                        </div>
                        <center>
                            <br/>
                            <span>
                                <button className="btn btn-primary" onClick={ () => {this.onOpenBarModal()}}>Retire Bar</button>
                                <button disabled = {this.state.checkPool===''} className="btn btn-primary space" onClick={ () => this.handleRetirePoolSubmit()}>Retire Pool</button>
                                <button disabled = {this.state.checkPool===''} className="btn btn-primary space" onClick={ () => this.handleRetireClubSubmit()}>Retire Club</button>
                                <button className="btn btn-primary space" onClick={ () => this.onOpenRestModal()}>Retire Restaurant</button>
                                <button className="btn btn-primary space" onClick={ () => this.onOpenOthrsModal()}>Retire Other Sales</button>
                                <button className="btn btn-primary space" onClick={ () => this.onOpenDepModal()}>Retire Room Deposits</button>
                                <button className="btn btn-primary space" onClick={ () => this.onOpenFunctnModal()}>Retire Function Deposits</button>
                               
                            </span>
                            
                        </center>
                        <div>
                            <center>
                                <button className="btn btn-danger mt-3" onClick={ () => this.props.history.push('/BillingMenu')}>Close</button>
                            </center>
                        </div>
                        
                        
                        <br/>
                        
                        
                    </div>
                    <br/>
                    <center><h6 style = {{color:'yellow'}}>Active Shift: {localStorage.getItem('shift')} </h6></center>
                </div>
                <Modal open={this.state.Baredit}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>Bar Collection Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">NAME</th>
                                <th className="adjust50">POS (NGN)</th>
                                <th className="adjust50">Cash(NGN)</th>
                                <th className="adjust50">Transfer(NGN)</th>
                                <th className="adjust50">Compl(NGN)</th>
                                <th className="adjust50">Room(NGN)</th>
                                <th className="adjust50">Total(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet2"><b>{this.state.name}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.POS)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Cash)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Complimentary)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Room)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b> <NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></b></td>
                                
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    <div className="printing">
                        <center>
                            <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinter2()}}>
                                <p>{this.state.printBTN}</p>
                            </button>
                        </center>
                        
                    </div>
                    
                </Modal>

                <Modal open={this.state.PoolBaredit}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>PoolBar Collection Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">NAME</th>
                                <th className="adjust50">POS (NGN)</th>
                                <th className="adjust50">Cash(NGN)</th>
                                <th className="adjust50">Transfer(NGN)</th>
                                <th className="adjust50">Compl(NGN)</th>
                                <th className="adjust50">Room(NGN)</th>
                                <th className="adjust50">Total(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet2"><b>{this.state.name}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.POS)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Cash)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Complimentary)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Room)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b> <NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></b></td>
                                
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    <div className="printing">
                        <center>
                            <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinterPool()}}>
                                <p>{this.state.printBTN}</p>
                            </button>
                        </center>
                        
                    </div>
                    
                </Modal>

                <Modal open={this.state.Clubedit}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>Club Collection Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">NAME</th>
                                <th className="adjust50">POS (NGN)</th>
                                <th className="adjust50">Cash(NGN)</th>
                                <th className="adjust50">Transfer(NGN)</th>
                                <th className="adjust50">Compl(NGN)</th>
                                <th className="adjust50">Room(NGN)</th>
                                <th className="adjust50">Total(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet2"><b>{this.state.name}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.POS)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Cash)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Complimentary)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Room)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b> <NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></b></td>
                                
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    <div className="printing">
                        <center>
                            <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinterClub()}}>
                                <p>{this.state.printBTN}</p>
                            </button>
                        </center>
                        
                    </div>
                    
                </Modal>

                <Modal open={this.state.Restedit}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>Restaurant Collection Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">NAME</th>
                                <th className="adjust50">POS (NGN)</th>
                                <th className="adjust50">Cash(NGN)</th>
                                <th className="adjust50">Transfer(NGN)</th>
                                <th className="adjust50">Compl(NGN)</th>
                                <th className="adjust50">Room(NGN)</th>
                                <th className="adjust50">Total(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet2"><b>{this.state.name}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.POS)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Cash)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Complimentary)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Room)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b> <NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></b></td>
                                
                            </tr>
                            
                        </tbody>
                        
                    </table>
                    <div className="printing">
                        <center>
                            <button className="btn btn-primary" style={{height:'40px'}}onClick={()=>{this.sendtoprinterRest()}}>
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

                            <h5>Deposits Collection Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">NAME</th>
                                <th className="adjust50">POS (NGN)</th>
                                <th className="adjust50">Cash(NGN)</th>
                                <th className="adjust50">Transfer(NGN)</th>
                                <th className="adjust50">Compl(NGN)</th>
                                <th className="adjust50">Room(NGN)</th>
                                <th className="adjust50">Total(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet2"><b>{this.state.name}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.POS)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Cash)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Complimentary)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Room)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b> <NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></b></td>
                                
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

                            <h5>Other Sales Collection Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">NAME</th>
                                <th className="adjust50">POS (NGN)</th>
                                <th className="adjust50">Cash(NGN)</th>
                                <th className="adjust50">Transfer(NGN)</th>
                                <th className="adjust50">Compl(NGN)</th>
                                <th className="adjust50">Room(NGN)</th>
                                <th className="adjust50">Total(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet2"><b>{this.state.name}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.POS)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Cash)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Complimentary)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Room)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b> <NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></b></td>
                                
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

                <Modal open={this.state.functionedit}>
                    <div className='backgroundRetRep'>
                        <center>
                            <h6>{this.state.Hotelname}</h6>
                            <p className="textSize">{this.state.Hoteladdress}</p>
                            <p className="textSize">{this.state.Hotelphone}</p>

                            <h5>Other Sales Collection Receipt</h5>
                            <p className="textSize">Date: {receptDate}</p>

                        </center>

                    </div>
                    <table className="table table-hover">
                        
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust50">NAME</th>
                                <th className="adjust50">POS (NGN)</th>
                                <th className="adjust50">Cash(NGN)</th>
                                <th className="adjust50">Transfer(NGN)</th>
                                <th className="adjust50">Compl(NGN)</th>
                                <th className="adjust50">Room(NGN)</th>
                                <th className="adjust50">Total(NGN)</th>
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            <tr>
                                <td className="table-light table-striped adjust2 alignTet2"><b>{this.state.name}</b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.POS)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Cash)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Complimentary)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.Room)}thousandSeparator={true}displayType={"text"}/></b></td>
                                <td className="table-light table-striped adjust2 alignTet2"><b> <NumberFormat value={this.state.TotalSales}thousandSeparator={true}displayType={"text"}/></b></td>
                                
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
            
        );
    }
  
    async componentDidMount() {
        console.log(">>> Inside GstDidMount", this.state)
        
        fetch(`${users}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({barstaff:data});
            
        });

        fetch(`${Fousers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({receptionStaff:data});
            
        });

        fetch(`${Poolusers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({poolbarStaff:data});
            
        });

        fetch(`${Clubusers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({clubStaff:data});
            
        });

        fetch(`${Restusers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({restaurantStaff:data});
            
        });

        fetch(`${Billingusers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({billingStaff:data});
            
        });

        fetch(`${FandBusers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({fandbstaff:data});
            
        });
              
        this.myTimer = setTimeout(() => {
            var barstaff=this.state.barstaff;
            var receptionStaff=this.state.receptionStaff;
            var poolbarStaff=this.state.poolbarStaff;
            var restaurantStaff=this.state.restaurantStaff;
            var billingStaff=this.state.billingStaff;
            var fandbstaff=this.state.fandbstaff;
            var clubStaff=this.state.clubStaff;
            this.setState({staff:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff,...clubStaff]})

        },2000);

        
        fetch(`${getAllTemppoolbarSales}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({PoolTempSales:data});
            
        });

        fetch(`${getAllTempClubSales}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({ClubTempSales:data});
            
        });

        fetch(`${getAllpoolbarSales}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({PoolRemaininPosts:data});

            this.myTimer = setTimeout(() => {

                if((this.state.PoolRemaininPosts).length===0){
                    this.setState({checkPool:0})
                }
                
                
            },3000)
            
        });

        fetch(`${getAllClubSales}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({ClubRemaininPosts:data});

            this.myTimer = setTimeout(() => {

                if((this.state.ClubRemaininPosts).length===0){
                    this.setState({checkPool:0})
                }
                
                
            },3000)
            
        });

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
                this.setState({date:item.date})
                return 'ok'
            })
            
           
        })

        this.myTimer = setTimeout(() => {
            fetch(`${getWorkDate}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({date:item.date})
                    return 'ok'
                })
                
            
            })
            
        },1000);

        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })

        this.myTimer = setTimeout(() => {

            var loginInfo = this.state.loginDetails;
            var nameDetails = this.state.name2;
            if(loginInfo.some(item => item.name === nameDetails)){
                this.setState({Blogin:true})
            }
            else{
                this.setState({Blogin:false})
            }
        },1000);
       
    }


}


export default RetireBar;