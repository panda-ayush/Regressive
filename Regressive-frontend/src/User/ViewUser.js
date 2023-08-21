import React, { useState, useEffect } from 'react';
import Stock from '/Users/Ayushpanda/Desktop/Programs/CS_251/regressive-app/src/components/inc/Stock.js';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

export default function ViewUser() {
    const { id } = useParams();
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:8080/user/${id}`);
            setUser(response.data);
        }
        fetchUser();
    }, [id]);

    return (
        <>
            <Helmet>
                <style>{'body { background-color: rgb(240, 240, 240); }'}</style>
            </Helmet>
            <div className='my-container d-flex justify-content-center align-items-center'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 border shadow rounded p-4 mt-2 text-center' style={{backgroundColor: 'white'}}>
                            <h2 className="text-center m-4">TKR Symbol Details</h2>
                            <div className='card'>
                                <div className='card-header'>
                                    Details of TKR Symbol: 
                                    <ul className="list-group list-group-flush">
                                        <li className='list-group-item'>
                                            <b>Date:</b> {user.date}
                                        </li>
                                        <li className='list-group-item'>
                                            <b>TKR Symbol:</b> {user.tkrSymbol}
                                        </li>
                                        <li className='list-group-item'>
                                            <b>Current Price:</b> {user.currentPrice}
                                        </li>
                                        <li className='list-group-item'>
                                            <b>Estimate Price:</b> {user.estimatedPrice}
                                        </li>
                                        <li className='list-group-item'>
                                            {user && <Stock tkrSymbol={user.tkrSymbol} />}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Link className='btn btn-primary my-2' to={"/"}>Home Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
