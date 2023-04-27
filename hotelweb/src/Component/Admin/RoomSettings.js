import React, { Component } from 'react';
import Adlogin from '../Adlogin';
import '../Reception/Reception.css';
import {Modal} from 'react-responsive-modal';
import NumberFormat from 'react-number-format';
import 'bootstrap/dist/css/bootstrap.min.css';


const deptUrl= "http://10.1.0.99:3333/rooms";
const getdeptID= "http://10.1.0.99:3333/rooms?details=";
const postdept= "http://10.1.0.99:3333/createRoom";
// const putdept= "http://192.168.8.102:3333/editRoom";
const deldept= "http://10.1.0.99:3333/delRoom";

const deptUrlType= "http://10.1.0.99:3333/roomTypes";
const postdeptType= "http://10.1.0.99:3333/newRoom";
const deldeptType= "http://10.1.0.99:3333/delRoomType";

// const getRmStatus= "http://192.168.8.102:3333/getRoomStatus";
const postNewRmStatus= "http://10.1.0.99:3333/createRoomStatus";
// const getRmStatuswrtRmNum= "http://192.168.8.102:3333/getRoomStatus?roomSt";
// const editRoomStatus= "http://192.168.8.102:3333/editRoomStatus";
const delRmStatus= "http://10.1.0.99:3333/delRoomSt";

const userName = "http://10.1.0.99:3333/adminUserInfo";


