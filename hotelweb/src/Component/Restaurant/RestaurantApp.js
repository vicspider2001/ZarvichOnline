import React,{Component} from 'react';
import '../Bar/Bar.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import Restlogin from '../Restlogin';
import {Modal} from 'react-responsive-modal';
import 'bootstrap/dist/css/bootstrap.min.css';


const restMenugrpUrl = "http://10.1.0.99:3333/menuCategories";
const menuUrl = "http://10.1.0.99:3333/menuitems?mealtypes=";
const postRestBill = "http://10.1.0.99:3333/restaurant";
const postRestCredit = "http://10.1.0.99:3333/restCredit";
const getRooms ="http://10.1.0.99:3333/checkin?docket=Yes";
const getGuestID = "http://10.1.0.99:3333/checkin?roomNumID=";
const postDocketToRoom = "http://10.1.0.99:3333/bill";
const getPaymentMethods = "http://10.1.0.99:3333/paymentMethods";
const postToTable = "http://10.1.0.99:3333/restaurantTablePost";
const getTable = "http://10.1.0.99:3333/restTable";
const getTableID = "http://10.1.0.99:3333/restTable?resttableID=";
const getStoreData = "http://10.1.0.99:3333/getRestBarStore";
const postBarSalesQty = "http://10.1.0.99:3333/postRestSalesQty";
const getBarSalesQty = "http://10.1.0.99:3333/getRestSalesQty";
const getRestCredit = "http://10.1.0.99:3333/restaurantCredit?RCstaff=";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";
const getWorkDate = "http://10.1.0.99:3333/getActive";
const userName = "http://10.1.0.99:3333/restUserInfo";


class RestaurantApp extends Component {

    constructor(props) {
        super (props);
        console.log(">>>Inside RESConstructor",props)

        this.state = {
            Newmeal:'',
            Newprice:'',
            Newqty:0,
            Newid:'',
            edit:false,
            credit:false,
            editreceipt:false,
            compModal:false,
            report:false,
            printStop:0,
            docketFirst:0,
            printBTN:'Print',
            print:0,
            blockTable:0,
            IDfound:[],


            menu:'',
            meal:'',
            mealPrice:'',
            mealQuantity:'',
            mealId:Math.floor(Math.random()*10000),
            guestInhouseID:'',
            selected:[],
            menuID:'',
            menulist:'',
            cost:0,
            amountPaid:'',
            roomNumbers:'',
            paymentMethod:'',
            displayPaymentMethods:'',
            displayRoomNums:'',
            transactionDate:'',
            tables:'',
            group:'',
            newTable:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            shiftcolor:'',
            shift:localStorage.getItem('shift'),

            DrinkstoreData:[],
            DrinkSalesQtyData:[],
            DrinkStore:0,
            DrinkSalesQty:0,
            stockBal:0,
            
            
            DrinkSalesQtyReportData:[],
            useReportName:'',
            useReportShift:'',
            useReportDate:'',
            totalSales:0,
            Stockbtn:'Add',
            NewtableNum:0,


            creditSales:'',
            TotalCredit:0,
            creditPaid:0,
            payNwMeth:'',
            TotalCreditPaid:0,

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:'',

            pass:'',
            pword:false,
            pword2:false,

            

        }
        
    }

    onOpenPword(){
        if(this.state.paymentMethod==="Credit"){
            this.setState({
                pword: true
            })
            
        }
        else{
            this.setState({
                pword: false
            });
            this.onOpenModalreceipt();
            this.postQty()
        }

    }

    onClosePword(){
        this.setState({
            pword: false
        })
        
    }

    AllowRefund(){
        if(this.state.pass==='6849'){
            this.onOpenModalreceipt();
            this.postQty();
            this.onClosePword()

        }
        else{
            alert('Access Denied')
        }
    }


    onOpenModaltoprint(){
        this.setState({
            edit: true
            
        })
        
        
    }

    
    onOpenCompModal(){
        this.setState({
            compModal: true
        })
        
        
    }

    onCloseCompModal(){
        this.setState({
            compModal: false
        })
        
    }


    onCloseModaltoprint(){
        this.setState({
            edit: false
        })
        
    }

    onCloseModalCredit(){
        this.setState({
            credit: false,
            creditPaid:0
        })
        
    }
    onOpenModalreceipt(){
        this.setState({
            editreceipt: true
        })
        
        
    }

    onCloseModalreceipt(){
        this.setState({
            editreceipt: false
        })
        
    }

    onOpenModalreport(){
        this.setState({
            report: true
        })
        
        
    }

    onCloseModalreport(){
        this.setState({
            report: false
        })
        
    }

