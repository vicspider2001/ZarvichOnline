import React,{Component} from 'react';
import '../../Bar/BarReport.css';
import Billinglogin from '../../Billinglogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const userName = "http://10.1.0.99:3333/billingUserInfo";

class EndOfDay extends Component {
    constructor(props){
        super(props);
        console.log(">>>Inside GstConstructor",props)
        this.state={
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''
        }

    }
    
    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
          
            login:true
        })
    }

   
    render() {
        console.log (">>> Inside logindetails", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                   <Billinglogin/>
                </>
            )

        }
        return(
            <>
              
                <div className="background15ba">
                    <center>
                        <div className="formdesign152">
                             <h4 className="mb-3">Billing Reports</h4>
                            <div>

                                <center>
                                   
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./CashCollection')}}>Daily Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./DailyRoomSales')}}>Accommodation Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./RestaurantReport')}}>Restaurant Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./BarSalesReport')}}>Bar Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./PoolBarDailySales')}}>PoolBar Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./ClubDailySales')}}>Club Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./LaundryReport')}}>Laundry Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./GymnasiumReport')}}>Gymnasium Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./SmoothieReport')}}>Pizza Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./SwimmingReport')}}>Swimming Pool Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./MinimartReport')}}>Mini Mart Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./BarbequeReport')}}>Barbeque Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./ShishaReport')}}>Shisha Sales Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./HallHireReport')}}>Hall Hire Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./OtherSalesReport')}}>Other Sales Report</button>
                                    {/* <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./OwingGuests')}}>Owing Guests Report</button> */}
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./DailyDiscountList')}}>Room Discount Report</button>
                                    {/* <button className="btn btn-warning btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./GroupBill')}}>Group Bill</button> */}
                                    <button className="btn btn-danger btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./BillingMenu')}}>Close</button>
                                    <button className="btn btn-warning btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>  
                                    
                                </center>
                                
                            </div>
                        </div>
                        

                    </center>
                   
                </div>
                <div className="pagebody3">
                    <input hidden/>
                </div>
            </>
           

        )
    }
    componentDidMount(){
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


export default EndOfDay;
