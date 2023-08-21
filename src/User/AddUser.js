import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
    let naviagate = useNavigate();

    const [newTkrSymbol, setTkrSymbol]=useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e)=> {
        e.preventDefault();
        setLoading(true); // Set loading state to true when the form is submitted
        await axios.post("http://localhost:8080/user", { tkrSymbol: newTkrSymbol.toUpperCase() });
        setLoading(false); // Set loading state back to false when the response is received
        naviagate("/");
    };

  return (
    <>
            <Helmet>
                <style>{'body { background-color: rgb(240, 240, 240); }'}</style>
            </Helmet>
    <div className='my-container d-flex justify-content-center align-items-center'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border shadow rounded p-4 mt-2 text-center' style={{backgroundColor: 'white'}}>
                <h2 className="text-center m-4">Enter TKR Symbol</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                        <label id="Ticker Symbol" htmlFor = 'name'>Ticker Symbol: </label>
                        <input type = "text" name= "newTkrSymbol" id = "name" value={newTkrSymbol} onChange={(e) => setTkrSymbol(e.target.value)}/>
                        </div>
                        {loading ? (
                            <div className="spinner-border text-success" style={{width: "1.25rem", height: "1.25rem"}} role="status">
                            </div>
                        ) : (
                            <button type="submit" className="btn btn-outline-success mx-2">Search</button>
                        )}
                        <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}
