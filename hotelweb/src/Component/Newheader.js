import React, { Component } from 'react';
import './Header.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CloseButton from 'react-bootstrap/CloseButton';
import {withRouter} from 'react-router-dom';
// import Adlogin from './Adlogin';
import {Link} from 'react-router-dom';

const checkinDataUrl = "https://us3.localto.net:39344/getrmstatus";



class Newheader extends Component {
    constructor(props){
        super(props);
        console.log(">>> inside nanetConstructor", props)
        this.state={
            show:false,
            checkinData:'',
            vacantData:'',
            CheckOut:'',
            userdata:''
            
        }
    }

    handleShow(){
        this.setState({show:true})
    }

    handleClose(){
        this.setState({show:false})
    }

    // handleLogout = () => {
    //     this.setState({userdata:''})
    //     localStorage.removeItem('userdata')
    //     localStorage.removeItem('rtk')
    //     this.setState({Blogin:true});
    // }

    logoutNow(){
        localStorage.removeItem('rtk');
        localStorage.removeItem('userdata');
        window.location.reload();
    }
    
    render(){
        console.log(">>>Inside RMrender",this.state)
        
        var count=this.state.checkinData;
        if (count!=='green'){
            var result = count.length;
        }
        var vacant=this.state.vacantData;
        var output = vacant.length;

        var chkout=this.state.CheckOut;
        var out = chkout.length;

        return (
            <>
                <div className="headerbackgrd">
                    <span>
                        <Link to="/">
                            <center><img src= "https://i.ibb.co/m9fxh8R/Logo-40.jpg" className="logo" style={{width:"100px", height:"100px", marginTop:"20px",marginBottom:"20px"}} alt="logo"/></center>
                        </Link>
                    </span>
                    
                    <span>
                        
                        <i type="button" className="fa fa-bars size2" onClick={()=>this.handleShow()}></i>
                    
                    </span>

                    <span>
                        <div>
                            <span className="Ikem">Hi {localStorage.getItem('userdata')}</span>
                        </div>
                    </span>

                    <span>
                        <div>
                            <p type="button" className="Adriel" onClick={()=>this.logoutNow()}>logout</p>
                        </div>
                    </span>
                   
                </div>
                <div className="headerbackgrd2">
                    <span>
                        <center>
                            <span className='fontopt1'>CheckIn</span> <button className="btn btn-danger reshape">{result}</button>
                               
                        </center>
                        
                        
                    </span>

                    <span>
                        <center>
                        <span className='fontopt3'>CheckOut </span> <button className="btn btn-danger reshape">{out}</button>
                        </center>
                                                
                    </span>
                    
                    <span>
                        <center>
                        <span className='fontopt2'>Vacant </span> <button className="btn btn-danger reshape">{output}</button>
                        </center>
                        
                        
                    </span>
                    
                </div>
                
                <Offcanvas show={this.state.show}>
                    
                    <div className="headerbackgrd3">
                        <Offcanvas.Body>
                            <div className="bg-dark p-3 size3">
                                <CloseButton variant="white" onClick={()=>this.handleClose()}/>
                                
                            </div>
                            <div className="menu">
                                <center>
                                    <p className="menulist" type="button" onClick={()=>{this.props.history.push('/');this.handleClose()}}>Dashboard</p>
                                </center>
                            </div>
                            <div className="menu">
                                <center>
                                    <p className="menulist" type="button" onClick={()=>{this.props.history.push('/RoomChart');this.handleClose()}}>Room Chart</p>
                                </center>
                            </div>
                            <div className="menu">
                                <center>
                                    <p className="menulist" type="button" onClick={()=>{this.props.history.push('/Reservation');this.handleClose()}}>Reservations</p>
                                </center>
                            </div>
                            <div className="menu">
                                <center>
                                    <p className="menulist" type="button" onClick={()=>{this.props.history.push('/Occupancy');this.handleClose()}}>Occupancy</p>
                                </center>
                            </div>
                            <div className="menu">
                                <center>
                                    <p className="menulist" type="button" onClick={()=>{this.props.history.push('/SalesReport');this.handleClose()}}>Daily Sales</p>
                                </center>
                            </div>
                            
                            
                        </Offcanvas.Body>
                    </div>
                    
                </Offcanvas>
                
                
            
            </>
        )
    }

    componentDidMount(){
        console.log (">>> Inside RMdidMount")
        
        fetch(`${checkinDataUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            
            this.setState({
                checkinData:data.map(item => item.roomStatus).filter(item=> item !=='green'&& item !=='black')
                
            })
            this.setState({
                vacantData:data.map(item => item.roomStatus).filter(item=> item ==='green')
                
            })
            this.setState({
                CheckOut:data.map(item => item.roomStatus).filter(item=> item ==='black')
                
            })
            
            
        })

        
      
    }
    
    
}


export default withRouter(Newheader);