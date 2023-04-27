import React, { Component } from 'react';
import Storelogin from '../Storelogin';
import '../Reception/Reception.css';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';


const allStoreCategories= "http://10.1.0.99:3333/storeTypes";
const allRegProds= "http://10.1.0.99:3333/products?getcategoryName=";
const allRegProdNames= "http://10.1.0.99:3333/products?getproductName=";
const getProductDetails= "http://10.1.0.99:3333/storeTran?tranProdName=";
const getLatestPrice= "http://10.1.0.99:3333/storeTran?grvNumber=";
const getAllStockOut= "http://10.1.0.99:3333/stockOutNow?sivProdName=";
const getAllDepts= "http://10.1.0.99:3333/issueDepts";
const postStockIssue= "http://10.1.0.99:3333/postStockOut";
const postToInnerBar= "http://10.1.0.99:3333/InnerBarSend";
const postToPoolBar= "http://10.1.0.99:3333/PoolBarSend";
const postToClub= "http://10.1.0.99:3333/ClubSend";
const postToRestBar= "http://10.1.0.99:3333/RestBarSend";
const postToOpenBar= "http://10.1.0.99:3333/OpenBarSend";
const getDrinkCategory = "http://10.1.0.99:3333/drinkCategories?drinkType=";


const userName = "http://10.1.0.99:3333/storeUserInfo";

