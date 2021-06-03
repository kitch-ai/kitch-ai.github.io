import React, { useState, useEffect } from "react";
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useParams } from "react-router";
import './App.css';

let search = window.location.search;
let params = new URLSearchParams(search);
let email = params.get('email');





const Hiring = () => {
    
    const handleLogin = async googleData => {

        const json = JSON.stringify({ 
          email: email,
          work_email: googleData.profileObj.email,
          creds : googleData.qc});
    
        const response = await axios
          .post(`http://localhost:3000/work-connection/work-email`,
            json,{
              headers: { 
                'Content-Type': 'application/json'
              }
            }).then( async data => {
                setFinished(true);
            });
          }

    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const json = JSON.stringify({ 
            email: email});
      
          axios.post(`http://localhost:3000/work-connection/user`,
              json,{
                headers: { 
                  'Content-Type': 'application/json'
                }
              }).then( async data => {
               // console.log(JSON.stringify(data));
              });
      });

    
      return (
    
        <div id='divCentred'>

            <h1>Product Design Role: Workdock</h1>

            {finished && <div>
            <p>Thanks, we will contact you shortly about the role and to get feedback on using this</p> </div>}

            {finished === false && <div>
            <p>Connect your WORK email so we can check you meeting history and see if we have any common connections.  
                By doing this, the more connections we have in common the more your application will go to the top of the list. </p>
    


     <GoogleLogin
        clientId='751585965793-qr0a79nj4ln6g7ot93qncb8mdc2lc7rb.apps.googleusercontent.com'
        buttonText="Log in with Google"
        accessType="offline"
        onSuccess={handleLogin}
        onFailure={(error) => { console.log(JSON.stringify(error)) }}
        cookiePolicy={'single_host_origin'}
        scope="https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email"
        />

        <p id='ps'>p.s. We don't use this data for anything else, and we won't contact anyone from your list until we ask you if it is ok.</p>
        </div>
            }
      </div>
      );
}

export default Hiring;
