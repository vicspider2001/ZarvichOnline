import React, { Component } from 'react';
import 'react-responsive-modal/styles.css';
import './BarReport.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-responsive-modal';


const loginUrl = "https://us3.localto.net:39344/api/auth/login";
const getUserData = "https://us3.localto.net:39344/api/auth/userinfo";
const postAdminUsers = "https://us3.localto.net:39344/api/auth/register";




class Adlogin extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside loginConstructor", props)
       this.state={
            password:'',
            email:'',
            message:'',
            login: true,
            userdat:'',
            userMail:'',
            registerfirst: false,

            username:'',
            userphone:'',
            useremailAD:'',
            userpassword:''

        }
        
    }

    loginNow(){
        try{
            const msg = {
                password:`${this.state.password}`,
                email:`${this.state.email}`,
                message:`${this.state.message}`,
                
            }
            fetch(loginUrl,{
                method:'POST',
                headers:{
                    'accept':'application/json',
                    'content-type':'application/json'
                },
                body:JSON.stringify(msg)
            })
    
            .then((res) => res.json())
            .then((data) => {
                if(data.auth ===  false){
                    this.setState({message:data.token});
                    alert(this.state.message)
                }else{
                    localStorage.setItem('rtk',data.token)
                    
                    this.myTimer = setTimeout(()=>{
                        fetch(getUserData, {
                            method: 'GET',
                            headers:{
                                'x-access-token':localStorage.getItem('rtk')
                            }
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            
                            localStorage.setItem('userdata',data.name)
                            this.setState({
                                userMail: data.email
                            })
                            if(this.state.userMail==='admin@majesticgarden.com'){
                                this.setState({
                                    login:false,
                                    registerfirst:true
                                    
                                })
                                
                                
                            }
                            else{
                                this.setState({
                                    login:false,
                                    registerfirst:false
                                                                    
                                })
                                window.location.reload();
                            }
                        })
                        
                    },1000)

                    
                    
                }
            })
        }catch(e) {
            console.log(e)
        }
        

    }

    async registerNow() {
       
        try {
            const Reg = {
                name: `${this.state.username}`,
                phone: `${this.state.userphone}`,
                email: `${this.state.useremailAD}`,
                password: `${this.state.userpassword}`,
               
            }

            fetch(postAdminUsers,{
                method:'POST',
                headers:{
                    'accept':'application/json',
                    'content-type':'application/json'
                },
                body:JSON.stringify(Reg)
            })
    
            .then(this.setState({
                login: true,
                registerfirst:false
            }))
            
        }catch(e) {
            console.log(e)
        }

    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    onCloseModallogin(){
        this.setState({
            login: false
        })
        
    }

    closePage(){
        this.setState({
            registerfirst: false
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
                                    
                                    <input autoComplete="off" className="form-control mb-3 formsize51" name="email" require placeholder="Input Email" value={this.state.email} onChange={this.handleChange}/>
                                    <input type="password" autoComplete="off" className="form-control mb-3 formsize51" name="password" require placeholder="Enter Password" value={this.state.password} onChange={this.handleChange}/>
                                    <button disabled={this.state.email===''} className="btn btn-warning formsize91" onClick={()=>this.loginNow()}>Login</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                    
                </Modal>
                
                    
                
                <Modal open={this.state.registerfirst} onClose={()=>this.closePage} center>
                    
                        <div>
                            <div className="formdesign152">
                                <h6 className="mb-3">Register First</h6>
                                <div>
                                    <input autoComplete="off" className="form-control mb-3 formsize51" name="username" require placeholder="Enter Name" value={this.state.username} onChange={this.handleChange}/>
                                    <input autoComplete="off" className="form-control mb-3 formsize51" name="userphone" require placeholder="Enter Phone" value={this.state.userphone} onChange={this.handleChange}/>
                                    <input autoComplete="off" className="form-control mb-3 formsize51" name="useremailAD" require placeholder="Enter Email" value={this.state.useremailAD} onChange={this.handleChange}/>
                                    <input type="password" autoComplete="off" className="form-control mb-3 formsize51" name="userpassword" require placeholder="Enter Password" value={this.state.userpassword} onChange={this.handleChange}/>
                                    <button disabled={this.state.useremailAD===''}className="btn btn-warning formsize91" onClick={()=>this.registerNow()}>Register</button>
                                </div>
                            </div>
                        </div>
                    
                </Modal>
               
            </>
        );
    }
        
    
}

export default Adlogin;