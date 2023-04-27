import React, { Component } from 'react';
import Storelogin from '../Storelogin';
import '../Reception/Reception.css';
import 'react-responsive-modal/styles.css';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import 'react-datepicker/dist/react-datepicker.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';


const stockInCategoryUrl= "http://10.1.0.99:3333/storeTran";
const stockOutCategoryUrl= "http://10.1.0.99:3333/stockOutNow";

const storeCategoriesUrl= "http://10.1.0.99:3333/storeTypes";
const allRegProds= "http://10.1.0.99:3333/products"
const deptUrl= "http://10.1.0.99:3333/issueDepts";

const userName = "http://10.1.0.99:3333/storeUserInfo";



class StoreReport extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            AllOpeningstock:'',
            AllClosingstock:'',

            CategoryOpeningstock:'',
            CategoryClosingstock:'',
            CatStInQty:'',
            CatStOutQty:'',
            CategoryStockIn:'',
            CategoryStockOut:'',
            categoryName:'',
            categoryData:'',
            
            prodctName:'',
            productStockInData:'',
            productStockOutData:'',
            ProdStInQty:'',
            ProdStOutQty:'',
            productNamesData:'',

            deptName:'',
            deptStockInData:0,
            deptStockOutData:'',
            // deptStInQty:0,
            deptStOutQty:0,
            deptNamesData:'',

            startdate:'',
            endDate:'',
            

            show:'hidden',
            prodshow:'hidden',
            showcategory:'hidden',
            showproductName:'hidden',
            showdeptName:'hidden',
            showdept:'hidden',


            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',


           
            
        };
        this.checkinhandleChange = this.checkinhandleChange.bind(this);
        this.endhandleChange = this.endhandleChange.bind(this);
      

    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    cleanupfirst(){
        this.setState({ 
            CategoryStockIn:'',
            CatStInQty:'',
            CategoryStockOut:'',
            CatStOutQty:''
            
        })
    }

    cleanupNow(){
        this.setState({ 
            productStockInData:'',
            productStockOutData:'',
            ProdStInQty:'',
            ProdStOutQty:''
           
        })
    }

    cleanupDept(){
        this.setState({ 
            deptStockInData:'',
            deptStockOutData:'',
            // deptStInQty:'',
            deptStOutQty:''
           
        })
    }

    cleanupAllDept(){
        this.setState({ 
            deptStockInData:'',
            deptStockOutData:'',
            // deptStInQty:'',
            deptStOutQty:'',
            showdept:'hidden'

        })
    }

    cleanupAll(){
        this.setState({ 
            CategoryStockIn:'',
            CatStInQty:'',
            CategoryStockOut:'',
            CatStOutQty:'',
            show:'hidden'

        })
    }
    
    cleanupAllNow(){
        this.setState({ 
            productStockInData:'',
            productStockOutData:'',
            ProdStInQty:'',
            ProdStOutQty:'',
            prodshow:'hidden'

        })
    }

    checkinhandleChange(date) {
        this.setState({
            startdate: date
            
        });
    }

    endhandleChange(date) {
        this.setState({
            endDate: date
        });
    }

    renderDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.startdate}
                    onChange={this.checkinhandleChange}
                    maxDate={addDays(new Date(),0)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize51 alignText112"
                    placeholderText='Search Start Date'
                />
            </div>
        )
    }

    renderendDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.endDate}
                    onChange={this.endhandleChange}
                    maxDate={(new Date())}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize51"
                    placeholderText="Search End Date"
                />
            </div>
        )
    }

    handleChange=(event)=>{
        
        this.setState({
            [event.target.name]:event.target.value
        })

    }

    findCategory(){

        var Catstart = moment(this.state.startdate).format('MMM DD YYYY');
        var Catend = moment(this.state.endDate).format('MMM DD YYYY');
        
        var findCatStockIn = `${stockInCategoryUrl}?categoryIn=${this.state.categoryName}&&startDateIn=${Catstart}&&endDateIn=${Catend}`
        var findCatStockOut = `${stockOutCategoryUrl}?category=${this.state.categoryName}&&startDateCat=${Catstart}&&endDateCat=${Catend}`

        fetch(`${findCatStockIn}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {

            this.setState({CategoryStockIn:data});

            var CatStockInQty = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.productValue)
            }, 0);
            this.setState({CatStInQty:CatStockInQty});
        })

        fetch(`${findCatStockOut}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {

            this.setState({CategoryStockOut:data});

            var CatStockOutQty = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.productIssueValue)
            }, 0);
            this.setState({CatStOutQty:CatStockOutQty});
        })
        this.setState({show:'visible'})

    }

    findProduct(){

        var Prodstart = moment(this.state.startdate).format('MMM DD YYYY');
        var Prodend = moment(this.state.endDate).format('MMM DD YYYY');
        
        var findProdStockIn = `${stockInCategoryUrl}?prodName=${this.state.prodctName}&&startDateInProd=${Prodstart}&&endDateInProd=${Prodend}`
        var findProdStockOut = `${stockOutCategoryUrl}?prodOutName=${this.state.prodctName}&&startDateProd=${Prodstart}&&endDateProd=${Prodend}`

        fetch(`${findProdStockIn}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {

            this.setState({productStockInData:data});

            var ProdStockInQty = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.productValue)
            }, 0);
            this.setState({ProdStInQty:ProdStockInQty});
        })

        fetch(`${findProdStockOut}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {

            this.setState({productStockOutData:data});

            var prodStockOut = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.productIssueValue)
            }, 0);
            this.setState({ProdStOutQty:prodStockOut});
        })
        this.setState({prodshow:'visible'})

    }

    findDept(){

        var start = moment(this.state.startdate).format('MMM DD YYYY');
        var end = moment(this.state.endDate).format('MMM DD YYYY');
        
        var findDeptStockOut = `${stockOutCategoryUrl}?deptOutName=${this.state.deptName}&&startDateDept=${start}&&endDateDept=${end}`

        
        fetch(`${findDeptStockOut}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {

            this.setState({deptStockOutData:data});

            var deptStockOut = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.productIssueValue)
            }, 0);
            this.setState({deptStOutQty:deptStockOut});
        })
        this.setState({showdept:'visible'})

    }

    showCat(){
        
        this.setState({
            showproductName:'hidden',
            showdeptName:'hidden',
            showcategory:'visible',
            deptStockInData:'',
            deptStockOutData:'',
            // deptStInQty:'',
            deptStOutQty:'',
            showdept:'hidden',
            productStockInData:'',
            productStockOutData:'',
            ProdStInQty:'',
            ProdStOutQty:'',
            categoryName:'',
            prodctName:'',
            deptName:'',
            prodshow:'hidden',
            startdate:'',
            endDate:''
            

        })
       
        
    }

    showProd(){
        
        this.setState({
            showcategory:'hidden',
            showdeptName:'hidden',
            showproductName:'visible',
            CategoryStockIn:'',
            CatStInQty:'',
            CategoryStockOut:'',
            CatStOutQty:'',
            show:'hidden',
            deptStockInData:'',
            deptStockOutData:'',
            // deptStInQty:'',
            deptStOutQty:'',
            categoryName:'',
            prodctName:'',
            deptName:'',
            showdept:'hidden',
            startdate:'',
            endDate:''
           
        })
        
        
    }

    showdept(){
        this.setState({
            showcategory:'hidden',
            showproductName:'hidden',
            showdeptName:'visible',
            CategoryStockIn:'',
            CatStInQty:'',
            CategoryStockOut:'',
            CatStOutQty:'',
            show:'hidden',
            productStockInData:'',
            productStockOutData:'',
            ProdStInQty:'',
            ProdStOutQty:'',
            categoryName:'',
            prodctName:'',
            deptName:'',
            prodshow:'hidden',
            startdate:'',
            endDate:''
        })
    }

    showNone(){
        this.setState({
            showcategory:'hidden',
            showproductName:'hidden',
            showdeptName:'hidden',
            show:'hidden',
            prodshow:'hidden',
            showdept:'hidden',
            categoryName:'',
            prodctName:'',
            deptName:'',
            startdate:'',
            endDate:''
            
            
           
        })
    }



    renderCategory(data){
        if(data){
            return data.map((item) =>{
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

    renderdeptNames(data){
        if(data){
            return data.map((item)=>{
                data.sort((a,b)=>a.departmentID - b.departmentID);
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

    renderStockInData=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
                data.sort((a,b)=>a.supplyDate - b.supplyDate);
                var supplyDate = moment(item.supplyDate).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{supplyDate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.productName}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.productUnit}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.qtyIn}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.productPrice}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.productValue}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet">{item.vendorName}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.invoiceNum}</td>
                            
                            
                        </tr> 
                    </>
                )
               
            })
            
        }
        
           
    }

    renderStockOutData=(data)=>{
       
        if(data){
           
            return data.map((item)=>{
                data.sort((a,b)=>a.transDate - b.transDate);
                var TDate = moment(item.transDate).format('MMM DD YYYY');
                return(
                    <>
                        <tr key= {item._id}>
                            
                            <td className="table-light table-striped adjust2">{TDate}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.productName}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.productUnit}</td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.qtyOut}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.productCostPrice}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet2"><NumberFormat value={item.productIssueValue}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2 alignTet">{item.issueDept}</td>
                            <td className="table-light table-striped adjust2 alignTet">{item.productType}</td>
                            
                            
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
                <div  className="background990ib212">
                    <br/><br/>
                    <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Stock Movement</h4>
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
                                <div className='col-4'>
                                    <label>Total Opening Stock</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.AllOpeningstock)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className='col-4'>
                                    <label>Total Closing Stock</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.AllOpeningstock) - parseInt(this.state.AllClosingstock)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className='col-4'>
                                    <label>Total Cost of Sales</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.AllClosingstock)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    <center className='mt-3'>
                        <button className="btn btn-primary" onClick={ () => this.showCat()}>Search By Store</button>
                        <button className="btn btn-primary space" onClick={ () => this.showProd()}>Search By Product</button>
                        <button className="btn btn-primary space" onClick={ () => this.showdept()}>Search By Department</button>
                        <button className="btn btn-danger space" onClick={ () => this.showNone()}>Reset</button>
                        <button className="btn btn-warning space" onClick={() => this.props.history.push('/storeMenu')}>Store Menu</button>
                        <button className="btn btn-warning space" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
                    </center>


                    <div className={this.state.showcategory}>
                    <div className='searchOptions'>
                        <div className="formdesign510b212">
                            <div className="container">
                                <div className="row">
                                    <div className='col-4'>
                                        <label>Select Store</label>
                                        <input type="text" className="form-control mb-3 formsize51" name="categoryName" value={this.state.categoryName} list="category" onChange={this.handleChange}/>
                                        <datalist id="category">
                                            {this.renderCategory(this.state.categoryData)}
                                        </datalist>
                                    </div>
                                    
                                    <div className='col-4'>
                                        <label><label>Search Start Date</label></label>
                                            {this.renderDate(this.state.startdate)}
                                        
                                    
                                        
                                    </div>
                                    <div className='col-4'>
                                        <label>Search End Date</label>
                                        {this.renderendDate(this.state.endDate)}
                                        
                                    </div>
                                    
                                    
                                </div>
                                
                            </div>
                            <center>
                                <button className="btn btn-primary" onClick={ () => {this.cleanupfirst();this.findCategory()}}>Search</button>
                                <button className="btn btn-danger space" onClick={ () => {this.cleanupAll()}}>Reset</button>
                            </center>
                            
                        </div>
                    </div>
                    </div>

                    <div className={this.state.showproductName}>
                    <div className='searchPlacement'>
                        <div className="formdesign510b212">
                            <div className="container">
                                <div className="row">
                                    <div className='col-4'>
                                        <label>Select Product</label>
                                        <input type="text" className="form-control mb-3 formsize51" name="prodctName" value={this.state.prodctName} list="product" onChange={this.handleChange}/>
                                        <datalist id="product">
                                            {this.renderProductNames(this.state.productNamesData)}
                                        </datalist>
                                    </div>
                                    
                                    <div className='col-4'>
                                        <label><label>Search Start Date</label></label>
                                            {this.renderDate(this.state.startdate)}
                                        
                                    
                                        
                                    </div>
                                    <div className='col-4'>
                                        <label>Search End Date</label>
                                        {this.renderendDate(this.state.endDate)}
                                        
                                    </div>
                                    
                                    
                                </div>
                                
                            </div>
                            <center>
                                <button className="btn btn-primary" onClick={ () => {this.cleanupNow();this.findProduct()}}>Search</button>
                                <button className="btn btn-danger space" onClick={ () => {this.cleanupAllNow()}}>Reset</button>
                            </center>
                            
                        </div>
                    </div>
                    </div>

                    <div className={this.state.showdeptName}>
                    <div className='searchPlacement'>
                        <div className="formdesign510b212">
                            <div className="container">
                                <div className="row">
                                    <div className='col-4'>
                                        <label>Select Department</label>
                                        <input type="text" className="form-control mb-3 formsize51" name="deptName" value={this.state.deptName} list="departments" onChange={this.handleChange}/>
                                        <datalist id="departments">
                                            {this.renderdeptNames(this.state.deptNamesData)}
                                        </datalist>
                                    </div>
                                    
                                    <div className='col-4'>
                                        <label><label>Search Start Date</label></label>
                                            {this.renderDate(this.state.startdate)}
                                        
                                    
                                        
                                    </div>
                                    <div className='col-4'>
                                        <label>Search End Date</label>
                                        {this.renderendDate(this.state.endDate)}
                                        
                                    </div>
                                    
                                    
                                </div>
                                
                            </div>
                            <center>
                                <button className="btn btn-primary" onClick={ () => {this.cleanupDept();this.findDept()}}>Search</button>
                                <button className="btn btn-danger space" onClick={ () => {this.cleanupAllDept()}}>Reset</button>
                            </center>
                            
                        </div>
                    </div>
                    </div>

                    <div className={this.state.show}>
                    <div className="formdesign510b212 detailoption">
                        <div className="container">
                            <div className="row">
                                <div className='col-4'>
                                    <label>{this.state.categoryName} Opening Stock</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.CatStInQty)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className='col-4'>
                                    <label>{this.state.categoryName} Closing Stock</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.CatStInQty) - parseInt(this.state.CatStOutQty)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className='col-4'>
                                    <label>{this.state.categoryName} Cost of Sales</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.CatStOutQty)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        <hr/>
                        <h6>{this.state.categoryName} Supply</h6>
                        <table className="table table-hover">
                            <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Supply Date</th>
                                <th className="adjust50">Product Name</th>
                                <th className="adjust50">Product Unit</th>
                                <th className="adjust50">Qty Supplied</th>
                                <th className="adjust50">Cost Price</th>
                                <th className="adjust50">Value</th>
                                <th className="adjust50">Vendor</th>
                                <th className="adjust50">Inv No.</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderStockInData(this.state.CategoryStockIn)}
                                
                            </tbody>
                        </table>
                        <b><p style={{textAlign:'center'}}>Total: <NumberFormat value={this.state.CatStInQty}thousandSeparator={true}displayType={"text"}/></p></b>
                        <hr/>
                        <h6>{this.state.categoryName} Issue</h6>
                        <table className="table table-hover">
                            <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Issue Date</th>
                                <th className="adjust50">Product Name</th>
                                <th className="adjust50">Product Unit</th>
                                <th className="adjust50">Qty Issued</th>
                                <th className="adjust50">Cost Price</th>
                                <th className="adjust50">Value</th>
                                <th className="adjust50">Issue Dept</th>
                                <th className="adjust50">Product Type</th>
                              
                                
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderStockOutData(this.state.CategoryStockOut)}
                            </tbody>
                        </table>
                        <b><p style={{textAlign:'center'}}>Total: <NumberFormat value={this.state.CatStOutQty}thousandSeparator={true}displayType={"text"}/></p></b>


                        
                    </div>
                    </div>

                   
                    <div className={this.state.prodshow}>
                    <div className="formdesign510b212 detailplacement">
                        <div className="container">
                            <div className="row">
                                <div className='col-4'>
                                    <label>{this.state.prodctName} Opening Stock</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.ProdStInQty)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className='col-4'>
                                    <label>{this.state.prodctName} Closing Stock</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.ProdStInQty) - parseInt(this.state.ProdStOutQty)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className='col-4'>
                                    <label>{this.state.prodctName} Cost of Sales</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.ProdStOutQty)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        <hr/>
                        <h6>{this.state.prodctName} Supply</h6>
                        <table className="table table-hover">
                            <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Supply Date</th>
                                <th className="adjust50">Product Name</th>
                                <th className="adjust50">Product Unit</th>
                                <th className="adjust50">Qty Supplied</th>
                                <th className="adjust50">Cost Price</th>
                                <th className="adjust50">Value</th>
                                <th className="adjust50">Vendor</th>
                                <th className="adjust50">Inv No.</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderStockInData(this.state.productStockInData)}
                                
                            </tbody>
                        </table>
                        <b><p style={{textAlign:'center'}}>Total: <NumberFormat value={this.state.ProdStInQty}thousandSeparator={true}displayType={"text"}/></p></b>
                        <hr/>
                        <h6>{this.state.prodctName} Issue</h6>
                        <table className="table table-hover">
                            <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Issue Date</th>
                                <th className="adjust50">Product Name</th>
                                <th className="adjust50">Product Unit</th>
                                <th className="adjust50">Qty Issued</th>
                                <th className="adjust50">Cost Price</th>
                                <th className="adjust50">Value</th>
                                <th className="adjust50">Issue Dept</th>
                                <th className="adjust50">Product Type</th>
                              
                                
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderStockOutData(this.state.productStockOutData)}
                            </tbody>
                        </table>
                        <b><p style={{textAlign:'center'}}>Total: <NumberFormat value={this.state.ProdStOutQty}thousandSeparator={true}displayType={"text"}/></p></b>


                        
                    </div>
                    </div>


                    <div className={this.state.showdept}>
                    <div className="formdesign510b212 detailplacement">
                        <div className="container">
                           
                            <div className="row">
                                {/* <div className='col-4'>
                                    <label>Department Opening Stock</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.deptStInQty)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>

                                <div className='col-4'>
                                    <label>Department Closing Stock</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.deptStInQty) - parseInt(this.state.deptStOutQty)}thousandSeparator={true}displayType={"text"}/></p>
                                </div> */}
                                
                                <center>
                                <div className='col-4'>
                                    <label>{this.state.deptName} Cost of Sales</label>
                                    <p className="form-control mb-3 formsize51 ikem" style={{fontSize:'18px'}}><NumberFormat value={parseInt(this.state.deptStOutQty)}thousandSeparator={true}displayType={"text"}/></p>
                                </div>
                                </center>
                                
                            </div>
                            
                        </div>
                       
                        
                        {/* <hr/>
                        <h6>Products Supply</h6>
                        <table className="table table-hover">
                            <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Supply Date</th>
                                <th className="adjust50">Product Name</th>
                                <th className="adjust50">Product Unit</th>
                                <th className="adjust50">Qty Supplied</th>
                                <th className="adjust50">Cost Price</th>
                                <th className="adjust50">Value</th>
                                <th className="adjust50">Vendor</th>
                                <th className="adjust50">Remark</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderStockInData(this.state.deptStockInData)}
                                
                            </tbody>
                        </table>
                        <b><p style={{textAlign:'center'}}>Total: <NumberFormat value={this.state.deptStOutQty}thousandSeparator={true}displayType={"text"}/></p></b> */}
                        <hr/>
                        <h6>{this.state.deptName}  Issue</h6>
                        <table className="table table-hover">
                            <thead className="table-warning">
                            <tr>
                                <th className="adjust50">Issue Date</th>
                                <th className="adjust50">Product Name</th>
                                <th className="adjust50">Product Unit</th>
                                <th className="adjust50">Qty Issued</th>
                                <th className="adjust50">Cost Price</th>
                                <th className="adjust50">Value</th>
                                <th className="adjust50">Issue Dept</th>
                                <th className="adjust50">Product Type</th>
                              
                                
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderStockOutData(this.state.deptStockOutData)}
                            </tbody>
                        </table>
                        <b><p style={{textAlign:'center'}}>Total: <NumberFormat value={this.state.deptStOutQty}thousandSeparator={true}displayType={"text"}/></p></b>


                        
                    </div>
                    </div>
                    
                    
                </div>
                
               
            </>
                
            
            
        );
    }

    componentDidMount() {
        console.log(">>> Inside GrpDidMount", this.state);
        
        fetch(`${stockInCategoryUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            
            var AllStockinValue = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.productValue)
            }, 0);
            
            this.setState({AllOpeningstock:AllStockinValue});
                
        })

        fetch(`${stockOutCategoryUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {

            var AllStockOutValue = data.map(item => item).reduce((totals, item) =>{
                return totals + parseInt(item.productIssueValue)
            }, 0);
            this.setState({AllClosingstock:AllStockOutValue});
 
        })

        fetch(`${storeCategoriesUrl}`, {method: 'GET'})
        .then((res)=> res.json())
        .then((data) => {
            this.setState({categoryData:data})
            
        })

        fetch(`${allRegProds}`, {method: 'GET'})
        .then((res)=> res.json())
        .then((data) => {
            this.setState({productNamesData:data})
            
        })

        fetch(`${deptUrl}`, {method: 'GET'})
        .then((res)=> res.json())
        .then((data) => {
            this.setState({deptNamesData:data})
            
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



export default StoreReport;