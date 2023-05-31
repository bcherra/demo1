import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

export default function GCPLogin(props) {
  const resfreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 -5 * 60) * 1000;

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (res.tokenObj.expires_in || 3600 -5 * 60) * 1000;
      setTimeout(refreshToken, refreshTiming)
    }
    setTimeout(refreshToken, refreshTiming)
  }
 
  const onSuccess = (res) => {
    console.log("Logon Success " + res)
    props.onLoginSuccess(res)
    resfreshTokenSetup(res)
  
  }
  const onFailure = (res) => {
    console.log("Failure")
    props.onLoginFailure()
  }
return(
    <GoogleLogin
    clientId="70633719680-mu1cupgmj92530ajak8mj804qkjnj3gc.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
  />
);
}