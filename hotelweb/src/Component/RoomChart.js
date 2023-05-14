import React,{Component} from 'react';
import './Reception.css';
import axios from 'axios';
import Newheader from './Newheader';
import Spinner from 'react-bootstrap/Spinner';
import Adlogin from './Adlogin';

const roomchartUrl = "https://us3.localto.net:39344/getrmstatus";
const checkinguestUrl = "https://us3.localto.net:39344/checkin?guest=";



class RoomChart extends Component {

    constructor(props) {
        super(props);
        console.log(">>>Inside RMConstructor")

        this.state={
            roomchart:'',
            guestrecord:'',
           

        }

    }

    // logout(){
    //     localStorage.removeItem('userInfo');
    //     this.setState({
    //         login:true
    //     })
        
    // }

    renderRoomchart=((data)=>{
        
        if (data){
            return data.map((item) =>{
                data.sort((a, b) => a.roomNumbers - b.roomNumbers);
                if(item.fname||item.lname||item.roomStatus==="black"||item.roomStatus!=='green'){
                    return(
                        <>
                            
                                
                            <div className="card alignroomsgreen" style={{backgroundColor:`${item.roomStatus}`}}>
                                <div className="card-body top">
                                    <b className="card-title">{item.roomNumbers}</b>
                                    <h6 className="card-subtitle mb-2 sizel2">{item.fname} {item.lname}</h6>
                                    <h6 className="card-subtitle mb-2 sizel">{item.roomtypeName}</h6>
                                </div>
                            </div>
                                    
                           
                        </>
                    )
                    
                }

                
                else{
                    return(
                        <>
                            
                               
                            <div className="card alignroomsgreen" style={{backgroundColor:`${item.roomStatus}`}}>
                                <div className="card-body top">
                                    <b className="card-title">{item.roomNumbers}</b>
                                    <h6 className="card-subtitle mb-2 sizel2">{item.fname} {item.lname}</h6>
                                    <h6 className="card-subtitle sizel">{item.roomtypeName}</h6>
                                </div>
                            </div>
                                   
                           
                        </>
                    )
                }
                
                   
            })
        }
        else{
            return(
                <>
                    <Spinner animation="border" variant="primary" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="warning" />
                </>
            )
        }
        
    }) 
    

    render(){
        console.log(">>> Inside RMrender", this.state)
        
        if(localStorage.getItem('rtk')==null||localStorage.getItem('userdata')===null){
            return(
                <>
                    <Adlogin/>
                </>
            )

        }
        
        return(
            <>
                <Newheader/>
                
                <div className="pagebody12">
                    <br/>
                    {this.renderRoomchart(this.state.roomchart)}
                </div>

                
                
                <center>
                    <div className="pagebody2">
                        <div className="space">
                            
                            <button className="btn btn-danger gap6" onClick={ () => this.props.history.push('/')}>Close</button>
                        </div>
                    </div>
                    
                
                </center>
                
                
                
               
                
            </>
        )
        
        
    }

    async componentDidMount(){
        
        console.log (">>> Inside RMdidMount")
        const response = await axios.get(`${roomchartUrl}`)
        const resp = await axios.get(`${checkinguestUrl}`)
        this.setState({roomchart:response.data, guestrecord:resp.data})
      
        this.myTimer = setInterval(() => {
            console.log (">>> Inside RMdidMount")
            
            fetch(`${roomchartUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({roomchart:data});
                
            })

            fetch(`${checkinguestUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({guestrecord:data});
                
            })

        },300000);

    }


}
export default RoomChart;