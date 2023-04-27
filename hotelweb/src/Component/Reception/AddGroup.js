import React, { Component } from 'react';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import FLogin from '../FLogin';
import './Reception.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const groupUrl= "http://10.1.0.99:3333/org";
const getgroupID= "http://10.1.0.99:3333/org?groupID=";
const postGroup= "http://10.1.0.99:3333/postOrg";
const putGroup= "http://10.1.0.99:3333/putOrg";
const delGroup= "http://10.1.0.99:3333/delorg";
const userName = "http://10.1.0.99:3333/fofUserInfo";


class AddGroup extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            groupData:'',
            class:'Corporate',
            orgAddress:'',
            orgEmail:'',
            orgName:'',
            orgPhone:'',
            _id:Math.floor(Math.random()*10000),
            edit: false,
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''
            

        }

    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    onOpenModaledit(){
        this.setState({
            edit:true
        })
        fetch(`${getgroupID}${sessionStorage.getItem('getorgID')}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item) => {
               this.setState({
                    _id:item._id,
                    orgAddress:item.orgAddress,
                    orgEmail:item.orgEmail,
                    orgName:item.orgName,
                    orgPhone:item.orgPhone,
                    class:item.class
                    
                })
                return 'ok'
            })  
            
        })

    }

    deleteOrg(){
        fetch(`${delGroup}/${sessionStorage.getItem('getgrpID')}`, {method:'delete'})
        
        this.myTimer = setTimeout(() => {
            fetch(`${groupUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    groupData:data
                })
                
            })
        },1000)
    }

    onCloseModaledit(){
        this.setState({
            class:'Corporate',
            orgAddress:'',
            orgEmail:'',
            orgName:'',
            orgPhone:'',
            _id:''
        })
        fetch(`${groupUrl}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                groupData:data
            })
            
        })

        this.setState({
            edit: false,
            
        })
        

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    async handleSubmit() {
       
        try {
           
            var groupData = {
                
                class:`${this.state.class}`,
                orgName:`${this.state.orgName}`,
                orgAddress:`${this.state.orgAddress}`,
                orgEmail:`${this.state.orgEmail}`,
                orgPhone:`${this.state.orgPhone}`,
                _id:`${this.state._id}`,
                orgID:`${this.state._id}`,
                
            }
            let result = await fetch(`${postGroup}`, {
                method: 'post',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    groupData
                        
                )
                    
            });
            console.log('result>  ' + result)
            alert("Group Add");
            this.setState({
                class:'Corporate',
                orgAddress:'',
                orgEmail:'',
                orgName:'',
                orgPhone:'',
                _id:''
            })
            fetch(`${groupUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    groupData:data
                    
                })

            })
            this.myTimer = setTimeout(() => {
                this.setState({
                    _id:Math.floor(Math.random()*10000)
                })
            },1000)
            
        }catch(e) {
            console.log(e)
        }

    }

    async groupUpdate() {
       
        try {
            var id = sessionStorage.getItem('getorgID')
           
            var grpUpdated = {
                
                class:'Corporate',
                orgName:`${this.state.orgName}`,
                orgAddress:`${this.state.orgAddress}`,
                orgEmail:`${this.state.orgEmail}`,
                orgPhone:`${this.state.orgPhone}`,
                orgID:`${this.state._id}`,
            }
            let result = await fetch(`${putGroup}/${id}`, {
                method: 'put',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    grpUpdated
                        
                )
                    
            });
            console.log('result>  ' + result)
            this.setState({
                class:'Corporate',
                orgAddress:'',
                orgEmail:'',
                orgName:'',
                orgPhone:'',
                _id:''
            })

            fetch(`${groupUrl}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    groupData:data
                    
                })

            })
            this.myTimer = setTimeout(() => {
                this.setState({
                    _id:Math.floor(Math.random()*10000),
                    
                })
            },1000)

            alert("Group Data updated");
            this.setState({edit:false})
            
          
            
        } catch(e) {
            console.log(e)
        }

    }

    renderGroup(data){
        if(data){
            
            return data.map((item)=>{
                
                return(
                    <>
                        <tr key= {item._id}>
                                
                            <td className="table-light table-striped adjust2">{item.orgAddress}</td>
                            <td className="table-light table-striped adjust2">{item.orgEmail}</td>
                            <td className="table-light table-striped adjust2">{item.orgName}</td>
                            <td className="table-light table-striped adjust2">{item.orgPhone}</td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>sessionStorage.setItem('getorgID', item.orgID)} onClick={()=>{this.onOpenModaledit()}}>Edit</button></td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>sessionStorage.setItem('getgrpID', item._id)} onDoubleClick={()=>{this.deleteOrg()}}>Delete</button></td>
                                
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
                    <FLogin/>
                </>
            )

        }

        return (
            <>
                <div  className="background990">
                    <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Register Group </h4>
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
                        <div className="row">
                            
                            <div className="col-3">
                                <input type="text" className="form-control mb-3 formsize51" name="orgName" require placeholder="Name" value={this.state.orgName} onChange={this.handleChange}/>
                            </div>
                            <div className="col-3">
                               <textarea row="4" className="form-control mb-3 formsize51" name="orgAddress" require placeholder="Address" value={this.state.orgAddress} onChange={this.handleChange}/>
                            </div>

                            <div className="col-3">
                                <input type="email" className="form-control mb-3 formsize51" name="orgEmail" require placeholder="Email" value={this.state.orgEmail} onChange={this.handleChange}/>
                            </div>

                            <div className="col-3">
                                <input type="number" className="form-control mb-3 formsize51" name="orgPhone" require placeholder="Phone" value={this.state.orgPhone} onChange={this.handleChange}/>
                            </div>
                            
                           
                            <center>
                            <br/>
                                <span>
                                    <button disabled={this.state.orgName===''||this.state.orgPhone===''} className="btn btn-warning" onClick={ () => this.handleSubmit () } >Add Group</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/roomchart')}>Close</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                        <div>
                            <table className="table table-hover">
                            
                                <thead className="table-warning">
                                    <tr>
                                        <th className="adjust5">Address</th>
                                        <th className="adjust5">Email</th>
                                        <th className="adjust5">Name</th>
                                        <th className="adjust5">Phone</th>
                                        <th className="adjust5">Action</th>
                                        <th className="adjust5"> </th>
                                                
                                    </tr>
                                </thead>
                                <tbody className="table table-hover">
                                    {this.renderGroup(this.state.groupData)}
                                
                                </tbody>
                            </table>
                            <center><button className="btn btn-danger gap mb-3" onClick={ () => this.props.history.push('/roomchart')}>Close</button></center>
                        </div>
                    </div>
                </div>
                <Modal open={this.state.edit} onClose={()=>this.onCloseModaledit()}>
                    
                    <div className = "background591">
                        <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-70px'}}>Edit Group</h4>
                        <div className="formdesign511">
                        
                            <div className="row">
                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize53" name="orgName" value={this.state.orgName} onChange={this.handleChange}/>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize53" name="orgAddress" value={this.state.orgAddress} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                    <input type="email" className="form-control mb-3 formsize53" name="orgEmail" value={this.state.orgEmail} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                    <input type="number" className="form-control mb-3 formsize53" name="orgPhone" value={this.state.orgPhone} onChange={this.handleChange}/>
                                </div>

                                
                            </div>
                        </div> 
                        <br/><br/>
                        <center>
                            <span>
                                <button className="btn btn-warning space2" onClick={()=>this.groupUpdate()}>Save</button>
                                        
                                <button className="btn btn-danger space3" onClick={()=>{this.onCloseModaledit()}}>close</button>
                                        
                            </span>
                                    
                        </center>
                        <br/>
                                    
                       
                    </div>     
                    
                </Modal>
            </>
            
        );
    }

    componentDidMount() {
        console.log(">>> Inside GrpDidMount", this.state);

        fetch(`${groupUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                groupData:data,

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



export default AddGroup;