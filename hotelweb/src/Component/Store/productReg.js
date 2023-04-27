import React, { Component } from 'react';
import Storelogin from '../Storelogin';
import '../Reception/Reception.css';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';
import Stockunitsmodal from './stockunitsmodal';
import 'bootstrap/dist/css/bootstrap.min.css';


const categoryUrl= "http://10.1.0.99:3333/storeTypes?storeName=";
const postproductUrl= "http://10.1.0.99:3333/addProduct";
const postdrinksUrl= "http://10.1.0.99:3333/postDrinksMenu";
const editdrinksUrl= "http://10.1.0.99:3333/editDrinksMenu";
const editproductUrl= "http://10.1.0.99:3333/editproduct";
const deleteproductUrl= "http://10.1.0.99:3333/delProduct";
const deletebarMenuUrl= "http://10.1.0.99:3333/delBarMenu";
const userName = "http://10.1.0.99:3333/storeUserInfo";
const unitsUrl= "http://10.1.0.99:3333/storeUnits";
const allproductsUrl= "http://10.1.0.99:3333/products?getproductName=";
const barMenuedit= "http://10.1.0.99:3333/drinkitems?drinxxName=";
const allbarMenuUrl= "http://10.1.0.99:3333/drinkitems";
const someproductsUrl= "http://10.1.0.99:3333/products?getcategoryName=";
const getDrinkCategory = "http://10.1.0.99:3333/drinkCategories?drinkType=";




