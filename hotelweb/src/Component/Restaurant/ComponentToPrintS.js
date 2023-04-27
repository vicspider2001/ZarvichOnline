import React,{Component} from 'react';
import './Restaurant.css';
import NumberFormat from 'react-number-format';
import Login from '../Login';
import 'bootstrap/dist/css/bootstrap.min.css';


class ComponentToPrintS extends Component {
    constructor(props){
        super(props)
        console.log(">>>Inside PRConstructor",props)

        this.state = {
            printTable:[]
        }
    }

    
    renderPrintTable(data){
        localStorage.removeItem('printItems')
        if(data) {
            return data.map((item, index) => {
                return(
                    <>
                        <tr key= {index}>
                            <td className="table-light table-striped adjust">{item.id}</td>
                            <td className="table-light table-striped adjust">{item.meal}</td>
                            <td className="table-light table-striped adjust">{item.qty}</td>
                            <td className="table-light table-striped adjust"><NumberFormat value={item.mealPrice} thousandSeparator={true} displayType={"text"}/></td>
                                
                        </tr>      
                    </>
                )
            })
        }
    }
    
    
    render() {
        console.log(">>> Inside PRrender", this.state)

        if(localStorage.getItem('userInfo')==null){
            return(
                <>
                    <Login/>
                </>
            )

        }
        
        return(
            <div className="print-source">
                <table className="table table-hover">
                    <thead className="table-warning">
                        <tr>
                            <th className="adjust">ID</th>
                            <th className="adjust">Menu</th>
                            <th className="adjust">Qty</th>
                            <th className="adjust">Price(=N)</th>
                                    
                        </tr>
                    </thead>
                <tbody className="table table-hover">
                    {this.renderPrintTable(this.state.printTable)}
                                
                </tbody>
                </table>            
            </div>
        );
    }
    componentDidMount(){
        console.log (">>> Inside PRdidMount")
        let newPrintItems = JSON.parse(localStorage.getItem('printMenus'));
            this.setState({printTable:newPrintItems})
    }
}
export default ComponentToPrintS;