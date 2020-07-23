import React,{useState} from 'react';
import classes from './App.css';
// import LazyLoad from 'react-lazyload';

import LandingPage from './layouts/landing-page/landing-page';
import Login from './layouts/login/login';
import Signup from './layouts/signup/signup';
import Quizzler from './layouts/quizzler/quizzler';


function App() {
  // keys[landingPage,login,signup,quizzler]
  const [Key,setKey]=useState("landing");
  const [userData,setUserData]=useState(null);

  const setLanding=()=>{
    setKey("landing");
  };
  const setLogin=()=>{
    setKey("login");
  };
  const setSignup=()=>{
    setKey("signup");
  };
  const setQuizzler=()=>{
    setKey("quizzler");
  };
  const setUserDataFunc=(data)=>{
    // console.log("i am called from login setting user data:"+data);
    // console.log(data.name);
    setUserData(data);
  };


  return (
    <div className={classes.App}>
    {Key === "landing" ? <LandingPage setLogin={setLogin} /> :null }
    {Key === "login" ? <Login setSignup={setSignup} setQuizzler={setQuizzler} setUserData={setUserDataFunc} testData={userData}/> : null }
    {Key === "signup" ? <Signup setLogin={setLogin} /> : null }
    {Key === "quizzler" ? <Quizzler userinfo={userData}/> : null }
    </div>
  );
}

export default App;
