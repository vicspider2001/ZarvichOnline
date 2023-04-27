import React, { Component } from 'react';
import Billinglogin from '../../Billinglogin';
import '../Reception.css';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import 'bootstrap/dist/css/bootstrap.min.css';




const getAllbar = "http://10.1.0.99:3333/glenDSReport?InnerBar=Bar%20Sales";
const getAllRest = "http://10.1.0.99:3333/salesReport?restSales=Restaurant%20Sales";
const getAllOther = "http://10.1.0.99:3333/salesReport?otherSales=Other%20Sales";
const getAllPool = "http://10.1.0.99:3333/salesReport?dailypoolsales=PoolBar%20Sales";
const getAllClub = "http://10.1.0.99:3333/salesReport?clubSales=Club%20Sales";
const getAllLaundry = "http://10.1.0.99:3333/salesReport?LaundrySales=Laundry%20Sales";
const getAllGym = "http://10.1.0.99:3333/salesReport?gymnasiumSNow=Gymnasium%20Sales";
const getAllSmoothie = "http://10.1.0.99:3333/salesReport?smoothiSales=Smoothie%20Sales";
const getAllSwimming = "http://10.1.0.99:3333/salesReport?swimmingSales=Swimming%20Sales";
const getAllMinimart = "http://10.1.0.99:3333/salesReport?minimartSales=Mart%20Sales";
const getAllBbq = "http://10.1.0.99:3333/salesReport?BarbeQueSales=Barbeque%20Sales";
const getAllshisha = "http://10.1.0.99:3333/salesReport?shishaSales=Shisha%20Sales";
const getAllHHire = "http://10.1.0.99:3333/salesReport?HHSales=Hall%20Hire";
const getAllDeposits = "http://10.1.0.99:3333/salesReport?accDepositReceptn=Accommodation%20Deposits";

const userName = "http://10.1.0.99:3333/billingUserInfo";
const getHotelAddress = "http://10.1.0.99:3333/hoteladdress";



