import React,{useState} from 'react';
import axios from 'axios';
import style from './signup.css';
import pop from './popup.css';

const Signup =(props)=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [rollno,setRollno]=useState("");
    const [college,setCollege]=useState("");
    const [mobilenumber,setMobilenumber]=useState("");

    const [popup,setPopup]=useState("false");
    
    const button = {
        fontFamily: "Audiowide, cursive",
      };
    return(
        <div>
            <div className={style.background}></div>
            <div className={style.outer}>
                    <div className={style.middle}>
                        <div className={style.inner}>
                        <h1 className={style.font1}>Quizzler</h1>
                        <h3 className={style.font2}>Sign-up</h3>
                        {/* <form> */}
                        <div className={style.margin}>
                            <input 
                                type="text" 
                                name="Name"  
                                className="form-control" 
                                style={{padding:"25px"}} 
                                placeholder="User Name" 
                                onChange={(e)=>{
                                            setName(e.target.value);
                                            // console.log(e.target.value);
                                            }} 
                                required autoFocus/>
                        </div>
                        <div className={style.margin}>
                            <input 
                                type="email" 
                                name="Email"  
                                className="form-control" 
                                style={{padding:"25px"}} 
                                placeholder="Email address" 
                                onChange={(e)=>{
                                            setEmail(e.target.value);
                                            // console.log(e.target.value);
                                            }}
                                required/>
                        </div>
                        <div className={style.margin}>
                            <input 
                                type="text" 
                                name="Rollno"  
                                className="form-control" 
                                style={{padding:"25px"}} 
                                placeholder="Rollno" 
                                onChange={(e)=>{
                                            setRollno(e.target.value);
                                            // console.log(e.target.value);
                                            }}
                                required/>
                        </div>
                        <div className={style.margin}>
                            <input 
                                type="text" 
                                name="College"  
                                className="form-control" 
                                style={{padding:"25px"}} 
                                placeholder="College" 
                                onChange={(e)=>{
                                            setCollege(e.target.value);
                                            // console.log(e.target.value);
                                            }}
                                required/>
                        </div>
                        <div className={style.margin}>
                            <input 
                                type="number"  
                                name="MobileNumber"  
                                className="form-control" 
                                style={{padding:"25px"}} 
                                placeholder="Mobile number" 
                                onChange={(e)=>{
                                            setMobilenumber(e.target.value);
                                            // console.log(e.target.value);
                                            }}
                                required/>
                        </div>
                        <div className={style.margin}>
                            <input 
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
                                required/>
                        </div>
                        <button 
                            className="btn btn-lg btn-success btn-block" 
                            type="submit" 
                            style={button}
                            onClick={()=>{
                                let formData = {
                                    Name: name,                                                                    
                                    Email: email,
                                    Rollno:rollno,
                                    College:college,
                                    MobileNumber:mobilenumber,
                                    Password: password
                                    };
                                        const encodeForm = (data) => {
                                          return Object.keys(data)
                                              .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                                              .join('&');
                                        }                                        
                                        axios.post('http://localhost:3001/signup', 
                                                    encodeForm(formData))
                                                    .then(function (response) {
                                                        console.log(response.data);
                                                        if(response.data === "success"){
                                                            setPopup("success");
                                                        }else if(response.data === "UserExist"){
                                                            setPopup("exist");
                                                        }else if(response.data === "DBError"){
                                                            setPopup("DBError");
                                                        }
                                                        //delete the states
                                                        setName("");
                                                        setEmail("");
                                                        setPassword("");
                                                        setRollno("");
                                                        setCollege("");
                                                        setMobilenumber("");                                    
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                });                           
                            }}
                            >Sign up</button>
                        {/* </form> */}
                    </div>
                </div>
            </div>
            {popup ==="success"?
                <div>
                    <div className={pop.background}></div>
                        <div className={pop.outer}>
                            <div className={pop.middle}>
                            <div className={pop.inner}>
                                <div className={pop.card}>
                                    <h1 className={style.h3}>Successfully Registered !!</h1>
                                    <button 
                                        type="button" 
                                        style={button}
                                        className="btn btn-lg btn-success" 
                                        name="button"
                                        onClick={props.setLogin}
                                        >continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:null}
            {popup ==="exist"?
            <div>
                <div className={pop.background}></div>
                    <div className={pop.outer}>
                        <div className={pop.middle}>
                            <div className={pop.inner}>
                                <div className={pop.card}>
                                    <h1 className={pop.font1} >Already Registered</h1>
                                    <button 
                                        type="button" 
                                        style={button}
                                        className="btn btn-lg btn-success" 
                                        name="button"
                                        onClick={props.setLogin}
                                        >Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:null}
            {popup ==="DBError"?
                <div>
                    <div className={pop.background}></div>
                        <div className={pop.outer}>
                            <div className={pop.middle}>
                                <div className={pop.inner}>
                                    <div className={pop.card}>
                                        <h1 className={pop.font1} >OH Snap</h1>
                                        <p className={style.font2}>Server Error... Try Again.</p>
                                        <button 
                                            type="button" 
                                            style={button}
                                            className="btn btn-lg btn-success" 
                                            name="button"
                                            onClick={props.setLogin}
                                            >Try Again</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>:null}
            </div>
    );
};

export default Signup;