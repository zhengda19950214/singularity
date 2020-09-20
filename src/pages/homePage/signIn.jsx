import React, {useState} from 'react'
import './registerPage.css'
import {Auth} from 'aws-amplify';
import {Formik} from "formik";
import './signIn.css';
import Button from "@material-ui/core/Button";
/*  Page for user to Signin
    Information are sent to Amplify Cognito for verification.
*/
const SignInPage = ({signUp, setSession,needConfirm,setForgotPassword}) => {
    const [rememberMe,setRememberMe] = useState(false);
    const signIn = (values) => {
        Auth.signIn({
            username: values.userEmail,
            password: values.password,
        }).then(() => {
            setSession(rememberMe)
        })
            .catch(err => {
                if(err.name==="UserNotConfirmedException"){
                    needConfirm(values);
                }
                else{
                    alert(err.message)
                }

            });
    }
    return (
        <div className="authWrapper">
            <div className="registerForm">
                <Formik
                    initialValues={{userEmail: '', password: ''}}

                    onSubmit={(values) => {
                        signIn(values);
                    }}
                >{({
                       values,
                       handleChange,
                       handleSubmit,
                   }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="authWrapperHeader">
                            <span>singularity</span>
                        </div>
                        <div className="signInWrapper">
                            <input
                                className="loginInput"
                                placeholder="Email: "
                                name="userEmail"
                                value={values.userEmail}
                                onChange={handleChange}/>
                            <input
                                className="loginInput"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}/>
                            <div className="signInHelpTool">
                                <input type="checkbox" className="checkBox" value={rememberMe} onChange={()=>{setRememberMe(!rememberMe)}}/>
                                <span id="rememberMe">Remember me</span>
                                <span id="forgetPassword" onClick={()=>{
                                    if(values.userEmail === ''){
                                        alert("please enter an valid user email");
                                    }
                                    else{
                                        setForgotPassword(values.userEmail);
                                    }
                                }}>forgot password</span>
                            </div>
                        </div>
                        <div className="signInActions">
                            <Button type="submit" style={{background: "#E36100"}}><span>Login</span></Button>
                            <Button onClick={signUp}
                                    style={{background: "#FF9240", float:'right'}}><span>Signup</span></Button>
                        </div>

                    </form>
                )}
                </Formik>
            </div>
        </div>
    );
};

export default SignInPage;