class stockOut extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*10000000),
            categoryName:'',
            productName:'',
            productUnit:'',
            productType:'',
            productTypeData:'',
            productTypeID:'',
            pieces:'',
            productPrice:'',
            productSellingPrice:'',
            totalIn:0,
            totalOut:0,
            totalProductBalance:0,
            
            sivNum:'',
            issueDept:'',
            qtyOut:'',
            productIssueValue:0,
            transDate:new Date(),
                        
            categoryData:'',
            productNamesData:'',
            productDetailsData:'',
            stockOutData:'',
            issueDeptsData:'',
            
            edit: false,
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',
            piecesData:[{_id:'1001', quantity:1},{_id:'1002', quantity:2},{_id:'1003', quantity:4},{_id:'1004', quantity:6},{_id:'1005', quantity:12},{_id:'1006', quantity:24},{_id:'1007', quantity:48}],
            piecesCalculated:0,

            issueProduct:'Issue Product'
            
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

    handleChangeA = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        var calcu = event.target.value * this.state.qtyOut;
        this.setState({piecesCalculated:calcu});
    
        
    }


    handleChange2 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        fetch(`${allRegProds}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
           this.setState({productNamesData:data})
           
        })


    }

    handleChange12 = (event) => {
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


    handleChange4= (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })

        var issueProdVal = 0;
        var totProdVal = issueProdVal + parseInt(this.state.productPrice) * parseInt(event.target.value) * parseInt(this.state.pieces);
        this.setState({productIssueValue:totProdVal})

        var calcu = event.target.value * this.state.pieces;
        this.setState({piecesCalculated:calcu});
    }
    
    handleChange3 = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
        fetch(`${getProductDetails}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
           this.setState({productDetailsData:data})

           var totalQtyIn = data.map(item => item).reduce((totals, item) =>{
            return totals + parseInt(item.qtyIn)
            }, 0);
            this.setState({totalIn:totalQtyIn})

        })
       

        this.myTimer = setTimeout(() => {
            var ProdData = this.state.productDetailsData;
            ProdData.map((item)=>{
                
                var grvCode = item.grvNum;
                var checkID = parseInt(grvCode);
                var computeID = Math.max(checkID);
                
                fetch(`${getLatestPrice}${computeID}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    data.map((item)=>{
                        this.setState({
                            productPrice:item.productPrice,
                            productUnit:item.productUnit,
                            
                        })
                        return 'ok'
                    })
                   
                   
                })
                return 'ok'
            })
           

        },1000)

        fetch(`${getAllStockOut}${event.target.value}`, {method:'GET'})
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

            if(this.state.totalProductBalance===0){
                this.setState({issueProduct:'Out of Stock'})
            }
            else{
                this.setState({issueProduct:'Issue Product'})
            }


        },1000)

        fetch(`${allRegProdNames}${event.target.value}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    productType:item.productType,
                    productSellingPrice:item.productSellingPrice,
                    productTypeID:item.productTypeID,
                    pieces:item.pieces
    
                })
                return 'ok'
            })
        })
       

    }
   

    renderCategory(data){
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

    renderProductType(data){
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

    renderProductNames(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.productName - b.productName);
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

    renderIssueDepts(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.departmentName - b.departmentName);
                return(
                    <>
                         <option key={item._id} value={item.departmentName}>
                            {item.departmentName} 
                        </option>
                    </>
                )
            })
        }
    }


    async handleSubmit() {
       
        try {
            
            var finddeptID = this.state.stockOutData;
            var founddeptID = this.state.sivNum

            var deptDatapost = {
                _id:`${this.state._id}`,
                categoryName:`${this.state.categoryName}`,
                productName:`${this.state.productName}`,
                productUnit:`${this.state.productUnit}`,
                productType:`${this.state.productType}`,
                productTypeID:`${this.state.productTypeID}`,
                productCostPrice:`${this.state.productPrice}`,
                productSellingPrice:`${this.state.productSellingPrice}`,
                sivNum:`${this.state.sivNum}`,
                issueDept:`${this.state.issueDept}`,
                qtyOut:`${this.state.qtyOut}`,
                piecesOut:`${this.state.piecesCalculated}`,
                productIssueValue:`${this.state.productIssueValue}`,
                transDate:moment(`${this.state.transDate}`).format('MMM DD YYYY'),
                pieces:`${this.state.pieces}`,
                name:localStorage.getItem('userInfo')
               
            }

            var POSStore = {
                _id:`${this.state._id}`,
                categoryName:`${this.state.categoryName}`,
                productName:`${this.state.productName}`,
                productUnit:`${this.state.productUnit}`,
                productType:`${this.state.productType}`,
                productTypeID:parseInt(`${this.state.productTypeID}`),
                productIssueValue:`${this.state.productIssueValue}`,
                productSellingPrice:`${this.state.productSellingPrice}`,
                sivNum:`${this.state.sivNum}`,
                qtyOut:`${this.state.qtyOut}`,
                piecesOut:`${this.state.piecesCalculated}`,
                pieces:`${this.state.pieces}`,
                transDate:moment(`${this.state.transDate}`).format('MMM DD YYYY'),
                name:localStorage.getItem('userInfo')
               
            }

            if(finddeptID.some(item => item.sivNum===founddeptID)){
                alert(this.state.productName+ " already Issued");

                fetch(`${getDrinkCategory}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        productTypeData:data,
                    
                    })
                    
                })

                fetch(`${getAllStockOut}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        stockOutData:data,
                    
                    })
        
                    var opening=this.state.stockOutData;
                    var sivCode = 5000000;
        
                    this.myTimer = setTimeout(() => {
                        if(this.state.stockOutData.length===0){
                            
                            var checkID = parseInt(sivCode);
                            var computeID = Math.max(checkID);
                            this.setState({
                                sivNum:computeID
                                
                            })
                                
                            
                        }
                        else{
                            opening.map((item)=>{
                                var checkID = parseInt(item.sivNum);
                                var computeID = Math.max(checkID) +1;
                                this.setState({
                                    sivNum:computeID,
                                    
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
                let result = await fetch(`${postStockIssue}`, {
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
                if(this.state.issueDept==='Bar'){
                    let resultI = await fetch(`${postToInnerBar}`, {
                        method: 'post',
            
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
            
                        body: JSON.stringify(
                            
                            POSStore
                                
                        )
                            
                    });
                    console.log('resultI>  ' + resultI)
                }

                else if(this.state.issueDept==='Open Bar'){
                    let resultO = await fetch(`${postToOpenBar}`, {
                        method: 'post',
            
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
            
                        body: JSON.stringify(
                            
                            POSStore
                                
                        )
                            
                    });
                    console.log('resultO>  ' + resultO)
                }

                else if(this.state.issueDept==='Restaurant Drinks'){
                    let resultRe = await fetch(`${postToRestBar}`, {
                        method: 'post',
            
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
            
                        body: JSON.stringify(
                            
                            POSStore
                                
                        )
                            
                    });
                    console.log('resultRe>  ' + resultRe)
                }


                else if(this.state.issueDept==='PoolBar'){
                    let resultP = await fetch(`${postToPoolBar}`, {
                        method: 'post',
            
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
            
                        body: JSON.stringify(
                            
                            POSStore
                                
                        )
                            
                    });
                    console.log('resultP>  ' + resultP)
                }

                else if(this.state.issueDept==='Club'){
                    let resultP = await fetch(`${postToClub}`, {
                        method: 'post',
            
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
            
                        body: JSON.stringify(
                            
                            POSStore
                                
                        )
                            
                    });
                    console.log('resultP>  ' + resultP)
                }
                alert(this.state.productName+" Issued to "+this.state.issueDept);
                this.setState({
                    categoryName:'',
                    productName:'',
                    productUnit:'',
                    productPrice:'',
                    productType:'',
                    productTypeID:'',
                    totalIn:0,
                    totalOut:0,
                    totalProductBalance:0,
                    sivNum:'',
                    issueDept:'',
                    qtyOut:'',
                    productIssueValue:0,
                    categoryData:'',
                    productNamesData:'',
                    productDetailsData:'',
                    productTypeData:'',
                    stockOutData:'',
                    issueDeptsData:'',
                    pieces:'',
                    productSellingPrice:''
                })

                fetch(`${allStoreCategories}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        categoryData:data,
                    
                    })
                    
                })

                fetch(`${getDrinkCategory}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        productTypeData:data,
                    
                    })
                    
                })

                fetch(`${getAllDepts}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        issueDeptsData:data,
                    
                    })
                    
                })
                
                this.myTimer = setTimeout(() => {
                    
                    this.setState({
                        _id:Math.floor(Math.random()*10000000),
                       
                        
                    })
                },1000)

                fetch(`${getAllStockOut}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        stockOutData:data,
                    
                    })
        
                    var opening=this.state.stockOutData;
                    var sivCode = 5000000;
        
                    this.myTimer = setTimeout(() => {
                        if(this.state.stockOutData.length===0){
                            
                            var checkID = parseInt(sivCode);
                            var computeID = Math.max(checkID);
                            this.setState({
                                sivNum:computeID
                                
                            })
                                
                            
                        }
                        else{
                            opening.map((item)=>{
                                var checkID = parseInt(item.sivNum);
                                var computeID = Math.max(checkID) +1;
                                this.setState({
                                    sivNum:computeID,
                                    
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
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Stock Issue</h4>
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
                                    <label>Category</label>
                                    <select className="form-select  mb-3 formsize51" name="categoryName" onChange={this.handleChange2}>
                                        <option defaultValue=''>Select Category</option>
                                        {this.renderCategory(this.state.categoryData)}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <label>Product</label>
                                    <select className="form-select  mb-3 formsize51" name="productName" onChange={this.handleChange3}>
                                        <option defaultValue=''>Select Product</option>
                                        {this.renderProductNames(this.state.productNamesData)}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <label>Last Supply Price</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem"><NumberFormat value={this.state.productPrice}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className="col-3">
                                    <label>Product Unit</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productUnit}</p>
                                    
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-3">
                                    <label>Product Type</label>
                                    <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productType}</p>
                                    
                                </div>

                                <div className="col-3">
                                    <label>Product ID</label>
                                   <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productTypeID}</p>
                                </div>

                                <div className="col-3">
                                    <label>Selling Price</label>
                                   <p type="text" className="form-control mb-3 formsize51 ikem">{this.state.productSellingPrice}</p>
                                </div>
                                <div className="col-3">
                                    
                                    <label>Pieces per {this.state.productUnit}</label>
                                    <p className="form-control mb-3 formsize51 ikem">{this.state.pieces}</p>
                                       
                                </div>
                               
                            </div>

                            <div className="row">

                                <div className="col-3">
                                    <label>Total In</label>
                                    <p className="form-control mb-3 formsize51 ikem">{this.state.totalIn}</p>
                                </div>

                                <div className="col-3">
                                    <label>SIV Num</label>
                                    <p className="form-control mb-3 formsize51 ikem">{this.state.sivNum}</p>
                                </div>

                                <div className="col-3">
                                    <label>Departments</label>
                                    <select className="form-select  mb-3 formsize51" name="issueDept" onChange={this.handleChange}>
                                        <option defaultValue=''>Issue Dept.</option>
                                        {this.renderIssueDepts(this.state.issueDeptsData)}
                                    </select>
                                </div>

                                <div className="col-3">
                                    
                                    <label>Issue Qty</label>
                                    <input type="number" className="form-control mb-3 formsize51" name="qtyOut" require placeholder="Issue Qty" value={this.state.qtyOut} onChange={this.handleChange4}/>
                                
                                </div>
                                

                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <label>Product Value</label>
                                    <p className="form-control mb-3 formsize51 ikem"><NumberFormat value={this.state.productIssueValue}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className="col-4">
                                <label>Total Out</label>
                                <p className="form-control mb-3 formsize51 ikem">{this.state.totalOut}</p>
                                </div>

                                <div className="col-4">
                                    <label>Total Product Balance</label>
                                    <p className="form-control mb-3 formsize51 ikem">{this.state.totalProductBalance}</p>
                                </div>

                            </div>

                            <center>
                            <br/>
                                <span>
                                    <button disabled={this.state.productName===''||this.state.productPrice===''||this.state.qtyOut===''|| this.state.issueDept===''||this.state.pieces===''||this.state.totalProductBalance===0} className="btn btn-warning" onClick={ () => this.handleSubmit () } >{this.state.issueProduct}</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/storeMenu')}>Close</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                       
                    </div>
                </div>
               
            </>
                
            
            
        );
    }

    componentDidMount() {
        console.log(">>> Inside GrpDidMount", this.state);

        fetch(`${getDrinkCategory}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                productTypeData:data,
            
            })
                    
        })

        fetch(`${allStoreCategories}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                categoryData:data,
            
            })
            
        })
        

        fetch(`${getAllStockOut}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                stockOutData:data,
            
            })

            var opening=this.state.stockOutData;
            var sivCode = 5000000;

            this.myTimer = setTimeout(() => {
                if(this.state.stockOutData.length===0){
                    
                    var checkID = parseInt(sivCode);
                    var computeID = Math.max(checkID);
                    this.setState({
                        sivNum:computeID
                        
                    })
                        
                    
                }
                else{
                    opening.map((item)=>{
                        var checkID = parseInt(item.sivNum);
                        var computeID = Math.max(checkID) +1;
                        this.setState({
                            sivNum:computeID,
                            
                        })
                        return 'ok'
                    })
                }
                
            },1000);
            
        })

        fetch(`${getAllDepts}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                issueDeptsData:data,
            
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



export default stockOut;