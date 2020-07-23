import React from 'react';
import style from './submitError.css';

const SubmitError=(props)=>{
    const button = {
        fontFamily: "Audiowide, cursive"
      };
    return(
        <div>
                <div className={style.background}></div>
                    <div className={style.outer}>
                        <div className={style.middle}>
                            <div className={style.inner}>
                            <div className={style.card}>
                                <p className={style.pFont}>{props.data}</p>
                                <button 
                                    type="button" 
                                    style={button}
                                    className="btn btn-lg btn-danger"
                                    onClick={()=>{
                                        props.setFlagSubmitAnswer("false")
                                    }}
                                    >continue</button>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
    )
};

export default SubmitError;