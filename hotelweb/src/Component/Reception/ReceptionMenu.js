import React,{Component} from 'react';
import '../Bar/BarReport.css';
import './Reception.css';
import FLogin from '../FLogin';
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';

const userName = "http://10.1.0.99:3333/fofUserInfo";

class ReceptionMenu extends Component {
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
                   <FLogin/>
                </>
            )

        }
        return(
            <>
              
                <div className="background15b">
                    <center>
                        <div className="formdesign152">
                             <h4 className="mb-3">Reception Reports</h4>
                            <div>

                                <center>
                                   
                                    
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ () => this.props.history.push('./Occuppancy')}>Occupancy Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ () => this.props.history.push('./HouseKeepingPrint')}>HouseKeeping Print</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ () => this.props.history.push('./roomChangeReport')}>Room Change Report</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onMouseOver={()=> sessionStorage.setItem('chkOutDate',moment(new Date()).format('YYYY-DD-MMM'))} onClick={ () => this.props.history.push('./DailyCheckIn')}>Daily Check In</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onMouseOver={()=> sessionStorage.setItem('chkOutDate',moment(new Date()).format('YYYY-DD-MMM'))} onClick={ () => this.props.history.push('./checkOut')}>Daily Check Out</button>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ () => this.props.history.push('./policeReport')}>Police Report</button>
                                    {/* <button className="btn btn-primary btnwidth15 mb-3" onClick={ () => this.props.history.push('./ReceptionFunctnAcc')}>Function Accommodation</button> */}
                                    <button className="btn btn-danger btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('/roomchart')}}>Close</button>
                                    <button className="btn btn-danger btnwidth15 mb-3" onClick={ ()=> this.logout()}>
                                    Log Out {localStorage.getItem('userInfo').split(' ')[0]}
                                    </button>
                                    
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


export default ReceptionMenu;
