import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import NewDashboard from './Admin/NewDashboard';
import CheckInReport from './CheckInReport';
import Reservation from './Reservation';
import CashCollection from './CashCollection';
import RoomChart from './RoomChart';
import Adlogin from './Adlogin';










const Routing = () => {
    return(
        <BrowserRouter>
            
            <Route exact path="/" component={NewDashboard}/>
           <Route exact path="/AdLogin" component={Adlogin}/>
            <Route exact path="/Occupancy" component={CheckInReport}/>
            <Route exact path="/Reservation" component={Reservation}/>
            <Route exact path="/SalesReport" component={CashCollection}/>
            <Route exact path="/RoomChart" component={RoomChart}/>
            
            
        </BrowserRouter>
    )
}

export default Routing;
