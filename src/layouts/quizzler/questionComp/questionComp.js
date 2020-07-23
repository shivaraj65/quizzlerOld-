import React from 'react';
import style from './questionComp.css';

const QuestionComp=(props)=>{
    const onChangeValue=(event)=> {
        // console.log(event.target.value);
        // console.log(event.target.name);
        props.funcSetAnswer(event.target.value,event.target.name);
      };

    return(
        <div className={style.card}>
            <h3 className={style.font2}>{props.id+1+" -  "}{props.question}</h3>
            <div onChange={onChangeValue}>
                    <div className={style.options}>
                        <label className={style.container}>
                            <input type="radio" value={props.op1} name={props.id} className={style.radio}/>
                            <span className={style.optionText}>{props.op1}</span>
                        </label>   
                    </div>
                    <div className={style.options}>
                        <label className={style.container}>
                            <input type="radio" value={props.op2} name={props.id} className={style.radio}/>
                            <span className={style.optionText}>{props.op2}</span>
                        </label> 
                    </div>
                    <div className={style.options}>
                        <label className={style.container}>
                            <input type="radio" value={props.op3} name={props.id} className={style.radio}/>
                            <span className={style.optionText}>{props.op3}</span>
                        </label> 
                    </div>
                    <div className={style.options}>
                        <label className={style.container}>
                            <input type="radio" value={props.op4} name={props.id} className={style.radio}/>
                            <span className={style.optionText}>{props.op4}</span>
                        </label> 
                    </div>    
            </div>
        </div>       
    )
};
export default QuestionComp;