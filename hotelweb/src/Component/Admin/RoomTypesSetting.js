import React, { Component } from 'react';
import FLogin from '../FLogin';
import '../Reception/Reception.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const deptUrlType= "http://10.1.0.99:3333/roomTypes";
const postdeptType= "http://10.1.0.99:3333/newRoom";
const deldeptType= "http://10.1.0.99:3333/delRoomType";
const userName = "http://10.1.0.99:3333/fofUserInfo";


class RoomTypesSetting extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*10000),
            feesData:'',
            feesName:'',
            feesID:'',
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

    

    deletedept(){
       
        fetch(`${deldeptType}/${sessionStorage.getItem('getRoomTypeID')}`, {method:'delete'})
        alert("Room Type Deleted")
            this.setState({
            feesName:'',
            feesID:'',
            feesRate:0,
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
                    var checkID = parseInt(item.feesID);
                    var computeID = Math.max(checkID) +1;
                    this.setState({
                    
                        feesID:computeID
                    
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
    

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    async handleSubmitType() {
       
        try {
            
            var finddeptID = this.state.feesData;
            var founddeptID = this.state.feesID

            var feesDatapost = {
                
                feesID:`${this.state.feesID}`,
                feesName:`${this.state.feesName}`,
                _id:`${this.state._id}`
                
            }

            if(finddeptID.some(item => item.feesID===founddeptID)){
                alert(this.state.feesName+ " already exist");

                fetch(`${deptUrlType}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        feesData:data
                        
                    })
                    data.map((item)=>{
                        var checkID = parseInt(item.feesID);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                        
                            feesID:computeID,
                            feesName:'',
                            feesRate:0
        
                        
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
                alert(this.state.feesName+ " Added");
                this.setState({
                    feesName:'',
                    feesIDs:'',
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
                        var checkID = parseInt(item.feesID);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                        
                            feesID:computeID
                        
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
    
    renderTypeData(data){
        if(data){
            
            return data.map((item)=>{
                data.sort((a, b) => a.feesID - b.feesID);
                return(
                    <>
                    
                        <tr>
                                
                            <td key= {item._id} className="table-light table-striped adjust2">{item.feesID}</td>
                            <td key= {item._id} className="table-light table-striped adjust2">{item.feesName}</td>
                            <td key= {item._id} className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getRoomTypeID', item.feesID)} onClick={()=>{this.deletedept()}}>Delete</button></td>
                                
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
                    <FLogin/>
                </>
            )

        }

        return (
            <>
                <div  className="background990i2">
                    <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Add Room Type</h4>
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
                        <div className="row container">
                            
                            <div className="col-4">
                                <p type="text" className="form-control mb-3 formsize51" name="feesID" >{this.state.feesID} </p>
                            </div>
                            <div className="col-4">
                               <input type="text" className="form-control mb-3 formsize51" name="feesName" require placeholder="Enter Room Type" value={this.state.feesName} onChange={this.handleChange}/>
                            </div>

                            <center>
                                <br/>
                                <span>
                                    <button disabled={this.state.feesName===''||this.state.feesID===''} className="btn btn-warning" onClick={ () => this.handleSubmitType()}>Add Room Type</button>
                                    <button disabled ={this.state.feesName===''} className="btn btn-warning gap" onClick={()=>this.feesUpdate()}>Save Update</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/settings')}>Close</button>
                                    <button className="btn btn-danger gap" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                        <div className="container">
                            <table className="table table-hover">
                            
                                <thead className="table-warning">
                                    <tr>
                                        <th className="adjust5">Levy ID</th>
                                        <th className="adjust5">Levy Name</th>
                                        <th className="adjust5">Action</th>
                                        <th className="adjust5"> </th>
                                                
                                    </tr>
                                </thead>
                                <tbody className="table table-hover">
                                    {this.renderTypeData(this.state.feesData)}
                                
                                </tbody>
                            </table>
                            <center><button className="btn btn-danger gap mb-3" onClick={ () => this.props.history.push('/Settings')}>Close</button></center>
                        </div>
                    </div>
                    </center>
                </div>
                
            </>
            
        );
    }

    componentDidMount() {
        console.log(">>> Inside GrpDidMount", this.state);

        fetch(`${deptUrlType}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                feesData:data,
            

            })
            data.map((item)=>{
                var checkID = parseInt(item.feesID);
                var computeID = Math.max(checkID) +1;
                this.setState({
                
                    feesID:computeID
                
                })
                return 'ok'
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



export default RoomTypesSetting;