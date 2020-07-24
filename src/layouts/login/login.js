import React,{useState} from 'react';

import axios from 'axios';
import style from './login.css';
import pop from './popup.css';
// import resolve from 'resolve';
import * as QueryString from "query-string";


const Login =(props)=>{
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [userName,setUserName]=useState(null);

    const [popup,setPopup]=useState("");
    const [popupContent,setPopupContent]=useState("");

    const button = {
        fontFamily: "Audiowide, cursive"
      };
    let payload;

    //sending user data to app.js 
    const sendUserData=(payload)=>{props.setUserData(payload)};

    return(
        <div>
         
            <div className={style.background}></div>
                <div className={style.outer}>
                    <div className={style.middle}>
                        <div className={style.inner}>
                            {/* <form className={style.form}> */}
                                <div className={style.signup}>
                                    <h2 className={style.h3}>QUIZZLER</h2>
                                    <p className={style.pFont}>Don't have an Account sign-up</p>
                                    <p
                                        className="btn btn-lg btn-danger btn-block" 
                                        style={button}
                                        onClick={props.setSignup}
                                    >sign up</p>
                                    <hr/>
                                    <p>or</p>
                                </div>
                                <h3 className={style.h3}>login</h3>
                                <div className={style.margin}>
                                    <input 
                                        id="logEmail"
                                        type="email" 
                                        name="Email"  
                                        className="form-control" 
                                        style={{padding:"25px"}} 
                                        placeholder="Email address"
                                        onChange={(e)=>{
                                            setEmail(e.target.value);
                                            // console.log(e.target.value);
                                            }} 
                                        required autoFocus />
                                </div>
                                <div className={style.margin}>
                                    <input 
                                        id="logPassword"
                                        type="password" 
                                        name="Password" 
                                        className="form-control" 
                                        style={{padding:"25px"}} 
                                        placeholder="Password" 
                                        autoComplete="on" 
                                        onChange={(e)=>{
                                            setPassword(e.target.value);
                                            // console.log(e.target.value);
                                            }} 
                                        required />
                                </div>
                                <button 
                                    className="btn btn-lg btn-success btn-block" 
                                    style={button}
                                    onClick={()=>{
                                        // console.log("from onclick"+props);
                                        let formData = {Email: email,Password: password};
                                        // const encodeForm = (data) => {
                                        //   return Object.keys(data)
                                        //       .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                                        //       .join('&');
                                        // }    
                                        console.log(QueryString.stringify(formData));            
                                        // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
                                        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                                        const config  = {
                                                headers: {
                                                    'Content-Type': 'application/x-www-form-urlencoded',
                                                    'Access-Control-Allow-Origin':'*'
                                                }
                                                }               
                                        axios.post('https://server-master.herokuapp.com/login', 
                                                    QueryString.stringify(formData),config)
                                                    .then(function (response) {
                                                        // console.log(response.data);
                                                        payload=response.data;
                                                        sendUserData(payload);
                                                        // sendData(response.data);
                                                        // console.log(payload._id);
                                                        setPopup("true");
                                                        setUserName(payload.name);
                                                        if(payload._id !== undefined){
                                                            setPopupContent("success");
                                                        }else{
                                                            setPopupContent("fail");
                                                        }                              
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                });                                            
                                        }}
                                        >Sign in</button>
                                 <p className={style.footer} >made with ❤ in India</p>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            {popup==="true" && popupContent==="success"?
                <div>
                <div className={pop.background}></div>
                    <div className={pop.outer}>
                        <div className={pop.middle}>
                        <div className={pop.inner}>
                            <div className={pop.card}>
                                <h1 className={style.h3}>Hiya {userName}</h1>
                                <p className={style.pFont}>successfully logged in !!!</p>
                                <button 
                                    type="button" 
                                    style={button}
                                    className="btn btn-lg btn-success" 
                                    name="button"
                                    onClick={props.setQuizzler}
                                    >continue</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>:null}
            {popup==="true" && popupContent==="fail"?
                <div>
                <div className={pop.background}></div>
                    <div className={pop.outer}>
                        <div className={pop.middle}>
                        <div className={pop.inner}>
                            <div className={pop.card}>
                                <p className={style.h3}>Login Failure</p>
                                <p className={style.pFont}>Please check your Email / Password</p>
                                <button 
                                    type="button" 
                                    style={button}
                                    className="btn btn-lg btn-outline-danger" 
                                    name="button"
                                    onClick={
                                        ()=>{
                                            setPopup("");
                                            setPopupContent("");
                                            setEmail("");
                                            setPassword("");
                                            {   let temp=document.getElementById("logEmail");
                                                temp.value="";
                                                temp=document.getElementById("logPassword");
                                                temp.value="";
                                            }
                                        }
                                    }
                                    >RETRY</button>
                                <hr/>
                                <p className={style.pFont}>Don't have an Account Signup</p>
                                <p
                                        className="btn btn-lg btn-success" 
                                        style={button}
                                        onClick={props.setSignup}
                                    >SIGN UP</p>
                                
                            </div>
                        </div>
                        </div>
                    </div>
                </div>:null}
        </div>
        
    );
};

export default Login;

