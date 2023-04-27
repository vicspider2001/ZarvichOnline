import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import RegForm from './Reception/RegForm';
import guestForm from './Reception/guestForm';
import RoomChart from './Reception/RoomChart';
import Extenddays from './Reception/Extenddays';
import RoomChange from './Reception/RoomChange';
import RestaurantApp from './Restaurant/RestaurantApp';
import SalesReport from './Restaurant/SalesReport';
import RestReports from './Restaurant/RestReports';
import BarApp from './Bar/BarApp';
import GuestBarOrder from './Bar/GuestBarOrder';
import PoolBarSalesReport from './Bar/PoolBarSalesReport';
import BarReports from './Bar/BarReports';
import OtherSalesReport from './Reception/Billing/OtherSalesReport';
import PoolBarReports from './Bar/PoolBarReports';
import housekeeping from './HouseKeeping/housekeeping';
import HousekeepingMenu from './HouseKeeping/HousekeepingMenu';
import OtherPosts from './Reception/Billing/OtherPosts';
import GuestBill from './Reception/Billing/Guestbill';
import BillingMenu from './Reception/Billing/BillingMenu';
import Reservation from './Reception/Reservation';
import EditReservation from './Reception/EditReservation';
import RoomOccupancy from './Reception/ReceptionReports/RoomOccupancy';
import HouseKeepingPrint from './Reception/ReceptionReports/HouseKeepingPrint';
import RoomChangeReport from './Reception/ReceptionReports/RoomChangeReport';
import PoliceReport from './Reception/ReceptionReports/PoliceReport';
import CheckOutReport from './Reception/ReceptionReports/CheckOutReport';
import AddGroup from './Reception/AddGroup';
import CheckInReport from './Reception/ReceptionReports/CheckInReport';
import RetireBar from './Reception/Billing/RetireBar';
import PoolBar from './Bar/PoolBar';
import Club from './Bar/Club';
import CashCollection from './Reception/Billing/CashCollection';
import DailyRoomSales from './Reception/Billing/DailyRoomSales';
import OwingGuests from './Reception/Billing/OwingGuests';
import RestaurantReport from './Reception/Billing/RestaurantReport';
import PoolBarDailySales from './Reception/Billing/PoolBarDailySales';
import ClubSalesReport from './Bar/ClubSalesReport';
import EndOfDay from './Reception/Billing/EndOfDay';
import DiscountedRoomsReport from './Reception/Billing/DiscountedRoomsReport';
import GroupBill from './Reception/Billing/GroupBill';
import ReceptionMenu from './Reception/ReceptionMenu';
import HallHire from './Reception/Billing/HallHire';
import EditHallReservation from './Reception/Billing/EditHallReservation';
import FandB from './Reception/Billing/FandB';
import FandBMenu from './Reception/Billing/FandBMenu';
import FandBRestMenu from './Reception/Billing/FandBRestMenu';
import FandBReport from './Reception/Billing/FandBReport';
import ReceptionFunctnAcc from './Reception/ReceptionFunctnAcc';
import BarSalesReport from './Reception/Billing/BarSalesReport';
import departments from './Store/departments';
import productCategories from './Store/productCategories';
import storeMenu from './Store/storeMenu';
import productVendor from './Store/productVendors';
import stockPriceManager from './Store/stockPriceManager';
import stockUnitsManager from './Store/stockUnitsManager';
import productReg from './Store/productReg';
import stockIn from './Store/stockIn';
import StoreReport from './Store/StoreReport';
import Modules from './Store/Modules';
import stockOut from './Store/stockOut';
import NewDashboard from './Admin/NewDashboard';
import OldDashboard from './OldDashboard';
// import Backup from './Reception/Billing/Backup';
import RegFormSettings from './Admin/RegFormSettings';
import RoomSettings from './Admin/RoomSettings';
import Users from './Admin/Users';
import Settings from './Admin/Settings';
import ClubPortal from './Bar/ClubPortal';
import ClubDailySales from './Reception/Billing/ClubDailySales';
import LaundryReport from './Reception/Billing/LaundryReport';
import GymnasiumReport from './Reception/Billing/GymnasiumReport';
import SmoothieReport from './Reception/Billing/SmoothieReport';
import MinimartReport from './Reception/Billing/MinimartReport';
import BarbequeReport from './Reception/Billing/BarbequeReport';
import ShishReport from './Reception/Billing/ShishaReport';
import HallHireReport from './Reception/Billing/HallHireReport';
import SwimmingReport from './Reception/Billing/SwimmingReport';







