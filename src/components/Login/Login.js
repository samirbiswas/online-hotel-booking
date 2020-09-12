import React, { useContext } from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
   const googleHandleClicked = ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
        const {displayName, email} = res.user;
       const signInUser = {name : displayName, email};
       setLoggedInUser(signInUser);
       history.replace(from);
        
    })
      .catch(error=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage)
      })
   }
   
        return (

            <div>
                <button onClick={googleHandleClicked}>Sign In</button>
            </div>
        );
        
}
export default Login;