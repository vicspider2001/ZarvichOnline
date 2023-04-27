import React,{Component} from 'react';
import './Housekeeping.css';
import axios from 'axios';
import Footer4 from '../Footer4';
import Housekplogin from '../Housekplogin';
import 'bootstrap/dist/css/bootstrap.min.css';



const roomchartUrl = "http://10.1.0.99:3333/getrmstatus";
const hskeepingputUrl = "http://10.1.0.99:3333/rmstatus";
const userName = "http://10.1.0.99:3333/housekpUserInfo";


class houseKeeping extends Component {

    constructor(props) {
        super(props);
        console.log(">>>Inside RMConstructor")

        this.state={
            roomchart:'',
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

    async handleSubmit() {
        
        try {
            var hkid = sessionStorage.getItem('hskrmID')
            
            var HousekeepUpdate = {
    
                roomNumbers:`${sessionStorage.getItem('hskrm')}`,
                status:'',
                roomtypeName:`${sessionStorage.getItem('hskrtype')}`,
                fname: '',
                lname: '',
                roomStatus: 'green'
            }
     
            let result = await fetch(`${hskeepingputUrl}/${hkid}`, {
                method:'put',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                 
                },
                body: JSON.stringify(
                    HousekeepUpdate
                )
    
            });
    
            console.log('result> '+ result)
            fetch(`${roomchartUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    roomchart:data
                    
                })
               
            })
           
                    
        } catch(e) {
            console.log(e)
        }
    
    }


    renderHousekeepingchart=((data)=>{
        
        if (data){
            return data.map((item) =>{
                data.sort((a, b) => a.roomNumbers - b.roomNumbers);
                if(item.roomStatus==="black"){
                    return(
                        <>
                        
                            <button className="btn alignroomsgreen" style={{backgroundColor:`${item.roomStatus}`}} onMouseOver={ () => {sessionStorage.setItem('hskrmID',item._id); sessionStorage.setItem('hskrm',item.roomNumbers); sessionStorage.setItem('hskrtype',item.roomtypeName)}} onClick={ () => this.handleSubmit() }>
                                <h5 className="card-title">{item.roomNumbers}</h5>
                                <h6 className="card-subtitle mb-2 size2">{item.roomtypeName}</h6>
                            </button>
                        </>
                    )

                }
                else {
                    return(
                        <>
                        
                            <button className="btn alignroomsgreen" style={{backgroundColor:`${item.roomStatus}`}}>
                                <h5 className="card-title">{item.roomNumbers}</h5>
                                <h6 className="card-subtitle mb-2 size2">{item.roomtypeName}</h6>
                            </button>
                            
                        </>
                    )
                }
                   
            })
        }
        
    }) 
    

    render(){
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
                <Footer4/>
                
                <div className="pagebodyNow">
                    <br/>
                    {this.renderHousekeepingchart(this.state.roomchart)}
                    
                </div>
                
                <div className="pagebody">
                   <center><button className="btn btn-danger" onClick={ () => this.props.history.push('./hskPortal')}>Close</button></center>
                   <div className="row mt-3">
                            <div className="col-6">
                                <h6 style = {{color:'purple',marginLeft:'480px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                            </div>
                            <div className="col-3">
                                <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                            </div>
                    </div>
                </div>
                
              
                
            </>
        )
        
        
    }

    async componentDidMount(){
        console.log (">>> Inside RMdidMount")
        const response = await axios.get(`${roomchartUrl}`)
        this.setState({roomchart:response.data})

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

        this.myTimer = setInterval(() => {
            console.log (">>> Inside RMdidMount")
            
            fetch(`${roomchartUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({roomchart:data});
                
            })

        },60000);
        
      
    }

}
export default houseKeeping;