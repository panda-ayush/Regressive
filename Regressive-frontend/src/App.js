import React from 'react';
import './App.css';
import Navbar from './components/inc/Navbar.js';
import Home from './components/pages/Home.js';
import About from './components/pages/About.js';
import SearchBtn from './User/AddUser.js';
import EditUser from "./User/EditUser.js";
import ViewUser from "./User/ViewUser.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
    
    <div className="App">
      <Navbar/>

      <Routes>
      <Route exact path="/" element={<Home/>}/>

      <Route exact path="/about" element={<About/>}/>

      <Route exact path="/AddUser" element={<SearchBtn/>}/>

      <Route exact path="/edituser/:id" element ={<EditUser/>}/>

      <Route path="/viewuser/:id" element={<ViewUser/>} />

      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
