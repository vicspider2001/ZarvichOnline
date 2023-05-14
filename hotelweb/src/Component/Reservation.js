import React, { Component } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { locales } from 'moment';
import './Reception.css';
import {Link} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import Newheader from './Newheader';
import Adlogin from './Adlogin';



const localizer = dateFnsLocalizer({
   format,
   parse,
   startOfWeek,
   getDay,
   locales,
})

const GetReservation = "https://us3.localto.net:39344/reservation";


class Reservation extends Component {
    constructor(props) {
        super(props);
console.log(">>> inside ReservContructor", props)
        this.state = {
            events: [],
            _id:Math.floor(Math.random()*100000000),
            fname:'',
            lname:'',
            allDay: '',
            start: '',
            end: '',
            room: '',
            title:'',
            phone:'',
            rsvAmount:'',
            displayAllRoomNums:'',
            displayOccupiedRoomNums:'',
            printBTN:'Print',
            transactionDate:''
            
            
            
        };
        this.starthandleChange = this.starthandleChange.bind(this);
        this.endhandleChange = this.endhandleChange.bind(this);
    }

    // logout(){
    //     localStorage.removeItem('userInfo');
    //     this.setState({
    //         login:true
    //     })
        
    // }

    starthandleChange(date) {
        this.setState({
            start: date
        });
        var newtitle =(this.state.room+  ' '   +this.state.fname+  ' '  +this.state.lname+ ' ' +this.state.phone)
        this.setState({title:newtitle})
    }

    endhandleChange(date) {
        this.setState({
            end: date
        });
    }

    render() {
        console.log (">>> Inside Rsvdetails", this.state)
        
        if(localStorage.getItem('rtk')==null||localStorage.getItem('userdata')===null){
            return(
                <>
                    <Adlogin/>
                </>
            )

        }
        
        return (
            <>
                <Newheader/>
                <div  className="background993">
                    <div>
                            
                        <h4 style = {{marginLeft:'20px'}}>Reservations</h4>
                            
                    </div>
                    
                    
                    <div>
                        <Calendar 
                            localizer={localizer} events={this.state.events} 
                            startAccessor="start" endAccessor= "end" className="calendarSettings"
                            selectable={true}
                            onSelectEvent={this.handleEventSelection} 
                        /> 
                    </div>
                              
                    <div>
                        <center>
                            <>
                                <Link to="/">
                                    <button className="btn btn-danger space">Close</button>
                                </Link>
                            </>
                        </center>
                    </div>   
                    
                </div>
            </>
        );
    }
    async componentDidMount(){
        console.log(">>> Inside RsvDidMount", this.state)
        fetch(`${GetReservation}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                events:data
            })
            data.map((item)=>{
                this.setState({rsvAmount:item.rsvAmount})
                return 'ok'
            })
            
            
        })
    }
}

export default Reservation;