class RoomSettings extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*10000), //this will be same as roomNumbers in room creation and diff in room status change//
            roomsData:'',
            roomNumbers:'',
            roomStatus:'green',
            roomtypeName:'',
            fname:'',
            lname:'',
            status:'',
            BillStatus:'',

            roomTypeID:0,
            roomRate: '',
            floorNumber:'',
            
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',

            feesData:'',
            roomType:'',
            typeID:'',
            edit: false
            
        }

    }

    onOpenModaledit(){
        this.setState({
            edit: true
        })

        fetch(`${deptUrlType}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                feesData:data
            })
        })
    }

    onCloseModaledit(){
        this.setState({
            edit: false,
            
        })
        fetch(`${deptUrlType}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                feesData:data
            })
            data.map((item)=>{
                var checkIDType = parseInt(item.typeID);
                var computeIDType = Math.max(checkIDType) +1;
                this.setState({
                
                    typeID:computeIDType
                
                })
                
                return 'ok'
            })
        })
        
        
    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    deletedeptType(){
       
        fetch(`${deldeptType}/${sessionStorage.getItem('getRmTypID')}`, {method:'delete'})
        alert("Room Type Deleted")
            this.setState({
            roomType:'',
            typeID:'',
            feesData:'',
            _id:''
        })
        this.myTimer = setTimeout(() => {
            fetch(`${deptUrlType}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    feesData:data
                })
                data.map((item)=>{
                    var checkIDType = parseInt(item.typeID);
                    var computeIDType = Math.max(checkIDType) +1;
                    this.setState({
                    
                        typeID:computeIDType
                    
                    })
                    
                    return 'ok'
                })
                
            })
           
        },1000)
        this.myTimer = setTimeout(() => {
                    
            this.setState({
                _id:Math.floor(Math.random()*10000),
               
                
            })
        },1000)
       
    }
   

    

    deleteRoom(){
       
        fetch(`${deldept}/${sessionStorage.getItem('getRoomsdelID')}`, {method:'delete'})
        fetch(`${delRmStatus}/${sessionStorage.getItem('getRoomsdelID')}`, {method:'delete'})
        alert("Room Deleted")
            this.setState({
            roomtypeName:'',
            roomStatus:'',
            floorNumber:'',
            roomRate:'',
            roomsData:'',
            _id:''
        })
        this.myTimer = setTimeout(() => {
            fetch(`${deptUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    roomsData:data
                })
                
                
            })
           
        },1000)
        this.myTimer = setTimeout(() => {
                    
            this.setState({
                _id:Math.floor(Math.random()*10000),
            })
        },1000)
       
    }

    editRoomz(){
        fetch(`${getdeptID}${sessionStorage.getItem('roomsIden')}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    roomID:item.roomID,
                    roomtypeName:item.roomtypeName,
                    roomRate:item.roomRate,
                    roomNumbers:item.roomNumbers,
                    floorNumber:item.floorNumber

                })
                return 'ok'
            })
            
            
        })
    }

    

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    handleChange3 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        fetch(`${deptUrlType}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                feesData:data,
                
            })
            
        })
        
    }

    handleChange2 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        if(event.target.value==='Add New'){
            this.setState({
                edit:true
            })

            fetch(`${deptUrlType}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    feesData:data
                })

                data.map((item)=>{
                    var checkIDType = parseInt(item.typeID);
                    var computeIDType = Math.max(checkIDType) +1;
                    this.setState({
                    
                        typeID:computeIDType,
                        roomType:'',
                       
                    })
                    
                    return 'ok'
                })
            })

        }

        
    }

    async handleSubmitType() {
       
        try {
            
            var finddeptID = this.state.feesData;
            var founddeptID = this.state.typeID

            var feesDatapost = {
                
                typeID:`${this.state.typeID}`,
                roomType:`${this.state.roomType}`,
                _id:`${this.state._id}`
                
            }

            if(finddeptID.some(item => item.typeID===founddeptID)){
                alert(this.state.roomType+ " already exist");

                fetch(`${deptUrlType}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        feesData:data
                        
                    })
                    data.map((item)=>{
                        var checkIDType = parseInt(item.typeID);
                        var computeIDType = Math.max(checkIDType) +1;
                        this.setState({
                        
                            typeID:computeIDType,
                            roomType:'',
                           
                        })
                        
                        return 'ok'
                    })
    
                })
                this.myTimer = setTimeout(() => {
                    
                    this.setState({
                        _id:Math.floor(Math.random()*10000),
                       
                        
                    })
                },1000)
               
            }

            else{
                let result = await fetch(`${postdeptType}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        feesDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.roomType+ " Added");
                this.setState({
                    roomType:'',
                    typeID:'',
                    feesData: '',
                    _id:''
                })
                fetch(`${deptUrlType}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        feesData:data
                        
                    })
                    data.map((item)=>{
                        var checkIDType = parseInt(item.typeID);
                        var computeIDType = Math.max(checkIDType) +1;
                        this.setState({
                        
                            typeID:computeIDType
                        
                        })
                        
                        return 'ok'
                    })
    
                })
                this.myTimer = setTimeout(() => {
                    
                    this.setState({
                        _id:Math.floor(Math.random()*10000),
                       
                        
                    })
                },1000)
            }

           
            
        }catch(e) {
            console.log(e)
        }

    }


    async handleSubmit() {
       
        try {
            
            var finddeptID = this.state.roomsData;
            var founddeptID = this.state.roomNumbers

            var NewroomDatapost = {
                roomtypeID:parseInt(`${this.state.floorNumber}`),
                roomtypeName:`${this.state.roomtypeName}`,
                roomNumbers: `${this.state.roomNumbers}`,
                roomRate:`${this.state.roomRate}`,
                floorNumber:`${this.state.floorNumber}`
                
            }

            var NewRoomStatusPost = {
                
                _id:`${this.state.roomNumbers}`,
                roomNumbers: `${this.state.roomNumbers}`,
                roomStatus:`${this.state.roomStatus}`,
                roomtypeName:`${this.state.roomtypeName}`,
                fname:`${this.state.fname}`,
                lname:`${this.state.lname}`,
                status:`${this.state.status}`,
                BillStatus:`${this.state.BillStatus}`
                
            }

            if(finddeptID.some(item => item.roomNumbers===founddeptID)){
                alert(this.state.roomNumbers+ " already exist");

                fetch(`${deptUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        roomsData:data
                        
                    })
                    this.setState({
                        _id:Math.floor(Math.random()*10000),
                        roomtypeName:'',
                        roomRate:'',
                        roomNumbers:'',
                        roomStatus:'green',
                        floorNumber:'',
                        feesData: ''
                    })
                    
    
                })
               
            }
            else if(finddeptID.some(item => item.roomNumbers===founddeptID)){
                alert(this.state.roomNumbers+ " already exist");

                fetch(`${deptUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        roomsData:data
                        
                    })
                    this.setState({
                        _id:Math.floor(Math.random()*10000),
                        roomtypeName:'',
                        roomRate:'',
                        roomNumbers:'',
                        roomStatus:'green',
                        floorNumber:'',
                        feesData: ''
                    })
                        
                       
                    
    
                })
               
            }


            else{
                let result = await fetch(`${postdept}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewroomDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)

                let result2 = await fetch(`${postNewRmStatus}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewRoomStatusPost
                            
                    )
                        
                });
                console.log('result2>  ' + result2)
                alert(this.state.roomNumbers+ " Added");
                this.setState({
                    _id:Math.floor(Math.random()*10000),
                    roomtypeName:'',
                    roomRate:'',
                    roomNumbers:'',
                    roomStatus:'green',
                    floorNumber:'',
                    feesData: '',
                })
                fetch(`${deptUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        roomsData:data
                        
                    })
                    this.setState({
                        _id:Math.floor(Math.random()*10000)
                    })
                })
               
            }

           
            
        }catch(e) {
            console.log(e)
        }

    }

    renderTypeData(data){
        if(data){
            
            return data.map((item)=>{
                data.sort((a, b) => a.typeID - b.typeID);
                if(item.roomType!=='Add New'){
                    return(
                        <>
                        
                            <tr key={item.typeID}>
                                    
                                <td className="table-light table-striped adjust2">{item.typeID}</td>
                                <td className="table-light table-striped adjust2">{item.roomType}</td>
                                <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getRmTypID', item.typeID)} onClick={()=>{this.deletedeptType()}}>Delete</button></td>
                                    
                            </tr>
                        </>
                    )
                    
                    
                }
                else{
                    return(
                        <>
                        
                            <tr key={item.typeID}>
                                    
                                <td> </td>
                                
                                    
                            </tr>
                        </>
                    )
                }
               
                
                
            })
            
        }


    }

    renderRoomTypesData(data){
        if(data) {
           data.sort((a, b) => a.feesName - b.feesName);
            return data.map((item, index) => {
                
                return(
                    <>
                        <option key={index} value={item.roomType}>
                            {item.roomType}
                        </option>
                    </>
                )
                
            })
        }
    }


    renderRoomsData(data){
        if(data){
            
            return data.map((item)=>{
                data.sort((a, b) => a.roomNumbers - b.roomNumbers);
                return(
                    <>
                    
                        <tr key={item._id}>
                                
                            {/* <td key= {item._id} className="table-light table-striped adjust2">{item.roomID}</td> */}
                            <td className="table-light table-striped adjust2">{item.roomtypeName}</td>
                            <td className="table-light table-striped adjust2">{item.roomNumbers}</td>
                            <td className="table-light table-striped adjust2"><NumberFormat value={item.roomRate} thousandSeparator={true} displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2">{item.floorNumber}</td>
                            {/* <td className="table-light table-striped adjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>sessionStorage.setItem('roomsIden',item.roomNumbers)} onClick={()=>{this.editRoomz()}}>Edit</button></td> */}
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getRoomsdelID', item.roomNumbers)} onClick={()=>{this.deleteRoom()}}>Delete</button></td>
                                
                        </tr>
                    </>
                )
                
            })
            
        }


    }
  

    render() {
        console.log (">>> Inside Grpdetails", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Adlogin/>
                </>
            )

        }

        return (
            <>
                <div  className="background990i2">
                    <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Rooms Management</h4>
                        </div>
                        <div className="col-6">
                            <h6 style = {{color:'purple',marginLeft:'480px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                        </div>
                        <div className="col-3">
                            <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                        </div>
                    </div>
                    <h4 style = {{color:'rgb(23, 23, 71)',marginLeft:'50px', marginBottom:'-40px'}}> </h4>

                    <div className="formdesign510b">
                        <div className="container">
                            <div className="row">
                                {/* <div className="col-2">
                                    <p type="text" className="form-control mb-3 formsize51" name="roomID" >{this.state.roomID} </p>
                                </div> */}
                                
                                <div className="col-3">
                                <input type="number" className="form-control mb-3 formsize51" name="roomNumbers" require placeholder="Room Number" value={this.state.roomNumbers} onChange={this.handleChange3}/>
                                </div>

                                <div className="col-3">
                                    <select className="form-select  mb-3 formsize51" name="roomtypeName" onChange={this.handleChange2}>
                                        <option defaultValue=''>Room Types</option>
                                        {this.renderRoomTypesData(this.state.feesData)}
                                    </select>
                                </div>

                                <div className="col-3">
                                <input type="number" className="form-control mb-3 formsize51" name="roomRate" require placeholder="Room Rate" value={this.state.roomRate} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                <input type="number" className="form-control mb-3 formsize51" name="floorNumber" require placeholder="Floor Number" value={this.state.floorNumber} onChange={this.handleChange}/>
                                </div>
                            </div>
                           
                            <center>
                                <br/>
                                <span>
                                    <button disabled={this.state.roomtypeName===''||this.state.roomRate===''||this.state.roomNumbers===''||this.state.floorNumber===''} className="btn btn-warning" onClick={ () => this.handleSubmit()}>Add New Room</button>
                                    {/* <button disabled ={this.state.feesName===''} className="btn btn-warning gap" onClick={()=>this.RoomUpdate()}>Save Update</button> */}
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/settings')}>Close</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                        <div className="container">
                            <table className="table table-hover">
                            
                                <thead className="table-warning">
                                    <tr>
                                        {/* <th className="adjust5">ID</th> */}
                                        <th className="adjust5">Room Name</th>
                                        <th className="adjust5">Room Number</th>
                                        <th className="adjust5">Room Rate</th>
                                        <th className="adjust5">Floor Number</th>
                                        <th className="adjust5">Action</th>
                                        <th className="adjust5"> </th>
                                                
                                    </tr>
                                </thead>
                                <tbody className="table table-hover">
                                    {this.renderRoomsData(this.state.roomsData)}
                                
                                </tbody>
                            </table>
                            <center>
                                <button className="btn btn-danger gap mb-3" onClick={ () => this.props.history.push('/Settings')}>Close</button>
                                <button className="btn btn-danger gap mb-3" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
                            </center>
                        </div>
                    </div>
                </div>
                <Modal open={this.state.edit} onClose={()=>this.onCloseModaledit()}>
                    <div  className="background990i2b5">
                        <div className="row">
                            <div className="col-3">
                                <h6 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Add Room Type</h6>
                            </div>
                            <div className="col-6">
                                <h6 style = {{color:'purple',marginLeft:'480px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                            </div>
                            <div className="col-3">
                                <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                            </div>
                        </div>
                        <h4 style = {{color:'rgb(23, 23, 71)',marginLeft:'50px', marginBottom:'-40px'}}> </h4>

                        <center>
                        <div className="formdesign510b21">
                            <center>
                            <div className="row container">
                                
                                <div className="col-6">
                                    <p type="text" className="form-control mb-3 formsize51" name="typeID" >{this.state.typeID} </p>
                                </div>
                                <div className="col-6">
                                <input type="text" className="form-control mb-3 formsize51" name="roomType" require placeholder="Enter Room Type" value={this.state.roomType} onChange={this.handleChange}/>
                                </div>

                                <center>
                                    <br/>
                                    <span>
                                        <button disabled={this.state.feesName===''||this.state.typeID===''} className="btn btn-warning" onClick={ () => this.handleSubmitType()}>Add Room Type</button>
                                        <button className="btn btn-danger gap" onClick={ () => this.onCloseModaledit()}>Close</button>
                                        
                                    </span>
                                </center>
                            
                                
                            </div>
                            </center>
                            <br/>
                            <div className="container">
                                <table className="table table-hover">
                                
                                    <thead className="table-warning">
                                        <tr>
                                            <th className="adjust5">Type ID</th>
                                            <th className="adjust5">Room Name</th>
                                            <th className="adjust5">Action</th>
                                            <th className="adjust5"> </th>
                                                    
                                        </tr>
                                    </thead>
                                    <tbody className="table table-hover">
                                        {this.renderTypeData(this.state.feesData)}
                                    
                                    </tbody>
                                </table>
                                <center>
                                    <button className="btn btn-danger gap mb-3" onClick={ () => this.onCloseModaledit()}>Close</button>
                                    
                                </center>
                            </div>
                        </div>
                        </center>
                    </div>

                </Modal>
                
            </>
            
        );
    }

    componentDidMount() {
        console.log(">>> Inside GrpDidMount", this.state);

        fetch(`${deptUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                roomsData:data,
                
            })
            
        })

        fetch(`${deptUrlType}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                feesData:data,
                
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



export default RoomSettings;