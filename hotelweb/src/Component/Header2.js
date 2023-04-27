import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const actionUrl = "http://10.1.0.99:3333/checkin?guest="

class Header2 extends Component {
    constructor(props) {
        super()

        this.state={
            guestdata:''
        }
    }
    

    render(){
        return (
            <div className="black">
                
                <span>
                    <Link to={`/stay/${sessionStorage.getItem('rmNum')}`}>
                        <button className="btn btn-primary mt-3 mb-3 buttncontrol1 printing">Extend Stay</button>
                    </Link>
                    <Link to={`/change/${sessionStorage.getItem('rmNum')}`}>
                        <button className="btn btn-primary mt-3 mb-3 buttncontrol2 printing">Room Change</button>
                    </Link>
                    <button className="btn btn-warning movebtn printing" onClick={ () => window.print() }>Print Form</button>
                    <Link to="/roomchart">
                        <button className="btn btn-danger buttncontrol3 printing">Close</button>
                    </Link>
                </span>
                
            
            </div>
        )
    }
    componentDidMount(){
        console.log(">>> Inside GsDidMount", this.state)

        var guID = this.props.match.params.stID;
        var nwID = parseInt(guID)
       fetch(`${actionUrl}${nwID}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                guestdata:data
            })
        })
    }

    
}
export default withRouter (Header2);