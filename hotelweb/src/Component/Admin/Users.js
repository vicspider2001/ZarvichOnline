import React, { Component } from 'react';
import Adlogin from '../Adlogin';
import '../Reception/Reception.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const getBarUsers= "http://10.1.0.99:3333/barUserInfo?barrefcode=";
const postBarUsers= "http://10.1.0.99:3333/baruser";
const delBarUsers= "http://10.1.0.99:3333/delbarUser";
const editBarUsers= "http://10.1.0.99:3333/editBarUser";

const getFrontUsers= "http://10.1.0.99:3333/fofUserInfo?fofrefcode=";
const postFrontUsers= "http://10.1.0.99:3333/fofuser";
const delFrontUsers= "http://10.1.0.99:3333/delfrontUser";
const editFrontUsers= "http://10.1.0.99:3333/editFrontUser";

const getPoolUsers= "http://10.1.0.99:3333/poolUserInfo?poolrefcode=";
const postPoolUsers= "http://10.1.0.99:3333/pooluser";
const delPoolUsers= "http://10.1.0.99:3333/delpoolUser";
const editPoolUsers= "http://10.1.0.99:3333/editPoolUser";

const getClubUsers= "http://10.1.0.99:3333/clubUserInfo?clubcode=";
const postClubUsers= "http://10.1.0.99:3333/ClubUsers";
const delClubUsers= "http://10.1.0.99:3333/delclubUser";
const editClubUsers= "http://10.1.0.99:3333/editClubUser";

const getAdminUsers= "http://10.1.0.99:3333/adminUserInfo?refcode=";
const postAdminUsers= "http://10.1.0.99:3333/adminuser";
const delAdminUsers= "http://10.1.0.99:3333/deladminUser";
const editAdminUsers= "http://10.1.0.99:3333/editAdminUser";

const getHousekpUsers= "http://10.1.0.99:3333/housekpUserInfo?";
const postHousekpUsers= "http://10.1.0.99:3333/housekeepuser";
const delHousekpUsers= "http://10.1.0.99:3333/delhousekpUser";
const editHousekpUsers= "http://10.1.0.99:3333/edithousekpUser";

const getRestUsers= "http://10.1.0.99:3333/restUserInfo?restrefcode=";
const postRestUsers= "http://10.1.0.99:3333/restuser";
const delRestUsers= "http://10.1.0.99:3333/delrestUser";
const editRestUsers= "http://10.1.0.99:3333/editRestkpUser";

const getBillingUsers= "http://10.1.0.99:3333/billingUserInfo?billingrefcode=";
const postBillingUsers= "http://10.1.0.99:3333/billinguser";
const delBillingUsers= "http://10.1.0.99:3333/delbillingUser";
const editBillingUsers= "http://10.1.0.99:3333/editbillingUser";

const getFandBUsers= "http://10.1.0.99:3333/fandbUserInfo?fandbrefcode=";
const postFandBUsers= "http://10.1.0.99:3333/fandbuser";
const delFandBUsers= "http://10.1.0.99:3333/delfandbUser";
const editFandBUsers= "http://10.1.0.99:3333/billingUserInfo";

const getstoreUsers= "http://10.1.0.99:3333/storeUserInfo?storerefcode=";
const poststoreUsers= "http://10.1.0.99:3333/storeuser";
const delStoreUsers= "http://10.1.0.99:3333/delstoreUser";
const editStoreUsers= "http://10.1.0.99:3333/editstoreUser";


const userName = "http://10.1.0.99:3333/adminUserInfo";


