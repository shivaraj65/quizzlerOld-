import React from 'react';
import style from './scoreResult.css';
//imports assets
import winner from '../../../assets/winner.png';
import looser from '../../../assets/betterluck.png';
import violation from '../../../assets/violation.png';
const ScoreResult =(props)=>{
    const button = {
        fontFamily: "Audiowide, cursive"
      };
    return(
        <div>
                <div className={style.background}></div>
                <nav className="navbar">
                    <h5 className={style.font1}>Quizzler</h5> 
                    <a href="/" className={`${style.devAnchor} ${style.font2}` }>Logout</a>
                </nav>
                    <div className={style.outer}>
                        <div className={style.middle}>
                            <div className={style.inner}>
                            {props.score>=50 && props.violation !=="true"?
                            <img src={winner} className={style.img} alt="winner img"/>
                            :null}    
                            {props.score<50 && props.violation !=="true"?
                            <img src={looser} className={style.img} alt="B.L.N.T imag"/>
                            :null}
                            {props.violation ==="true"?
                            <img src={violation} className={style.img} alt="violation imag"/>
                            :null}
                            <h1 className={style.font1}>{props.name}</h1>
                            <h5 className={style.font1}>{props.contest}</h5>
                            <h4 className={style.font2}>Your score:{props.score}</h4>
                            <p
                                className="btn btn-lg btn-outline-danger" 
                                style={button}
                                onClick={
                                    ()=>{props.func("quizzler")}
                                }
                            >Continue</p>
                            </div>
                        </div>
                    </div>
                </div>
    )
}
export default ScoreResult;
