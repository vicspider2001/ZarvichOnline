import React, { Component } from 'react';
import Storelogin from '../Storelogin';
import '../Reception/Reception.css';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';


const deptUrl= "http://10.1.0.99:3333/vendors";
const getdeptID= "http://10.1.0.99:3333/vendors?venid=";
const postdept= "http://10.1.0.99:3333/addVendor";
const putdept= "http://10.1.0.99:3333/editVendor";
const deldept= "http://10.1.0.99:3333/delvendor";
const userName = "http://10.1.0.99:3333/storeUserInfo";


class productVendor extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*10000),
            deptData:'',
            departmentName:'',
            departmentID: '',
            deptIDs:'',
            address:'',
            phone:'',
            email:'',
            productDescription:'',
            dateRegistered:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''
            
        };
        this.checkinhandleChange = this.checkinhandleChange.bind(this);
        

    }

    checkinhandleChange(date) {
        this.setState({
            dateRegistered: date
        });
    }

    rendercheckinDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.dateRegistered}
                    onChange={this.checkinhandleChange}
                    minDate={new Date()}
                    maxDate={addDays(new Date(),1)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    placeholderText="Registration Date"
                    className="form-control mb-3 formsize51"
                    
                />
            </div>
        )
    }
    
   

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    

    deletedept(){
        fetch(`${deldept}/${sessionStorage.getItem('getvendelID')}`, {method:'delete'})
        alert("Vendor Deleted")

        this.myTimer = setTimeout(() => {
            fetch(`${deptUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    deptData:data
                })
                data.map((item)=>{
                    var checkID = parseInt(item.vendorID);
                    var computeID = Math.max(checkID) +1;
                    this.setState({
                    
                        departmentID:computeID
                    
                    })
                    
                    return 'ok'
                })
                
            })
           
        },1000)
    }
    

    editDept(){
       
        fetch(`${getdeptID}${sessionStorage.getItem('getvenID')}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item)=>{
                
                this.setState({
                    departmentID:item.vendorID,
                    departmentName:item.vendorName,
                    address:item.address,
                    phone:item.phone,
                    email:item.email,
                    productDescription:item.productDescription,
                    dateRegistered:new Date(item.dateRegistered)

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
            
            var finddeptID = this.state.deptData;
            var founddeptID = this.state.departmentID
            
           

            var vendDatapost = {
                
                vendorID:`${this.state.departmentID}`,
                vendorName:`${this.state.departmentName}`,
                _id:`${this.state._id}`,
                address:`${this.state.address}`,
                phone:`${this.state.phone}`,
                email:`${this.state.email}`,
                productDescription:`${this.state.productDescription}`,
                dateRegistered:`${this.state.dateRegistered}`
                
            }

            if(finddeptID.some(item => item.vendorID===founddeptID)){
                alert('Vendor already exist');

                fetch(`${deptUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        deptData:data
                        
                    })
                    data.map((item)=>{
                        var checkID = parseInt(item.vendorID);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                        
                            departmentID:computeID,
                            departmentName:'',
                            _id:'',
                            address:'',
                            phone:'',
                            email:'',
                            productDescription:'',
                            dateRegistered:''
                        
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
                        
                        vendDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert("Vendor Added");
                this.setState({
                    departmentName:'',
                    deptIDs:'',
                    departmentID: '',
                    _id:'',
                    address:'',
                    phone:'',
                    email:'',
                    productDescription:'',
                    dateRegistered:''
                })
                fetch(`${deptUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        deptData:data
                        
                    })
                    data.map((item)=>{
                        var checkID = parseInt(item.vendorID);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                        
                            departmentID:computeID
                        
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

    async deptUpdate() {
       
        try {
            var id = sessionStorage.getItem('getvenID')
           
            var deptUpdated = {
               
                vendorName:`${this.state.departmentName}`,
                address:`${this.state.address}`,
                phone:`${this.state.phone}`,
                email:`${this.state.email}`,
                productDescription:`${this.state.productDescription}`,
                dateRegistered:`${this.state.dateRegistered}`
                
            }
            let result = await fetch(`${putdept}/${id}`, {
                method: 'put',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    deptUpdated
                        
                )
                    
            });
            console.log('result>  ' + result)
            this.setState({
                departmentName:'',
                deptIDs:'',
                departmentID: '',
                _id:'',
                address:'',
                phone:'',
                email:'',
                productDescription:'',
                dateRegistered:''

            })

            fetch(`${deptUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    deptData:data
                    
                })
                data.map((item)=>{
                    var checkID = parseInt(item.vendorID);
                    var computeID = Math.max(checkID) +1;
                    this.setState({
                    
                        departmentID:computeID
                    
                    })
                    return 'ok'
                })

            })
            this.myTimer = setTimeout(() => {
                
                this.setState({
                    _id:Math.floor(Math.random()*10000),
                    
                    
                })
            },1000)

            alert("Vendor Data Updated");
           
            
        } catch(e) {
            console.log(e)
        }

    }

    renderdeptData(data){
        if(data){
            
            return data.map((item)=>{
                data.sort((a, b) => a.vendorID - b.vendorID);
                var venregDate = moment(item.dateRegistered).format('MMM DD YYYY')
                return(
                    <>
                    
                        <tr key= {item._id}>
                                
                            <td className="table-light table-striped adjust2">{item.vendorID}</td>
                            <td className="table-light table-striped adjust2">{item.vendorName}</td>
                            <td className="table-light table-striped adjust2">{item.address}</td>
                            <td className="table-light table-striped adjust2">{item.phone}</td>
                            <td className="table-light table-striped adjust2">{item.email}</td>
                            <td className="table-light table-striped adjust2">{item.productDescription}</td>
                            <td className="table-light table-striped adjust2">{venregDate}</td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>sessionStorage.setItem('getvenID',item.vendorID)} onClick={()=>{this.editDept()}}>Edit</button></td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getvendelID',item.vendorID)} onClick={()=>{this.deletedept()}}>Delete</button></td>
                                
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
                    <Storelogin/>
                </>
            )

        }

        return (
            <>
                <div  className="background990i">
                    <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Vendors Management</h4>
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
                            
                            <div className="col-3">
                                <p type="text" className="form-control mb-3 formsize51" name="departmentID">{this.state.departmentID} </p>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <input type="text" className="form-control mb-3 formsize51" name="departmentName" require placeholder="Name" value={this.state.departmentName} onChange={this.handleChange}/>
                                </div>
                                <div className="col-4">
                                    <textarea row="4" className="form-control mb-3 formsize51" name="address" require placeholder="Address" value={this.state.address} onChange={this.handleChange}/>
                                </div>
                                <div className="col-4">
                                    <input type="number" className="form-control mb-3 formsize51" name="phone" require placeholder="Phone" value={this.state.phone} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <input type="email" className="form-control mb-3 formsize51" name="email" require placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                                </div>
                                <div className="col-4">
                                    <input type="text" className="form-control mb-3 formsize51" name="productDescription" require placeholder="Description" value={this.state.productDescription} onChange={this.handleChange}/>
                                </div>
                                <div className="col-4">
                                    <label>
                                        {this.rendercheckinDate(this.state.dateRegistered)}
                                    </label>
                                </div>
                            </div>
                            

                            <center>
                            <br/>
                                <span>
                                    <button disabled={this.state.departmentName===''} className="btn btn-warning" onClick={ () => this.handleSubmit () } >Add New</button>
                                    <button disabled ={this.state.departmentName===''} className="btn btn-warning gap" onClick={()=>this.deptUpdate()}>Save Update</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/storeMenu')}>Close</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                        <div className="container">
                            <table className="table table-hover">
                            
                                <thead className="table-warning">
                                    <tr>
                                        <th className="adjust5">ID</th>
                                        <th className="adjust5">Name</th>
                                        <th className="adjust5">Address</th>
                                        <th className="adjust5">Phone</th>
                                        <th className="adjust5">Email</th>
                                        <th className="adjust5">Product Description</th>
                                        <th className="adjust5">Date Registered</th>
                                        <th className="adjust5">Action</th>
                                        <th className="adjust5"> </th>
                                                
                                    </tr>
                                </thead>
                                <tbody className="table table-hover">
                                    {this.renderdeptData(this.state.deptData)}
                                
                                </tbody>
                            </table>
                            <center><button className="btn btn-danger gap mb-3" onClick={ () => this.props.history.push('/storeMenu')}>Close</button></center>
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
                deptData:data,
            

            })
            data.map((item)=>{
                var checkID = parseInt(item.vendorID);
                var computeID = Math.max(checkID) +1;
                this.setState({
                
                    departmentID:computeID
                
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



export default productVendor;