class Users extends Component {
    constructor(props) {
        super(props);
        console.log(">>> inside GrpCobtructor", props)

        this.state = {
            _id:Math.floor(Math.random()*1000000), //this will be same as roomNumbers in room creation and diff in room status change//
            BarUsersData:'',
            FrontOffcUsers:'',
            BillingUsers:'',
            PoolUsers:'',
            ClubUsers:'',
            AdminUsers:'',
            HouseKpUsers:'',
            RestUsers:'',
            FandBUsers:'',
            storeUsers:'',
            staffData:'',

            staffname:'',
            username:'',
            password:'',
            department:'',

            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',

            show: 'form-select  mb-3 formsize51',
            hide:'hidden'
           
            
        }

    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    deleteUser(){
       if(sessionStorage.getItem('getUserDept')==='Admin'){
            fetch(`${delAdminUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            fetch(`${delBillingUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            fetch(`${delBarUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            fetch(`${delPoolUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            fetch(`${delClubUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            fetch(`${delStoreUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            fetch(`${delFandBUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            fetch(`${delFrontUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            fetch(`${delHousekpUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            fetch(`${delRestUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("Admin User Removed")
                this.setState({
                staffname:'',
                password:'',
                username:'',
                department:'Select Department',
                _id:'',

            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    this.setState({

                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff,...clubStaff],
                        _id:Math.floor(Math.random()*10000000)

                    })
    
                },1000);
               
            },1000)

        }

        else if(sessionStorage.getItem('getUserDept')==='Billing'){
            fetch(`${delBillingUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("Billing User Removed")
                this.setState({
                staffname:'',
                password:'',
                username:'',
                department:'Select Department',
                _id:'',

                // BarUsersData:'',
                // FrontOffcUsers:'',
                // BillingUsers:'',
                // PoolUsers:'',
                // AdminUsers:'',
                // HouseKpUsers:'',
                // RestUsers:'',
                // FandBUsers:'',
                // storeUsers:'',
                // staffData:''
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    this.setState({
                        
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff,...clubStaff],
                        _id:Math.floor(Math.random()*1000000)

                    })
    
                },2000);
               
            },1000)

        }

        else if(sessionStorage.getItem('getUserDept')==='Bar'){
            fetch(`${delBarUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("Bar User Removed")
                this.setState({
                staffname:'',
                password:'',
                username:'',
                department:'Select Department',
                _id:'',

                // BarUsersData:'',
                // FrontOffcUsers:'',
                // BillingUsers:'',
                // PoolUsers:'',
                // AdminUsers:'',
                // HouseKpUsers:'',
                // RestUsers:'',
                // FandBUsers:'',
                // storeUsers:'',
                // staffData:''
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    this.setState({
                        
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)

                    })
    
                },2000);
               
            },1000)

        }


        else if(sessionStorage.getItem('getUserDept')==='PoolBar'){
            fetch(`${delPoolUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("PoolBar User Removed")
                this.setState({
                staffname:'',
                password:'',
                username:'',
                department:'Select Department',
                _id:'',

                // BarUsersData:'',
                // FrontOffcUsers:'',
                // BillingUsers:'',
                // PoolUsers:'',
                // AdminUsers:'',
                // HouseKpUsers:'',
                // RestUsers:'',
                // FandBUsers:'',
                // storeUsers:'',
                // staffData:''
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    this.setState({
                        
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)

                    })
    
                },2000);
               
            },1000)

        }

        else if(sessionStorage.getItem('getUserDept')==='Club'){
            fetch(`${delClubUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("Club User Removed")
                this.setState({
                staffname:'',
                password:'',
                username:'',
                department:'Select Department',
                _id:'',

                // BarUsersData:'',
                // FrontOffcUsers:'',
                // BillingUsers:'',
                // PoolUsers:'',
                // AdminUsers:'',
                // HouseKpUsers:'',
                // RestUsers:'',
                // FandBUsers:'',
                // storeUsers:'',
                // staffData:''
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                
                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.clubStaff;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    this.setState({
                        
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)

                    })
    
                },2000);
               
            },1000)

        }

        else if(sessionStorage.getItem('getUserDept')==='Store'){
            fetch(`${delStoreUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("Store User Removed")
                this.setState({
                staffname:'',
                password:'',
                username:'',
                department:'Select Department',
                _id:'',

                // BarUsersData:'',
                // FrontOffcUsers:'',
                // BillingUsers:'',
                // PoolUsers:'',
                // AdminUsers:'',
                // HouseKpUsers:'',
                // RestUsers:'',
                // FandBUsers:'',
                // storeUsers:'',
                // staffData:''
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    this.setState({
                        
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)

                    })
    
                },2000);
               
            },1000)

        }

        else if(sessionStorage.getItem('getUserDept')==='FandB'){
            fetch(`${delFandBUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("F and B User Removed")
                this.setState({
                staffname:'',
                password:'',
                username:'',
                department:'Select Department',
                _id:'',

                // BarUsersData:'',
                // FrontOffcUsers:'',
                // BillingUsers:'',
                // PoolUsers:'',
                // AdminUsers:'',
                // HouseKpUsers:'',
                // RestUsers:'',
                // FandBUsers:'',
                // storeUsers:'',
                // staffData:''
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    this.setState({
                        
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)

                    })
    
                },2000);
               
            },1000)

            

        }

        else if(sessionStorage.getItem('getUserDept')==='Reception'){
            fetch(`${delFrontUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("Reception User Removed")
                this.setState({
                    staffname:'',
                    password:'',
                    username:'',
                    department:'Select Department',
                    _id:'',
    
                    // BarUsersData:'',
                    // FrontOffcUsers:'',
                    // BillingUsers:'',
                    // PoolUsers:'',
                    // AdminUsers:'',
                    // HouseKpUsers:'',
                    // RestUsers:'',
                    // FandBUsers:'',
                    // storeUsers:'',
                    // staffData:''
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    this.setState({
                        
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)

                    })
    
                },2000);
               
            },1000)

            

        }

        else if(sessionStorage.getItem('getUserDept')==='HouseKeeping'){
            fetch(`${delHousekpUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("HouseKeeping User Removed")
                this.setState({
                    staffname:'',
                    password:'',
                    username:'',
                    department:'Select Department',
                    _id:'',
    
                    // BarUsersData:'',
                    // FrontOffcUsers:'',
                    // BillingUsers:'',
                    // PoolUsers:'',
                    // AdminUsers:'',
                    // HouseKpUsers:'',
                    // RestUsers:'',
                    // FandBUsers:'',
                    // storeUsers:'',
                    // staffData:''
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        clubStaff:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    this.setState({
                        
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)

                    })
    
                },2000);
               
            },1000)

            

        }

        else if(sessionStorage.getItem('getUserDept')==='Restaurant'){
            fetch(`${delRestUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {method:'delete'})
            alert("Restaurant User Removed")
                this.setState({
                    staffname:'',
                    password:'',
                    username:'',
                    department:'Select Department',
                    _id:'',
    
                    // BarUsersData:'',
                    // FrontOffcUsers:'',
                    // BillingUsers:'',
                    // PoolUsers:'',
                    // AdminUsers:'',
                    // HouseKpUsers:'',
                    // RestUsers:'',
                    // FandBUsers:'',
                    // storeUsers:'',
                    // staffData:''
            })

            this.myTimer = setTimeout(() => {
                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)

                    })
    
                },1000);
               
            },1000)

            
        }
        
        
        
       
    }


    editUser(){
        if(sessionStorage.getItem('editUserDept')==='Admin'){
            fetch(`${getAdminUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username,
                    })
                    return 'ok'
                })
                
                
            })
             
        }
 
        else if(sessionStorage.getItem('editUserDept')==='Billing'){
            fetch(`${getBillingUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username,
                    })
                    return 'ok'
                })
               
                
            })
        }
 
        else if(sessionStorage.getItem('editUserDept')==='Bar'){
            fetch(`${getBarUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username,
                    })
                    return 'ok'
                })
                
                
            })
 
        }
 
 
        else if(sessionStorage.getItem('editUserDept')==='PoolBar'){
            fetch(`${getPoolUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username
                    })
                    return 'ok'
                })
                
                
            })
 
            
 
        }

        else if(sessionStorage.getItem('editUserDept')==='Club'){
            fetch(`${getClubUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username
                    })
                    return 'ok'
                })
                
                
            })
 
            
 
        }
 
        else if(sessionStorage.getItem('editUserDept')==='Store'){
            fetch(`${getstoreUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username
                    })
                    return 'ok'
                })
                
                
            })
 
        }
 
        else if(sessionStorage.getItem('editUserDept')==='FandB'){
            fetch(`${getFandBUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username
                    })
                    return 'ok'
                })
                
                
            })
        }
 
        else if(sessionStorage.getItem('editUserDept')==='Reception'){
            fetch(`${getFrontUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username
                    })
                    return 'ok'
                })
                
                
            })
 
            
        }
 
        else if(sessionStorage.getItem('editUserDept')==='HouseKeeping'){
            fetch(`${getHousekpUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username
                    })
                    return 'ok'
                })
                
                
            })
 
        }
 
        else if(sessionStorage.getItem('editUserDept')==='Restaurant'){
            fetch(`${getRestUsers}${parseInt(sessionStorage.getItem('editUserID'))}`, {method:'get'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({
                        staffname:item.name,
                        department:item.department,
                        password:item.password,
                        username:item.username
                    })
                    return 'ok'
                })
                
                
            })
 
        }
         
    }

    async handleUpdate() {
       
        try {
            var UserUpdate = {
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: `${this.state.department}`
                
            }

            if(this.state.department==='Admin'){
                let AdminEdit = await fetch(`${editAdminUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('AdminEdit>  ' + AdminEdit)

                let ReceptnEdit = await fetch(`${editFrontUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('ReceptnEdit>  ' + ReceptnEdit)
                let PoolEdit = await fetch(`${editPoolUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('PoolEdit>  ' + PoolEdit)
                let ClubEdit = await fetch(`${editClubUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('ClubEdit>  ' + ClubEdit)
                let StoreEdit = await fetch(`${editStoreUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('StoreEdit>  ' + StoreEdit)
                let BillingEdit = await fetch(`${editBillingUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('BillingEdit>  ' + BillingEdit)
                let HousekpEdit = await fetch(`${editHousekpUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('HousekpEdit>  ' + HousekpEdit)
                let RestEdit = await fetch(`${editRestUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('RestEdit>  ' + RestEdit)
                let FandBEdit = await fetch(`${editFandBUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('FandBEdit>  ' + FandBEdit)



                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },2000);

            }

            else if(this.state.department==='Reception'){
                let ReceptnEdit = await fetch(`${editFrontUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('ReceptnEdit>  ' + ReceptnEdit)
                let BillingEdit = await fetch(`${editBillingUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('BillingEdit>  ' + BillingEdit)
                
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='PoolBar'){
                let PoolEdit = await fetch(`${editPoolUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('PoolEdit>  ' + PoolEdit)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Club'){
                let ClubEdit = await fetch(`${editClubUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('ClubEdit>  ' + ClubEdit)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Store'){
                let StoreEdit = await fetch(`${editStoreUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('StoreEdit>  ' + StoreEdit)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Billing'){
                let BillingEdit = await fetch(`${editBillingUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('BillingEdit>  ' + BillingEdit)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Bar'){
                let BarEdit = await fetch(`${editBarUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('BarEdit>  ' + BarEdit)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='HouseKeeping'){
                let HousekpEdit = await fetch(`${editHousekpUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('HousekpEdit>  ' + HousekpEdit)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Restaurant'){
                let RestEdit = await fetch(`${editRestUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('RestEdit>  ' + RestEdit)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='FandB'){
                let FandBEdit = await fetch(`${editFandBUsers}/${parseInt(sessionStorage.getItem('getUserID'))}`, {
                    method: 'put',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        UserUpdate
                            
                    )
                        
                });
                console.log('FandBEdit>  ' + FandBEdit)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            
            
        }catch(e) {
            console.log(e)
        }

    }

   
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    async handleSubmit() {
       
        try {
            var NewUserDatapost = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: `${this.state.department}`
                
            }

            var NewUserDatapostAdb = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: 'Billing'
                
            }

            var NewUserDatapostAdbr = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: 'Bar'
                
            }
            var NewUserDatapostAdrst = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: 'Restaurant'
                
            }

            var NewUserDatapostAdclb = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: 'Club'
                
            }

            var NewUserDatapostAdrcp = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: 'Reception'
                
            }

            var NewUserDatapostAdhsk = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: 'HouseKeeping'
                
            }

            var NewUserDatapostAdplb = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: 'PoolBar'
                
            }

            var NewUserDatapostAdstr = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: 'Store'
                
            }

            var NewUserDatapostAdfnb = {
                refID:`${this.state._id}`,
                name:`${this.state.staffname}`,
                username:`${this.state.username}`,
                password:`${this.state.password}`,
                department: 'FandB'
                
            }

            if(this.state.department==='Admin'){
                let Adminresult = await fetch(`${postAdminUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('Adminresult>  ' + Adminresult)
                let FrontOffcresult = await fetch(`${postFrontUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdrcp
                            
                    )
                        
                });
                console.log('FrontOffcresult>  ' + FrontOffcresult)
                let poolresult = await fetch(`${postPoolUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdplb
                            
                    )
                        
                });
                console.log('poolresult>  ' + poolresult)
                let clubresult = await fetch(`${postClubUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdclb
                            
                    )
                        
                });
                console.log('clubresult>  ' + clubresult)
                let storeresult = await fetch(`${poststoreUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdstr
                            
                    )
                        
                });
                console.log('storeresult>  ' + storeresult)
                let billingresult = await fetch(`${postBillingUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdb
                            
                    )
                        
                });
                console.log('billingresult>  ' + billingresult)
                let barresult = await fetch(`${postBarUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdbr
                            
                    )
                        
                });
                console.log('barresult>  ' + barresult)
                let hskresult = await fetch(`${postHousekpUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdhsk
                            
                    )
                        
                });
                console.log('hskresult>  ' + hskresult)
                let restresult = await fetch(`${postRestUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdrst
                            
                    )
                        
                });
                console.log('restresult>  ' + restresult)
                let fandbresult = await fetch(`${postFandBUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdfnb
                            
                    )
                        
                });
                console.log('fandbresult>  ' + fandbresult)

                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },2000);

            }

            else if(this.state.department==='Reception'){
                let result = await fetch(`${postFrontUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                let Bresult = await fetch(`${postBillingUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapostAdb
                            
                    )
                        
                });
                console.log('Bresult>  ' + Bresult)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='PoolBar'){
                let result = await fetch(`${postPoolUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Club'){
                let result = await fetch(`${postClubUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Store'){
                let result = await fetch(`${poststoreUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Billing'){
                let result = await fetch(`${postBillingUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Bar'){
                let result = await fetch(`${postBarUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='HouseKeeping'){
                let result = await fetch(`${postHousekpUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='Restaurant'){
                let result = await fetch(`${postRestUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            else if(this.state.department==='FandB'){
                let result = await fetch(`${postFandBUsers}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        
                        NewUserDatapost
                            
                    )
                        
                });
                console.log('result>  ' + result)
                alert(this.state.department+ " User Added");
                this.setState({
                    staffname:'',
                    username:'',
                    department:'Select Department',
                    password:'',
                    
                })

                fetch(`${getBarUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BarUsersData:data,
                        
                    })
                    
                })
    
                fetch(`${getFrontUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FrontOffcUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getPoolUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        PoolUsers:data,
                        
                    })
                    
                })

                fetch(`${getClubUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        ClubUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getAdminUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        AdminUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getHousekpUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        HouseKpUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getRestUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        RestUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getBillingUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        BillingUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getFandBUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        FandBUsers:data,
                        
                    })
                    
                })
    
                fetch(`${getstoreUsers}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        storeUsers:data,
                        
                    })
                    
                })
    
                this.myTimer = setTimeout(() => {
                    var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })
    
                },1000);
                
            }

            
            
        }catch(e) {
            console.log(e)
        }

    }

    renderStaffData(data){
        if(data) {
           data.sort((a, b) => b.department - a.department);
            return data.map((item) => {
                
                return(
                    <>
                    
                        <tr key={item._id}>
                            
                            <td className="table-light table-striped adjust2">{item.name}</td>
                            <td className="table-light table-striped adjust2">{item.department}</td>
                            <td className="table-light table-striped adjust2">{item.username}</td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>{sessionStorage.setItem('getUserID', item.refID); sessionStorage.setItem('getUserDept', item.department)}} onClick={()=>{this.deleteUser()}}>Delete</button></td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-danger textcolor" onMouseOver={()=>{sessionStorage.setItem('editUserID', item.refID); sessionStorage.setItem('editUserDept', item.department)}} onClick={()=>{this.setState({staffname:'', username:'', password:'', department:'', show:'hidden'}); this.editUser()}}>Edit</button></td>
                            
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
                    <Adlogin/>
                </>
            )

        }

        return (
            <>
                <div  className="background990i2">
                    <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Users Management</h4>
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
                        <div className="container">
                            <div className="row">
                                {/* <div className="col-2">
                                    <p type="text" className="form-control mb-3 formsize51" name="roomID" >{this.state.roomID} </p>
                                </div> */}
                                
                                <div className="col-3">
                                <input type="text" className="form-control mb-3 formsize51" name="staffname" require placeholder="Enter Names" autoComplete='off' value={this.state.staffname} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                    <select className={this.state.show} name="department" onChange={this.handleChange}>
                                        <option selected value=''>Select Department</option>
                                        <option value='Admin'>Admin</option>
                                        <option value='Reception'>Reception</option>
                                        <option value='Billing'>Billing</option>
                                        <option value='Bar'>Bar</option>
                                        <option value='PoolBar'>Pool Bar</option>
                                        <option value='Club'>Club</option>
                                        <option value='Store'>Store</option>
                                        <option value='HouseKeeping'>Housekeeping</option>
                                        <option value='Restaurant'>Restaurant</option>
                                        <option value='FandB'>F and B</option>
                                    </select>
                                </div>

                                <div className="col-3">
                                <input type="text" className="form-control mb-3 formsize51" name="username" autoComplete='off' require placeholder="Enter User Name" value={this.state.username} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                <input type="password" className="form-control mb-3 formsize51" name="password" autoComplete='off' require placeholder="Enter Password" value={this.state.password} onChange={this.handleChange}/>
                                </div>
                            </div>
                           
                            <center>
                                <br/>
                                <span>
                                    <button disabled={this.state.name===''||this.state.password===''||this.state.username===''||this.state.department===''} className="btn btn-warning" onClick={ () => this.handleSubmit()}>Add New User</button>
                                    <button disabled={this.state.name===''||this.state.password===''||this.state.username===''||this.state.department===''} className="btn btn-warning gap" onClick={ () => {this.handleUpdate(); this.setState({show:'form-select  mb-3 formsize51'})}}>Update User</button>
                                    <button className="btn btn-danger gap" onClick={ () => this.props.history.push('/settings')}>Close</button>
                                    <button className="btn btn-danger gap" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
                                    
                                </span>
                            </center>
                           
                            
                        </div>
                        <br/>
                        <div className="container">
                            <table className="table table-hover">
                            
                                <thead className="table-warning">
                                    <tr>
                                        {/* <th className="adjust5">ID</th> */}
                                        <th className="adjust5">Names</th>
                                        <th className="adjust5">Department</th>
                                        <th className="adjust5">userName</th>
                                        <th className="adjust5">Action</th>
                                        <th className="adjust5"> </th>
                                                
                                    </tr>
                                </thead>
                                <tbody className="table table-hover">
                                    {this.renderStaffData(this.state.staffData)}
                                
                                </tbody>
                            </table>
                            <center><button className="btn btn-danger gap mb-3" onClick={ () => this.props.history.push('/Settings')}>Close</button></center>
                        </div>
                    </div>
                </div>
                
            </>
            
        );
    }

    componentDidMount() {
        console.log(">>> Inside GrpDidMount", this.state);

        fetch(`${getBarUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                BarUsersData:data,
                
            })
            
        })

        fetch(`${getFrontUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                FrontOffcUsers:data,
                
            })
            
        })

        fetch(`${getPoolUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                PoolUsers:data,
                
            })
            
        })

        fetch(`${getClubUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                ClubUsers:data,
                
            })
            
        })

        fetch(`${getAdminUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                AdminUsers:data,
                
            })
            
        })

        fetch(`${getHousekpUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                HouseKpUsers:data,
                
            })
            
        })

        fetch(`${getRestUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                RestUsers:data,
                
            })
            
        })

        fetch(`${getBillingUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                BillingUsers:data,
                
            })
            
        })

        fetch(`${getFandBUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                FandBUsers:data,
                
            })
            
        })

        fetch(`${getstoreUsers}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                storeUsers:data,
                
            })
            
        })

        this.myTimer = setTimeout(() => {
            var barstaff=this.state.BarUsersData;
                    var receptionStaff=this.state.FrontOffcUsers;
                    var poolbarStaff=this.state.PoolUsers;
                    var clubStaff=this.state.ClubUsers;
                    var restaurantStaff=this.state.RestUsers;
                    var billingStaff=this.state.BillingUsers;
                    var fandbstaff=this.state.FandBUsers;
                    var StoreStaff=this.state.storeUsers;
                    var AdminStaff=this.state.AdminUsers;
                    var HousekpStaff=this.state.HouseKpUsers;
                    this.setState({
                        staffData:[...barstaff, ...receptionStaff, ...poolbarStaff, ...restaurantStaff, ...billingStaff, ...fandbstaff, ...StoreStaff, ...AdminStaff, ...HousekpStaff, ...clubStaff],
                        _id:Math.floor(Math.random()*1000000)
                    })

        },1000);
        
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



export default Users;