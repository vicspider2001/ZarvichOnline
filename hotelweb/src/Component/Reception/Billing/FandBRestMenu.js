import React, { Component } from 'react';
import Storelogin from '../../Storelogin';
import '../Reception.css';
import {Modal} from 'react-responsive-modal';
import NumberFormat from 'react-number-format';
import 'bootstrap/dist/css/bootstrap.min.css';


const menuCategoryUrl = "http://10.1.0.99:3333/menuCategories?findID=";
const AvailableMenu = "http://10.1.0.99:3333/menuitems?mealtypes=";
const deleteMenuUrl = "http://10.1.0.99:3333/restaurantMenus";
const delCategory = "http://10.1.0.99:3333/delCat";
const postMenu = "http://10.1.0.99:3333/postRestMenu";
const postCat = "http://10.1.0.99:3333/postCategory";

const userName = "http://10.1.0.99:3333/fandbUserInfo";

class FandBRestMenu extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:0,
            MenuCategoryData:'',
            mealType:'',
            mealTypeID:'',
            mealName:'',
            menuData:'',
            mealPrice:'',
            category:'',

            edit:false,
            catmealTypeID:0,
            catmealType:'',

            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''

            
        }

    }

    onCloseModaledit(){
        this.setState({
            edit: false,
            
        })
        
    }

    onOpenModaledit(){
        this.setState({
            _id:0,
            MenuCategoryData:'',
            mealType:'',
            mealTypeID:'',
            mealName:'',
            menuData:'',
            mealPrice:'',
            category:'',
            edit:true
        })

        fetch(`${menuCategoryUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {

            this.setState({MenuCategoryData:data})

            data.map((item)=>{
                var checkIDType = parseInt(item.mealTypeID);
                var computeIDType = Math.max(checkIDType) +1;
                this.setState({
                    catmealTypeID:computeIDType,
                })
                
                return 'ok'
            })
        })
        
    }

    renderMenu=(data)=>{
        if(data){
            return data.map((item)=>{
                data.sort((a, b) => a.mealType - b.mealType);
                return(
                    <>
                        <option key={item._id} value={item.mealType}>
                            {item.mealType}

                        </option>
                    </>
                )
            })
        }
    }

    renderMenuData(data){
        if(data){
            
            return data.map((item)=>{
                data.sort((a, b) => a.mealName - b.mealName);
                return(
                    <>
                    
                        <tr key={item._id}>
                                
                            {/* <td key= {item._id} className="table-light table-striped adjust2">{item.roomID}</td> */}
                            <td className="table-light table-striped adjust2">{item.mealType}</td>
                            <td className="table-light table-striped adjust2">{item.mealName}</td>
                            <td className="table-light table-striped adjust2"><NumberFormat value={item.mealPrice} thousandSeparator={true} displayType={"text"}/></td>
                            {/* <td className="table-light table-striped adjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>sessionStorage.setItem('roomsIden',item.roomNumbers)} onClick={()=>{this.editRoomz()}}>Edit</button></td> */}
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getMenuID', item._id)} onClick={()=>this.deleteNow()}>Delete</button></td>
                                
                        </tr>
                    </>
                )
                
            })
            
        }


    }

    renderCatData(data){
        if(data){
            
            return data.map((item)=>{
                data.sort((a, b) => a.mealType - b.mealType);
                return(
                    <>
                    
                        <tr key={item._id}>
                                
                            {/* <td key= {item._id} className="table-light table-striped adjust2">{item.roomID}</td> */}
                            <td className="table-light table-striped adjust2">{item.mealTypeID}</td>
                            <td className="table-light table-striped adjust2">{item.mealType}</td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getCatID', item.mealTypeID)} onClick={()=>this.deleteCatNow()}>Delete</button></td>
                                
                        </tr>
                    </>
                )
                
            })
            
        }


    }
   

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }


    handleChange1 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        fetch(`${menuCategoryUrl}${event.target.value}`, {method: 'GET'})
        .then ((res) => res.json())
        .then ((data) => {
            data.map((item) => {
                this.setState({mealTypeID:item.mealTypeID})
                fetch(`${AvailableMenu}${item.mealTypeID}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        menuData:data,
                
                    })
                })
                
                return 'ok'
            })
        
        })
        

        
        
    }

    handleChange5=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })

        var finddeptID = this.state.menuData;
        var founddeptID = event.target.value;

        if(finddeptID.some(item => item.mealName===founddeptID)){
            alert("Product already registered");
            this.setState({
                _id:0,
                MenuCategoryData:'',
                mealType:'',
                mealTypeID:'',
                mealName:'',
                menuData:'',
                mealPrice:'',
                category:''
                    
            })

            fetch(`${menuCategoryUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    MenuCategoryData:data,
                    
                })
            })

            fetch(`${AvailableMenu}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
               
                data.map((item)=>{
                    var restMenuID = parseInt(item._id);
                    var comprestMenuID = Math.max(restMenuID) +1;
                    this.setState({
                    
                        _id:comprestMenuID,
                        
                    })
                    return 'ok'
                })
            
            })
        }
        
    }

    handleChange6=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })

        var finddeptID = this.state.MenuCategoryData;
        var founddeptID = event.target.value;

        if(finddeptID.some(item => item.mealType===founddeptID)){
            alert("Product already registered");
            this.setState({
                catmealTypeID:0,
                catmealType:''
                    
            })

            fetch(`${menuCategoryUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    MenuCategoryData:data,
                    
                })
                
                data.map((item)=>{
                    var checkIDType = parseInt(item.mealTypeID);
                    var computeIDType = Math.max(checkIDType) +1;
                    this.setState({
                        catmealTypeID:computeIDType,
                    })
                    
                    return 'ok'
                })
            })

           
        }
        
    }

    deleteNow(){
       
        fetch(`${deleteMenuUrl}/${sessionStorage.getItem('getMenuID')}`, {method:'delete'})
        alert("Item Deleted")
        this.setState({
            _id:0,
            MenuCategoryData:'',
            mealType:'',
            mealTypeID:'',
            mealName:'',
            menuData:'',
            mealPrice:'',
            category:''
        })
        this.myTimer = setTimeout(() => {
            fetch(`${menuCategoryUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    MenuCategoryData:data,
                    
                })
            })

            fetch(`${AvailableMenu}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                
                data.map((item)=>{
                    var restMenuID = parseInt(item._id);
                    var comprestMenuID = Math.max(restMenuID) +1;
                    this.setState({
                    
                        _id:comprestMenuID,
                        
                    })
                    return 'ok'
                })
            
            })
           
        },1000)
               
    }

    deleteCatNow(){
       
        fetch(`${delCategory}/${sessionStorage.getItem('getCatID')}`, {method:'delete'})
        alert("Category Deleted")
        this.setState({
            catmealTypeID:0,
            catmealType:'',
        })

        fetch(`${menuCategoryUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {

            this.setState({MenuCategoryData:data})

            data.map((item)=>{
                var checkIDType = parseInt(item.mealTypeID);
                var computeIDType = Math.max(checkIDType) +1;
                this.setState({
                    catmealTypeID:computeIDType,
                })
                
                return 'ok'
            })
        })
               
    }


    async handleSubmit() {
       
        try {
            
            var finddeptID = this.state.menuData;
            var founddeptID = this.state.mealName;

            var restMenuPost = {
                
                _id:`${this.state._id}`,
                mealTypeID:parseInt(`${this.state.mealTypeID}`),
                mealName:`${this.state.mealName}`,
                mealPrice:`${this.state.mealPrice}`,
                mealQt: 1,
                mealType:`${this.state.mealType}`,
                categoryID:parseInt(`${this.state.mealTypeID}`),
                category:`${this.state.category}`
                
            }

            
            if(finddeptID.some(item => item.mealName===founddeptID)){
                alert("Product already registered");
                this.setState({
                    
                    mealTypeID:'',
                    mealName:'',
                    mealType:'',
                    MenuCategoryData:'',
                    menuData:'',
                        
                })
    
                fetch(`${menuCategoryUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        MenuCategoryData:data,
                        
                    })
                })
    
                fetch(`${AvailableMenu}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    
                    data.map((item)=>{
                        var restMenuID = parseInt(item._id);
                        var comprestMenuID = Math.max(restMenuID) +1;
                        this.setState({
                        
                            _id:comprestMenuID,
                            
                        })
                        return 'ok'
                    })
                
                })
               
            }

            else{
                let result = await fetch(`${postMenu}`, {
                    
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        restMenuPost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                                
                alert(this.state.mealName+" Added");
                this.setState({
                    
                    mealTypeID:'',
                    mealName:'',
                    mealType:'',
                    MenuCategoryData:'',
                    menuData:'',
                        
                })
    
                fetch(`${menuCategoryUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        MenuCategoryData:data,
                        
                    })
                })
    
                fetch(`${AvailableMenu}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                   
                    data.map((item)=>{
                        var restMenuID = parseInt(item._id);
                        var comprestMenuID = Math.max(restMenuID) +1;
                        this.setState({
                        
                            _id:comprestMenuID,
                            
                        })
                        return 'ok'
                    })
                
                })

            }

            
        }catch(e) {
            console.log(e)
        }

    }

    async handleSubmitCat() {
       
        try {
            
            var finddeptID = this.state.MenuCategoryData;
            var founddeptID = this.state.catmealType;

            var restMenuPost = {
                
                mealTypeID:parseInt(`${this.state.catmealTypeID}`),
                mealType:`${this.state.catmealType}`,
                                
            }

            
            if(finddeptID.some(item => item.mealType===founddeptID)){
                alert("Product already registered");
                this.setState({
                    
                    catmealTypeID:0,
                    catmealType:''
                    
                        
                })
    
                fetch(`${menuCategoryUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        MenuCategoryData:data,
                        
                    })
                    data.map((item)=>{
                        var checkIDType = parseInt(item.mealTypeID);
                        var computeIDType = Math.max(checkIDType) +1;
                        this.setState({
                            catmealTypeID:computeIDType,
                        })
                        
                        return 'ok'
                    })
                })
    
                
            }

            else{
                let result = await fetch(`${postCat}`, {
                    
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        restMenuPost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                                
                alert(this.state.catmealType+" Added");
                this.setState({
                    
                    catmealType:'',
                    catmealTypeID:0,
                    MenuCategoryData:'',
                    menuData:'',
                        
                })
    
                fetch(`${menuCategoryUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        MenuCategoryData:data,
                        
                    })

                    fetch(`${menuCategoryUrl}`, {method:'GET'})
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            MenuCategoryData:data,
                            
                        })
                        data.map((item)=>{
                            var checkIDType = parseInt(item.mealTypeID);
                            var computeIDType = Math.max(checkIDType) +1;
                            this.setState({
                                catmealTypeID:computeIDType,
                            })
                            
                            return 'ok'
                        })
                    })
                })
    
                

            }

            
        }catch(e) {
            console.log(e)
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
                <div  className="background990i2Menu">
                    <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Restaurant Menu</h4>
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
                                <div className='col-3'>
                                    <select className="form-select  mb-3 formsize51" name="mealType" onChange={this.handleChange1}>
                                        <option defaultValue=''>Select Category</option>
                                        {this.renderMenu(this.state.MenuCategoryData)}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.mealTypeID}</p>
                                </div>

                                <div className="col-3">
                                    <input type="text" disabled={this.state.mealType===''} className="form-control mb-3 formsize51" name="mealName" require placeholder="Enter Name" value={this.state.mealName} onChange={this.handleChange5}/>
                                </div>

                                <div className="col-3">
                                    <input type="number" disabled={this.state.mealName===''} className="form-control mb-3 formsize51" name="mealPrice" require placeholder="Enter Selling Price" value={this.state.mealPrice} onChange={this.handleChange}/>
                                </div>
                                
                            </div>
                           
                            <center>
                                <br/>
                                <span>
                                    <button disabled={this.state.mealType===''||this.state.mealName===''||this.state.mealTypeID===''||this.state.mealPrice===''} className="btn btn-warning" onClick={ () => this.handleSubmit()}>Add New</button>
                                    <button className="btn btn-primary gap" onClick={ () => this.onOpenModaledit()}>Add New Category</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/FandBMenu')}>Close</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                        <div className="container">
                            <table className="table table-hover">
                            
                                <thead className="table-warning">
                                    <tr>
                                        {/* <th className="adjust5">ID</th> */}
                                        <th className="adjust5">Meal Type</th>
                                        <th className="adjust5">Meal Name</th>
                                        <th className="adjust5">Meal Price</th>
                                        <th className="adjust5">Action</th>
                                       
                                                
                                    </tr>
                                </thead>
                                <tbody className="table table-hover">
                                    {this.renderMenuData(this.state.menuData)}
                                
                                </tbody>
                            </table>
                            <center><button className="btn btn-danger gap mb-3" onClick={ () => this.props.history.push('/FandBMenu')}>Close</button></center>
                        </div>
                    </div>
                </div>

                <Modal open={this.state.edit} onClose={()=>this.onCloseModaledit()}>
                    <div  className="background990i2b5">
                        <div className="row">
                            <div className="col-6">
                                <h6 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Add New Category</h6>
                            </div>
                            {/* <div className="col-6">
                                <h6 style = {{color:'purple',marginLeft:'480px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                            </div>
                            <div className="col-3">
                                <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                            </div> */}
                        </div>
                        <h4 style = {{color:'rgb(23, 23, 71)',marginLeft:'50px', marginBottom:'-40px'}}> </h4>

                        <center>
                        <div className="formdesign510b21Cat">
                            <center>
                            <div className="row container">
                                
                                <div className="col-6">
                                    <p type="text" className="form-control mb-3 formsize51" name="catmealTypeID" >{this.state.catmealTypeID} </p>
                                </div>
                                <div className="col-6">
                                <input type="text" className="form-control mb-3 formsize51" name="catmealType" require placeholder="Enter Meal Category" value={this.state.catmealType} onChange={this.handleChange6}/>
                                </div>

                                <center>
                                    <br/>
                                    <span>
                                        <button disabled={this.state.catmealTypeID===0||this.state.catmealType===''} className="btn btn-warning" onClick={ () => this.handleSubmitCat()}>Add Meal Category</button>
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
                                            <th className="adjust5">Category ID</th>
                                            <th className="adjust5">Category Name</th>
                                            <th className="adjust5">Action</th>
                                            <th className="adjust5"> </th>
                                                    
                                        </tr>
                                    </thead>
                                    <tbody className="table table-hover">
                                        {this.renderCatData(this.state.MenuCategoryData)}
                                    
                                    </tbody>
                                </table>
                                <center><button className="btn btn-danger gap mb-3" onClick={ () => this.onCloseModaledit()}>Close</button></center>
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

        fetch(`${menuCategoryUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                MenuCategoryData:data,
                
            })
            
        })

        fetch(`${AvailableMenu}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            
            data.map((item)=>{
                var restMenuID = parseInt(item._id);
                var comprestMenuID = Math.max(restMenuID) +1;
                this.setState({
                
                    _id:comprestMenuID,
                    
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



export default FandBRestMenu;