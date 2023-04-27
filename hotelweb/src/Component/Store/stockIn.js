import React, { Component } from 'react';
import Storelogin from '../Storelogin';
import '../Reception/Reception.css';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';


const allproductsUrl= "http://10.1.0.99:3333/products?getproductName=";
const uniqueProductsUrl= "http://10.1.0.99:3333/products?uniqueCat=";
const allCategoryUrl= "http://10.1.0.99:3333/storeTypes?storeName=";
const getStoreTransUrl= "http://10.1.0.99:3333/storeTran?tranProdName=";
const getStockOut= "http://10.1.0.99:3333/stockOutNow?sivProdName=";
const getvendorUrl= "http://10.1.0.99:3333/vendors?name=";
const postproductUrl= "http://10.1.0.99:3333/stockInNow";
const editproductUrl= "http://10.1.0.99:3333/storeTran?grvNumber=";
const updateProduct= "http://10.1.0.99:3333/editstockIn";
const userName = "http://10.1.0.99:3333/storeUserInfo";
const deleteproductUrl= "http://10.1.0.99:3333/delstoreTran"


class stockIn extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*10000000),
            categoryName:'',
            grvNum:'',
            productName:'',
            productID:'',
            productPrice:'',
            productUnit:'',
            qtyIn:'',
            productValue:0,
            totalIn:0,
            totalOut:0,
            totalProductBalance:0,
            vendorName:'',
            vendorID:'',
            invoiceDate:'',
            invoiceNum:'',
            supplyDate:new Date(),
            transDate:new Date(),
            remark:'',
            qtyOut:0,
            orderNum:'',
            pieces:'',

            productsData:'',
            uniqueProductData:'',
            transactionsData:'',
            vendorData:'',
            categoryData:'',
            
            
            edit: false,
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            placeholder:''
            
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
            edit:false
            
        })
        this.setState({
            categoryName:'',
            categoryID:'',
            grvNum:'',
            productName:'',
            productID:'',
            productPrice:'',
            productUnit:'',
            qtyIn:'',
            productValue:0,
            totalIn:0,
            totalOut:0,
            totalProductBalance:0,
            productsData:'',
            vendorName:'',
            vendorData:'',
            vendorID:'',
            invoiceDate:'',
            invoiceNum:'',
            remark:'',
            qtyOut:0,
            orderNum:''
                
        })
        fetch(`${allproductsUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                productsData:data,
                
            })
           
        })

        fetch(`${allproductsUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                productsData:data,
    
            })
        })

        fetch(`${getvendorUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                vendorData:data,
            
            })
            
        })
        
        this.myTimer = setTimeout(() => {
            
            this.setState({
                _id:Math.floor(Math.random()*10000000),
                
                
            })
        },1000)

        fetch(`${getStoreTransUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                transactionsData:data,
            
            })

            var opening=this.state.transactionsData
            var grvCode = 3000000;

            this.myTimer = setTimeout(() => {
                if(this.state.transactionsData.length===0){
                    
                    var checkID = parseInt(grvCode);
                    var computeID = Math.max(checkID);
                    this.setState({
                        grvNum:computeID
                        
                    })
                        
                    
                }
                else{
                    opening.map((item)=>{
                        var checkID = parseInt(item.grvNum);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                            grvNum:computeID,
                            
                        })
                        return 'ok'
                    })
                }
                
            },1000);
            
        })
        
    }


    checkinhandleChange(date) {
        this.setState({
            invoiceDate: date
        });
    }

    rendercheckinDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.invoiceDate}
                    onChange={this.checkinhandleChange}
                    maxDate={addDays(new Date(),1)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    placeholderText="Invoice Date"
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

    
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    
    handleChange5 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        var prodVal = 0;
        var totProdVal = prodVal + parseInt(this.state.productPrice)*parseInt(event.target.value)*parseInt(this.state.pieces);
        this.setState({productValue:totProdVal})

        
    }

    handleChange6 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        fetch(`${editproductUrl}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
           data.map((item)=>{
                this.setState({
                    categoryName:item.categoryName,
                    grvNum:item.grvNum,
                    productName:item.productName,
                    productID:item.productID,
                    productPrice:item.productPrice,
                    productUnit:item.productUnit,
                    qtyIn:item.qtyIn,
                    productValue:item.productValue,
                    vendorID:item.vendorID,
                    vendorName:item.vendorName,
                    invoiceDate:new Date(item.invoiceDate),
                    invoiceNum:item.invoiceNum,
                    supplyDate:item.supplyDate,
                    transDate:new Date(item.transDate),
                    remark:item.remark,
                    orderNum:item.orderNum

                })
                return 'ok'
           })
           
           var totalQtyIn = data.map(item => item).reduce((totals, item) =>{
            return totals + parseInt(item.qtyIn)
            }, 0);
            this.setState({totalIn:totalQtyIn})
            
            fetch(`${getStockOut}${event.target.value}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {

                var totalQtyOut = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.qtyOut)
                }, 0);
                this.setState({totalOut:totalQtyOut})
                
            })

            this.myTimer = setTimeout(() => {
                var allQty = 0;
                var totalBalance = allQty + parseInt(this.state.totalIn) - parseInt(this.state.totalOut);
                this.setState({totalProductBalance:totalBalance})

            },1000)
            
        })


    }

    handleChange4 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        fetch(`${getvendorUrl}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
           data.map((item)=>{
                this.setState({
                    vendorID:item.vendorID
                })
                return 'ok'
           })
            
        })
        
        
    }

    handleChange8 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        fetch(`${uniqueProductsUrl}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
           this.setState({productsData:data})

        })


    }

    handleChange2 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        fetch(`${allproductsUrl}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    categoryName:item.categoryName,
                    categoryID:item.categoryID,
                    productID:item.productID,
                    productUnit:item.productUnit,
                    pieces:item.pieces
                })
                return 'ok'
            })
            
        })

        fetch(`${getStoreTransUrl}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                transactionsData:data
            });

            var totalQtyIn = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.qtyIn)
            }, 0);
            this.setState({totalIn:totalQtyIn})
            
        })

    
        fetch(`${getStockOut}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {

            var totalQtyOut = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.qtyOut)
            }, 0);
            this.setState({totalOut:totalQtyOut})
            
        })

        this.myTimer = setTimeout(() => {
            var allQty = 0;
            var totalBalance = allQty + parseInt(this.state.totalIn) - parseInt(this.state.totalOut);
            this.setState({totalProductBalance:totalBalance})

        },1000)

        if(this.state.productName===''){
            this.setState({
                categoryName:'',
                categoryID:'',
                productID:'',
                productPrice:'',
                productUnit:''
            })
        }
        
        
    }

    deletedept(){
        fetch(`${deleteproductUrl}/${this.state.grvNum}`, {method:'delete'})
        alert("Product Deleted")

        this.setState({
            categoryName:'',
            categoryID:'',
            grvNum:'',
            productName:'',
            productID:'',
            productPrice:'',
            productUnit:'',
            qtyIn:'',
            productValue:0,
            totalIn:0,
            totalOut:0,
            totalProductBalance:0,
            productsData:'',
            vendorName:'',
            vendorData:'',
            vendorID:'',
            invoiceDate:'',
            invoiceNum:'',
            remark:'',
            qtyOut:0,
            orderNum:''
                
        })
        fetch(`${allproductsUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                productsData:data,
                
            })
           
        })

        fetch(`${allproductsUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                productsData:data,
    
            })
        })

        fetch(`${getvendorUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                vendorData:data,
            
            })
            
        })
        
        this.myTimer = setTimeout(() => {
            
            this.setState({
                _id:Math.floor(Math.random()*10000000),
                
                
            })
        },1000)

        fetch(`${getStoreTransUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                transactionsData:data,
            
            })

            var opening=this.state.transactionsData
            var grvCode = 3000000;

            this.myTimer = setTimeout(() => {
                if(this.state.transactionsData.length===0){
                    
                    var checkID = parseInt(grvCode);
                    var computeID = Math.max(checkID);
                    this.setState({
                        grvNum:computeID
                        
                    })
                        
                    
                }
                else{
                    opening.map((item)=>{
                        var checkID = parseInt(item.grvNum);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                            grvNum:computeID,
                            
                        })
                        return 'ok'
                    })
                }
                
            },1000);
            
        })

        
        
    }
    

    
    async handleSubmit() {
       
        try {
            
            var finddeptID = this.state.transactionsData;
            var founddeptID = this.state.grvNum

            var deptDatapost = {
                _id:`${this.state._id}`,
                categoryName:`${this.state.categoryName}`,
                grvNum:`${this.state.grvNum}`,
                productName:`${this.state.productName}`,
                productID:`${this.state.productID}`,
                productPrice:`${this.state.productPrice}`,
                productUnit:`${this.state.productUnit}`,
                qtyIn:`${this.state.qtyIn}`,
                productValue:`${this.state.productValue}`,
                vendorID:`${this.state.vendorID}`,
                vendorName:`${this.state.vendorName}`,
                invoiceDate:`${this.state.invoiceDate}`,
                invoiceNum:`${this.state.invoiceNum}`,
                supplyDate:`${this.state.supplyDate}`,
                transDate:moment(`${this.state.transDate}`).format('MMM DD YYYY'),
                remark:`${this.state.remark}`,
                orderNum:`${this.state.orderNum}`,
                name:localStorage.getItem('userInfo')
               
            }

            if(finddeptID.some(item => item.grvNum===founddeptID)){
                alert(this.state.productName+ " already received");

                fetch(`${getStoreTransUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        transactionsData:data,
                    
                    })
 
                    var opening=this.state.transactionsData
                    var grvCode = 3000000;

                    this.myTimer = setTimeout(() => {
                        if(this.state.transactionsData.length===0){
                            
                            var checkID = parseInt(grvCode);
                            var computeID = Math.max(checkID);
                            this.setState({
                                grvNum:computeID
                                
                            })
                                
                            
                        }
                        else{
                            opening.map((item)=>{
                                var checkID = parseInt(item.grvNum);
                                var computeID = Math.max(checkID) +1;
                                this.setState({
                                    grvNum:computeID,
                                    
                                })
                                return 'ok'
                            })
                        }

                       
                        
                    },1000);
                    
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
                alert(this.state.productName+" Added");
                this.setState({
                    categoryName:'',
                    categoryData:'',
                    categoryID:'',
                    grvNum:'',
                    productName:'',
                    pieces:'',
                    productID:'',
                    productPrice:'',
                    productUnit:'',
                    qtyIn:'',
                    productValue:0,
                    totalIn:0,
                    totalOut:0,
                    totalProductBalance:0,
                    productsData:'',
                    vendorName:'',
                    vendorData:'',
                    vendorID:'',
                    invoiceDate:'',
                    invoiceNum:'',
                    remark:'',
                    qtyOut:0,
                    orderNum:''
                })

                fetch(`${allproductsUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        productsData:data,
            
                    })
                })

                fetch(`${getvendorUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        vendorData:data,
                    
                    })
                    
                })

                fetch(`${allCategoryUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        categoryData:data,
                    
                    })
                    
                })
                
                this.myTimer = setTimeout(() => {
                    
                    this.setState({
                        _id:Math.floor(Math.random()*10000000),
                       
                        
                    })
                },1000)

                fetch(`${getStoreTransUrl}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        transactionsData:data,
                    
                    })
        
                    var opening=this.state.transactionsData
                    var grvCode = 3000000;

                    this.myTimer = setTimeout(() => {
                        if(this.state.transactionsData.length===0){
                            
                            var checkID = parseInt(grvCode);
                            var computeID = Math.max(checkID);
                            this.setState({
                                grvNum:computeID
                                
                            })
                                
                            
                        }
                        else{
                            opening.map((item)=>{
                                var checkID = parseInt(item.grvNum);
                                var computeID = Math.max(checkID) +1;
                                this.setState({
                                    grvNum:computeID,
                                    
                                })
                                return 'ok'
                            })
                        }
                        
                    },1000);
                    
                })

            }

            
        }catch(e) {
            console.log(e)
        }

    }

    async deptUpdate() {
       
        try {
            var id = this.state.grvNum;
           
            var deptUpdated = {
               
                _id:`${this.state._id}`,
                categoryName:`${this.state.categoryName}`,
                grvNum:`${this.state.grvNum}`,
                productName:`${this.state.productName}`,
                productID:`${this.state.productID}`,
                productPrice:`${this.state.productPrice}`,
                productUnit:`${this.state.productUnit}`,
                qtyIn:`${this.state.qtyIn}`,
                productValue:`${this.state.productValue}`,
                vendorID:`${this.state.vendorID}`,
                vendorName:`${this.state.vendorName}`,
                invoiceDate:`${this.state.invoiceDate}`,
                invoiceNum:`${this.state.invoiceNum}`,
                supplyDate:`${this.state.supplyDate}`,
                transDate:moment(`${this.state.transDate}`).format('MMM DD YYYY'),
                remark:`${this.state.remark}`,
                orderNum:`${this.state.orderNum}`
                            
            }
            let result = await fetch(`${updateProduct}/${id}`, {
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
            alert(this.state.productName+" updated");
            this.setState({
                categoryName:'',
                categoryID:'',
                grvNum:'',
                productName:'',
                productID:'',
                productPrice:'',
                productUnit:'',
                qtyIn:'',
                productValue:0,
                totalIn:0,
                totalOut:0,
                totalProductBalance:0,
                productsData:'',
                vendorName:'',
                vendorData:'',
                vendorID:'',
                invoiceDate:'',
                invoiceNum:'',
                remark:'',
                qtyOut:0,
                orderNum:'',
                transactionsData:''
                
            })

            fetch(`${allproductsUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    productsData:data,
                
                })
            })

            
            fetch(`${getvendorUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    vendorData:data,
                
                })
                
            })

            fetch(`${getStoreTransUrl}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    transactionsData:data,
                
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

    renderVendor(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.vendorName - b.vendorName);
                return(
                    <>
                         <option key={item._id} value={item.vendorName}>
                            {item.vendorName} 
                        </option>
                    </>
                )
            })
        }
    }

    renderstockIndata(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.productName - b.productName);
                return(
                    <>
                         <option key={item._id} value={item.grvNum}>
                            Name: {item.productName} | SRV Num: {item.grvNum} | Value: {item.productValue}
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

    renderCategories(data){
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
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Stock In Products</h4>
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
                                    
                                    <select className="form-select  mb-3 formsize51" name="categoryName" onChange={this.handleChange8}>
                                        <option defaultValue=''>Select Category</option>
                                        {this.renderCategories(this.state.categoryData)}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <select className="form-select  mb-3 formsize51" name="productName" onChange={this.handleChange2}>
                                        <option defaultValue=''>Select Product</option>
                                        {this.renderProducts(this.state.productsData)}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <input type="number" className="form-control mb-3 formsize51" name="productPrice" require placeholder="Enter Cost Price" value={this.state.productPrice} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                    <input type="number" className="form-control mb-3 formsize51" name="qtyIn" require placeholder="Enter Qty Supplied" value={this.state.qtyIn} onChange={this.handleChange5}/>
                                </div>
                               
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <select className="form-select  mb-3 formsize51" name="vendorName" onChange={this.handleChange4}>
                                        <option defaultValue=''>Select Vendor</option>
                                        {this.renderVendor(this.state.vendorData)}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <label>
                                        {this.rendercheckinDate(this.state.invoiceDate)}
                                    </label>
                                </div>

                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize51" name="invoiceNum" require placeholder="Invoice Number" value={this.state.invoiceNum} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                    <textarea rows="2" className="form-control mb-3 formsize51" name="remark" require placeholder="Remark" value={this.state.remark} onChange={this.handleChange}/>
                                </div>

                            </div>
                            <hr/>
                            <div className="row">
                               
                                <div className="col-3">
                                    <label>SRV Num</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.grvNum}</p>
                                </div>

                                <div className="col-3">
                                    <label>Product ID</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productID}</p>
                                </div>

                                <div className="col-3">
                                    <label>Product Unit</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productUnit}</p>
                                </div>

                                <div className="col-3">
                                <label>Pieces Per Unit</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.pieces}</p>
                                </div>

                                <div className="col-3">
                                    <label>Product Value</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem"><NumberFormat value={this.state.productValue}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className="col-3">
                                    <label>Vendor ID</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.vendorID}</p>
                                </div>
                                
                                <div className="col-3">
                                    <label>Total In</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.totalIn}</p>
                                </div>

                                <div className="col-3">
                                    <label>Total Out</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.totalOut}</p>
                                </div>

                                <div className="col-3">
                                    <label>Total Product Balance</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.totalProductBalance}</p>
                                </div>
                            </div>
                            <hr/>
                            
                            <center>
                            <br/>
                                <span>
                                    <button disabled={this.state.productName===''||this.state.productPrice===''||this.state.qtyIn===''} className="btn btn-warning" onClick={ () => this.handleSubmit () } >Stock In</button>
                                    <button disabled={this.state.productID!==''} className="btn btn-warning gap" onClick={()=>this.onOpenModaledit()}>Edit Products</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/storeMenu')}>Close</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                       
                    </div>
                </div>
                <Modal open={this.state.edit} onClose={()=>this.onCloseModaledit()} style={{color:"silver"}}>
                    <div className = "background591stockin">
                        <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-70px'}}>Edit Stock In</h4>
                        <div className="formdesign511">
                            <div className="container">
                                <div className="row">

                                <div className="col-3">
                                    <select className="form-select  mb-3 formsize51" name="grvNum" onChange={this.handleChange6}>
                                        <option defaultValue=''>Select Product</option>
                                        {this.renderstockIndata(this.state.transactionsData)}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <input type="number" className="form-control mb-3 formsize51" name="productPrice" require placeholder="Enter Cost Price" value={this.state.productPrice} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                    <input type="number" className="form-control mb-3 formsize51" name="qtyIn" require placeholder="Enter Quantity" value={this.state.qtyIn} onChange={this.handleChange5}/>
                                </div>
                                
                                <div className="col-3">
                                    
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.grvNum}</p>
                                </div>

                               
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize51" name="vendorName" require placeholder="Vendor" value={this.state.vendorName} list="vendors" onChange={this.handleChange}/>
                                    <datalist id="vendors">
                                        {this.renderVendor(this.state.vendorData)}
                                    </datalist>
                                    
                                </div>

                                <div className="col-3">
                                    <label>
                                        {this.rendercheckinDate(this.state.invoiceDate)}
                                    </label>
                                </div>

                                <div className="col-3">
                                    <p type="text" className="form-control mb-3 formsize51 ikem" name="invoiceNum" require placeholder="Invoice Number">{this.state.invoiceNum}</p>
                                </div>

                                <div className="col-3">
                                    <textarea rows="2" className="form-control mb-3 formsize51" name="remark" require placeholder="Remark" value={this.state.remark} onChange={this.handleChange}/>
                                </div>

                                </div>

                                <div className="row">
                               
                                <div className="col-3">
                                    <label>Category</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.categoryName}</p>
                                </div>

                                <div className="col-3">
                                    <label>Product ID</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productID}</p>
                                </div>

                                <div className="col-3">
                                    <label>Product Unit</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productUnit}</p>
                                </div>

                                <div className="col-3">
                                    <label>Product Value</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productValue}</p>
                                </div>

                                <div className="col-3">
                                    <label>Vendor ID</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.vendorID}</p>
                                </div>
                                
                                <div className="col-3">
                                    <label>Total In</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.totalIn}</p>
                                </div>

                                <div className="col-3">
                                    <label>Total Out</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.totalOut}</p>
                                </div>

                                <div className="col-3">
                                    <label>Balance</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.totalProductBalance}</p>
                                </div>
                                </div>
                                <br/><br/>
                                <center>
                                    <span>
                                        <button disabled ={this.state.productName===''||this.state.productPrice===''||this.state.productUnit===''} className="btn btn-warning gap" onClick={()=>this.deptUpdate()}>Save Update</button>
                                        <button disabled ={this.state.productName===''||this.state.productPrice===''||this.state.productUnit===''} className="btn btn-warning gap" onClick={()=>this.deletedept()}>Delete Product</button>
                                        <button className="btn btn-danger gap" onClick={ () => this.onCloseModaledit()}>Close</button>
                                                
                                    </span>
                                            
                                </center>
                                <br/>
                        
                            </div>
                            
                        </div> 
                        
                    </div>  

                </Modal>
               
            </>
                
            
            
        );
    }

    componentDidMount() {
        console.log(">>> Inside GrpDidMount", this.state);
        
        fetch(`${allCategoryUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                categoryData:data,
            
            })
            
        })

        fetch(`${getStoreTransUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                transactionsData:data,
            
            })
 
            var opening=this.state.transactionsData
            var grvCode = 3000000;

            this.myTimer = setTimeout(() => {
                if(this.state.transactionsData.length===0){
                    
                    var checkID = parseInt(grvCode);
                    var computeID = Math.max(checkID);
                    this.setState({
                        grvNum:computeID
                        
                    })
                        
                    
                }
                else{
                    opening.map((item)=>{
                        var checkID = parseInt(item.grvNum);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                            grvNum:computeID,
                            
                        })
                        return 'ok'
                    })
                }
                
            },1000);
            
        })

        fetch(`${getvendorUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                vendorData:data,
            
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



export default stockIn;