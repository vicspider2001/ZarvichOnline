import React, { Component } from 'react';
import Storelogin from '../../Storelogin';
import '../Reception.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { locales } from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';


const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
 })


const postFandB = "http://10.1.0.99:3333/foodanddrinks";
const getGroupUrl= "http://10.1.0.99:3333/org";
const HallUrl = "http://10.1.0.99:3333/getHalls?hallType=";
const userName = "http://10.1.0.99:3333/fandbUserInfo";
const GetCalendar = "http://10.1.0.99:3333/getHallReservation";

class FandB extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside RsvCobtructor", props)

        console.log(">>> inside ReservContructor", props)
        this.state = {
            _id:Math.floor(Math.random()*10000),
            orgName:'',
            findGroup:'',
            description:'',
            amount:'',
            qty:'',
            date:new Date(),
            events:[],
            displayAllHalls:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''
            
            
        };
        
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
    

    async handleResvSubmit() {
       
        try {
           
            var events = {
                _id:`${this.state._id}`,
                transactionDate:moment(this.state.date).format('MMM DD YYYY'),
                resID:`${this.state._id}`,
                group:`${this.state.orgName}`,
                description: `${this.state.description}`,
                amount: `${this.state.amount}`,
                qty: `${this.state.qty}`
                
            };
               
            let result2 = await fetch(postFandB ,{
                method: 'post',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    events 
                        
                )
                    
            });
            console.log('result2>  ' + result2)
            
            
            alert("Bill Posted for " +this.state.orgName);
            this.setState({
                orgName:'',
                description:'',
                amount:0,
                qty:'',
                findGroup:''
                
            })
            
            this.myTimer = setTimeout(() => {
                this.setState({
                    _id:Math.floor(Math.random()*10000)
                })

                fetch(`${getGroupUrl}`, {method:'GET'})
                .then((resp) => resp.json())
                .then((data) => {
                this.setState({
                    findGroup:data
                })
                        
            })
            },1000);
           
        
            
        } catch(e) {
            console.log(e)
        }

    }

    renderGroup(data){
        if(data) {
           data.sort((a, b) => a.orgName - b.orgName);
            return data.map((item) => {
                
                return(
                    <>
                        <option key={item._id} value={item.orgName}>
                            {item.orgName}
                        </option>
                    </>
                )
                
            })
        }
    }

    renderHalls(data){
        if(data) {
           data.sort((a, b) => a.price - b.price);
            return data.map((item) => {
                
                return(
                    <>
                        
                        <option key={item._id} value={item.hallName}>
                            {item.hallName}
                        </option>
                    </>
                )
                
            })
        }
    }


        
    render() {
        console.log (">>> Inside Rsvdetails", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <Storelogin/>
                </>
            )

        }
        return (
            <div className="background993b">
                <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Function Management </h4>
                        </div>
                        <div className="col-6">
                            <h6 style = {{color:'purple',marginLeft:'480px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                        </div>
                        <div className="col-3">
                            <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                        </div>
                </div>
                <h4 style = {{color:'rgb(23, 23, 71)',marginLeft:'50px', marginBottom:'-40px'}}> </h4>
                
                <div className="formdesign510">
                    
                    <div className="row">
                        <div className="col-3">
                            <select type ="button" className="form-control mb-3 formsize51" name="orgName" onChange={this.handleChange}>
                                <option defaultValue=''>Select Org</option>
                                {this.renderGroup(this.state.findGroup)}
                            </select>
                        </div>
                        <div className="col-3">
                            <input type="text" className="form-control mb-3 formsize51" name="description" require placeholder="Description" value={this.state.description} list="description" onChange={this.handleChange}/>
                            <datalist id="description">
                                <option value = "Breakfast"></option>
                                <option value = "Tea Break"></option>
                                <option value = "Lunch"></option>
                                <option value = "Dinner"></option>
                                {this.renderHalls(this.state.displayAllHalls)}
                            </datalist>
                        </div>

                        <div className="col-3">
                            <input type="number" className="form-control mb-3 formsize51" name="qty" require placeholder="Qty" value={this.state.qty} onChange={this.handleChange}/>
                        </div>

                        <div className="col-3">
                            <input type="number" className="form-control mb-3 formsize51" name="amount" require placeholder="Amount" value={this.state.amount} onChange={this.handleChange}/>
                        </div>
                    </div>
                    
                    <div>
                        <center>
                            <span>
                                <button disabled={this.state.orgName===''||this.state.description===''||this.state.amount===''||this.state.qty===''} className="btn btn-warning" onClick={ () => this.handleResvSubmit()}>Post</button>
                                <button className="btn btn-danger space" onClick={ () => this.props.history.push('/FandBMenu')}>Close</button>
                                
                               
                            </span>
                        </center>
                    </div>
                    <br/>
                    <hr style={{color:'silver'}}/>

                    <Calendar 
                        localizer={localizer} events={this.state.events} 
                        startAccessor="start" endAccessor= "end" style={{height: 500, margin: "50px"}}
                        selectable={true}
                        onSelectEvent={this.handleEventSelection} 
                    />  
                    
                </div>
                
            </div>
            

            
        );
    }
    componentDidMount(){
        console.log(">>> Inside RsvDidMount", this.state)
        fetch(`${getGroupUrl}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                findGroup:data
            })
            
        })

        fetch(`${GetCalendar}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                events:data
                
            })
        })

        fetch(`${HallUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                displayAllHalls:data
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

export default FandB;