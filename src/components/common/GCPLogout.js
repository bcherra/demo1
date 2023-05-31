import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleLogout} from 'react-google-login';


export default function GCPLogout(props) {
  const onSuccess = (res) => {
    console.log("Logout Success " + res)
    props.onLogoutSuccess()
  }
  const onFailure = (res) => {
    console.log("Logout Failure " + res)
    
  }
return(
    <GoogleLogout
    clientId="675611862482-l9h9pp8a977fblbi9ul75b7fhaqnq32u.apps.googleusercontent.com"
    buttonText="Logout"
    onSuccess={onSuccess}
    onFailure={onFailure}
  />
  
);
}