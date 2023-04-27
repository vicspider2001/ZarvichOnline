import React,{Component} from 'react';
import './Housekeeping.css';
import Housekplogin from '../Housekplogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const userName = "http://10.1.0.99:3333/housekpUserInfo";


class HousekeepingMenu extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside RMConstructor")

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
        console.log(">>> Inside RMrender", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Housekplogin/>
                </>
            )

        }
        return(
            <>
                 <div className="background15k">
                     <center>
                         <div className="formdesign15k">
                             <h4 className="mb-3">Housekeeping Portal</h4>
                            <div>
                                
                                <center>
                                   
                                   <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('./housekeeping')}}>Housekeeping</button>
                                   <button className="btn btn-warning btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('/AppMenu')}}>App Menu</button>
                                   <button className="btn btn-danger btnwidth15k" onClick={ ()=> this.logout()}>Log Out</button>
                                    
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
    }

}


export default HousekeepingMenu;