    handleReport(){

        var todayDate = moment(this.state.transactionDate).format('MMM DD YYYY');
        var username = localStorage.getItem('userInfo');
        var findQty = `${getBarSalesQty}?useDate=${todayDate}&&useshift=${this.state.shift}&&userstaff=${username}`
        
        fetch(`${findQty}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                DrinkSalesQtyReportData:data
            })
            
        })
        this.myTimer = setTimeout(() => {
            if(this.state.DrinkSalesQtyReportData.length>0){
                var useData = this.state.DrinkSalesQtyReportData
                var findUser = useData.find(element=>element.user===username)
                var useDt = [];
                useDt.push(findUser);
                this.setState({useReportName:useDt.map(item=>item.user)})
                this.setState({useReportShift:useDt.map(item=>item.shift)})
                this.setState({useReportDate:useDt.map(item=>item.tranDate)})
                
                var TotSal = useData.reduce((total, item)=>{
                    return total + parseInt (item.productPrice * item.Quantity)
                }, 0);
                this.setState({totalSales:TotSal});
    
                this.onOpenModalreport()
            }
            else{
    
                alert('No Sales was posted by '+username)
    
            }
        },1000)
        
        
    }

    handleStock(){
        if(this.state.DrinkstoreData.length>0){
            var stockItem = sessionStorage.getItem('meal');
           
            //check available stock
            const stockData=this.state.DrinkstoreData;
            var totalStock = stockData.filter(stock => stock.productName.includes(stockItem)).reduce((total, item)=>{
                return total + parseInt(item.piecesOut)
            }, 0);
            this.setState({DrinkStore:totalStock})

            //check quantity sold
            const qtyData=this.state.DrinkSalesQtyData;
            var totalQty = qtyData.filter(qty => qty.productName.includes(stockItem)).reduce((total, item)=>{
                return total + parseInt(item.Quantity)
            }, 0);
            this.setState({DrinkSalesQty:totalQty})
            
            //show stock balance
            this.myTimer = setTimeout(() => {

                var Total = 0;
                var ST = Total + this.state.DrinkStore-this.state.DrinkSalesQty;
                this.setState({stockBal:ST})

                // if(this.state.stockBal===0){
                //     var stockItem2 = sessionStorage.getItem('meal');
                //     alert(stockItem2+' is out of stock')
                //     this.setState({
                //         Newmeal:'',
                //         Newprice:'',
                //         Newqty:0,
                //         Newid:''
                //     })
                // }
                
                
            },1000);

            
                
        }
       

    }


    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

        
    handleCost=(selected)=>{
        if(this.state.selected!==null){
           const totalSale = selected.reduce((total, item) => {
               return total + item.mealPrice * item.qty
           }, 0);
           this.setState({cost:totalSale})
        }
        if(this.state.cost!==null){
            fetch(`${getRooms}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayRoomNums:data
                })
            })
            fetch(`${getPaymentMethods}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayPaymentMethods:data
                })
            })
            localStorage.setItem('printMenus', JSON.stringify(selected));
            localStorage.removeItem('btnCntrl');
            localStorage.removeItem('delcntrl')
            
            
        }
        
        
    }  
   
    addqty = () => {
        const del = this.state.selected.map((item) => parseInt(item.qty + 1));
        this.setState({selected:del})
       
    }
        
    removeAll = (id) => {
        const del = this.state.selected.filter(item => item.id === id);
        this.setState({selected:del})
        this.setState({cost:0})
        this.setState({roomNumbers:''})
        this.setState({amountPaid:''})
        this.setState({displayRoomNums:''})
        this.setState({paymentMethod:''})
        this.setState({displayPaymentMethods:''})
        this.setState({
            displayPaymentMethods:'',
            DrinkStore:0,
            DrinkSalesQty:0,
            stockBal:0
        })
        
    }

    

    async addToTable() {
          
        try {
            var tableID2 = sessionStorage.getItem('tableNumber2');

           var orderItems = this.state.selected;
           var data = {
                selected:orderItems.map(item => item),
                billCost:this.state.cost,
                tableNum:sessionStorage.getItem('tableNumber2'),
                user:localStorage.getItem('userInfo')
            }
           
            
            let result = await fetch(`${postToTable}/${tableID2}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result>  ' + result)
            this.setState({selected:[]})
            localStorage.setItem('btnCntrl',true);
            this.setState({cost:0})
            this.setState({roomNumbers:''})
            this.setState({displayRoomNums:''})
            this.setState({displayPaymentMethods:''})
            this.setState({paymentMethod:''})
            this.setState({printStop:0})
            localStorage.removeItem('delcntrl');
            sessionStorage.removeItem('tableNumber2')
            

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            });

            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async NewTable() {
          
        try {
            
            var NewtableID = sessionStorage.getItem('tableNumber2');

            var orderItems = this.state.selected;
            var data = {
                selected:orderItems.map(item => item),
                billCost:this.state.cost,
                tableNum:NewtableID
            }
            
            if(this.state.cost===0){
                alert ("If you click table Number again without an order, I will slap you!")
                sessionStorage.removeItem('tableNumber2')
            }

            else{
                let result = await fetch(`${postToTable}/${NewtableID}`, {
                    method: 'put',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        data
                        
                    )
                    
                });
                console.log('result>  ' + result)
                this.setState({selected:[]})
                localStorage.setItem('btnCntrl',true);
                this.setState({cost:0})
                this.setState({roomNumbers:''})
                this.setState({displayRoomNums:''})
                this.setState({displayPaymentMethods:''})
                this.setState({paymentMethod:''})
                localStorage.removeItem('delcntrl');
                this.setState({newTable:''})
                
    
                fetch(`${getTable}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({tables:data})
                });
    
            }
                              
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
                cost:item.billCost,
                NewtableNum:1
            })
            return 'ok'
                   
            })
                localStorage.removeItem('btnCntrl')
            })

            fetch(`${getRooms}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayRoomNums:data
                })
            })
        
            fetch(`${getPaymentMethods}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayPaymentMethods:data
                })
            })
            localStorage.setItem('delcntrl',true)
            this.setState({printStop:1})
       
        } catch(e) {
            console.log(e)
        }

    }

    postQty(){
       
        try {
            
            this.state.selected.map((item)=>{
                var prodName = item.meal;
                var prodPrice = item.mealPrice;
                var Qty = item.qty;
                var ID = item.tranID;
                
                var salesQty = {
                    id:ID,
                    productName:prodName,
                    productPrice:prodPrice,
                    Quantity:parseInt(Qty),
                    user: localStorage.getItem('userInfo'),
                    tranDate:moment(this.state.transactionDate).format('MMM DD YYYY'),
                    shift:localStorage.getItem('shift'),
                                
                }
                let result = fetch(`${postBarSalesQty}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        salesQty
                    )
                        
                });
                console.log('result>  ' + result)
                this.setState({
                    Newmeal:'',
                    Newprice:'',
                    Newqty:0,
                    Newid:'',
                    DrinkstoreData:[],
                    DrinkSalesQtyData:[]
                })

                fetch(`${getStoreData}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        DrinkstoreData:data
                    })
                })

                fetch(`${getBarSalesQty}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        DrinkSalesQtyData:data
                    })
                })
                
                return 'ok'
            })    
        

            
        }catch(e) {
            console.log(e)
        }
    }

             
    buttonClick (){
        fetch(`${menuUrl}${this.state.menuID}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                menulist:data
            })
        })

    }

    sendtoprinter(){
        
        window.print();
        
       
    }

    sendtoprinter2(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({printBTN:'Close'})
        }
        else if(this.state.printBTN==='Close'){
            this.setState({edit: false})      
            this.setState({printBTN:'Print'})
            this.setState({
                print:0,
                printStop:0,
                // DrinkStore:0,
                DrinkSalesQty:0,
                stockBal:0,
                blockTable:0

            }) 
            
        }
       
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    
    }

    handleCredit(){
        var userCredit = localStorage.getItem('userInfo');
        fetch(`${getRestCredit}${userCredit}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                creditSales:data
            })
            data.map((item)=>{
                var allCredit = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.creditAmount)
                }, 0);

                this.setState({TotalCredit:allCredit,});
                var allCreditPaid = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.creditPaid)
                }, 0);
                this.setState({TotalCreditPaid:allCreditPaid});
                return 'ok'
            })
        })

        this.myTimer = setTimeout(() => {

            this.setState({
                credit: true
            })
    
        },1000);
        
        
    }

    handleChange3 = (event) => {
        if(this.state.Newmeal!==''||this.state.Newprice!==''||this.state.Newid!==''){
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
            var tableID = sessionStorage.getItem('tableNumber2');
            
            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber2')
            }

            if(this.state.paymentMethod==="POS"){
                var POSSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(this.state.transactionDate).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:`${this.state.amountPaid}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result5 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        POSSales
                       
                    )
                    
                });
                console.log('result5>  ' + result5)

            }
            if(this.state.paymentMethod==="Cash"){
                var CashSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    CashAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result4 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CashSales
                       
                    )
                    
                });
                console.log('result4>  ' + result4)
                
            }
            if(this.state.paymentMethod==="Transfer"){
                var transferSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    TransferAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    CashAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result3 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        transferSales
                       
                    )
                    
                });
                console.log('result3>  ' + result3)
                
            }

            if(this.state.paymentMethod==="Complimentary"){
                var complimentarySales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    amountPaid:`${this.state.amountPaid}`,
                    CompDebit:`${this.state.cost}`,
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }

                let result2 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        complimentarySales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

            }

            if(this.state.paymentMethod==="Credit"){
                var CreditSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    creditAmount:`${this.state.amountPaid}`,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Credit",
                    department: "Restaurant Credit",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift'),
                    creditPaid:`${this.state.creditPaid}`
                   
                }

                let result2 = await fetch(postRestCredit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CreditSales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

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

            alert("Sales Posted")
            this.setState({selected:[]});
            this.setState({cost:0})
            this.setState({amountPaid:''})
            this.setState({displayRoomNums:''})
            this.setState({roomNumbers:''})
            this.setState({paymentMethod:''})
            this.setState({displayPaymentMethods:''})
            this.setState({group:''})
            this.setState({
                shift:'',
                Newmeal:'',
                Newprice:'',
                Newqty:0,
                Newid:'',
                DrinkstoreData:[],
                DrinkSalesQtyData:[],
                NewtableNum:0
            })
            localStorage.removeItem('delcntrl');
            sessionStorage.removeItem('tableNumber2')

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            })
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async postCredit() {
          
        
        try {
            
            var CreditSales = {
                docketNum:'Rest'+Math.floor(Math.random()*10000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:0,
                creditAmount:0,
                paymentMethod:`${this.state.paymentMethod}`,
                description: "Restaurant Credit",
                department: "Restaurant Credit",
                docketDetails: this.state.selected,
                group:`${this.state.group}`,
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
                creditPaid:`${this.state.creditPaid}`
                
            }
            let creditPay = await fetch(postRestCredit, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    CreditSales
                    
                )
                
            });
            console.log('creditPay>  ' + creditPay)

            if(this.state.paymentMethod==="POS"){
                var POSSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:`${this.state.creditPaid}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Credit",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result5 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        POSSales
                       
                    )
                    
                });
                console.log('result5>  ' + result5)

            }
            if(this.state.paymentMethod==="Cash"){
                var CashSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    CashAmount:`${this.state.creditPaid}`,
                    POSAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Credit",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result4 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CashSales
                       
                    )
                    
                });
                console.log('result4>  ' + result4)
                
            }
            if(this.state.paymentMethod==="Transfer"){
                var transferSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    TransferAmount:`${this.state.creditPaid}`,
                    POSAmount:0,
                    CashAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Credit",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result3 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        transferSales
                       
                    )
                    
                });
                console.log('result3>  ' + result3)
                
            }

            alert("Credit Posted")
            this.setState({
                creditSales:'',
                TotalCredit:0,
                creditPaid:0,
                TotalCreditPaid:0
            })
                               
        } catch(e) {
            console.log(e)
        }

    }

    async handleRoomSubmit() {
        
        try {
            
            var tableID2 = sessionStorage.getItem('tableNumber2');

            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber2')
            }
            
            var restaurantSales = {
                docketNum:'Rest'+Math.floor(Math.random()*10000),
                refID:`${this.state.guestInhouseID}`,
                _id:Math.floor(Math.random()*10000000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:`${this.state.cost}`,
                amountPaid:`${this.state.amountPaid}`,
                roomDebit:`${this.state.cost}`,
                POSAmount:0,
                CashAmount:0,
                TransferAmount:0,
                CompDebit:0,
                paymentMethod:`${this.state.paymentMethod}`,
                roomNumbers:`${this.state.roomNumbers}`,
                description: "Restaurant Docket",
                department: "Restaurant Sales",
                docketDetails: this.state.selected,
                group:`${this.state.group}`,
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
            }
            let result = await fetch(postDocketToRoom, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    restaurantSales
                   
                )
                
            });
            console.log('result>  ' + result)

            let result2 = await fetch(postRestBill, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    restaurantSales
                   
                )
                
            });
            console.log('result2>  ' + result2)
           
            let result14 = await fetch(`${postToTable}/${tableID2}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result14>  ' + result14)
            alert("Docket Posted to Room " +this.state.roomNumbers)
            this.setState({selected:[]});
            this.setState({cost:0})
            this.setState({amountPaid:''})
            this.setState({displayRoomNums:''})
            this.setState({roomNumbers:''})
            this.setState({paymentMethod:''})
            this.setState({group:''})
            this.setState({shift:''})
            this.setState({ NewtableNum:0})
            localStorage.removeItem('delcntrl');
            sessionStorage.removeItem('tableNumber2')
           
            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            })
                   
        } catch(e) {
            console.log(e)
        }

    }

    renderPayMeth(data){
        if(data) {
            return data.map((item, index) => {
                return(
                    <>
                        <option key={index} value={item.method}>
                            {item.method}
                        </option>
                    </>
                )
            })
        }
    }

    renderTables(data){
        if(data) {
            data.sort((a, b) => a.tableNum - b.tableNum);
           
            return data.map((item) => {
                if(item.billCost===""){
                    return(
                        <div key={item._id}>
                            <button className="btn btn-success cartBtn3 alignroomsgreen2" disabled = {this.state.NewtableNum===1} onClick={() => {sessionStorage.setItem('tableNumber2', item.tableNum);this.NewTable();this.setState({docketFirst:0})}}>
                                <p className="texted">{item.tableNum}</p>
                            </button>
                        </div>
                    )
                }
                else{
                    return(
                        <div key={item._id}>
                            <button className="btn btn-warning cartBtn3 alignroomsgreen2" onClick={() => {sessionStorage.setItem('tableNumber2', item.tableNum);this.getTableR();this.setState({print:1})}}>
                                <p className="texted">{item.tableNum}</p>
                            </button>
                        </div>
                    )
                }
               
            })
        }
    }

    renderRooms(data){
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

    
    addMeal(){
        var menuselect=this.state.menulist;
        menuselect.map((item)=>{
            this.setState({
                Newmeal:item.mealName,
                Newprice:item.mealPrice,
                Newqty:parseInt(item.mealQt),
                Newid:item._id

            })
            return 'ok'
        })
        
    }
    increament(){
        if(this.state.Newqty!==0){
            this.setState({
                Newqty:this.state.Newqty +1
            })
        }
       
    }

    decreament(){
        if(this.state.Newqty!==0){
            this.setState({
                Newqty:this.state.Newqty -1
            })
        }
    }

    pushorder(){
        var selected = this.state.selected;
        var selectedMeals = {};

        if(this.state.selected.length>0){
            this.setState({blockTable:1});
    
            selectedMeals.id=this.state.Newid;
            selectedMeals.meal=this.state.Newmeal;
            selectedMeals.mealPrice=this.state.Newprice;
            selectedMeals.qty=this.state.Newqty;
            selectedMeals.tranID=Math.floor(Math.random()*10000)
            
            selected.push(selectedMeals);
                      
            this.setState({
                selected,
                printStop:0,
                DrinkStore:0,
                DrinkSalesQty:0,
                stockBal:0,
                Newmeal:'',
                Newprice:'',
                Newqty:0,
                Newid:''
            })
                
           
        }
        else if(this.state.selected.length===0){
            this.setState({blockTable:0});

            selectedMeals.id=this.state.Newid;
            selectedMeals.meal=this.state.Newmeal;
            selectedMeals.mealPrice=this.state.Newprice;
            selectedMeals.qty=this.state.Newqty;
            selectedMeals.tranID=Math.floor(Math.random()*10000)
            
            selected.push(selectedMeals);
                      
            this.setState({
                selected,
                Newmeal:'',
                Newprice:'',
                Newqty:0,
                Newid:'',
                printStop:0,
                DrinkStore:0,
                DrinkSalesQty:0,
                stockBal:0
            })
        }

        

        this.myTimer = setTimeout(() => {
            if(this.state.selected.length>0){
                const totalSale = selected.reduce((total, item) => {
                    return total + item.mealPrice * item.qty
                }, 0);
                this.setState({
                    cost:totalSale,
                    
                })
            }

            if(this.state.cost!==0){
                fetch(`${getRooms}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        displayRoomNums:data
                    })
                })
                fetch(`${getPaymentMethods}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        displayPaymentMethods:data
                    })
                })
                // localStorage.removeItem('btnCntrl');
                localStorage.removeItem('delcntrl')
            }
            
        },1000);

 
    }
    

     
    renderMenu(data){
        if (data){
            return data.map((item) =>{
                return(
                    <>
                        <div>
                            <center>
                                
                                <div className="card alignroomsgreen3"style={{backgroundColor:'orangered'}} key={item.mealTypeID}>
                                    <button className="btn btn-orangered buttnheightbtn" onMouseOver={()=>sessionStorage.setItem('meal',item.mealName)} onClick={ () =>{this.setState({Newmeal:item.mealName,Newprice:item.mealPrice,Newqty:parseInt(item.mealQt),Newid:item._id,tranID2:Math.floor(Math.random()*10000)});this.handleStock()}}>                         
                                        
                                    <p className="card-title formatnew2">{item.mealName}</p> 
                                    </button>
                                </div>
                                
                            </center>
                        </div>
                    </>
                )
            })
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

    renderSalesReport(data){
        
        if(data) {
            return data.map((item) =>{
                
                return(
                    <>
                        
                        <tr key= {item.id}>
                            {/* <td className="table-light table-striped adjust texted8">{item.id}</td> */}
                            <td className="table-light table-striped adjust texted8">{item.productName}</td>
                            <td className="table-light table-striped adjust texted8">{item.Quantity}</td>
                            <td className="table-light table-striped adjust texted8"><NumberFormat value={item.productPrice} thousandSeparator={true} displayType={"text"}/></td>
                            <td className="table-light table-striped adjust texted8"><NumberFormat value={item.productPrice*item.Quantity} thousandSeparator={true} displayType={"text"}/></td>
                            <td className="table-light table-striped adjust texted8"> </td>
                            
                        </tr>
                        
                        
                        
                    </>
                )
                
                
            })
        }
    }


    renderPos(food){
        if(food) {
            return food.map((item) =>{
               
                return(
                    <>
                        <div>
                            <center>
                                
                                <div className="card alignroomsgreen3"style={{backgroundColor:'blueviolet'}} key={item.mealTypeID}>
                                    <button className="btn btn-blueviolet buttnheightbtn" onMouseOver={() => this.setState({menuID:item.mealTypeID})} onClick={ () => this.buttonClick () }>
                                        <p className="card-title formatnew2">{item.mealType}</p> 
                                    </button>
                                </div>
                                
                            </center>
                        </div>
                        
                    </>
                )
            })
        }

    }
    
    render() {
        console.log(">>> Inside RESrender", this.state)
        var tranDt = moment(`${this.state.transactionDate}`).format('MMM DD YYYY');
        var docketNum ='Rest'+Math.floor(Math.random()*10000);
        var add = this.state.amountPaid;
        if(this.state.amountPaid===''){
            add = 0
        }


        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Restlogin/>
                </>
            )

        }

        return(
            <div className="posterminal">  
                               
                <br/>     
                <div className ="row quantity" >
                               
                    <center>
                        <h6 style={{color:'white'}}>Add Quantity</h6>
                    </center>
                            
                    <div>
                        <div className="row">
                            <p className="prices">Price: {this.state.Newprice}</p>
                            {/* <p className="prices2">Avail.Stock: {this.state.stockBal}</p> */}
                            <span className="dcrbtn">
                                <button className="form-control mb-3 formsizeX1" onClick={() =>this.decreament()}><p className="sign">-</p></button>
                            </span>
                            <span className="qtybtn">
                                <input type="number" className="form-control2 mb-3 formsizeX" style={{textAlign:'center',fontStyle:'bold',color:'white',fontSize:'24px'}}name="Newqty" value={this.state.Newqty} onChange={this.handleChange3}/>
                            </span>
                            <span className="incbtn">
                                <button className="form-control mb-3 formsizeX1" onClick={() => this.increament()}><p className="sign">+</p></button>
                            </span>2
                            <button className="btn btn-warning addbtn" disabled={this.state.Newqty===0} onClick={() =>{this.pushorder();this.setState({docketFirst:1})}}>Add</button>
                            
                        </div>
                        
                    </div>
                </div>

                

                <div className="salesTable">
                
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

                
                    
                <div className="amountP">
                    <input type="text" className="form-control mb-3 formsizeA1 textedM" name="amountPaid" require placeholder= "Enter Payment" value={this.state.amountPaid} onChange={this.handleChange}/>
                </div>

                <div className="method">
                    <select className="form-select formsizeA1 textedM" name="paymentMethod" onChange={this.handleChange}>
                        <option selected value=''>Payment Method</option>
                        {this.renderPayMeth(this.state.displayPaymentMethods)}
                    </select>
                </div>
                
                
                <div className="textAmount">
                    <p className="fmtcost2" style={{color:'white'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                </div>
                <div className="textAmount2">
                    <p className="fmtcost2" style={{color:'white'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                </div>

                <div className="operations">
                    
                    <h4 className="texted4" style={{color:'white'}}>Operations</h4>
                    
                    <button disabled={localStorage.getItem('delcntrl')} className="btn btn-primary cartBtn2" onClick={() => {this.removeAll();this.setState({docketFirst:0})}}>
                        <p className="texted">Delete</p>
                    </button>
                    
                    <button disabled={this.state.cost===0||this.state.amountPaid===''||this.state.amountPaid<this.state.cost||this.state.amountPaid>this.state.cost||this.state.paymentMethod===''||this.state.paymentMethod==='Complimentary'||this.state.docketFirst===1} className="btn btn-primary cartBtn2" onClick={() => {this.onOpenPword()}}>
                        <p className="texted">Post</p>
                    </button>
                    <select type ="button" disabled={this.state.docketFirst===1} className="form-select formsizeB mb-2 btn btn-primary texted" name="roomNumbers" onChange={this.handleChange2}>
                        <option selected value=''>Rooms</option>
                        {this.renderRooms(this.state.displayRoomNums)}
                                                                    
                    </select>
                                            
                    <button disabled={this.state.roomNumbers===''||this.state.amountPaid!=='' ||this.state.docketFirst===1} className="btn btn-primary cartBtn4" onClick={() => {this.onOpenCompModal();this.postQty()}}>
                        <p className="texted">Room Post</p>
                    </button>
                    <button disabled={this.state.paymentMethod!=='Complimentary'||this.state.amountPaid!==''||this.state.docketFirst===1} className="btn btn-primary cartBtn2" onClick={() =>{this.onOpenModalreceipt();this.postQty()}}>
                        <p className="texted">Comp</p>
                    </button>
                    <button disabled={this.state.docketFirst===1} className="btn btn-primary cartBtn2" onClick={ ()=>{this.handleReport()}}>
                        <p className="texted">Reports</p>
                    </button>
                    
                    <button disabled={localStorage.getItem('btnCntrl')} className="btn btn-warning cartBtn12" onClick={() => {this.addToTable();this.setState({NewtableNum:0})}}>
                        <p className="texted">Add to Table {sessionStorage.getItem('tableNumber2')}</p>
                    </button>
                    
                    <button disabled = 'true' className="btn btn-danger cartBtn2" onClick={ ()=>this.logout}>
                        <p className="texted">Close</p>
                    </button>    

                    <button className="btn btn-danger cartBtn20" onClick={ ()=> this.logout()}>
                        <p className="texted">Log Out {localStorage.getItem('userInfo').split(' ')[0]}</p>
                    </button>

                    <button disabled={this.state.docketFirst===1} className="btn btn-primary cartBtn112" onClick={ ()=>{this.handleCredit()}}>
                        <p className="texted">Recover Debt</p>
                    </button>
                    <button disabled className={this.state.shiftcolor}>
                        <p className="texted">{localStorage.getItem('shift')}</p>
                    </button>
                    <button disabled ={this.state.selected.length===0 || this.state.printStop===0||this.state.print===0}className={this.state.shiftcolor} onClick={()=>{this.onOpenModaltoprint();localStorage.setItem('delcntrl',true)}}>
                        <p className="texted">Print Docket</p>
                    </button>
                    
                </div>

                <div className="tables">
                    <h5 className="texted2" style={{color:'white'}}>Get Table</h5>
                    <h5 className='texted2'style={{color:'yellow'}}>Work Date: {tranDt}</h5>
                    <div>
                        {this.renderTables(this.state.tables)}
                    
                    </div>
                    <h6 style={{color:'silver', textAlign:'right'}}>Restaurant App</h6>
                    <button className="btn btn-danger texted" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
                </div>

                <div className ="mainmenu">
                    {this.renderPos(this.state.menu)}
                </div>

                <div className ="menulistItems">
                    {this.renderMenu(this.state.menulist)}
                </div>

                <Modal open={this.state.edit}>
                    
                    <div>
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSized mb-3">{this.state.Hotelphone}</p>
                        <hr/>
                            <p className="textSized2" style={{fontWeight:'bold', fontFamily: 'Georgia, Times New Roman, Times, serif', fontSize:'14px'}}>Restaurant Docket</p>
                            <p className="textSized2">Date: {tranDt}</p>
                            <p className="textSized2 mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="table table-hover">
                            <thead className="table-warning">
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Price(=N)</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Amount(=N)</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="table table-hover tableheight">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Total:<NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Amount Paid:<NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized2">Prepared By: {localStorage.getItem('userInfo')}</p>
                            <p className="textSized2">Shift: {localStorage.getItem('shift')}</p>
                            <p style={{fontSize:'13px', fontFamily: 'monospace', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter2()}}>
                                    <p className="texted2">{this.state.printBTN}</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

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


                <Modal open={this.state.editreceipt} onClose={()=>{this.onCloseModalreceipt();this.handleSubmit()}}>
                    
                    <div>
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSized mb-3">{this.state.Hotelphone}</p>
                        <hr/>
                            <p className="textSized2" style={{fontWeight:'bold', fontFamily: 'Georgia, Times New Roman, Times, serif', fontSize:'14px'}}>Restaurant Receipt</p>
                            <p className="textSized2">Date: {tranDt}</p>
                            <p className="textSized2 mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="table table-hover">
                            <thead className="table-warning">
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Price(=N)</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Amount(=N)</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="table table-hover tableheight">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Amount Paid: <NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized2">Prepared By: {localStorage.getItem('userInfo')}</p>
                            <p className="textSized2">Shift: {localStorage.getItem('shift')}</p>
                            <p style={{fontSize:'13px', fontFamily: 'Georgia, Times New Roman, Times, serif', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted2">Print</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseModalreceipt();this.handleSubmit()}}>
                                    <p className="texted2">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                <Modal open={this.state.compModal} onClose={()=>{this.onCloseCompModal();this.handleRoomSubmit()}}>
                    
                    <div>
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSized mb-3">{this.state.Hotelphone}</p>
                        <hr/>
                            <p className="textSized2" style={{fontWeight:'bold',fontSize:'14px'}}>Restaurant Docket</p>
                            <p className="textSized2">Date: {tranDt}</p>
                            <p className="textSized2 mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="table table-hover">
                            <thead className="table-warning">
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Price(=N)</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Amount(=N)</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="table table-hover tableheight">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Amount Paid: <NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'15px', fontFamily: 'monospace', fontWeight:'bolder'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized2">Prepared By: {localStorage.getItem('userInfo')}</p>
                            <p className="textSized2">Shift: {localStorage.getItem('shift')}</p>
                            <p style={{fontSize:'13px', fontFamily: 'Georgia, Times New Roman, Times, serif', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted2">{this.state.printBTN}</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseCompModal();this.handleRoomSubmit()}}>
                                    <p className="texted2">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                {/* view daily sales report */}
                <Modal open={this.state.report} onClose={()=>{this.onCloseModalreport()}}>
                    
                    <div>
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSized mb-3">{this.state.Hotelphone}</p>
                        <hr/>
                            <p className="textSized2" style={{fontWeight:'bold',fontSize:'14px'}}>Restaurant Daily Sales Report</p>
                            <p className="textSized2">Report Date: {tranDt}</p>
                            <p className="textSized2 mb-3">Shift: {this.state.useReportShift}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="table table-hover">
                            <thead className="table-warning">
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Price(=N)</th>
                                    <th className="adjust2Nw" style={{fontSize:'10px'}}>Amount(=N)</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="table table-hover tableheight">
                                {this.renderSalesReport(this.state.DrinkSalesQtyReportData)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'14px', fontFamily: 'Georgia, Times New Roman, Times, serif', fontWeight:'bold'}}>Total Sales: <NumberFormat value={this.state.totalSales} thousandSeparator={true} displayType={"text"}/>.00</p>
                        
                        <hr/>
                        
                        <center>
                            <p className="textSized2">Staff: {this.state.useReportName}</p>
                            <p className="textSized2">Shift: {this.state.useReportShift}</p>
                            <p style={{fontSize:'13px', fontFamily: 'monospace', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted2">{this.state.printBTN}</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseModalreport()}}>
                                    <p className="texted2">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                <Modal open={this.state.credit} onClose={()=>this.onCloseModalCredit()} style={{color:"silver"}}>
                    <div className = "background591stockin">
                        <h6 style = {{color:'silver',marginLeft:'50px', marginBottom:'-70px'}}>Recover Credit</h6>
                        <div className="formdesign511">
                            <div className="container">
                                <div className="row">
                                    <h6>Summary</h6>
                                    <div className="col-3">
                                        <label>Total Credit</label>
                                        <p type="text" className="form-control mb-3 formsize51 ikem"><NumberFormat value={parseInt(this.state.TotalCredit)} thousandSeparator={true} displayType={"text"}/></p>
                                    </div>

                                    <div className="col-3">
                                        <label>Total Recovered</label>
                                        <p type="text" className="form-control mb-3 formsize51 ikem"><NumberFormat value={parseInt(this.state.TotalCreditPaid)} thousandSeparator={true} displayType={"text"}/></p>
                                    </div>
                                    
                                    <div className="col-3">
                                        <label>Credit Balance</label>
                                        <p type="text" className="form-control mb-3 formsize51 ikem"><NumberFormat value={parseInt(this.state.TotalCredit)-parseInt(this.state.TotalCreditPaid)} thousandSeparator={true} displayType={"text"}/></p>
                                    </div>
                                    
                                    
                                </div>
                                <div className='row'>
                                    <div className="col-4">
                                            <input type="number" className="form-control mb-3 formsize51 ikem" name="creditPaid" require placeholder="Enter Amount" value={this.state.creditPaid} onChange={this.handleChange}/>
                                    </div>

                                    <div className="col-4">
                                        <select className="form-select formsize51 ikem" name="paymentMethod" onChange={this.handleChange}>
                                            <option selected value=''>Payment Method</option>
                                            {this.renderPayMeth(this.state.payNwMeth)}
                                        </select>
                                    </div>
                                    
                                </div>

                            </div>

                            <div className="row">
                                
                                <br/><br/>
                                <center>
                                    <span>
                                        <button disabled ={this.state.creditPaid===''} className="btn btn-warning gap" onClick={()=>this.postCredit()}>Post</button>
                                        <button className="btn btn-danger gap" onClick={ () => this.onCloseModalCredit()}>Close</button>
                                                
                                    </span>
                                            
                                </center>
                                <br/>
                        
                            </div>
                            
                        </div> 
                        
                    </div>  

                </Modal>

            </div>


        )
    }
    async componentDidMount(){
        console.log (">>> Inside RESdidMount")
        fetch(`${restMenugrpUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                menu:data
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
       

        fetch(`${getPaymentMethods}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                payNwMeth:data
            })
        })

        fetch(`${getStoreData}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                DrinkstoreData:data
            })
        })

        fetch(`${getBarSalesQty}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                DrinkSalesQtyData:data
            })
        })

        fetch(`${getTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({tables:data})
        });
        this.myTimer = setTimeout(() => {

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            });

            localStorage.setItem('btnCntrl',true)


        },2000)

        
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

        if(localStorage.getItem('shift')==='Morning Shift'){
            this.setState({shiftcolor:"btn btn-primary cartBtn20"})
        }
        else if(localStorage.getItem('shift')==='Night Shift'){
            this.setState({shiftcolor:"btn btn-dark cartBtn20"})
        }
        else if(localStorage.getItem('shift')==='All Day'){
            this.setState({shiftcolor:"btn btn-warning cartBtn20"})
        }
        
    }
}
export default RestaurantApp;