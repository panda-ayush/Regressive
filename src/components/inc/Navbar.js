import React from 'react';
import {Link} from 'react-router-dom';


function Navbar() {
    
    return (
        <nav className="navbar navbar-expand-lg bg-success p-3" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Regressive App</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/about" className="btn btn-outline-light mx-2" >About Me</Link>
                    </li>
                    <li className="nav-item">
                        <Link to ="/AddUser" className="btn btn-outline-light" onClick={() => {window.location.href= "/AddUser"}}>Search</Link>
                    </li>
                </ul>

                </div>
           </div>
        </nav>
        
    );
}

export default Navbar;