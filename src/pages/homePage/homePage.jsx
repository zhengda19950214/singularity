import React, {useEffect, useState} from 'react'
import './registerPage.css'
import './signIn.css';
import './homePage.css'
import {Auth} from 'aws-amplify';
import SignInPage from "./signIn";
import RegisterPage from "./register";
import ForgotPassword from "./forgotPassword";
import './background.css';

/*
  Homepage is the page user going to see when they visit any webpage without valid Auth.
  This page provide the ability to login and register.
**/
const HomePage = ({setSession}) => {
    const [signUpMode, setSignUpMode] = useState(false);
    const [signUpStage, setSignUpStage] = useState(1);
    const [forgotPassword,setForgotPassword] = useState(false);
    const [userEmail, setCurrentUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();

    let imgUrl = require('../../resource/homepage.jpg');

    const sendForgotPasswordConfirmation = (userEmail) =>{
        Auth.forgotPassword(userEmail)
            .then(data => {
                alert("Confirmation code has been sent to your email");
                setCurrentUserEmail(userEmail);
                setForgotPassword(true);
            })
            .catch(err =>{
                    if(err.name === "UserNotFoundException"){
                        alert("This user doesn't exist")
                    }
                    else if(err.name === "LimitExceededException"){
                        alert(err.message);
                    }
                    else{
                        console.log(err);
                        alert("Please try again");
                    }
            }

            );
    };



    if(forgotPassword) {
        return (
        <div style={{background: `url(${imgUrl})`}} className="signInPageWrapper">
            <ForgotPassword userEmail={userEmail} setSighIn={()=>{setForgotPassword(false)}}/>
        </div>
        )
    }

    return (
        <div  className="signInPageWrapper">
            <div className="backgroundContainer">
                <div className="whiteHalf">
                </div>
                <div className="orangeHalf">
                    <h1>Global College Community</h1>
                    <ul>
                        <li><span>View your peer’s experiences</span></li>
                        <li><span>Help your juniors</span></li>
                        <li><span>Explore life’s problems together</span></li>
                        <li><span>Pioneer your own path to share</span></li>
                    </ul>
                    <div className="logoContainer">
                        <img src={require('../../resource/icon.png')}/>
                    </div>
                </div>

            </div>


            {!signUpMode && <SignInPage setSession={setSession}
                                        needConfirm={
                                            (user) => {
                                                setSignUpStage(2);
                                                setSignUpMode(true);
                                                setCurrentUserEmail(user.userEmail);
                                                setUserPassword(user.password)
                                            }}
                                        setForgotPassword={sendForgotPasswordConfirmation}
                                        signUp={() => {
                                            setSignUpMode(true)
                                        }}/>}
            {signUpMode && <RegisterPage signUpStage={signUpStage} userEmail={userEmail} setCurrentUserEmail={setCurrentUserEmail}
                                         userPassword={userPassword} setUserPassword={setUserPassword} setSignIn={()=>{setSignUpMode(false);setSession(true)}}/>}
        </div>
    );
};

export default HomePage;