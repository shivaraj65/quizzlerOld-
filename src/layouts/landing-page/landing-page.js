import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './landing-page.css';

import { lazyload } from 'react-lazyload';

import {Spring,config} from 'react-spring/renderprops'

const Landingpage = (prop) =>{
  const button = {
    fontFamily: "Audiowide, cursive"
  };
    return(

        <div>
        <div className={style.background}></div>
        <div className={style.content}>
        <nav className="navbar">
          <h5 className={style.brand}>Quizzler</h5> 
          <a href="/" className={style.devAnchor}>About Dev</a>
        </nav>
          <div className={style.centerText}>
          <Spring
            config={{duration:2000}}
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <div style={props}><h1 className={style.font1}>Quizzler App</h1></div>}
          </Spring>
          <Spring
            config={{duration:4000,delay:1000}}
            
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <div style={props}>
              <button 
                type="button" 
                className="btn btn-danger btn-lg btn-block" 
                style={button}
                onClick={prop.setLogin}
                >LOGIN</button>
            </div>}
          </Spring>
            
          </div>
          <footer className={style.footer}>
            <p>made with ❤ in INDIA</p>
          </footer>
        </div>

      </div>
    );
};


export default Landingpage;