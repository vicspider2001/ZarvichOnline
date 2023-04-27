import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import '../Reception.css';
import './OtherPosts.css';
import moment from 'moment';
// import {Modal} from 'react-responsive-modal';
import FLogin from '../../FLogin';
import 'bootstrap/dist/css/bootstrap.min.css';


const delFromCheckinDb = "http://10.1.0.99:3333/delBooking";
const delFromgrchargesDb = "http://10.1.0.99:3333/delBooking2";
const delFromroomratehargesDb = "http://10.1.0.99:3333/delBooking3";
const updateRoomStatus = "http://10.1.0.99:3333/rmstatus2";
const getBillrefIDsUrl = "http://10.1.0.99:3333/posting?GcheckinID=";
const getDepositsUrl = "http://10.1.0.99:3333/getRmDeposits?GstbillId=";
const getCheckinrefIDUrl = "http://10.1.0.99:3333/checkin?checkinID=";
const getRoomRateUrl = "http://10.1.0.99:3333/roomRates?gdetails=";
const postToCheckoutDb = "http://10.1.0.99:3333/goodbye";

const postGuestDeposit = "http://10.1.0.99:3333/rmDeposit";
const TempRoomDepositUrl = "http://10.1.0.99:3333/PostTmpRmDep";
const getPaymentMethods = "http://10.1.0.99:3333/paymentMethods";

const userName = "http://10.1.0.99:3333/fofUserInfo";



class Backup extends Component{
    constructor(props) {
        super(props);
        console.log(">>>Inside GstConstructor",props)

        this.state = {

            guestDetails:'',
            guestbilldetails:'',
            guestDeposits:'',
            roomCharging:'',
            arrivalDate:'',

            arrivalDateNow:'',
            departureDateNow:'',
            dailyRateNow:'',


            departureDate:'',
            stay:'',
            calcAccommodatn:0,
            calDockets:0,
            calDeposits:0,
            VAT:0,
            calcVAT:0,
            TourismLevyNow:0,
            calcTourismLev:0,
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
            

            edit: false,
            displayPaymentMethods:'',
            paymentMethod2:'',
            depositAmount:'',
            description2:'Bill Settlement'
            
        }
        
    }


    render(){
        console.log(">>> Inside Gstrender", this.state)
        return(
            <div>


            </div>
        )
    }

    componentDidMount(){
        console.log(">>> Inside GstDidMount", this.state)

        var guestID = sessionStorage.getItem('gstrefID');

        fetch(`${getRoomRateUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({roomCharging:data});
            this.myTimer = setTimeout(() => {
                var GD = this.state.roomCharging;
                GD.map((item)=>{
                    this.setState({
                        VAT:item.VAT,
                        TourismLevyNow:item.TourismLevy,
                        dailyRateNow:item.dailyRate

                    })
                    var depDate = new Date()
                    var fmtdepDate = moment(depDate).format('YYYY-DD-MMM');
                    this.setState({departureDate:fmtdepDate})

                    let arrDate = moment(sessionStorage.getItem('getarrvDt')).format('YYYY-DD-MMM');
                    this.setState({arrivalDate:arrDate});

                    var thisDate = new Date();
                    var endDate = moment(thisDate);
                    sessionStorage.setItem('endate',endDate)
                    var checkinDate = moment(sessionStorage.getItem('getarrvDt'));
                    sessionStorage.setItem('chkindate',checkinDate)
                    var diff = endDate.diff(checkinDate);
                    var comp = Math.ceil(diff/(1000*3600*24));
                    sessionStorage.setItem('difdate',comp);
                    this.setState({stay:parseInt(sessionStorage.getItem('difdate'))})


                    var TotalRmRate =0;
                    var TotVAT = 0;
                    var TotTourism = 0;
                    let dRate = parseInt(sessionStorage.getItem('getDailyRt'));
                    let numNights = parseInt(sessionStorage.getItem('difdate')-1);
                    let VATFig = parseFloat(sessionStorage.getItem('VATitem'));
                    let TourismLV = parseFloat(sessionStorage.getItem('TourismLevyItem'));
        
                    TotalRmRate = TotalRmRate+dRate*numNights;
                    TotVAT = TotVAT + VATFig*numNights;
                    TotTourism = TotTourism + TourismLV*numNights;
                    this.setState({
                        calcAccommodatn:TotalRmRate,
                        calcVAT:TotVAT,
                        calcTourismLev:TotTourism
                    })
                    
                    sessionStorage.setItem('TotRmRate',TotalRmRate)

                    return 'ok'
                })
            },1000)
            
        })

        fetch(`${getCheckinrefIDUrl}${guestID}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({guestDetails:data});
            this.setState({roomNum: data.map((item) => item.roomNumbers)});
            this.setState({roomType: data.map((item) => item.roomtypeName)})

        })

    }
}
export default Backup;