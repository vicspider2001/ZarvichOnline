import React, { Component } from 'react';
import Adlogin from '../Adlogin';
import '../Reception/Reception.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const deptUrl= "http://10.1.0.99:3333/feesAndCharges";
const getdeptID= "http://10.1.0.99:3333/feesAndCharges?fID=";
const postdept= "http://10.1.0.99:3333/postFees";
const putdept= "http://10.1.0.99:3333/editfees";
const deldept= "http://10.1.0.99:3333/delFee";
const userName = "http://10.1.0.99:3333/adminUserInfo";


class RegFormSettings extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*10000),
            feesData:'',
            feesName:'',
            feeAmount: 0,
            feesRate:0,
            feesID:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            getfeesID:''
            
        }

    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    

    deletedept(){
       
        fetch(`${deldept}/${sessionStorage.getItem('getfeesdelID')}`, {method:'delete'})
        alert("Levy Deleted")
            this.setState({
            feesName:'',
            feesID:'',
            feesRate:0,
            feesData:'',
            _id:''
        })
        this.myTimer = setTimeout(() => {
            fetch(`${deptUrl}`, {method:'GET'})
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
    

    editDept(){
        var toNum = parseInt(sessionStorage.getItem('feesID'))
        fetch(`${getdeptID}${toNum}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    feesID:item.feesID,
                    feesName:item.feesName,
                    feesRate:item.feesRate
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

   
    async handleSubmit() {
       
        try {
            
            var finddeptID = this.state.feesData;
            var founddeptID = this.state.feesID

            var feesDatapost = {
                
                feesID:`${this.state.feesID}`,
                feesName:`${this.state.feesName}`,
                feesRate:`${this.state.feesRate}`,
                _id:`${this.state._id}`
                
            }

            if(finddeptID.some(item => item.feesID===founddeptID)){
                alert(this.state.feesName+ " already exist");

                fetch(`${deptUrl}`, {method:'GET'})
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
                let result = await fetch(`${postdept}`, {
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
                    feesRate:0,
                    feesData: '',
                    _id:''
                })
                fetch(`${deptUrl}`, {method:'GET'})
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

    async feesUpdate() {
       
        try {
            var id = this.state.feesID;
           
            var levyUpdated = {

                _id:`${this.state._id}`,
                feesName:`${this.state.feesName}`,
                feesRate:`${this.state.feesRate}`,
                feesID:`${this.state.feesID}`
               
                
            }
            let result = await fetch(`${putdept}/${id}`, {
                method: 'put',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    levyUpdated
                        
                )
                    
            });
            console.log('result>  ' + result)
            alert(this.state.feesName+ " Updated");
            this.setState({
                feesName:'',
                feesID:'',
                feesData: '',
                feesRate:0,
                _id:''
            })

            fetch(`${deptUrl}`, {method:'GET'})
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

            
        } catch(e) {
            console.log(e)
        }

    }

    renderfeesData(data){
        if(data){
            
            return data.map((item)=>{
                data.sort((a, b) => a.feesID - b.feesID);
                return(
                    <>
                    
                        <tr key= {item._id}>
                                
                            <td className="table-light table-striped adjust2">{item.feesID}</td>
                            <td className="table-light table-striped adjust2">{item.feesName}</td>
                            <td className="table-light table-striped adjust2">{item.feesRate}</td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>sessionStorage.setItem('feesID',item.feesID)} onClick={()=>{this.editDept()}}>Edit</button></td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getfeesdelID', item.feesID)} onClick={()=>{this.deletedept()}}>Delete</button></td>
                                
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
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Hospitality Levies</h4>
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
                        <div className="row container">
                            
                            <div className="col-4">
                                <p type="text" className="form-control mb-3 formsize51" name="feesID" >{this.state.feesID} </p>
                            </div>
                            <div className="col-4">
                               <input type="text" className="form-control mb-3 formsize51" name="feesName" require placeholder="Enter Levy Name" value={this.state.feesName} onChange={this.handleChange}/>
                            </div>

                            <div className="col-4">
                               <input type="text" className="form-control mb-3 formsize51" name="feesRate" require placeholder="Enter Levy Name" value={this.state.feesRate} onChange={this.handleChange}/>
                            </div>

                            <center>
                                <br/>
                                <span>
                                    <button disabled={this.state.feesName===''||this.state.feesRate===0} className="btn btn-warning" onClick={ () => this.handleSubmit()}>Add New Levy</button>
                                    <button disabled ={this.state.feesName===''} className="btn btn-warning gap" onClick={()=>this.feesUpdate()}>Save Update</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/settings')}>Close</button>
                                    
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
                                        <th className="adjust5">Levy Rate</th>
                                        <th className="adjust5">Action</th>
                                        <th className="adjust5"> </th>
                                                
                                    </tr>
                                </thead>
                                <tbody className="table table-hover">
                                    {this.renderfeesData(this.state.feesData)}
                                
                                </tbody>
                            </table>
                            <center>
                                <button className="btn btn-danger gap mb-3" onClick={ () => this.props.history.push('/Settings')}>Close</button>
                                <button className="btn btn-success mb-3 gap " onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
                            </center>
                        </div>
                    </div>
                </div>
                
            </>
            
        );
    }

    componentDidMount() {
        console.log(">>> Inside GrpDidMount", this.state);

        fetch(`${deptUrl}`, {method:'GET'})
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



export default RegFormSettings;