const Routing = () => {
    return(
        <BrowserRouter>
            
           
            <Route exact path="/roomchart" component={RoomChart}/>
            <Route exact path="/form/:reID" component={RegForm}/>
            <Route exact path="/guestForm/:rmID" component={guestForm}/>
            <Route exact path="/stay/:stID" component={Extenddays}/>
            <Route exact path="/change/:rcID" component={RoomChange}/>
            <Route exact path="/restaurant" component={RestaurantApp}/>
            <Route exact path="/RestPortal" component={RestReports}/>
            <Route exact path="/sales" component={SalesReport}/>
            <Route exact path="/OtherSalesReport" component={OtherSalesReport}/>
            <Route exact path="/bar" component={BarApp}/>
            <Route exact path="/GuestBarOrder" component={GuestBarOrder}/>
            <Route exact path="/PoolBar" component={PoolBar}/>
            <Route exact path="/Club" component={Club}/>
            <Route exact path="/BarPortal" component={BarReports}/>
            <Route exact path="/PoolBarPortal" component={PoolBarReports}/>
            <Route exact path="/PoolBarsales" component={PoolBarSalesReport}/>
            <Route exact path="/housekeeping" component={housekeeping}/>
            <Route exact path="/hskPortal" component={HousekeepingMenu}/>
            <Route exact path="/otherSales" component={OtherPosts}/>
            <Route exact path="/LaundryReport" component={LaundryReport}/>
            <Route exact path="/GymnasiumReport" component={GymnasiumReport}/>
            <Route exact path="/SmoothieReport" component={SmoothieReport}/>
            <Route exact path="/SwimmingReport" component={SwimmingReport}/>
            <Route exact path="/MinimartReport" component={MinimartReport}/>
            <Route exact path="/BarbequeReport" component={BarbequeReport}/>
            <Route exact path="/ShishaReport" component={ShishReport}/>
            <Route exact path="/HallHireReport" component={HallHireReport}/>
            <Route exact path="/guestBill/:refID" component={GuestBill}/>
            <Route exact path="/GroupBill" component={GroupBill}/>
            <Route exact path="/BillingMenu" component={BillingMenu}/>
            <Route exact path="/Reservation" component={Reservation}/>
            <Route exact path="/EditReservation" component={EditReservation}/>
            <Route exact path="/Occuppancy" component={RoomOccupancy}/>
            <Route exact path="/HouseKeepingPrint" component={HouseKeepingPrint}/>
            <Route exact path="/roomChangeReport" component={RoomChangeReport}/>
            <Route exact path="/policeReport" component={PoliceReport}/>
            <Route exact path="/checkOut" component={CheckOutReport}/>
            <Route exact path="/Group" component={AddGroup}/>
            <Route exact path="/DailyCheckIn" component={CheckInReport}/>
            <Route exact path="/RetireBar" component={RetireBar}/>
            <Route exact path="/CashCollection" component={CashCollection}/>
            <Route exact path="/EndOfDay" component={EndOfDay}/>
            <Route exact path="/DailyRoomSales" component={DailyRoomSales}/>
            <Route exact path="/OwingGuests" component={OwingGuests}/>
            <Route exact path="/RestaurantReport" component={RestaurantReport}/>
            <Route exact path="/BarSalesReport" component={BarSalesReport}/>
            <Route exact path="/PoolBarDailySales" component={PoolBarDailySales}/>
            <Route exact path="/ClubDailySales" component={ClubDailySales}/>
            <Route exact path="/ClubSalesReport" component={ClubSalesReport}/>
            <Route exact path="/ClubPortal" component={ClubPortal}/>
            <Route exact path="/DailyDiscountList" component={DiscountedRoomsReport}/>
            <Route exact path="/ReceptionMenu" component={ReceptionMenu}/>
            <Route exact path="/HallHire" component={HallHire}/>
            <Route exact path="/EditHallHire" component={EditHallReservation}/>
            <Route exact path="/FandB" component={FandB}/>
            <Route exact path="/FandBMenu" component={FandBMenu}/>
            <Route exact path="/FandBReport" component={FandBReport}/>
            <Route exact path="/ReceptionFunctnAcc" component={ReceptionFunctnAcc}/>
            <Route exact path="/departments" component={departments}/>
            <Route exact path="/categories" component={productCategories}/>
            <Route exact path="/storeMenu" component={storeMenu}/>
            <Route exact path="/vendor" component={productVendor}/>
            <Route exact path="/priceReview" component={stockPriceManager}/>
            <Route exact path="/Units" component={stockUnitsManager}/>
            <Route exact path="/Products" component={productReg}/>
            <Route exact path="/Products" component={productReg}/>
            <Route exact path="/stockIn" component={stockIn}/>
            <Route exact path="/StoreReport" component={StoreReport}/>
            <Route exact path="/stockOut" component={stockOut}/>
            <Route exact path="/" component={Modules}/>
            <Route exact path="/Dashboard" component={NewDashboard}/>
            <Route exact path="/AppMenu" component={Modules}/>
            <Route exact path="/OldDashboard" component={OldDashboard}/>
            {/* <Route exact path="/Backup" component={Backup}/> */}
            <Route exact path="/Levy" component={RegFormSettings}/>
            <Route exact path="/RoomSettings" component={RoomSettings}/>
            <Route exact path="/Users" component={Users}/>
            <Route exact path="/Settings" component={Settings}/>
            <Route exact path="/AddMenu" component={FandBRestMenu}/>
            
            
            
        </BrowserRouter>
    )
}

export default Routing;
