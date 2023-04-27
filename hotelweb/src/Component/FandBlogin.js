import React, { Component } from 'react';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import './Bar/BarReport.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const userLogin = "http://10.1.0.99:3333/fandbUserInfo?fandbcode=";
const userName = "http://10.1.0.99:3333/fandbUserInfo";



class FandBlogin extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside loginConstructor", props)
       
        this.state = {
            login: false,
            userInfo:'',
            userPassword:'',
            authPassword:'',
            selectUserName:'',
            shift:'',
            
        };
        
    }

    login(){
        fetch(`${userLogin}${this.state.userPassword}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({userInfo:data})
           
            this.myTimer = setTimeout(() => {
                if(this.state.userInfo.length>0){
                    this.setState({
                        login: false
                        
                    })
                    window.location.reload();
                    data.map((item) =>{
                        localStorage.setItem('userInfo',item.name);
                        localStorage.setItem('shift',this.state.shift);
                        return 'ok'
                    })
                }
            },1000)
           
        })

    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    onCloseModallogin(){
        this.setState({
            login: true
        })
        
    }

    render() {
        console.log (">>> Inside logindetails", this.state)
        return (
            <>
                <Modal open={this.state.login} onClose={()=>this.onCloseModallogin()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Login First</h6>
                            <div>
                                <center>
                                    
                                    <input type="password" autoComplete="off" className="form-control mb-3 formsize51" name="userPassword" require placeholder="Enter password" value={this.state.userPassword} onChange={this.handleChange}/>
                                    <input type="text" className="form-control mb-3 formsize51" name="shift" require placeholder="Select Shift" value={this.state.shift} list="shift"  onChange={this.handleChange}/>
                                    <datalist id="shift">
                                        <option value = "Morning Shift"></option>
                                        <option value = "Night Shift"></option>
                                        <option value = "All Day"></option>
                                    </datalist>
                                    <button disabled = {this.state.userPassword===''||this.state.shift===''} className="btn btn-warning formsize91" onClick={()=>this.login()}>Login</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
        
    componentDidMount() {
        console.log(">>> Inside loginDidMount", this.state)
        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                selectUserName:data,
                login: true
            
            });
            
        })

    }

}

export default FandBlogin;