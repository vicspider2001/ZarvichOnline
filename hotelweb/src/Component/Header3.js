import React, {Component} from 'react';
import './Header.css';
import {withRouter} from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import ComponentToPrintA from './Restaurant/ComponentToPrintA';
import 'bootstrap/dist/css/bootstrap.min.css';




class Header3 extends Component {
      

    render(){
        return (
            <div className="black">
                
                <span>
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary buttncontrol5 mb-3 mt-3">Print Sales</button>}
                        content={() => this.componentRef}
                    />
                    <ComponentToPrintA ref={el => (this.componentRef = el)} />

                    <button className="btn btn-danger buttncontrol6 mb-3 mt-3"onClick={ ()=> {this.props.history.push('./BarPortal')}}>Close</button>
                   
                </span>
                
            
            </div>
        )
    }
   
    
}
export default withRouter (Header3);