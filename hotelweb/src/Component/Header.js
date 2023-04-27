import React from 'react';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid ">
                    <div className="navbar-brand">
                        <Link to="/">
                            <center><img src= "https://i.ibb.co/6HDxCv7/logo2.jpg" style={{width:"100px", height:"90px"}} alt="logo"/></center>
                        </Link>
                    </div>
                    <span>
                        <Link to="/booking" className="bookbtn2"><button className="btn btn-warning bookbtn ">Book Now</button></Link>
                        <button className="navbar-toggler" type = "button" data-bs-toggle = "collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon buttonformat"></span>
                        </button>
                    </span>
                    <div className="collapse navbar-collapse alignmenu" id="navbarText">
                        <center>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item "></li>
                                <li className="nav-link active" aria-current="page"> <Link to="./" className="navtext">Home </Link></li>
                                <li className="nav-item"></li>
                                <li className="nav-link "> <Link to="/booking" className="navtext">Rooms</Link></li>
                                <li className="nav-item "></li>
                                <li className="nav-link "> <Link to="/explore" className="navtext">Explore</Link></li>
                                <li className="nav-item "></li>
                                <li className="nav-link "> <Link to="/Events" className="navtext">Events</Link></li>
                                <li className="nav-item "></li>
                                <li className="nav-link "> <Link to="/Contact" className="navtext">Contact Us</Link></li> &nbsp;
                                <Link to="/Settings">
                                    <i className="fa fa-cog fa-spin fa-1.8x fa-fw envelopefrmt"></i>
                                    <span className="sr-only">Loading...</span>
                                </Link>
                            </ul>
                            <span>
                           
                        </span>
                        </center>    

                    </div>
                    
                </div>
            </nav>
        
        </>
    )
}


export default withRouter (Header);