class productReg extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*100000000),
            productsData:'',
            productType:'',
            productTypeData:'',
            productTypeID:'',
            productSellingPrice:'',
            categoryData:'',
            unitsData:'',
            categoryTypes:'',
            productseditData:'',
            searchproductName:'',

            categoryCode:'',
            categoryName:'',
            productID:'',
            productName:'',
            productUnit:'',
            binNum:'',
            reOrderLevel:'',
            entryDate:'',
            pieces:'',

            edit: false,
            editunit:false,
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            piecesData:[{_id:'1001', quantity:1},{_id:'1002', quantity:2},{_id:'1003', quantity:4},{_id:'1004', quantity:6},{_id:'1005', quantity:12},{_id:'1006', quantity:24},{_id:'1007', quantity:48}],
            
            barMenuID:'',
            UseID:'',
            barMenuData:'',
        };
        this.checkinhandleChange = this.checkinhandleChange.bind(this);

    }
    onOpenModaledit(){
        this.setState({
            edit:true
        })

        
    }

    onCloseModaledit(){
        this.setState({
            edit: false,
            productID:'',
            productName:'',
            productUnit:'',
            productType:'',
            productTypeID:'',
            productSellingPrice:'',
            productTypeData:'',
            binNum:'',
            reOrderLevel:'',
            entryDate:'',
            categoryName:'',
            categoryCode:'',
            pieces:''
            
            
        })
        

    }

    onOpenModaleditunit(){
        this.setState({
            editunit:true
        })
        
    }

    onCloseModaleditunit(){
        this.setState({
            editunit: false
            
        })
        fetch(`${unitsUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                unitsData:data,
            
            })
        })
        

    }

    checkinhandleChange(date) {
        this.setState({
            entryDate: date
        });
    }

    rendercheckinDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.entryDate}
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

    renderProductType2(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.mealType - b.mealType);
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


    renderPieces(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.quantity - b.quantity);
                return(
                    <>
                         <option key={item._id} value={item.quantity}>
                            {item.quantity}
                        </option>
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

    
    deletedept(){
        fetch(`${deleteproductUrl}/${this.state.productID}`, {method:'delete'});
        fetch(`${deletebarMenuUrl}/${this.state.searchproductName}`, {method:'delete'})
        alert("Product Deleted")

        this.setState({
                        
            productID:'',
            productName:'',
            productUnit:'',
            productType:'',
            productTypeID:'',
            productSellingPrice:'',
            productTypeData:'',
            binNum:'',
            reOrderLevel:'',
            entryDate:'',
            categoryName:'',
            categoryCode:'',
            pieces:''
        })
        fetch(`${allproductsUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                productsData:data,
                
            })
           
        })
        
        
        
    }

    handleChange12b = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        fetch(`${getDrinkCategory}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({productTypeID:item.mealTypeID})
                return 'ok'
            })
           
           
        })


    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    
    handleChange5 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        var finddeptID = this.state.productsData;
        var findbarMenu = this.state.barMenuData;
        var founddeptID = event.target.value;

        if(finddeptID.some(item => item.productName===founddeptID)){
            alert("Product already registered");
            this.setState({
                    
                productID:'',
                categoryName:'',
                categoryCode:'',
                categoryTypes:'',
                productName:'',
                productUnit:'',
                productType:'',
                productTypeID:'',
                binNum:'',
                pieces:'',
                productTypeData:'',
                unitsData:'',
                reOrderLevel:'',
                entryDate:'',
                productSellingPrice:''

                    
            })

            fetch(`${categoryUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    categoryTypes:data,
                

                })
        
            })

            fetch(`${getDrinkCategory}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    productTypeData:data,
                
                })
                
            })


            fetch(`${unitsUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    unitsData:data,
                
                })
        
            })
            
            this.myTimer = setTimeout(() => {
                
                this.setState({
                    _id:Math.floor(Math.random()*10000000),
                    
                   
                    
                })
            },1000)
           
        }

        else if(findbarMenu.some(item => item.mealName===founddeptID)){
            alert("Product already registered");
            this.setState({
                    
                productID:'',
                categoryName:'',
                categoryCode:'',
                categoryTypes:'',
                productName:'',
                productUnit:'',
                productType:'',
                productTypeID:'',
                binNum:'',
                pieces:'',
                productTypeData:'',
                unitsData:'',
                reOrderLevel:'',
                entryDate:'',
                productSellingPrice:''

                    
            })

            fetch(`${categoryUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    categoryTypes:data,
                

                })
        
            })

            fetch(`${getDrinkCategory}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    productTypeData:data,
                
                })
                
            })


            fetch(`${unitsUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    unitsData:data,
                
                })
        
            })
            
            this.myTimer = setTimeout(() => {
                
                this.setState({
                    _id:Math.floor(Math.random()*10000000),
                    
                   
                    
                })
            },1000)
           
        }
        
    }

    handleChange4 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        if(event.target.value==='Add New'){
            this.setState({editunit:true});

        }
        else if(this.state.categoryName!=='Drink Store'){
            this.setState({pieces:1})
        }
        
    }

    handleChange111 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

       if(this.state.categoryName!=='Drink Store'){
            this.setState({pieces:1})
        }
        
    }

    handleChange2 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        if(event.target.value==='Drink Store'){
            fetch(`${getDrinkCategory}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    productTypeData:data,
                    pieces:1
                
                })
            
            })
        }
        

        fetch(`${someproductsUrl}${event.target.value}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    productsData:data,
                })
                
            })
            this.myTimer = setTimeout(() => {

                if(this.state.productsData.length===0){
                    fetch(`${categoryUrl}${event.target.value}`, {method:'GET'})
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            categoryData:data,
                        })
                        data.map((item)=>{
                            var checkID = parseInt(item.categoryCode);
                            var computeID = Math.max(checkID) +1;
                            this.setState({
                            
                                productID:computeID,
                                
                            })
                            return 'ok'
                        })
                    
                        
                    })

                    
                }

                else{
                    var usethis = this.state.productsData;
                    
                    usethis.map((item)=>{
                        var checkID = parseInt(item.productID);
                        var computeID = Math.max(checkID) +1;

                        this.setState({
                            productID:computeID,
                            
                        })
                        return 'ok'

                    })
                    
                }

            },1000);
            

            
        
        
    }

    handleChange3 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        fetch(`${allproductsUrl}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                productseditData:data,
            

            })
            data.map((item)=>{
                this.setState({
                    productID:item.productID,
                    productName:item.productName,
                    categoryName:item.categoryName,
                    binNum:item.binNum,
                    reOrderLevel:item.reOrderLevel,
                    entryDate:new Date(item.entryDate),
                    productUnit:item.productUnit,
                    pieces:item.pieces,
                    productType:item.productType,
                    productTypeID:item.productTypeID,
                    productSellingPrice:item.productSellingPrice,
                    
                   
                })
                return 'ok'
            })
            
        })

        fetch(`${barMenuedit}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    UseID:item._id
                   
                })
                return 'ok'
            })
            
        })

        fetch(`${getDrinkCategory}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                productTypeData:data,
            
            })
            
        })

        if(this.state.searchproductName===''){
            this.setState({
                productID:'',
                productName:'',
                categoryName:'',
                binNum:'',
                reOrderLevel:'',
                entryDate:'',
                productUnit:'',
                productSellingPrice:''
            })
        }
        
    }

    

    async handleSubmit() {
       
        try {

                       
            var finddeptID = this.state.productsData;
            var findbarMenu = this.state.barMenuData;
            var founddeptID = this.state.productName;

            var deptDatapost = {
                
                categoryName:`${this.state.categoryName}`,
                productID:`${this.state.productID}`,
                productName:`${this.state.productName}`,
                productUnit:`${this.state.productUnit}`,
                productType:`${this.state.productType}`,
                productSellingPrice:parseInt(`${this.state.productSellingPrice}`),
                productTypeID:`${this.state.productTypeID}`,
                binNum:`${this.state.binNum}`,
                reOrderLevel:`${this.state.reOrderLevel}`,
                entryDate:`${this.state.entryDate}`,
                pieces:parseInt(`${this.state.pieces}`),
                name:localStorage.getItem('userInfo'),
                _id:`${this.state._id}`
                
            }

            var drinkMenu = {
                
                _id:parseInt(`${this.state.barMenuID}`),
                mealTypeID:parseInt(`${this.state.productTypeID}`),
                mealName:`${this.state.productName}`,
                mealPrice:`${this.state.productSellingPrice}`,
                mealQt:1,
                mealType:`${this.state.productType}`,
                categoryID:parseInt(`${this.state.productTypeID}`),
                category:`${this.state.productType}`
                
            }

            if(finddeptID.some(item => item.productName===founddeptID)){
                alert("Product already registered");
                this.setState({
                        
                    productID:'',
                    productName:'',
                    productUnit:'',
                    productTypeData:'',
                    productSellingPrice:'',
                    productType:'',
                    productTypeID:'',
                    binNum:'',
                    reOrderLevel:'',
                    entryDate:'',
                    categoryName:'',
                    categoryCode:'',
                    pieces:'',
                    unitsData:'',
                    productsData:'',
                    categoryTypes:'',
                    barMenuID:'',
                    barMenuData:''
                        
                
                })

                fetch(`${categoryUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        categoryTypes:data,
                    

                    })
            
                })

                fetch(`${getDrinkCategory}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        productTypeData:data,
                    
                    })
                    
                })

                fetch(`${allbarMenuUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        barMenuData:data,
                    })
                    data.map((item)=>{
                        var barMenuID = parseInt(item._id);
                        var compbarMenuID = Math.max(barMenuID) +1;
                        this.setState({
                        
                            barMenuID:compbarMenuID,
                            
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

            else if(findbarMenu.some(item => item.mealName===founddeptID)){
                alert("Product already registered");
                this.setState({
                        
                    productID:'',
                    categoryName:'',
                    categoryCode:'',
                    categoryTypes:'',
                    productName:'',
                    productSellingPrice:'',
                    productUnit:'',
                    productType:'',
                    productTypeID:'',
                    binNum:'',
                    pieces:'',
                    productTypeData:'',
                    unitsData:'',
                    reOrderLevel:'',
                    entryDate:''
    
                        
                })
    
                fetch(`${categoryUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        categoryTypes:data,
                    
    
                    })
            
                })
    
                fetch(`${getDrinkCategory}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        productTypeData:data,
                    
                    })
                    
                })
    
    
                fetch(`${unitsUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        unitsData:data,
                    
                    })
            
                })

                fetch(`${allbarMenuUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        barMenuData:data,
                    })
                    data.map((item)=>{
                        var barMenuID = parseInt(item._id);
                        var compbarMenuID = Math.max(barMenuID) +1;
                        this.setState({
                        
                            barMenuID:compbarMenuID,
                            
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
                let result = await fetch(`${postproductUrl}`, {
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
                if(this.state.categoryName==='Drink Store'){
                    let result2 = await fetch(`${postdrinksUrl}`, {
                        method: 'post',
            
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
            
                        body: JSON.stringify(
                            drinkMenu
                          
                        )
                            
                    });
                    console.log('result2>  ' + result2)
                }
                
                alert(this.state.productName+" Added");
                this.setState({
                    productID:'',
                    productName:'',
                    productUnit:'',
                    productTypeData:'',
                    productSellingPrice:'',
                    productType:'',
                    productTypeID:'',
                    binNum:'',
                    reOrderLevel:'',
                    entryDate:'',
                    categoryName:'',
                    categoryCode:'',
                    categoryTypes:'',
                    unitsData:'',
                    productsData:'',
                    pieces:'',
                    barMenuID:'',
                    barMenuData:''
                })

                fetch(`${categoryUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        categoryTypes:data,
                    })
            
                })
                fetch(`${unitsUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        unitsData:data,
                    
                    })
            
                })
                fetch(`${allproductsUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        productsData:data,
            
                    })
                })
                fetch(`${allbarMenuUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        barMenuData:data,
                    })
                    data.map((item)=>{
                        var barMenuID = parseInt(item._id);
                        var compbarMenuID = Math.max(barMenuID) +1;
                        this.setState({
                        
                            barMenuID:compbarMenuID,
                            
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
            var prodID = this.state.productID;
            var editID = parseInt(this.state.UseID);
           
            var drinkMenu = {
                
                mealTypeID:parseInt(`${this.state.productTypeID}`),
                mealName:`${this.state.productName}`,
                mealPrice:`${this.state.productSellingPrice}`,
                mealQt:1,
                mealType:`${this.state.productType}`,
                categoryID:parseInt(`${this.state.productTypeID}`),
                category:`${this.state.productType}`
                
            }

            var deptUpdated = {
               
                productName:`${this.state.productName}`,
                productUnit:`${this.state.productUnit}`,
                productType:`${this.state.productType}`,
                productTypeID:`${this.state.productTypeID}`,
                categoryName:`${this.state.categoryName}`,
                catgoryID:`${this.state.catgoryID}`,
                binNum:`${this.state.binNum}`,
                reOrderLevel:`${this.state.reOrderLevel}`,
                entryDate:`${this.state.entryDate}`,
                pieces:`${this.state.pieces}`,
                // productID:`${this.state.productID}`,
                productSellingPrice:parseInt(`${this.state.productSellingPrice}`),
                name:localStorage.getItem('userInfo'),
                

                            
            }
            let result = await fetch(`${editproductUrl}/${prodID}`, {
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

            let editProd = await fetch(`${editdrinksUrl}/${editID}`, {
                method: 'put',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    drinkMenu
                        
                )
                    
            });
            console.log('editProd>  ' + editProd)
            alert(this.state.productName+" updated");
            
            this.setState({
                productID:'',
                productName:'',
                productUnit:'',
                productType:'',
                productTypeID:'',
                productSellingPrice:'',
                productTypeData:'',
                binNum:'',
                reOrderLevel:'',
                entryDate:'',
                categoryName:'',
                categoryCode:'',
                pieces:''

                
            })
            fetch(`${allproductsUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
            this.setState({
                productsData:data,
            
            })

            fetch(`${getDrinkCategory}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    productTypeData:data,
                })
           
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

    renderCategoryTypes(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.categoryName - b.categoryName);
                return(
                    <>
                         <option key={item._id} value={item.categoryName}>
                            {item.categoryName} 
                        </option>
                    </>
                )
            })
        }
    }

    renderProductUnits(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.unit - b.unit);
                return(
                    <>
                         <option key={item._id} value={item.unit}>
                            {item.unit} 
                        </option>
                    </>
                )
            })
        }
    }

    renderProducts(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.unit - b.unit);
                return(
                    <>
                         <option key={item._id} value={item.productName}>
                            {item.productName} 
                        </option>
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
                <div  className="background990ib">
                    <br/><br/>
                    <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Register New Products</h4>
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

                                <div className="col-3">
                                    <select className="form-select  mb-3 formsize51" name="categoryName" onChange={this.handleChange2}>
                                        <option defaultValue=''>Select Category</option>
                                        {this.renderCategoryTypes(this.state.categoryTypes)}
                                    </select>
                                </div>
                                
                                <div className="col-3">
                                    <p type="text" className="form-control mb-3 formsize51 ikem" name="productID" require placeholder="Enter Product ID">{this.state.productID}</p>
                                </div>

                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize51" name="productName" require placeholder="Enter Product Name" value={this.state.productName} list="products" onChange={this.handleChange5}/>
                                    <datalist id="products">
                                        {this.renderProducts(this.state.productsData)}
                                    </datalist>
                                </div>

                                <div className="col-3">
                                    <select className="form-select  mb-3 formsize51 col-3" name="productUnit" onChange={this.handleChange4}>
                                        <option selected="">Select Unit</option>
                                        {this.renderProductUnits(this.state.unitsData)}
                                        <option defaultValue=''>Add New</option>
                                    </select>
                                </div>

                                

                            </div>
                            <div className="row">

                                <div className="col-3">
                                   
                                   <select disabled={this.state.categoryName!=='Drink Store'} className="form-select  mb-3 formsize51" name="productType" require placeholder="ProdType"onChange={this.handleChange12b}>
                                       <option defaultValue=''>Product Type</option>
                                       {this.renderProductType2(this.state.productTypeData)}
                                   </select>
                               </div>

                               <div className="col-3">
                                  <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productTypeID}</p>
                               </div>
                                    
                                <div className="col-3">
                                    
                                    <input type="number" disabled={this.state.categoryName!=='Drink Store'} className="form-control mb-3 formsize51" name="pieces" list="pieces" require placeholder="Pieces per unit" value={this.state.pieces} onChange={this.handleChange}/>
                                    <datalist id="pieces">
                                        {this.renderPieces(this.state.piecesData)}
                                    </datalist>
                                </div>
                                
                                <div className="col-3">
                                    <input type="number" disabled={this.state.categoryName!=='Drink Store'} className="form-control mb-3 formsize51" name="productSellingPrice" require placeholder="Enter Selling Price" value={this.state.productSellingPrice} onChange={this.handleChange}/>
                                </div>

                                
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize51" name="binNum" require placeholder="Enter Bin Number" value={this.state.binNum} onChange={this.handleChange}/>
                                </div>
                                <div className="col-3">
                                    <input type="number" className="form-control mb-3 formsize51" name="reOrderLevel" require placeholder="Enter Re-Order Level" value={this.state.reOrderLevel} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                    <label>
                                        {this.rendercheckinDate(this.state.entryDate)}
                                    </label>
                                </div>
                            </div>

                            <center>
                            <br/>
                                <span>
                                    <button disabled={this.state.productName===''||this.state.productUnit===''||this.state.entryDate===''||this.state.binNum===''} className="btn btn-warning" onClick={ () => this.handleSubmit () } >Add New</button>
                                    <button disabled={this.state.categoryName.length!==0||this.state.categoryName==="Select Category"} className="btn btn-warning gap" onClick={()=>this.onOpenModaledit()}>Edit Products</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/storeMenu')}>Close</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                       
                    </div>
                </div>
                <Modal open={this.state.edit} onClose={()=>this.onCloseModaledit()} style={{color:"silver"}}>
                    <div className = "background591">
                        <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-70px'}}>Edit Product</h4>
                        <div className="formdesign511">
                            <div className="container">
                                <select className="form-select  mb-3 formsize51 col-3" name="searchproductName" onChange={this.handleChange3}>
                                    <option defaultValue=''>Select Product</option>
                                    {this.renderProducts(this.state.productsData)}
                                </select>
                                <div className="row">
                                    
                                    <div className="col-3">
                                        <input type="text" className="form-control mb-3 formsize51" name="productName" require placeholder="Product Name" value={this.state.productName} onChange={this.handleChange}/>
                                    </div>

                                    <div className="col-3">
                                        <p type="text" className="form-control mb-3 formsize51 ikem" name="productID" require placeholder="Product ID">{this.state.productID}</p>
                                    </div>
                                    <div className="col-3">
                                        <input type="text"  className="form-control mb-3 formsize51" name="productType" require placeholder="ProdType" list="types" value={this.state.productType} onChange={this.handleChange}/>
                                        <datalist id="types">
                                            {this.renderProductType2(this.state.productTypeData)}
                                        </datalist>
                                    </div>
                                    
                                   <div className="col-3">
                                        <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productTypeID}</p>
                                    </div>
                               </div>

                                <div className="row">

                                    <div className="col-3">
                                            <input type="text" className="form-control mb-3 formsize51" name="categoryName" require placeholder="Product Category" value={this.state.categoryName} onChange={this.handleChange}/>
                                        
                                    </div>
                                    <div className="col-3">
                                        <input type="text" className="form-control mb-3 formsize51" name="productUnit" require placeholder="Product Unit" list="unit" value={this.state.productUnit} onChange={this.handleChange111}/>
                                        <datalist id="unit">
                                            {this.renderProductUnits(this.state.unitsData)}
                                        </datalist>
                                    </div>
                                    
                                    <div className="col-3">
                                        <input type="text" className="form-control mb-3 formsize51" name="binNum" require placeholder="Bin Number" value={this.state.binNum} onChange={this.handleChange}/>
                                    </div>

                                    <div className="col-3">
                                        
                                        <input type="number" className="form-control mb-3 formsize51" name="pieces" list="pieces" require placeholder="Pieces per unit" value={this.state.pieces} onChange={this.handleChange}/>
                                        <datalist id="pieces">
                                            {this.renderPieces(this.state.piecesData)}
                                        </datalist>
                                    </div>

                                    <div className="col-3">
                                        <input type="number" disabled={this.state.categoryName!=='Drink Store'} className="form-control mb-3 formsize51" name="productSellingPrice" require placeholder="Enter Selling Price" value={this.state.productSellingPrice} onChange={this.handleChange}/>
                                    </div>

                                    <div className="col-3">
                                        <label>
                                            {this.rendercheckinDate(this.state.entryDate)}
                                        </label>
                                    </div>
                                </div>
                                <br/><br/>
                                <center>
                                    <span>
                                    <button disabled ={this.state.productName===''||this.state.productUnit===''} className="btn btn-warning gap" onClick={()=>this.deptUpdate()}>Save Update</button>
                                        <button disabled ={this.state.productName===''||this.state.productUnit===''} className="btn btn-warning gap" onClick={()=>this.deletedept()}>Delete Product</button>
                                        <button className="btn btn-danger gap" onClick={ () => this.onCloseModaledit()}>Close</button>
                                                
                                    </span>
                                            
                                </center>
                                <br/>
                        
                            </div>
                            
                        </div> 
                        
                    </div>  

                </Modal>
                <Modal open={this.state.editunit} onClose={()=>this.onCloseModaleditunit()}>
                    
                    <div>
                        <Stockunitsmodal/>
                    </div>
                    <br/>
                   
                    <div>
                        <center>
                            <button className="btn btn-danger gap" onClick={ () => this.onCloseModaleditunit()}>Close</button>
                        </center>
                    </div>
                    

                </Modal>
            </>
                
            
            
        );
    }

    componentDidMount() {
        console.log(">>> Inside GrpDidMount", this.state);

        fetch(`${categoryUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                categoryTypes:data,
            

            })
            
        })
        fetch(`${unitsUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                unitsData:data,
            

            })
            
        })

        fetch(`${allproductsUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                productsData:data,
            

            })
            
        })
        
        fetch(`${allbarMenuUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                barMenuData:data,
            })
            data.map((item)=>{
                var barMenuID = parseInt(item._id);
                var compbarMenuID = Math.max(barMenuID) +1;
                this.setState({
                
                    barMenuID:compbarMenuID,
                    
                    
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



export default productReg;