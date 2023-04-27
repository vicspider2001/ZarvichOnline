import React, { Component } from 'react';
import FLogin from '../FLogin';
import '../Reception/Reception.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const deptUrl= "http://10.1.0.99:3333/pricemanager";
const getdeptID= "http://10.1.0.99:3333/pricemanager?priceID=";
const postdept= "http://10.1.0.99:3333/pricereview";
const putdept= "http://10.1.0.99:3333/editpricereview";
const deldept= "http://10.1.0.99:3333/delpricereview";
const userName = "http://10.1.0.99:3333/fofUserInfo";


class stockPriceManager extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*10000000),
            deptData:'',
            departmentName:'',
            departmentID: '',
            productPrice:'',
            productUnit:'',
            deptIDs:'',
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
        fetch(`${deldept}/${sessionStorage.getItem('getpricerevdelID')}`, {method:'delete'})
        alert("Product Deleted")

        this.myTimer = setTimeout(() => {
            fetch(`${deptUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    deptData:data
                })
                data.map((item)=>{
                    var checkID = parseInt(item.productID);
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
        fetch(`${getdeptID}${sessionStorage.getItem('getpricerevID')}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    departmentID:item.productID,
                    departmentName:item.productName,
                    productPrice:item.productPrice,
                    productUnit:item.productUnit
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

            var deptDatapost = {
                
                productID:`${this.state.departmentID}`,
                productName:`${this.state.departmentName}`,
                productPrice:`${this.state.productPrice}`,
                productUnit:`${this.state.productUnit}`,
                _id:`${this.state._id}`
                
            }

            if(finddeptID.some(item => item.productID===founddeptID)){
                alert(this.state.departmentName+ " already exist");

                fetch(`${deptUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        deptData:data
                        
                    })
                    data.map((item)=>{
                        var checkID = parseInt(item.productID);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                        
                            departmentID:computeID,
                            departmentName:'',
                            productPrice:'',
                            deptIDs:'',
                            productUnit:'',
                            _id:''
                                
                        })
                        
                        return 'ok'
                    })
    
                })
                this.myTimer = setTimeout(() => {
                    
                    this.setState({
                        _id:Math.floor(Math.random()*10000000),
                       
                        
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
                        
                        deptDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.departmentName+" Price Added");
                this.setState({
                    departmentName:'',
                    productPrice:'',
                    deptIDs:'',
                    departmentID: '',
                    productUnit:'',
                    _id:''
                })
                fetch(`${deptUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        deptData:data
                        
                    })
                    data.map((item)=>{
                        var checkID = parseInt(item.productID);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                        
                            departmentID:computeID
                        
                        })
                        
                        return 'ok'
                    })
    
                })
                this.myTimer = setTimeout(() => {
                    
                    this.setState({
                        _id:Math.floor(Math.random()*10000000),
                       
                        
                    })
                },1000)
            }

           
            
        }catch(e) {
            console.log(e)
        }

    }

    async deptUpdate() {
       
        try {
            var id = sessionStorage.getItem('getpricerevID')
           
            var deptUpdated = {
               
                productName:`${this.state.departmentName}`,
                productPrice:`${this.state.productPrice}`,
                productUnit:`${this.state.productUnit}`                
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
            alert(this.state.departmentName+" Price updated");
            this.setState({
                departmentName:'',
                deptIDs:'',
                departmentID: '',
                productPrice:'',
                productUnit:'',
                _id:''
            })

            fetch(`${deptUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    deptData:data
                    
                })
                data.map((item)=>{
                    var checkID = parseInt(item.productID);
                    var computeID = Math.max(checkID) +1;
                    this.setState({
                    
                        departmentID:computeID
                    
                    })
                    return 'ok'
                })

            })
            this.myTimer = setTimeout(() => {
                
                this.setState({
                    _id:Math.floor(Math.random()*10000000),
                    
                    
                })
            },1000)

            
        } catch(e) {
            console.log(e)
        }

    }

    
    renderdeptData(data){
        if(data){
            
            return data.map((item)=>{
                data.sort((a, b) => a.productID - b.productID);
                return(
                    <>
                    
                        <tr key= {item._id}>
                                
                            <td className="table-light table-striped adjust2">{item.productID}</td>
                            <td className="table-light table-striped adjust2">{item.productName}</td>
                            <td className="table-light table-striped adjust2">{item.productUnit}</td>
                            <td className="table-light table-striped adjust2">{item.productPrice}</td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>sessionStorage.setItem('getpricerevID',item.productID)} onClick={()=>{this.editDept()}}>Edit</button></td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getpricerevdelID', item.productID)} onClick={()=>{this.deletedept()}}>Delete</button></td>
                                
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
                <div  className="background990i">
                    <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Price Review </h4>
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
                                <p type="text" className="form-control mb-3 formsize51" name="departmentID" >{this.state.departmentID} </p>
                            </div>
                            <div className="col-3">
                               <input type="text" className="form-control mb-3 formsize51" name="departmentName" require placeholder="Enter Product Name" value={this.state.departmentName} onChange={this.handleChange}/>
                            </div>

                            <div className="col-3">
                               <input type="text" className="form-control mb-3 formsize51" name="productUnit" require placeholder="Enter Product Unit" value={this.state.productUnit} onChange={this.handleChange}/>
                            </div>

                            <div className="col-3">
                               <input type="number" className="form-control mb-3 formsize51" name="productPrice" require placeholder="Enter Product Price" value={this.state.productPrice} onChange={this.handleChange}/>
                            </div>

                            <center>
                            <br/>
                                <span>
                                    <button disabled={this.state.departmentName===''||this.state.productPrice===''} className="btn btn-warning" onClick={ () => this.handleSubmit () } >Add New</button>
                                    <button disabled ={this.state.departmentName===''||this.state.productPrice===''} className="btn btn-warning gap" onClick={()=>this.deptUpdate()}>Save Update</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/storeMenu')}>Close</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                        <div className="container">
                            <table className="table table-hover">
                            
                                <thead className="table-warning">
                                    <tr>
                                        <th className="adjust5">Product ID</th>
                                        <th className="adjust5">Product Name</th>
                                        <th className="adjust5">Product Unit</th>
                                        <th className="adjust5">Product Price</th>
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
                var checkID = parseInt(item.productID);
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



export default stockPriceManager;