import React,{Component} from 'react';
import '../HouseKeeping/Housekeeping.css';
import Adlogin from '../Adlogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const userName = "http://10.1.0.99:3333/fofUserInfo";


class Modules extends Component {
    constructor(props){
        super(props);
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
        
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Adlogin/>
                </>
            )

        }
        return(
            <>
                <div className="background15kmenu">
                                      
                    <center>
                        <div className="formdesign15kmenu">
                            <h4 className="mb-3">App Menu</h4>
                            
                            <div className="grow">
                            
                                <center>
                                    
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/roomchart')}}>Reception</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/BillingMenu')}}>Billing</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/RestPortal')}}>Restaurant</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/BarPortal')}}>Bar</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/PoolBarPortal')}}>Pool Bar</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/ClubPortal')}}>Club</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/hskPortal')}}>HouseKeeping</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/FandBMenu')}}>F and B</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/storeMenu')}}>Central Store</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Sales Manager</button>
                                    <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/Settings')}}>Settings</button>
                                    <button className="btn btn-warning btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
                                    <button className="btn btn-danger btnwidth15 mb-3" onClick={ ()=> this.logout()}>
                                        Log Out {localStorage.getItem('userInfo').split(' ')[0]}
                                    </button>
                                </center>
                            </div>
                        </div>
                         

                     </center>
                   
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

        this.myTimer = setTimeout(() => {
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
            
        },1000);


       
            
       

        

    }

}


export default Modules;
