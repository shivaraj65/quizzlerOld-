//packages used 
import React,{useEffect, useState} from 'react';
import axios from 'axios';
//component files used
import Cards from './quizzlerCards/cards';
import QuestionComp from './questionComp/questionComp';
import SubmitError from './submitError/submitError';
import ScoreResult from './scoreResult/scoreResult';
//css style sheets used
import style from './quizzler.css';
import pop from './popup.css';


const Quizzler= (props) => {
    const button = {
        fontFamily: "Audiowide, cursive"
      };

    const [quizData,setQuizData]=useState(null);
    //flag for the display of the error no data fetched/data fetched
    const [flagNoData,setFlag]=useState(null);
    //flag for the clicked quiz questions
    const [questions,setQuestions]=useState(null);
    //flag for conditions/ quizzler page/ quiztime/ quizScore / violation
    const [flagPage,setFlagPage]=useState("quizzler");
    //flag for the submited result check(false-not yet submited, error-some question is not answered, success-all are good and answered)
    const[flagSubmitAnswer,setFlagSubmitAnswer]=useState("false");
    //flag for triggering db error for submit function
    const[flagSubmitDB,setFlagSubmitDB]=useState("false");
    //flag to store the answers made by the user
    const [answers,setAnswers]=useState(null);
    //score obtained
    const [Score,setScore]=useState(null);

    //flag for answers on the quiz
    // let answersDone=[];

    useEffect(()=>{
        axios.get('https://server-master.herokuapp.com/quizData')
        .then(function (response) {
          // handle success
          if(response !=="noData"){
            setQuizData(response.data);
            setFlag("success");
          }else{
            setFlag("fail");
          }
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },[]);

    // const fullscreenHandler=()=>{
    //     const elem = document.getElementById("fs");

    // };
    const setFullscreen=()=>{
        const elem = document.getElementById("fs");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          }
    };
    const removeFullscreen=()=>{
        const elem = document.getElementById("fs");
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
    }

    const QuizTime=(data)=>{
        //id of the quiz is data
        for (var i=0; i < quizData.length; i++) {
            if (quizData[i]._id === data) {
                // console.log("found");
                // console.log(quizData[i].questions);
                // console.log(quizData[i]);
                setQuestions(quizData[i]);
                setFlagPage("quiztime");
                // console.log(quizData[i].questions.length);
                const answersDone=[];
                for(let j=0;j<quizData[i].questions.length;j++){
                    answersDone.push("empty");
                }
                setAnswers(answersDone);
            }
        }
    };

    const handleQuizData=(item,position)=>{
        let answersDone=[...answers];
        answersDone[position]=item;
        setAnswers(answersDone);
        // console.log(answers);
    };

    const submitHandler=()=>{
        let answersDone=[...answers];
        console.log("submit pressed");
        console.log(answers);
        let temp="";
        for(let iter=0;iter<answersDone.length;iter++){
            // console.log(answersDone[iter]);
            if(answersDone[iter]==="empty"){
                console.log(iter+"error");
                setFlagSubmitAnswer("error");
                temp="DontSubmit";
                break;
            }
        }
        if(temp!=="DontSubmit"){
            console.log(temp);
            let score=0;
            //write the code for the sumbit procedures...
            console.log(props.userinfo._id);
            console.log(questions._id);
            //find the score for the answers
            for(let i=0;i<questions.questions.length;i++){
                if(answers[i]===questions.questions[i].ans){
                    score++;
                }
            };
            console.log(score);
            score=Math.floor((score/questions.questions.length)*100);
            setScore(score);
            //now we have the quizID,userID,score to update to the server
            let formData = {quizID:questions._id,userID:props.userinfo._id,Score:score};
            const encodeForm = (data) => {
              return Object.keys(data)
                  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                  .join('&');
            }                                 
            axios.post('https://server-master.herokuapp.com/scoreSave', 
                        encodeForm(formData))
                        .then(function (response) {  
                            console.log(response.data);
                            if(response.data==="DBError"){
                                setFlagSubmitDB("error");
                            }else{
                                setFlagPage("quizScore");
                            }                                                    
                        })
                        .catch(function (error) {
                            // console.log(error);
                            setFlagSubmitDB("error");
                        });
    }
    };

    const submitHandle2=()=>{
        let formData = {quizID:questions._id,userID:props.userinfo._id,Score:0};
            const encodeForm = (data) => {
              return Object.keys(data)
                  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                  .join('&');
            }                                 
            axios.post('https://server-master.herokuapp.com/scoreSave', 
                        encodeForm(formData))
                        .then(function (response) {  
                            console.log(response.data);
                            if(response.data==="DBError"){
                                // setFlagSubmitDB("error");
                                setFlagPage("quizViolation");
                            }else{
                                setFlagPage("quizViolation");
                            }                                                    
                        })
                        .catch(function (error) {
                            // setFlagPage("quizViolation");
                            // console.log(error);
                            // setFlagSubmitDB("error");
                        });
        };



    return(
        <div id="fs">
            {flagPage==="quizzler"?
            <div>
                <div className={style.background}></div>
                    <nav className="navbar">
                        <h5 className={style.font1}>Quizzler</h5> 
                        <a href="/" className={`${style.devAnchor} ${style.font2}` }>Logout</a>
                    </nav>
                    <div className={style.outer}>
                        <div className={style.middle}>
                        <div className={style.inner}>
                        {
                            quizData && quizData.map((item)=>{
                                return(
                                     <Cards 
                                        id={item._id}
                                        key={item._id} 
                                        name={item.name} 
                                        dept={item.dept}
                                        pass={item.pass_percentage}
                                        func={QuizTime}
                                        fullscreen={setFullscreen}
                                    />
                                ) 
                            })
                        }
                        </div>
                        </div>
                    </div>     
            </div>:null}
            {flagPage==="quiztime"?
                <div>
                    <div className={style.background}></div>
                    <div className={style.outer}>
                    <div className={style.middle}>
                    <div className={style.inner}>
                    {
                        questions && questions.questions.map((data,index)=>{
                            {/* console.log(questions); */}
                            return(
                            <QuestionComp
                                id={index}
                                key={index}
                                question={data.question}
                                op1={data.op1}
                                op2={data.op2}
                                op3={data.op3}
                                op4={data.op4} 
                                funcSetAnswer={handleQuizData}
                                />
                            )
                        })
                    }
                        <p
                            className="btn btn-lg btn-success btn-block" 
                            style={button}
                            onClick={()=>{
                                submitHandler()
                                }}
                        >Submit</p>
                    </div>
                    </div>
                    </div>  
                </div>
            :null}
            {flagPage==="quizScore" &&Score>=50?
                <ScoreResult 
                    score={Score}
                    name={"Congrats! "+props.userinfo.name} 
                    contest={"You’ve won the "+questions.name}
                    func={setFlagPage}
                    />
            :null}
            {flagPage==="quizScore" &&Score<50?
                <ScoreResult 
                    score={Score}
                    name={props.userinfo.name} 
                    contest={questions.name}
                    func={setFlagPage}
                    />
            :null}
            {flagPage==="quizViolation"?
            <ScoreResult 
                    score={0}
                    violation="true"
                    name={props.userinfo.name} 
                    contest={"You have violated our terms and conditions on the quiz "+questions.name}
                    func={setFlagPage}
                    />
                :
                null
            }

            {flagSubmitDB==="error"?
            <SubmitError 
                data={"Oh Snap.. unable to connect to the server. TRY AGAIN."}
                setFlagSubmitAnswer={setFlagSubmitDB}/>
            :null}
            {flagSubmitAnswer==="error"?
            <SubmitError 
                data={"Answer all the questions to submit"}
                setFlagSubmitAnswer={setFlagSubmitAnswer}/>
            :null}

            {/* vanila javascript */}
            {
                document.addEventListener('fullscreenchange', function(event){
                    // document.fullscreenElement will point to the element that
                    // is in fullscreen mode if there is one. If there isn't one,
                    // the value of the property is null.
                    if (document.fullscreenElement) {
                        console.log("Element:"+ document.fullscreenElement.id+" entered full-screen mode.");
                    } else {
                        console.log('Leaving full-screen mode.');
                        if(flagPage==="quiztime"){
                            //violation detected block
                            setScore(0);
                            submitHandle2();
                        }
                    }
                    })
            }
        </div>
    );
};
export default Quizzler;



//set the conditions page
//fix login validation
//same user double entry fix


//set the no data received text
//set the database error text
//set a navbar constant to all pages
//set a admin login button on the landing page
//set the admin configurations