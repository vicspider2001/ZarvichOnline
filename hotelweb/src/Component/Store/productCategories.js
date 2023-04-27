import React, { Component } from 'react';
import Storelogin from '../Storelogin';
import '../Reception/Reception.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const deptUrl= "http://10.1.0.99:3333/storeTypes";
const getdeptID= "http://10.1.0.99:3333/storeTypes?catID=";
const postdept= "http://10.1.0.99:3333/storeTypePost";
const putdept= "http://10.1.0.99:3333/editcategory";
const deldept= "http://10.1.0.99:3333/delcategory";
const userName = "http://10.1.0.99:3333/storeUserInfo";


class productCategories extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*10000),
            deptData:'',
            departmentName:'',
            departmentID: '',
            categoryCode:'',
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
        fetch(`${deldept}/${sessionStorage.getItem('getcatdelID')}`, {method:'delete'})
        alert("Category Deleted")

        this.myTimer = setTimeout(() => {
            fetch(`${deptUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    deptData:data
                })
                data.map((item)=>{
                    var checkID = parseInt(item.catgoryID);
                    var computeID = Math.max(checkID) +1;
                    var checkID2 = parseInt(item.categoryCode);
                    var computeID2 = Math.max(checkID2) +100000;
                    this.setState({
                    
                        departmentID:computeID,
                        categoryCode:computeID2
                    
                    })
                    
                    return 'ok'
                })
                
            })
           
        },1000)
    }
    

    editDept(){
        fetch(`${getdeptID}${sessionStorage.getItem('getcatID')}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    departmentID:item.catgoryID,
                    departmentName:item.categoryName,
                    categoryCode:item.categoryCode
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
                
                catgoryID:`${this.state.departmentID}`,
                categoryName:`${this.state.departmentName}`,
                categoryCode:`${this.state.categoryCode}`,
                _id:`${this.state._id}`
                
            }

            if(finddeptID.some(item => item.departmentID===founddeptID)){
                alert(this.state.departmentName+ " already exist");

                fetch(`${deptUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        deptData:data
                        
                    })
                    data.map((item)=>{
                        var checkID = parseInt(item.catgoryID);
                        var computeID = Math.max(checkID) +1;
                        var checkID2 = parseInt(item.categoryCode);
                        var computeID2 = Math.max(checkID2) +100000;
                        this.setState({
                        
                            departmentID:computeID,
                            categoryCode:computeID2,
                            departmentName:''
                        
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
                        
                        deptDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.departmentName+ " Added");
                this.setState({
                    departmentName:'',
                    deptIDs:'',
                    departmentID: '',
                    categoryCode:'',
                    _id:''
                })
                fetch(`${deptUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        deptData:data
                        
                    })
                    data.map((item)=>{
                        var checkID = parseInt(item.catgoryID);
                        var computeID = Math.max(checkID) +1;
                        var checkID2 = parseInt(item.categoryCode);
                        var computeID2 = Math.max(checkID2) +100000;
                        this.setState({
                        
                            departmentID:computeID,
                            categoryCode:computeID2
                        
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
            var id = sessionStorage.getItem('getcatID')
           
            var deptUpdated = {
               
                categoryName:`${this.state.departmentName}`,
                categoryCode:`${this.state.categoryCode}`
                
                
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
            alert(this.state.departmentName+ " Updated");
            this.setState({
                departmentName:'',
                deptIDs:'',
                departmentID: '',
                categoryCode:'',
                _id:''
            })

            fetch(`${deptUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    deptData:data
                    
                })
                data.map((item)=>{
                    var checkID = parseInt(item.catgoryID);
                    var computeID = Math.max(checkID) +1;
                    var checkID2 = parseInt(item.categoryCode);
                    var computeID2 = Math.max(checkID2) +100000;
                    this.setState({
                    
                        departmentID:computeID,
                        categoryCode:computeID2
                    
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

    renderdeptData(data){
        if(data){
            
            return data.map((item)=>{
                data.sort((a, b) => a.catgoryID - b.catgoryID);
                
                return(
                    <>
                    
                        <tr key= {item._id}>
                                
                            <td className="table-light table-striped adjust2">{item.catgoryID}</td>
                            <td className="table-light table-striped adjust2">{item.categoryCode}</td>
                            <td className="table-light table-striped adjust2">{item.categoryName}</td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>sessionStorage.setItem('getcatID',item.catgoryID)} onClick={()=>{this.editDept()}}>Edit</button></td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getcatdelID',item.catgoryID)} onClick={()=>{this.deletedept()}}>Delete</button></td>
                                
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
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Store Categories</h4>
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
                                <p type="text" className="form-control mb-3 formsize51" name="departmentID">{this.state.departmentID} </p>
                            </div>
                            <div className="col-4">
                                <p type="text" className="form-control mb-3 formsize51" name="categoryCode">{this.state.categoryCode} </p>
                            </div>
                            <div className="col-4">
                               <input type="text" className="form-control mb-3 formsize51" name="departmentName" require placeholder="Category Name" value={this.state.departmentName} onChange={this.handleChange}/>
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
                                        <th className="adjust5">Category ID</th>
                                        <th className="adjust5">Category Code</th>
                                        <th className="adjust5">Category Name</th>
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
                var checkID = parseInt(item.catgoryID);
                var computeID = Math.max(checkID) +1;
                var checkID2 = parseInt(item.categoryCode);
                var computeID2 = Math.max(checkID2) +100000;
                this.setState({
                
                    departmentID:computeID,
                    categoryCode:computeID2
                
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



export default productCategories;