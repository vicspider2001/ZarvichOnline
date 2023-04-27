import React,{Component} from 'react';
import '../../HouseKeeping/Housekeeping.css';
import Storelogin from '../../Storelogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const userName = "http://10.1.0.99:3333/fandbUserInfo";


class FandBMenu extends Component {
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
                    <Storelogin/>
                </>
            )

        }
        return(
            <>
                 <div className="background15k">
                                      
                    <center>
                         <div className="formdesign15k">
                             <h4 className="mb-3">F and B Portal</h4>
                             
                            <div>
                                
                                <center>
                                   
                                   {/* <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('./FandB')}}>Post Function Bills</button> */}
                                   {/* <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('./FandBReport')}}>View Function Bills</button> */}
                                   <button className="btn btn-primary btnwidth15k mb-3" onClick={ ()=> {this.props.history.push('./AddMenu')}}>Restaurant Menu Manager</button>
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

    }

}


export default FandBMenu;
