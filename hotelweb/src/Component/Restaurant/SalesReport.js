import React,{Component} from 'react';
import './RestReport.css';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import Header3 from '../Header3';
import Login from '../Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const salesRecordsUrl='http://10.1.0.99:3333/restaurantSales';
const userName = "http://10.1.0.99:3333/barUserInfo";


class SalesReport extends Component {
    constructor(props){
        super(props)
        console.log(">>>Inside SalesConstructor",props)

        this.state={
            salesRecords:'',
            totalSales:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''
            
            
        }
    }

    handleTotal(){
        const total = this.state.salesRecords.reduce((totalCost, item) => totalCost + parseInt(item.amountPaid), 0)
        this.setState({totalSales:total})
    }
   
    renderSalesData(data){
        
        if(data)
        return data.map((item, _id) =>{
                return(
                    <>
                        <tr key= {item._id}>
                        <td className="table-light table-striped adjust2">{moment(item.date).format('MMM DD YYYY')}</td>
                            <td className="table-light table-striped adjust2">{item.docketNum}</td>
                            <td className="table-light table-striped adjust2">{item.refID}</td>
                            <td className="table-light table-striped adjust2">{item.roomNumbers}</td>
                            <td className="table-light table-striped adjust2">{item.paymentMethod}</td>
                            <td className="table-light table-striped adjust2"><NumberFormat value={item.cost} thousandSeparator={true} displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2"><NumberFormat value={item.amountPaid} thousandSeparator={true} displayType={"text"}/></td>
                          
                        </tr> 
                        <div className="accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h5 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"  aria-expanded="false" aria-controls="flush-collapseOne">
                                        <b style={{color:'blue'}}>Order Details</b>
                                    </button>
                                </h5>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">

                                        { item.docketDetails.map(food => (
                                            
                                            <>
                                                {food.meal} (<NumberFormat value={food.mealPrice} thousandSeparator={true} displayType={"text"}/>.00), &nbsp;;
                                                
                                            
                                            </>
                                            
                                        ))}
                                    </div>
                                                
                                        
                                </div>
                            </div>
                        </div>
                        
                            
                         
                    </>            
                )
            
        })
    }

    render() {
        console.log(">>> Inside CompTorender", this.state)

        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Login/>
                </>
            )

        }
        
        return(
            <>
            
              <Header3/>
                <center><h5>Daily Sales Report</h5></center>
                <br/>
                <table className="table table-hover">

                    <thead className="table-warning">
                       
                        <tr>
                        <th className="adjust2">Date</th>
                            <th className="adjust2">Docket Num</th>
                            <th className="adjust2">Room ID</th>
                            <th className="adjust2">Room Num</th>
                            <th className="adjust2">Payment Method</th>
                            <th className="adjust2">Price(=N)</th>
                            <th className="adjust2">AMount Paid(=N)</th>
                                                                
                        </tr>
                    </thead>
                    
                    <tbody className="table table-hover">
                        {this.renderSalesData(this.state.salesRecords)}
                    </tbody>
                </table>   
                
                      
            
                
                        
            </>
        );
    }
    componentDidMount(){
        console.log (">>> Inside SalesTodidMount")
       
       
        fetch(salesRecordsUrl, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({salesRecords:data})
           
            
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
export default SalesReport;