import React,{Component} from 'react';
import './BarReport.css';
import Poollogin from '../Poollogin';
import 'bootstrap/dist/css/bootstrap.min.css';


const userName = "http://10.1.0.99:3333/poolUserInfo";

class PoolBarReports extends Component {
    constructor(props) {
        super (props);
        console.log(">>>Inside RESConstructor",props)

        this.state = {
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            Blogin:'',
            login:''
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
                    <Poollogin/>
                </>
            )

        }
        return(
            <>
              
                 <div className="background15">
                     <center>
                         <div className="formdesign152">
                             <h4 className="mb-3">Pool Bar Portal</h4>
                            <div>
                                
                                <center>
                                    <button className="btn btn-primary btnwidth15 mb-3" onClick={ ()=> {this.props.history.push('./PoolBar')}}>Pool Bar</button>
                                    <button className="btn btn-warning btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/AppMenu')}}>App Menu</button>
                                    <button className="btn btn-warning btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
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


export default PoolBarReports;
