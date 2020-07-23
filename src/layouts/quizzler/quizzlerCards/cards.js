import React from 'react';
import style from './cards.css';

const Cards =(props)=>{
    const button = {
        fontFamily: "Audiowide, cursive"
      };
    return(
        // <a href="/" className={style.anchor}>
            <div className={style.card}>
                <h2 className={style.font1}>{props.name}</h2>
                <p className={style.font2}>{props.dept}</p>
                <p className={style.pFont}>score for earning a certificate: {props.pass}%</p>
                <p
                    className="btn btn-lg btn-success" 
                    style={button}
                    onClick={()=>{
                        props.func(props.id)
                        props.fullscreen()
                        }}
                >Start Quiz</p>
            </div>
        // </a>
    );
};

export default Cards;