class CashCollection extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside CashConstructor",props)
        this.state = {
            RoomDeposits:'',
            RoomTotal:0,
            depPOS:0,
            depCash:0,
            depTransfer:0,
            depRoom:0,

            BarSales:0,
            BarTotal:0,
            barPOS:0,
            barCash:0,
            barTransfer:0,
            barRoom:0,

            RestSales:'',
            RestTotal:0,
            restPOS:0,
            restCash:0,
            restTransfer:0,
            restRoom:0,

            otherSales:0,
            othersTotal:0,
            otherPOS:0,
            otherCash:0,
            otherTransfer:0,
            otherRoom:0,

            POSCal:0,
            CashCal:0,
            TransferCal:0,
            RoomCal:0,

            poolPOS:0,
            poolCash:0,
            poolRoom:0,
            poolTransfer:0,
            poolSales:0,
            PoolTotal:0,

            clubPOS:0,
            clubCash:0,
            clubRoom:0,
            clubTransfer:0,
            clubSales:0,
            clubTotal:0,

            laundryPOS:0,
            laundryCash:0,
            laundryRoom:0,
            laundryTransfer:0,
            laundrySales:0,
            laundryTotal:0,

            gymPOS:0,
            gymCash:0,
            gymRoom:0,
            gymTransfer:0,
            gymSales:0,
            gymTotal:0,

            smoothiePOS:0,
            smoothieCash:0,
            smoothieRoom:0,
            smoothieTransfer:0,
            smoothieSales:0,
            smoothieTotal:0,

            swimmingPOS:0,
            swimmingCash:0,
            swimmingRoom:0,
            swimmingTransfer:0,
            swimmingSales:0,
            swimmingTotal:0,

            minimartPOS:0,
            minimartCash:0,
            minimartRoom:0,
            minimartTransfer:0,
            minimartSales:0,
            minimartTotal:0,

            BarbequePOS:0,
            BarbequeCash:0,
            BarbequeRoom:0,
            BarbequeTransfer:0,
            BarbequeSales:0,
            BarbequeTotal:0,

            shishaPOS:0,
            shishaCash:0,
            shishaRoom:0,
            shishaTransfer:0,
            shishaSales:0,
            shishaTotal:0,

            HallHirePOS:0,
            HallHireCash:0,
            HallHireRoom:0,
            HallHireTransfer:0,
            HallHireSales:0,
            HallHireTotal:0,

            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',

            levyData:'',
            ServiceChrg:'',
            TourismLevy:'',
            VAT:'',

            shift:'',
            date:'',
            startdate:'',
            endDate:'',

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:''

            
            
        };
        this.checkinhandleChange = this.checkinhandleChange.bind(this);
        this.endhandleChange = this.endhandleChange.bind(this);

    }
    checkinhandleChange(date) {
        this.setState({
            date: date,
           

        });
    }

    endhandleChange(date) {
        this.setState({
            endDate: date
        });
    }

    
    renderDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.checkinhandleChange}
                    maxDate={addDays(new Date(),0)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize printing alignText112"
                    placeholderText='Select Start Date'
                />
            </div>
        )
    }

    renderendDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.endDate}
                    onChange={this.endhandleChange}
                    maxDate={(new Date())}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize printing alignText112 mvrght"
                    placeholderText="Search End Date"
                />
            </div>
        )
    }

    handleChange=(event)=>{
        
        this.setState({
            [event.target.name]:event.target.value
        })

    }

    findSalesReport(){
        var thisDate = moment(this.state.date).format('MMM DD YYYY')
        
        this.setState({
            depRoom:0,
            depTransfer:0,
            depCash:0,
            depPOS:0,
            RoomTotal:0,
            RoomDeposits:'',
            // RestSales:'',
            // BarSales:'',
            // otherSales:'',
            // poolSales:'',
            // clubSales:'',
            // laundrySales:'',
            // gymSales:'',
            // smoothieSales:'',
            // minimartSales:'',
            // BarbequeSales:'',
            // shishaSales:'',
            // HallHireSales:''



        })
        fetch(`${getAllDeposits}&&today=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({RoomDeposits:data});
            
                data.map((item) => {

                    
                    var allPOS = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.POS)
                    }, 0);
                    this.setState({depPOS:allPOS});
    
                    var allCash = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Cash)
                    }, 0);
                    this.setState({depCash:allCash});
    
                    var allTransfer = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Transfer)
                    }, 0);
                    this.setState({depTransfer:allTransfer});
    
                    var allRoom = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Room)
                    }, 0);
                    this.setState({depRoom:allRoom});
                    
                    this.myTimer = setTimeout(() =>{
                        var RmSales = 0;
                        var roomSales = RmSales + parseInt(this.state.depCash) + parseInt(this.state.depPOS) + parseInt(this.state.depTransfer) + parseInt(this.state.depRoom)
                        this.setState({RoomTotal:roomSales});
                    
                    },2000)
                    
                    return 'ok'
                })
            
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    depRoom:0,
                    depTransfer:0,
                    depCash:0,
                    depPOS:0,
                    RoomTotal:0

                })
            }
            
            
            
        });
                
       
        fetch(`${getAllRest}&&resttoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({RestSales:data});
        
            data.map((item) => {
              
                var restallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({restPOS:restallPOS});

                var restallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({restCash:restallCash});

                var restallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({restTransfer:restallTransfer});

                var restallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({restRoom:restallRoom});

                this.myTimer = setTimeout(() => {
                    var AllRest = 0;
                    var restSales = AllRest + parseInt(this.state.restCash) + parseInt(this.state.restPOS) + parseInt(this.state.restTransfer) + parseInt(this.state.restRoom)
                    this.setState({RestTotal:restSales})
                },2000)
                
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    restRoom:0,
                    restTransfer:0,
                    restCash:0,
                    restPOS:0,
                    RestTotal:0

                })
            }
        
        });

        fetch(`${getAllbar}&&bartoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({BarSales:data});
        
            data.map((item) => {

                var barallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({barPOS:barallPOS});

                var barallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({barCash:barallCash});

                var barallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({barTransfer:barallTransfer});

                var barallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({barRoom:barallRoom});

                this.myTimer = setTimeout(() => {
                    var BarTotal = 0;
                    var barSales = BarTotal + parseInt(this.state.barCash) + parseInt(this.state.barPOS) + parseInt(this.state.barTransfer) + parseInt(this.state.barRoom)
                    this.setState({BarTotal:barSales})

                },2000)
                                    
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    barRoom:0,
                    barTransfer:0,
                    barCash:0,
                    barPOS:0,
                    BarTotal:0

                })
            }
        
        });
        

        fetch(`${getAllOther}&&othertoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({otherSales:data});
        
            data.map((item) => {

                var othersallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({otherPOS:othersallPOS});

                var othersallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({otherCash:othersallCash});

                var othersallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({otherTransfer:othersallTransfer});

                var othersallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({otherRoom:othersallRoom});

                this.myTimer = setTimeout(() => {
                    var AllOthers = 0;
                    var OtherSales = AllOthers + parseInt(this.state.otherCash) + parseInt(this.state.otherPOS) + parseInt(this.state.otherTransfer) + parseInt(this.state.otherRoom)
                    this.setState({othersTotal:OtherSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    otherRoom:0,
                    otherTransfer:0,
                    otherCash:0,
                    otherPOS:0,
                    othersTotal:0

                })
            }
            
        });

        fetch(`${getAllPool}&&dailypooltoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({poolSales:data});
        
            data.map((item) => {

                var poolallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({poolPOS:poolallPOS});

                var poolallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({poolCash:poolallCash});

                var poolallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({poolTransfer:poolallTransfer});

                var poolallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({poolRoom:poolallRoom});

                this.myTimer = setTimeout(() => {
                    var AllPool = 0;
                    var AlPoolSales = AllPool + parseInt(this.state.poolCash) + parseInt(this.state.poolPOS) + parseInt(this.state.poolTransfer) + parseInt(this.state.poolRoom)
                    this.setState({PoolTotal:AlPoolSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    poolRoom:0,
                    poolTransfer:0,
                    poolCash:0,
                    poolPOS:0,
                    PoolTotal:0

                })
            }
            
        });

        fetch(`${getAllClub}&&clubtoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({clubSales:data});
        
            data.map((item) => {

                var cluballPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({clubPOS:cluballPOS});

                var cluballCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({clubCash:cluballCash});

                var cluballTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({clubTransfer:cluballTransfer});

                var cluballRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({clubRoom:cluballRoom});

                this.myTimer = setTimeout(() => {
                    var AllClub = 0;
                    var AlClubSales = AllClub + parseInt(this.state.clubCash) + parseInt(this.state.clubPOS) + parseInt(this.state.clubTransfer) + parseInt(this.state.clubRoom)
                    this.setState({clubTotal:AlClubSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    clubRoom:0,
                    clubTransfer:0,
                    clubCash:0,
                    clubPOS:0,
                    clubTotal:0

                })
            }
            
        });

        fetch(`${getAllLaundry}&&laundrytoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({laundrySales:data});
        
            data.map((item) => {

                var laundryllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({laundryPOS:laundryllPOS});

                var laundryallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({laundryCash:laundryallCash});

                var laundryallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({laundryTransfer:laundryallTransfer});

                var laundryallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({laundryRoom:laundryallRoom});

                this.myTimer = setTimeout(() => {
                    var AllLaundry = 0;
                    var AlLaundrySales = AllLaundry + parseInt(this.state.laundryCash) + parseInt(this.state.laundryPOS) + parseInt(this.state.laundryTransfer) + parseInt(this.state.laundryRoom)
                    this.setState({laundryTotal:AlLaundrySales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    laundryRoom:0,
                    laundryTransfer:0,
                    laundryCash:0,
                    laundryPOS:0,
                    laundryTotal:0

                })
            }
            
        });

        fetch(`${getAllGym}&&gymnasiumtoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({gymSales:data});
        
            data.map((item) => {

                var gymllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({gymPOS:gymllPOS});

                var gymallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({gymCash:gymallCash});

                var gymallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({gymTransfer:gymallTransfer});

                var gymallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({gymRoom:gymallRoom});

                this.myTimer = setTimeout(() => {
                    var AllGym = 0;
                    var AlGymSales = AllGym + parseInt(this.state.gymCash) + parseInt(this.state.gymPOS) + parseInt(this.state.gymTransfer) + parseInt(this.state.gymRoom)
                    this.setState({gymTotal:AlGymSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    gymRoom:0,
                    gymTransfer:0,
                    gymCash:0,
                    gymPOS:0,
                    gymTotal:0

                })
            }
            
        });

        fetch(`${getAllSmoothie}&&smoothietoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({smoothieSales:data});
        
            data.map((item) => {

                var smoothiellPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({smoothiePOS:smoothiellPOS});

                var smoothieallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({smoothieCash:smoothieallCash});

                var smoothieallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({smoothieTransfer:smoothieallTransfer});

                var smoothieallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({smoothieRoom:smoothieallRoom});

                this.myTimer = setTimeout(() => {
                    var AllSmoothie = 0;
                    var AlSmoothieSales = AllSmoothie + parseInt(this.state.smoothieCash) + parseInt(this.state.smoothiePOS) + parseInt(this.state.smoothieTransfer) + parseInt(this.state.smoothieRoom)
                    this.setState({smoothieTotal:AlSmoothieSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    smoothieRoom:0,
                    smoothieTransfer:0,
                    smoothieCash:0,
                    smoothiePOS:0,
                    smoothieTotal:0

                })
            }
            
        });

        fetch(`${getAllSwimming}&&swimmingtoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({smoothieSales:data});
        
            data.map((item) => {

                var swimmingllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({swimmingPOS:swimmingllPOS});

                var swimmingallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({swimmingCash:swimmingallCash});

                var swimmingallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({swimmingTransfer:swimmingallTransfer});

                var swimmingallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({swimmingRoom:swimmingallRoom});

                this.myTimer = setTimeout(() => {
                    var AllSwimming = 0;
                    var AlSwimmingSales = AllSwimming + parseInt(this.state.swimmingCash) + parseInt(this.state.swimmingPOS) + parseInt(this.state.swimmingTransfer) + parseInt(this.state.swimmingRoom)
                    this.setState({swimmingTotal:AlSwimmingSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    swimmingRoom:0,
                    swimmingTransfer:0,
                    swimmingCash:0,
                    swimmingPOS:0,
                    swimmingTotal:0

                })
            }
            
        });

        fetch(`${getAllMinimart}&&marttoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({minimartSales:data});
        
            data.map((item) => {

                var martllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({minimartPOS:martllPOS});

                var martallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({minimartPOS:martallCash});

                var martallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({minimartTransfer:martallTransfer});

                var martallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({minimartRoom:martallRoom});

                this.myTimer = setTimeout(() => {
                    var AllMart = 0;
                    var AlMartSales = AllMart + parseInt(this.state.minimartCash) + parseInt(this.state.minimartPOS) + parseInt(this.state.minimartTransfer) + parseInt(this.state.minimartRoom)
                    this.setState({minimartTotal:AlMartSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    minimartRoom:0,
                    minimartTransfer:0,
                    minimartCash:0,
                    minimartPOS:0,
                    minimartTotal:0

                })
            }
            
        });

        fetch(`${getAllBbq}&&bbqtoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({BarbequeSales:data});
        
            data.map((item) => {

                var bbqllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({BarbequePOS:bbqllPOS});

                var bbqallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({BarbequePOS:bbqallCash});

                var bbqallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({BarbequeTransfer:bbqallTransfer});

                var bbqallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({BarbequeRoom:bbqallRoom});

                this.myTimer = setTimeout(() => {
                    var AllBbq = 0;
                    var AlBbqSales = AllBbq + parseInt(this.state.BarbequeCash) + parseInt(this.state.BarbequePOS) + parseInt(this.state.BarbequeTransfer) + parseInt(this.state.BarbequeRoom)
                    this.setState({BarbequeTotal:AlBbqSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    BarbequeRoom:0,
                    BarbequeTransfer:0,
                    BarbequeCash:0,
                    BarbequePOS:0,
                    BarbequeTotal:0

                })
            }
            
        });

        fetch(`${getAllshisha}&&shishatoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({shishaSales:data});
        
            data.map((item) => {

                var shillPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({shishaPOS:shillPOS});

                var shiallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({shishaPOS:shiallCash});

                var shiallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({shishaTransfer:shiallTransfer});

                var shiallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({shishaRoom:shiallRoom});

                this.myTimer = setTimeout(() => {
                    var AllShi = 0;
                    var AlshiSales = AllShi + parseInt(this.state.shishaCash) + parseInt(this.state.shishaPOS) + parseInt(this.state.shishaTransfer) + parseInt(this.state.shishaRoom)
                    this.setState({shishaTotal:AlshiSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    shishaRoom:0,
                    shishaTransfer:0,
                    shishaCash:0,
                    shishaPOS:0,
                    shishaTotal:0

                })
            }
            
        });

        fetch(`${getAllHHire}&&hhiretoday=${thisDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({HallHireSales:data});
        
            data.map((item) => {

                var hhllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({HallHirePOS:hhllPOS});

                var hhallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({HallHirePOS:hhallCash});

                var hhallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({HallHireTransfer:hhallTransfer});

                var hhallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({hhallRoom:hhallRoom});

                this.myTimer = setTimeout(() => {
                    var Allhh = 0;
                    var AlhhSales = Allhh + parseInt(this.state.HallHireCash) + parseInt(this.state.HallHirePOS) + parseInt(this.state.HallHireTransfer) + parseInt(this.state.HallHireRoom)
                    this.setState({HallHireTotal:AlhhSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    HallHireRoom:0,
                    HallHireTransfer:0,
                    HallHireCash:0,
                    HallHirePOS:0,
                    HallHireTotal:0
                    
                })
            }
            
        });
    }
    

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        localStorage.removeItem('shift')
        
    }
    cleanupfirst(){
        this.setState({ RoomDeposits:'',
                        RoomTotal:0,
                        depPOS:0,
                        depCash:0,
                        depTransfer:0,
                        depRoom:0,

                        BarSales:0,
                        BarTotal:0,
                        barPOS:0,
                        barCash:0,
                        barTransfer:0,
                        barRoom:0,

                        RestSales:'',
                        RestTotal:0,
                        restPOS:0,
                        restCash:0,
                        restTransfer:0,
                        restRoom:0,

                        functionSales:0,
                        functionTotal:0,
                        functionRoom:0,
                        functionTransfer:0,
                        functionCash:0,
                        functionPOS:0,

                        otherSales:0,
                        othersTotal:0,
                        otherPOS:0,
                        otherCash:0,
                        otherTransfer:0,
                        otherRoom:0,

                        poolSales:0,
                        PoolTotal:0,
                        poolPOS:0,
                        poolCash:0,
                        poolTransfer:0,
                        poolRoom:0,

                        clubSales:0,
                        clubTotal:0,
                        clubPOS:0,
                        clubCash:0,
                        clubTransfer:0,
                        clubRoom:0,

                        laundrySales:0,
                        laundryTotal:0,
                        laundryPOS:0,
                        laundryCash:0,
                        laundryTransfer:0,
                        laundryRoom:0,

                        gymSales:0,
                        gymTotal:0,
                        gymPOS:0,
                        gymCash:0,
                        gymTransfer:0,
                        gymRoom:0,

                        smoothieSales:0,
                        smoothieTotal:0,
                        smoothiePOS:0,
                        smoothieCash:0,
                        smoothieTransfer:0,
                        smoothieRoom:0,

                        swimmingSales:0,
                        swimmingTotal:0,
                        swimmingPOS:0,
                        swimmingCash:0,
                        swimmingTransfer:0,
                        swimmingRoom:0,

                        minimartSales:0,
                        minimartTotal:0,
                        minimartPOS:0,
                        minimartCash:0,
                        minimartTransfer:0,
                        minimartRoom:0,

                        BarbequeSales:0,
                        BarbequeTotal:0,
                        BarbequePOS:0,
                        BarbequeCash:0,
                        BarbequeTransfer:0,
                        BarbequeRoom:0,

                        shishaSales:0,
                        shishaTotal:0,
                        shishaPOS:0,
                        shishaCash:0,
                        shishaTransfer:0,
                        shishaRoom:0,

                        HallHireSales:0,
                        HallHireTotal:0,
                        HallHirePOS:0,
                        HallHireCash:0,
                        HallHireTransfer:0,
                        HallHireRoom:0,

                        POSCal:0,
                        CashCal:0,
                        TransferCal:0,
                        RoomCal:0
                        
                    })
    }

    
    renderRoomSales=(data)=>{
        if(data){
            
            return data.map((item)=>{
                
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td> 
                            
                        </tr>
                        
                    </>
                )
               
            })
            
        }
        
    }

    renderRestSales=(data)=>{
        if(data){
           
            return data.map((item)=>{
                
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr>
                        
                    </>
                )
               
            })
            
        }
        
           
    }

    renderBarSales=(data)=>{
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
          
    }

   
    renderOtherSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderPoolSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderClubSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderLaundrySales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderGymSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderSmoothieSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderSwimmingSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderMartSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderBbqSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    rendershiSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderhhSales=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
               
                var defaultdate = moment(item.date).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{defaultdate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.description}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.POS}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Cash}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Room}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.Transfer}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(item.POS) + parseInt(item.Cash) + parseInt(item.Room) + parseInt(item.Transfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            
                        </tr> 
                    </>
                )
               
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
                    <h5>Daily Sales Report</h5><br/>
                    <div>
                        <span>
                            <label>
                                {this.renderDate(this.state.startdate)}
                            </label>
                        </span>
                       
                        <span>
                            
                            <button className="btn btn-primary space btnadjuster printing" onClick={ () => {this.cleanupfirst();this.findSalesReport()}}>Find</button>
                            
                        </span>
                    </div>
                                   
                </center>
                
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust50">Date</th>
                            <th className="adjust50">Description</th>
                            <th className="adjust50">POS (NGN)</th>
                            <th className="adjust50">Cash(NGN)</th>
                            <th className="adjust50">Room(NGN)</th>
                            <th className="adjust50">Transfer(NGN)</th>
                            <th className="adjust50">Total(NGN)</th>
                            
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderRoomSales(this.state.RoomDeposits)}
                        {this.renderRestSales(this.state.RestSales)}
                        {this.renderBarSales(this.state.BarSales)}
                        {this.renderOtherSales(this.state.otherSales)}
                        {this.renderPoolSales(this.state.poolSales)}
                        {this.renderClubSales(this.state.clubSales)}
                        {this.renderLaundrySales(this.state.laundrySales)}
                        {this.renderGymSales(this.state.gymSales)}
                        {this.renderSmoothieSales(this.state.smoothieSales)}
                        {this.renderSwimmingSales(this.state.swimmingSales)}
                        {this.renderMartSales(this.state.minimartSales)}
                        {this.renderBarSales(this.state.BarbequeSales)}
                        {this.rendershiSales(this.state.shishaSales)}
                        {this.renderhhSales(this.state.HallHireSales)}
                        <tr>
                            <td className="table-light table-striped adjust2"> </td>
                            <td className="table-light table-striped adjust2"><b>Total</b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depPOS) + parseInt(this.state.restPOS) + parseInt(this.state.barPOS) + parseInt(this.state.otherPOS) + parseInt(this.state.poolPOS) + parseInt(this.state.clubPOS) + parseInt(this.state.laundryPOS) + parseInt(this.state.gymPOS) + parseInt(this.state.smoothiePOS) + parseInt(this.state.minimartPOS) + parseInt(this.state.BarbequePOS) + parseInt(this.state.shishaPOS) + parseInt(this.state.HallHirePOS) + parseInt(this.state.swimmingPOS)}thousandSeparator={true}displayType={"text"}/></b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depCash) + parseInt(this.state.restCash) + parseInt(this.state.barCash) + parseInt(this.state.otherCash) + parseInt(this.state.poolCash) + parseInt(this.state.clubCash) + parseInt(this.state.laundryCash) + parseInt(this.state.gymCash) + parseInt(this.state.smoothieCash) + parseInt(this.state.minimartCash) + parseInt(this.state.BarbequeCash) + parseInt(this.state.shishaCash) + parseInt(this.state.HallHireCash) + parseInt(this.state.swimmingCash)}thousandSeparator={true}displayType={"text"}/></b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depRoom) + parseInt(this.state.restRoom) + parseInt(this.state.barRoom) + parseInt(this.state.otherRoom) + parseInt(this.state.poolRoom) + parseInt(this.state.clubRoom) + parseInt(this.state.laundryRoom) + parseInt(this.state.gymRoom) + parseInt(this.state.smoothieRoom) + parseInt(this.state.minimartRoom) + parseInt(this.state.BarbequeRoom) + parseInt(this.state.shishaRoom) + parseInt(this.state.HallHireRoom) + parseInt(this.state.swimmingRoom)}thousandSeparator={true}displayType={"text"}/></b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.depTransfer) + parseInt(this.state.restTransfer) + parseInt(this.state.barTransfer) + parseInt(this.state.otherTransfer) + parseInt(this.state.poolTransfer) + parseInt(this.state.clubTransfer) + parseInt(this.state.laundryTransfer) + parseInt(this.state.gymTransfer) + parseInt(this.state.smoothieTransfer) + parseInt(this.state.minimartTransfer) + parseInt(this.state.BarbequeTransfer) + parseInt(this.state.shishaTransfer) + parseInt(this.state.HallHireTransfer) + parseInt(this.state.swimmingTransfer)}thousandSeparator={true}displayType={"text"}/></b></td>
                            <td className="table-light table-striped adjust2 alignTet2"><b><NumberFormat value={parseInt(this.state.RoomTotal) + parseInt(this.state.BarTotal) + parseInt(this.state.RestTotal) + parseInt(this.state.othersTotal) + parseInt(this.state.PoolTotal) + parseInt(this.state.clubTotal) + parseInt(this.state.laundryTotal) + parseInt(this.state.gymTotal) + parseInt(this.state.smoothieTotal) + parseInt(this.state.minimartTotal) + parseInt(this.state.BarbequeTotal) + parseInt(this.state.shishaTotal) + parseInt(this.state.HallHireTotal)+ parseInt(this.state.swimmingTotal)}thousandSeparator={true}displayType={"text"}/></b></td>
                        </tr>
                        
                    </tbody>
                </table>
                
                
                <h6>Total Collection:         <NumberFormat value={parseInt(this.state.RoomTotal) + parseInt(this.state.BarTotal) + parseInt(this.state.RestTotal) + parseInt(this.state.othersTotal) + parseInt(this.state.PoolTotal) + parseInt(this.state.clubTotal) + parseInt(this.state.laundryTotal) + parseInt(this.state.gymTotal) + parseInt(this.state.smoothieTotal) + parseInt(this.state.minimartTotal) + parseInt(this.state.BarbequeTotal) + parseInt(this.state.shishaTotal) + parseInt(this.state.HallHireTotal) + parseInt(this.state.swimmingTotal)}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                <hr/>
                <center>
                
                    <button className="btn btn-danger movebtn printing" onClick={ () => this.props.history.push('/EndOfDay') }>Close</button>
                    <button className="btn btn-primary movebtn printing" onClick={ () => window.print() }>Print</button>
                    <button className="btn btn-warning movebtn printing" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>    
                        
                </center>       
            </div>
            
        );
    }
  
    componentDidMount() {
        console.log(">>> Inside CashDidMount", this.state)
        var defaultDate = moment(new Date()).format('MMM DD YYYY')
        
        this.setState({
            depRoom:'',
            depTransfer:'',
            depCash:'',
            depPOS:'',
            RoomTotal:''

        })
        fetch(`${getAllDeposits}&&today=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({RoomDeposits:data});
            
                data.map((item) => {

                    
                    var allPOS = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.POS)
                    }, 0);
                    this.setState({depPOS:allPOS});
    
                    var allCash = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Cash)
                    }, 0);
                    this.setState({depCash:allCash});
    
                    var allTransfer = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Transfer)
                    }, 0);
                    this.setState({depTransfer:allTransfer});
    
                    var allRoom = data.map(item => item).reduce((totals, item) =>{
                        return totals + parseInt(item.Room)
                    }, 0);
                    this.setState({depRoom:allRoom});
                    
                    this.myTimer = setTimeout(() =>{
                        var RmSales = 0;
                        var roomSales = RmSales + parseInt(this.state.depCash) + parseInt(this.state.depPOS) + parseInt(this.state.depTransfer) + parseInt(this.state.depRoom)
                        this.setState({RoomTotal:roomSales});
                    
                    },2000)
                    
                    return 'ok'
                })
            
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    depRoom:'',
                    depTransfer:'',
                    depCash:'',
                    depPOS:'',
                    RoomTotal:''

                })
            }
            
            
            
        });
                
       
        fetch(`${getAllRest}&&resttoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({RestSales:data});
        
            data.map((item) => {
              
                var restallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({restPOS:restallPOS});

                var restallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({restCash:restallCash});

                var restallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({restTransfer:restallTransfer});

                var restallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({restRoom:restallRoom});

                this.myTimer = setTimeout(() => {
                    var AllRest = 0;
                    var restSales = AllRest + parseInt(this.state.restCash) + parseInt(this.state.restPOS) + parseInt(this.state.restTransfer) + parseInt(this.state.restRoom)
                    this.setState({RestTotal:restSales})
                },2000)
                
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    restRoom:'',
                    restTransfer:'',
                    restCash:'',
                    restPOS:'',
                    RestTotal:''

                })
            }
        
        });

        fetch(`${getAllbar}&&bartoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({BarSales:data});
        
            data.map((item) => {

                var barallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({barPOS:barallPOS});

                var barallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({barCash:barallCash});

                var barallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({barTransfer:barallTransfer});

                var barallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({barRoom:barallRoom});

                this.myTimer = setTimeout(() => {
                    var BarTotal = 0;
                    var barSales = BarTotal + parseInt(this.state.barCash) + parseInt(this.state.barPOS) + parseInt(this.state.barTransfer) + parseInt(this.state.barRoom)
                    this.setState({BarTotal:barSales})

                },2000)
                                    
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    barRoom:'',
                    barTransfer:'',
                    barCash:'',
                    barPOS:'',
                    BarTotal:''

                })
            }
        
        });
        

        fetch(`${getAllOther}&&othertoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({otherSales:data});
        
            data.map((item) => {

                var othersallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({otherPOS:othersallPOS});

                var othersallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({otherCash:othersallCash});

                var othersallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({otherTransfer:othersallTransfer});

                var othersallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({otherRoom:othersallRoom});

                this.myTimer = setTimeout(() => {
                    var AllOthers = 0;
                    var OtherSales = AllOthers + parseInt(this.state.otherCash) + parseInt(this.state.otherPOS) + parseInt(this.state.otherTransfer) + parseInt(this.state.otherRoom)
                    this.setState({othersTotal:OtherSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    otherRoom:'',
                    otherTransfer:'',
                    otherCash:'',
                    otherPOS:'',
                    othersTotal:''

                })
            }
            
        });

        fetch(`${getAllPool}&&dailypooltoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({poolSales:data});
        
            data.map((item) => {

                var poolallPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({poolPOS:poolallPOS});

                var poolallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({poolCash:poolallCash});

                var poolallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({poolTransfer:poolallTransfer});

                var poolallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({poolRoom:poolallRoom});

                this.myTimer = setTimeout(() => {
                    var AllPool = 0;
                    var AlPoolSales = AllPool + parseInt(this.state.poolCash) + parseInt(this.state.poolPOS) + parseInt(this.state.poolTransfer) + parseInt(this.state.poolRoom)
                    this.setState({PoolTotal:AlPoolSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    poolRoom:'',
                    poolTransfer:'',
                    poolCash:'',
                    poolPOS:'',
                    PoolTotal:''

                })
            }
            
        });

        fetch(`${getAllClub}&&clubtoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({clubSales:data});
        
            data.map((item) => {

                var cluballPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({clubPOS:cluballPOS});

                var cluballCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({clubCash:cluballCash});

                var cluballTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({clubTransfer:cluballTransfer});

                var cluballRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({clubRoom:cluballRoom});

                this.myTimer = setTimeout(() => {
                    var AllClub = 0;
                    var AlClubSales = AllClub + parseInt(this.state.clubCash) + parseInt(this.state.clubPOS) + parseInt(this.state.clubTransfer) + parseInt(this.state.clubRoom)
                    this.setState({clubTotal:AlClubSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    clubRoom:'',
                    clubTransfer:'',
                    clubCash:'',
                    clubPOS:'',
                    clubTotal:''

                })
            }
            
        });

        fetch(`${getAllLaundry}&&laundrytoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({laundrySales:data});
        
            data.map((item) => {

                var laundryllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({laundryPOS:laundryllPOS});

                var laundryallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({laundryCash:laundryallCash});

                var laundryallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({laundryTransfer:laundryallTransfer});

                var laundryallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({laundryRoom:laundryallRoom});

                this.myTimer = setTimeout(() => {
                    var AllLaundry = 0;
                    var AlLaundrySales = AllLaundry + parseInt(this.state.laundryCash) + parseInt(this.state.laundryPOS) + parseInt(this.state.laundryTransfer) + parseInt(this.state.laundryRoom)
                    this.setState({laundryTotal:AlLaundrySales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    laundryRoom:'',
                    laundryTransfer:'',
                    laundryCash:'',
                    laundryPOS:'',
                    laundryTotal:''

                })
            }
            
        });

        fetch(`${getAllGym}&&gymnasiumtoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({gymSales:data});
        
            data.map((item) => {

                var gymllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({gymPOS:gymllPOS});

                var gymallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({gymCash:gymallCash});

                var gymallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({gymTransfer:gymallTransfer});

                var gymallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({gymRoom:gymallRoom});

                this.myTimer = setTimeout(() => {
                    var AllGym = 0;
                    var AlGymSales = AllGym + parseInt(this.state.gymCash) + parseInt(this.state.gymPOS) + parseInt(this.state.gymTransfer) + parseInt(this.state.gymRoom)
                    this.setState({gymTotal:AlGymSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    gymRoom:'',
                    gymTransfer:'',
                    gymCash:'',
                    gymPOS:'',
                    gymTotal:''

                })
            }
            
        });

        fetch(`${getAllSmoothie}&&smoothietoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({smoothieSales:data});
        
            data.map((item) => {

                var smoothiellPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({smoothiePOS:smoothiellPOS});

                var smoothieallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({smoothieCash:smoothieallCash});

                var smoothieallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({smoothieTransfer:smoothieallTransfer});

                var smoothieallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({smoothieRoom:smoothieallRoom});

                this.myTimer = setTimeout(() => {
                    var AllSmoothie = 0;
                    var AlSmoothieSales = AllSmoothie + parseInt(this.state.smoothieCash) + parseInt(this.state.smoothiePOS) + parseInt(this.state.smoothieTransfer) + parseInt(this.state.smoothieRoom)
                    this.setState({smoothieTotal:AlSmoothieSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    smoothieRoom:'',
                    smoothieTransfer:'',
                    smoothieCash:'',
                    smoothiePOS:'',
                    smoothieTotal:''

                })
            }
            
        });

        fetch(`${getAllMinimart}&&marttoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({minimartSales:data});
        
            data.map((item) => {

                var martllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({minimartPOS:martllPOS});

                var martallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({minimartPOS:martallCash});

                var martallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({minimartTransfer:martallTransfer});

                var martallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({minimartRoom:martallRoom});

                this.myTimer = setTimeout(() => {
                    var AllMart = 0;
                    var AlMartSales = AllMart + parseInt(this.state.minimartCash) + parseInt(this.state.minimartPOS) + parseInt(this.state.minimartTransfer) + parseInt(this.state.minimartRoom)
                    this.setState({minimartTotal:AlMartSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    minimartRoom:'',
                    minimartTransfer:'',
                    minimartCash:'',
                    minimartPOS:'',
                    minimartTotal:''

                })
            }
            
        });

        fetch(`${getAllBbq}&&bbqtoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({BarbequeSales:data});
        
            data.map((item) => {

                var bbqllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({BarbequePOS:bbqllPOS});

                var bbqallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({BarbequePOS:bbqallCash});

                var bbqallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({BarbequeTransfer:bbqallTransfer});

                var bbqallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({BarbequeRoom:bbqallRoom});

                this.myTimer = setTimeout(() => {
                    var AllBbq = 0;
                    var AlBbqSales = AllBbq + parseInt(this.state.BarbequeCash) + parseInt(this.state.BarbequePOS) + parseInt(this.state.BarbequeTransfer) + parseInt(this.state.BarbequeRoom)
                    this.setState({BarbequeTotal:AlBbqSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    BarbequeRoom:'',
                    BarbequeTransfer:'',
                    BarbequeCash:'',
                    BarbequePOS:'',
                    BarbequeTotal:''

                })
            }
            
        });

        fetch(`${getAllshisha}&&shishatoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({shishaSales:data});
        
            data.map((item) => {

                var shillPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({shishaPOS:shillPOS});

                var shiallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({shishaPOS:shiallCash});

                var shiallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({shishaTransfer:shiallTransfer});

                var shiallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({shishaRoom:shiallRoom});

                this.myTimer = setTimeout(() => {
                    var AllShi = 0;
                    var AlshiSales = AllShi + parseInt(this.state.shishaCash) + parseInt(this.state.shishaPOS) + parseInt(this.state.shishaTransfer) + parseInt(this.state.shishaRoom)
                    this.setState({shishaTotal:AlshiSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    shishaRoom:'',
                    shishaTransfer:'',
                    shishaCash:'',
                    shishaPOS:'',
                    shishaTotal:''

                })
            }
            
        });

        fetch(`${getAllHHire}&&hhiretoday=${defaultDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
        this.setState({HallHireSales:data});
        
            data.map((item) => {

                var hhllPOS = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.POS)
                }, 0);
                this.setState({HallHirePOS:hhllPOS});

                var hhallCash = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Cash)
                }, 0);
                this.setState({HallHirePOS:hhallCash});

                var hhallTransfer = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Transfer)
                }, 0);
                this.setState({HallHireTransfer:hhallTransfer});

                var hhallRoom = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.Room)
                }, 0);
                this.setState({hhallRoom:hhallRoom});

                this.myTimer = setTimeout(() => {
                    var Allhh = 0;
                    var AlhhSales = Allhh + parseInt(this.state.HallHireCash) + parseInt(this.state.HallHirePOS) + parseInt(this.state.HallHireTransfer) + parseInt(this.state.HallHireRoom)
                    this.setState({HallHireTotal:AlhhSales})
                
                },2000)
                
                return 'ok'
            })
        
            if((data).lenght===0){
                alert('No Data Found')
                this.setState({
                    HallHireRoom:'',
                    HallHireTransfer:'',
                    HallHireCash:'',
                    HallHirePOS:'',
                    HallHireTotal:''
                    
                })
            }
            
        });


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
            if(loginInfo.some(item => item.name===nameDetails)){
                this.setState({Blogin:true})
            }
            else{
                this.setState({Blogin:false})
            }
        },1000);

       
    }


}


export default CashCollection;