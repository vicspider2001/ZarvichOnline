import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import '../Reception.css';
import moment from 'moment';
import Billinglogin from '../../Billinglogin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import picture from '../../Reception/deglenLogo.png';


const getOrgUrl = "http://10.1.0.99:3333/org?grpName=";
const getGroupDataUrl = "http://10.1.0.99:3333/guestbillingSummary?orgName=";
// const getgroupDocketsUrl = "http://10.1.0.99:3333/posting";
const getfunctionfoodanddrinkUrl = "http://10.1.0.99:3333/getfoodanddrinks?orgName=";
const getgroupDepositUrl = "http://10.1.0.99:3333/MainfunctionDep?orgName=";
const userName = "http://10.1.0.99:3333/billingUserInfo";
// const getGlobalChrgesUrl = "http://10.1.0.99:3333/getFirstNite?orgName=";
// const getBillgroupIDsUrl = "http://10.1.0.99:3333/InhouseBill?orgNamex=";


class GroupBill extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside GstConstructor",props)

        this.state = {
            groupData:'',
            groupBillData:'',
            functionFandB:'',
            totalfuncttionFandB:0,
            groupPayments:'',
            org:'',
            orgName:'',
            startDate:'',
            endDate:'',
            departureDate:'',
            totalDockets:0,
            POSDeposit:0,
            CashDeposit:0,
            TransferDeposit:0,
            CompDebit:0,
            roomDebit:0,
            TotalDeposits:0,
            totalAcc:0,
            calcVAT:0,
            calcTourismLev:0,
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            TotalStay:[],
            guestInHouse:'',
            TotalBillsInHouse:0,
            Inhousebilldetails:'',
            calDockets:0

            
        };
        this.starthandleChange = this.starthandleChange.bind(this);
        this.endhandleChange = this.endhandleChange.bind(this);
        
    }
    renderstartDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.starthandleChange}
                    maxDate={(new Date())}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize printing alignText112"
                    placeholderText="Search Start Date"
                />
            </div>
        )
    }

    starthandleChange(date) {
        this.setState({
            startDate: date
        });
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
                    className="form-control mb-3 formsize printing alignText112"
                    placeholderText="Search End Date"
                />
            </div>
        )
    }

    endhandleChange(date) {
        this.setState({
            endDate: date
        });
    }



    handleChange=(event)=>{
        
        this.setState({
            [event.target.name]:event.target.value
        })

    }


    renderAllOrgs(data){
        if(data) {
           data.sort((a, b) => a.orgName - b.orgName);
            return data.map((item) => {
                return(
                    <>
                        <option key={item._id} value={item.orgName}>
                            {item.orgName}
                        </option>
                    </>
                )
                
                
            })
        }
    }

    findGroup(){
        // var start = moment(this.state.startDate).format('MMM DD YYYY');
        // var end = moment(this.state.endDate).format('MMM DD YYYY');
        // var searchUrl=`${getGroupDataUrl}?orgName=${this.state.orgName}&&startDate=${start}&&endDate=${end}`;
        // var docketSearchUrl = `${getgroupDocketsUrl}?orgName=${this.state.orgName}&&startDate=${start}&&endDate=${end}`;
        // var FandBsearchUrl=`${getfunctionfoodanddrinkUrl}?orgName=${this.state.orgName}&&startDate=${start}&&endDate=${end}`;
        // var FandBsearchUrl=`${getfunctionfoodanddrinkUrl}?orgName=${this.state.orgName}`
        
        fetch(`${getGroupDataUrl}${this.state.orgName}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({groupData:data});
            var allstay = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TotalAccommodation)
            }, 0);
            this.setState({totalAcc:allstay})
        });

        // fetch(`${getGlobalChrgesUrl}${this.state.orgName}`, {method:'GET'})
        // .then((res) => res.json())
        // .then((data) => {
            
        //     data.map((item)=>{
        //         let arrDatex = moment(item.arrivalDate);
        //         sessionStorage.setItem('arrivalDtx',arrDatex)
        //         var thisDate = new Date();
        //         var endDatex = moment(thisDate);
        //         sessionStorage.setItem('endDtx',endDatex);
        //         var getArrival = moment(sessionStorage.getItem('arrivalDtx'));
        //         var diff = endDatex.diff(getArrival);   
        //         var comp = Math.ceil(diff/(1000*3600*24)-1);
        //         if(comp===0||comp<0){
        //             comp=1;
        //         }
        //         else{
        //             comp = Math.ceil(diff/(1000*3600*24)-1);
        //         }
                
        //         var AllInHouse = data.map(item => item).reduce((totals, item) =>{
        //             return totals + parseInt(item.dailyRate*comp)   
        //         }, 0);
        //         this.setState({
        //             guestInHouse:data,
        //             TotalBillsInHouse:AllInHouse
                    
        //         })
        //         return 'ok'
            
           
        //     })
                
        // })

        fetch(`${getGroupDataUrl}${this.state.orgName}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({groupBillData:data});
            var allDockets = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TotalRoomService)
            }, 0);
            this.setState({totalDockets:allDockets})
        });

        // fetch(`${getBillgroupIDsUrl}${this.state.orgName}`, {method:'GET'})
        // .then((res) => res.json())
        // .then((data) => {
        //     this.setState({Inhousebilldetails:data})

        //     var allDocketX = data.map(item => item).reduce((totals, item) =>{
        //         return totals + parseInt(item.cost)
        //     }, 0);
        //     this.setState({calDockets:allDocketX})
        //     // sessionStorage.setItem('Dockets',allDocketX)


        // })

        fetch(`${getfunctionfoodanddrinkUrl}${this.state.orgName}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({functionFandB:data});
            var allFandB = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.amount)
            }, 0);
            this.setState({totalfuncttionFandB:allFandB})
        });
       
        fetch(`${getgroupDepositUrl}${this.state.orgName}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({groupPayments:data});
            var allPOSDeposits = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.POSAmount)
            }, 0);
            this.setState({POSDeposit:allPOSDeposits})

            var allCashDeposits = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.CashAmount)
            }, 0);
            this.setState({CashDeposit:allCashDeposits})

            var allTransferDeposits = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.TransferAmount)
            }, 0);
            this.setState({TransferDeposit:allTransferDeposits})
            this.setState({
            CompDebit:0,
            roomDebit:0
            })

            var AllDeposits = 0;
            var TotalDeposits = AllDeposits + allTransferDeposits + allCashDeposits + allPOSDeposits;
            this.setState({TotalDeposits})

            

        });
    }

    renderRooms=(data)=>{
        if(data){
            data.sort((a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate));
            return data.map((item)=>{
                // var thisDate = new Date();
                // var endDate = moment(thisDate);
               
                // var startDt = moment(item.arrivalDate);
               
                // var diff =endDate.diff(startDt);
                // var datecomp = Math.ceil(diff/(1000*3600*24));
                var departure = moment(item.departureDate).format('MMM DD YYYY');

                    
                return(
                    <>
                        <tr key= {item.refID}>
                            
                            <td className="table-light table-striped adjust2b">{item.fname} {item.lname}</td>
                            <td className="table-light table-striped adjust2b">{item.arrivalDate}</td>
                            <td className="table-light table-striped adjust2b">{departure}</td>
                            <td className="table-light table-striped adjust2b">{item.roomNum}</td>
                            <td className="table-light table-striped adjust2b">{item.roomtype}</td>
                            <td className="table-light table-striped adjust2b"><NumberFormat value={item.dailyRte}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2b">{item.stay} Nights</td>
                            <td className="table-light table-striped adjust2b"><NumberFormat value={item.TotalAccommodation}thousandSeparator={true}displayType={"text"}/></td>
                            
                        </tr> 
                    </>
                )
                

               
            })
            
        }
           
    }

    // renderInhouse=(data)=>{
    //     if(data){
    //         data.sort((a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate));
    //         return data.map((item)=>{
                
    //             var arrival = moment(item.arrivalDate).format('YYYY-DD-MMM');
    //             var arrDatex = moment(item.arrivalDate);
    //             sessionStorage.setItem('arrivalDtx',arrDatex)
    //             var thisDate = new Date();
    //             var endDatex = moment(thisDate);
    //             sessionStorage.setItem('endDtx',endDatex);
    //             var getArrival = moment(sessionStorage.getItem('arrivalDtx'));
    //             var diff = endDatex.diff(getArrival);   
    //             var comp = Math.ceil(diff/(1000*3600*24)-1);
    //             if(comp===0||comp<0){
    //                 comp=1;
    //             }
    //             else{
    //                 comp = Math.ceil(diff/(1000*3600*24)-1);
    //             }

                

    //             return(
    //                 <>
    //                     <tr key= {item.refID}>
                            
    //                         <td className="table-light table-striped adjust2b">{item.fname} {item.lname}</td>
    //                         <td className="table-light table-striped adjust2b">{arrival}</td>
    //                         <td className="table-light table-striped adjust2b">In-House</td>
    //                         <td className="table-light table-striped adjust2b">{item.roomNumbers}</td>
    //                         <td className="table-light table-striped adjust2b">{item.roomtypeName}</td>
    //                         <td className="table-light table-striped adjust2b"><NumberFormat value={item.dailyRate}thousandSeparator={true}displayType={"text"}/></td>
    //                         <td className="table-light table-striped adjust2b">{comp} Nights</td>
    //                         <td className="table-light table-striped adjust2b"><NumberFormat value={parseInt(item.dailyRate)*(comp)}thousandSeparator={true}displayType={"text"}/></td>
                            
    //                     </tr> 
    //                 </>
    //             )
                
    //         })
            
    //     }
           
    // }

    renderDockets=(data)=>{
        if(data){
            data.sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate));
            return data.map((item)=>{
                var departure = moment(item.departureDate).format('MMM DD YYYY');
                if(item.TotalRoomService!=='0'){
                    return(
                        <>
                                <tr key= {item.refID}>
                                
                                <td className="table-light table-striped adjust2b">{departure}</td>
                                <td className="table-light table-striped adjust2b">{item.roomNum}</td>
                                <td className="table-light table-striped adjust2b">{item.fname} {item.lname}</td>
                                <td className="table-light table-striped adjust2b"><NumberFormat value={item.TotalRoomService}thousandSeparator={true}displayType={"text"}/></td>
                                
                            </tr>
                        </>
                    )
                }
                else{
                    return null
                }
                

            })
            
        }
           
    }

    renderInhouseDockets=(data)=>{
        if(data){
            data.sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate));
            return data.map((item)=>{
                if(item.cost!=='0'){
                    return(
                        <>
                                <tr key= {item.refID}>
                                
                                <td className="table-light table-striped adjust2b">{item.date}</td>
                                <td className="table-light table-striped adjust2b">{item.roomNumbers}</td>
                                <td className="table-light table-striped adjust2b"><NumberFormat value={item.cost}thousandSeparator={true}displayType={"text"}/></td>
                                
                            </tr>
                        </>
                    )
                }
                else{
                    return null
                }
                

            })
            
        }
           
    }

    renderFandB=(data)=>{
        if(data){
            return data.map((item)=>{
                
                return(
                    <>
                            <tr key= {item.resID}>
                            
                            <td className="table-light table-striped adjust2b">{item.transactionDate}</td>
                            <td className="table-light table-striped adjust2b">{item.resID}</td>
                            <td className="table-light table-striped adjust2b">{item.description}</td>
                            <td className="table-light table-striped adjust2b">{item.qty}</td>
                            <td className="table-light table-striped adjust2b"><NumberFormat value={item.amount}thousandSeparator={true}displayType={"text"}/></td>
                            
                        </tr>
                    </>
                )

            })
            
        }
           
    }

    renderDeposits=(data)=>{
        if(data){
            return data.map((item)=>{
                
                return(
                    <>
                        <tr key= {item.refID}>
                            <td className="table-light table-striped adjust2b">{item.date}</td>
                            <td className="table-light table-striped adjust2b">{item.description}</td>
                            <td className="table-light table-striped adjust2b">{item.receiptNum}</td>
                            <td className="table-light table-striped adjust2b"><NumberFormat value={this.state.POSDeposit}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2b"><NumberFormat value={this.state.CashDeposit}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2b"><NumberFormat value={this.state.TransferDeposit}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2b"><NumberFormat value={this.state.TotalDeposits}thousandSeparator={true}displayType={"text"}/></td>
                        </tr>
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
                        <h6>Zarvich Hotels Ltd.</h6>
                        <p className="textSize">No ABC Road, Wuse II, Abuja, Nigeria</p>
                        <p className="textSize">+234 803 590 5421, info@zarvichosh.com</p>
                       
                    </center>
                </div>
                <center>
                    <h5>{this.state.orgName} Group Bill</h5><br/>
                    <hr style={{color:'deeppink'}}/>
                    <div className="row mt-4">
                        
                        <div className="col-3">
                            <select type ="button" className="form-select mb-2 btn btn-primary mt-3 col-2 set1 printing" name="orgName" onChange={this.handleChange}>
                                <option selected value=''>Select Org</option>
                                {this.renderAllOrgs(this.state.org)}
                            </select>
                        </div>
                        {/* <div className="col-3">
                            <label>
                                {this.renderstartDate(this.state.startDate)}
                            </label>
                        </div>
                        <div className="col-3">
                            <label>
                                {this.renderendDate(this.state.endDate)}
                            </label>
                        </div> */}
                        <div className="col-3">
                            <button className="btn btn-primary printing set2" onClick={ () => this.findGroup()}>Find</button>
                        </div>
                        
                    </div>
                    <hr style={{color:'deeppink'}}/>
                    <br/><br/>
               
                </center>
                <h6 style={{color:'blue'}}>Accommodation Details</h6>
                <hr/>
                                               
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Names</th>
                            <th className="adjust5">Arrival Date</th>
                            <th className="adjust5">Departure Date</th>
                            <th className="adjust5">Room Num</th>
                            <th className="adjust5">Room Type</th>
                            <th className="adjust5">Daily Rate(NGN)</th>
                            <th className="adjust5">Stay</th>
                            <th className="adjust5">Total(NGN)</th>
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderRooms(this.state.groupData)}
                        
                    </tbody>
                    
                </table>
                <div className="row">
                    <div className="col-3">
                        <h6>Accommodation Total: <NumberFormat value={this.state.totalAcc}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </div>
                    {/* <div className="col-3">
                        <p>VAT (7.5%): <NumberFormat value={this.state.calcVAT}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>
                    </div>
                    <div className="col-3">
                        <p>Tourism Levy (10%): <NumberFormat value={this.state.calcTourismLev}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>
                    </div>
                    <div className="col-3">
                        <h6>Grand Total: <NumberFormat value={this.state.totalAcc - this.state.calcVAT - this.state.calcTourismLev}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </div> */}
                </div>
                <hr/>
                <h6 style={{color:'blue'}}>Room Service Details</h6>
                
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Date</th>
                            <th className="adjust5">Room Num</th>
                            <th className="adjust5">Names</th>
                           <th className="adjust5">Total(NGN)</th>
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderDockets(this.state.groupBillData)}

                        <h6>Room Service Total: <NumberFormat value={this.state.totalDockets}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </tbody>
                </table>  
                <h6 style={{color:'blue'}}>Banquet Bill</h6>
                <hr/>
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Date</th>
                            <th className="adjust5">ID</th>
                            <th className="adjust5">Description</th>
                            <th className="adjust5">Qty</th>
                            <th className="adjust5">Amount (NGN)</th>
                            
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderFandB(this.state.functionFandB)}
                        <h6>Banquet Bill Total: <NumberFormat value={this.state.totalfuncttionFandB}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </tbody>
                </table>  
                <h6 style={{color:'blue'}}>Deposit Details</h6>
                <hr/>
                <table className="table table-hover">
                    
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust5">Date</th>
                            <th className="adjust5">Description</th>
                            <th className="adjust5">Receipt Num</th>
                            <th className="adjust5">POS(NGN)</th>
                            <th className="adjust5">Cash(NGN)</th>
                            <th className="adjust5">Transfer(NGN)</th>
                            <th className="adjust5">Total(NGN)</th>
                                    
                        </tr>
                    </thead>
                    <tbody className="table table-hover">
                        {this.renderDeposits(this.state.groupPayments)}
                        <h6>Total Deposits: <NumberFormat value={this.state.TotalDeposits}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></h6>
                    </tbody>
                </table>  
                <hr/>
                <center>
                    <div className="row">
                        <div className="col-2 increasewidth">
                            <h6>Total Deposit:</h6><p><NumberFormat value={this.state.TotalDeposits}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>
                        </div>
                        <div className="col-2 increasewidth">
                            <h6>Accommodation:</h6><p><NumberFormat value={this.state.totalAcc}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>
                        </div>
                        <div className="col-2 increasewidth">
                            <h6>Room Service:</h6><p><NumberFormat value={this.state.totalDockets}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>    
                        </div>
                        <div className="col-2 increasewidth">
                            <h6>Banquet Bill:</h6><p><NumberFormat value={this.state.totalfuncttionFandB}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>    
                        </div>
                        <div className="col-2 increasewidth">
                                <h6>Balance:</h6><p><NumberFormat value={this.state.TotalDeposits - (this.state.totalAcc + this.state.totalDockets+this.state.totalfuncttionFandB)}thousandSeparator={true}displayType={"text"}prefix={"NGN"}/></p>   
                        </div>
                        <hr/>
                        
                    </div>    
                </center>

                <center>
                    <button className="btn btn-danger printing" onClick={ () => this.props.history.push('/EndOfDay')}>Close</button>
                    <button className="btn btn-primary movebtn printing" onClick={ () => window.print() }>Print</button>
                        
                </center>     

            </div>
                
        )
    }

    componentDidMount() {
        console.log(">>> Inside GstDidMount", this.state)

        fetch(`${getOrgUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
                this.setState({
                org:data
            })
        })

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
    }

    
    
}

export default GroupBill;