import React, { useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

export default function Home() {
    const[users, setUsers]=useState([]);

    const {id}=useParams()

    useEffect(()=>{
        loadUsers();
    },[])

    const loadUsers=async()=> {
        const result=await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    }

    const deleteUser=async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }
  return (
    <>
            <Helmet>
                <style>{'body { background-color: rgb(240, 240, 240); }'}</style>
            </Helmet>
    <div className='container'>
        <div className="col-md-12 text-center">
        <h3 className="main-heading">App Description</h3>
            <p>This CRUD web application was built using Javascript, HTML, CSS and Java. The front-end was built using React as well as Axios. While the backend was created using Spring Boot as well as Jsoup. I also utilized the Alpha Vantage API in order to help 
                build the scatterplot as well as Plotly in order to show the data of the selected company's past 100 day stock price. This app using a machine learning-linear regression model in order to help estiamte the future stock close price.
            </p>
            <Link to="/about" className="btn btn-warning shadow"> About Me</Link>
            <div className='py-4'>          
                <table className="table table-light table-striped border shadow">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Stock Name</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Estimated Price</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             users.map((user, index)=>(
                                <tr key={index}>
                                    <th scope="row" key={index}>{index+1}</th>
                                    <td>{user.date}</td>
                                    <td>{user.tkrSymbol}</td>
                                    <td>{user.currentPrice}</td>
                                    <td>{user.estimatedPrice}</td>
                                    <td>
                                        <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                                        <button className="btn btn-danger mx-2" onClick={()=>deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr> 
                             ))
                                
                        }
                        
                    </tbody>
                </table>
            </div>  
        </div>
    </div>
    </>
  )
}


