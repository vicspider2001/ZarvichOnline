import React,{Component} from 'react';
import './RestReport.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import Login from '../Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const sales='http://10.1.0.99:3333/restaurantSales';




class ComponentToPrintA extends Component {
    constructor(props){
        super(props)
        console.log(">>>Inside CompToConstructor",props)

        this.state={
            RestprintData:'',
            
        }
    }

    renderPrintData(data){
        if(data)
        return data.map((item) =>{
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
                        
                    </>            
                )
            
        })
    }

    render() {
        console.log(">>> Inside CompTorender", this.state)
        if(localStorage.getItem('userInfo')==null){
            return(
                <>
                    <Login/>
                </>
            )

        }
        return(
            <div className="print-source">
                <div>
                    <img src= "zarvichlogo.png" className="alignImg" style={{width:"100px", height:"70px"}} alt="logo"/>
                </div>
                <div>
                    <center>
                        <h6>Zarvich Hotels Ltd.</h6>
                        <p className="textSize">No ABC Road, Wuse II, Abuja, Nigeria</p>
                        <p className="textSize">+234 803 590 5421, info@zarvichosh.com</p>
                       
                    </center>
                </div>
                <center><h5>Restaurant Sales Report</h5></center>
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
                        {this.renderPrintData(this.state.RestprintData)}
                    </tbody>
                </table>            
            </div>
        );
    }
    componentDidMount(){
        console.log (">>> Inside CompTodidMount")
        fetch(sales, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                RestprintData:data
            })
            
        })

        
    }
}
export default ComponentToPrintA;